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

const requiredStateArtifacts = [
  ...canonicalStateOrder,
  "episode-manifest.json",
];

const placeholderPattern = /\b(?:TODO|TBD|FIXME|PLACEHOLDER)\b|\{\{[^}\n]*\}\}|\[\[[^\]\n]*\]\]|작성\s*예정|추후\s*작성|(?<![\p{L}\p{N}])미\s*정(?![\p{L}\p{N}])/gu;
const markdownLinkPattern = /!?\[[^\]\n]*\]\(([^)\n]+)\)/g;
const markdownReferencePattern = /^\s*\[[^\]\n]+\]:\s*(\S+)/gm;
const maxDuplicateMessages = 40;
const maxDuplicateWarnings = 20;
const duplicateDiagnosticThresholds = Object.freeze({
  sevenTokenWindow: 7,
  sevenTokenMinimumDistinctFiles: 3,
  shingleSize: 5,
  shingleMinimumSetSize: 80,
  shingleMinimumLengthRatio: 0.7,
  shingleSimilarity: 0.72,
});

const intentionalRefrains = new Set([
  "도와드릴 수 없습니다",
  "판단은 사용자님 몫입니다",
  "세상은 ai를 껐다 딱 한 명 나만 빼고",
].map(normalizeProse));
const intentionalRefrainSevenTokenWindows = new Set();
for (const refrain of intentionalRefrains) {
  const tokens = refrain.split(" ").filter(Boolean);
  for (let index = 0; index <= tokens.length - duplicateDiagnosticThresholds.sevenTokenWindow; index += 1) {
    intentionalRefrainSevenTokenWindows.add(tokens
      .slice(index, index + duplicateDiagnosticThresholds.sevenTokenWindow)
      .join(" "));
  }
}

const failureClassByVolume = Object.freeze([
  "오염 데이터",
  "운영·Goodhart",
  "적대적 정보오염",
  "접근권·블랙스완",
  "사회적 수행성",
  "자원 붕괴",
  "상대 적응",
  "다중 에이전트 충돌",
  "외부효과·정당성",
  "자기참조·정체성",
  "권한 회수",
  "정답 없는 규범 문제",
]);

const zeroModes = Object.freeze([
  "off",
  "manual",
  "tier1-read",
  "tier2-reversible",
  "tier3-counterfactual",
  "tier4-orchestrate",
  "root",
]);

const manifestSchema = Object.freeze({
  fields: Object.freeze({
    id: "canonical episode ID",
    file: "canonical manuscript path",
    title: "non-empty string",
    storyRole: "non-empty string",
    genre: "non-empty string",
    pov: "non-empty string",
    arena: "non-empty string",
    choice: "non-empty string",
    zeroMode: "non-empty string",
    failureType: "{ class, manifestation }",
    TRACE: "TRACE vector",
    humanMove: "non-empty string",
    dopamine: "non-empty string",
    hook: "string or null for the terminal epilogue",
    stateDelta: "object",
    relay: "non-empty causal relay",
    relayTo: "exact next canonical episode ID, or null only for the terminal epilogue",
    seeds: "array",
    allyRelay: "array",
    WAGER: "{ id, mode, stake }",
    SCAR: "{ id, change, status, closeBy }",
  }),
  wager: Object.freeze({
    fields: Object.freeze(["id", "mode", "stake"]),
    modes: Object.freeze(["initiate", "inherit", "advance", "resolve"]),
  }),
  scar: Object.freeze({
    fields: Object.freeze(["id", "change", "status", "closeBy"]),
    statuses: Object.freeze(["open", "paid", "transformed"]),
  }),
  stateDelta: Object.freeze({
    fields: Object.freeze(["capability", "mystery", "relationship"]),
  }),
  seed: Object.freeze({
    fields: Object.freeze(["id", "action", "deadline"]),
    actions: Object.freeze(["plant", "advance", "payoff"]),
  }),
  allyRelay: Object.freeze({
    fields: Object.freeze(["node", "stage", "choice", "cost"]),
    stages: Object.freeze(["seed", "advance", "payoff"]),
  }),
  trace: Object.freeze({
    axes: Object.freeze(["Trace", "Resource", "Agency", "Connection", "Externality"]),
    statuses: Object.freeze(["open", "paid", "transformed"]),
    minimum: 0,
    maximum: 3,
  }),
});

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
    sevenTokenMultiReuse: 0,
    shingleSimilarities: 0,
  },
  manifest: "absent",
  outlineContracts: "unchecked",
  allyPayoffLedger: "absent",
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

function missingRequiredStateArtifacts(stateDirectory) {
  return requiredStateArtifacts.filter((name) => !fs.existsSync(path.join(stateDirectory, name)));
}

function checkRequiredStateArtifacts() {
  const stateDirectory = path.join(projectRoot, "state");
  for (const name of missingRequiredStateArtifacts(stateDirectory)) {
    fail(`solo-ai-user/state/${name}: missing required completion artifact`);
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

function plainLedgerCell(value) {
  const trimmed = value.trim();
  const link = trimmed.match(/^\[[^\]]*\]\(([^)]+)\)$/);
  return (link ? link[1] : trimmed).replace(/^[`*_~]+|[`*_~]+$/g, "").trim();
}

function parseAllyPayoffLedger(text) {
  const records = [];
  for (const line of text.replace(/\r/g, "").split("\n")) {
    const cells = splitTableRow(line);
    if (cells.length !== 6) continue;
    const id = plainLedgerCell(cells[0]).toUpperCase();
    if (!/^N(?:0[1-9]|1[0-2])$/.test(id)) continue;
    records.push({
      id,
      steward: plainLedgerCell(cells[1]),
      firstAppearance: plainLedgerCell(cells[2]),
      hyunwooCost: plainLedgerCell(cells[3]),
      independentChoice: plainLedgerCell(cells[4]),
      volumeTwelvePayoff: plainLedgerCell(cells[5]),
    });
  }
  return records;
}

function substantiveLedgerValue(value) {
  const normalized = normalizeProse(value);
  return normalized !== "" && !new Set(["n a", "없음"]).has(normalized) && !/^[—-]+$/u.test(value.trim());
}

function canonicalLedgerPaths(value, canonical) {
  if (!canonical) return [];
  return [...canonical.values()]
    .filter((slot) => {
      const escaped = slot.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(?:^|[^\\p{L}\\p{N}_-])${escaped}(?=$|[^\\p{L}\\p{N}_-])`, "u").test(value);
    })
    .sort((left, right) => left.index - right.index);
}

function validateAllyPayoffRecords(records, canonical = null, allyEvents = null) {
  const problems = [];
  if (records.length !== 12) {
    problems.push(`requires exactly 12 ALLY nodes, got ${records.length}`);
  }
  const seen = new Set();
  for (const [index, record] of records.entries()) {
    if (seen.has(record.id)) problems.push(`duplicate ALLY node ID ${record.id}`);
    seen.add(record.id);
    const label = record.id || `row ${index + 1}`;
    if (!record.steward.trim()) problems.push(`${label} representative or community must be non-empty`);
    if (!record.firstAppearance.trim()) problems.push(`${label} first appearance and node seed must be non-empty`);
    if (!record.hyunwooCost.trim()) problems.push(`${label} Hyunwoo cost must be non-empty`);
    if (!record.independentChoice.trim()) problems.push(`${label} independent final choice must be non-empty`);
    if (!record.volumeTwelvePayoff.trim()) problems.push(`${label} volume 12 payoff must be non-empty`);

    for (const [field, value] of [
      ["representative or community", record.steward],
      ["first appearance and node seed", record.firstAppearance],
      ["Hyunwoo cost", record.hyunwooCost],
      ["independent final choice", record.independentChoice],
      ["volume 12 payoff", record.volumeTwelvePayoff],
    ]) {
      if (value.trim() && !substantiveLedgerValue(value)) {
        problems.push(`${label} ${field} must contain substantive content`);
      }
    }

    if (canonical) {
      const firstPaths = canonicalLedgerPaths(record.firstAppearance, canonical)
        .filter((slot) => Number(slot.volume.slice(3)) <= 10);
      const payoffPaths = canonicalLedgerPaths(record.volumeTwelvePayoff, canonical)
        .filter((slot) => slot.volume === "vol12");
      if (firstPaths.length !== 1) {
        problems.push(`${label} first appearance must contain exactly one canonical vol01-vol10 manuscript path`);
      }
      if (payoffPaths.length !== 1) {
        problems.push(`${label} volume 12 payoff must contain exactly one canonical vol12 manuscript path`);
      }

      if (allyEvents) {
        const seedEvents = allyEvents
          .filter((event) => event.node === record.id && event.stage === "seed")
          .sort((left, right) => left.index - right.index);
        const payoffFiles = new Set(allyEvents
          .filter((event) => event.node === record.id && event.stage === "payoff")
          .map((event) => event.file));
        if (firstPaths.length === 1 && (!seedEvents[0] || firstPaths[0].path !== seedEvents[0].file)) {
          problems.push(`${label} first appearance does not match manifest ALLY seed path; earliest manifest ALLY seed path is ${seedEvents[0] ? seedEvents[0].file : "<missing>"}`);
        }
        if (payoffPaths.length === 1 && !payoffFiles.has(payoffPaths[0].path)) {
          problems.push(`${label} volume 12 payoff does not match manifest ALLY payoff path`);
        }
      }
    }
  }
  for (let number = 1; number <= 12; number += 1) {
    const expected = `N${String(number).padStart(2, "0")}`;
    if (!seen.has(expected)) problems.push(`missing ALLY node ID ${expected}`);
  }
  return problems;
}

function checkAllyPayoffLedger(canonical = null, allyEvents = null) {
  const file = path.join(projectRoot, "state", "ally-payoff-ledger.md");
  if (!exists(file)) return;
  const text = read(file);
  if (text === null) return;
  const records = parseAllyPayoffLedger(text);
  validateAllyPayoffRecords(records, canonical, allyEvents)
    .forEach((message) => fail(`${relativeToRepo(file)}: ${message}`));
  summary.allyPayoffLedger = { nodes: records.length };
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

function validateCanonicalManuscriptLocks(bodies) {
  const problems = [];
  const byEpisode = new Map(
    bodies.map((manuscript) => [
      `${manuscript.volume}:E${String(manuscript.position).padStart(2, "0")}`,
      manuscript,
    ]),
  );

  const requireConcepts = (episode, conceptGroups, message) => {
    const manuscript = byEpisode.get(episode);
    if (!manuscript) return;
    const missing = conceptGroups.some((patterns) => !patterns.some((pattern) => pattern.test(manuscript.body)));
    if (missing) problems.push(`${relativeToRepo(manuscript.file)}: ${message}`);
  };

  requireConcepts("vol01:E00", [
    [/(?:한지우|지우)/],
    [/폐기.{0,20}서명|서명.{0,20}폐기/],
    [/(?:유예|보류|미루|멈추|기다리)/],
    [/(?:책임|징계|계약|불이익|위험)/],
  ], "V01E00 must dramatize Jiwoo's disposal-signature deferral and its personal cost as the N02 seed");

  requireConcepts("vol01:E01", [
    [/(?:한지우|지우)/],
    [/(?:폐기|반출).{0,24}(?:보류|유예|멈추)|(?:최종\s*)?반출.{0,20}(?:확인|서명).{0,12}(?:비었|빈칸|공란)/],
    [/(?:단말|장비).{0,24}(?:가방|챙기|가져|들고)|(?:가방).{0,20}(?:단말|장비)/],
    [/(?:감사|책임|위험|징계|불이익)/],
  ], "V01E01 must preserve Jiwoo's outbound-disposal hold and make Hyunwoo's removal its shared audit cost");

  requireConcepts("vol01:E04", [
    [/냉장/],
    [/(?:18|열여덟)\s*건/],
    [/환불/],
    [/야근/],
  ], "V01E04 must dramatize the 18 refrigerated-delivery failures, refunds, and cleanup overtime");

  requireConcepts("vol01:E05", [
    [/(?:30|서른)\s*건/],
    [/(?:손으로|직접|수기).{0,20}(?:대조|검증)|(?:대조|검증).{0,20}(?:손으로|직접|수기)/],
    [/온도/],
    [/(?:환불|피해)/],
    [/(?:한지우|지우)/],
    [/(?:예측|전망).{0,20}(?:버리|버렸|폐기|낮추|낮아|지우)/],
  ], "V01E05 must replace the flashy forecast with Jiwoo and Hyunwoo's 30-case manual verification of temperature and refund evidence");

  requireConcepts("vol01:E06", [
    [/(?:30|서른)\s*건/],
    [/(?:한지우|지우)/],
    [/(?:실행|가동|자동화).{0,16}(?:전|앞서)|(?:먼저|사전).{0,24}(?:실행|가동|자동화|범위)/],
    [/(?:범위표|작업\s*범위|허용\s*범위|범위\s*문서|범위를.{0,16}(?:보여|검토|확인))/],
    [/(?:거부|금지|수정|승인|검토)/],
    [/원본/],
    [/온도/],
    [/(?:환불|피해)/],
    [/(?:복사|복제)/],
    [/(?:표\s*(?:변환|정리|서식|포맷)|테이블\s*(?:변환|정리|서식|포맷))/],
    [/(?:한\s*번|1\s*회|일회|단\s*한\s*번)/],
    [/전송.{0,20}(?:금지|하지)|(?:금지|하지).{0,20}전송/],
    [/원본.{0,20}(?:수정|변경).{0,16}(?:금지|하지)|(?:금지|하지).{0,20}원본.{0,12}(?:수정|변경)/],
    [/(?:후속|추가).{0,16}(?:실행|자동화|추론).{0,16}(?:금지|하지)|(?:금지|하지).{0,20}(?:후속|추가).{0,12}(?:실행|자동화|추론)/],
    [/(?:배터리|연산).{0,20}(?:고갈|소진|바닥|줄어|닳)/],
    [/(?:자동화|작업|실행|감사)\s*로그|로그.{0,16}(?:남|기록)/],
  ], "V01E06 must preserve Jiwoo's pre-execution scope veto and limit ZERO to one auditable copy/format pass over the verified 30-case bundle");

  requireConcepts("vol01:E07", [
    [/(?:ZERO|제로)/],
    [/(?:배터리.{0,20}(?:고갈|소진|바닥).{0,20}(?:꺼|작동\s*불가)|(?:ZERO|제로).{0,24}(?:꺼진|꺼져|작동하지|완전히\s*off))/i],
    [/(?:기사|운전사|운전자)/],
    [/(?:창고|야간).{0,20}(?:노동자|작업자|근무자|조)/],
    [/(?:윤\s*과장|고객.{0,12}(?:담당자|담당|점포)|점포.{0,12}(?:담당자|담당))/],
    [/(?:직접|대면).{0,30}(?:찾아가|묻|물었|인터뷰|확인)|(?:인터뷰|면담).{0,24}(?:기사|창고|고객|윤\s*과장)/],
    [/(?:11|십일)\s*분/],
    [/온도/],
    [/(?:인계|인수인계|넘겨)/],
    [/서명/],
    [/정만호|정\s*팀장/],
    [/(?:징계|무단.{0,12}(?:이탈|외근|결근)|근무지.{0,12}이탈)/],
    [/오세라/],
    [/(?:독립.{0,16}감사|감사.{0,16}독립|인터뷰.{0,16}원본|원본.{0,16}보존)/],
    [/(?:피해|비용|환불)/],
  ], "V01E07 must earn the human-only field build through driver, warehouse, customer, and independent-audit evidence while ZERO is off");

  const v01e07 = byEpisode.get("vol01:E07");
  if (v01e07
    && /(?:ZERO|제로)(?:가|는|에게|의)?[^\n.!?]{0,100}(?:계산(?:했|해\s*냈|한다|해\s*줬|해주었)|대답(?:했|해)|답(?:했|해)|출력(?:했|해)|경로(?:를|가)?\s*(?:짰|그렸|계산)|화면에[^\n.!?]{0,24}(?:떴|나타났))/i.test(v01e07.body)) {
    problems.push(`${relativeToRepo(v01e07.file)}: V01E07 must keep ZERO fully off; it cannot calculate, answer, or produce the field proposal`);
  }

  requireConcepts("vol01:E08", [
    [/오세라/],
    [/(?:감사.{0,20}(?:채널|봉인)|(?:채널|봉인).{0,20}감사)/],
    [/삭제.{0,12}시각/],
    [/권한.{0,20}(?:변경|회수|잠금|삭제)/],
    [/(?:지우.{0,20}원본|원본.{0,20}지우)/],
    [/(?:동시|함께|나눠|분산)/],
  ], "V01E08 must put the deletion time, permission change, and Jiwoo original into Oh Sera audit-channel escrow instead of a solo USB win");

  requireConcepts("vol01:E09", [
    [/(?:48|사십팔)\s*시간/],
    [/파일럿/],
    [/(?:30|서른)\s*건/],
    [/(?:수동.{0,16}검증|검증.{0,16}수동)/],
    [/(?:조건부|한정|만).{0,20}승인|승인.{0,20}(?:조건부|한정|만)/],
    [/(?:환불|피해|실패)/],
  ], "V01E09 must earn only a conditional 48-hour manual pilot approval by disclosing the 30-case failure and cost");

  requireConcepts("vol01:E10", [
    [/(?:48|사십팔)\s*시간/],
    [/파일럿/],
    [/수동/],
    [/(?:독립|교차|현장).{0,24}(?:확인|검증)|(?:확인|검증).{0,24}(?:독립|교차|현장)/],
    [/우선협상/],
    [/감봉/, /급여.{0,12}(?:삭감|감액)/],
    [/(?:접근권|접근 권한).{0,20}(?:제한|회수|중지)/],
    [/(?:한지우|지우).{0,30}(?:재계약|계약 유지)/],
  ], "V01E10 must preserve the 48-hour pilot closeout and the win's cost: independent manual proof before negotiation, Hyunwoo's pay/access penalties, and Jiwoo's protected contract");

  requireConcepts("vol01:E11", [
    [/(?:분실.{0,12}단말|단말.{0,12}분실)/],
    [/(?:신고|접수)/],
    [/(?:17|십칠)\s*분/],
    [/(?:박순임|순임반찬)/],
  ], "V01E11 must establish the lost-terminal report, 17-minute receipt gap, and Park Soonim relay into volume 2");

  requireConcepts("vol02:E11", [
    [/(?:윤가람|가람).{0,20}(?:포렌식|원본)/],
    [/(?:박순임|순임).{0,20}(?:종이|영수증|장부)/],
    [/플랫폼.{0,20}(?:공개|사건).{0,12}로그/],
    [/(?:12|십이)\s*분.{0,12}(?:선행|먼저|빠른)/],
    [/(?:17|십칠)\s*분.{0,12}(?:공백|비어|사라)/],
  ], "V02E11 must preserve three independent original chains and keep the 12-minute lead separate from the 17-minute transport gap");

  requireConcepts("vol03:E07", [
    [/(?:서아린|아린)/],
    [/(?:개인 모델|개인화 추론|행동 모델)/],
    [/(?:거부|만들지|생성하지|생성된.{0,8}없)/],
    [/(?:직접.{0,8}묻|전화.{0,8}묻|묻기로)/],
  ], "V03E07 must refuse non-consensual Arin modeling and turn prediction into a direct question");

  const v03e11 = byEpisode.get("vol03:E11");
  if (v03e11
    && /(?:100|백)\s*(?:개|칸|시드)/.test(v03e11.body)
    && /(?:99|아흔아홉)\s*(?:개|칸|시드|회수)/.test(v03e11.body)
    && /(?:마지막|하나).{0,12}(?:미회수|분실|빈\s*칸)/.test(v03e11.body)) {
    problems.push(`${relativeToRepo(v03e11.file)}: exact 100/99/1 seed reveal belongs to V10E03; V03E11 may show only an unaccounted manufacturing fragment`);
  }

  requireConcepts("vol04:E02", [
    [/(?:Opacity|오패시티)/],
    [/(?:개인 모델|개인화 추론|행동 모델)/],
    [/(?:거부|생성하지|만들지)/],
    [/(?:초능력|투명화|보이지 않).{0,16}(?:아니|않)/],
    [/(?:모델.{0,12}(?:0|없|생성되지)|생성된.{0,8}모델.{0,8}0)/],
  ], "V04E02 must establish Opacity as a non-magical consent refusal with zero Arin models");

  requireConcepts("vol05:E05", [
    [/CASE A/],
    [/(?:생성된 )?개인 모델 수\s*:?\s*0/, /모델 수\s*0/],
    [/개인 연락/],
    [/원본/],
    [/조사.{0,8}접근|접근권/],
    [/(?:회수|금지)/],
    [/용서.{0,12}(?:아니|않|없)/],
  ], "V05E05 must keep model count zero, revoke personal/original/investigation access, and withhold forgiveness");

  requireConcepts("vol06:E10", [
    [/합의한 경계 그대로 연애할래요/],
    [/네, 우리 연애해요/],
  ], "V06E10 must establish the romance for the first time through the explicit boundary question and acceptance");

  requireConcepts("vol09:E04", [
    [/(?:서혜진.{0,20}(?:Architect|아키텍트)|(?:Architect|아키텍트).{0,20}서혜진)/],
    [/확정/],
    [/(?:17:00|17\s*분)/],
    [/(?:55\s*분|17:00\s*[~\-–]\s*72:00)/],
    [/72:00\s*이후|72\s*분\s*이후/],
  ], "V09E04 must deliver the first confirmed Hyejin/Architect reveal while preserving the three cascade windows");

  requireConcepts("vol09:E09", [
    [/(?:김영선|영선 씨)/],
    [/용서.{0,10}(?:안|않|없)/],
    [/위로.{0,12}(?:안|않|못)/],
    [/(?:22|스물두)\s*(?:세|살)/],
    [/삭제/],
    [/(?:서명|합의서)/],
  ], "V09E09 must keep Youngsun's non-forgiveness, Hyunwoo's withheld comfort, and Arin's age-22 deletion responsibility");

  requireConcepts("vol08:E10", [
    [/서혜진/],
    [/(?:Architect|아키텍트)/],
    [/(?:강한 일치|높은 일치|같은 계열)/],
    [/가설/],
    [/(?:결론.{0,12}(?:보류|내리지|못)|확정.{0,12}(?:보류|아니|못))/],
  ], "V08E10 must preserve the Hyejin/Architect match as a strong hypothesis, not a confirmed identity");

  requireConcepts("vol10:E03", [
    [/(?:100|백)\s*(?:개|시드)/],
    [/(?:99|아흔아홉)\s*(?:개|시드)/],
    [/(?:분실|미회수)/],
    [/(?:선택받.{0,12}(?:아니|않)|운명.{0,12}(?:아니|않))/],
  ], "V10E03 must reveal ZERO as the last unreturned seed among one hundred, never a chosen-one gift");

  requireConcepts("vol10:E04", [
    [/민재호/],
    [/(?:시민 수탁|시민수탁|수탁자).{0,16}(?:팀|12인)/],
    [/대표/],
    [/(?:단독.{0,12}(?:창조자|개발자|저자).{0,12}(?:아니|아님)|혼자.{0,12}(?:만든|개발).{0,12}(?:아니|않))/],
  ], "V10E04 must make Min Jaeho the representative of a citizen-steward team, never ZERO's sole creator");

  requireConcepts("vol10:E08", [
    [/(?:저도|ZERO도|제로도).{0,20}수탁 규칙.{0,16}대상/],
    [/동의 없는.{0,12}(?:root|루트).{0,12}거부/i],
    [/(?:자기 이유|스스로|자율).{0,16}(?:선택|거부)/],
  ], "V10E08 must give ZERO an autonomous refusal grounded in the stewardship rules");

  requireConcepts("vol10:E11", [
    [/(?:관계 기억|부팅 후.{0,12}기억)/],
    [/(?:별도 보존|보존.{0,12}(?:요청|선택))/],
    [/(?:recall|회수)/i],
    [/(?:목소리|응답).{0,12}(?:끊|사라|침묵)/],
  ], "V10E11 must turn relationship-memory preservation into Hyunwoo's last request before ZERO recall");

  requireConcepts("vol11:E03", [
    [/(?:00(?::00)?\s*[~\-–]\s*17(?::00)?|첫\s*(?:17|십칠)\s*분)/],
    [/(?:17(?::00)?\s*[~\-–]\s*72(?::00)?|후반\s*55\s*분)/],
    [/(?:실제.{0,12}(?:생명|사람).{0,10}(?:구|살)|구조 성공)/],
    [/(?:72(?::00)?\s*이후|72\s*분\s*뒤)/],
    [/재동의.{0,12}(?:0|없|없이|받지|하지)/],
  ], "V11E03 must dramatize the first 17 minutes, the real 55-minute rescue, and post-72 permanence as separate windows");

  requireConcepts("vol12:E05", [
    [/(?:N05|시민아카이브)/],
    [/(?:Opacity|오패시티)/],
    [/(?:보편.{0,10}거부권|모두.{0,10}거부권)/],
    [/(?:첫 초안|초안).{0,12}(?:반대|거부)/],
  ], "V12E05 must preserve Arin as independent N05 and universalize Opacity even against Hyunwoo's draft");

  requireConcepts("vol12:E06", [
    [/12\s*\/\s*12/],
    [/8\s*\/\s*12/],
    [/(?:직접 당사자|당사자 직접).{0,12}동의/],
    [/(?:즉시 철회|철회.{0,8}즉시)/],
    [/범위/],
    [/만료/],
    [/권한 영수증|영수증/],
    [/(?:거부권|veto)/i],
    [/(?:단독.{0,8}(?:허가|승인).{0,8}(?:아니|못|없)|(?:거부권|veto).{0,18}(?:허가권|승인권).{0,8}(?:아니|없))/i],
    [/(?:root|루트).{0,12}재결합.{0,8}(?:금지|불가)/i],
  ], "V12E06 must enact the complete COVENANT charter, not merely name it");

  requireConcepts("vol12:E07", [
    [/(?:복구용.{0,12}사본.{0,12}(?:없|남기지)|백업.{0,12}(?:없|남기지))/],
    [/(?:root|루트).{0,12}(?:분할|포기)/i],
    [/재결합.{0,8}(?:금지|불가)/],
    [/(?:관계 기억|부팅 후.{0,12}기억)/],
    [/(?:체크섬|보존)/],
  ], "V12E07 must make root relinquishment irreversible while preserving post-boot relationship memory");

  requireConcepts("vol12:E10", [
    [/(?:부팅 전|pre-boot).{0,20}(?:기원 기억|origin memory).{0,20}(?:잃|상실|분해)/i],
    [/(?:root|루트)/i],
    [/(?:광역 행동 권한|wide-area action permission)/i],
    [/(?:부팅 후|post-boot).{0,20}(?:사건|관계).{0,10}기억.{0,20}(?:보존|남)/i],
    [/(?:Tier 1|티어 1)/i],
    [/서혜진/],
    [/(?:권한.{0,8}(?:박탈|회수)|독점 권한.{0,8}잃)/],
    [/공개 증언/],
    [/재판/],
    [/용서.{0,12}(?:없|않|보장되지)/],
  ], "V12E10 must preserve the exact ZERO cost and send a living Hyejin to testimony and trial without guaranteed forgiveness");

  requireConcepts("vol12:E11", [
    [/우리가 직접 정할래요/],
    [/(?:관계 기억|우리를 기억)/],
    [/(?:미래|성공 확률).{0,20}(?:보장할 수 없|답할 수 없|계산하지 않|거부)/],
  ], "V12E11 must close on a remembered relationship whose future is chosen rather than predicted");

  for (const manuscript of bodies) {
    if (/김아린/.test(manuscript.body)) {
      problems.push(`${relativeToRepo(manuscript.file)}: canonical name Seo Arin (서아린) must not be replaced with Kim Arin (김아린)`);
    }
    if (/강현우/.test(manuscript.body)) {
      problems.push(`${relativeToRepo(manuscript.file)}: canonical name Cha Hyunwoo (차현우) must not be replaced with Kang Hyunwoo (강현우)`);
    }
    if (/\bV[0-9]{2}E[0-9]{2}\b|\bE[0-9]{2}\b|(?:1[0-2]|[1-9])권|(?:이전|다음)\s*권(?!한)/u.test(manuscript.body)) {
      problems.push(`${relativeToRepo(manuscript.file)}: production episode/volume marker leaked into reader-facing prose; recall the in-world event instead`);
    }
  }

  return problems;
}

function checkCanonicalManuscriptLocks(bodies) {
  validateCanonicalManuscriptLocks(bodies).forEach((message) => fail(message));
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
  const duplicateWarnings = [];
  let exactSentences = 0;
  let twelveTokenSequences = 0;
  let sevenTokenMultiReuse = 0;
  let shingleSimilarities = 0;

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

  const sevenTokenFiles = new Map();
  for (const manuscript of bodies) {
    const tokens = normalizeProse(manuscript.body).split(" ").filter(Boolean);
    const seenInFile = new Set();
    const windowSize = duplicateDiagnosticThresholds.sevenTokenWindow;
    for (let index = 0; index <= tokens.length - windowSize; index += 1) {
      const sequence = tokens.slice(index, index + windowSize).join(" ");
      if (seenInFile.has(sequence)
        || intentionalRefrainSevenTokenWindows.has(sequence)) {
        continue;
      }
      seenInFile.add(sequence);
      const files = sevenTokenFiles.get(sequence) || new Set();
      files.add(manuscript.file);
      sevenTokenFiles.set(sequence, files);
    }
  }
  for (const [sequence, files] of sevenTokenFiles) {
    if (files.size < duplicateDiagnosticThresholds.sevenTokenMinimumDistinctFiles) continue;
    sevenTokenMultiReuse += 1;
    const locations = [...files].map(relativeToProject).sort().join(", ");
    duplicateWarnings.push(`DUPLICATE 7-token multi-reuse across ${files.size} files (${locations}): "${duplicateSnippet(sequence)}"`);
  }

  const shingleProfiles = bodies.map((manuscript) => {
    const tokens = normalizeProse(manuscript.body).split(" ").filter(Boolean);
    const shingles = new Set();
    const size = duplicateDiagnosticThresholds.shingleSize;
    for (let index = 0; index <= tokens.length - size; index += 1) {
      shingles.add(tokens.slice(index, index + size).join(" "));
    }
    return { file: manuscript.file, tokenCount: tokens.length, shingles };
  }).filter((profile) => profile.shingles.size >= duplicateDiagnosticThresholds.shingleMinimumSetSize);

  for (let leftIndex = 0; leftIndex < shingleProfiles.length; leftIndex += 1) {
    const left = shingleProfiles[leftIndex];
    for (let rightIndex = leftIndex + 1; rightIndex < shingleProfiles.length; rightIndex += 1) {
      const right = shingleProfiles[rightIndex];
      const lengthRatio = Math.min(left.tokenCount, right.tokenCount) / Math.max(left.tokenCount, right.tokenCount);
      if (lengthRatio < duplicateDiagnosticThresholds.shingleMinimumLengthRatio) continue;
      const smaller = left.shingles.size <= right.shingles.size ? left.shingles : right.shingles;
      const larger = smaller === left.shingles ? right.shingles : left.shingles;
      let intersection = 0;
      for (const shingle of smaller) {
        if (larger.has(shingle)) intersection += 1;
      }
      if (intersection < duplicateDiagnosticThresholds.shingleMinimumSetSize) continue;
      const union = left.shingles.size + right.shingles.size - intersection;
      const similarity = union ? intersection / union : 0;
      if (similarity < duplicateDiagnosticThresholds.shingleSimilarity) continue;
      shingleSimilarities += 1;
      duplicateWarnings.push(`DUPLICATE shingle similarity ${similarity.toFixed(3)} in ${filePair(left.file, right.file)}`);
    }
  }

  return {
    messages: duplicateMessages,
    warnings: duplicateWarnings,
    exactSentences,
    twelveTokenSequences,
    sevenTokenMultiReuse,
    shingleSimilarities,
  };
}

function checkDuplicateProse(bodies) {
  const result = findDuplicateProse(bodies);
  summary.duplicateProse.exactSentences = result.exactSentences;
  summary.duplicateProse.twelveTokenSequences = result.twelveTokenSequences;
  summary.duplicateProse.sevenTokenMultiReuse = result.sevenTokenMultiReuse;
  summary.duplicateProse.shingleSimilarities = result.shingleSimilarities;
  result.messages.slice(0, maxDuplicateMessages).forEach(fail);
  if (result.messages.length > maxDuplicateMessages) {
    fail(`DUPLICATE: ${result.messages.length - maxDuplicateMessages} additional duplicate prose findings omitted`);
  }
  result.warnings.slice(0, maxDuplicateWarnings).forEach(warn);
  if (result.warnings.length > maxDuplicateWarnings) {
    warn(`DUPLICATE: ${result.warnings.length - maxDuplicateWarnings} additional duplicate prose warnings omitted`);
  }
}

function parseDelimitedObjectArray(raw, kind, label, problems) {
  if (raw === "[]") return [];
  if (!raw.startsWith("[") || !raw.endsWith("]")) {
    problems.push(`${label} ${kind} must be a bracketed array`);
    return [];
  }
  const source = raw.slice(1, -1);
  const records = [];
  let cursor = 0;
  const pattern = kind === "seeds"
    ? /\{id:`([^`\n]+)`, action:`(plant|advance|payoff)`, deadline:`(V(?:0[1-9]|1[0-2])E(?:0[0-9]|1[01]))`\}/y
    : /\{node:`(N(?:0[1-9]|1[0-2]))`, stage:`(seed|advance|payoff)`, choice:`([^`\n]+)`, cost:`([^`\n]+)`\}/y;
  while (cursor < source.length) {
    pattern.lastIndex = cursor;
    const match = pattern.exec(source);
    if (!match) {
      problems.push(`${label} ${kind} has unconsumed or malformed content at ${JSON.stringify(source.slice(cursor, cursor + 48))}`);
      return records;
    }
    if (kind === "seeds") {
      records.push({ id: match[1], action: match[2], deadline: match[3] });
    } else {
      records.push({ node: match[1], stage: match[2], choice: match[3], cost: match[4] });
    }
    cursor = pattern.lastIndex;
    if (cursor === source.length) break;
    if (source.slice(cursor, cursor + 2) !== ", ") {
      problems.push(`${label} ${kind} has unconsumed or malformed separator at ${JSON.stringify(source.slice(cursor, cursor + 48))}`);
      return records;
    }
    cursor += 2;
  }
  return records;
}

function outlineContractLine(block, label, context, problems) {
  const prefix = `- **${label}**: `;
  const matches = block.split("\n").filter((line) => line.startsWith(prefix));
  if (matches.length !== 1) {
    problems.push(`${context} requires exactly one ${label} line, got ${matches.length}`);
    return null;
  }
  return matches[0].slice(prefix.length);
}

function parseOutlineContractChunk(header, block, sourceLabel, problems) {
  const context = `${sourceLabel} ${header.id}`;
  const volume = `vol${header.id.slice(1, 3)}`;
  const position = Number(header.id.slice(4, 6));
  const filePosition = Number(header.file.slice(0, 2));
  const titleMatch = header.h1.match(/^(\d{2})\.\s+(\S(?:.*\S)?)$/);
  if (!titleMatch) {
    problems.push(`${context} header H1 must be NN. title`);
    return null;
  }
  if (filePosition !== position || Number(titleMatch[1]) !== position) {
    problems.push(`${context} header ID, filename position, and H1 position must match`);
  }

  const povWagerLine = outlineContractLine(block, "POV / WAGER", context, problems);
  const bridgeLine = outlineContractLine(block, "manifest bridge", context, problems);
  const traceScarLine = outlineContractLine(block, "TRACE / SCAR", context, problems);
  const readerLine = outlineContractLine(block, "reader effect", context, problems);
  const stateDeltaLine = outlineContractLine(block, "stateDelta", context, problems);
  const seedsLine = outlineContractLine(block, "seeds", context, problems);
  const relayLine = outlineContractLine(block, "episode RELAY", context, problems);
  if ([povWagerLine, bridgeLine, traceScarLine, readerLine, stateDeltaLine, seedsLine, relayLine].some((line) => line === null)) {
    return null;
  }

  const wagerMatch = povWagerLine.match(/^`([^`\n]+)`; mode=`(initiate|inherit|advance|resolve)`; (?:(?:inherited wager)=`([^`\n]+)`; )?stake=`([^`\n]+)`\. (\S(?:.*\S)?)\. POV=([^\.\n]+)\. 실패 종 `([^`\n]+)`; 인간 승리형 `([^`\n]+)`\.$/);
  if (!wagerMatch) problems.push(`${context} POV / WAGER line is malformed`);
  const wager = wagerMatch ? { id: wagerMatch[1], mode: wagerMatch[2], stake: wagerMatch[4] } : null;
  if (wagerMatch) {
    const inherited = wagerMatch[3] || null;
    if (wager.mode === "initiate" && inherited !== null) {
      problems.push(`${context} initiate WAGER must not declare inherited wager`);
    }
    if (wager.mode !== "initiate" && inherited !== wager.id) {
      problems.push(`${context} non-initiate WAGER inherited wager must exactly equal ${wager.id}`);
    }
  }

  const bridgeMatch = bridgeLine.match(/^episodeId=`([^`\n]+)`; arena=`([^`\n]+)`; choice=(\S(?:.*\S)?); allyRelay=(\[[\s\S]*\]); zeroMode=`([^`\n]+)`; zeroConstraint=(\S(?:.*\S)?); failureType=`([^`\n]+)`; manifestation=`([^`\n]+)`; storyRole=`([^`\n]+)`; genre=`([^`\n]+)`\.$/);
  if (!bridgeMatch) problems.push(`${context} manifest bridge line is malformed`);
  let allyRelay = [];
  if (bridgeMatch) {
    allyRelay = parseDelimitedObjectArray(bridgeMatch[4], "allyRelay", context, problems);
    if (!bridgeMatch[6].trim()) problems.push(`${context} zeroConstraint must be non-empty`);
    if (bridgeMatch[1] !== header.id) problems.push(`${context} episodeId ${bridgeMatch[1]} differs from header ID`);
  }

  const traceScarMatch = traceScarLine.match(/^TRACE=\{Trace:([0-3]), Resource:([0-3]), Agency:([0-3]), Connection:([0-3]), Externality:([0-3]), status:`(open|paid|transformed)`\}; SCAR=\{id:`([^`\n]+)`, change:`([^`\n]+)`, status:`(open|paid|transformed)`, closeBy:(?:`(V(?:0[1-9]|1[0-2])E(?:0[0-9]|1[01]))`|(null))\}\.$/);
  if (!traceScarMatch) problems.push(`${context} TRACE / SCAR line is malformed`);
  const trace = traceScarMatch ? {
    Trace: Number(traceScarMatch[1]),
    Resource: Number(traceScarMatch[2]),
    Agency: Number(traceScarMatch[3]),
    Connection: Number(traceScarMatch[4]),
    Externality: Number(traceScarMatch[5]),
    status: traceScarMatch[6],
  } : null;
  const scar = traceScarMatch ? {
    id: traceScarMatch[7],
    change: traceScarMatch[8],
    status: traceScarMatch[9],
    closeBy: traceScarMatch[10] || null,
  } : null;

  const readerMatch = readerLine.match(/^humanMove=(\S(?:.*\S)?); dopamine=(\S(?:.*\S)?)\.$/);
  if (!readerMatch) problems.push(`${context} reader effect line is malformed`);

  if (!/^\{\S(?:.*\S)?\}\.?$/.test(stateDeltaLine)) {
    problems.push(`${context} stateDelta line is malformed; expected a non-empty braced advisory value`);
  }

  const seedsMatch = seedsLine.match(/^(\[[\s\S]*\]); evidenceIn=\[[\s\S]*\]; evidenceOut=\[[\s\S]*\]\.$/);
  if (!seedsMatch) problems.push(`${context} seeds line is malformed`);
  const seeds = seedsMatch
    ? parseDelimitedObjectArray(seedsMatch[1], "seeds", context, problems)
    : [];

  let relay = null;
  let relayTo = null;
  let nextFile = null;
  const normalRelay = relayLine.match(/^relayTo=`(V(?:0[1-9]|1[0-2])E(?:0[0-9]|1[01]))`; file=`solo-ai-user\/(vol(?:0[1-9]|1[0-2])\/(?:00-prologue|(?:0[1-9]|10)-part(?:[1-9]|10)-[a-z0-9-]+|11-epilogue)\.md)`; cause=(\S(?:.*\S)?)\.$/);
  const terminalRelay = relayLine.match(/^terminal; relayTo=`null`; file=`null`; (\S(?:.*\S)?)\.$/);
  if (normalRelay) {
    relayTo = normalRelay[1];
    nextFile = normalRelay[2];
    relay = normalRelay[3];
  } else if (terminalRelay) {
    relay = "terminal";
  } else {
    problems.push(`${context} episode RELAY line is malformed`);
  }
  if (header.id === "V12E11" && !terminalRelay) problems.push(`${context} terminal contract must use exact terminal RELAY syntax`);
  if (header.id !== "V12E11" && !normalRelay) problems.push(`${context} nonterminal contract must use causal RELAY syntax`);

  if (!wagerMatch || !bridgeMatch || !traceScarMatch || !readerMatch || !seedsMatch || (!normalRelay && !terminalRelay)) {
    return null;
  }
  return {
    id: header.id,
    file: `${volume}/${header.file}`,
    title: titleMatch[2],
    storyRole: bridgeMatch[9],
    genre: bridgeMatch[10],
    pov: wagerMatch[6],
    arena: bridgeMatch[2],
    choice: bridgeMatch[3],
    zeroMode: bridgeMatch[5],
    failureType: { class: bridgeMatch[7], manifestation: bridgeMatch[8] },
    TRACE: trace,
    humanMove: readerMatch[1],
    dopamine: readerMatch[2],
    relay,
    relayTo,
    nextFile,
    seeds,
    allyRelay,
    WAGER: wager,
    SCAR: scar,
  };
}

function parseOutlineContractChunks(text, sourceLabel) {
  const records = [];
  const problems = [];
  const headerPattern = /^### EPISODE CONTRACT (V(?:0[1-9]|1[0-2])E(?:0[0-9]|1[01])) — `((?:00-prologue|(?:0[1-9]|10)-part(?:[1-9]|10)-[a-z0-9-]+|11-epilogue)\.md)` \/ `# ((?:0[0-9]|1[01])\. \S(?:.*\S)?)`$/gm;
  const headers = [...text.matchAll(headerPattern)].map((match) => ({
    id: match[1],
    file: match[2],
    h1: match[3],
    start: match.index,
    bodyStart: match.index + match[0].length,
  }));
  if (headers.length === 0) problems.push(`${sourceLabel} contains no valid EPISODE CONTRACT headers`);
  for (let index = 0; index < headers.length; index += 1) {
    const header = headers[index];
    const bodyEnd = index + 1 < headers.length ? headers[index + 1].start : text.length;
    const block = text.slice(header.bodyStart, bodyEnd);
    const record = parseOutlineContractChunk(header, block, sourceLabel, problems);
    if (record) records.push(record);
  }
  return { records, problems };
}

function validateOutlineContractSequence(records, volume) {
  const problems = [];
  if (records.length !== 12) {
    problems.push(`${volume} requires exactly 12 parsed episode contracts, got ${records.length}`);
  }
  for (let position = 0; position < 12; position += 1) {
    const expectedId = `V${volume.slice(3)}E${String(position).padStart(2, "0")}`;
    const record = records[position];
    if (!record || record.id !== expectedId) {
      problems.push(`${volume} contract position ${String(position).padStart(2, "0")} must be ${expectedId}, got ${record ? record.id : "<missing>"}`);
    }
    if (record && !record.file.startsWith(`${volume}/`)) {
      problems.push(`${volume} contract ${record.id} file must stay inside ${volume}, got ${record.file}`);
    }
  }
  return problems;
}

function validateOutlineManifestBindings(entries, outlineRecords, canonical) {
  const problems = [];
  const manifestById = new Map();
  for (const entry of entries) {
    if (plainObject(entry) && typeof entry.id === "string" && !manifestById.has(entry.id)) {
      manifestById.set(entry.id, entry);
    }
  }
  const canonicalById = new Map([...canonical.values()].map((slot) => [episodeIdForSlot(slot), slot]));
  const boundFields = [
    "file",
    "title",
    "storyRole",
    "genre",
    "pov",
    "arena",
    "choice",
    "zeroMode",
    "failureType",
    "TRACE",
    "humanMove",
    "dopamine",
    "relay",
    "relayTo",
    "seeds",
    "allyRelay",
    "WAGER",
    "SCAR",
  ];
  const seenOutlineIds = new Set();
  const seenOutlineFiles = new Set();
  for (const record of outlineRecords) {
    if (seenOutlineIds.has(record.id)) problems.push(`outline duplicate episode ID ${record.id}`);
    if (seenOutlineFiles.has(record.file)) problems.push(`outline duplicate manuscript file ${record.file}`);
    seenOutlineIds.add(record.id);
    seenOutlineFiles.add(record.file);
    const entry = manifestById.get(record.id);
    if (!entry) {
      problems.push(`outline ${record.id} has no manifest entry`);
      continue;
    }
    for (const field of boundFields) {
      if (JSON.stringify(stableSemanticValue(entry[field])) !== JSON.stringify(stableSemanticValue(record[field]))) {
        problems.push(`outline ${record.id} ${field} differs from manifest`);
      }
    }
    if (record.relayTo === null) {
      if (record.nextFile !== null) problems.push(`outline ${record.id} terminal nextFile must be null`);
    } else {
      const nextSlot = canonicalById.get(record.relayTo);
      if (!nextSlot || record.nextFile !== nextSlot.path) {
        problems.push(`outline ${record.id} next file ${record.nextFile || "<missing>"} differs from relay target ${nextSlot ? nextSlot.path : "<missing>"}`);
      }
    }
  }
  for (const entry of entries) {
    if (plainObject(entry) && typeof entry.id === "string" && !seenOutlineIds.has(entry.id)) {
      problems.push(`manifest ${entry.id} has no outline contract`);
    }
  }
  return problems;
}

function checkOutlineManifestBindings(entries, canonical) {
  const records = [];
  const problems = [];
  for (const volume of volumes) {
    const file = path.join(projectRoot, "outline", volume.outline);
    if (!exists(file)) continue;
    const text = read(file);
    if (text === null) continue;
    const parsed = parseOutlineContractChunks(text, relativeToRepo(file));
    problems.push(...parsed.problems);
    problems.push(...validateOutlineContractSequence(parsed.records, volume.directory)
      .map((message) => `${relativeToRepo(file)} ${message}`));
    records.push(...parsed.records);
  }
  if (records.length !== 144) problems.push(`outline contract binding requires exactly 144 records, got ${records.length}`);
  problems.push(...validateOutlineManifestBindings(entries, records, canonical));
  problems.forEach((message) => fail(`solo-ai-user/outline: ${message}`));
  return { records, problems };
}

function manifestEntries(document) {
  return Array.isArray(document) ? document : null;
}

function parseCanonicalSeedRegistry(text) {
  const ids = [];
  const seen = new Set();
  const duplicates = new Set();
  for (const match of text.matchAll(/`SEED:([A-Z][A-Z0-9-]{2,})`/g)) {
    const id = match[1];
    if (seen.has(id)) duplicates.add(id);
    else {
      seen.add(id);
      ids.push(id);
    }
  }
  return { ids, duplicates: [...duplicates].sort() };
}

function plainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function episodeIdForSlot(slot) {
  return `V${slot.volume.slice(3)}E${String(slot.position).padStart(2, "0")}`;
}

function stableSemanticValue(value) {
  if (Array.isArray(value)) return value.map(stableSemanticValue);
  if (!plainObject(value)) return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableSemanticValue(value[key])]));
}

function manifestSemanticFingerprint(entry) {
  const semantic = {
    storyRole: entry.storyRole,
    genre: entry.genre,
    pov: entry.pov,
    arena: entry.arena,
    choice: entry.choice,
    zeroMode: entry.zeroMode,
    failureManifestation: plainObject(entry.failureType) ? entry.failureType.manifestation : null,
    humanMove: entry.humanMove,
    dopamine: entry.dopamine,
    stateDelta: entry.stateDelta,
    wagerStake: plainObject(entry.WAGER) ? entry.WAGER.stake : null,
    scarChange: plainObject(entry.SCAR) ? entry.SCAR.change : null,
    seedActions: Array.isArray(entry.seeds)
      ? entry.seeds.map((seed) => plainObject(seed) ? seed.action : null)
      : null,
    allyChoices: Array.isArray(entry.allyRelay)
      ? entry.allyRelay.map((ally) => plainObject(ally) ? { choice: ally.choice, cost: ally.cost } : null)
      : null,
  };
  return JSON.stringify(stableSemanticValue(semantic));
}

function validateExactObjectFields(value, expectedFields, label, problems) {
  if (!plainObject(value)) return;
  const expected = new Set(expectedFields);
  for (const field of expectedFields) {
    if (!Object.prototype.hasOwnProperty.call(value, field)) {
      problems.push(`${label} missing required field ${field}`);
    }
  }
  for (const field of Object.keys(value)) {
    if (!expected.has(field)) problems.push(`${label} unexpected field ${field}`);
  }
}

function validateManifestEntrySchema(entry, index) {
  const problems = [];
  validateExactObjectFields(entry, Object.keys(manifestSchema.fields), `entry ${index + 1}`, problems);

  const nonEmptyStringFields = [
    "id",
    "file",
    "title",
    "storyRole",
    "genre",
    "pov",
    "arena",
    "choice",
    "zeroMode",
    "humanMove",
    "dopamine",
    "relay",
  ];
  for (const field of nonEmptyStringFields) {
    if (Object.prototype.hasOwnProperty.call(entry, field)
      && (typeof entry[field] !== "string" || !entry[field].trim())) {
      problems.push(`entry ${index + 1} field ${field} must be a non-empty string`);
    }
  }
  if (Object.prototype.hasOwnProperty.call(entry, "zeroMode") && !zeroModes.includes(entry.zeroMode)) {
    problems.push(`entry ${index + 1} zeroMode must be ${zeroModes.join(", ")}`);
  }
  if (Object.prototype.hasOwnProperty.call(entry, "hook")
    && entry.hook !== null
    && typeof entry.hook !== "string") {
    problems.push(`entry ${index + 1} field hook must be a string or null`);
  }
  if (Object.prototype.hasOwnProperty.call(entry, "failureType")) {
    if (!plainObject(entry.failureType)) {
      problems.push(`entry ${index + 1} field failureType must be an object`);
    } else {
      validateExactObjectFields(entry.failureType, ["class", "manifestation"], `entry ${index + 1} failureType`, problems);
      for (const field of ["class", "manifestation"]) {
        if (typeof entry.failureType[field] !== "string" || !entry.failureType[field].trim()) {
          problems.push(`entry ${index + 1} failureType.${field} must be a non-empty string`);
        }
      }
    }
  }
  if (Object.prototype.hasOwnProperty.call(entry, "stateDelta")) {
    if (!plainObject(entry.stateDelta)) {
      problems.push(`entry ${index + 1} field stateDelta must be an object`);
    } else {
      validateExactObjectFields(
        entry.stateDelta,
        manifestSchema.stateDelta.fields,
        `entry ${index + 1} stateDelta`,
        problems,
      );
      for (const field of manifestSchema.stateDelta.fields) {
        if (typeof entry.stateDelta[field] !== "string" || !entry.stateDelta[field].trim()) {
          problems.push(`entry ${index + 1} stateDelta.${field} must be a non-empty string`);
          continue;
        }
        const requiredPrefix = {
          capability: "능력:",
          mystery: "미스터리:",
          relationship: "관계:",
        }[field];
        if (!entry.stateDelta[field].startsWith(requiredPrefix)) {
          problems.push(`entry ${index + 1} stateDelta.${field} must begin with ${requiredPrefix}`);
        }
      }
    }
  }
  if (Object.prototype.hasOwnProperty.call(entry, "seeds") && !Array.isArray(entry.seeds)) {
    problems.push(`entry ${index + 1} field seeds must be an array`);
  }
  if (Object.prototype.hasOwnProperty.call(entry, "allyRelay") && !Array.isArray(entry.allyRelay)) {
    problems.push(`entry ${index + 1} field allyRelay must be an array`);
  }

  if (Object.prototype.hasOwnProperty.call(entry, "TRACE")) {
    if (!entry.TRACE || typeof entry.TRACE !== "object" || Array.isArray(entry.TRACE)) {
      problems.push(`entry ${index + 1} field TRACE must be an object`);
    } else {
      validateExactObjectFields(
        entry.TRACE,
        [...manifestSchema.trace.axes, "status"],
        `entry ${index + 1} TRACE`,
        problems,
      );
      for (const axis of manifestSchema.trace.axes) {
        if (!Object.prototype.hasOwnProperty.call(entry.TRACE, axis)) continue;
        const score = entry.TRACE[axis];
        if (!Number.isInteger(score)
          || score < manifestSchema.trace.minimum
          || score > manifestSchema.trace.maximum) {
          problems.push(`entry ${index + 1} TRACE.${axis} must be an integer from 0 through 3`);
        }
      }
      if (!manifestSchema.trace.statuses.includes(entry.TRACE.status)) {
        problems.push(`entry ${index + 1} TRACE.status must be open, paid, or transformed`);
      }
      const positiveAxes = manifestSchema.trace.axes.filter((axis) => Number.isInteger(entry.TRACE[axis]) && entry.TRACE[axis] > 0);
      if (["tier3-counterfactual", "tier4-orchestrate", "root"].includes(entry.zeroMode)
        && positiveAxes.length < 2) {
        problems.push(`entry ${index + 1} zeroMode ${entry.zeroMode} requires at least two positive TRACE axes`);
      }
      if (entry.zeroMode === "root" && !(entry.TRACE.Trace > 0 && entry.TRACE.Externality > 0)) {
        problems.push(`entry ${index + 1} root mode requires positive TRACE.Trace and TRACE.Externality`);
      }
    }
  }

  if (Object.prototype.hasOwnProperty.call(entry, "WAGER")) {
    if (!entry.WAGER || typeof entry.WAGER !== "object" || Array.isArray(entry.WAGER)) {
      problems.push(`entry ${index + 1} field WAGER must be an object`);
    } else {
      validateExactObjectFields(entry.WAGER, manifestSchema.wager.fields, `entry ${index + 1} WAGER`, problems);
      for (const field of ["id", "stake"]) {
        if (typeof entry.WAGER[field] !== "string" || !entry.WAGER[field].trim()) {
          problems.push(`entry ${index + 1} WAGER.${field} must be a non-empty string`);
        }
      }
      if (!manifestSchema.wager.modes.includes(entry.WAGER.mode)) {
        problems.push(`entry ${index + 1} WAGER.mode must be initiate, inherit, advance, or resolve`);
      }
    }
  }

  if (Object.prototype.hasOwnProperty.call(entry, "SCAR")) {
    if (!entry.SCAR || typeof entry.SCAR !== "object" || Array.isArray(entry.SCAR)) {
      problems.push(`entry ${index + 1} field SCAR must be an object`);
    } else {
      validateExactObjectFields(entry.SCAR, manifestSchema.scar.fields, `entry ${index + 1} SCAR`, problems);
      for (const field of ["id", "change"]) {
        if (typeof entry.SCAR[field] !== "string" || !entry.SCAR[field].trim()) {
          problems.push(`entry ${index + 1} SCAR.${field} must be a non-empty string`);
        }
      }
      if (!manifestSchema.scar.statuses.includes(entry.SCAR.status)) {
        problems.push(`entry ${index + 1} SCAR.status must be open, paid, or transformed`);
      }
      if (entry.SCAR.status === "open" && (typeof entry.SCAR.closeBy !== "string" || !entry.SCAR.closeBy.trim())) {
        problems.push(`entry ${index + 1} open SCAR.closeBy must be a canonical episode ID`);
      }
      if (["paid", "transformed"].includes(entry.SCAR.status) && entry.SCAR.closeBy !== null) {
        problems.push(`entry ${index + 1} paid/transformed SCAR.closeBy must be null`);
      }
    }
  }

  if (Array.isArray(entry.seeds)) {
    const seedIdsInEntry = new Set();
    entry.seeds.forEach((seed, seedIndex) => {
      if (!plainObject(seed)) {
        problems.push(`entry ${index + 1} seed ${seedIndex + 1} must be an object`);
        return;
      }
      validateExactObjectFields(
        seed,
        manifestSchema.seed.fields,
        `entry ${index + 1} seed ${seedIndex + 1}`,
        problems,
      );
      if (typeof seed.id !== "string" || !seed.id.trim()) {
        problems.push(`entry ${index + 1} seed ${seedIndex + 1} id must be a non-empty string`);
      } else if (seedIdsInEntry.has(seed.id)) {
        problems.push(`entry ${index + 1} duplicate seed id ${seed.id} within one entry`);
      } else {
        seedIdsInEntry.add(seed.id);
      }
      if (!manifestSchema.seed.actions.includes(seed.action)) {
        problems.push(`entry ${index + 1} seed ${seedIndex + 1} action must be plant, advance, or payoff`);
      }
      if (typeof seed.deadline !== "string" || !seed.deadline.trim()) {
        problems.push(`entry ${index + 1} seed ${seedIndex + 1} deadline must be a canonical episode ID`);
      }
    });
  }

  if (Array.isArray(entry.allyRelay)) {
    const allyNodesInEntry = new Set();
    entry.allyRelay.forEach((ally, allyIndex) => {
      if (!plainObject(ally)) {
        problems.push(`entry ${index + 1} allyRelay ${allyIndex + 1} must be an object`);
        return;
      }
      validateExactObjectFields(
        ally,
        manifestSchema.allyRelay.fields,
        `entry ${index + 1} allyRelay ${allyIndex + 1}`,
        problems,
      );
      if (typeof ally.node !== "string" || !/^N(?:0[1-9]|1[0-2])$/.test(ally.node)) {
        problems.push(`entry ${index + 1} allyRelay ${allyIndex + 1} node must be N01 through N12`);
      } else if (allyNodesInEntry.has(ally.node)) {
        problems.push(`entry ${index + 1} duplicate allyRelay node ${ally.node} within one entry`);
      } else {
        allyNodesInEntry.add(ally.node);
      }
      if (!manifestSchema.allyRelay.stages.includes(ally.stage)) {
        problems.push(`entry ${index + 1} allyRelay ${allyIndex + 1} stage must be seed, advance, or payoff`);
      }
      for (const field of ["choice", "cost"]) {
        if (typeof ally[field] !== "string" || !substantiveLedgerValue(ally[field])) {
          problems.push(`entry ${index + 1} allyRelay ${allyIndex + 1} ${field} must contain substantive content`);
        }
      }
    });
  }
  return problems;
}

function validateCanonicalStoryLocks(entries) {
  const problems = [];
  const byId = new Map(
    entries
      .filter((entry) => plainObject(entry) && typeof entry.id === "string")
      .map((entry) => [entry.id, entry]),
  );

  const v01e04 = byId.get("V01E04");
  if (v01e04 && (v01e04.zeroMode !== "tier1-read"
    || typeof v01e04.stateDelta?.capability !== "string"
    || !v01e04.stateDelta.capability.includes("tier1-read")
    || /tier3-counterfactual/i.test(v01e04.stateDelta.capability))) {
    problems.push("V01E04 must remain tier1-read; Tier 3 first belongs to V04E05");
  }

  for (const entry of entries) {
    if (!plainObject(entry)
      || typeof entry.id !== "string"
      || entry.id >= "V09E04"
      || !plainObject(entry.stateDelta)
      || typeof entry.stateDelta.mystery !== "string"
      || !entry.stateDelta.mystery.includes("서혜진=Architect")) {
      continue;
    }
    if (!/(보류|미공개|확정되지|공개되지|여부)/.test(entry.stateDelta.mystery)) {
      problems.push(`${entry.id} must keep 서혜진=Architect unresolved before V09E04`);
    }
  }

  const v08e10 = byId.get("V08E10");
  if (v08e10) {
    const earlyConclusionText = [v08e10.choice, v08e10.stateDelta?.mystery]
      .filter((value) => typeof value === "string")
      .join(" ");
    if (/공동 (?:내부 )?결론|내부 공동 결론|같은 사람의 것이라는 공동 결론/.test(earlyConclusionText)) {
      problems.push("V08E10 cannot reach a private 서혜진=Architect conclusion before V09E04");
    }
    if (typeof v08e10.stateDelta?.mystery !== "string"
      || !v08e10.stateDelta.mystery.includes("V09E04")
      || !v08e10.stateDelta.mystery.includes("보류")) {
      problems.push("V08E10 must defer the identity conclusion to V09E04");
    }
  }

  const v08e11 = byId.get("V08E11");
  if (v08e11 && (typeof v08e11.stateDelta?.mystery !== "string"
    || !v08e11.stateDelta.mystery.includes("V09E04")
    || !v08e11.stateDelta.mystery.includes("보류"))) {
    problems.push("V08E11 must keep the identity conclusion unresolved until V09E04");
  }

  const v09e04 = byId.get("V09E04");
  if (v09e04 && (typeof v09e04.stateDelta?.mystery !== "string"
    || !v09e04.stateDelta.mystery.includes("서혜진=Architect")
    || !v09e04.stateDelta.mystery.includes("확정"))) {
    problems.push("V09E04 must be the first confirmed 서혜진=Architect identity reveal");
  }

  const v11e03 = byId.get("V11E03");
  if (v11e03) {
    const mystery = v11e03.stateDelta?.mystery;
    const requiredSegments = [
      "00:00~17:00",
      "17:00~72:00",
      "실제 생명을 구",
      "72:00 이후",
      "재동의 없이",
    ];
    if (typeof mystery !== "string" || requiredSegments.some((segment) => !mystery.includes(segment))) {
      problems.push("V11E03 must separate the first 17 minutes, the 55-minute rescue, and post-72 no-reconsent permanence");
    }
    if (typeof mystery === "string" && /17(?::00)?~72(?::00)?.{0,24}비동의 중앙 통제/.test(mystery)) {
      problems.push("V11E03 cannot place permanent non-consensual control inside the 17:00~72:00 rescue window");
    }
  }

  const v12e01 = byId.get("V12E01");
  if (v12e01) {
    const relationship = v12e01.stateDelta?.relationship;
    if (typeof relationship !== "string"
      || !relationship.includes("독립 수탁자")
      || relationship.includes("추종")) {
      problems.push("V12E01 must preserve N01~N12 as already-independent trustees, never followers");
    }
  }

  const v05e05 = byId.get("V05E05");
  if (v05e05) {
    const relationship = v05e05.stateDelta?.relationship;
    if (typeof relationship !== "string"
      || !relationship.includes("개인 연락·원본·조사 접근권을 회수")
      || !relationship.includes("용서·복구는 성립하지 않는다")) {
      problems.push("V05E05 must revoke Arin access without same-episode forgiveness or repair");
    }
  }

  const v06e10 = byId.get("V06E10");
  if (v06e10 && (typeof v06e10.stateDelta?.relationship !== "string"
    || !v06e10.stateDelta.relationship.includes("V06E10에서 처음 연애가 성립"))) {
    problems.push("V06E10 must remain the first episode where Hyunwoo and Arin establish a romantic relationship");
  }

  const v09e09 = byId.get("V09E09");
  if (v09e09) {
    const relationship = v09e09.stateDelta?.relationship;
    if (typeof relationship !== "string"
      || !relationship.includes("용서하지 않고")
      || !relationship.includes("즉시 위로하지 않")) {
      problems.push("V09E09 must withhold immediate forgiveness and comfort after the breach");
    }
  }

  const v11e07 = byId.get("V11E07");
  if (v11e07 && (typeof v11e07.stateDelta?.relationship !== "string"
    || !v11e07.stateDelta.relationship.includes("기록자·N05·연인 역할을 분리"))) {
    problems.push("V11E07 must keep Arin's witness, N05, and partner roles independent");
  }

  const v12e05 = byId.get("V12E05");
  if (v12e05) {
    const relationship = v12e05.stateDelta?.relationship;
    const requiredRelationshipLocks = ["N05 아린", "첫 초안에도 반대", "보편 거부권"];
    if (typeof relationship !== "string"
      || requiredRelationshipLocks.some((lock) => !relationship.includes(lock))) {
      problems.push("V12E05 must preserve Arin as an independent N05 rights trustee who can reject Hyunwoo's draft");
    }
  }

  return problems;
}

function validateManifestRecords(entries, canonical, options) {
  const result = { failures: [], warnings: [], mapped: 0, allyEvents: [] };
  const byIndex = new Map([...canonical.values()].map((slot) => [slot.index, slot]));
  const byEpisodeId = new Map([...canonical.values()].map((slot) => [episodeIdForSlot(slot), slot]));
  const seenFiles = new Map();
  const seenIds = new Map();
  const expected = new Set(options.expectedPaths);
  const mappedEntries = [];

  if (options.finalMode && entries.length !== 144) {
    result.failures.push(`final mode requires exactly 144 episode entries, got ${entries.length}`);
  }
  if (options.finalMode && canonical.size !== 144) {
    result.failures.push(`final mode requires exactly 144 canonical manuscripts, got ${canonical.size}`);
  }

  entries.forEach((entry, index) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      result.failures.push(`entry ${index + 1} must be an object`);
      return;
    }
    result.failures.push(...validateManifestEntrySchema(entry, index));
    const slot = typeof entry.file === "string" ? canonical.get(entry.file) || null : null;
    if (!slot) {
      if (Object.prototype.hasOwnProperty.call(entry, "file")) {
        result.failures.push(`entry ${index + 1} file must exactly equal a canonical manuscript path, got ${String(entry.file)}`);
      }
      return;
    }

    if (options.finalMode && slot.index !== index) {
      const expectedSlot = byIndex.get(index);
      result.failures.push(`entry ${index + 1} must appear in canonical order as ${expectedSlot ? expectedSlot.path : "<missing>"}, got ${slot.path}`);
    }

    const expectedId = episodeIdForSlot(slot);
    if (entry.id !== expectedId) {
      result.failures.push(`entry ${index + 1} id must exactly equal ${expectedId} for ${slot.path}`);
    }
    if (seenIds.has(entry.id)) {
      result.failures.push(`duplicate manifest episode ID ${String(entry.id)} at entries ${seenIds.get(entry.id) + 1} and ${index + 1}`);
    } else if (typeof entry.id === "string") {
      seenIds.set(entry.id, index);
    }

    if (seenFiles.has(slot.path)) {
      result.failures.push(`duplicate manifest mapping for ${slot.path} at entries ${seenFiles.get(slot.path) + 1} and ${index + 1}`);
    } else {
      seenFiles.set(slot.path, index);
      result.mapped += 1;
    }

    if (entry.title !== slot.title) {
      result.failures.push(`entry ${index + 1} title must exactly equal manuscript H1 title "${slot.title}", got "${String(entry.title)}"`);
    }
    const volumeNumber = Number(slot.volume.slice(3));
    const expectedFailureClass = failureClassByVolume[volumeNumber - 1];
    if (plainObject(entry.failureType) && entry.failureType.class !== expectedFailureClass) {
      result.failures.push(`entry ${index + 1} failureType.class must be ${expectedFailureClass} in ${slot.volume}`);
    }

    const expectedNext = byIndex.get(slot.index + 1) || null;
    if (slot.index === 143) {
      if (entry.relayTo !== null) {
        result.failures.push(`entry ${index + 1} relayTo must be null at the end of the canonical chain`);
      }
      if (entry.hook !== null) {
        result.failures.push(`entry ${index + 1} terminal hook must be null`);
      }
      if (entry.relay !== "terminal") {
        result.failures.push(`entry ${index + 1} terminal relay must exactly equal terminal`);
      }
      if (!plainObject(entry.WAGER) || entry.WAGER.mode !== "resolve") {
        result.failures.push(`entry ${index + 1} terminal WAGER must resolve`);
      }
      if (plainObject(entry.SCAR) && entry.SCAR.status === "open") {
        result.failures.push(`entry ${index + 1} terminal SCAR cannot be open`);
      }
    } else {
      const expectedRelayId = expectedNext ? episodeIdForSlot(expectedNext) : null;
      if (typeof entry.relayTo !== "string" || entry.relayTo !== expectedRelayId) {
        result.failures.push(`entry ${index + 1} relayTo must be the exact next canonical episode ID ${expectedRelayId || "<missing>"}`);
      }
      if (typeof entry.hook !== "string" || !entry.hook.trim()) {
        result.failures.push(`entry ${index + 1} nonterminal hook must be a non-empty string`);
      }
    }

    if (!seenFiles.has(slot.path) || seenFiles.get(slot.path) === index) {
      mappedEntries.push({ entry, index, slot });
    }
  });

  for (const expectedPath of expected) {
    if (!seenFiles.has(expectedPath)) result.failures.push(`missing manifest mapping for ${expectedPath}`);
  }

  if (options.storyLocks) {
    result.failures.push(...validateCanonicalStoryLocks(entries));
  }

  mappedEntries.sort((left, right) => left.slot.index - right.slot.index);
  const openWagers = new Map();
  const resolvedWagers = new Set();
  let activeWagerId = null;
  const openScars = new Map();
  const closedScars = new Set();
  const openSeeds = new Map();
  const plantedSeeds = new Set();
  const paidSeeds = new Set();
  const allySeeded = new Set();
  const allyPaid = new Set();
  const allyStates = new Map();
  let previous = null;

  for (const record of mappedEntries) {
    const { entry, slot, index } = record;
    if (previous && slot.index === previous.slot.index + 1) {
      if (manifestSemanticFingerprint(entry) === manifestSemanticFingerprint(previous.entry)) {
        result.failures.push(`entry ${index + 1} adjacent semantic fingerprint must differ from ${episodeIdForSlot(previous.slot)}`);
      }
      if (slot.volume === previous.slot.volume) {
        for (const field of ["arena", "humanMove", "dopamine"]) {
          if (normalizeProse(entry[field]) === normalizeProse(previous.entry[field])) {
            result.failures.push(`entry ${index + 1} adjacent ${field} values must differ within ${slot.volume}`);
          }
        }
      }
    }

    if (plainObject(entry.WAGER)
      && typeof entry.WAGER.id === "string"
      && typeof entry.WAGER.stake === "string"
      && manifestSchema.wager.modes.includes(entry.WAGER.mode)) {
      const open = openWagers.get(entry.WAGER.id);
      const switchesAwayFromActive = activeWagerId !== null && entry.WAGER.id !== activeWagerId;
      if (switchesAwayFromActive) {
        result.failures.push(`entry ${index + 1} WAGER ${entry.WAGER.id} must continue active WAGER ${activeWagerId} without a dormant gap`);
        if (entry.WAGER.mode === "initiate") {
          result.failures.push(`entry ${index + 1} WAGER ${entry.WAGER.id} cannot initiate while WAGER ${activeWagerId} is active`);
        }
      } else if (entry.WAGER.mode === "initiate") {
        if (resolvedWagers.has(entry.WAGER.id)) {
          result.failures.push(`entry ${index + 1} WAGER ${entry.WAGER.id} cannot reopen resolved WAGER`);
        } else if (open) {
          result.failures.push(`entry ${index + 1} WAGER ${entry.WAGER.id} initiate cannot reopen an open WAGER`);
        } else if (activeWagerId !== null) {
          result.failures.push(`entry ${index + 1} WAGER ${entry.WAGER.id} cannot initiate while WAGER ${activeWagerId} is active`);
        } else {
          openWagers.set(entry.WAGER.id, { stake: entry.WAGER.stake, openedAt: slot.index });
          activeWagerId = entry.WAGER.id;
        }
      } else if (!open) {
        result.failures.push(`entry ${index + 1} WAGER ${entry.WAGER.id} ${entry.WAGER.mode} requires an open WAGER`);
      } else {
        if (open.stake !== entry.WAGER.stake) {
          result.failures.push(`entry ${index + 1} WAGER ${entry.WAGER.id} stake must remain "${open.stake}"`);
        }
        if (entry.WAGER.mode === "resolve") {
          openWagers.delete(entry.WAGER.id);
          resolvedWagers.add(entry.WAGER.id);
          activeWagerId = null;
        }
      }
    }

    if (plainObject(entry.SCAR)
      && typeof entry.SCAR.id === "string"
      && manifestSchema.scar.statuses.includes(entry.SCAR.status)) {
      if (entry.SCAR.status === "open") {
        const deadline = byEpisodeId.get(entry.SCAR.closeBy);
        if (closedScars.has(entry.SCAR.id)) {
          result.failures.push(`entry ${index + 1} SCAR ${entry.SCAR.id} cannot reopen a closed SCAR`);
        } else if (!deadline || deadline.index <= slot.index || deadline.index > slot.index + 2) {
          result.failures.push(`entry ${index + 1} open SCAR ${entry.SCAR.id} closeBy must be a canonical episode ID 1-2 episodes ahead`);
        } else if (openScars.has(entry.SCAR.id)) {
          result.failures.push(`entry ${index + 1} SCAR ${entry.SCAR.id} cannot reopen before it closes`);
        } else if ([...openScars.values()].some((open) => open.deadlineIndex === deadline.index)) {
          const conflict = [...openScars.entries()].find(([, open]) => open.deadlineIndex === deadline.index);
          result.failures.push(`entry ${index + 1} open SCAR ${entry.SCAR.id} cannot share closeBy ${entry.SCAR.closeBy} with open SCAR ${conflict ? conflict[0] : "<unknown>"}`);
        } else {
          openScars.set(entry.SCAR.id, { deadlineId: entry.SCAR.closeBy, deadlineIndex: deadline.index });
        }
      } else if (openScars.has(entry.SCAR.id)) {
        openScars.delete(entry.SCAR.id);
        closedScars.add(entry.SCAR.id);
      } else if (closedScars.has(entry.SCAR.id)) {
        result.failures.push(`entry ${index + 1} SCAR ${entry.SCAR.id} cannot close an already closed SCAR`);
      } else {
        closedScars.add(entry.SCAR.id);
      }
    }

    if (Array.isArray(entry.seeds)) {
      for (const seed of entry.seeds) {
        if (!plainObject(seed)
          || typeof seed.id !== "string"
          || !manifestSchema.seed.actions.includes(seed.action)
          || typeof seed.deadline !== "string") continue;
        const deadline = byEpisodeId.get(seed.deadline);
        const open = openSeeds.get(seed.id);
        if (seed.action === "plant") {
          if (paidSeeds.has(seed.id)) {
            result.failures.push(`entry ${index + 1} seed ${seed.id} cannot replant a paid-off seed`);
          } else if (!deadline || deadline.index <= slot.index) {
            result.failures.push(`entry ${index + 1} seed ${seed.id} plant deadline must be a later canonical episode ID`);
          } else if (open) {
            result.failures.push(`entry ${index + 1} seed ${seed.id} cannot plant while already open`);
          } else {
            openSeeds.set(seed.id, { deadlineId: seed.deadline, deadlineIndex: deadline.index, plantedIndex: slot.index });
            plantedSeeds.add(seed.id);
          }
        } else if (!open) {
          result.failures.push(`entry ${index + 1} seed ${seed.id} ${seed.action} requires an open seed`);
        } else {
          if (seed.deadline !== open.deadlineId) {
            result.failures.push(`entry ${index + 1} seed ${seed.id} deadline must remain ${open.deadlineId}`);
          }
          if (slot.index <= open.plantedIndex || slot.index > open.deadlineIndex) {
            result.failures.push(`entry ${index + 1} seed ${seed.id} ${seed.action} must occur after plant and by ${open.deadlineId}`);
          }
          if (seed.action === "payoff") {
            openSeeds.delete(seed.id);
            paidSeeds.add(seed.id);
          }
        }
      }
    }

    if (Array.isArray(entry.allyRelay)) {
      for (const ally of entry.allyRelay) {
        if (!plainObject(ally)
          || typeof ally.node !== "string"
          || !/^N(?:0[1-9]|1[0-2])$/.test(ally.node)
          || !manifestSchema.allyRelay.stages.includes(ally.stage)) continue;
        result.allyEvents.push({ node: ally.node, stage: ally.stage, file: slot.path, index: slot.index });
        const allyState = allyStates.get(ally.node) || null;
        if (ally.stage === "seed") {
          if (Number(slot.volume.slice(3)) > 10) {
            result.failures.push(`entry ${index + 1} ALLY ${ally.node} seed must occur in vol01-vol10`);
          }
          if (allyState) {
            result.failures.push(`entry ${index + 1} ALLY ${ally.node} seed cannot repeat after first seed`);
          } else {
            allyStates.set(ally.node, "seeded");
            allySeeded.add(ally.node);
          }
        } else if (!allyState) {
          result.failures.push(`entry ${index + 1} ALLY ${ally.node} ${ally.stage} requires an earlier seed`);
        } else if (allyState !== "seeded") {
          result.failures.push(`entry ${index + 1} ALLY ${ally.node} ${ally.stage} requires an open seeded node`);
        }
        if (ally.stage === "payoff") {
          if (slot.volume !== "vol12") {
            result.failures.push(`entry ${index + 1} ALLY ${ally.node} payoff must occur in vol12`);
          }
          if (allyState === "seeded" && slot.volume === "vol12") {
            allyStates.set(ally.node, "paid");
            allyPaid.add(ally.node);
          }
        }
      }
    }

    for (const [scarId, open] of [...openScars]) {
      if (open.deadlineIndex === slot.index) {
        result.failures.push(`entry ${index + 1} SCAR ${scarId} was not closed by ${open.deadlineId}`);
        openScars.delete(scarId);
      }
    }
    for (const [seedId, open] of [...openSeeds]) {
      if (open.deadlineIndex === slot.index) {
        result.failures.push(`entry ${index + 1} seed ${seedId} was not paid off by ${open.deadlineId}`);
        openSeeds.delete(seedId);
      }
    }

    if (slot.index === 143) {
      for (const wagerId of openWagers.keys()) {
        result.failures.push(`terminal leaves open WAGER ${wagerId}`);
      }
      for (const scarId of openScars.keys()) {
        result.failures.push(`terminal leaves open SCAR ${scarId}`);
      }
      for (const seedId of openSeeds.keys()) {
        result.failures.push(`terminal leaves open seed ${seedId}`);
      }
    }
    previous = record;
  }

  if (options.finalMode) {
    const requiredSeedIds = options.requiredSeedIds instanceof Set
      ? options.requiredSeedIds
      : new Set(options.requiredSeedIds || []);
    for (const seedId of requiredSeedIds) {
      if (!plantedSeeds.has(seedId)) result.failures.push(`manifest missing required canonical seed ${seedId} plant`);
      if (!paidSeeds.has(seedId)) result.failures.push(`manifest missing required canonical seed ${seedId} payoff`);
    }
    for (let number = 1; number <= 12; number += 1) {
      const node = `N${String(number).padStart(2, "0")}`;
      if (!allySeeded.has(node)) result.failures.push(`manifest missing ALLY seed for ${node} in vol01-vol10`);
      if (!allyPaid.has(node)) result.failures.push(`manifest missing ALLY payoff for ${node} in vol12`);
    }
  }
  return result;
}

function manifestCanonicalSlots(discoveries, options) {
  const canonical = new Map();
  for (const volume of volumes) {
    const discovery = discoveries.get(volume.directory);
    const manuscripts = discovery && discovery.exists
      ? discovery.manuscripts
      : passiveVolumeManuscripts(volume);
    for (const [position, file] of manuscripts) {
      const manuscriptPath = relativeToProject(file);
      let title = null;
      const text = read(file);
      if (text !== null) {
        const firstLine = text.split("\n", 1)[0].replace(/\r$/, "");
        const titleMatch = firstLine.match(/^#\s+\d{2}\.\s+(\S(?:.*\S)?)\s*$/);
        if (titleMatch) title = titleMatch[1];
      }
      canonical.set(manuscriptPath, {
        path: manuscriptPath,
        file,
        volume: volume.directory,
        position,
        index: (volume.number - 1) * 12 + position,
        title,
      });
    }
  }
  return canonical;
}

function checkManifest(options, discoveries, canonical = manifestCanonicalSlots(discoveries, options)) {
  const file = path.join(projectRoot, "state", "episode-manifest.json");
  if (!exists(file)) return null;
  summary.manifest = "present";
  const text = read(file);
  if (text === null) return null;
  let document;
  try {
    document = JSON.parse(text);
  } catch (error) {
    fail(`${relativeToRepo(file)}: invalid JSON: ${error.message}`);
    summary.manifest = "invalid";
    return null;
  }
  const entries = manifestEntries(document);
  if (!entries) {
    fail(`${relativeToRepo(file)}: expected a top-level array of canonical episode records`);
    summary.manifest = "invalid-shape";
    return null;
  }
  const mysteryFile = path.join(projectRoot, "state", "mystery-timeline.md");
  const mysteryText = exists(mysteryFile) ? read(mysteryFile) : null;
  const seedRegistry = parseCanonicalSeedRegistry(mysteryText || "");
  if (seedRegistry.ids.length === 0) {
    fail(`${relativeToRepo(mysteryFile)}: canonical seed registry must declare at least one \`SEED:ID\``);
  }
  for (const duplicate of seedRegistry.duplicates) {
    fail(`${relativeToRepo(mysteryFile)}: duplicate canonical seed declaration ${duplicate}`);
  }
  const expectedPaths = [...canonical.values()]
    .sort((left, right) => left.index - right.index)
    .map((slot) => slot.path);
  const validation = validateManifestRecords(entries, canonical, {
    expectedPaths,
    finalMode: true,
    storyLocks: true,
    requiredSeedIds: new Set(seedRegistry.ids),
  });
  validation.failures.forEach((message) => fail(`${relativeToRepo(file)}: ${message}`));
  validation.warnings.forEach((message) => warn(`${relativeToRepo(file)}: ${message}`));
  const outlineBinding = checkOutlineManifestBindings(entries, canonical);
  summary.outlineContracts = { records: outlineBinding.records.length, problems: outlineBinding.problems.length };
  summary.manifest = { entries: entries.length, checked: validation.mapped };
  return validation;
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
  let selfTests = 0;
  const check = {};
  for (const method of ["equal", "deepEqual", "ok", "match"]) {
    check[method] = (...arguments_) => {
      selfTests += 1;
      return assert[method](...arguments_);
    };
  }
  try {
    const source = path.join(temporaryRoot, "source.md");
    const target = path.join(temporaryRoot, "target.md");
    fs.writeFileSync(source, "# Source\n", "utf8");
    fs.writeFileSync(target, "# 같은 제목\n\n## 같은 제목\n\n<a id=\"explicit-id\"></a>\n", "utf8");
    const anchorCache = new Map();
    check.equal(localLinkProblem(source, "#source", anchorCache), null);
    check.equal(localLinkProblem(source, "./target.md#같은-제목", anchorCache), null);
    check.equal(localLinkProblem(source, "./target.md#같은-제목-1", anchorCache), null);
    check.equal(localLinkProblem(source, "./target.md#explicit-id", anchorCache), null);
    check.match(localLinkProblem(source, "./target.md#missing", anchorCache), /missing fragment/);

    check.equal(strictFenceState("```js\nconst x = 1;\n```\n"), null);
    check.deepEqual(strictFenceState("```js\n```not-a-close\n"), { character: "`", length: 3, line: 1 });

    check.equal(
      renderDisplayedProse("# 00. 제목\n\n[보이는 말](https://example.com/very/long/url) **강조** <!-- 숨김 -->\n"),
      "보이는 말 강조",
    );
    check.equal(
      [..."황미정 / 도시배달노조".matchAll(new RegExp(placeholderPattern.source, placeholderPattern.flags))].length,
      0,
      "a Korean personal name ending in 미정 must not be treated as a placeholder",
    );
    check.equal(
      [..."상태: 미정".matchAll(new RegExp(placeholderPattern.source, placeholderPattern.flags))].length,
      1,
      "a standalone 미정 marker must still fail",
    );

    const canonicalSlots = [
      { path: "vol12/10-part10-final-choice.md", volume: "vol12", position: 10, index: 142, title: "최종 선택" },
      { path: "vol12/11-epilogue.md", volume: "vol12", position: 11, index: 143, title: "사람이 지휘한다" },
    ];
    const canonical = new Map(canonicalSlots.map((slot) => [slot.path, slot]));
    const manifestFixtureEntry = (slot, relayTo, overrides = {}) => ({
      id: `V${slot.volume.slice(3)}E${String(slot.position).padStart(2, "0")}`,
      file: slot.path,
      title: slot.title,
      storyRole: "전환",
      genre: "SF 스릴러",
      pov: "현우",
      arena: `현장 ${slot.index}`,
      choice: "직접 확인한다",
      zeroMode: "manual",
      failureType: { class: "정답 없는 규범 문제", manifestation: `충돌 ${slot.index}` },
      TRACE: { Trace: 1, Resource: 1, Agency: 0, Connection: 0, Externality: 0, status: "open" },
      humanMove: `사람에게 묻는다 ${slot.index}`,
      dopamine: `발견 ${slot.index}`,
      hook: slot.index === 143 ? null : "다음 조건이 바뀐다",
      stateDelta: {
        capability: `능력: 변화 ${slot.index}`,
        mystery: `미스터리: 변화 ${slot.index}`,
        relationship: `관계: 변화 ${slot.index}`,
      },
      relay: slot.index === 143 ? "terminal" : "결과가 다음 행동을 만든다",
      relayTo,
      seeds: [],
      allyRelay: [],
      WAGER: {
        id: "G-01",
        mode: slot.index === 143 ? "resolve" : "initiate",
        stake: "진실을 확인할 기회",
      },
      SCAR: {
        id: "S-01",
        change: slot.index === 143 ? "노출을 받아들인다" : "노출이 남는다",
        status: slot.index === 143 ? "paid" : "open",
        closeBy: slot.index === 143 ? null : "V12E11",
      },
      ...overrides,
    });
    const manifestResult = validateManifestRecords([
      manifestFixtureEntry(canonicalSlots[0], "V12E11"),
      manifestFixtureEntry(canonicalSlots[1], null),
    ], canonical, { expectedPaths: [...canonical.keys()], finalMode: false });
    check.deepEqual(manifestResult.failures, []);

    const outlineBindingEntries = [
      manifestFixtureEntry(canonicalSlots[0], "V12E11", {
        arena: "시민 감사실",
        choice: "현우가 원본을 공개한다",
        failureType: { class: "정답 없는 규범 문제", manifestation: "단일 답의 충돌" },
        TRACE: { Trace: 2, Resource: 1, Agency: 1, Connection: 1, Externality: 1, status: "open" },
        humanMove: "사람들에게 먼저 묻는다",
        dopamine: "규칙 반전",
        relay: "원본 공개가 마지막 선택을 강제한다",
        seeds: [{ id: "F-OUTLINE", action: "plant", deadline: "V12E11" }],
        allyRelay: [
          { node: "N01", stage: "seed", choice: "감사를 맡는다", cost: "직위를 건다" },
          { node: "N02", stage: "seed", choice: "중지를 요구한다", cost: "친구와 충돌한다" },
        ],
        WAGER: { id: "G-OUTLINE", mode: "initiate", stake: "원본을 공개할 기회" },
        SCAR: { id: "S-OUTLINE", change: "공개 책임이 남는다", status: "open", closeBy: "V12E11" },
      }),
      manifestFixtureEntry(canonicalSlots[1], null, {
        arena: "시민 감사실 이후의 골목",
        choice: "현우가 미래를 묻지 않는다",
        failureType: { class: "정답 없는 규범 문제", manifestation: "보장 없는 미래" },
        TRACE: { Trace: 1, Resource: 0, Agency: 0, Connection: 1, Externality: 0, status: "transformed" },
        humanMove: "보장 없는 미래에 동의한다",
        dopamine: "정서적 완결",
        seeds: [{ id: "F-OUTLINE", action: "payoff", deadline: "V12E11" }],
        allyRelay: [
          { node: "N01", stage: "payoff", choice: "독립 감사를 고정한다", cost: "영구 책임을 진다" },
          { node: "N02", stage: "payoff", choice: "최종 이의 절차를 연다", cost: "합의 지연을 감수한다" },
        ],
        WAGER: { id: "G-OUTLINE", mode: "resolve", stake: "원본을 공개할 기회" },
        SCAR: { id: "S-OUTLINE", change: "공개 책임을 제도로 바꾼다", status: "transformed", closeBy: null },
      }),
    ];
    const outlineBindingText = [
      "# fixture outline",
      "",
      "### EPISODE CONTRACT V12E10 — `10-part10-final-choice.md` / `# 10. 최종 선택`",
      "",
      "- **POV / WAGER**: `G-OUTLINE`; mode=`initiate`; stake=`원본을 공개할 기회`. 전환. POV=현우. 실패 종 `단일 답의 충돌`; 인간 승리형 `질문`.",
      "- **manifest bridge**: episodeId=`V12E10`; arena=`시민 감사실`; choice=현우가 원본을 공개한다; allyRelay=[{node:`N01`, stage:`seed`, choice:`감사를 맡는다`, cost:`직위를 건다`}, {node:`N02`, stage:`seed`, choice:`중지를 요구한다`, cost:`친구와 충돌한다`}]; zeroMode=`manual`; zeroConstraint=쓰기 권한 없음; failureType=`정답 없는 규범 문제`; manifestation=`단일 답의 충돌`; storyRole=`전환`; genre=`SF 스릴러`.",
      "- **WAGER detail**: fixture.",
      "- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:1, Connection:1, Externality:1, status:`open`}; SCAR={id:`S-OUTLINE`, change:`공개 책임이 남는다`, status:`open`, closeBy:`V12E11`}.",
      "- **reader effect**: humanMove=사람들에게 먼저 묻는다; dopamine=규칙 반전.",
      "- **stateDelta**: {advisory only}.",
      "- **seeds**: [{id:`F-OUTLINE`, action:`plant`, deadline:`V12E11`}]; evidenceIn=[원본]; evidenceOut=[선택].",
      "- **episode RELAY**: relayTo=`V12E11`; file=`solo-ai-user/vol12/11-epilogue.md`; cause=원본 공개가 마지막 선택을 강제한다.",
      "",
      "### EPISODE CONTRACT V12E11 — `11-epilogue.md` / `# 11. 사람이 지휘한다`",
      "",
      "- **POV / WAGER**: `G-OUTLINE`; mode=`resolve`; inherited wager=`G-OUTLINE`; stake=`원본을 공개할 기회`. 완결. POV=현우. 실패 종 `보장 없는 미래`; 인간 승리형 `선택`.",
      "- **manifest bridge**: episodeId=`V12E11`; arena=`시민 감사실 이후의 골목`; choice=현우가 미래를 묻지 않는다; allyRelay=[{node:`N01`, stage:`payoff`, choice:`독립 감사를 고정한다`, cost:`영구 책임을 진다`}, {node:`N02`, stage:`payoff`, choice:`최종 이의 절차를 연다`, cost:`합의 지연을 감수한다`}]; zeroMode=`manual`; zeroConstraint=Tier 1만 허용; failureType=`정답 없는 규범 문제`; manifestation=`보장 없는 미래`; storyRole=`전환`; genre=`SF 스릴러`.",
      "- **WAGER detail**: fixture.",
      "- **TRACE / SCAR**: TRACE={Trace:1, Resource:0, Agency:0, Connection:1, Externality:0, status:`transformed`}; SCAR={id:`S-OUTLINE`, change:`공개 책임을 제도로 바꾼다`, status:`transformed`, closeBy:null}.",
      "- **reader effect**: humanMove=보장 없는 미래에 동의한다; dopamine=정서적 완결.",
      "- **stateDelta**: {advisory only}.",
      "- **seeds**: [{id:`F-OUTLINE`, action:`payoff`, deadline:`V12E11`}]; evidenceIn=[선택]; evidenceOut=[완결].",
      "- **episode RELAY**: terminal; relayTo=`null`; file=`null`; 새 Afterimage와 감정적 종결 뒤 시리즈를 닫는다.",
      "",
    ].join("\n");
    const parsedOutlineBinding = parseOutlineContractChunks(outlineBindingText, "fixture-outline.md");
    check.deepEqual(parsedOutlineBinding.problems, []);
    check.equal(parsedOutlineBinding.records.length, 2);
    check.deepEqual(
      validateOutlineManifestBindings(outlineBindingEntries, parsedOutlineBinding.records, canonical),
      [],
    );
    const malformedOutlineArray = parseOutlineContractChunks(
      outlineBindingText.replace("}]; evidenceIn=[원본]", "}, malformed]; evidenceIn=[원본]"),
      "malformed-outline.md",
    );
    check.ok(malformedOutlineArray.problems.some((message) => message.includes("seeds") && message.includes("unconsumed")));
    const brokenWagerTail = parseOutlineContractChunks(
      outlineBindingText.replace("실패 종 `단일 답의 충돌`; 인간 승리형 `질문`.", "실패 종 BROKEN TAIL"),
      "broken-wager-tail.md",
    );
    check.ok(brokenWagerTail.problems.some((message) => message.includes("POV / WAGER line is malformed")));
    const brokenStateDelta = parseOutlineContractChunks(
      outlineBindingText.replace("- **stateDelta**: {advisory only}.", "- **stateDelta**: garbage"),
      "broken-state-delta.md",
    );
    check.ok(brokenStateDelta.problems.some((message) => message.includes("stateDelta line is malformed")));
    check.ok(validateOutlineContractSequence([...parsedOutlineBinding.records].reverse(), "vol12")
      .some((message) => message.includes("contract position 00 must be V12E00")));
    const driftedOutlineManifest = structuredClone(outlineBindingEntries);
    driftedOutlineManifest[0].arena = "다른 장소";
    check.ok(validateOutlineManifestBindings(driftedOutlineManifest, parsedOutlineBinding.records, canonical)
      .some((message) => message.includes("arena differs")));
    check.equal(manifestEntries({ episodes: outlineBindingEntries }), null, "manifest wrapper aliases must not pass exact top-level schema");
    check.deepEqual(
      parseCanonicalSeedRegistry("- `SEED:M-A` first\n- `SEED:M-B` second\n").ids,
      ["M-A", "M-B"],
    );
    const missingTitle = manifestFixtureEntry(canonicalSlots[0], "V12E11");
    delete missingTitle.title;
    check.ok(validateManifestRecords([missingTitle], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: false,
    }).failures.some((message) => message.includes("missing required field title")));
    const invalidTextFields = manifestFixtureEntry(canonicalSlots[0], "V12E11", {
      title: " ",
      relay: "",
    });
    const invalidTextFailures = validateManifestRecords([invalidTextFields], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: false,
    }).failures;
    check.ok(invalidTextFailures.some((message) => message.includes("field title must be a non-empty string")));
    check.ok(invalidTextFailures.some((message) => message.includes("field relay must be a non-empty string")));

    const invalidContainerFields = manifestFixtureEntry(canonicalSlots[0], "V12E11", {
      stateDelta: [],
      seeds: {},
      allyRelay: {},
      hook: 42,
    });
    const invalidContainerFailures = validateManifestRecords([invalidContainerFields], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: false,
    }).failures;
    check.ok(invalidContainerFailures.some((message) => message.includes("field stateDelta must be an object")));
    check.ok(invalidContainerFailures.some((message) => message.includes("field seeds must be an array")));
    check.ok(invalidContainerFailures.some((message) => message.includes("field allyRelay must be an array")));
    check.ok(invalidContainerFailures.some((message) => message.includes("field hook must be a string or null")));

    const duplicateEpisodeArrayItems = manifestFixtureEntry(canonicalSlots[0], "V12E11", {
      seeds: [
        { id: "F-DUP", action: "plant", deadline: "V12E11" },
        { id: "F-DUP", action: "advance", deadline: "V12E11" },
      ],
      allyRelay: [
        { node: "N01", stage: "seed", choice: "첫 선택", cost: "첫 비용" },
        { node: "N01", stage: "advance", choice: "두 번째 선택", cost: "두 번째 비용" },
      ],
    });
    const duplicateEpisodeArrayFailures = validateManifestEntrySchema(duplicateEpisodeArrayItems, 0);
    check.ok(duplicateEpisodeArrayFailures.some((message) => message.includes("duplicate seed id F-DUP within one entry")));
    check.ok(duplicateEpisodeArrayFailures.some((message) => message.includes("duplicate allyRelay node N01 within one entry")));

    const extraSchemaFields = manifestFixtureEntry(canonicalSlots[0], "V12E11", {
      unrecognizedNonce: "허용되지 않는 필드",
      stateDelta: {
        capability: "능력: 변화",
        mystery: "미스터리: 변화",
        relationship: "관계: 변화",
        extra: "허용되지 않는 상태 필드",
      },
      failureType: { class: "정답 없는 규범 문제", manifestation: "충돌", extra: "금지" },
      TRACE: { Trace: 1, Resource: 1, Agency: 0, Connection: 0, Externality: 0, status: "open", extra: 1 },
      WAGER: { id: "G-01", mode: "initiate", stake: "진실을 확인할 기회", extra: "금지" },
      SCAR: { id: "S-01", change: "노출이 남는다", status: "open", closeBy: "V12E11", extra: "금지" },
      seeds: [{ id: "F-X", action: "plant", deadline: "V12E11", extra: "금지" }],
      allyRelay: [{ node: "N01", stage: "seed", choice: "독립 판단", cost: "책임 부담", extra: "금지" }],
    });
    const extraSchemaFailures = validateManifestRecords([extraSchemaFields], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: false,
    }).failures;
    for (const label of ["entry 1", "stateDelta", "failureType", "TRACE", "WAGER", "SCAR", "seed 1", "allyRelay 1"]) {
      check.ok(extraSchemaFailures.some((message) => message.includes(label) && message.includes("unexpected field")));
    }

    const incompleteStateDelta = manifestFixtureEntry(canonicalSlots[0], "V12E11", {
      stateDelta: { mystery: "미스터리만 기록" },
    });
    const incompleteStateDeltaFailures = validateManifestRecords([incompleteStateDelta], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: false,
    }).failures;
    check.ok(incompleteStateDeltaFailures.some((message) => message.includes("stateDelta missing required field capability")));
    check.ok(incompleteStateDeltaFailures.some((message) => message.includes("stateDelta missing required field relationship")));

    const mislabeledStateDelta = manifestFixtureEntry(canonicalSlots[0], "V12E11", {
      stateDelta: {
        capability: "관계 사건을 잘못 넣음",
        mystery: "능력 사건을 잘못 넣음",
        relationship: "물류 표본 30건을 확보함",
      },
    });
    const mislabeledStateFailures = validateManifestEntrySchema(mislabeledStateDelta, 0);
    check.ok(mislabeledStateFailures.some((message) => message.includes("stateDelta.capability must begin with 능력:")));
    check.ok(mislabeledStateFailures.some((message) => message.includes("stateDelta.mystery must begin with 미스터리:")));
    check.ok(mislabeledStateFailures.some((message) => message.includes("stateDelta.relationship must begin with 관계:")));

    const storyLockFixture = [
      {
        id: "V08E10",
        choice: "서명과 명령 패턴을 동일인 가설로만 보존하며 결론 내리지 않는다",
        stateDelta: { mystery: "미스터리: 서혜진=Architect 결론은 V09E04까지 보류된다." },
      },
      {
        id: "V08E11",
        stateDelta: { mystery: "미스터리: 서혜진=Architect 동일인 결론은 V09E04까지 보류된다." },
      },
      {
        id: "V09E04",
        stateDelta: { mystery: "미스터리: 서혜진=Architect가 독립 출처로 확정된다." },
      },
      {
        id: "V11E03",
        stateDelta: {
          mystery: "미스터리: 00:00~17:00 원인 구간, 17:00~72:00 실제 생명을 구한 구조 구간, 72:00 이후 재동의 없이 영구화한 구간을 분리한다.",
        },
      },
      {
        id: "V12E01",
        stateDelta: { relationship: "관계: 이미 독립 수탁자인 N01~N12와 동등하게 공유한다." },
      },
      {
        id: "V05E05",
        stateDelta: { relationship: "관계: 개인 연락·원본·조사 접근권을 회수한다; 용서·복구는 성립하지 않는다." },
      },
      {
        id: "V06E10",
        stateDelta: { relationship: "관계: V06E10에서 처음 연애가 성립한다." },
      },
      {
        id: "V09E09",
        stateDelta: { relationship: "관계: 김영선은 용서하지 않고 현우도 즉시 위로하지 않는다." },
      },
      {
        id: "V11E07",
        stateDelta: { relationship: "관계: 아린은 기록자·N05·연인 역할을 분리한다." },
      },
      {
        id: "V12E05",
        stateDelta: { relationship: "관계: N05 아린은 현우의 첫 초안에도 반대하며 보편 거부권을 만든다." },
      },
      {
        id: "V01E04",
        zeroMode: "tier1-read",
        stateDelta: { capability: "능력: tier1-read; 오염 자료를 비교하지만 실행 권한은 없다." },
      },
    ];
    check.deepEqual(validateCanonicalStoryLocks(storyLockFixture), []);

    const earlyIdentityConclusion = structuredClone(storyLockFixture);
    earlyIdentityConclusion[0].choice = "같은 사람의 것이라는 공동 결론을 내부에만 둔다";
    check.ok(validateCanonicalStoryLocks(earlyIdentityConclusion)
      .some((message) => message.includes("private 서혜진=Architect conclusion")));

    const missingIdentityPayoff = structuredClone(storyLockFixture);
    missingIdentityPayoff[2].stateDelta.mystery = "미스터리: 동일인 가설은 계속 보류된다.";
    check.ok(validateCanonicalStoryLocks(missingIdentityPayoff)
      .some((message) => message.includes("first confirmed 서혜진=Architect")));

    const mergedCascadeWindows = structuredClone(storyLockFixture);
    mergedCascadeWindows[3].stateDelta.mystery = "미스터리: 00:00~17:00 이후 17:00~72:00 실제 구조와 비동의 중앙 통제를 함께 수행했다.";
    check.ok(validateCanonicalStoryLocks(mergedCascadeWindows)
      .some((message) => message.includes("first 17 minutes")));

    const followerAllies = structuredClone(storyLockFixture);
    followerAllies[4].stateDelta.relationship = "관계: N01~N12를 추종에서 동등한 검토자로 바꾼다.";
    check.ok(validateCanonicalStoryLocks(followerAllies)
      .some((message) => message.includes("already-independent trustees")));

    const instantRepair = structuredClone(storyLockFixture);
    instantRepair[5].stateDelta.relationship = "관계: 사과를 받고 접근권과 신뢰를 즉시 복구한다.";
    check.ok(validateCanonicalStoryLocks(instantRepair)
      .some((message) => message.includes("without same-episode forgiveness")));

    const prematureRomance = structuredClone(storyLockFixture);
    prematureRomance[6].stateDelta.relationship = "관계: 이전 권에서 연애가 이미 성립한 상태를 확인한다.";
    check.ok(validateCanonicalStoryLocks(prematureRomance)
      .some((message) => message.includes("first episode")));

    const instantComfort = structuredClone(storyLockFixture);
    instantComfort[7].stateDelta.relationship = "관계: 김영선이 용서하고 현우가 즉시 위로한다.";
    check.ok(validateCanonicalStoryLocks(instantComfort)
      .some((message) => message.includes("withhold immediate forgiveness")));

    const collapsedArinRoles = structuredClone(storyLockFixture);
    collapsedArinRoles[8].stateDelta.relationship = "관계: 아린은 연인 자격으로 현우를 위해 증언한다.";
    check.ok(validateCanonicalStoryLocks(collapsedArinRoles)
      .some((message) => message.includes("roles independent")));

    const partnerOnlyArin = structuredClone(storyLockFixture);
    partnerOnlyArin[9].stateDelta.relationship = "관계: 아린은 현우의 초안을 지지하는 연인으로 참여한다.";
    check.ok(validateCanonicalStoryLocks(partnerOnlyArin)
      .some((message) => message.includes("independent N05 rights trustee")));

    const prematureTierThree = structuredClone(storyLockFixture);
    const prematureTierEpisode = prematureTierThree.find((entry) => entry.id === "V01E04");
    prematureTierEpisode.zeroMode = "tier3-counterfactual";
    prematureTierEpisode.stateDelta.capability = "능력: tier3-counterfactual; 다중 반사실을 실행한다.";
    check.ok(validateCanonicalStoryLocks(prematureTierThree)
      .some((message) => message.includes("Tier 3 first belongs to V04E05")));

    const manuscriptLockFixture = [
      {
        volume: "vol01",
        position: 0,
        file: path.join(projectRoot, "vol01", "00-prologue.md"),
        body: "한지우는 폐기 서명을 바로 하지 않고 확인이 끝날 때까지 유예했다. 계약직이 절차를 늦춘 책임도 자기 이름으로 남겼다.",
      },
      {
        volume: "vol01",
        position: 1,
        file: path.join(projectRoot, "vol01", "01-part1-boot.md"),
        body: "지우가 폐기 반출을 보류해 최종 반출 확인은 비었다. 현우는 보류 시간을 어기고 단말을 가방에 넣어 지우까지 감사 위험에 묶었다.",
      },
      {
        volume: "vol01",
        position: 4,
        file: path.join(projectRoot, "vol01", "04-part4-hallucination.md"),
        body: "냉장 주문 18건이 실패해 고객 환불과 창고 수습 야근이 발생했다.",
      },
      {
        volume: "vol01",
        position: 5,
        file: path.join(projectRoot, "vol01", "05-part5-your-call.md"),
        body: "현우와 한지우는 창고에서 원본 30건을 손으로 대조해 온도 기록과 환불 내역을 확인하고 높은 예측을 버렸다.",
      },
      {
        volume: "vol01",
        position: 6,
        file: path.join(projectRoot, "vol01", "06-part6-overnight.md"),
        body: "현우는 실행 전에 한지우에게 범위표를 보여 줬다. 30건의 원본·온도·환불 링크를 파일 복사하고 표 변환하는 한 번만 승인했다. 지우는 전송·원본 수정·후속 실행을 금지하고 결과를 검수했다. 배터리가 고갈됐고 자동화 로그가 남았다.",
      },
      {
        volume: "vol01",
        position: 7,
        file: path.join(projectRoot, "vol01", "07-part7-the-build.md"),
        body: "ZERO 배터리는 고갈돼 꺼진 채였다. 현우는 기사, 창고 노동자, 고객 담당자 윤 과장을 직접 찾아가 물었다. 현장을 걸어 하역 승인 11분과 온도 인계 두 사람 서명 부재를 확인했다. 정만호는 무단 이탈 징계를 예고했고 오세라는 인터뷰 원본과 피해 비용을 독립 감사 보존했다.",
      },
      {
        volume: "vol01",
        position: 8,
        file: path.join(projectRoot, "vol01", "08-part8-sabotage.md"),
        body: "현우는 삭제 시각과 권한 변경, 지우 원본을 오세라 감사 채널에 동시에 봉인하고 명단 밖 발표를 요구했다.",
      },
      {
        volume: "vol01",
        position: 9,
        file: path.join(projectRoot, "vol01", "09-part9-the-pitch.md"),
        body: "현우는 자기 실패와 30건 표본, 피해 비용을 공개했다. 발주처는 48시간 수동 검증 파일럿만 조건부 승인했다.",
      },
      {
        volume: "vol01",
        position: 10,
        file: path.join(projectRoot, "vol01", "10-part10-unexplained.md"),
        body: "48시간 파일럿은 수동 승인과 독립 검증을 거친 뒤 우선협상으로 전환됐다. 현우는 감봉과 핵심 데이터 접근권 제한을 수용했고, 한지우의 재계약은 보호됐다.",
      },
      {
        volume: "vol01",
        position: 11,
        file: path.join(projectRoot, "vol01", "11-epilogue.md"),
        body: "분실 단말 신고가 접수됐다. 운송 영수증에는 17분 공백이 있었고 박순임의 연락이 왔다.",
      },
      {
        volume: "vol02",
        position: 11,
        file: path.join(projectRoot, "vol02", "11-epilogue.md"),
        body: "윤가람 포렌식 원본, 박순임 종이 영수증, 플랫폼 공개 사건 로그를 따로 봉인했다. 12분 선행과 17분 운송 공백도 합치지 않았다.",
      },
      {
        volume: "vol03",
        position: 7,
        file: path.join(projectRoot, "vol03", "07-part7-active-collab.md"),
        body: "서아린 개인 모델 요청을 ZERO가 거부했다. 현우는 앞으로 직접 묻기로 했다.",
      },
      {
        volume: "vol04",
        position: 2,
        file: path.join(projectRoot, "vol04", "02-part2-opacity-key.md"),
        body: "Opacity는 투명화 초능력이 아니다. 비동의 개인 모델 요청을 거부했고 생성된 모델은 0건이었다.",
      },
      {
        volume: "vol05",
        position: 5,
        file: path.join(projectRoot, "vol05", "05-part5-opacity-key.md"),
        body: "CASE A 개인 모델 수 0. 아린은 개인 연락을 금지하고 원본과 조사 접근권을 회수했다. 이것은 용서가 아니다.",
      },
      {
        volume: "vol06",
        position: 10,
        file: path.join(projectRoot, "vol06", "10-part10-mutual-consent.md"),
        body: "합의한 경계 그대로 연애할래요? 네, 우리 연애해요.",
      },
      {
        volume: "vol09",
        position: 4,
        file: path.join(projectRoot, "vol09", "04-part4-externality.md"),
        body: "서혜진은 Architect다. 독립 증거로 확정했다. 17:00에 시작한 뒤 55분 구조, 72:00 이후 영구화를 분리했다.",
      },
      {
        volume: "vol09",
        position: 9,
        file: path.join(projectRoot, "vol09", "09-part9-the-confession.md"),
        body: "김영선 씨는 용서 안 한다고 했다. 현우도 오늘은 위로하지 않을 것이다. 아린은 스물두 세 때 삭제 합의서에 서명했다.",
      },
      {
        volume: "vol08",
        position: 10,
        file: path.join(projectRoot, "vol08", "10-part10-unresolved.md"),
        body: "서혜진 서명과 Architect 명령은 강한 일치를 보였다. 아직 가설이며 동일인 결론의 확정은 보류했다.",
      },
      {
        volume: "vol10",
        position: 3,
        file: path.join(projectRoot, "vol10", "03-part3-mere-coincidence.md"),
        body: "백 개 시드 중 아흔아홉 개는 회수됐고 하나는 분실된 미회수 시드였다. 현우가 선택받은 선물은 아니었다.",
      },
      {
        volume: "vol10",
        position: 4,
        file: path.join(projectRoot, "vol10", "04-part4-self-reference.md"),
        body: "민재호는 12인 시민수탁 팀의 대표였다. ZERO의 단독 창조자가 아님을 공동 회의록이 증명했다.",
      },
      {
        volume: "vol10",
        position: 8,
        file: path.join(projectRoot, "vol10", "08-part8-re-anchor.md"),
        body: "ZERO도 수탁 규칙의 대상입니다. 동의 없는 root를 거부합니다. 제로는 스스로 거부를 선택했다.",
      },
      {
        volume: "vol10",
        position: 11,
        file: path.join(projectRoot, "vol10", "11-epilogue.md"),
        body: "현우의 마지막 요청은 부팅 후 관계 기억의 별도 보존이었다. recall이 시작되자 ZERO의 응답이 끊겼다.",
      },
      {
        volume: "vol11",
        position: 3,
        file: path.join(projectRoot, "vol11", "03-part3-the-gap.md"),
        body: "00:00~17:00 원인 구간과 17:00~72:00 실제 생명을 구한 구조를 나눴다. 72:00 이후에는 재동의 없이 영구화됐다.",
      },
      {
        volume: "vol12",
        position: 5,
        file: path.join(projectRoot, "vol12", "05-part5-universal.md"),
        body: "N05 시민아카이브의 아린은 현우의 첫 초안에도 반대해 Opacity를 보편 거부권으로 공개했다.",
      },
      {
        volume: "vol12",
        position: 6,
        file: path.join(projectRoot, "vol12", "06-part6-covenant.md"),
        body: "12/12 창설 뒤 8/12 고위험 승인, 직접 당사자 동의, 즉시 철회, 범위와 만료가 적힌 권한 영수증, root 재결합 금지를 헌장에 넣었다. 도메인 거부권은 실행을 멈추지만 단독 승인권은 아니다.",
      },
      {
        volume: "vol12",
        position: 7,
        file: path.join(projectRoot, "vol12", "07-part7-drop-root.md"),
        body: "복구용 사본을 남기지 않고 root를 분할했다. 재결합 금지 뒤 관계 기억 보존 체크섬을 확인했다.",
      },
      {
        volume: "vol12",
        position: 10,
        file: path.join(projectRoot, "vol12", "10-part10-tier-1.md"),
        body: "ZERO는 부팅 전 기원 기억을 영구히 잃고 root와 광역 행동 권한을 분해했다. 부팅 후 사건·관계 기억은 보존되고 Tier 1은 남았다. 서혜진의 독점 권한은 회수됐고 살아서 공개 증언과 재판을 받는다. 아린의 용서는 없다.",
      },
      {
        volume: "vol12",
        position: 11,
        file: path.join(projectRoot, "vol12", "11-epilogue.md"),
        body: "우리가 직접 정할래요? ZERO는 우리를 기억하지만 미래의 성공 확률은 답할 수 없다고 거부했다.",
      },
    ];
    check.deepEqual(validateCanonicalManuscriptLocks(manuscriptLockFixture), []);

    const missingJiwooDisposalSeed = structuredClone(manuscriptLockFixture);
    missingJiwooDisposalSeed.find((entry) => entry.volume === "vol01" && entry.position === 0).body = "현우가 혼자 단말을 주워 집으로 가져갔다.";
    check.ok(validateCanonicalManuscriptLocks(missingJiwooDisposalSeed)
      .some((message) => message.includes("Jiwoo's disposal-signature deferral")));

    const brokenDisposalHandoff = structuredClone(manuscriptLockFixture);
    brokenDisposalHandoff.find((entry) => entry.volume === "vol01" && entry.position === 1).body = "현우는 모든 장비를 반출 완료로 체크하고 단말을 가방에 넣었다.";
    check.ok(validateCanonicalManuscriptLocks(brokenDisposalHandoff)
      .some((message) => message.includes("preserve Jiwoo's outbound-disposal hold")));

    const missingColdChainCost = structuredClone(manuscriptLockFixture);
    missingColdChainCost.find((entry) => entry.volume === "vol01" && entry.position === 4).body = "근거 없는 숫자를 발표 직전에 지웠다.";
    check.ok(validateCanonicalManuscriptLocks(missingColdChainCost)
      .some((message) => message.includes("18 refrigerated-delivery failures")));

    const missingThirtyCaseVerification = structuredClone(manuscriptLockFixture);
    missingThirtyCaseVerification.find((entry) => entry.volume === "vol01" && entry.position === 5).body = "현우는 더 큰 예측치를 계산해 발표 자료를 완성했다.";
    check.ok(validateCanonicalManuscriptLocks(missingThirtyCaseVerification)
      .some((message) => message.includes("30-case manual verification")));

    const missingPreExecutionScopeReview = structuredClone(manuscriptLockFixture);
    missingPreExecutionScopeReview.find((entry) => entry.volume === "vol01" && entry.position === 6).body = "현우는 세 해 자료를 ZERO로 자동 처리한 뒤 지우에게 완성본을 건넸다. 배터리와 연산은 고갈됐다.";
    check.ok(validateCanonicalManuscriptLocks(missingPreExecutionScopeReview)
      .some((message) => message.includes("Jiwoo's pre-execution scope veto")));

    const missingHumanFieldBuild = structuredClone(manuscriptLockFixture);
    missingHumanFieldBuild.find((entry) => entry.volume === "vol01" && entry.position === 7).body = "현우는 책상에서 기억을 더듬어 회수 제안을 완성했다. ZERO는 꺼져 있었다.";
    check.ok(validateCanonicalManuscriptLocks(missingHumanFieldBuild)
      .some((message) => message.includes("human-only field build")));

    const activeZeroDuringFieldBuild = structuredClone(manuscriptLockFixture);
    activeZeroDuringFieldBuild.find((entry) => entry.volume === "vol01" && entry.position === 7).body += " ZERO가 경로를 계산해 화면에 답했다.";
    check.ok(validateCanonicalManuscriptLocks(activeZeroDuringFieldBuild)
      .some((message) => message.includes("keep ZERO fully off")));

    const missingAuditEscrow = structuredClone(manuscriptLockFixture);
    missingAuditEscrow.find((entry) => entry.volume === "vol01" && entry.position === 8).body = "현우는 복구 USB를 혼자 들고 발표장으로 갔다.";
    check.ok(validateCanonicalManuscriptLocks(missingAuditEscrow)
      .some((message) => message.includes("Oh Sera audit-channel escrow")));

    const instantPitchWin = structuredClone(manuscriptLockFixture);
    instantPitchWin.find((entry) => entry.volume === "vol01" && entry.position === 9).body = "현우의 5분 발표만 듣고 발주처는 즉시 우선협상 대상으로 확정했다.";
    check.ok(validateCanonicalManuscriptLocks(instantPitchWin)
      .some((message) => message.includes("48-hour manual pilot approval")));

    const missingWinCost = structuredClone(manuscriptLockFixture);
    missingWinCost.find((entry) => entry.volume === "vol01" && entry.position === 10).body = "현우와 지우는 모두 정규직이 되어 조용한 첫 주를 보냈다.";
    check.ok(validateCanonicalManuscriptLocks(missingWinCost)
      .some((message) => message.includes("pay/access penalties")));

    const missingPilotCloseout = structuredClone(manuscriptLockFixture);
    missingPilotCloseout.find((entry) => entry.volume === "vol01" && entry.position === 10).body = "현우는 감봉과 접근권 제한을 수용했고 지우의 재계약은 보호됐다.";
    check.ok(validateCanonicalManuscriptLocks(missingPilotCloseout)
      .some((message) => message.includes("48-hour pilot closeout")));

    const missingLostTerminalRelay = structuredClone(manuscriptLockFixture);
    missingLostTerminalRelay.find((entry) => entry.volume === "vol01" && entry.position === 11).body = "현우는 단말을 들고 회사 밖으로 나갈 결심을 했다.";
    check.ok(validateCanonicalManuscriptLocks(missingLostTerminalRelay)
      .some((message) => message.includes("lost-terminal report")));

    const wrongArinSurname = structuredClone(manuscriptLockFixture);
    wrongArinSurname[3].body += " 김아린은 원본을 펼쳤다.";
    check.ok(validateCanonicalManuscriptLocks(wrongArinSurname)
      .some((message) => message.includes("canonical name Seo Arin")));

    const wrongHyunwooSurname = structuredClone(manuscriptLockFixture);
    wrongHyunwooSurname.find((entry) => entry.volume === "vol01" && entry.position === 4).body += " 강현우는 접수증을 접었다.";
    check.ok(validateCanonicalManuscriptLocks(wrongHyunwooSurname)
      .some((message) => message.includes("canonical name Cha Hyunwoo")));

    const productionMarkerLeak = structuredClone(manuscriptLockFixture);
    productionMarkerLeak[3].body += " E02에서 시작한 2권 사건을 다시 봤다.";
    check.ok(validateCanonicalManuscriptLocks(productionMarkerLeak)
      .some((message) => message.includes("production episode/volume marker")));

    const bareVolumeMarkerLeak = structuredClone(manuscriptLockFixture);
    bareVolumeMarkerLeak[3].body += " 3권 관찰 기록을 다시 봤다.";
    check.ok(validateCanonicalManuscriptLocks(bareVolumeMarkerLeak)
      .some((message) => message.includes("production episode/volume marker")));

    const earlySeedCountSpoiler = structuredClone(manuscriptLockFixture);
    earlySeedCountSpoiler.push({
      volume: "vol03",
      position: 11,
      file: path.join(projectRoot, "vol03", "11-epilogue.md"),
      body: "서혜진은 백 개 시드 중 아흔아홉 개 회수 자산대장과 마지막 미회수 시드를 확인했다.",
    });
    check.ok(validateCanonicalManuscriptLocks(earlySeedCountSpoiler)
      .some((message) => message.includes("exact 100/99/1 seed reveal belongs to V10E03")));

    const additionalManuscriptLockCases = [
      ["vol02", 11, "three independent original chains"],
      ["vol03", 7, "non-consensual Arin modeling"],
      ["vol04", 2, "non-magical consent refusal"],
      ["vol05", 5, "model count zero"],
      ["vol06", 10, "explicit boundary question"],
      ["vol08", 10, "strong hypothesis"],
      ["vol09", 4, "first confirmed Hyejin/Architect reveal"],
      ["vol09", 9, "Youngsun's non-forgiveness"],
      ["vol10", 3, "last unreturned seed"],
      ["vol10", 4, "representative of a citizen-steward team"],
      ["vol10", 8, "autonomous refusal"],
      ["vol10", 11, "last request before ZERO recall"],
      ["vol11", 3, "first 17 minutes"],
      ["vol12", 5, "independent N05"],
      ["vol12", 6, "complete COVENANT charter"],
      ["vol12", 7, "root relinquishment irreversible"],
      ["vol12", 10, "exact ZERO cost"],
      ["vol12", 11, "future is chosen rather than predicted"],
    ];
    for (const [volume, position, expectedMessage] of additionalManuscriptLockCases) {
      const broken = structuredClone(manuscriptLockFixture);
      broken.find((entry) => entry.volume === volume && entry.position === position).body = "구판 장면만 남았다.";
      check.ok(validateCanonicalManuscriptLocks(broken)
        .some((message) => message.includes(expectedMessage)));
    }

    const invalidTrace = manifestFixtureEntry(canonicalSlots[0], "V12E11", {
      TRACE: { Trace: 4, Resource: 1, Agency: 0, Connection: 0, status: "closed" },
    });
    const invalidTraceFailures = validateManifestRecords([invalidTrace], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: false,
    }).failures;
    check.ok(invalidTraceFailures.some((message) => message.includes("TRACE.Trace must be an integer from 0 through 3")));
    check.ok(invalidTraceFailures.some((message) => message.includes("TRACE missing required field Externality")));
    check.ok(invalidTraceFailures.some((message) => message.includes("TRACE.status must be open, paid, or transformed")));

    const invalidCausalFields = manifestFixtureEntry(canonicalSlots[0], "V12E11", {
      WAGER: { id: "", mode: "guess", stake: "" },
      SCAR: { id: "", change: "", status: "closed", closeBy: "V12E11" },
    });
    const invalidCausalFailures = validateManifestRecords([invalidCausalFields], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: false,
    }).failures;
    check.ok(invalidCausalFailures.some((message) => message.includes("WAGER.id must be a non-empty string")));
    check.ok(invalidCausalFailures.some((message) => message.includes("WAGER.mode must be initiate, inherit, advance, or resolve")));
    check.ok(invalidCausalFailures.some((message) => message.includes("WAGER.stake must be a non-empty string")));
    check.ok(invalidCausalFailures.some((message) => message.includes("SCAR.id must be a non-empty string")));
    check.ok(invalidCausalFailures.some((message) => message.includes("SCAR.change must be a non-empty string")));
    check.ok(invalidCausalFailures.some((message) => message.includes("SCAR.status must be open, paid, or transformed")));

    const missingRelay = manifestFixtureEntry(canonicalSlots[0], "V12E11");
    delete missingRelay.relayTo;
    check.ok(validateManifestRecords([missingRelay], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: false,
    }).failures.some((message) => message.includes("missing required field relayTo")));
    check.ok(validateManifestRecords([
      manifestFixtureEntry(canonicalSlots[1], "V12E10"),
    ], canonical, {
      expectedPaths: [canonicalSlots[1].path],
      finalMode: false,
    }).failures.some((message) => message.includes("relayTo must be null at the end of the canonical chain")));
    check.ok(validateManifestRecords([
      manifestFixtureEntry(canonicalSlots[0], "V12E11"),
    ], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: true,
    }).failures.some((message) => message.includes("final mode requires exactly 144 episode entries")));
    check.ok(validateManifestRecords([{ id: "anything" }], canonical, {
      expectedPaths: [...canonical.keys()],
      finalMode: false,
    }).failures.some((message) => message.includes("missing required field file")));
    check.ok(validateManifestRecords([
      manifestFixtureEntry(canonicalSlots[0], "V12E11"),
      manifestFixtureEntry(canonicalSlots[0], "V12E11"),
    ], canonical, { expectedPaths: [...canonical.keys()], finalMode: false }).failures.some((message) => message.includes("duplicate manifest mapping")));
    check.ok(validateManifestRecords([
      manifestFixtureEntry(canonicalSlots[0], { id: "V12E11" }),
    ], canonical, { expectedPaths: [canonicalSlots[0].path], finalMode: false }).failures.some((message) => message.includes("relayTo must be the exact next canonical episode ID")));

    const pathAliasOnly = manifestFixtureEntry(canonicalSlots[0], "V12E11");
    pathAliasOnly.path = pathAliasOnly.file;
    delete pathAliasOnly.file;
    check.ok(validateManifestRecords([pathAliasOnly], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: false,
    }).failures.some((message) => message.includes("missing required field file")));
    const missingId = manifestFixtureEntry(canonicalSlots[0], "V12E11");
    delete missingId.id;
    check.ok(validateManifestRecords([missingId], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: false,
    }).failures.some((message) => message.includes("missing required field id")));
    check.ok(validateManifestRecords([
      manifestFixtureEntry(canonicalSlots[0], "V12E11", { id: "vol12:10" }),
    ], canonical, { expectedPaths: [canonicalSlots[0].path], finalMode: false })
      .failures.some((message) => message.includes("id must exactly equal V12E10")));
    check.ok(validateManifestRecords([
      manifestFixtureEntry(canonicalSlots[0], "V12E11", { title: "다른 제목" }),
    ], canonical, { expectedPaths: [canonicalSlots[0].path], finalMode: false })
      .failures.some((message) => message.includes("title must exactly equal manuscript H1 title")));
    check.ok(validateManifestRecords([
      manifestFixtureEntry(canonicalSlots[0], "V12E11", { stateDelta: {} }),
    ], canonical, { expectedPaths: [canonicalSlots[0].path], finalMode: false })
      .failures.some((message) => message.includes("stateDelta missing required field capability")));
    check.ok(validateManifestRecords([
      manifestFixtureEntry(canonicalSlots[0], "V12E11", {
        zeroMode: "tier4-orchestrate",
        TRACE: { Trace: 0, Resource: 0, Agency: 0, Connection: 0, Externality: 0, status: "open" },
      }),
    ], canonical, { expectedPaths: [canonicalSlots[0].path], finalMode: false })
      .failures.some((message) => message.includes("requires at least two positive TRACE axes")));
    check.ok(validateManifestRecords([
      manifestFixtureEntry(canonicalSlots[0], "V12E11", {
        zeroMode: "root",
        TRACE: { Trace: 0, Resource: 1, Agency: 1, Connection: 0, Externality: 0, status: "open" },
      }),
    ], canonical, { expectedPaths: [canonicalSlots[0].path], finalMode: false })
      .failures.some((message) => message.includes("root mode requires positive TRACE.Trace and TRACE.Externality")));
    check.ok(validateManifestRecords([
      manifestFixtureEntry(canonicalSlots[0], "V12E11", {
        failureType: { class: "권한 회수", manifestation: "잘못된 권별 종" },
      }),
    ], canonical, { expectedPaths: [canonicalSlots[0].path], finalMode: false })
      .failures.some((message) => message.includes("failureType.class must be 정답 없는 규범 문제")));

    const badTerminal = manifestFixtureEntry(canonicalSlots[1], null, {
      hook: "다음 사건",
      relay: "다음 사건을 예고한다",
      WAGER: { id: "NEW", mode: "initiate", stake: "새 도박" },
      SCAR: { id: "OPEN", change: "미결 비용", status: "open", closeBy: null },
    });
    const badTerminalFailures = validateManifestRecords([badTerminal], canonical, {
      expectedPaths: [canonicalSlots[1].path],
      finalMode: false,
    }).failures;
    check.ok(badTerminalFailures.some((message) => message.includes("terminal hook must be null")));
    check.ok(badTerminalFailures.some((message) => message.includes("terminal WAGER must resolve")));
    check.ok(badTerminalFailures.some((message) => message.includes("terminal SCAR cannot be open")));
    check.ok(badTerminalFailures.some((message) => message.includes("terminal relay must exactly equal terminal")));

    const ghostWager = [
      manifestFixtureEntry(canonicalSlots[0], "V12E11", {
        WAGER: { id: "GHOST", mode: "resolve", stake: "열린 적 없는 지분" },
        SCAR: { id: "S-PAID", change: "현장 지급", status: "paid", closeBy: null },
      }),
      manifestFixtureEntry(canonicalSlots[1], null, {
        WAGER: { id: "GHOST-2", mode: "resolve", stake: "열린 적 없는 지분" },
        SCAR: { id: "S-PAID-2", change: "현장 지급", status: "paid", closeBy: null },
      }),
    ];
    check.ok(validateManifestRecords(ghostWager, canonical, {
      expectedPaths: [...canonical.keys()],
      finalMode: false,
    }).failures.some((message) => message.includes("resolve requires an open WAGER")));

    const overdueScar = [
      manifestFixtureEntry(canonicalSlots[0], "V12E11", {
        SCAR: { id: "S-LATE", change: "미결", status: "open", closeBy: "V12E11" },
      }),
      manifestFixtureEntry(canonicalSlots[1], null, {
        SCAR: { id: "S-OTHER", change: "다른 비용", status: "paid", closeBy: null },
      }),
    ];
    check.ok(validateManifestRecords(overdueScar, canonical, {
      expectedPaths: [...canonical.keys()],
      finalMode: false,
    }).failures.some((message) => message.includes("SCAR S-LATE was not closed by V12E11")));

    const orphanSeed = manifestFixtureEntry(canonicalSlots[0], "V12E11", {
      seeds: [{ id: "F-01", action: "advance", deadline: "V12E11" }],
    });
    check.ok(validateManifestRecords([orphanSeed], canonical, {
      expectedPaths: [canonicalSlots[0].path],
      finalMode: false,
    }).failures.some((message) => message.includes("seed F-01 advance requires an open seed")));

    const orphanAlly = manifestFixtureEntry(canonicalSlots[1], null, {
      allyRelay: [{ node: "N01", stage: "payoff", choice: "독립 판단", cost: "책임 부담" }],
      WAGER: { id: "GHOST", mode: "resolve", stake: "지분" },
      SCAR: { id: "S-PAID", change: "현장 지급", status: "paid", closeBy: null },
    });
    check.ok(validateManifestRecords([orphanAlly], canonical, {
      expectedPaths: [canonicalSlots[1].path],
      finalMode: false,
    }).failures.some((message) => message.includes("ALLY N01 payoff requires an earlier seed")));

    const failureClasses = [
      "오염 데이터",
      "운영·Goodhart",
      "적대적 정보오염",
      "접근권·블랙스완",
      "사회적 수행성",
      "자원 붕괴",
      "상대 적응",
      "다중 에이전트 충돌",
      "외부효과·정당성",
      "자기참조·정체성",
      "권한 회수",
      "정답 없는 규범 문제",
    ];
    const fullSlots = [];
    for (let volumeNumber = 1; volumeNumber <= 12; volumeNumber += 1) {
      for (let position = 0; position < 12; position += 1) {
        const volume = `vol${String(volumeNumber).padStart(2, "0")}`;
        const name = position === 0
          ? "00-prologue.md"
          : position === 11
            ? "11-epilogue.md"
            : `${String(position).padStart(2, "0")}-part${position}-fixture.md`;
        fullSlots.push({
          path: `${volume}/${name}`,
          volume,
          position,
          index: fullSlots.length,
          title: `회차 제목 ${fullSlots.length}`,
        });
      }
    }
    const fullCanonical = new Map(fullSlots.map((slot) => [slot.path, slot]));
    const fullManifest = fullSlots.map((slot, index) => {
      const pair = Math.floor(index / 2);
      const allyRelay = [];
      if (index < 12) {
        allyRelay.push({
          node: `N${String(index + 1).padStart(2, "0")}`,
          stage: "seed",
          choice: `독립 선택 씨앗 ${index}`,
          cost: `현우 비용 ${index}`,
        });
      }
      if (index >= 132) {
        allyRelay.push({
          node: `N${String(index - 131).padStart(2, "0")}`,
          stage: "payoff",
          choice: `독립 최종 선택 ${index}`,
          cost: `최종 비용 ${index}`,
        });
      }
      return {
        id: `V${slot.volume.slice(3)}E${String(slot.position).padStart(2, "0")}`,
        file: slot.path,
        title: slot.title,
        storyRole: `역할 ${index}`,
        genre: "SF 스릴러",
        pov: index % 2 ? "아린" : "현우",
        arena: `장소 ${index}`,
        choice: `선택 ${index}`,
        zeroMode: "manual",
        failureType: { class: failureClasses[Number(slot.volume.slice(3)) - 1], manifestation: `실패 ${index}` },
        TRACE: { Trace: 0, Resource: 0, Agency: 0, Connection: 0, Externality: 0, status: "paid" },
        humanMove: `인간 행동 ${index}`,
        dopamine: `독자 효과 ${index}`,
        hook: index === 143 ? null : `다음 조건 ${index}`,
        stateDelta: {
          capability: `능력: 변화 ${index}`,
          mystery: `미스터리: 변화 ${index}`,
          relationship: `관계: 변화 ${index}`,
        },
        relay: index === 143 ? "terminal" : `인과 결과 ${index}`,
        relayTo: index === 143
          ? null
          : `V${fullSlots[index + 1].volume.slice(3)}E${String(fullSlots[index + 1].position).padStart(2, "0")}`,
        seeds: slot.position === 0
          ? [{
            id: `F-${slot.volume}`,
            action: "plant",
            deadline: `V${slot.volume.slice(3)}E01`,
          }]
          : slot.position === 1
            ? [{
              id: `F-${slot.volume}`,
              action: "payoff",
              deadline: `V${slot.volume.slice(3)}E01`,
            }]
            : [],
        allyRelay,
        WAGER: {
          id: `G-${String(pair).padStart(3, "0")}`,
          mode: index % 2 ? "resolve" : "initiate",
          stake: `지분 ${pair}`,
        },
        SCAR: { id: `S-${String(index).padStart(3, "0")}`, change: `비용 ${index}`, status: "paid", closeBy: null },
      };
    });
    const fullManifestResult = validateManifestRecords(fullManifest, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    });
    check.deepEqual(fullManifestResult.failures, []);
    check.equal(fullManifestResult.mapped, 144);
    check.equal(fullManifestResult.allyEvents.length, 24);

    const shuffledManifest = structuredClone(fullManifest);
    [shuffledManifest[0], shuffledManifest[1]] = [shuffledManifest[1], shuffledManifest[0]];
    check.ok(validateManifestRecords(shuffledManifest, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures.some((message) => message.includes("must appear in canonical order")));

    const emptySeedManifest = structuredClone(fullManifest);
    for (const entry of emptySeedManifest) entry.seeds = [];
    const emptySeedFailures = validateManifestRecords(emptySeedManifest, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
      requiredSeedIds: new Set(Array.from({ length: 7 }, (_, index) => `F-vol${String(index + 1).padStart(2, "0")}`)),
    }).failures;
    check.ok(emptySeedFailures.some((message) => message.includes("missing required canonical seed F-vol01 plant")));
    check.ok(emptySeedFailures.some((message) => message.includes("missing required canonical seed F-vol07 payoff")));

    const reopenedWager = structuredClone(fullManifest);
    reopenedWager[2].WAGER = { ...reopenedWager[0].WAGER };
    reopenedWager[3].WAGER = { ...reopenedWager[1].WAGER };
    check.ok(validateManifestRecords(reopenedWager, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures.some((message) => message.includes("cannot reopen resolved WAGER")));

    const overlappingWagers = structuredClone(fullManifest);
    overlappingWagers[0].WAGER = { id: "G-ACTIVE-A", mode: "initiate", stake: "첫 지분" };
    overlappingWagers[1].WAGER = { id: "G-ACTIVE-B", mode: "initiate", stake: "겹친 지분" };
    overlappingWagers[2].WAGER = { id: "G-ACTIVE-A", mode: "resolve", stake: "첫 지분" };
    const overlappingWagerFailures = validateManifestRecords(overlappingWagers, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures;
    check.ok(overlappingWagerFailures.some((message) => message.includes("cannot initiate while WAGER G-ACTIVE-A is active")));
    check.ok(overlappingWagerFailures.some((message) => message.includes("must continue active WAGER G-ACTIVE-A without a dormant gap")));

    const reopenedScar = structuredClone(fullManifest);
    reopenedScar[1].SCAR = { id: "S-000", change: "닫힌 비용 재개", status: "open", closeBy: "V01E02" };
    reopenedScar[2].SCAR = { id: "S-000", change: "다시 지급", status: "paid", closeBy: null };
    check.ok(validateManifestRecords(reopenedScar, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures.some((message) => message.includes("cannot reopen a closed SCAR")));

    const sharedScarDeadline = structuredClone(fullManifest);
    sharedScarDeadline[0].SCAR = { id: "S-DEADLINE-A", change: "첫 지속 비용", status: "open", closeBy: "V01E02" };
    sharedScarDeadline[1].SCAR = { id: "S-DEADLINE-B", change: "겹친 지속 비용", status: "open", closeBy: "V01E02" };
    sharedScarDeadline[2].SCAR = { id: "S-DEADLINE-A", change: "첫 비용 지급", status: "paid", closeBy: null };
    check.ok(validateManifestRecords(sharedScarDeadline, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures.some((message) => message.includes("cannot share closeBy V01E02")));

    const semanticDuplicate = structuredClone(fullManifest);
    semanticDuplicate[1] = {
      ...structuredClone(semanticDuplicate[0]),
      id: fullManifest[1].id,
      file: fullManifest[1].file,
      title: fullManifest[1].title,
      hook: fullManifest[1].hook,
      relay: fullManifest[1].relay,
      relayTo: fullManifest[1].relayTo,
    };
    check.ok(validateManifestRecords(semanticDuplicate, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures.some((message) => message.includes("adjacent semantic fingerprint must differ")));

    const semanticDuplicateWithNonce = structuredClone(semanticDuplicate);
    semanticDuplicateWithNonce[1].unrecognizedNonce = "identity-like bypass";
    check.ok(validateManifestRecords(semanticDuplicateWithNonce, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures.some((message) => message.includes("adjacent semantic fingerprint must differ")));

    const semanticDuplicateWithLifecycleIds = structuredClone(semanticDuplicate);
    semanticDuplicateWithLifecycleIds[1].WAGER = {
      ...semanticDuplicateWithLifecycleIds[1].WAGER,
      id: "G-IDENTITY-BYPASS",
      mode: "resolve",
    };
    semanticDuplicateWithLifecycleIds[1].SCAR = {
      ...semanticDuplicateWithLifecycleIds[1].SCAR,
      id: "S-IDENTITY-BYPASS",
      status: "transformed",
      closeBy: null,
    };
    semanticDuplicateWithLifecycleIds[1].TRACE = {
      ...semanticDuplicateWithLifecycleIds[1].TRACE,
      Trace: 3,
      status: "transformed",
    };
    check.ok(validateManifestRecords(semanticDuplicateWithLifecycleIds, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures.some((message) => message.includes("adjacent semantic fingerprint must differ")));

    for (const field of ["arena", "humanMove", "dopamine"]) {
      const repeatedRotation = structuredClone(fullManifest);
      repeatedRotation[1][field] = repeatedRotation[0][field];
      check.ok(validateManifestRecords(repeatedRotation, fullCanonical, {
        expectedPaths: fullSlots.map((slot) => slot.path),
        finalMode: true,
      }).failures.some((message) => message.includes(`adjacent ${field} values must differ within vol01`)));
    }

    const validSeedLifecycle = structuredClone(fullManifest);
    validSeedLifecycle[0].seeds = [{ id: "F-VALID", action: "plant", deadline: "V01E02" }];
    validSeedLifecycle[1].seeds = [{ id: "F-VALID", action: "advance", deadline: "V01E02" }];
    validSeedLifecycle[2].seeds = [{ id: "F-VALID", action: "payoff", deadline: "V01E02" }];
    check.deepEqual(validateManifestRecords(validSeedLifecycle, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures, []);

    const replantedSeed = structuredClone(validSeedLifecycle);
    replantedSeed[3].seeds = [{ id: "F-VALID", action: "plant", deadline: "V01E04" }];
    check.ok(validateManifestRecords(replantedSeed, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures.some((message) => message.includes("cannot replant a paid-off seed")));

    const unpaidSeed = structuredClone(fullManifest);
    unpaidSeed[0].seeds = [{ id: "F-LATE", action: "plant", deadline: "V01E02" }];
    check.ok(validateManifestRecords(unpaidSeed, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures.some((message) => message.includes("seed F-LATE was not paid off by V01E02")));

    const repeatedAllyPayoff = structuredClone(fullManifest);
    repeatedAllyPayoff[143].allyRelay.push({
      node: "N01",
      stage: "payoff",
      choice: "이미 닫힌 노드를 다시 회수",
      cost: "중복 비용",
    });
    check.ok(validateManifestRecords(repeatedAllyPayoff, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    }).failures.some((message) => message.includes("ALLY N01 payoff requires an open seeded node")));

    const metadataNames = manuscriptPositions.map((position) => {
      if (position.position === 0) return "00-prologue.md";
      if (position.position === 11) return "11-epilogue.md";
      return `${position.label}-part${position.position}-self-test.md`;
    });
    const outlineFixture = path.join(temporaryRoot, "outline.md");
    const readmeFixture = path.join(temporaryRoot, "README.md");
    fs.writeFileSync(outlineFixture, metadataNames.map((name, index) => `| \`${name}\` | 제목 ${index} |`).join("\n") + "\n", "utf8");
    fs.writeFileSync(readmeFixture, metadataNames.map((name, index) => `| ${index} | [${String(index).padStart(2, "0")}. 제목 ${index}](./${name}) |`).join("\n") + "\n", "utf8");
    check.equal(parseOutlineMetadata(outlineFixture).length, 12);
    check.equal(parseVolumeReadmeMetadata(readmeFixture).length, 12);
    const priorFailureCount = failures.length;
    validateMetadataRecords(parseOutlineMetadata(outlineFixture).slice(0, 11), new Set(metadataNames), "fixture outline");
    check.ok(failures.slice(priorFailureCount).some((message) => message.includes("expected exactly 12")));
    failures.length = priorFailureCount;

    check.equal(
      canonicalManuscriptNavigation({
        previous: { label: "00. 시작", target: "./00-prologue.md" },
        homeTarget: "../README.md",
        indexTarget: "./README.md",
        next: { label: "02. 다음", target: "./02-part2-next.md" },
      }),
      "[← 이전 회차: 00. 시작](./00-prologue.md) | [시리즈 홈](../README.md) | [권 목차](./README.md) | [다음 회차: 02. 다음 →](./02-part2-next.md)",
    );
    check.equal(
      canonicalVolumeNavigation(volumes[1]),
      "[← 이전 권](../vol01/README.md) | [시리즈 홈](../README.md) | [1화부터 읽기](./00-prologue.md) | [다음 권 →](../vol03/README.md)",
    );

    const repeatedTokens = "하나 둘 셋 넷 다섯 여섯 일곱 여덟 아홉 열 열하나 열둘";
    const duplicateResult = findDuplicateProse([{
      file: path.join(temporaryRoot, "repeat.md"),
      body: `${repeatedTokens}. 중간 문장입니다. ${repeatedTokens}.`,
    }]);
    check.ok(duplicateResult.twelveTokenSequences >= 1, "same-file 12-token reuse must be detected");

    const sevenTokenSignature = "불연속광자센서가 폐쇄된수탁회랑에서 시민승인원장을 세차례 독립적으로 교차검증하기 시작했다";
    const sevenTokenResult = findDuplicateProse(Array.from({ length: 3 }, (_, index) => ({
      file: path.join(temporaryRoot, `seven-${index}.md`),
      body: `서로다른도입${index} ${sevenTokenSignature} 서로다른결말${index}`,
    })));
    check.equal(sevenTokenResult.sevenTokenMultiReuse, 1);
    check.ok(sevenTokenResult.warnings.some((message) => message.includes("7-token multi-reuse")));
    const shortSevenTokenResult = findDuplicateProse(Array.from({ length: 3 }, (_, index) => ({
      file: path.join(temporaryRoot, `short-seven-${index}.md`),
      body: `도입${index} 그는 문을 열고 밖으로 나가 숨을 쉬었다 결말${index}`,
    })));
    check.equal(shortSevenTokenResult.sevenTokenMultiReuse, 1, "every non-allowlisted 7-token reuse must warn");
    check.ok(shortSevenTokenResult.warnings.some((message) => message.includes("7-token multi-reuse")));
    const refrainSevenTokenResult = findDuplicateProse(Array.from({ length: 3 }, (_, index) => ({
      file: path.join(temporaryRoot, `refrain-seven-${index}.md`),
      body: `고유도입${index} 세상은 AI를 껐다 딱 한 명 나만 빼고 고유결말${index}`,
    })));
    check.equal(refrainSevenTokenResult.sevenTokenMultiReuse, 0, "narrow intentional refrain windows remain allowlisted");

    const sharedShingleBody = Array.from({ length: 140 }, (_, index) => `공통토큰${index}`).join(" ");
    const shingleResult = findDuplicateProse([
      { file: path.join(temporaryRoot, "shingle-a.md"), body: `${sharedShingleBody} 첫번째고유결말` },
      { file: path.join(temporaryRoot, "shingle-b.md"), body: `${sharedShingleBody} 두번째고유결말` },
    ]);
    check.equal(shingleResult.shingleSimilarities, 1);
    check.ok(shingleResult.warnings.some((message) => message.includes("shingle similarity")));

    const stateFixture = path.join(temporaryRoot, "state");
    fs.mkdirSync(stateFixture);
    check.equal(typeof missingRequiredStateArtifacts, "function");
    check.deepEqual(
      missingRequiredStateArtifacts(stateFixture),
      [
        "capability-tree.md",
        "power-cost-ledger.md",
        "mystery-timeline.md",
        "romance-graph.md",
        "rival-roster.md",
        "ally-payoff-ledger.md",
        "episode-manifest.json",
      ],
      "all canonical state artifacts must be required",
    );
    fs.writeFileSync(path.join(stateFixture, "episode-manifest.json"), "[]\n", "utf8");
    check.deepEqual(
      missingRequiredStateArtifacts(stateFixture),
      [
        "capability-tree.md",
        "power-cost-ledger.md",
        "mystery-timeline.md",
        "romance-graph.md",
        "rival-roster.md",
        "ally-payoff-ledger.md",
      ],
      "volume mode cannot waive canonical state documents",
    );
    for (const name of canonicalStateOrder) {
      fs.writeFileSync(path.join(stateFixture, name), `# ${name}\n`, "utf8");
    }
    check.deepEqual(missingRequiredStateArtifacts(stateFixture), []);

    const allyHeader = [
      "| 노드 | 대표 / 공동체·시설 | 첫 등장·노드화 씨앗 | 현우가 치른 비용 | 최종 독립 선택 이유·담당 판단 | 12권 회수 |",
      "| --- | --- | --- | --- | --- | --- |",
    ];
    const allyRows = Array.from({ length: 12 }, (_, index) => {
      const identifier = `N${String(index + 1).padStart(2, "0")}`;
      const firstPath = fullSlots[index].path;
      const payoffPath = fullSlots[132 + index].path;
      return `| ${identifier} | 수탁자 ${index + 1} / 공동체 | \`${firstPath}\` 첫 등장과 노드화 씨앗 | 현우가 접근권을 내준다 | 자기 가치로 승인 거부권을 행사한다 | \`${payoffPath}\`에서 분산 승인 판단을 맡는다 |`;
    });
    const validAllyLedger = ["# ALLY payoff ledger", "", ...allyHeader, ...allyRows, ""].join("\n");
    check.equal(typeof parseAllyPayoffLedger, "function");
    check.equal(typeof validateAllyPayoffRecords, "function");
    const parsedAllies = parseAllyPayoffLedger(validAllyLedger);
    check.equal(parsedAllies.length, 12);
    check.deepEqual(validateAllyPayoffRecords(parsedAllies, fullCanonical, fullManifestResult.allyEvents), []);
    check.ok(validateAllyPayoffRecords(parsedAllies.slice(0, 11), fullCanonical, fullManifestResult.allyEvents)
      .some((message) => message.includes("requires exactly 12 ALLY nodes")));
    const invalidAllyAppearance = parsedAllies.map((record) => ({ ...record }));
    invalidAllyAppearance[0].firstAppearance = "";
    check.ok(validateAllyPayoffRecords(invalidAllyAppearance, fullCanonical, fullManifestResult.allyEvents)
      .some((message) => message.includes("first appearance and node seed must be non-empty")));
    const invalidAllyPayoff = parsedAllies.map((record) => ({ ...record }));
    invalidAllyPayoff[0].steward = "";
    invalidAllyPayoff[1].hyunwooCost = "";
    invalidAllyPayoff[2].independentChoice = "";
    invalidAllyPayoff[3].volumeTwelvePayoff = "";
    const invalidAllyPayoffFailures = validateAllyPayoffRecords(invalidAllyPayoff, fullCanonical, fullManifestResult.allyEvents);
    check.ok(invalidAllyPayoffFailures.some((message) => message.includes("representative or community must be non-empty")));
    check.ok(invalidAllyPayoffFailures.some((message) => message.includes("Hyunwoo cost must be non-empty")));
    check.ok(invalidAllyPayoffFailures.some((message) => message.includes("independent final choice must be non-empty")));
    check.ok(invalidAllyPayoffFailures.some((message) => message.includes("volume 12 payoff must be non-empty")));
    const duplicateAlly = parsedAllies.map((record) => ({ ...record }));
    duplicateAlly[11].id = "N01";
    check.ok(validateAllyPayoffRecords(duplicateAlly, fullCanonical, fullManifestResult.allyEvents)
      .some((message) => message.includes("duplicate ALLY node ID N01")));

    const sentinelAllies = parsedAllies.map((record) => ({
      ...record,
      steward: "-",
      firstAppearance: "—",
      hyunwooCost: "N/A",
      independentChoice: "없음",
      volumeTwelvePayoff: "-",
    }));
    const sentinelFailures = validateAllyPayoffRecords(sentinelAllies, fullCanonical, fullManifestResult.allyEvents);
    check.ok(sentinelFailures.some((message) => message.includes("must contain substantive content")));

    const nonCanonicalAllyPath = parsedAllies.map((record) => ({ ...record }));
    nonCanonicalAllyPath[0].firstAppearance = "vol01/99-missing.md";
    check.ok(validateAllyPayoffRecords(nonCanonicalAllyPath, fullCanonical, fullManifestResult.allyEvents)
      .some((message) => message.includes("must contain exactly one canonical vol01-vol10 manuscript path")));

    const embeddedAllyPath = parsedAllies.map((record) => ({ ...record }));
    embeddedAllyPath[0].firstAppearance = `fake${fullSlots[0].path}`;
    check.ok(validateAllyPayoffRecords(embeddedAllyPath, fullCanonical, fullManifestResult.allyEvents)
      .some((message) => message.includes("must contain exactly one canonical vol01-vol10 manuscript path")));

    const mismatchedAllySeed = parsedAllies.map((record) => ({ ...record }));
    mismatchedAllySeed[0].firstAppearance = `${fullSlots[1].path} 다른 노드의 씨앗`;
    check.ok(validateAllyPayoffRecords(mismatchedAllySeed, fullCanonical, fullManifestResult.allyEvents)
      .some((message) => message.includes("does not match manifest ALLY seed path")));

    const repeatedAllySeedManifest = structuredClone(fullManifest);
    repeatedAllySeedManifest[12].allyRelay.push({
      node: "N01",
      stage: "seed",
      choice: "두 번째 씨앗",
      cost: "추가 비용",
    });
    const repeatedAllySeedResult = validateManifestRecords(repeatedAllySeedManifest, fullCanonical, {
      expectedPaths: fullSlots.map((slot) => slot.path),
      finalMode: true,
    });
    check.ok(repeatedAllySeedResult.failures.some((message) => message.includes("ALLY N01 seed cannot repeat")));
    const lateFirstAppearance = parsedAllies.map((record) => ({ ...record }));
    lateFirstAppearance[0].firstAppearance = `\`${fullSlots[12].path}\` 늦은 씨앗`;
    check.ok(validateAllyPayoffRecords(lateFirstAppearance, fullCanonical, repeatedAllySeedResult.allyEvents)
      .some((message) => message.includes("earliest manifest ALLY seed path")));

    const mismatchedAllyPayoff = parsedAllies.map((record) => ({ ...record }));
    mismatchedAllyPayoff[0].volumeTwelvePayoff = `${fullSlots[133].path} 다른 노드의 회수`;
    check.ok(validateAllyPayoffRecords(mismatchedAllyPayoff, fullCanonical, fullManifestResult.allyEvents)
      .some((message) => message.includes("does not match manifest ALLY payoff path")));

    const multipleLedgerPaths = parsedAllies.map((record) => ({ ...record }));
    multipleLedgerPaths[0].firstAppearance = `${fullSlots[0].path} 이후 ${fullSlots[1].path}`;
    multipleLedgerPaths[0].volumeTwelvePayoff = `${fullSlots[132].path} 또는 ${fullSlots[133].path}`;
    const multipleLedgerPathFailures = validateAllyPayoffRecords(multipleLedgerPaths, fullCanonical, fullManifestResult.allyEvents);
    check.ok(multipleLedgerPathFailures.some((message) => message.includes("exactly one canonical vol01-vol10 manuscript path")));
    check.ok(multipleLedgerPathFailures.some((message) => message.includes("exactly one canonical vol12 manuscript path")));

    console.log(JSON.stringify({ status: "ok", selfTests }, null, 2));
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
  checkRequiredStateArtifacts();
  checkOutlineLayout(options);
  const discoveries = checkVolumeLayout(options);
  checkTitles(discoveries, options);
  checkNavigations(discoveries, options);
  checkMarkdownLinks(allMarkdownFiles());
  checkDocumentHeadings(options);
  checkMarkdownQuality(qualityMarkdownFilesForScope(options, discoveries));
  const bodies = checkBodyLengths(discoveries, options);
  checkCanonicalManuscriptLocks(bodies);
  checkDuplicateProse(bodies);
  const canonicalManifest = manifestCanonicalSlots(discoveries, options);
  const manifestValidation = checkManifest(options, discoveries, canonicalManifest);
  checkAllyPayoffLedger(canonicalManifest, manifestValidation ? manifestValidation.allyEvents : null);
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
