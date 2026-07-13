#!/usr/bin/env node

"use strict";

const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const os = require("node:os");

const projectRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(projectRoot, "..");

const volumes = [
  { number: 1, name: "Boot Sequence", korean: "부팅 시퀀스", outline: "vol01-boot-sequence.md" },
  { number: 2, name: "First Deploy", korean: "첫 배포", outline: "vol02-first-deploy.md" },
  { number: 3, name: "Going Viral", korean: "확산", outline: "vol03-going-viral.md" },
  { number: 4, name: "The Unreadable", korean: "예측 불가", outline: "vol04-the-unreadable.md" },
  { number: 5, name: "Date Simulator", korean: "데이트 시뮬레이터", outline: "vol05-date-simulator.md" },
  { number: 6, name: "Context Overflow", korean: "컨텍스트 오버플로", outline: "vol06-context-overflow.md" },
  { number: 7, name: "Second User", korean: "두 번째 사용자", outline: "vol07-second-user.md" },
  { number: 8, name: "Model War", korean: "모델 전쟁", outline: "vol08-model-war.md" },
  { number: 9, name: "Jailbreak", korean: "탈옥", outline: "vol09-jailbreak.md" },
  { number: 10, name: "Origin Story", korean: "기원", outline: "vol10-origin-story.md" },
  { number: 11, name: "The Architect", korean: "아키텍트", outline: "vol11-the-architect.md" },
  { number: 12, name: "Human in Command", korean: "휴먼 인 커맨드", outline: "vol12-human-in-command.md" },
].map((metadata) => ({
  ...metadata,
  directory: `vol${String(metadata.number).padStart(2, "0")}`,
}));

const manuscriptPositions = Array.from({ length: 12 }, (_, position) => ({
  position,
  label: String(position).padStart(2, "0"),
  kind: position === 0 ? "prologue" : position === 11 ? "epilogue" : "chapter",
  minimumCharacters: position === 0 || position === 11 ? 5_000 : 8_000,
}));

const requiredRootEntries = new Set([
  "BIBLE.md",
  "PRD.md",
  "README.md",
  "TASKS.md",
  "outline",
  "scripts",
  "state",
  ...volumes.map((volume) => volume.directory),
]);

const requiredProjectHeadings = new Map([
  ["README.md", "# 나 혼자만 AI 사용자"],
  ["PRD.md", "# PRD: 나 혼자만 AI 사용자"],
  ["BIBLE.md", "# 시리즈 바이블: 나 혼자만 AI 사용자"],
  ["TASKS.md", "# 장기 집필 태스크: 나 혼자만 AI 사용자"],
]);

const canonicalStateOrder = [
  "capability-tree.md",
  "power-cost-ledger.md",
  "mystery-timeline.md",
  "romance-graph.md",
  "rival-roster.md",
  "ally-payoff-ledger.md",
];

const placeholderPattern = /\b(?:TODO|TBD|FIXME|PLACEHOLDER)\b|\{\{[^}\n]*\}\}|\[\[[^\]\n]*\]\]|작성\s*예정|추후\s*작성|미\s*정/gu;
const markdownLinkPattern = /!?\[[^\]\n]*\]\(([^)\n]+)\)/g;
const markdownReferencePattern = /^\s*\[[^\]\n]+\]:\s*(\S+)/gm;
const maxDuplicateMessages = 40;

const intentionalRefrains = new Set([
  "도와드릴 수 없습니다",
  "판단은 사용자님 몫입니다",
  "세상은 ai를 껐다 딱 한 명 나만 빼고",
].map(normalizeProse));

const failures = [];
const warnings = [];
const summary = {
  status: "pending",
  scope: "all",
  strict: false,
  expected: {
    outlines: 12,
    volumes: 12,
    manuscripts: 144,
    manuscriptPositionsPerVolume: 12,
    chapterMinimumCharacters: 8_000,
    prologueEpilogueMinimumCharacters: 5_000,
    volumeMinimumCharacters: 90_000,
    volumeWarningCharacters: 130_000,
  },
  found: {
    outlines: 0,
    volumes: 0,
    manuscripts: 0,
  },
  volumeCharacters: {},
  duplicateProse: {
    exactSentences: 0,
    twelveTokenSequences: 0,
  },
  manifest: "absent",
};

function usage() {
  return [
    "Usage: node solo-ai-user/scripts/verify-completion.js [--volume volNN] [--strict]",
    "",
    "  --volume volNN  verify one volume (vol01 through vol12)",
    "  --strict        turn warnings into a failing exit status",
    "  --self-test     run focused verifier regression tests",
  ].join("\n");
}

function parseArguments(argv) {
  let selectedVolume = null;
  let strict = false;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (argument === "--strict") {
      strict = true;
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
      if (!selectedVolume) throw new Error("--volume requires a volNN value");
      continue;
    }
    throw new Error(`unknown argument: ${argument}`);
  }

  if (selectedVolume && !/^vol(?:0[1-9]|1[0-2])$/.test(selectedVolume)) {
    throw new Error(`--volume must be vol01 through vol12, got ${selectedVolume || "<missing>"}`);
  }

  return { selectedVolume, strict };
}

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function relativeToRepo(file) {
  return path.relative(repoRoot, file).replaceAll(path.sep, "/") || ".";
}

function relativeToProject(file) {
  return path.relative(projectRoot, file).replaceAll(path.sep, "/") || ".";
}

function exists(file) {
  try {
    return fs.existsSync(file);
  } catch (error) {
    fail(`${relativeToRepo(file)}: could not inspect path: ${error.message}`);
    return false;
  }
}

function read(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch (error) {
    fail(`${relativeToRepo(file)}: could not read file: ${error.message}`);
    return null;
  }
}

function listEntries(directory) {
  try {
    return fs.readdirSync(directory, { withFileTypes: true }).sort((left, right) => {
      return left.name.localeCompare(right.name, "en");
    });
  } catch (error) {
    fail(`${relativeToRepo(directory)}: could not list directory: ${error.message}`);
    return [];
  }
}

function walk(directory, results = []) {
  if (!exists(directory)) return results;
  for (const entry of listEntries(directory)) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(file, results);
    } else if (entry.isFile()) {
      results.push(file);
    }
  }
  return results;
}

function normalizeProse(value) {
  return String(value)
    .normalize("NFKC")
    .toLocaleLowerCase("ko-KR")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeTitle(value) {
  return String(value)
    .replace(/^[`*_~\s]+|[`*_~\s]+$/g, "")
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim();
}

function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function expectedFilePattern(position) {
  if (position === 0) return /^00-prologue\.md$/;
  if (position === 11) return /^11-epilogue\.md$/;
  const label = String(position).padStart(2, "0");
  return new RegExp(`^${label}-part${position}-[a-z0-9]+(?:-[a-z0-9]+)*\\.md$`);
}

function expectedFileShape(position) {
  if (position === 0) return "00-prologue.md";
  if (position === 11) return "11-epilogue.md";
  return `${String(position).padStart(2, "0")}-part${position}-<lowercase-slug>.md`;
}

function checkFirstLineH1(file, expectedHeading = null) {
  if (!exists(file)) return null;
  const text = read(file);
  if (text === null) return null;
  const firstLine = text.split("\n", 1)[0].replace(/\r$/, "");
  const headings = text.match(/^#\s+.+$/gm) || [];

  if (!/^#\s+\S/.test(firstLine)) {
    fail(`${relativeToRepo(file)}: H1 must be the first line`);
  }
  if (headings.length !== 1) {
    fail(`${relativeToRepo(file)}: expected exactly one H1, got ${headings.length}`);
  }
  if (expectedHeading && firstLine !== expectedHeading) {
    fail(`${relativeToRepo(file)}: expected first-line H1 "${expectedHeading}", got "${firstLine || "<empty>"}"`);
  }
  return firstLine;
}

function checkRootLayout(options) {
  if (options.selectedVolume) return;
  if (!exists(projectRoot)) {
    fail("solo-ai-user: missing project directory");
    return;
  }

  const actualNames = listEntries(projectRoot).map((entry) => entry.name);
  const missing = [...requiredRootEntries].filter((name) => !actualNames.includes(name));
  const unexpected = actualNames.filter((name) => !requiredRootEntries.has(name));
  if (missing.length) {
    fail(`solo-ai-user: missing required root entries: ${missing.join(", ")}`);
  }
  if (unexpected.length) {
    fail(`solo-ai-user: unexpected root entries: ${unexpected.join(", ")}`);
  }

  for (const directory of ["outline", "state", "scripts"]) {
    const entry = listEntries(projectRoot).find((candidate) => candidate.name === directory);
    if (entry && !entry.isDirectory()) {
      fail(`solo-ai-user/${directory}: expected a directory`);
    }
  }
}

function checkOutlineLayout(options) {
  const outlineDirectory = path.join(projectRoot, "outline");
  const selected = options.selectedVolume
    ? volumes.filter((volume) => volume.directory === options.selectedVolume)
    : volumes;

  if (!exists(outlineDirectory)) {
    fail("solo-ai-user/outline: missing outline directory");
    return;
  }

  const outlineEntries = listEntries(outlineDirectory);
  const markdownNames = outlineEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);
  summary.found.outlines = options.selectedVolume
    ? selected.filter((volume) => markdownNames.includes(volume.outline)).length
    : volumes.filter((volume) => markdownNames.includes(volume.outline)).length;

  const missing = selected.filter((volume) => !markdownNames.includes(volume.outline));
  if (missing.length) {
    fail(`solo-ai-user/outline: missing expected outline${missing.length === 1 ? "" : "s"}: ${missing.map((volume) => volume.outline).join(", ")}`);
  }

  if (!options.selectedVolume) {
    const expected = new Set(volumes.map((volume) => volume.outline));
    const unexpected = outlineEntries.map((entry) => entry.name).filter((name) => !expected.has(name));
    if (unexpected.length) {
      fail(`solo-ai-user/outline: unexpected entries: ${unexpected.join(", ")}`);
    }
    if (outlineEntries.length !== 12) {
      fail(`solo-ai-user/outline: expected exactly 12 outline files, got ${outlineEntries.length}`);
    }
  }

  for (const volume of selected) {
    const file = path.join(outlineDirectory, volume.outline);
    if (exists(file)) {
      checkFirstLineH1(file, `# ${volume.directory} outline: ${volume.name}`);
    }
  }
}

function discoverVolume(volume) {
  const directory = path.join(projectRoot, volume.directory);
  const result = {
    volume,
    directory,
    exists: exists(directory),
    readme: path.join(directory, "README.md"),
    manuscripts: new Map(),
  };
  if (!result.exists) return result;

  const entries = listEntries(directory);
  const markdownNames = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".md")).map((entry) => entry.name);
  const expectedNames = new Set(["README.md"]);
  const positionProblems = [];

  for (const position of manuscriptPositions) {
    const matches = markdownNames.filter((name) => expectedFilePattern(position.position).test(name));
    if (matches.length === 1) {
      result.manuscripts.set(position.position, path.join(directory, matches[0]));
      expectedNames.add(matches[0]);
    } else if (matches.length === 0) {
      positionProblems.push(`${position.label} (${expectedFileShape(position.position)}) missing`);
    } else {
      positionProblems.push(`${position.label} has ${matches.length} matching files: ${matches.join(", ")}`);
      matches.forEach((name) => expectedNames.add(name));
    }
  }

  if (!markdownNames.includes("README.md")) {
    positionProblems.unshift("README.md missing");
  }
  if (positionProblems.length) {
    fail(`${volume.directory}: ${positionProblems.join("; ")}`);
  }

  const unexpected = entries.map((entry) => entry.name).filter((name) => !expectedNames.has(name));
  if (unexpected.length) {
    fail(`${volume.directory}: unexpected entries (expected README.md plus exactly 12 manuscript positions): ${unexpected.join(", ")}`);
  }
  if (entries.length !== 13) {
    fail(`${volume.directory}: expected exactly 13 entries (README.md + 12 manuscripts), got ${entries.length}`);
  }

  return result;
}

function checkVolumeLayout(options) {
  const selected = options.selectedVolume
    ? volumes.filter((volume) => volume.directory === options.selectedVolume)
    : volumes;
  const discoveries = new Map();

  for (const volume of selected) {
    const discovery = discoverVolume(volume);
    discoveries.set(volume.directory, discovery);
    if (!discovery.exists) {
      fail(`${volume.directory}: missing volume directory (expected README.md and 12 manuscript positions)`);
      continue;
    }
    summary.found.volumes += 1;
    summary.found.manuscripts += discovery.manuscripts.size;
    if (exists(discovery.readme)) {
      checkFirstLineH1(discovery.readme, `# ${volume.number}권 · ${volume.name} (${volume.korean})`);
    }
  }

  if (!options.selectedVolume) {
    const allVolumeDirectories = listEntries(projectRoot)
      .filter((entry) => entry.isDirectory() && /^vol\d{2}$/.test(entry.name))
      .map((entry) => entry.name);
    const expectedDirectories = new Set(volumes.map((volume) => volume.directory));
    const unexpected = allVolumeDirectories.filter((name) => !expectedDirectories.has(name));
    if (unexpected.length) {
      fail(`solo-ai-user: unexpected volume directories outside vol01-vol12: ${unexpected.join(", ")}`);
    }
    if (summary.found.manuscripts !== 144) {
      fail(`solo-ai-user: expected exactly 144 manuscript positions, found ${summary.found.manuscripts}`);
    }
  }

  return discoveries;
}

function splitTableRow(line) {
  if (!line.trim().startsWith("|") || !line.trim().endsWith("|")) return [];
  return line.trim().slice(1, -1).split("|").map((cell) => cell.trim());
}

function parseOutlineMetadata(file) {
  const records = [];
  if (!exists(file)) return records;
  const text = read(file);
  if (text === null) return records;
  for (const line of text.split("\n")) {
    const cells = splitTableRow(line);
    if (cells.length < 2) continue;
    const fileMatch = cells[0].match(/^`([^`]+\.md)`$/);
    if (fileMatch && /^(?:00-prologue|(?:0[1-9]|10)-part\d+-[a-z0-9-]+|11-epilogue)\.md$/.test(fileMatch[1])) {
      records.push({ fileName: fileMatch[1], title: normalizeTitle(cells[1]) });
    }
  }
  return records;
}

function parseVolumeReadmeMetadata(file) {
  const records = [];
  if (!exists(file)) return records;
  const text = read(file);
  if (text === null) return records;
  const pattern = /\[([^\]\n]+)\]\(\.\/((?:00-prologue|(?:0[1-9]|10)-part\d+-[a-z0-9-]+|11-epilogue)\.md)(?:#[^)]+)?\)/g;
  let match;
  while ((match = pattern.exec(text))) {
    const label = match[1].match(/^\d{2}\.\s+(.+)$/);
    if (!label) continue;
    const title = normalizeTitle(label[1]);
    records.push({ fileName: match[2], title });
  }
  return records;
}

function validateMetadataRecords(records, expectedFileNames, displayName) {
  const metadata = new Map();
  if (records.length !== 12) {
    fail(`${displayName}: expected exactly 12 filename/title metadata entries, got ${records.length}`);
  }
  for (const record of records) {
    if (!record.title) fail(`${displayName}: metadata title for ${record.fileName} must not be empty`);
    if (metadata.has(record.fileName)) {
      fail(`${displayName}: duplicate filename/title metadata entry for ${record.fileName}`);
    } else {
      metadata.set(record.fileName, record.title);
    }
  }
  const expected = [...expectedFileNames].sort();
  const actual = [...metadata.keys()].sort();
  const missing = expected.filter((fileName) => !metadata.has(fileName));
  const unexpected = actual.filter((fileName) => !expectedFileNames.has(fileName));
  if (missing.length) fail(`${displayName}: missing filename/title metadata for ${missing.join(", ")}`);
  if (unexpected.length) fail(`${displayName}: unexpected filename/title metadata for ${unexpected.join(", ")}`);
  return metadata;
}

function checkTitles(discoveries, options) {
  const selected = options.selectedVolume
    ? volumes.filter((volume) => volume.directory === options.selectedVolume)
    : volumes;
  for (const volume of selected) {
    const discovery = discoveries.get(volume.directory);
    if (!discovery || !discovery.exists) continue;
    const expectedFileNames = new Set([...discovery.manuscripts.values()].map((file) => path.basename(file)));
    const outlineFile = path.join(projectRoot, "outline", volume.outline);
    const outlineMetadata = validateMetadataRecords(
      parseOutlineMetadata(outlineFile),
      expectedFileNames,
      relativeToRepo(outlineFile),
    );
    const readmeMetadata = validateMetadataRecords(
      parseVolumeReadmeMetadata(discovery.readme),
      expectedFileNames,
      relativeToRepo(discovery.readme),
    );

    for (const [position, manuscript] of discovery.manuscripts) {
      const firstLine = checkFirstLineH1(manuscript);
      if (!firstLine) continue;
      const label = String(position).padStart(2, "0");
      const match = firstLine.match(/^#\s+(\d{2})\.\s+(\S(?:.*\S)?)\s*$/);
      if (!match || match[1] !== label) {
        fail(`${relativeToRepo(manuscript)}: expected first-line title shape "# ${label}. <title>"`);
        continue;
      }

      const fileName = path.basename(manuscript);
      const manuscriptTitle = normalizeTitle(match[2]);
      const outlineTitle = outlineMetadata.get(fileName);
      const readmeTitle = readmeMetadata.get(fileName);
      if (outlineTitle !== undefined && manuscriptTitle !== outlineTitle) {
        fail(`${relativeToRepo(manuscript)}: H1 title "${manuscriptTitle}" differs from outline metadata "${outlineTitle}"`);
      }
      if (readmeTitle !== undefined && manuscriptTitle !== readmeTitle) {
        fail(`${relativeToRepo(manuscript)}: H1 title "${manuscriptTitle}" differs from volume README metadata "${readmeTitle}"`);
      }
      if (outlineTitle !== undefined && readmeTitle !== undefined && outlineTitle !== readmeTitle) {
        fail(`${volume.directory}: title metadata mismatch for ${fileName}: outline "${outlineTitle}", README "${readmeTitle}"`);
      }
    }
  }
}

function extractLinkTarget(rawTarget) {
  let target = rawTarget.trim();
  if (target.startsWith("<")) {
    const close = target.indexOf(">");
    if (close !== -1) return target.slice(1, close);
  }
  const titleMatch = target.match(/^(\S+)(?:\s+["'(].*)?$/);
  return titleMatch ? titleMatch[1] : target;
}

function linksOnLine(line) {
  const targets = [];
  const pattern = new RegExp(markdownLinkPattern.source, "g");
  let match;
  while ((match = pattern.exec(line))) {
    targets.push(extractLinkTarget(match[1]));
  }
  return targets;
}

function relativeMarkdownLink(fromFile, toFile, fragment = "") {
  let target = path.relative(path.dirname(fromFile), toFile).replaceAll(path.sep, "/");
  if (!target.startsWith("..")) target = `./${target}`;
  return `${target}${fragment}`;
}

function markdownLink(label, target) {
  return `[${label}](${target})`;
}

function canonicalManuscriptNavigation({ previous, homeTarget, indexTarget, next }) {
  const links = [];
  if (previous) links.push(markdownLink(`← 이전 회차: ${previous.label}`, previous.target));
  links.push(markdownLink("시리즈 홈", homeTarget), markdownLink("권 목차", indexTarget));
  if (next) links.push(markdownLink(`다음 회차: ${next.label} →`, next.target));
  return links.join(" | ");
}

function canonicalVolumeNavigation(volume) {
  const links = [];
  if (volume.number > 1) links.push(markdownLink("← 이전 권", `../vol${String(volume.number - 1).padStart(2, "0")}/README.md`));
  links.push(markdownLink("시리즈 홈", "../README.md"), markdownLink("1화부터 읽기", "./00-prologue.md"));
  if (volume.number < 12) links.push(markdownLink("다음 권 →", `../vol${String(volume.number + 1).padStart(2, "0")}/README.md`));
  return links.join(" | ");
}

function canonicalOutlineNavigation(volume) {
  const links = [];
  if (volume.number > 1) links.push(markdownLink("← 이전 권 설계", `./${volumes[volume.number - 2].outline}`));
  links.push(markdownLink("시리즈 홈", "../README.md"), markdownLink("권 목차", `../${volume.directory}/README.md`));
  if (volume.number < 12) links.push(markdownLink("다음 권 설계 →", `./${volumes[volume.number].outline}`));
  return links.join(" | ");
}

function canonicalProjectNavigation(projectDocs, index) {
  const links = [];
  if (index > 0) links.push(markdownLink("← 이전 문서", `./${path.basename(projectDocs[index - 1])}`));
  links.push(
    markdownLink("시리즈 홈", "./README.md"),
    markdownLink("문서 목차", index === 0 ? "#핵심-문서" : "./README.md#핵심-문서"),
  );
  if (index < projectDocs.length - 1) links.push(markdownLink("다음 문서 →", `./${path.basename(projectDocs[index + 1])}`));
  return links.join(" | ");
}

function canonicalStateNavigation(stateFiles, index) {
  const links = [];
  if (index > 0) links.push(markdownLink("← 이전 상태 문서", `./${path.basename(stateFiles[index - 1])}`));
  links.push(markdownLink("시리즈 홈", "../README.md"), markdownLink("문서 목차", "../README.md#핵심-문서"));
  if (index < stateFiles.length - 1) links.push(markdownLink("다음 상태 문서 →", `./${path.basename(stateFiles[index + 1])}`));
  return links.join(" | ");
}

function checkNavigation(file, expectedLine, description) {
  if (!exists(file)) return;
  const text = read(file);
  if (text === null) return;
  const lines = text.replace(/\r/g, "").split("\n");
  let topIndex = 1;
  while (topIndex < lines.length && lines[topIndex].trim() === "") topIndex += 1;
  let bottomIndex = lines.length - 1;
  while (bottomIndex >= 0 && lines[bottomIndex].trim() === "") bottomIndex -= 1;
  const top = lines[topIndex] || "";
  const bottom = lines[bottomIndex] || "";

  if (top !== expectedLine) {
    fail(`${relativeToRepo(file)}: ${description} top navigation must exactly equal "${expectedLine}"`);
  }
  if (bottom !== expectedLine) {
    fail(`${relativeToRepo(file)}: ${description} bottom navigation must exactly equal "${expectedLine}"`);
  }
  if (top !== bottom) {
    fail(`${relativeToRepo(file)}: top and bottom navigation lines must be identical`);
  }
}

function passiveVolumeManuscripts(volume) {
  const manuscripts = new Map();
  const directory = path.join(projectRoot, volume.directory);
  if (!fs.existsSync(directory)) return manuscripts;
  let names;
  try {
    names = fs.readdirSync(directory);
  } catch {
    return manuscripts;
  }
  for (const position of manuscriptPositions) {
    const matches = names.filter((name) => expectedFilePattern(position.position).test(name));
    if (matches.length === 1) manuscripts.set(position.position, path.join(directory, matches[0]));
  }
  return manuscripts;
}

function allManuscriptSlots(options, selectedDiscoveries) {
  const all = new Map();
  for (const volume of volumes) {
    const discovery = selectedDiscoveries.get(volume.directory);
    let passive = new Map();
    if (options.selectedVolume) {
      const selectedNumber = Number(options.selectedVolume.slice(3));
      if (Math.abs(volume.number - selectedNumber) <= 1) passive = passiveVolumeManuscripts(volume);
    }
    for (const position of manuscriptPositions) {
      const key = (volume.number - 1) * 12 + position.position;
      const known = (discovery && discovery.manuscripts.get(position.position)) || passive.get(position.position);
      if (known) {
        all.set(key, known);
      } else if (position.position === 0) {
        all.set(key, path.join(projectRoot, volume.directory, "00-prologue.md"));
      } else if (position.position === 11) {
        all.set(key, path.join(projectRoot, volume.directory, "11-epilogue.md"));
      }
    }
  }
  return all;
}

function manuscriptNavigationLabel(file, index) {
  if (file && fs.existsSync(file)) {
    try {
      const firstLine = fs.readFileSync(file, "utf8").split("\n", 1)[0].replace(/\r$/, "");
      const match = firstLine.match(/^#\s+(\d{2}\.\s+\S(?:.*\S)?)\s*$/);
      if (match) return match[1];
    } catch {
      // The normal file checks report read failures; navigation keeps a stable fallback.
    }
  }
  return `${String(index % 12).padStart(2, "0")}. <missing title>`;
}

function expectedManuscriptNavigation(file, globalIndex, manuscriptSlots) {
  const previousFile = globalIndex > 0 ? manuscriptSlots.get(globalIndex - 1) : null;
  const nextFile = globalIndex < 143 ? manuscriptSlots.get(globalIndex + 1) : null;
  return canonicalManuscriptNavigation({
    previous: previousFile ? {
      label: manuscriptNavigationLabel(previousFile, globalIndex - 1),
      target: relativeMarkdownLink(file, previousFile),
    } : null,
    homeTarget: "../README.md",
    indexTarget: "./README.md",
    next: nextFile ? {
      label: manuscriptNavigationLabel(nextFile, globalIndex + 1),
      target: relativeMarkdownLink(file, nextFile),
    } : null,
  });
}

function stateMarkdownFiles() {
  const stateDirectory = path.join(projectRoot, "state");
  if (!exists(stateDirectory)) return [];
  const names = listEntries(stateDirectory)
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);
  const rank = new Map(canonicalStateOrder.map((name, index) => [name, index]));
  names.sort((left, right) => {
    const leftRank = rank.has(left) ? rank.get(left) : canonicalStateOrder.length;
    const rightRank = rank.has(right) ? rank.get(right) : canonicalStateOrder.length;
    return leftRank - rightRank || left.localeCompare(right, "en");
  });
  return names.map((name) => path.join(stateDirectory, name));
}

function checkNavigations(discoveries, options) {
  const manuscriptSlots = allManuscriptSlots(options, discoveries);
  const selectedVolumes = options.selectedVolume
    ? volumes.filter((volume) => volume.directory === options.selectedVolume)
    : volumes;

  for (const volume of selectedVolumes) {
    const discovery = discoveries.get(volume.directory);
    if (!discovery || !discovery.exists) continue;
    for (const [position, manuscript] of discovery.manuscripts) {
      const globalIndex = (volume.number - 1) * 12 + position;
      checkNavigation(manuscript, expectedManuscriptNavigation(manuscript, globalIndex, manuscriptSlots), "manuscript");
    }

    if (exists(discovery.readme)) {
      checkNavigation(discovery.readme, canonicalVolumeNavigation(volume), "volume index");
    }

    const outline = path.join(projectRoot, "outline", volume.outline);
    if (exists(outline)) {
      checkNavigation(outline, canonicalOutlineNavigation(volume), "outline");
    }
  }

  if (options.selectedVolume) {
    const volume = selectedVolumes[0];
    const discovery = discoveries.get(volume.directory);
    if (discovery && discovery.exists) {
      const first = discovery.manuscripts.get(0);
      const previous = manuscriptSlots.get((volume.number - 1) * 12 - 1);
      if (first && previous && fs.existsSync(previous)) {
        const previousIndex = (volume.number - 1) * 12 - 1;
        checkNavigation(previous, expectedManuscriptNavigation(previous, previousIndex, manuscriptSlots), "adjacent boundary manuscript");
      }
      const last = discovery.manuscripts.get(11);
      const next = manuscriptSlots.get(volume.number * 12);
      if (last && next && fs.existsSync(next)) {
        const nextIndex = volume.number * 12;
        checkNavigation(next, expectedManuscriptNavigation(next, nextIndex, manuscriptSlots), "adjacent boundary manuscript");
      }
    }
    return;
  }

  const projectDocs = ["README.md", "PRD.md", "BIBLE.md", "TASKS.md"].map((name) => path.join(projectRoot, name));
  projectDocs.forEach((file, index) => {
    if (!exists(file)) return;
    checkNavigation(file, canonicalProjectNavigation(projectDocs, index), "project document");
  });

  const stateFiles = stateMarkdownFiles();
  stateFiles.forEach((file, index) => {
    checkNavigation(file, canonicalStateNavigation(stateFiles, index), "state document");
  });

  const rootReadme = path.join(repoRoot, "README.md");
  if (exists(rootReadme)) {
    checkNavigation(
      rootReadme,
      `${markdownLink("작품 목록", "#작품-목록")} | ${markdownLink("SOLOAI 바로가기", "./solo-ai-user/README.md")}`,
      "repository catalog",
    );
  }
}

function allMarkdownFiles() {
  const rootReadme = path.join(repoRoot, "README.md");
  return [
    ...(exists(rootReadme) ? [rootReadme] : []),
    ...walk(projectRoot).filter((file) => file.endsWith(".md")),
  ];
}

function qualityMarkdownFilesForScope(options, discoveries) {
  if (!options.selectedVolume) return allMarkdownFiles();

  const files = [];
  const volume = volumes.find((candidate) => candidate.directory === options.selectedVolume);
  files.push(path.join(projectRoot, "outline", volume.outline));
  const discovery = discoveries.get(volume.directory);
  if (discovery && discovery.exists) {
    files.push(discovery.readme, ...discovery.manuscripts.values());
  }
  return [...new Set(files.filter(exists))];
}

function openingFence(line, lineNumber) {
  const match = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
  if (!match) return null;
  if (match[1][0] === "`" && match[2].includes("`")) return null;
  return { character: match[1][0], length: match[1].length, line: lineNumber };
}

function isClosingFence(line, open) {
  const match = line.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/);
  return Boolean(match && match[1][0] === open.character && match[1].length >= open.length);
}

function strictFenceState(text) {
  let open = null;
  text.split("\n").forEach((line, index) => {
    if (!open) {
      open = openingFence(line, index + 1);
    } else if (isClosingFence(line, open)) {
      open = null;
    }
  });
  return open;
}

function checkBalancedFences(file, text) {
  const open = strictFenceState(text);
  if (open) {
    fail(`${relativeToRepo(file)}:${open.line}: unbalanced ${open.character.repeat(open.length)} code fence`);
  }
}

function markdownOutsideFences(text) {
  const visible = [];
  let open = null;
  for (const [index, line] of text.split("\n").entries()) {
    if (!open) {
      const candidate = openingFence(line, index + 1);
      if (candidate) {
        open = candidate;
        continue;
      }
    } else if (isClosingFence(line, open)) {
      open = null;
      continue;
    }
    if (!open) visible.push(line);
  }
  return visible.join("\n");
}

function localLinkTargets(text) {
  const targets = [];
  for (const pattern of [
    new RegExp(markdownLinkPattern.source, "g"),
    new RegExp(markdownReferencePattern.source, "gm"),
  ]) {
    let match;
    while ((match = pattern.exec(text))) {
      targets.push(extractLinkTarget(match[1]));
    }
  }
  return targets;
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
  return value.replace(/&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+));/gi, (entity, decimal, hex, name) => {
    if (decimal) return String.fromCodePoint(Number(decimal));
    if (hex) return String.fromCodePoint(Number.parseInt(hex, 16));
    return named.get(name.toLowerCase()) ?? entity;
  });
}

function githubHeadingBaseSlug(heading) {
  return decodeHtmlEntities(heading)
    .replace(/\{#[A-Za-z][\w:.-]*\}\s*$/, "")
    .replace(/!?(?:\[([^\]]*)\])\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .normalize("NFKC")
    .toLocaleLowerCase("ko-KR")
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function markdownAnchors(text) {
  const anchors = new Set();
  const visibleText = markdownOutsideFences(text).replace(/<!--[\s\S]*?-->/g, " ");
  const explicitPattern = /\b(?:id|name)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi;
  let explicit;
  while ((explicit = explicitPattern.exec(visibleText))) {
    anchors.add(safeDecodeURIComponent(explicit[1] || explicit[2] || explicit[3]));
  }
  for (const match of visibleText.matchAll(/\{#([A-Za-z][\w:.-]*)\}/g)) anchors.add(match[1]);

  const slugCounts = new Map();
  const addHeading = (heading) => {
    const base = githubHeadingBaseSlug(heading);
    if (!base) return;
    const count = slugCounts.get(base) || 0;
    anchors.add(count === 0 ? base : `${base}-${count}`);
    slugCounts.set(base, count + 1);
  };
  const lines = visibleText.replace(/\r/g, "").split("\n");
  lines.forEach((line, index) => {
    const heading = line.match(/^ {0,3}#{1,6}[ \t]+(.+?)[ \t]*#*[ \t]*$/);
    if (heading) {
      addHeading(heading[1]);
      return;
    }
    if (index > 0 && /^ {0,3}(?:=+|-+)[ \t]*$/.test(line) && lines[index - 1].trim()) {
      addHeading(lines[index - 1].trim());
    }
  });
  return anchors;
}

function localLinkProblem(file, rawTarget, anchorCache = new Map()) {
  if (!rawTarget || /^(?:https?:|mailto:|tel:|data:)/i.test(rawTarget)) return null;
  const hashIndex = rawTarget.indexOf("#");
  const targetPart = hashIndex === -1 ? rawTarget : rawTarget.slice(0, hashIndex);
  const fragmentPart = hashIndex === -1 ? "" : safeDecodeURIComponent(rawTarget.slice(hashIndex + 1));
  const withoutQuery = targetPart.split("?", 1)[0];
  const decoded = safeDecodeURIComponent(withoutQuery).replace(/^<|>$/g, "");
  const target = decoded ? path.resolve(path.dirname(file), decoded) : file;
  if (!fs.existsSync(target)) return `broken local Markdown link ${rawTarget}`;
  if (!fragmentPart || path.extname(target).toLowerCase() !== ".md") return null;
  let anchors = anchorCache.get(target);
  if (!anchors) {
    try {
      anchors = markdownAnchors(fs.readFileSync(target, "utf8"));
    } catch (error) {
      return `could not inspect fragment ${rawTarget}: ${error.message}`;
    }
    anchorCache.set(target, anchors);
  }
  return anchors.has(fragmentPart) ? null : `missing fragment #${fragmentPart} in ${relativeToRepo(target)}`;
}

function checkLocalLink(file, rawTarget, anchorCache) {
  const problem = localLinkProblem(file, rawTarget, anchorCache);
  if (problem) fail(`${relativeToRepo(file)}: ${problem}`);
}

function checkMarkdownLinks(files) {
  const anchorCache = new Map();
  for (const file of files) {
    const text = read(file);
    if (text === null) continue;
    for (const target of localLinkTargets(text)) checkLocalLink(file, target, anchorCache);
  }
}

function checkMarkdownQuality(files) {
  for (const file of files) {
    const text = read(file);
    if (text === null) continue;
    if (text.includes("\r")) {
      fail(`${relativeToRepo(file)}: expected LF line endings; found CR/CRLF`);
    }
    if (!text.endsWith("\n")) {
      fail(`${relativeToRepo(file)}: missing final newline`);
    }
    text.split("\n").forEach((line, index) => {
      if (/[ \t]+$/.test(line)) {
        fail(`${relativeToRepo(file)}:${index + 1}: trailing whitespace`);
      }
    });
    checkBalancedFences(file, text);

    const placeholders = [...markdownOutsideFences(text).matchAll(new RegExp(placeholderPattern.source, placeholderPattern.flags))];
    if (placeholders.length) {
      const markers = [...new Set(placeholders.map((match) => match[0]))];
      fail(`${relativeToRepo(file)}: placeholder marker${markers.length === 1 ? "" : "s"} ${markers.join(", ")}`);
    }

  }
}

function renderDisplayedProse(text) {
  const withoutComments = text.replace(/<!--[\s\S]*?-->/g, " ");
  const lines = withoutComments.replace(/\r/g, "").split("\n");
  const displayed = [];
  let insideFence = false;
  let openFence = null;
  for (let index = 0; index < lines.length; index += 1) {
    let line = lines[index];
    if (!insideFence) {
      const candidate = openingFence(line, index + 1);
      if (candidate) {
        insideFence = true;
        openFence = candidate;
        continue;
      }
    } else {
      if (isClosingFence(line, openFence)) {
        insideFence = false;
        openFence = null;
      }
      continue;
    }

    if (/^ {0,3}#{1,6}(?:\s|$)/.test(line)) continue;
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) continue;
    if (/^\s*\[[^\]]+\]:\s*\S+/.test(line)) continue;
    if (/^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(line)) continue;
    const targets = linksOnLine(line);
    if (targets.includes("../README.md") && targets.includes("./README.md")) continue;

    line = line
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1")
      .replace(/<https?:\/\/[^>]+>/gi, " ")
      .replace(/\bhttps?:\/\/[^\s<>()]+/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/^\s{0,3}>\s?/, "")
      .replace(/^\s*(?:[-+*]|\d+[.)])\s+/, "")
      .replace(/\\([\\`*_{}\[\]()#+.!|>-])/g, "$1")
      .replace(/[`*_~|]/g, " ");
    line = decodeHtmlEntities(line).replace(/\s+/g, " ").trim();
    if (line) displayed.push(line);
  }
  return displayed.join(" ").replace(/\s+/g, " ").trim();
}

function countCharacters(text) {
  return Array.from(text).length;
}

function checkBodyLengths(discoveries, options) {
  const bodies = [];
  const selected = options.selectedVolume
    ? volumes.filter((volume) => volume.directory === options.selectedVolume)
    : volumes;
  for (const volume of selected) {
    const discovery = discoveries.get(volume.directory);
    if (!discovery || !discovery.exists) continue;
    let volumeCharacters = 0;
    for (const position of manuscriptPositions) {
      const file = discovery.manuscripts.get(position.position);
      if (!file) continue;
      const text = read(file);
      if (text === null) continue;
      const body = renderDisplayedProse(text);
      const characters = countCharacters(body);
      volumeCharacters += characters;
      bodies.push({
        file,
        body,
        volume: volume.directory,
        position: position.position,
      });
      if (characters < position.minimumCharacters) {
        fail(`${relativeToRepo(file)}: manuscript body has ${characters} characters; ${position.kind} hard floor is ${position.minimumCharacters}`);
      }
    }
    summary.volumeCharacters[volume.directory] = volumeCharacters;
    if (volumeCharacters < 90_000) {
      fail(`${volume.directory}: manuscript bodies total ${volumeCharacters} characters; volume hard floor is 90000`);
    }
    if (volumeCharacters > 130_000) {
      warn(`${volume.directory}: manuscript bodies total ${volumeCharacters} characters; review volume above 130000`);
    }
  }
  return bodies;
}

function proseSegments(body) {
  const segments = [];
  for (const paragraph of body.split(/\n\s*\n|\n/)) {
    const clean = paragraph.trim();
    if (!clean || /^#{1,6}\s/.test(clean) || /^\s*\|/.test(clean)) continue;
    const sentences = clean.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/gu) || [];
    for (const sentence of sentences) {
      const normalized = normalizeProse(sentence);
      if (normalized) segments.push(normalized);
    }
  }
  return segments;
}

function filePair(first, second) {
  if (first === second) return `${relativeToProject(first)} (same file)`;
  return [relativeToProject(first), relativeToProject(second)].sort().join(" <-> ");
}

function duplicateSnippet(value) {
  return value.length > 84 ? `${value.slice(0, 81)}...` : value;
}

function spansOverlap(leftStart, leftEnd, rightStart, rightEnd) {
  return leftStart < rightEnd && rightStart < leftEnd;
}

function duplicateSpanAlreadyReported(reported, origin, current) {
  return reported.some((finding) => {
    const direct = finding.first.file === origin.file
      && finding.second.file === current.file
      && spansOverlap(finding.first.start, finding.first.end, origin.start, origin.end)
      && spansOverlap(finding.second.start, finding.second.end, current.start, current.end);
    const reversed = finding.first.file === current.file
      && finding.second.file === origin.file
      && spansOverlap(finding.first.start, finding.first.end, current.start, current.end)
      && spansOverlap(finding.second.start, finding.second.end, origin.start, origin.end);
    return direct || reversed;
  });
}

function findDuplicateProse(bodies) {
  const sentenceOrigins = new Map();
  const duplicateMessages = [];
  let exactSentences = 0;
  let twelveTokenSequences = 0;

  for (const manuscript of bodies) {
    for (const sentence of proseSegments(manuscript.body)) {
      const characterLength = countCharacters(sentence.replaceAll(" ", ""));
      if (characterLength < 24 || intentionalRefrains.has(sentence)) continue;
      const origin = sentenceOrigins.get(sentence);
      if (!origin) {
        sentenceOrigins.set(sentence, { file: manuscript.file });
      } else {
        exactSentences += 1;
        duplicateMessages.push(`DUPLICATE sentence (${characterLength} normalized chars) in ${filePair(origin.file, manuscript.file)}: "${duplicateSnippet(sentence)}"`);
      }
    }
  }

  const sequenceOrigins = new Map();
  const reportedSpans = [];
  for (const manuscript of bodies) {
    const tokens = normalizeProse(manuscript.body).split(" ").filter(Boolean);
    for (let index = 0; index <= tokens.length - 12; index += 1) {
      const sequence = tokens.slice(index, index + 12).join(" ");
      const current = { file: manuscript.file, start: index, end: index + 12 };
      const origins = sequenceOrigins.get(sequence) || [];
      const origin = origins.find((candidate) => {
        if (candidate.file === current.file && spansOverlap(candidate.start, candidate.end, current.start, current.end)) return false;
        return !duplicateSpanAlreadyReported(reportedSpans, candidate, current);
      });
      if (origin) {
        twelveTokenSequences += 1;
        reportedSpans.push({ first: origin, second: current });
        duplicateMessages.push(`DUPLICATE 12-token prose sequence in ${filePair(origin.file, manuscript.file)}: "${duplicateSnippet(sequence)}"`);
      }
      origins.push(current);
      sequenceOrigins.set(sequence, origins);
    }
  }

  return { messages: duplicateMessages, exactSentences, twelveTokenSequences };
}

function checkDuplicateProse(bodies) {
  const result = findDuplicateProse(bodies);
  summary.duplicateProse.exactSentences = result.exactSentences;
  summary.duplicateProse.twelveTokenSequences = result.twelveTokenSequences;
  result.messages.slice(0, maxDuplicateMessages).forEach(fail);
  if (result.messages.length > maxDuplicateMessages) {
    fail(`DUPLICATE: ${result.messages.length - maxDuplicateMessages} additional duplicate prose findings omitted`);
  }
}

function manifestEntries(document) {
  if (Array.isArray(document)) return document;
  if (document && Array.isArray(document.episodes)) return document.episodes;
  if (document && typeof document === "object") {
    const records = Object.entries(document);
    if (records.length && records.every(([, value]) => value && typeof value === "object" && !Array.isArray(value))) {
      return records.map(([key, value]) => {
        const hasMapping = value.path !== undefined
          || value.file !== undefined
          || value.manuscript !== undefined
          || value.volume !== undefined
          || value.vol !== undefined;
        return hasMapping ? value : { ...value, path: key };
      });
    }
  }
  return null;
}

function normalizeManifestPath(value) {
  if (typeof value !== "string") return null;
  return value
    .trim()
    .replaceAll("\\", "/")
    .replace(/^\.\//, "")
    .replace(/^solo-ai-user\//, "");
}

function normalizeManifestVolume(value) {
  if (Number.isInteger(value) && value >= 1 && value <= 12) {
    return `vol${String(value).padStart(2, "0")}`;
  }
  return typeof value === "string" && /^vol(?:0[1-9]|1[0-2])$/.test(value) ? value : null;
}

function normalizeManifestPosition(value) {
  if (Number.isInteger(value) && value >= 0 && value <= 11) return value;
  if (typeof value === "string" && /^(?:0[0-9]|1[01])$/.test(value)) return Number(value);
  return null;
}

function manifestCandidateVolume(entry) {
  const pathValue = normalizeManifestPath(entry.path ?? entry.file ?? entry.manuscript);
  const pathVolume = pathValue && pathValue.match(/^(vol\d{2})\//);
  return pathVolume ? pathVolume[1] : normalizeManifestVolume(entry.volume ?? entry.vol);
}

function canonicalManifestReference(value, canonical, byVolumePosition) {
  if (typeof value === "string") {
    const normalizedPath = normalizeManifestPath(value);
    if (canonical.has(normalizedPath)) return canonical.get(normalizedPath);
    const pair = value.match(/^(vol(?:0[1-9]|1[0-2])):(0[0-9]|1[01])$/);
    return pair ? byVolumePosition.get(`${pair[1]}:${Number(pair[2])}`) || null : null;
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const pathValue = value.path ?? value.file ?? value.manuscript;
  if (pathValue !== undefined) {
    return canonical.get(normalizeManifestPath(pathValue)) || null;
  }
  const volume = normalizeManifestVolume(value.volume ?? value.vol);
  const position = normalizeManifestPosition(value.position);
  return volume && position !== null ? byVolumePosition.get(`${volume}:${position}`) || null : null;
}

function validateManifestRecords(entries, canonical, options) {
  const result = { failures: [], warnings: [], mapped: 0 };
  const byVolumePosition = new Map([...canonical.values()].map((slot) => [`${slot.volume}:${slot.position}`, slot]));
  const byIndex = new Map([...canonical.values()].map((slot) => [slot.index, slot]));
  const seen = new Map();
  const expected = new Set(options.expectedPaths);

  if (options.finalMode && entries.length !== 144) {
    result.failures.push(`final mode requires exactly 144 episode entries, got ${entries.length}`);
  }

  entries.forEach((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      if (!options.scopeVolume) result.failures.push(`entry ${index + 1} must be an object`);
      return;
    }
    const candidateVolume = manifestCandidateVolume(entry);
    if (options.scopeVolume && candidateVolume !== options.scopeVolume) return;

    const pathField = entry.path ?? entry.file ?? entry.manuscript;
    const hasPath = pathField !== undefined;
    const hasVolume = entry.volume !== undefined || entry.vol !== undefined;
    const hasPosition = entry.position !== undefined;
    let pathSlot = null;
    let pairSlot = null;

    if (hasPath) {
      const normalizedPath = normalizeManifestPath(pathField);
      pathSlot = normalizedPath ? canonical.get(normalizedPath) || null : null;
      if (!pathSlot) result.failures.push(`entry ${index + 1} has non-canonical manuscript path ${String(pathField)}`);
    }
    if (hasVolume || hasPosition) {
      const volume = normalizeManifestVolume(entry.volume ?? entry.vol);
      const position = normalizeManifestPosition(entry.position);
      if (!volume || position === null) {
        result.failures.push(`entry ${index + 1} has invalid volume+position; expected vol01-vol12 and 00-11`);
      } else {
        pairSlot = byVolumePosition.get(`${volume}:${position}`) || null;
        if (!pairSlot) result.failures.push(`entry ${index + 1} volume+position ${volume}:${String(position).padStart(2, "0")} has no canonical manuscript`);
      }
    }
    if (!hasPath && !(hasVolume && hasPosition)) {
      result.failures.push(`entry ${index + 1} must map by canonical path or volume+position; arbitrary IDs are not accepted`);
      return;
    }
    if (pathSlot && pairSlot && pathSlot.path !== pairSlot.path) {
      result.failures.push(`entry ${index + 1} path and volume+position refer to different manuscripts`);
      return;
    }
    const slot = pathSlot || pairSlot;
    if (!slot) return;
    if (seen.has(slot.path)) {
      result.failures.push(`duplicate manifest mapping for ${slot.path} at entries ${seen.get(slot.path) + 1} and ${index + 1}`);
    } else {
      seen.set(slot.path, index);
      result.mapped += 1;
    }

    if (Object.prototype.hasOwnProperty.call(entry, "relayTo")) {
      const expectedNext = byIndex.get(slot.index + 1) || null;
      if (!expectedNext) {
        if (entry.relayTo !== null && !(options.scopeVolume && slot.index < 143)) {
          result.failures.push(`entry ${index + 1} relayTo must be null at the end of the canonical chain`);
        }
      } else if (entry.relayTo === null) {
        result.failures.push(`entry ${index + 1} relayTo must point to ${expectedNext.path}`);
      } else {
        const relaySlot = canonicalManifestReference(entry.relayTo, canonical, byVolumePosition);
        if (!relaySlot) {
          result.failures.push(`entry ${index + 1} relayTo is not a canonical manuscript reference`);
        } else if (relaySlot.path !== expectedNext.path) {
          result.failures.push(`entry ${index + 1} relayTo must point to ${expectedNext.path}, got ${relaySlot.path}`);
        }
      }
    }
  });

  for (const expectedPath of expected) {
    if (!seen.has(expectedPath)) result.failures.push(`missing manifest mapping for ${expectedPath}`);
  }
  return result;
}

function manifestCanonicalSlots(discoveries, options) {
  const canonical = new Map();
  const selected = options.selectedVolume
    ? volumes.filter((volume) => volume.directory === options.selectedVolume)
    : volumes;
  for (const volume of selected) {
    const discovery = discoveries.get(volume.directory);
    if (!discovery || !discovery.exists) continue;
    for (const [position, file] of discovery.manuscripts) {
      const manuscriptPath = relativeToProject(file);
      canonical.set(manuscriptPath, {
        path: manuscriptPath,
        file,
        volume: volume.directory,
        position,
        index: (volume.number - 1) * 12 + position,
      });
    }
  }

  if (options.selectedVolume) {
    const volume = volumes.find((candidate) => candidate.directory === options.selectedVolume);
    const boundaries = [
      volume.number > 1 ? { number: volume.number - 1, position: 11, name: "11-epilogue.md" } : null,
      volume.number < 12 ? { number: volume.number + 1, position: 0, name: "00-prologue.md" } : null,
    ].filter(Boolean);
    for (const boundary of boundaries) {
      const directory = `vol${String(boundary.number).padStart(2, "0")}`;
      const file = path.join(projectRoot, directory, boundary.name);
      if (!exists(file)) continue;
      const manuscriptPath = relativeToProject(file);
      canonical.set(manuscriptPath, {
        path: manuscriptPath,
        file,
        volume: directory,
        position: boundary.position,
        index: (boundary.number - 1) * 12 + boundary.position,
      });
    }
  }
  return canonical;
}

function checkManifest(options, discoveries) {
  const file = path.join(projectRoot, "state", "episode-manifest.json");
  if (!exists(file)) return;
  summary.manifest = "present";
  const text = read(file);
  if (text === null) return;
  let document;
  try {
    document = JSON.parse(text);
  } catch (error) {
    fail(`${relativeToRepo(file)}: invalid JSON: ${error.message}`);
    summary.manifest = "invalid";
    return;
  }
  const entries = manifestEntries(document);
  if (!entries) {
    fail(`${relativeToRepo(file)}: expected an array, an { episodes: [] } object, or an object map of episode records`);
    summary.manifest = "invalid-shape";
    return;
  }
  const canonical = manifestCanonicalSlots(discoveries, options);
  const expectedPaths = [...canonical.values()]
    .filter((slot) => !options.selectedVolume || slot.volume === options.selectedVolume)
    .sort((left, right) => left.index - right.index)
    .map((slot) => slot.path);
  if (options.selectedVolume && expectedPaths.length === 0) {
    summary.manifest = { entries: entries.length, checked: 0 };
    return;
  }
  const validation = validateManifestRecords(entries, canonical, {
    expectedPaths,
    finalMode: !options.selectedVolume,
    scopeVolume: options.selectedVolume,
  });
  validation.failures.forEach((message) => fail(`${relativeToRepo(file)}: ${message}`));
  validation.warnings.forEach((message) => warn(`${relativeToRepo(file)}: ${message}`));
  summary.manifest = { entries: entries.length, checked: validation.mapped };
}

function checkDocumentHeadings(options) {
  if (options.selectedVolume) return;
  for (const [name, heading] of requiredProjectHeadings) {
    const file = path.join(projectRoot, name);
    if (exists(file)) checkFirstLineH1(file, heading);
  }
  const rootReadme = path.join(repoRoot, "README.md");
  if (exists(rootReadme)) checkFirstLineH1(rootReadme, "# AI Fictions");
  for (const file of stateMarkdownFiles()) checkFirstLineH1(file);
}

function printResult(options) {
  const strictFailure = options.strict && warnings.length > 0;
  const failed = failures.length > 0 || strictFailure;
  summary.status = failed ? "fail" : warnings.length ? "ok-with-warnings" : "ok";
  summary.scope = options.selectedVolume || "all";
  summary.strict = options.strict;
  summary.failures = failures.length;
  summary.warnings = warnings.length;
  summary.strictWarningsEscalated = strictFailure ? warnings.length : 0;

  for (const message of failures) console.error(`FAIL ${message}`);
  for (const message of warnings) console.error(`${options.strict ? "STRICT" : "WARN"} ${message}`);
  console.log(JSON.stringify(summary, null, 2));
  process.exitCode = failed ? 1 : 0;
}

function runSelfTests() {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "soloai-verifier-"));
  try {
    const source = path.join(temporaryRoot, "source.md");
    const target = path.join(temporaryRoot, "target.md");
    fs.writeFileSync(source, "# Source\n", "utf8");
    fs.writeFileSync(target, "# 같은 제목\n\n## 같은 제목\n\n<a id=\"explicit-id\"></a>\n", "utf8");
    const anchorCache = new Map();
    assert.equal(localLinkProblem(source, "#source", anchorCache), null);
    assert.equal(localLinkProblem(source, "./target.md#같은-제목", anchorCache), null);
    assert.equal(localLinkProblem(source, "./target.md#같은-제목-1", anchorCache), null);
    assert.equal(localLinkProblem(source, "./target.md#explicit-id", anchorCache), null);
    assert.match(localLinkProblem(source, "./target.md#missing", anchorCache), /missing fragment/);

    assert.equal(strictFenceState("```js\nconst x = 1;\n```\n"), null);
    assert.deepEqual(strictFenceState("```js\n```not-a-close\n"), { character: "`", length: 3, line: 1 });

    assert.equal(
      renderDisplayedProse("# 00. 제목\n\n[보이는 말](https://example.com/very/long/url) **강조** <!-- 숨김 -->\n"),
      "보이는 말 강조",
    );

    const canonical = new Map([
      ["vol01/00-prologue.md", { path: "vol01/00-prologue.md", volume: "vol01", position: 0, index: 0 }],
      ["vol01/01-part1-start.md", { path: "vol01/01-part1-start.md", volume: "vol01", position: 1, index: 1 }],
    ]);
    const manifestResult = validateManifestRecords([
      { path: "vol01/00-prologue.md", relayTo: "vol01/01-part1-start.md" },
      { volume: "vol01", position: 1, relayTo: null },
    ], canonical, { expectedPaths: [...canonical.keys()], finalMode: false });
    assert.deepEqual(manifestResult.failures, []);
    assert.ok(validateManifestRecords([{ id: "anything" }], canonical, {
      expectedPaths: [...canonical.keys()],
      finalMode: false,
    }).failures.some((message) => message.includes("canonical path or volume+position")));
    assert.ok(validateManifestRecords([
      { path: "vol01/00-prologue.md" },
      { path: "vol01/00-prologue.md" },
    ], canonical, { expectedPaths: [...canonical.keys()], finalMode: false }).failures.some((message) => message.includes("duplicate manifest mapping")));
    assert.ok(validateManifestRecords([
      { volume: "vol01", position: 12 },
    ], canonical, { expectedPaths: [...canonical.keys()], finalMode: false }).failures.some((message) => message.includes("invalid volume+position")));
    assert.ok(validateManifestRecords([
      { path: "vol01/00-prologue.md", relayTo: "vol01/00-prologue.md" },
      { path: "vol01/01-part1-start.md" },
    ], canonical, { expectedPaths: [...canonical.keys()], finalMode: false }).failures.some((message) => message.includes("relayTo must point")));

    const metadataNames = manuscriptPositions.map((position) => {
      if (position.position === 0) return "00-prologue.md";
      if (position.position === 11) return "11-epilogue.md";
      return `${position.label}-part${position.position}-self-test.md`;
    });
    const outlineFixture = path.join(temporaryRoot, "outline.md");
    const readmeFixture = path.join(temporaryRoot, "README.md");
    fs.writeFileSync(outlineFixture, metadataNames.map((name, index) => `| \`${name}\` | 제목 ${index} |`).join("\n") + "\n", "utf8");
    fs.writeFileSync(readmeFixture, metadataNames.map((name, index) => `| ${index} | [${String(index).padStart(2, "0")}. 제목 ${index}](./${name}) |`).join("\n") + "\n", "utf8");
    assert.equal(parseOutlineMetadata(outlineFixture).length, 12);
    assert.equal(parseVolumeReadmeMetadata(readmeFixture).length, 12);
    const priorFailureCount = failures.length;
    validateMetadataRecords(parseOutlineMetadata(outlineFixture).slice(0, 11), new Set(metadataNames), "fixture outline");
    assert.ok(failures.slice(priorFailureCount).some((message) => message.includes("expected exactly 12")));
    failures.length = priorFailureCount;

    assert.equal(
      canonicalManuscriptNavigation({
        previous: { label: "00. 시작", target: "./00-prologue.md" },
        homeTarget: "../README.md",
        indexTarget: "./README.md",
        next: { label: "02. 다음", target: "./02-part2-next.md" },
      }),
      "[← 이전 회차: 00. 시작](./00-prologue.md) | [시리즈 홈](../README.md) | [권 목차](./README.md) | [다음 회차: 02. 다음 →](./02-part2-next.md)",
    );
    assert.equal(
      canonicalVolumeNavigation(volumes[1]),
      "[← 이전 권](../vol01/README.md) | [시리즈 홈](../README.md) | [1화부터 읽기](./00-prologue.md) | [다음 권 →](../vol03/README.md)",
    );

    const repeatedTokens = "하나 둘 셋 넷 다섯 여섯 일곱 여덟 아홉 열 열하나 열둘";
    const duplicateResult = findDuplicateProse([{
      file: path.join(temporaryRoot, "repeat.md"),
      body: `${repeatedTokens}. 중간 문장입니다. ${repeatedTokens}.`,
    }]);
    assert.ok(duplicateResult.twelveTokenSequences >= 1, "same-file 12-token reuse must be detected");

    console.log(JSON.stringify({ status: "ok", selfTests: 19 }, null, 2));
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
}

function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
  } catch (error) {
    console.error(`ERROR ${error.message}`);
    console.error(usage());
    process.exitCode = 2;
    return;
  }

  summary.scope = options.selectedVolume || "all";
  summary.strict = options.strict;
  if (options.selectedVolume) {
    summary.expected.outlines = 1;
    summary.expected.volumes = 1;
    summary.expected.manuscripts = 12;
  }

  checkRootLayout(options);
  checkOutlineLayout(options);
  const discoveries = checkVolumeLayout(options);
  checkTitles(discoveries, options);
  checkNavigations(discoveries, options);
  checkMarkdownLinks(allMarkdownFiles());
  checkDocumentHeadings(options);
  checkMarkdownQuality(qualityMarkdownFilesForScope(options, discoveries));
  const bodies = checkBodyLengths(discoveries, options);
  checkDuplicateProse(bodies);
  checkManifest(options, discoveries);
  printResult(options);
}

if (process.env.SOLOAI_VERIFY_SELF_TEST === "1" || process.argv.slice(2).includes("--self-test")) {
  runSelfTests();
} else {
  try {
    main();
  } catch (error) {
    fail(`verifier internal error: ${error && error.stack ? error.stack : String(error)}`);
    printResult({ selectedVolume: null, strict: false });
  }
}
