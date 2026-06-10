#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(projectRoot, "..");
const failures = [];

const chapters = [
  { file: "00-prologue.md", label: "프롤로그", tocLabel: "프롤로그: 리더보드가 열리는 밤" },
  { file: "01-part1-arena-gate.md", label: "1화: 아레나 게이트" },
  { file: "02-part2-cost-neigong.md", label: "2화: 비용 내공" },
  { file: "03-part3-family-audit.md", label: "3화: 가문 감사" },
  { file: "04-part4-context-river.md", label: "4화: 문맥당의 장강" },
  { file: "05-part5-deploy-cliff.md", label: "5화: 배포 절벽" },
  { file: "06-part6-vibe-market.md", label: "6화: 홍련객잔의 심상시장" },
  { file: "07-part7-permission-auction.md", label: "7화: 단자총림의 권한경매" },
  { file: "08-part8-evidence-tribunal.md", label: "8화: 증거법정의 환각심문" },
  { file: "09-part9-latency-bell.md", label: "9화: 추론종루의 질주" },
  { file: "10-part10-evaluation-garden.md", label: "10화: 평가장원의 과적합 연회" },
  { file: "11-epilogue.md", label: "에필로그: 적팀사의 붉은 산문" },
];

function rel(file) {
  return path.relative(repoRoot, file).replaceAll(path.sep, "/");
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function fail(message) {
  failures.push(message);
}

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, results);
    } else if (entry.isFile()) {
      results.push(full);
    }
  }

  return results;
}

function markdownFiles() {
  return walk(projectRoot)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

function lastNonEmptyLine(lines) {
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    if (lines[index].trim() !== "") {
      return { index, line: lines[index] };
    }
  }

  return null;
}

function previousNonEmptyLine(lines, beforeIndex) {
  for (let index = beforeIndex - 1; index >= 0; index -= 1) {
    if (lines[index].trim() !== "") {
      return { index, line: lines[index] };
    }
  }

  return null;
}

function expectedChapterNavigation(index) {
  const links = [];

  if (index > 0) {
    const previous = chapters[index - 1];
    links.push(`[← 이전: ${previous.label}](./${previous.file})`);
  }

  links.push("[시리즈홈](./README.md)");
  links.push("[목차](./README.md#목차)");

  if (index < chapters.length - 1) {
    const next = chapters[index + 1];
    links.push(`[다음: ${next.label} →](./${next.file})`);
  }

  return links.join(" | ");
}

function expectedNavigationFor(file) {
  const relative = path.relative(projectRoot, file).replaceAll(path.sep, "/");
  const chapterIndex = chapters.findIndex((chapter) => chapter.file === relative);

  if (chapterIndex >= 0) {
    return expectedChapterNavigation(chapterIndex);
  }

  if (relative === "README.md") {
    return "[처음 읽기 →](./00-prologue.md)";
  }

  if (relative === "LAYOUT.md") {
    return "[시리즈홈](./README.md) | [목차](./README.md#목차) | [처음 읽기 →](./00-prologue.md)";
  }

  if (relative === "dist/README.md") {
    return "[작품 홈](../README.md) | [처음 읽기 →](../00-prologue.md) | [통합 zip 내려받기](./agent-murim.zip)";
  }

  return null;
}

function checkNavigation(file) {
  const expected = expectedNavigationFor(file);

  if (!expected) {
    fail(`${rel(file)}: no expected navigation rule`);
    return;
  }

  const lines = read(file).split(/\r?\n/);
  const last = lastNonEmptyLine(lines);

  if (lines[0] !== expected) {
    fail(`${rel(file)}: top navigation mismatch`);
  }

  if (!last || last.line !== expected) {
    fail(`${rel(file)}: bottom navigation mismatch`);
  }

  if (lines[1] !== "" || lines[2] !== "---") {
    fail(`${rel(file)}: expected blank line and horizontal rule after top navigation`);
  }

  const beforeBottomNavigation = last ? previousNonEmptyLine(lines, last.index) : null;

  if (!beforeBottomNavigation || beforeBottomNavigation.line !== "---") {
    fail(`${rel(file)}: expected horizontal rule before bottom navigation`);
  }
}

function checkChapterEndBlocks() {
  for (const chapter of chapters) {
    const file = path.join(projectRoot, chapter.file);

    if (!fs.existsSync(file)) {
      fail(`${rel(file)}: missing chapter file`);
      continue;
    }

    if (!/> \*\*.+ 종료\*\*/.test(read(file))) {
      fail(`${rel(file)}: missing chapter ending block`);
    }
  }
}

function checkCodeFences(file) {
  const fenceCount = read(file)
    .split(/\r?\n/)
    .filter((line) => line.startsWith("```"))
    .length;

  if (fenceCount % 2 !== 0) {
    fail(`${rel(file)}: unbalanced fenced code block`);
  }
}

function stripFencedBlocks(markdown) {
  const output = [];
  let inFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }

    if (!inFence) {
      output.push(line);
    }
  }

  return output.join("\n");
}

function checkLocalLinks(file) {
  const text = stripFencedBlocks(read(file));
  const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;

  while ((match = linkPattern.exec(text)) !== null) {
    const target = match[1];

    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("#")) {
      continue;
    }

    const [targetPath] = target.split("#");

    if (targetPath === "") {
      continue;
    }

    const resolved = path.resolve(path.dirname(file), targetPath);

    if (!fs.existsSync(resolved)) {
      fail(`${rel(file)}: broken local link ${target}`);
    }
  }
}

function checkReadmeToc() {
  const readmePath = path.join(projectRoot, "README.md");
  const readme = read(readmePath);

  for (const [index, chapter] of chapters.entries()) {
    const order = String(index).padStart(2, "0");
    const expected = `| ${order} | [${chapter.tocLabel || chapter.label}](./${chapter.file}) | 공개 |`;

    if (!readme.includes(expected)) {
      fail(`${rel(readmePath)}: missing TOC row for ${chapter.file}`);
    }
  }
}

function checkDistributionZip() {
  const zip = path.join(projectRoot, "dist", "agent-murim.zip");

  if (!fs.existsSync(zip)) {
    fail(`${rel(zip)}: missing distribution zip`);
    return;
  }

  const expectedEntries = [
    "README.md",
    ...chapters.map((chapter) => chapter.file),
  ];
  const manifest = spawnSync("unzip", ["-Z1", zip], { encoding: "utf8" });

  if (manifest.error) {
    fail(`unzip: ${manifest.error.message}`);
    return;
  }

  if (manifest.status !== 0) {
    fail(`unzip -Z1 ${rel(zip)} failed: ${manifest.stderr.trim()}`);
    return;
  }

  const actualEntries = manifest.stdout.trim().split(/\r?\n/).filter(Boolean);

  if (actualEntries.join("\n") !== expectedEntries.join("\n")) {
    fail(`${rel(zip)}: zip manifest mismatch`);
  }

  const test = spawnSync("unzip", ["-tqq", zip], { encoding: "utf8" });

  if (test.error) {
    fail(`unzip: ${test.error.message}`);
  } else if (test.status !== 0) {
    fail(`unzip -tqq ${rel(zip)} failed: ${test.stderr.trim()}`);
  }
}

function checkExpectedFiles() {
  const expectedFiles = [
    "README.md",
    "LAYOUT.md",
    "dist/README.md",
    ...chapters.map((chapter) => chapter.file),
  ].sort();
  const actualFiles = markdownFiles()
    .map((file) => path.relative(projectRoot, file).replaceAll(path.sep, "/"))
    .sort();

  if (actualFiles.join("\n") !== expectedFiles.join("\n")) {
    fail(`agent-murim markdown file list mismatch: expected ${expectedFiles.join(", ")}, got ${actualFiles.join(", ")}`);
  }
}

checkExpectedFiles();

for (const file of markdownFiles()) {
  checkNavigation(file);
  checkCodeFences(file);
  checkLocalLinks(file);
}

checkChapterEndBlocks();
checkReadmeToc();
checkDistributionZip();

if (failures.length > 0) {
  console.error("agent-murim layout verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("agent-murim layout verification passed.");
