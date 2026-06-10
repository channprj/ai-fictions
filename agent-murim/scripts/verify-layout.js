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

function expectedChapterTitleBlock(chapter) {
  const title = chapter.tocLabel || chapter.label;
  const separator = title.indexOf(": ");

  if (separator === -1) {
    return { heading: title, subtitle: null };
  }

  return {
    heading: title.slice(0, separator),
    subtitle: title.slice(separator + 2),
  };
}

function checkChapterTitleBlocks() {
  for (const chapter of chapters) {
    const file = path.join(projectRoot, chapter.file);

    if (!fs.existsSync(file)) {
      continue;
    }

    const { heading, subtitle } = expectedChapterTitleBlock(chapter);

    if (!subtitle) {
      fail(`${rel(file)}: missing expected chapter subtitle metadata`);
      continue;
    }

    const lines = read(file).split(/\r?\n/);
    const expectedBlock = ["", `# ${heading}`, "", `## ${subtitle}`, "", "---"].join("\n");
    const actualBlock = lines.slice(3, 9).join("\n");

    if (actualBlock !== expectedBlock) {
      fail(`${rel(file)}: chapter title block should be "# ${heading}" then "## ${subtitle}"`);
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

function checkSeriesReadmeMetadata() {
  const readmePath = path.join(projectRoot, "README.md");

  if (!fs.existsSync(readmePath)) {
    fail(`${rel(readmePath)}: missing series README`);
    return;
  }

  const readme = read(readmePath);
  const expectedLines = [
    "# 에이전트 무림",
    "## AI 중원의 리더보드는 피로 갱신된다",
    "- **장르**: 현대 무협 / AI 에이전트 / 테크노 로맨스",
    "- **상태**: 완결",
    "- **구성**: 프롤로그 + 본편 10화 + 에필로그",
    "- **핵심 키워드**: LLM Arena, 코딩 에이전트 가문, MCP 단자, 스킬 비급, 비용 내공, vibe 심상, 오케스트레이터, 권한경매, 증거법정, 추론종루, 평가장원, 적팀사",
    "- **배포본**: [dist/](./dist/README.md) — 전편 통합 zip 1개와 SHA-256 매니페스트",
    "AI 코딩 에이전트들이 가문을 이루어 AI 중원, 즉 LLM Arena의 모든 리더보드를 차지하기 위해 성능과 비용, 지연시간과 vibe까지 걸고 싸우는 현대 무협.",
    "이 작품의 마크다운 구조와 페이지네이션 규칙은 [LAYOUT.md](./LAYOUT.md)에서 관리한다.",
    "수정 후에는 repo root에서 `node agent-murim/scripts/verify-layout.js`를 실행해 목차, 페이지네이션, 배포 zip manifest, 원본 일치, 체크섬을 함께 검증한다.",
  ];

  for (const expected of expectedLines) {
    if (!readme.includes(expected)) {
      fail(`${rel(readmePath)}: missing or stale series metadata line: ${expected}`);
    }
  }
}

function checkDistributionReadmeMetadata() {
  const distReadmePath = path.join(projectRoot, "dist", "README.md");

  if (!fs.existsSync(distReadmePath)) {
    fail(`${rel(distReadmePath)}: missing distribution README`);
    return;
  }

  const readme = read(distReadmePath);
  const expectedLines = [
    "# 에이전트 무림 배포본",
    "프롤로그 + 10화 + 에필로그 완결 원고를 **전편 통합 압축 파일** 하나로 묶은 배포용 디렉터리다.",
    "| [agent-murim.zip](./agent-murim.zip) | `README.md`, `00-prologue.md`~`11-epilogue.md` (프롤로그 + 10화 + 에필로그) | [SHA256SUMS](./SHA256SUMS) |",
    "- `dist/`에는 이 `README.md`, `SHA256SUMS`, 전편 통합 zip 1개만 둔다.",
    "- zip은 작품 `README.md` 1개와 12개 원고(프롤로그·10화·에필로그)를 포함한다.",
    "- zip 내부 원고는 현재 원본 파일과 동일하며, 편집용 규칙 문서인 `LAYOUT.md`는 포함하지 않는다.",
    "- `SHA256SUMS`는 `agent-murim.zip`에 대한 행 1개만 포함하고 마지막 개행으로 끝난다.",
    "unzip agent-murim.zip",
    "cd agent-murim/dist",
    "shasum -a 256 -c SHA256SUMS",
    "> 줄거리·등장인물·세계관은 상위 [작품 홈](../README.md)을 참고한다.",
  ];

  for (const expected of expectedLines) {
    if (!readme.includes(expected)) {
      fail(`${rel(distReadmePath)}: missing or stale distribution metadata line: ${expected}`);
    }
  }
}

function checkLayoutDocumentation() {
  const layoutPath = path.join(projectRoot, "LAYOUT.md");

  if (!fs.existsSync(layoutPath)) {
    fail(`${rel(layoutPath)}: missing layout guide`);
    return;
  }

  const layout = read(layoutPath);
  const expectedLines = [
    "# 에이전트 무림 LAYOUT",
    "이 문서는 `agent-murim` 시리즈의 모든 마크다운 파일이 같은 읽기 구조와 페이지네이션 UI를 유지하도록 관리하는 기준이다.",
    "- 모든 본문 파일은 상단과 하단에 동일한 페이지네이션 줄을 둔다.",
    "- 본문 파일은 페이지네이션 다음에 `# 장 제목`, `## 장 부제`, `---` 순서의 제목 블록을 둔다.",
    "- 각 파일의 마지막에는 해당 장의 종료 안내 블록을 둔 뒤, 다시 `---`와 동일한 페이지네이션을 배치한다.",
    "- 배포본 안내인 `dist/README.md`도 상단과 하단에 동일한 내비게이션 줄을 둔다.",
    "node agent-murim/scripts/verify-layout.js",
    "이 스크립트는 LAYOUT 핵심 규칙, 상하단 페이지네이션 문자열, 장 제목/부제 블록, 종료 안내 블록, 작품 홈 핵심 메타데이터, 배포본 README 핵심 메타데이터, 목차 링크, 루트 작품 목록/한 줄 소개, 로컬 링크, 코드펜스 균형, 배포 zip manifest, zip 내부 원고와 원본의 내용 일치, SHA-256 체크섬을 함께 검사한다.",
    "- `00-prologue.md` — 프롤로그",
    "- 이후 본편은 `NN-partN-{slug}.md` 형식으로 추가한다. 예: `03-part3-family-audit.md`",
    "- `11-epilogue.md` — 에필로그",
    "| MCP | MCP 단자 | 외부 도구와 문맥을 잇는 현대식 단전 |",
    "| orchestrator | 오케스트레이터 | 여러 에이전트의 호흡과 비용을 조율하는 지휘자 |",
    "| vibe | vibe / 심상 | 사용자가 체감하는 흐름, 말투, 판단의 결 |",
  ];

  for (const expected of expectedLines) {
    if (!layout.includes(expected)) {
      fail(`${rel(layoutPath)}: missing or stale layout documentation line: ${expected}`);
    }
  }
}

function checkRootReadmeListing() {
  const rootReadmePath = path.join(repoRoot, "README.md");

  if (!fs.existsSync(rootReadmePath)) {
    fail(`${rel(rootReadmePath)}: missing root README`);
    return;
  }

  const rootReadme = read(rootReadmePath);
  const expectedCatalogRow = "| **에이전트 무림** | 현대 무협 / AI 에이전트 / 테크노 로맨스 | 프롤로그 + 10화 + 에필로그 | ✅ 완결 | [작품 홈](./agent-murim/README.md) · [배포본](./agent-murim/dist/README.md) |";
  const expectedIntro = "- **에이전트 무림** — AI 코딩 에이전트 가문들이 LLM Arena의 성능·비용·지연시간·vibe 리더보드를 두고 겨루는 현대 무협.";

  if (!rootReadme.includes(expectedCatalogRow)) {
    fail(`${rel(rootReadmePath)}: missing or stale agent-murim catalog row`);
  }

  if (!rootReadme.includes(expectedIntro)) {
    fail(`${rel(rootReadmePath)}: missing or stale agent-murim one-line intro`);
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

  for (const entry of expectedEntries) {
    const source = path.join(projectRoot, entry);
    const archived = spawnSync("unzip", ["-p", zip, entry]);

    if (archived.error) {
      fail(`unzip: ${archived.error.message}`);
      continue;
    }

    if (archived.status !== 0) {
      fail(`unzip -p ${rel(zip)} ${entry} failed: ${archived.stderr.toString().trim()}`);
      continue;
    }

    if (!archived.stdout.equals(fs.readFileSync(source))) {
      fail(`${rel(zip)}: archived ${entry} does not match source`);
    }
  }

  const test = spawnSync("unzip", ["-tqq", zip], { encoding: "utf8" });

  if (test.error) {
    fail(`unzip: ${test.error.message}`);
  } else if (test.status !== 0) {
    fail(`unzip -tqq ${rel(zip)} failed: ${test.stderr.trim()}`);
  }
}

function checkDistributionDirectory() {
  const distDir = path.join(projectRoot, "dist");

  if (!fs.existsSync(distDir)) {
    fail(`${rel(distDir)}: missing distribution directory`);
    return;
  }

  const expectedEntries = ["README.md", "SHA256SUMS", "agent-murim.zip"].sort();
  const actualEntries = fs.readdirSync(distDir, { withFileTypes: true })
    .map((entry) => entry.name)
    .sort();

  if (actualEntries.join("\n") !== expectedEntries.join("\n")) {
    fail(`${rel(distDir)}: expected only ${expectedEntries.join(", ")}, got ${actualEntries.join(", ")}`);
  }
}

function checkDistributionChecksums() {
  const distDir = path.join(projectRoot, "dist");
  const checksums = path.join(distDir, "SHA256SUMS");

  if (!fs.existsSync(checksums)) {
    fail(`${rel(checksums)}: missing checksum manifest`);
    return;
  }

  const checksumRaw = read(checksums);
  if (!checksumRaw.endsWith("\n")) {
    fail(`${rel(checksums)}: expected final newline`);
  }

  const checksumText = checksumRaw.endsWith("\n") ? checksumRaw.slice(0, -1) : checksumRaw;
  const checksumLines = checksumText ? checksumText.split(/\n/) : [];

  if (checksumLines.length !== 1) {
    fail(`${rel(checksums)}: expected exactly one checksum row`);
  }

  const checksumLine = checksumLines[0] || "";
  if (!/^[a-f0-9]{64}  agent-murim\.zip$/.test(checksumLine)) {
    fail(`${rel(checksums)}: malformed checksum row`);
  }

  const check = spawnSync("shasum", ["-a", "256", "-c", "SHA256SUMS"], {
    cwd: distDir,
    encoding: "utf8",
  });

  if (check.error) {
    fail(`shasum: ${check.error.message}`);
  } else if (check.status !== 0) {
    fail(`shasum -a 256 -c ${rel(checksums)} failed: ${check.stderr.trim()}`);
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
checkChapterTitleBlocks();
checkSeriesReadmeMetadata();
checkDistributionReadmeMetadata();
checkLayoutDocumentation();
checkReadmeToc();
checkRootReadmeListing();
checkDistributionDirectory();
checkDistributionZip();
checkDistributionChecksums();

if (failures.length > 0) {
  console.error("agent-murim layout verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("agent-murim layout verification passed.");
