#!/usr/bin/env node

"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(PROJECT_ROOT, "..");
const VOLUME_NUMBERS = Array.from({ length: 12 }, (_, index) => index + 1);
const POSITIONS = Array.from({ length: 12 }, (_, position) => ({
  position,
  label: String(position).padStart(2, "0"),
  kind: position === 0 ? "prologue" : position === 11 ? "epilogue" : "chapter",
  minimumCharacters: position === 0 || position === 11 ? 5_000 : 8_000,
}));
const CORE_ARTIFACTS = ["README.md", "PRD.md", "BIBLE.md", "TASKS.md"];
const GLOBAL_STATUS_ARTIFACTS = [
  "state/panel-arc.md",
  "state/production-mystery-timeline.md",
  "state/continuity-notes.md",
];
const PLACEHOLDER_PATTERN = /\b(?:TODO|TBD|FIXME|PLACEHOLDER)\b|\{\{[^}\n]*\}\}|\[\[[^\]\n]*\]\]|집필\s*중|작성\s*예정|추후\s*작성/gu;
const MANUSCRIPT_NAME_SOURCE = "(?:00-prologue|(?:0[1-9]|10)-part(?:[1-9]|10)-[a-z0-9]+(?:-[a-z0-9]+)*|11-epilogue)\\.md";

function volumeName(number) {
  return `vol${String(number).padStart(2, "0")}`;
}

function usage() {
  return [
    "Usage: node naso-solo-agent-room/scripts/verify-completion.js [options]",
    "",
    "  --volume volNN  verify one volume (vol01 through vol12)",
    "  --strict        turn warnings into a failing exit status",
    "  --self-test     run focused dependency-free regression checks",
  ].join("\n");
}

function parseArguments(argv) {
  let selectedVolume = null;
  let strict = false;
  let selfTest = false;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--strict") {
      strict = true;
      continue;
    }
    if (argument === "--self-test") {
      selfTest = true;
      continue;
    }
    if (argument === "--volume") {
      if (index + 1 >= argv.length) {
        throw new Error("--volume requires a volNN value");
      }
      selectedVolume = argv[index + 1];
      index += 1;
      continue;
    }
    if (argument.startsWith("--volume=")) {
      selectedVolume = argument.slice("--volume=".length);
      if (!selectedVolume) {
        throw new Error("--volume requires a volNN value");
      }
      continue;
    }
    throw new Error(`unknown argument: ${argument}`);
  }

  if (selectedVolume && !/^vol(?:0[1-9]|1[0-2])$/u.test(selectedVolume)) {
    throw new Error(`--volume must be vol01 through vol12, got ${selectedVolume}`);
  }
  if (selfTest && selectedVolume) {
    throw new Error("--self-test cannot be combined with --volume");
  }

  return { selectedVolume, strict, selfTest };
}

function unicodeLength(value) {
  return Array.from(value).length;
}

function expectedFilePattern(position) {
  if (position === 0) {
    return /^00-prologue\.md$/u;
  }
  if (position === 11) {
    return /^11-epilogue\.md$/u;
  }
  if (!Number.isInteger(position) || position < 1 || position > 10) {
    throw new RangeError(`unknown manuscript position: ${position}`);
  }
  const label = String(position).padStart(2, "0");
  return new RegExp(`^${label}-part${position}-[a-z0-9]+(?:-[a-z0-9]+)*\\.md$`, "u");
}

function expectedFileShape(position) {
  if (position === 0) {
    return "00-prologue.md";
  }
  if (position === 11) {
    return "11-epilogue.md";
  }
  return `${String(position).padStart(2, "0")}-part${position}-<lowercase-slug>.md`;
}

function stripBlockquotePrefix(line) {
  let content = line;
  let quoteDepth = 0;
  while (true) {
    const prefix = content.match(/^[\t ]{0,3}>[\t ]?/u);
    if (!prefix) {
      break;
    }
    content = content.slice(prefix[0].length);
    quoteDepth += 1;
  }
  return { content, quoteDepth };
}

function inspectMarkdown(text) {
  const lines = [];
  const fencedBlocks = [];
  let openFence = null;
  let currentBlock = [];

  for (const [index, sourceLine] of text.split("\n").entries()) {
    const raw = sourceLine.endsWith("\r") ? sourceLine.slice(0, -1) : sourceLine;
    const { content, quoteDepth } = stripBlockquotePrefix(raw);
    let inFence = openFence !== null;
    let boundary = false;

    if (openFence) {
      currentBlock.push(sourceLine);
      const closing = content.match(/^ {0,3}(`+|~+)[\t ]*$/u);
      if (
        quoteDepth === openFence.quoteDepth
        && closing
        && closing[1][0] === openFence.character
        && closing[1].length >= openFence.length
      ) {
        boundary = true;
        fencedBlocks.push(currentBlock.join("\n"));
        currentBlock = [];
        openFence = null;
      }
    } else {
      const opening = content.match(/^ {0,3}(`{3,}|~{3,})[^\r\n]*$/u);
      if (opening) {
        openFence = {
          character: opening[1][0],
          length: opening[1].length,
          quoteDepth,
          lineNumber: index + 1,
        };
        currentBlock = [sourceLine];
        inFence = true;
        boundary = true;
      }
    }

    lines.push({
      raw,
      content,
      inFence,
      boundary,
      lineNumber: index + 1,
    });
  }

  return {
    lines,
    fencedBlocks,
    unterminated: openFence
      ? {
        lineNumber: openFence.lineNumber,
        marker: openFence.character.repeat(openFence.length),
      }
      : null,
  };
}

function visibleMarkdownText(text) {
  return inspectMarkdown(text).lines
    .map((line) => (line.inFence ? "" : line.raw))
    .join("\n");
}

function visibleH1Lines(text) {
  return visibleMarkdownText(text)
    .split("\n")
    .filter((line) => /^#\s+\S/u.test(line));
}

function decodeComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseLinkTarget(rawTarget) {
  const trimmed = rawTarget.trim();
  const withoutAngles = trimmed.startsWith("<") && trimmed.endsWith(">")
    ? trimmed.slice(1, -1)
    : trimmed;
  const suffixIndex = withoutAngles.search(/[?#]/u);
  const rawPath = suffixIndex < 0 ? withoutAngles : withoutAngles.slice(0, suffixIndex);
  const rawSuffix = suffixIndex < 0 ? "" : withoutAngles.slice(suffixIndex);
  return {
    target: `${decodeComponent(rawPath)}${decodeComponent(rawSuffix)}`,
    path: decodeComponent(rawPath),
  };
}

function extractMarkdownLinkTargets(text) {
  const visible = visibleMarkdownText(text);
  const targets = [];
  const linkStart = /!?\[[^\]\r\n]*\]\(\s*/gu;

  for (const match of visible.matchAll(linkStart)) {
    let cursor = match.index + match[0].length;
    if (visible[cursor] === "<") {
      const closingAngle = visible.indexOf(">", cursor + 1);
      if (closingAngle >= 0 && !visible.slice(cursor, closingAngle).includes("\n")) {
        targets.push(visible.slice(cursor, closingAngle + 1));
      }
      continue;
    }

    const targetStart = cursor;
    let parenthesisDepth = 0;
    let escaped = false;
    while (cursor < visible.length) {
      const character = visible[cursor];
      if (character === "\n" || character === "\r") {
        break;
      }
      if (escaped) {
        escaped = false;
        cursor += 1;
        continue;
      }
      if (character === "\\") {
        escaped = true;
        cursor += 1;
        continue;
      }
      if (character === "(") {
        parenthesisDepth += 1;
        cursor += 1;
        continue;
      }
      if (character === ")") {
        if (parenthesisDepth === 0) {
          targets.push(visible.slice(targetStart, cursor));
          break;
        }
        parenthesisDepth -= 1;
        cursor += 1;
        continue;
      }
      if (/\s/u.test(character) && parenthesisDepth === 0) {
        targets.push(visible.slice(targetStart, cursor));
        break;
      }
      cursor += 1;
    }
  }
  return targets;
}

function extractLocalMarkdownLinkDetails(text) {
  const links = [];
  for (const rawTarget of extractMarkdownLinkTargets(text)) {
    const parsed = parseLinkTarget(rawTarget);
    if (
      parsed.target.startsWith("#")
      || parsed.target.startsWith("//")
      || /^[a-z][a-z\d+.-]*:/iu.test(parsed.target)
    ) {
      continue;
    }
    links.push(parsed);
  }
  return links;
}

function extractLocalMarkdownLinks(text) {
  return extractLocalMarkdownLinkDetails(text).map((link) => link.target);
}

function normalizeTitle(value) {
  return String(value)
    .replace(/^\d{1,2}\.\s*/u, "")
    .replace(/^[`*_~\s]+|[`*_~\s]+$/gu, "")
    .normalize("NFKC")
    .replace(/\s+/gu, " ")
    .trim();
}

function splitTableRow(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) {
    return [];
  }
  return trimmed.slice(1, -1).split("|").map((cell) => cell.trim());
}

function parseOutlineMetadata(text) {
  const records = [];
  const filePattern = new RegExp("^`(" + MANUSCRIPT_NAME_SOURCE + ")`$", "u");
  for (const line of text.replace(/\r/gu, "").split("\n")) {
    const cells = splitTableRow(line);
    if (cells.length < 2) {
      continue;
    }
    const match = cells[0].match(filePattern);
    if (match) {
      records.push({
        fileName: match[1],
        title: normalizeTitle(cells[1]),
      });
    }
  }
  return records;
}

function parseVolumeReadmeMetadata(text) {
  const records = [];
  const pattern = new RegExp(
    `\\[([^\\]\\n]+)\\]\\(\\.\\/(${MANUSCRIPT_NAME_SOURCE})(?:#[^)]*)?\\)`,
    "gu",
  );
  for (const match of text.matchAll(pattern)) {
    records.push({
      fileName: match[2],
      title: normalizeTitle(match[1]),
    });
  }
  return records;
}

function relativeLink(fromRelativePath, toRelativePath) {
  let target = path.posix.relative(path.posix.dirname(fromRelativePath), toRelativePath);
  if (!target.startsWith(".")) {
    target = `./${target}`;
  }
  return target;
}

function markdownLink(label, target) {
  return `[${label}](${target})`;
}

function canonicalManuscriptNavigation(current, previous, next) {
  const links = [];
  if (previous) {
    links.push(markdownLink(
      `← 이전: ${previous.titleLabel}`,
      relativeLink(current.relativePath, previous.relativePath),
    ));
  }
  links.push(
    markdownLink("시리즈홈", "../README.md"),
    markdownLink("목차", "./README.md"),
  );
  if (next) {
    links.push(markdownLink(
      `다음: ${next.titleLabel} →`,
      relativeLink(current.relativePath, next.relativePath),
    ));
  }
  return links.join(" | ");
}

function canonicalVolumeNavigation(number) {
  if (!VOLUME_NUMBERS.includes(number)) {
    throw new RangeError(`unknown volume: ${number}`);
  }
  const links = [];
  if (number > 1) {
    links.push(markdownLink("← 이전 권", `../${volumeName(number - 1)}/README.md`));
  }
  links.push(markdownLink("시리즈홈", "../README.md"));
  if (number < 12) {
    links.push(markdownLink("다음 권 →", `../${volumeName(number + 1)}/README.md`));
  }
  return links.join(" | ");
}

function boundaryNavigationLines(text) {
  return visibleMarkdownText(text)
    .split("\n")
    .filter((line) => line.includes("[시리즈홈]("));
}

function validateDocumentHygiene(fileLabel, text) {
  const problems = [];
  if (text.includes("\r")) {
    problems.push(`${fileLabel}: expected LF line endings; found CR/CRLF`);
  }
  if (!text.endsWith("\n")) {
    problems.push(`${fileLabel}: missing final newline`);
  }

  const trailingLines = [];
  text.split("\n").forEach((sourceLine, index) => {
    const line = sourceLine.endsWith("\r") ? sourceLine.slice(0, -1) : sourceLine;
    if (/[ \t]+$/u.test(line)) {
      trailingLines.push(index + 1);
    }
  });
  if (trailingLines.length) {
    problems.push(`${fileLabel}: trailing whitespace on line${trailingLines.length === 1 ? "" : "s"} ${trailingLines.join(", ")}`);
  }

  const visible = visibleMarkdownText(text).replace(/<!--[\s\S]*?-->/gu, " ");
  const placeholders = [...visible.matchAll(new RegExp(
    PLACEHOLDER_PATTERN.source,
    PLACEHOLDER_PATTERN.flags,
  ))];
  if (placeholders.length) {
    const markers = [...new Set(placeholders.map((match) => match[0]))];
    problems.push(`${fileLabel}: placeholder marker${markers.length === 1 ? "" : "s"} ${markers.join(", ")}`);
  }

  const inspection = inspectMarkdown(text);
  if (inspection.unterminated) {
    problems.push(
      `${fileLabel}:${inspection.unterminated.lineNumber}: unbalanced fenced block `
        + `${inspection.unterminated.marker}`,
    );
  }
  return problems;
}

function requiredArtifactsForVolumes(volumes) {
  return [
    ...CORE_ARTIFACTS,
    ...GLOBAL_STATUS_ARTIFACTS,
    ...volumes.flatMap((volume) => [
      `state/affection-graph-${volume}.md`,
      `state/misunderstanding-queue-${volume}.md`,
    ]),
  ];
}

function decodeHtmlEntities(value) {
  const named = new Map([
    ["amp", "&"],
    ["lt", "<"],
    ["gt", ">"],
    ["quot", "\""],
    ["apos", "'"],
    ["nbsp", " "],
  ]);
  return value.replace(
    /&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+));/giu,
    (entity, decimal, hexadecimal, name) => {
      if (decimal) {
        return String.fromCodePoint(Number(decimal));
      }
      if (hexadecimal) {
        return String.fromCodePoint(Number.parseInt(hexadecimal, 16));
      }
      return named.get(name.toLowerCase()) ?? entity;
    },
  );
}

function githubHeadingBaseSlug(heading) {
  return decodeHtmlEntities(heading)
    .replace(/!?\[([^\]]*)\]\([^)]*\)/gu, "$1")
    .replace(/<[^>]+>/gu, "")
    .replace(/[`*_~]/gu, "")
    .normalize("NFKC")
    .toLocaleLowerCase("ko-KR")
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .trim()
    .replace(/\s+/gu, "-");
}

function markdownAnchors(text) {
  const anchors = new Set();
  const visible = visibleMarkdownText(text).replace(/<!--[\s\S]*?-->/gu, " ");
  const counts = new Map();
  for (const line of visible.split("\n")) {
    const match = line.match(/^ {0,3}#{1,6}[\t ]+(.+?)[\t ]*#*[\t ]*$/u);
    if (!match) {
      continue;
    }
    const base = githubHeadingBaseSlug(match[1]);
    if (!base) {
      continue;
    }
    const count = counts.get(base) ?? 0;
    anchors.add(count === 0 ? base : `${base}-${count}`);
    counts.set(base, count + 1);
  }
  return anchors;
}

function isWithin(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

function displayedProseParagraphs(text) {
  const visible = visibleMarkdownText(text)
    .replace(/<!--[\s\S]*?-->/gu, " ")
    .split("\n")
    .map((line) => {
      if (
        /^ {0,3}#{1,6}(?:\s|$)/u.test(line)
        || /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/u.test(line)
        || /^\s*\|/u.test(line)
        || line.includes("[시리즈홈](")
      ) {
        return "";
      }
      return line
        .replace(/!\[([^\]]*)\]\([^)]*\)/gu, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/gu, "$1")
        .replace(/^\s{0,3}>\s?/u, "")
        .replace(/[`*_~]/gu, "")
        .trimEnd();
    })
    .join("\n");

  return visible
    .split(/\n[\t ]*\n+/u)
    .map((paragraph) => paragraph.replace(/\s+/gu, " ").trim())
    .filter(Boolean);
}

function normalizeProse(value) {
  return String(value)
    .normalize("NFKC")
    .toLocaleLowerCase("ko-KR")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

function duplicateSnippet(value, maximum = 120) {
  const points = Array.from(value);
  return points.length <= maximum ? value : `${points.slice(0, maximum).join("")}…`;
}

function findDuplicateProse(records, options = {}) {
  const paragraphMinimumCharacters = options.paragraphMinimumCharacters ?? 160;
  const tokenWindow = options.tokenWindow ?? 18;
  const tokenMinimumCharacters = options.tokenMinimumCharacters ?? 80;
  const paragraphOccurrences = new Map();
  const tokenOrigins = new Map();
  const tokenReports = new Map();

  for (const record of records) {
    const paragraphs = displayedProseParagraphs(record.text);
    for (const [paragraphIndex, paragraph] of paragraphs.entries()) {
      const normalized = normalizeProse(paragraph);
      if (unicodeLength(normalized) >= paragraphMinimumCharacters) {
        const occurrences = paragraphOccurrences.get(normalized) ?? [];
        occurrences.push({
          file: record.file,
          paragraphIndex,
          source: paragraph,
        });
        paragraphOccurrences.set(normalized, occurrences);
      }

      const tokens = normalized.split(" ").filter(Boolean);
      for (let index = 0; index <= tokens.length - tokenWindow; index += 1) {
        const sequence = tokens.slice(index, index + tokenWindow).join(" ");
        if (unicodeLength(sequence) < tokenMinimumCharacters) {
          continue;
        }
        const origin = tokenOrigins.get(sequence);
        if (!origin) {
          tokenOrigins.set(sequence, { file: record.file, paragraphIndex, index });
          continue;
        }
        if (origin.file === record.file) {
          continue;
        }
        const pair = [origin.file, record.file].sort().join("\u0000");
        const reportKey = `${pair}\u0000${sequence}`;
        if (!tokenReports.has(reportKey)) {
          tokenReports.set(reportKey, {
            files: [origin.file, record.file],
            sequence,
          });
        }
      }
    }
  }

  const exactParagraphs = [];
  for (const [paragraph, occurrences] of paragraphOccurrences) {
    if (occurrences.length > 1) {
      exactParagraphs.push({
        files: occurrences.map((occurrence) => occurrence.file),
        occurrences: occurrences.length,
        characters: unicodeLength(paragraph),
        snippet: duplicateSnippet(occurrences[0].source),
      });
    }
  }

  return {
    exactParagraphs,
    tokenSequences: [...tokenReports.values()].map((report) => ({
      ...report,
      snippet: duplicateSnippet(report.sequence),
    })),
  };
}

function runSelfTests() {
  let selfTests = 0;
  const check = (callback) => {
    callback();
    selfTests += 1;
  };

  check(() => assert.equal(unicodeLength("한글🙂A"), 4));
  check(() => assert.match("01-part1-arrival-log.md", expectedFilePattern(1)));
  check(() => assert.doesNotMatch("01-part2-wrong.md", expectedFilePattern(1)));
  check(() => assert.equal(normalizeTitle("00. 관찰실 부팅"), "관찰실 부팅"));
  check(() => assert.deepEqual(parseOutlineMetadata("| `00-prologue.md` | 시작 |"), [
    { fileName: "00-prologue.md", title: "시작" },
  ]));
  check(() => assert.deepEqual(
    parseVolumeReadmeMetadata("| 프롤로그 | [0. 시작](./00-prologue.md) |"),
    [{ fileName: "00-prologue.md", title: "시작" }],
  ));
  check(() => assert.equal(inspectMarkdown("```text\n로그\n```\n").unterminated, null));
  check(() => assert.ok(inspectMarkdown("```text\n로그\n").unterminated));
  check(() => assert.deepEqual(
    extractLocalMarkdownLinks("[문서](./chapter(v2).md) [웹](https://example.com)"),
    ["./chapter(v2).md"],
  ));
  check(() => assert.equal(
    canonicalVolumeNavigation(12),
    "[← 이전 권](../vol11/README.md) | [시리즈홈](../README.md)",
  ));
  check(() => assert.ok(
    validateDocumentHygiene("fixture.md", "TODO  \r").length >= 4,
  ));
  check(() => assert.ok(
    requiredArtifactsForVolumes(["vol01"]).includes("state/affection-graph-vol01.md"),
  ));
  check(() => {
    const paragraph = Array.from({ length: 40 }, (_, index) => `단어${index}`).join(" ");
    const duplicates = findDuplicateProse([
      { file: "a.md", text: paragraph },
      { file: "b.md", text: paragraph },
    ], {
      paragraphMinimumCharacters: 100,
      tokenMinimumCharacters: 40,
    });
    assert.equal(duplicates.exactParagraphs.length, 1);
    assert.ok(duplicates.tokenSequences.length > 0);
  });

  return { status: "ok", selfTests };
}

function runVerification(options = {}) {
  const projectRoot = path.resolve(options.projectRoot ?? PROJECT_ROOT);
  const repoRoot = path.resolve(projectRoot, "..");
  const selectedVolume = options.selectedVolume ?? null;
  const strict = Boolean(options.strict);
  const selectedNumbers = selectedVolume
    ? [Number(selectedVolume.slice(3))]
    : VOLUME_NUMBERS;
  const selectedNames = selectedNumbers.map(volumeName);
  const failures = [];
  const warnings = [];
  const summary = {
    status: "pending",
    scope: selectedVolume ?? "all",
    strict,
    expected: {
      outlines: selectedVolume ? 1 : 12,
      volumes: selectedVolume ? 1 : 12,
      manuscripts: selectedVolume ? 12 : 144,
      manuscriptsPerVolume: 12,
      chapterMinimumCharacters: 8_000,
      prologueEpilogueMinimumCharacters: 5_000,
      volumeMinimumCharacters: 90_000,
    },
    found: {
      outlines: 0,
      volumes: 0,
      manuscripts: 0,
      canonStatusArtifacts: 0,
    },
    volumeCharacters: {},
    underFloor: {
      files: [],
      volumes: [],
    },
    duplicateProse: {
      exactParagraphs: 0,
      tokenSequences: 0,
    },
    counts: {
      failures: 0,
      warnings: 0,
      effectiveFailures: 0,
    },
    failures,
    warnings,
  };

  const relativeToProject = (file) => path.relative(projectRoot, file)
    .replaceAll(path.sep, "/") || ".";
  const relativeToRepo = (file) => path.relative(repoRoot, file)
    .replaceAll(path.sep, "/") || ".";
  const fail = (message) => failures.push(message);
  const warn = (message) => warnings.push(message);

  function exists(file) {
    try {
      return fs.existsSync(file);
    } catch (error) {
      fail(`${relativeToRepo(file)}: could not inspect path: ${error.message}`);
      return false;
    }
  }

  function readText(file) {
    try {
      return fs.readFileSync(file, "utf8");
    } catch (error) {
      fail(`${relativeToRepo(file)}: could not read file: ${error.message}`);
      return null;
    }
  }

  function listEntries(directory) {
    try {
      return fs.readdirSync(directory, { withFileTypes: true })
        .sort((left, right) => left.name.localeCompare(right.name, "en"));
    } catch (error) {
      fail(`${relativeToRepo(directory)}: could not list directory: ${error.message}`);
      return [];
    }
  }

  function walkMarkdown(directory, results = []) {
    if (!exists(directory)) {
      return results;
    }
    for (const entry of listEntries(directory)) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        walkMarkdown(file, results);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        results.push(file);
      }
    }
    return results;
  }

  for (const relative of requiredArtifactsForVolumes(selectedNames)) {
    const file = path.join(projectRoot, relative);
    if (!exists(file)) {
      fail(`${relative}: missing required canon/status artifact`);
    } else {
      summary.found.canonStatusArtifacts += 1;
    }
  }

  const outlines = new Map();
  const outlineDirectory = path.join(projectRoot, "outline");
  if (!exists(outlineDirectory)) {
    fail("outline: missing outline directory");
  } else {
    const entries = listEntries(outlineDirectory);
    if (!selectedVolume) {
      if (entries.length !== 12) {
        fail(`outline: expected exactly 12 outline files, got ${entries.length}`);
      }
      const unexpected = entries.filter((entry) => (
        !entry.isFile()
        || !/^vol(?:0[1-9]|1[0-2])-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/u.test(entry.name)
      ));
      if (unexpected.length) {
        fail(`outline: unexpected entries ${unexpected.map((entry) => entry.name).join(", ")}`);
      }
    }

    for (const number of selectedNumbers) {
      const prefix = `${volumeName(number)}-`;
      const matches = entries.filter((entry) => (
        entry.isFile()
        && entry.name.startsWith(prefix)
        && entry.name.endsWith(".md")
      ));
      if (matches.length !== 1) {
        fail(`outline: ${volumeName(number)} expected exactly one outline, got ${matches.length}`);
        continue;
      }
      const file = path.join(outlineDirectory, matches[0].name);
      outlines.set(number, file);
      summary.found.outlines += 1;
    }
  }

  const discoveries = new Map();
  for (const number of selectedNumbers) {
    const name = volumeName(number);
    const directory = path.join(projectRoot, name);
    const discovery = {
      number,
      name,
      directory,
      readme: path.join(directory, "README.md"),
      manuscripts: new Map(),
    };
    discoveries.set(number, discovery);

    if (!exists(directory)) {
      fail(`${name}: missing volume directory`);
      continue;
    }
    summary.found.volumes += 1;
    const entries = listEntries(directory);
    if (entries.length !== 13) {
      fail(`${name}: expected exactly 13 entries (README.md plus 12 manuscripts), got ${entries.length}`);
    }
    const names = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
    const expectedNames = new Set(["README.md"]);
    if (!names.includes("README.md")) {
      fail(`${name}: missing README.md`);
    }

    for (const position of POSITIONS) {
      const matches = names.filter((fileName) => expectedFilePattern(position.position).test(fileName));
      if (matches.length !== 1) {
        fail(
          `${name}: position ${position.label} expected ${expectedFileShape(position.position)}, `
            + `got ${matches.length} matching files${matches.length ? ` (${matches.join(", ")})` : ""}`,
        );
        matches.forEach((fileName) => expectedNames.add(fileName));
        continue;
      }
      expectedNames.add(matches[0]);
      discovery.manuscripts.set(position.position, path.join(directory, matches[0]));
      summary.found.manuscripts += 1;
    }

    const unexpected = entries.map((entry) => entry.name)
      .filter((entryName) => !expectedNames.has(entryName));
    if (unexpected.length) {
      fail(`${name}: unexpected entries ${unexpected.join(", ")}`);
    }
  }

  if (!selectedVolume && exists(projectRoot)) {
    const volumeDirectories = listEntries(projectRoot)
      .filter((entry) => entry.isDirectory() && /^vol\d{2}$/u.test(entry.name))
      .map((entry) => entry.name);
    const unexpected = volumeDirectories.filter((name) => !/^vol(?:0[1-9]|1[0-2])$/u.test(name));
    if (unexpected.length) {
      fail(`unexpected volume directories outside vol01-vol12: ${unexpected.join(", ")}`);
    }
    if (volumeDirectories.length !== 12) {
      fail(`expected exactly 12 volume directories, got ${volumeDirectories.length}`);
    }
  }

  function passiveSlotCatalog() {
    const slots = [];
    for (const number of VOLUME_NUMBERS) {
      const directory = path.join(projectRoot, volumeName(number));
      if (!fs.existsSync(directory)) {
        continue;
      }
      let names;
      try {
        names = fs.readdirSync(directory);
      } catch {
        continue;
      }
      for (const position of POSITIONS) {
        const matches = names.filter((fileName) => expectedFilePattern(position.position).test(fileName));
        if (matches.length !== 1) {
          continue;
        }
        const file = path.join(directory, matches[0]);
        let firstLine = "";
        try {
          firstLine = fs.readFileSync(file, "utf8").split("\n", 1)[0].replace(/\r$/u, "");
        } catch {
          // Normal scoped reads report errors. Passive neighbors retain a stable fallback.
        }
        const titleLabel = firstLine.match(/^#\s+(.+)$/u)?.[1]
          ?? `${position.label}. <missing title>`;
        slots.push({
          number,
          position: position.position,
          file,
          relativePath: `${volumeName(number)}/${matches[0]}`,
          titleLabel,
        });
      }
    }
    return slots.sort((left, right) => (
      left.number - right.number || left.position - right.position
    ));
  }

  const allSlots = passiveSlotCatalog();
  const slotByGlobalIndex = new Map(allSlots.map((slot) => [
    (slot.number - 1) * 12 + slot.position,
    slot,
  ]));

  function validateMetadataRecords(records, expectedNames, label) {
    const metadata = new Map();
    if (records.length !== 12) {
      fail(`${label}: expected exactly 12 filename/title metadata entries, got ${records.length}`);
    }
    for (const record of records) {
      if (!record.title) {
        fail(`${label}: empty title metadata for ${record.fileName}`);
      }
      if (metadata.has(record.fileName)) {
        fail(`${label}: duplicate title metadata for ${record.fileName}`);
      } else {
        metadata.set(record.fileName, record.title);
      }
    }
    const missing = [...expectedNames].filter((name) => !metadata.has(name));
    const unexpected = [...metadata.keys()].filter((name) => !expectedNames.has(name));
    if (missing.length) {
      fail(`${label}: missing title metadata for ${missing.join(", ")}`);
    }
    if (unexpected.length) {
      fail(`${label}: unexpected title metadata for ${unexpected.join(", ")}`);
    }
    return metadata;
  }

  const manuscriptRecords = [];
  for (const number of selectedNumbers) {
    const discovery = discoveries.get(number);
    if (!discovery || discovery.manuscripts.size === 0) {
      continue;
    }
    const expectedNames = new Set(
      [...discovery.manuscripts.values()].map((file) => path.basename(file)),
    );
    const outlineFile = outlines.get(number);
    const outlineText = outlineFile ? readText(outlineFile) : null;
    const readmeText = exists(discovery.readme) ? readText(discovery.readme) : null;
    const outlineMetadata = validateMetadataRecords(
      outlineText === null ? [] : parseOutlineMetadata(outlineText),
      expectedNames,
      outlineFile ? relativeToProject(outlineFile) : `${discovery.name} outline`,
    );
    const readmeMetadata = validateMetadataRecords(
      readmeText === null ? [] : parseVolumeReadmeMetadata(readmeText),
      expectedNames,
      relativeToProject(discovery.readme),
    );

    for (const position of POSITIONS) {
      const file = discovery.manuscripts.get(position.position);
      if (!file) {
        continue;
      }
      const text = readText(file);
      if (text === null) {
        continue;
      }
      const firstLine = text.split("\n", 1)[0].replace(/\r$/u, "");
      const match = firstLine.match(/^#\s+(\d{1,2})\.\s+(\S(?:.*\S)?)\s*$/u);
      if (!match || Number(match[1]) !== position.position) {
        fail(
          `${relativeToProject(file)}: first-line H1 must use manuscript position `
            + `${position.position} and a non-empty title`,
        );
      } else {
        const title = normalizeTitle(match[2]);
        const fileName = path.basename(file);
        const outlineTitle = outlineMetadata.get(fileName);
        const readmeTitle = readmeMetadata.get(fileName);
        if (outlineTitle !== undefined && title !== outlineTitle) {
          fail(
            `${relativeToProject(file)}: H1 title "${title}" differs from `
              + `outline metadata "${outlineTitle}"`,
          );
        }
        if (readmeTitle !== undefined && title !== readmeTitle) {
          fail(
            `${relativeToProject(file)}: H1 title "${title}" differs from `
              + `volume README metadata "${readmeTitle}"`,
          );
        }
        if (
          outlineTitle !== undefined
          && readmeTitle !== undefined
          && outlineTitle !== readmeTitle
        ) {
          fail(
            `${discovery.name}: title metadata mismatch for ${fileName}: `
              + `outline "${outlineTitle}", README "${readmeTitle}"`,
          );
        }
      }

      const inspection = inspectMarkdown(text);
      if (inspection.fencedBlocks.length === 0) {
        fail(`${relativeToProject(file)}: missing required fenced panel/status log`);
      }

      const navigationLines = boundaryNavigationLines(text);
      const globalIndex = (number - 1) * 12 + position.position;
      const current = slotByGlobalIndex.get(globalIndex);
      const expectedNavigation = current
        ? canonicalManuscriptNavigation(
          current,
          slotByGlobalIndex.get(globalIndex - 1) ?? null,
          slotByGlobalIndex.get(globalIndex + 1) ?? null,
        )
        : null;
      if (navigationLines.length !== 2) {
        fail(
          `${relativeToProject(file)}: expected exactly two top/bottom navigation `
            + `lines, got ${navigationLines.length}`,
        );
      }
      if (navigationLines.length >= 1 && navigationLines[0] !== navigationLines.at(-1)) {
        fail(`${relativeToProject(file)}: top and bottom navigation must be identical`);
      }
      if (expectedNavigation && navigationLines[0] !== expectedNavigation) {
        fail(
          `${relativeToProject(file)}: canonical navigation mismatch; expected `
            + `"${expectedNavigation}", got "${navigationLines[0] ?? "<missing>"}"`,
        );
      }

      const characters = unicodeLength(text);
      if (characters < position.minimumCharacters) {
        const relative = relativeToProject(file);
        summary.underFloor.files.push(relative);
        fail(
          `${relative}: ${characters} characters; ${position.kind} hard floor is `
            + `${position.minimumCharacters}`,
        );
      }
      manuscriptRecords.push({ file, text });
    }

    if (readmeText !== null) {
      const navigationLines = boundaryNavigationLines(readmeText);
      const expectedNavigation = canonicalVolumeNavigation(number);
      if (navigationLines.length !== 2) {
        fail(
          `${relativeToProject(discovery.readme)}: expected exactly two top/bottom `
            + `volume navigation lines, got ${navigationLines.length}`,
        );
      }
      if (navigationLines.length >= 1 && navigationLines[0] !== navigationLines.at(-1)) {
        fail(`${relativeToProject(discovery.readme)}: top and bottom volume navigation must be identical`);
      }
      if (navigationLines[0] !== expectedNavigation) {
        fail(
          `${relativeToProject(discovery.readme)}: canonical volume navigation mismatch; `
            + `expected "${expectedNavigation}", got "${navigationLines[0] ?? "<missing>"}"`,
        );
      }
    }

    let volumeCharacters = 0;
    for (const file of discovery.manuscripts.values()) {
      const text = manuscriptRecords.find((record) => record.file === file)?.text;
      if (text !== undefined) {
        volumeCharacters += unicodeLength(text);
      }
    }
    summary.volumeCharacters[discovery.name] = volumeCharacters;
    if (volumeCharacters < 90_000) {
      summary.underFloor.volumes.push(discovery.name);
      fail(`${discovery.name}: ${volumeCharacters} manuscript characters; volume hard floor is 90000`);
    }
    if (volumeCharacters > 120_000) {
      warn(`${discovery.name}: ${volumeCharacters} manuscript characters; PRD target ceiling is 120000`);
    }
  }

  const qualityFiles = selectedVolume
    ? [
      ...CORE_ARTIFACTS.map((relative) => path.join(projectRoot, relative)),
      ...GLOBAL_STATUS_ARTIFACTS.map((relative) => path.join(projectRoot, relative)),
      ...selectedNames.flatMap((name) => [
        path.join(projectRoot, "state", `affection-graph-${name}.md`),
        path.join(projectRoot, "state", `misunderstanding-queue-${name}.md`),
      ]),
      ...selectedNumbers.flatMap((number) => {
        const discovery = discoveries.get(number);
        return [
          outlines.get(number),
          discovery?.readme,
          ...[...(discovery?.manuscripts.values() ?? [])],
        ];
      }),
    ].filter(Boolean)
    : walkMarkdown(projectRoot);
  const uniqueQualityFiles = [...new Set(qualityFiles.map((file) => path.resolve(file)))]
    .filter((file) => exists(file));

  const anchorCache = new Map();
  for (const file of uniqueQualityFiles) {
    const text = readText(file);
    if (text === null) {
      continue;
    }
    validateDocumentHygiene(relativeToProject(file), text).forEach(fail);

    const h1Lines = visibleH1Lines(text);
    const firstLine = text.split("\n", 1)[0].replace(/\r$/u, "");
    if (!/^#\s+\S/u.test(firstLine)) {
      fail(`${relativeToProject(file)}: H1 must be the first line`);
    }
    if (h1Lines.length !== 1) {
      fail(`${relativeToProject(file)}: expected exactly one visible H1, got ${h1Lines.length}`);
    }

    for (const link of extractLocalMarkdownLinkDetails(text)) {
      const hashIndex = link.target.indexOf("#");
      const pathAndQuery = hashIndex < 0 ? link.target : link.target.slice(0, hashIndex);
      const fragment = hashIndex < 0 ? "" : link.target.slice(hashIndex + 1);
      const targetPath = pathAndQuery.split("?", 1)[0];
      const resolved = targetPath
        ? path.resolve(path.dirname(file), targetPath)
        : file;
      if (!isWithin(repoRoot, resolved)) {
        fail(`${relativeToProject(file)}: local Markdown link escapes repository: ${link.target}`);
        continue;
      }
      if (!exists(resolved)) {
        fail(`${relativeToProject(file)}: broken local Markdown link ${link.target}`);
        continue;
      }
      if (fragment && path.extname(resolved).toLowerCase() === ".md") {
        let anchors = anchorCache.get(resolved);
        if (!anchors) {
          const targetText = readText(resolved);
          if (targetText === null) {
            continue;
          }
          anchors = markdownAnchors(targetText);
          anchorCache.set(resolved, anchors);
        }
        if (!anchors.has(fragment)) {
          fail(
            `${relativeToProject(file)}: missing fragment #${fragment} in `
              + `${relativeToRepo(resolved)}`,
          );
        }
      }
    }
  }

  const duplicateResult = findDuplicateProse(manuscriptRecords);
  summary.duplicateProse.exactParagraphs = duplicateResult.exactParagraphs.length;
  summary.duplicateProse.tokenSequences = duplicateResult.tokenSequences.length;
  const maximumDuplicateFailures = 40;
  const maximumDuplicateWarnings = 30;
  duplicateResult.exactParagraphs.slice(0, maximumDuplicateFailures).forEach((duplicate) => {
    fail(
      `DUPLICATE exact prose paragraph (${duplicate.characters} characters, `
        + `${duplicate.occurrences} occurrences) in `
        + `${[...new Set(duplicate.files)].map(relativeToProject).join(", ")}: `
        + `"${duplicate.snippet}"`,
    );
  });
  if (duplicateResult.exactParagraphs.length > maximumDuplicateFailures) {
    fail(
      `DUPLICATE ${duplicateResult.exactParagraphs.length - maximumDuplicateFailures} `
        + "additional exact prose paragraphs omitted",
    );
  }
  duplicateResult.tokenSequences.slice(0, maximumDuplicateWarnings).forEach((duplicate) => {
    warn(
      `DUPLICATE 18-token prose sequence in `
        + `${duplicate.files.map(relativeToProject).join(", ")}: "${duplicate.snippet}"`,
    );
  });
  if (duplicateResult.tokenSequences.length > maximumDuplicateWarnings) {
    warn(
      `DUPLICATE ${duplicateResult.tokenSequences.length - maximumDuplicateWarnings} `
        + "additional 18-token prose sequences omitted",
    );
  }

  summary.counts.failures = failures.length;
  summary.counts.warnings = warnings.length;
  summary.counts.effectiveFailures = failures.length + (strict ? warnings.length : 0);
  summary.status = summary.counts.effectiveFailures === 0 ? "ok" : "fail";
  return summary;
}

function main() {
  if (process.argv.slice(2).some((argument) => argument === "--help" || argument === "-h")) {
    console.log(usage());
    return;
  }

  let options;
  try {
    options = parseArguments(process.argv.slice(2));
  } catch (error) {
    console.log(JSON.stringify({
      status: "error",
      error: error.message,
      usage: usage(),
    }, null, 2));
    process.exitCode = 2;
    return;
  }

  if (options.selfTest) {
    try {
      console.log(JSON.stringify(runSelfTests(), null, 2));
    } catch (error) {
      console.log(JSON.stringify({
        status: "fail",
        selfTests: 0,
        error: error.stack || error.message,
      }, null, 2));
      process.exitCode = 1;
    }
    return;
  }

  const summary = runVerification(options);
  console.log(JSON.stringify(summary, null, 2));
  if (summary.status !== "ok") {
    process.exitCode = 1;
  }
}

module.exports = {
  boundaryNavigationLines,
  canonicalManuscriptNavigation,
  canonicalVolumeNavigation,
  expectedFilePattern,
  extractLocalMarkdownLinks,
  findDuplicateProse,
  inspectMarkdown,
  normalizeTitle,
  parseArguments,
  parseOutlineMetadata,
  parseVolumeReadmeMetadata,
  requiredArtifactsForVolumes,
  runSelfTests,
  runVerification,
  unicodeLength,
  validateDocumentHygiene,
  visibleH1Lines,
};

if (require.main === module) {
  main();
}
