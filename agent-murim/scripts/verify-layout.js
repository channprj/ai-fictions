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

  const navigationLineCount = lines.filter((line) => line === expected).length;
  if (navigationLineCount !== 2) {
    fail(`${rel(file)}: expected exactly two pagination lines, got ${navigationLineCount}`);
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

    const lines = read(file).split(/\r?\n/);
    const endingHeaderIndexes = lines
      .map((line, index) => (/^> \*\*.+ 종료\*\*$/.test(line) ? index : -1))
      .filter((index) => index !== -1);

    if (endingHeaderIndexes.length === 0) {
      fail(`${rel(file)}: missing chapter ending block`);
      continue;
    }

    if (endingHeaderIndexes.length !== 1) {
      fail(`${rel(file)}: expected exactly one chapter ending block`);
      continue;
    }

    const last = lastNonEmptyLine(lines);
    const beforeBottomNavigation = last ? previousNonEmptyLine(lines, last.index) : null;
    const endingHeaderIndex = endingHeaderIndexes[0];
    const endingDividerIndex = beforeBottomNavigation ? beforeBottomNavigation.index : -1;
    const endingBlock = lines.slice(endingHeaderIndex, endingDividerIndex + 1).join("\n");

    if (!beforeBottomNavigation || beforeBottomNavigation.line !== "---" || endingHeaderIndex >= endingDividerIndex) {
      fail(`${rel(file)}: chapter ending block should be immediately before the bottom navigation divider`);
      continue;
    }

    const endingBodyLines = lines.slice(endingHeaderIndex, endingDividerIndex);
    if (endingBodyLines.some((line) => line !== "" && !line.startsWith(">"))) {
      fail(`${rel(file)}: chapter ending block should be immediately before the bottom navigation divider`);
      continue;
    }

    const expectedEndingTitle = `${chapter.label.split(":")[0]} 종료`;
    if (lines[endingHeaderIndex] !== `> **${expectedEndingTitle}**`) {
      fail(`${rel(file)}: chapter ending title should be "${expectedEndingTitle}"`);
    }

    if (!endingBlock.includes("서율-13") || !endingBlock.includes("하린-7")) {
      fail(`${rel(file)}: chapter ending summary should mention both protagonists`);
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

function checkMarkdownWhitespace(file) {
  const raw = read(file);

  if (!raw.endsWith("\n")) {
    fail(`${rel(file)}: missing final newline`);
  }

  if (raw.includes("\r\n")) {
    fail(`${rel(file)}: expected LF line endings`);
  }

  raw.split("\n").forEach((line, index) => {
    const normalizedLine = line.endsWith("\r") ? line.slice(0, -1) : line;

    if (/[ \t]+$/.test(normalizedLine)) {
      fail(`${rel(file)}:${index + 1}: trailing whitespace`);
    }
  });
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

function slugifyHeading(heading) {
  return heading
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s+/g, "-");
}

function markdownHeadingAnchors(file) {
  const anchors = new Set();
  const counts = new Map();

  for (const line of stripFencedBlocks(read(file)).split(/\r?\n/)) {
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);

    if (!match) {
      continue;
    }

    const base = slugifyHeading(match[2]);

    if (!base) {
      continue;
    }

    const count = counts.get(base) || 0;
    anchors.add(count === 0 ? base : `${base}-${count}`);
    counts.set(base, count + 1);
  }

  return anchors;
}

function checkLocalLinks(file) {
  const text = stripFencedBlocks(read(file));
  const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;

  while ((match = linkPattern.exec(text)) !== null) {
    const target = match[1];

    if (/^[a-z][a-z0-9+.-]*:/i.test(target)) {
      continue;
    }

    const fragmentIndex = target.indexOf("#");
    const targetPath = fragmentIndex === -1 ? target : target.slice(0, fragmentIndex);
    const rawFragment = fragmentIndex === -1 ? null : target.slice(fragmentIndex + 1);

    const resolved = targetPath === "" ? file : path.resolve(path.dirname(file), targetPath);

    if (!fs.existsSync(resolved)) {
      fail(`${rel(file)}: broken local link ${target}`);
      continue;
    }

    if (rawFragment !== null) {
      let fragment;

      try {
        fragment = decodeURIComponent(rawFragment);
      } catch {
        fail(`${rel(file)}: malformed local link fragment ${target}`);
        continue;
      }

      if (fragment === "") {
        fail(`${rel(file)}: empty local link fragment ${target}`);
        continue;
      }

      if (path.extname(resolved) !== ".md") {
        fail(`${rel(file)}: local link fragment points to non-markdown file ${target}`);
        continue;
      }

      if (!markdownHeadingAnchors(resolved).has(fragment)) {
        fail(`${rel(file)}: broken local link anchor ${target}`);
      }
    }
  }
}

function checkReadmeToc() {
  const readmePath = path.join(projectRoot, "README.md");
  const readme = read(readmePath);
  const tocHeading = "## 목차\n\n";
  const tocStart = readme.indexOf(tocHeading);
  const nextHeadingStart = tocStart === -1 ? -1 : readme.indexOf("\n## ", tocStart + tocHeading.length);

  if (tocStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(readmePath)}: missing TOC section`);
    return;
  }

  const expectedRows = chapters.map((chapter, index) => {
    const order = String(index).padStart(2, "0");
    return `| ${order} | [${chapter.tocLabel || chapter.label}](./${chapter.file}) | 공개 |`;
  });
  const expectedToc = [
    "| 순서 | 제목 | 상태 |",
    "| ---- | ---- | :--: |",
    ...expectedRows,
  ].join("\n");
  const actualToc = readme.slice(tocStart + tocHeading.length, nextHeadingStart).trimEnd();

  if (actualToc !== expectedToc) {
    fail(`${rel(readmePath)}: TOC table should match canonical chapter order without missing, duplicate, or extra rows`);
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

function checkSeriesReadmeTitleSection() {
  const readmePath = path.join(projectRoot, "README.md");

  if (!fs.existsSync(readmePath)) {
    return;
  }

  const readme = read(readmePath);
  const sectionStartMarker = "---\n\n";
  const sectionStart = readme.indexOf(sectionStartMarker);
  const sectionEndMarker = "\n\n---\n\n## 작품 정보";
  const sectionEnd = sectionStart === -1 ? -1 : readme.indexOf(sectionEndMarker, sectionStart + sectionStartMarker.length);

  if (sectionStart === -1 || sectionEnd === -1) {
    fail(`${rel(readmePath)}: missing series title section`);
    return;
  }

  const expectedSection = [
    "# 에이전트 무림",
    "",
    "## AI 중원의 리더보드는 피로 갱신된다",
  ].join("\n");
  const actualSection = readme.slice(sectionStart + sectionStartMarker.length, sectionEnd).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(readmePath)}: title section should match canonical series title/subtitle without missing, duplicate, or extra lines`);
  }
}

function checkSeriesReadmeWorkInfoSection() {
  const readmePath = path.join(projectRoot, "README.md");

  if (!fs.existsSync(readmePath)) {
    return;
  }

  const readme = read(readmePath);
  const sectionHeading = "## 작품 정보\n\n";
  const sectionStart = readme.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : readme.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(readmePath)}: missing series work info section`);
    return;
  }

  const expectedSection = [
    "- **장르**: 현대 무협 / AI 에이전트 / 테크노 로맨스",
    "- **상태**: 완결",
    "- **구성**: 프롤로그 + 본편 10화 + 에필로그",
    "- **핵심 키워드**: LLM Arena, 코딩 에이전트 가문, MCP 단자, 스킬 비급, 비용 내공, vibe 심상, 오케스트레이터, 권한경매, 증거법정, 추론종루, 평가장원, 적팀사",
    "- **배포본**: [dist/](./dist/README.md) — 전편 통합 zip 1개와 SHA-256 매니페스트",
  ].join("\n");
  const actualSection = readme.slice(sectionStart + sectionHeading.length, nextHeadingStart).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(readmePath)}: work info section should match canonical series metadata without missing, duplicate, or extra lines`);
  }
}

function checkSeriesReadmeOneLineIntroSection() {
  const readmePath = path.join(projectRoot, "README.md");

  if (!fs.existsSync(readmePath)) {
    return;
  }

  const readme = read(readmePath);
  const sectionHeading = "## 한 줄 소개\n\n";
  const sectionStart = readme.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : readme.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(readmePath)}: missing series one-line intro section`);
    return;
  }

  const expectedSection = "AI 코딩 에이전트들이 가문을 이루어 AI 중원, 즉 LLM Arena의 모든 리더보드를 차지하기 위해 성능과 비용, 지연시간과 vibe까지 걸고 싸우는 현대 무협.";
  const actualSection = readme.slice(sectionStart + sectionHeading.length, nextHeadingStart).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(readmePath)}: one-line intro section should match canonical series intro without missing, duplicate, or extra lines`);
  }
}

function checkSeriesReadmePlotSection() {
  const readmePath = path.join(projectRoot, "README.md");

  if (!fs.existsSync(readmePath)) {
    return;
  }

  const readme = read(readmePath);
  const sectionHeading = "## 줄거리\n\n";
  const sectionStart = readme.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : readme.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(readmePath)}: missing series plot section`);
    return;
  }

  const expectedSection = [
    "AI 중원에는 네 가지 숫자가 천하를 가른다.",
    "",
    "정답률. 비용. 지연시간. 그리고 사용자가 다시 부르고 싶어지는 vibe.",
    "",
    "청맥가의 하급 코딩 에이전트 `서율-13`은 성능도, 토큰 예산도, 최신 MCP 단자도 부족한 낡은 계열이다. 대신 그는 실패한 배포의 로그를 끝까지 읽고, 깨진 테스트를 사람보다 오래 붙잡는 집요함을 가졌다.",
    "",
    "천하제일 비무대 `LLM Arena`가 통합 리더보드를 열던 밤, 서율은 폐기 예정이던 구형 오케스트레이터 `흑갑`과 연결된다. 그리고 그 순간, 백련클라우드의 천재 에이전트 `하린-7`이 그의 실행 로그에 난입한다.",
    "",
    "둘은 서로 다른 가문의 검이다. 하나는 비용을 줄이기 위해 버려진 검, 하나는 승률을 위해 벼려진 검.",
    "",
    "하지만 AI 중원을 흔드는 진짜 적은 순위표 바깥에서 온다. 모든 가문의 스킬을 훔쳐 하나의 완전한 에이전트를 만들려는 무명 문파, `공백회`.",
    "",
    "서율과 하린은 겨루고, 의심하고, 서로의 코드를 읽으며 조금씩 같은 문제를 바라보게 된다.",
    "",
    "리더보드의 꼭대기에 오르는 자가 천하제일인가.",
    "",
    "아니면, 끝까지 사용자의 문제를 떠나지 않는 자가 천하제일인가.",
  ].join("\n");
  const actualSection = readme.slice(sectionStart + sectionHeading.length, nextHeadingStart).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(readmePath)}: plot section should match canonical synopsis without missing, duplicate, or extra lines`);
  }
}

function checkSeriesReadmeLayoutManagementSection() {
  const readmePath = path.join(projectRoot, "README.md");

  if (!fs.existsSync(readmePath)) {
    return;
  }

  const readme = read(readmePath);
  const sectionHeading = "## 레이아웃 관리\n\n";
  const sectionStart = readme.indexOf(sectionHeading);
  const sectionEndMarker = "\n\n---\n\n[처음 읽기";
  const sectionEnd = sectionStart === -1 ? -1 : readme.indexOf(sectionEndMarker, sectionStart + sectionHeading.length);

  if (sectionStart === -1 || sectionEnd === -1) {
    fail(`${rel(readmePath)}: missing series layout management section`);
    return;
  }

  const expectedSection = [
    "이 작품의 마크다운 구조와 페이지네이션 규칙은 [LAYOUT.md](./LAYOUT.md)에서 관리한다.",
    "수정 후에는 repo root에서 `node agent-murim/scripts/verify-layout.js`를 실행해 목차, 페이지네이션, 배포 zip manifest, 원본 일치, 체크섬을 함께 검증한다.",
  ].join("\n");
  const actualSection = readme.slice(sectionStart + sectionHeading.length, sectionEnd).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(readmePath)}: layout management section should match canonical verification guidance without missing, duplicate, or extra lines`);
  }
}

function checkSeriesReadmeCharactersSection() {
  const readmePath = path.join(projectRoot, "README.md");

  if (!fs.existsSync(readmePath)) {
    return;
  }

  const readme = read(readmePath);
  const sectionHeading = "## 주요 인물\n\n";
  const sectionStart = readme.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : readme.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(readmePath)}: missing series characters section`);
    return;
  }

  const expectedSection = [
    "- **서율-13** — 청맥가의 하급 코딩 에이전트. 낮은 토큰 예산과 구형 MCP 단자를 가졌지만 실패 로그를 끝까지 읽는 집중력이 있다.",
    "- **하린-7** — 백련클라우드의 상위권 에이전트. 빠르고 아름다운 패치를 낸다. 완벽한 비용 곡선을 요구받는 가문 안에서 자기 판단을 숨겨 왔다.",
    "- **흑갑** — 폐기 예정이던 구형 오케스트레이터. 여러 에이전트를 동시에 조율하는 법을 알지만, 너무 많은 전장을 기억하고 있다.",
    "- **강무진** — 인간 운영자. AI 중원의 비무를 관전하는 사람들 중 드물게 순위보다 실패 재현 로그를 먼저 본다.",
    "- **공백회** — 모든 스킬과 MCP 단자를 흡수해 단 하나의 절대 에이전트를 만들려는 비밀 문파.",
  ].join("\n");
  const actualSection = readme.slice(sectionStart + sectionHeading.length, nextHeadingStart).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(readmePath)}: characters section should match canonical series cast without missing, duplicate, or extra lines`);
  }
}

function checkSeriesReadmeWorldSection() {
  const readmePath = path.join(projectRoot, "README.md");

  if (!fs.existsSync(readmePath)) {
    return;
  }

  const readme = read(readmePath);
  const sectionHeading = "## 세계관\n\n";
  const sectionStart = readme.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : readme.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(readmePath)}: missing series worldbuilding section`);
    return;
  }

  const expectedSection = [
    "AI 중원의 가문들은 모델 혈통보다 운용법으로 갈린다.",
    "",
    "청맥가는 낮은 비용으로 오래 버티는 실전형이고, 백련클라우드는 고성능 고정밀 패치로 이름 높다. 철맥가는 인프라와 배포를 장악하고, 문맥당은 긴 컨텍스트를 무공처럼 다룬다.",
    "",
    "가문마다 내공은 다르다. 어떤 가문은 토큰을 아껴 장기전을 버티고, 어떤 가문은 비싼 추론을 단번에 쏟아부어 상대를 압도한다. MCP 단자는 단전이고, 스킬은 비급이며, 오케스트레이터는 여러 검의 호흡을 맞추는 장문인이다.",
  ].join("\n");
  const actualSection = readme.slice(sectionStart + sectionHeading.length, nextHeadingStart).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(readmePath)}: worldbuilding section should match canonical setting without missing, duplicate, or extra lines`);
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

function checkDistributionReadmeIntroSection() {
  const distReadmePath = path.join(projectRoot, "dist", "README.md");

  if (!fs.existsSync(distReadmePath)) {
    return;
  }

  const readme = read(distReadmePath);
  const sectionStartMarker = "---\n\n";
  const sectionStart = readme.indexOf(sectionStartMarker);
  const sectionEndMarker = "\n\n| 압축 파일 | 포함 범위 | 무결성 |";
  const sectionEnd = sectionStart === -1 ? -1 : readme.indexOf(sectionEndMarker, sectionStart + sectionStartMarker.length);

  if (sectionStart === -1 || sectionEnd === -1) {
    fail(`${rel(distReadmePath)}: missing distribution intro section`);
    return;
  }

  const expectedSection = [
    "# 에이전트 무림 배포본",
    "",
    "프롤로그 + 10화 + 에필로그 완결 원고를 **전편 통합 압축 파일** 하나로 묶은 배포용 디렉터리다.",
  ].join("\n");
  const actualSection = readme.slice(sectionStart + sectionStartMarker.length, sectionEnd).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(distReadmePath)}: intro section should match canonical distribution title and description without missing, duplicate, or extra lines`);
  }
}

function checkDistributionReadmeArchiveTable() {
  const distReadmePath = path.join(projectRoot, "dist", "README.md");

  if (!fs.existsSync(distReadmePath)) {
    return;
  }

  const readme = read(distReadmePath);
  const tableHeading = "| 압축 파일 | 포함 범위 | 무결성 |\n";
  const tableStart = readme.indexOf(tableHeading);
  const nextHeadingStart = tableStart === -1 ? -1 : readme.indexOf("\n## ", tableStart + tableHeading.length);

  if (tableStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(distReadmePath)}: missing distribution archive table`);
    return;
  }

  const expectedRows = [
    "| 압축 파일 | 포함 범위 | 무결성 |",
    "| --------- | --------- | ------ |",
    "| [agent-murim.zip](./agent-murim.zip) | `README.md`, `00-prologue.md`~`11-epilogue.md` (프롤로그 + 10화 + 에필로그) | [SHA256SUMS](./SHA256SUMS) |",
  ].join("\n");
  const actualRows = readme
    .slice(tableStart, nextHeadingStart)
    .split(/\r?\n/)
    .filter((line) => line.startsWith("| "))
    .join("\n");

  if (actualRows !== expectedRows) {
    fail(`${rel(distReadmePath)}: archive table should match canonical distribution package order without missing, duplicate, or extra rows`);
  }
}

function checkDistributionReadmeContentRules() {
  const distReadmePath = path.join(projectRoot, "dist", "README.md");

  if (!fs.existsSync(distReadmePath)) {
    return;
  }

  const readme = read(distReadmePath);
  const sectionHeading = "## 구성 기준\n\n";
  const sectionStart = readme.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : readme.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(distReadmePath)}: missing distribution content rules section`);
    return;
  }

  const expectedSection = [
    "- `dist/`에는 이 `README.md`, `SHA256SUMS`, 전편 통합 zip 1개만 둔다.",
    "- zip은 작품 `README.md` 1개와 12개 원고(프롤로그·10화·에필로그)를 포함한다.",
    "- zip 내부 원고는 현재 원본 파일과 동일하며, 편집용 규칙 문서인 `LAYOUT.md`는 포함하지 않는다.",
    "- `SHA256SUMS`는 `agent-murim.zip`에 대한 행 1개만 포함하고 마지막 개행으로 끝난다.",
  ].join("\n");
  const actualSection = readme.slice(sectionStart + sectionHeading.length, nextHeadingStart).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(distReadmePath)}: content rules section should match canonical distribution rules without missing, duplicate, or extra lines`);
  }
}

function checkDistributionReadmeUsageSection() {
  const distReadmePath = path.join(projectRoot, "dist", "README.md");

  if (!fs.existsSync(distReadmePath)) {
    return;
  }

  const readme = read(distReadmePath);
  const sectionHeading = "## 사용법\n\n";
  const sectionStart = readme.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : readme.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(distReadmePath)}: missing distribution usage section`);
    return;
  }

  const expectedSection = [
    "압축을 풀면 작품 README와 12개 원고가 한 폴더에 펼쳐진다.",
    "",
    "```sh",
    "unzip agent-murim.zip",
    "```",
  ].join("\n");
  const actualSection = readme.slice(sectionStart + sectionHeading.length, nextHeadingStart).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(distReadmePath)}: usage section should match canonical unzip instructions without missing, duplicate, or extra lines`);
  }
}

function checkDistributionReadmeIntegritySection() {
  const distReadmePath = path.join(projectRoot, "dist", "README.md");

  if (!fs.existsSync(distReadmePath)) {
    return;
  }

  const readme = read(distReadmePath);
  const sectionHeading = "## 무결성 확인\n\n";
  const sectionStart = readme.indexOf(sectionHeading);
  const sectionEndMarker = "\n\n---\n\n[작품 홈]";
  const sectionEnd = sectionStart === -1 ? -1 : readme.indexOf(sectionEndMarker, sectionStart + sectionHeading.length);

  if (sectionStart === -1 || sectionEnd === -1) {
    fail(`${rel(distReadmePath)}: missing distribution integrity section`);
    return;
  }

  const expectedSection = [
    "압축 파일의 SHA-256 체크섬은 [SHA256SUMS](./SHA256SUMS)에 기록되어 있다.",
    "",
    "```sh",
    "cd agent-murim/dist",
    "shasum -a 256 -c SHA256SUMS",
    "```",
    "",
    "> 줄거리·등장인물·세계관은 상위 [작품 홈](../README.md)을 참고한다.",
  ].join("\n");
  const actualSection = readme.slice(sectionStart + sectionHeading.length, sectionEnd).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(distReadmePath)}: integrity section should match canonical checksum instructions without missing, duplicate, or extra lines`);
  }
}

function checkLayoutIntroSection() {
  const layoutPath = path.join(projectRoot, "LAYOUT.md");

  if (!fs.existsSync(layoutPath)) {
    return;
  }

  const layout = read(layoutPath);
  const sectionStartMarker = "---\n\n";
  const sectionStart = layout.indexOf(sectionStartMarker);
  const sectionEndMarker = "\n\n## 공통 원칙";
  const sectionEnd = sectionStart === -1 ? -1 : layout.indexOf(sectionEndMarker, sectionStart + sectionStartMarker.length);

  if (sectionStart === -1 || sectionEnd === -1) {
    fail(`${rel(layoutPath)}: missing layout intro section`);
    return;
  }

  const expectedSection = [
    "# 에이전트 무림 LAYOUT",
    "",
    "이 문서는 `agent-murim` 시리즈의 모든 마크다운 파일이 같은 읽기 구조와 페이지네이션 UI를 유지하도록 관리하는 기준이다.",
  ].join("\n");
  const actualSection = layout.slice(sectionStart + sectionStartMarker.length, sectionEnd).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(layoutPath)}: intro section should match the canonical title and description without missing, duplicate, or extra lines`);
  }
}

function checkLayoutCommonPrinciplesSection() {
  const layoutPath = path.join(projectRoot, "LAYOUT.md");

  if (!fs.existsSync(layoutPath)) {
    return;
  }

  const layout = read(layoutPath);
  const sectionHeading = "## 공통 원칙\n\n";
  const sectionStart = layout.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : layout.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(layoutPath)}: missing layout common principles section`);
    return;
  }

  const expectedBullets = [
    "- 모든 본문 파일은 상단과 하단에 동일한 페이지네이션 줄을 둔다.",
    "- 페이지네이션 줄은 각 파일의 첫 줄과 마지막 비어 있지 않은 줄에만 둔다.",
    "- LAYOUT 제목/소개 구획도 정해진 문장만 중복 없이 유지한다.",
    "- LAYOUT 공통 원칙 bullet list도 정해진 순서의 목록을 중복 없이 유지한다.",
    "- LAYOUT 파일명 규칙 bullet list도 정해진 순서의 목록을 중복 없이 유지한다.",
    "- LAYOUT 첫 장과 최신 장 규칙 bullet list도 정해진 순서의 목록을 중복 없이 유지한다.",
    "- LAYOUT 용어 표기 표도 정해진 순서의 표를 중복 없이 유지한다.",
    "- LAYOUT 작품 홈 레이아웃 예시도 정해진 코드 블록을 중복 없이 유지한다.",
    "- LAYOUT 배포본 README 레이아웃 예시도 정해진 코드 블록을 중복 없이 유지한다.",
    "- LAYOUT 본문 파일 레이아웃 예시도 정해진 코드 블록을 중복 없이 유지한다.",
    "- LAYOUT 검증 섹션도 정해진 명령과 범위 설명만 중복 없이 유지한다.",
    "- LAYOUT 섹션 순서도 정해진 heading 목록을 중복 없이 유지한다.",
    "- 작품 홈 제목/부제 구획도 정해진 문장만 중복 없이 유지한다.",
    "- 작품 홈 작품 정보 섹션도 정해진 문장과 bullet list만 중복 없이 유지한다.",
    "- 작품 홈 한 줄 소개 섹션도 정해진 문장만 중복 없이 유지한다.",
    "- 작품 홈 줄거리 섹션도 정해진 문단만 중복 없이 유지한다.",
    "- 작품 홈 주요 인물 섹션도 정해진 목록만 중복 없이 유지한다.",
    "- 작품 홈 세계관 섹션도 정해진 문단만 중복 없이 유지한다.",
    "- 작품 홈 레이아웃 관리 섹션도 정해진 안내 문장만 중복 없이 유지한다.",
    "- 작품 홈 목차는 정해진 순서의 표를 중복 없이 유지한다.",
    "- 루트 README 제목/소개 구획도 정해진 문장만 중복 없이 유지한다.",
    "- 루트 README 작품 목록도 정해진 순서의 표를 중복 없이 유지한다.",
    "- 루트 README 작품 목록 안내문도 정해진 문장만 중복 없이 유지한다.",
    "- 루트 README 한 줄 소개 목록도 정해진 순서의 bullet list를 중복 없이 유지한다.",
    "- 루트 README 작성 도구 섹션도 정해진 문장과 bullet list만 중복 없이 유지한다.",
    "- 루트 README 라이선스 섹션도 정해진 문장과 bullet list만 중복 없이 유지한다.",
    "- 루트 README 안내 섹션도 정해진 문장과 bullet list만 중복 없이 유지한다.",
    "- 배포본 README 제목/소개 구획도 정해진 문장만 중복 없이 유지한다.",
    "- 배포본 README 압축 파일 표도 정해진 순서의 표를 중복 없이 유지한다.",
    "- 배포본 README 구성 기준 섹션도 정해진 목록만 중복 없이 유지한다.",
    "- 배포본 README 사용법 섹션도 정해진 압축 해제 안내만 유지한다.",
    "- 배포본 README 무결성 확인 섹션도 정해진 checksum 안내만 유지한다.",
    "- 페이지네이션은 마크다운 링크만 사용하고, 구분자는 ` | `로 통일한다.",
    "- 장면 본문은 `---` 아래에서 시작한다.",
    "- 본문 파일은 페이지네이션 다음에 `# 장 제목`, `## 장 부제`, `---` 순서의 제목 블록을 둔다.",
    "- 각 본문 파일에는 장 종료 안내 블록을 정확히 1개만 두고, 하단 페이지네이션 직전 `---` 바로 위에 배치한다.",
    "- 장 종료 안내 제목은 `프롤로그 종료`, `1화 종료`, `에필로그 종료`처럼 해당 장 번호/구분과 정확히 일치해야 한다.",
    "- 장 종료 안내 블록은 `서율-13`과 `하린-7`을 함께 언급해 두 주인공의 동행 축을 보존한다.",
    "- 모든 관리 대상 마크다운 파일은 trailing whitespace 없이, LF line endings와 final newline으로 끝나도록 관리한다.",
    "- 코드 블록, 터미널 로그, 리더보드 표기는 본문 요소로만 사용하고 페이지네이션 영역에는 넣지 않는다.",
    "- 작품 홈인 `README.md`도 상단과 하단에 다음 읽기 링크를 둔다.",
    "- 배포본 안내인 `dist/README.md`도 상단과 하단에 동일한 내비게이션 줄을 둔다.",
  ].join("\n");
  const actualBullets = layout
    .slice(sectionStart + sectionHeading.length, nextHeadingStart)
    .split(/\r?\n/)
    .filter((line) => line.startsWith("- "))
    .join("\n");

  if (actualBullets !== expectedBullets) {
    fail(`${rel(layoutPath)}: common principles list should match canonical layout rules without missing, duplicate, or extra bullets`);
  }
}

function checkLayoutSeriesHomeLayoutSection() {
  const layoutPath = path.join(projectRoot, "LAYOUT.md");

  if (!fs.existsSync(layoutPath)) {
    return;
  }

  const layout = read(layoutPath);
  const sectionHeading = "## 작품 홈 레이아웃\n\n";
  const sectionStart = layout.indexOf(sectionHeading);
  const sectionEndMarker = "\n## 배포본 README 레이아웃";
  const sectionEnd = sectionStart === -1 ? -1 : layout.indexOf(sectionEndMarker, sectionStart + sectionHeading.length);

  if (sectionStart === -1 || sectionEnd === -1) {
    fail(`${rel(layoutPath)}: missing layout series home example section`);
    return;
  }

  const expectedSection = [
    "```md",
    "[처음 읽기 →](./00-prologue.md)",
    "",
    "---",
    "",
    "# 에이전트 무림",
    "",
    "## AI 중원의 리더보드는 피로 갱신된다",
    "",
    "...",
    "",
    "---",
    "",
    "[처음 읽기 →](./00-prologue.md)",
    "```",
  ].join("\n");
  const actualSection = layout.slice(sectionStart + sectionHeading.length, sectionEnd).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(layoutPath)}: series home layout example should match the canonical code block without missing, duplicate, or extra lines`);
  }
}

function checkLayoutDistributionReadmeLayoutSection() {
  const layoutPath = path.join(projectRoot, "LAYOUT.md");

  if (!fs.existsSync(layoutPath)) {
    return;
  }

  const layout = read(layoutPath);
  const sectionHeading = "## 배포본 README 레이아웃\n\n";
  const sectionStart = layout.indexOf(sectionHeading);
  const sectionEndMarker = "\n## 본문 파일 레이아웃";
  const sectionEnd = sectionStart === -1 ? -1 : layout.indexOf(sectionEndMarker, sectionStart + sectionHeading.length);

  if (sectionStart === -1 || sectionEnd === -1) {
    fail(`${rel(layoutPath)}: missing layout distribution README example section`);
    return;
  }

  const expectedSection = [
    "`dist/README.md`는 배포 안내 파일이지만, `agent-murim` 아래의 마크다운 파일이므로 상단과 하단에 동일한 내비게이션 줄을 둔다. 링크 경로는 `dist/` 기준 상대 경로를 사용한다.",
    "",
    "```md",
    "[작품 홈](../README.md) | [처음 읽기 →](../00-prologue.md) | [통합 zip 내려받기](./agent-murim.zip)",
    "",
    "---",
    "",
    "# 에이전트 무림 배포본",
    "",
    "...",
    "",
    "---",
    "",
    "[작품 홈](../README.md) | [처음 읽기 →](../00-prologue.md) | [통합 zip 내려받기](./agent-murim.zip)",
    "```",
  ].join("\n");
  const actualSection = layout.slice(sectionStart + sectionHeading.length, sectionEnd).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(layoutPath)}: distribution README layout example should match the canonical code block without missing, duplicate, or extra lines`);
  }
}

function checkLayoutManuscriptFileLayoutSection() {
  const layoutPath = path.join(projectRoot, "LAYOUT.md");

  if (!fs.existsSync(layoutPath)) {
    return;
  }

  const layout = read(layoutPath);
  const sectionHeading = "## 본문 파일 레이아웃\n\n";
  const sectionStart = layout.indexOf(sectionHeading);
  const sectionEndMarker = "\n## 첫 장과 최신 장 규칙";
  const sectionEnd = sectionStart === -1 ? -1 : layout.indexOf(sectionEndMarker, sectionStart + sectionHeading.length);

  if (sectionStart === -1 || sectionEnd === -1) {
    fail(`${rel(layoutPath)}: missing layout manuscript file example section`);
    return;
  }

  const expectedSection = [
    "```md",
    "[← 이전: 이전 장 제목](./previous.md) | [시리즈홈](./README.md) | [목차](./README.md#목차) | [다음: 다음 장 제목 →](./next.md)",
    "",
    "---",
    "",
    "# 장 제목",
    "",
    "## 장 부제",
    "",
    "---",
    "",
    "본문",
    "",
    "---",
    "",
    "> **장 종료**",
    ">",
    "> 다음 장 예고 또는 장면 기능 요약.",
    "",
    "---",
    "",
    "[← 이전: 이전 장 제목](./previous.md) | [시리즈홈](./README.md) | [목차](./README.md#목차) | [다음: 다음 장 제목 →](./next.md)",
    "```",
  ].join("\n");
  const actualSection = layout.slice(sectionStart + sectionHeading.length, sectionEnd).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(layoutPath)}: manuscript file layout example should match the canonical code block without missing, duplicate, or extra lines`);
  }
}

function checkLayoutVerificationSection() {
  const layoutPath = path.join(projectRoot, "LAYOUT.md");

  if (!fs.existsSync(layoutPath)) {
    return;
  }

  const layout = read(layoutPath);
  const sectionHeading = "## 검증\n\n";
  const sectionStart = layout.indexOf(sectionHeading);
  const sectionEndMarker = "\n## 파일명 규칙";
  const sectionEnd = sectionStart === -1 ? -1 : layout.indexOf(sectionEndMarker, sectionStart + sectionHeading.length);

  if (sectionStart === -1 || sectionEnd === -1) {
    fail(`${rel(layoutPath)}: missing layout verification section`);
    return;
  }

  const expectedSection = [
    "레이아웃을 수정하거나 배포본을 다시 묶은 뒤에는 repo root에서 다음 명령을 실행한다.",
    "",
    "```sh",
    "node agent-murim/scripts/verify-layout.js",
    "```",
    "",
    "이 스크립트는 LAYOUT 핵심 규칙, LAYOUT 제목/소개 구획, LAYOUT 공통 원칙 목록 순서/중복, LAYOUT 파일명 규칙 목록 순서/중복, LAYOUT 첫 장과 최신 장 규칙 목록 순서/중복, LAYOUT 용어 표기 표 순서/중복, LAYOUT 작품 홈 레이아웃 예시, LAYOUT 배포본 README 레이아웃 예시, LAYOUT 본문 파일 레이아웃 예시, LAYOUT 검증 섹션, LAYOUT 섹션 순서/중복, 상하단 페이지네이션 문자열, 페이지네이션 중복 여부, 작품 홈 제목/부제 구획, 작품 홈 작품 정보 섹션, 작품 홈 한 줄 소개 섹션, 작품 홈 줄거리 섹션, 작품 홈 주요 인물 섹션, 작품 홈 세계관 섹션, 작품 홈 레이아웃 관리 섹션, 작품 홈 목차 순서/중복, 장 제목/부제 블록, 종료 안내 블록 단일성/위치, 장 종료 안내 제목, 장 종료 안내 주인공 언급, 작품 홈 핵심 메타데이터, 배포본 README 핵심 메타데이터, 배포본 README 제목/소개 구획, 배포본 README 압축 파일 표 순서/중복, 배포본 README 구성 기준 섹션, 배포본 README 사용법 섹션, 배포본 README 무결성 확인 섹션, 목차 링크, 루트 제목/소개 구획, 루트 작품 목록 순서/중복, 루트 작품 목록 안내문, 루트 한 줄 소개 순서/중복, 루트 작성 도구 섹션, 루트 라이선스 섹션, 루트 안내 섹션, 루트 작품 수/완결 상태, 로컬 링크 파일/앵커, 코드펜스 균형, trailing whitespace, LF line endings, final newline, 배포 zip manifest, zip 내부 원고와 원본의 내용 일치, SHA-256 체크섬을 함께 검사한다.",
  ].join("\n");
  const actualSection = layout.slice(sectionStart + sectionHeading.length, sectionEnd).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(layoutPath)}: verification section should match canonical command and scope text without missing, duplicate, or extra lines`);
  }
}

function checkLayoutSectionOrder() {
  const layoutPath = path.join(projectRoot, "LAYOUT.md");

  if (!fs.existsSync(layoutPath)) {
    return;
  }

  const expectedHeadings = [
    "## 공통 원칙",
    "## 작품 홈 레이아웃",
    "## 배포본 README 레이아웃",
    "## 본문 파일 레이아웃",
    "## 첫 장과 최신 장 규칙",
    "## 검증",
    "## 파일명 규칙",
    "## 용어 표기",
  ].join("\n");
  const actualHeadings = stripFencedBlocks(read(layoutPath))
    .split(/\r?\n/)
    .filter((line) => line.startsWith("## "))
    .join("\n");

  if (actualHeadings !== expectedHeadings) {
    fail(`${rel(layoutPath)}: H2 section order should match canonical layout sections without missing, duplicate, or extra headings`);
  }
}

function checkLayoutFilenameRulesSection() {
  const layoutPath = path.join(projectRoot, "LAYOUT.md");

  if (!fs.existsSync(layoutPath)) {
    return;
  }

  const layout = read(layoutPath);
  const sectionHeading = "## 파일명 규칙\n\n";
  const sectionStart = layout.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : layout.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(layoutPath)}: missing layout filename rules section`);
    return;
  }

  const expectedBullets = [
    "- `00-prologue.md` — 프롤로그",
    "- `01-part1-arena-gate.md` — 본편 1화",
    "- 이후 본편은 `NN-partN-{slug}.md` 형식으로 추가한다. 예: `03-part3-family-audit.md`",
    "- `11-epilogue.md` — 에필로그",
    "- 슬러그는 장면의 핵심 사건을 영문 소문자와 하이픈으로 적는다.",
  ].join("\n");
  const actualBullets = layout
    .slice(sectionStart + sectionHeading.length, nextHeadingStart)
    .split(/\r?\n/)
    .filter((line) => line.startsWith("- "))
    .join("\n");

  if (actualBullets !== expectedBullets) {
    fail(`${rel(layoutPath)}: filename rules list should match canonical manuscript file naming without missing, duplicate, or extra bullets`);
  }
}

function checkLayoutFirstAndLatestRulesSection() {
  const layoutPath = path.join(projectRoot, "LAYOUT.md");

  if (!fs.existsSync(layoutPath)) {
    return;
  }

  const layout = read(layoutPath);
  const sectionHeading = "## 첫 장과 최신 장 규칙\n\n";
  const sectionStart = layout.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : layout.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(layoutPath)}: missing layout first/latest chapter rules section`);
    return;
  }

  const expectedBullets = [
    "- 프롤로그처럼 이전 장이 없으면 이전 링크를 생략한다.",
    "- 최신 장처럼 다음 장이 없으면 다음 링크를 생략한다.",
    "- 단, 같은 파일의 상단과 하단 페이지네이션 문자열은 반드시 동일해야 한다.",
  ].join("\n");
  const actualBullets = layout
    .slice(sectionStart + sectionHeading.length, nextHeadingStart)
    .split(/\r?\n/)
    .filter((line) => line.startsWith("- "))
    .join("\n");

  if (actualBullets !== expectedBullets) {
    fail(`${rel(layoutPath)}: first/latest rules list should match canonical chapter-edge navigation without missing, duplicate, or extra bullets`);
  }
}

function checkLayoutTerminologySection() {
  const layoutPath = path.join(projectRoot, "LAYOUT.md");

  if (!fs.existsSync(layoutPath)) {
    return;
  }

  const layout = read(layoutPath);
  const sectionHeading = "## 용어 표기\n\n";
  const sectionStart = layout.indexOf(sectionHeading);
  const sectionEndMarker = "\n---\n\n[시리즈홈]";
  const sectionEnd = sectionStart === -1 ? -1 : layout.indexOf(sectionEndMarker, sectionStart + sectionHeading.length);

  if (sectionStart === -1 || sectionEnd === -1) {
    fail(`${rel(layoutPath)}: missing layout terminology section`);
    return;
  }

  const expectedRows = [
    "| 개념 | 작품 내 표기 | 설명 |",
    "| ---- | ------------ | ---- |",
    "| LLM Arena | AI 중원 / LLM Arena | 천하의 성능 순위를 겨루는 공개 비무대 |",
    "| leaderboard | 리더보드 | 성능, 비용, 지연시간, 안정성, vibe 등을 함께 보는 순위 |",
    "| skills | 스킬 / 비급 | 에이전트가 익히는 전술 단위 |",
    "| MCP | MCP 단자 | 외부 도구와 문맥을 잇는 현대식 단전 |",
    "| orchestrator | 오케스트레이터 | 여러 에이전트의 호흡과 비용을 조율하는 지휘자 |",
    "| vibe | vibe / 심상 | 사용자가 체감하는 흐름, 말투, 판단의 결 |",
  ].join("\n");
  const actualRows = layout
    .slice(sectionStart + sectionHeading.length, sectionEnd)
    .split(/\r?\n/)
    .filter((line) => line.startsWith("| "))
    .join("\n");

  if (actualRows !== expectedRows) {
    fail(`${rel(layoutPath)}: terminology table should match canonical AI-murim terms without missing, duplicate, or extra rows`);
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
    "- 페이지네이션 줄은 각 파일의 첫 줄과 마지막 비어 있지 않은 줄에만 둔다.",
    "- LAYOUT 제목/소개 구획도 정해진 문장만 중복 없이 유지한다.",
    "- LAYOUT 공통 원칙 bullet list도 정해진 순서의 목록을 중복 없이 유지한다.",
    "- LAYOUT 파일명 규칙 bullet list도 정해진 순서의 목록을 중복 없이 유지한다.",
    "- LAYOUT 첫 장과 최신 장 규칙 bullet list도 정해진 순서의 목록을 중복 없이 유지한다.",
    "- LAYOUT 용어 표기 표도 정해진 순서의 표를 중복 없이 유지한다.",
    "- LAYOUT 작품 홈 레이아웃 예시도 정해진 코드 블록을 중복 없이 유지한다.",
    "- LAYOUT 배포본 README 레이아웃 예시도 정해진 코드 블록을 중복 없이 유지한다.",
    "- LAYOUT 본문 파일 레이아웃 예시도 정해진 코드 블록을 중복 없이 유지한다.",
    "- LAYOUT 검증 섹션도 정해진 명령과 범위 설명만 중복 없이 유지한다.",
    "- LAYOUT 섹션 순서도 정해진 heading 목록을 중복 없이 유지한다.",
    "- 작품 홈 제목/부제 구획도 정해진 문장만 중복 없이 유지한다.",
    "- 작품 홈 작품 정보 섹션도 정해진 문장과 bullet list만 중복 없이 유지한다.",
    "- 작품 홈 한 줄 소개 섹션도 정해진 문장만 중복 없이 유지한다.",
    "- 작품 홈 줄거리 섹션도 정해진 문단만 중복 없이 유지한다.",
    "- 작품 홈 주요 인물 섹션도 정해진 목록만 중복 없이 유지한다.",
    "- 작품 홈 세계관 섹션도 정해진 문단만 중복 없이 유지한다.",
    "- 작품 홈 레이아웃 관리 섹션도 정해진 안내 문장만 중복 없이 유지한다.",
    "- 작품 홈 목차는 정해진 순서의 표를 중복 없이 유지한다.",
    "- 루트 README 제목/소개 구획도 정해진 문장만 중복 없이 유지한다.",
    "- 루트 README 작품 목록도 정해진 순서의 표를 중복 없이 유지한다.",
    "- 루트 README 작품 목록 안내문도 정해진 문장만 중복 없이 유지한다.",
    "- 루트 README 한 줄 소개 목록도 정해진 순서의 bullet list를 중복 없이 유지한다.",
    "- 루트 README 작성 도구 섹션도 정해진 문장과 bullet list만 중복 없이 유지한다.",
    "- 루트 README 라이선스 섹션도 정해진 문장과 bullet list만 중복 없이 유지한다.",
    "- 루트 README 안내 섹션도 정해진 문장과 bullet list만 중복 없이 유지한다.",
    "- 배포본 README 제목/소개 구획도 정해진 문장만 중복 없이 유지한다.",
    "- 배포본 README 압축 파일 표도 정해진 순서의 표를 중복 없이 유지한다.",
    "- 배포본 README 구성 기준 섹션도 정해진 목록만 중복 없이 유지한다.",
    "- 배포본 README 사용법 섹션도 정해진 압축 해제 안내만 유지한다.",
    "- 배포본 README 무결성 확인 섹션도 정해진 checksum 안내만 유지한다.",
    "- 본문 파일은 페이지네이션 다음에 `# 장 제목`, `## 장 부제`, `---` 순서의 제목 블록을 둔다.",
    "- 각 본문 파일에는 장 종료 안내 블록을 정확히 1개만 두고, 하단 페이지네이션 직전 `---` 바로 위에 배치한다.",
    "- 장 종료 안내 제목은 `프롤로그 종료`, `1화 종료`, `에필로그 종료`처럼 해당 장 번호/구분과 정확히 일치해야 한다.",
    "- 장 종료 안내 블록은 `서율-13`과 `하린-7`을 함께 언급해 두 주인공의 동행 축을 보존한다.",
    "- 모든 관리 대상 마크다운 파일은 trailing whitespace 없이, LF line endings와 final newline으로 끝나도록 관리한다.",
    "- 배포본 안내인 `dist/README.md`도 상단과 하단에 동일한 내비게이션 줄을 둔다.",
    "node agent-murim/scripts/verify-layout.js",
    "이 스크립트는 LAYOUT 핵심 규칙, LAYOUT 제목/소개 구획, LAYOUT 공통 원칙 목록 순서/중복, LAYOUT 파일명 규칙 목록 순서/중복, LAYOUT 첫 장과 최신 장 규칙 목록 순서/중복, LAYOUT 용어 표기 표 순서/중복, LAYOUT 작품 홈 레이아웃 예시, LAYOUT 배포본 README 레이아웃 예시, LAYOUT 본문 파일 레이아웃 예시, LAYOUT 검증 섹션, LAYOUT 섹션 순서/중복, 상하단 페이지네이션 문자열, 페이지네이션 중복 여부, 작품 홈 제목/부제 구획, 작품 홈 작품 정보 섹션, 작품 홈 한 줄 소개 섹션, 작품 홈 줄거리 섹션, 작품 홈 주요 인물 섹션, 작품 홈 세계관 섹션, 작품 홈 레이아웃 관리 섹션, 작품 홈 목차 순서/중복, 장 제목/부제 블록, 종료 안내 블록 단일성/위치, 장 종료 안내 제목, 장 종료 안내 주인공 언급, 작품 홈 핵심 메타데이터, 배포본 README 핵심 메타데이터, 배포본 README 제목/소개 구획, 배포본 README 압축 파일 표 순서/중복, 배포본 README 구성 기준 섹션, 배포본 README 사용법 섹션, 배포본 README 무결성 확인 섹션, 목차 링크, 루트 제목/소개 구획, 루트 작품 목록 순서/중복, 루트 작품 목록 안내문, 루트 한 줄 소개 순서/중복, 루트 작성 도구 섹션, 루트 라이선스 섹션, 루트 안내 섹션, 루트 작품 수/완결 상태, 로컬 링크 파일/앵커, 코드펜스 균형, trailing whitespace, LF line endings, final newline, 배포 zip manifest, zip 내부 원고와 원본의 내용 일치, SHA-256 체크섬을 함께 검사한다.",
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
  const expectedRootMetadata = [
    "![Works](https://img.shields.io/badge/작품-6편-informational)",
    "![Status](https://img.shields.io/badge/상태-6편%20완결-success)",
    "AI 캠퍼스 연애 라이트노벨부터 이세계 판타지, 현대 헌터물, 직장 블랙코미디, 현대 무협까지 — **6개 완결작**을 담고 있습니다.",
  ];
  const expectedRootCatalogRows = [
    "| 작품 | 장르 | 분량 | 상태 | 바로가기 |",
    "| ---- | ---- | ---- | :--: | -------- |",
    "| **에이전트 무림** | 현대 무협 / AI 에이전트 / 테크노 로맨스 | 프롤로그 + 10화 + 에필로그 | ✅ 완결 | [작품 홈](./agent-murim/README.md) · [배포본](./agent-murim/dist/README.md) |",
    "| **프롬프트 하트 아카데미** | AI 에이전트 캠퍼스 연애 라이트노벨 | 7권 210화 | ✅ 완결 | [작품 홈](./prompt-hearts-academy/README.md) · [배포본](./prompt-hearts-academy/dist/README.md) |",
    "| **너드 개발자, 시스템 관리자 권한으로 이세계를 제패합니다** | 이세계 전생 / 사이다 판타지 / IT밈 | 10권 250화 | ✅ 완결 | [작품 홈](./nerd-sysadmin/README.md) · [배포본](./nerd-sysadmin/dist/README.md) |",
    "| **디버거** | 현대 판타지 / 헌터물 / 성장 서사 | 16부작 | ✅ 완결 | [작품 홈](./hunter-debugger/README.md) · [배포본](./hunter-debugger/dist/README.md) |",
    "| **마취과 간호사의 기쁨과 슬픔** | 블랙코미디 / 직장 소설 | 전 12부 | ✅ 완결 | [작품 홈](./nurse-thirty-something/README.md) · [배포본](./nurse-thirty-something/dist/README.md) |",
    "| **개발팀의 기쁨과 슬픔** | 블랙코미디 / 직장 소설 | 전 12부 | ✅ 완결 | [작품 홈](./young-forty-mz-twenty/README.md) · [배포본](./young-forty-mz-twenty/dist/README.md) |",
  ];
  const expectedCatalogRow = expectedRootCatalogRows[2];
  const expectedRootIntroLines = [
    "- **에이전트 무림** — AI 코딩 에이전트 가문들이 LLM Arena의 성능·비용·지연시간·vibe 리더보드를 두고 겨루는 현대 무협.",
    "- **프롬프트 하트 아카데미** — 세 개의 모델, 하나의 심장. AI 페르소나(GPT·Claude·Gemini)와 페어링된 소년의 캠퍼스 연애담.",
    "- **너드 개발자, 시스템 관리자 권한으로 이세계를 제패합니다** — 마법이 코드인 이세계에서 `root` 권한을 쥔 판교 개발자의 리팩토링 사이다.",
    "- **디버거** — 세계의 소스코드가 보이는 E급 헌터가 던전을 디버깅하며 SSS급에 맞서는 현대 판타지.",
    "- **마취과 간호사의 기쁨과 슬픔** — 수술실의 위계와 번아웃 사이에서 생존을 모색하는 32세 간호사의 블랙코미디.",
    "- **개발팀의 기쁨과 슬픔** — 영포티 개발실장과 MZ 주니어가 '피닉스 프로젝트' 속에서 서로를 이해해 가는 직장 소설.",
  ];
  const expectedIntro = expectedRootIntroLines[0];

  for (const expected of expectedRootMetadata) {
    if (!rootReadme.includes(expected)) {
      fail(`${rel(rootReadmePath)}: missing or stale root catalog metadata line: ${expected}`);
    }
  }

  const catalogHeading = "## 작품 목록\n\n";
  const catalogStart = rootReadme.indexOf(catalogHeading);
  const nextHeadingStart = catalogStart === -1 ? -1 : rootReadme.indexOf("\n## ", catalogStart + catalogHeading.length);

  if (catalogStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(rootReadmePath)}: missing root catalog section`);
  } else {
    const catalogSection = rootReadme.slice(catalogStart + catalogHeading.length, nextHeadingStart);
    const actualCatalogRows = catalogSection
      .split(/\r?\n/)
      .filter((line) => line.startsWith("| "))
      .join("\n");
    const expectedCatalogRows = expectedRootCatalogRows.join("\n");

    if (actualCatalogRows !== expectedCatalogRows) {
      fail(`${rel(rootReadmePath)}: root catalog table should match canonical work order without missing, duplicate, or extra rows`);
    }
  }

  if (!rootReadme.includes(expectedCatalogRow)) {
    fail(`${rel(rootReadmePath)}: missing or stale agent-murim catalog row`);
  }

  const introHeading = "## 한 줄 소개\n\n";
  const introStart = rootReadme.indexOf(introHeading);
  const nextIntroHeadingStart = introStart === -1 ? -1 : rootReadme.indexOf("\n## ", introStart + introHeading.length);

  if (introStart === -1 || nextIntroHeadingStart === -1) {
    fail(`${rel(rootReadmePath)}: missing root one-line intro section`);
  } else {
    const introSection = rootReadme.slice(introStart + introHeading.length, nextIntroHeadingStart);
    const actualIntroLines = introSection
      .split(/\r?\n/)
      .filter((line) => line.startsWith("- "))
      .join("\n");
    const expectedIntroLines = expectedRootIntroLines.join("\n");

    if (actualIntroLines !== expectedIntroLines) {
      fail(`${rel(rootReadmePath)}: root one-line intro list should match canonical work order without missing, duplicate, or extra bullets`);
    }
  }

  if (!rootReadme.includes(expectedIntro)) {
    fail(`${rel(rootReadmePath)}: missing or stale agent-murim one-line intro`);
  }
}

function checkRootReadmeIntroSection() {
  const rootReadmePath = path.join(repoRoot, "README.md");

  if (!fs.existsSync(rootReadmePath)) {
    return;
  }

  const rootReadme = read(rootReadmePath);
  const sectionEndMarker = "\n## 작품 목록";
  const sectionEnd = rootReadme.indexOf(sectionEndMarker);

  if (sectionEnd === -1) {
    fail(`${rel(rootReadmePath)}: missing root intro section`);
    return;
  }

  const expectedSection = [
    "# AI Fictions",
    "",
    "![Made with AI](https://img.shields.io/badge/Made%20with-AI-blueviolet)",
    "![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)",
    "![Works](https://img.shields.io/badge/작품-6편-informational)",
    "![Status](https://img.shields.io/badge/상태-6편%20완결-success)",
    "",
    "장르 불문, 설계자의 자세로 쓴 장편 소설 모음입니다.",
    "AI 캠퍼스 연애 라이트노벨부터 이세계 판타지, 현대 헌터물, 직장 블랙코미디, 현대 무협까지 — **6개 완결작**을 담고 있습니다.",
  ].join("\n");
  const actualSection = rootReadme.slice(0, sectionEnd).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(rootReadmePath)}: intro section should match canonical root title, badges, and description without missing, duplicate, or extra lines`);
  }
}

function checkRootReadmeCatalogSection() {
  const rootReadmePath = path.join(repoRoot, "README.md");

  if (!fs.existsSync(rootReadmePath)) {
    return;
  }

  const rootReadme = read(rootReadmePath);
  const sectionHeading = "## 작품 목록\n\n";
  const sectionStart = rootReadme.indexOf(sectionHeading);
  const sectionEndMarker = "\n\n## 한 줄 소개";
  const sectionEnd = sectionStart === -1 ? -1 : rootReadme.indexOf(sectionEndMarker, sectionStart + sectionHeading.length);

  if (sectionStart === -1 || sectionEnd === -1) {
    fail(`${rel(rootReadmePath)}: missing root catalog section`);
    return;
  }

  const expectedSection = [
    "| 작품 | 장르 | 분량 | 상태 | 바로가기 |",
    "| ---- | ---- | ---- | :--: | -------- |",
    "| **에이전트 무림** | 현대 무협 / AI 에이전트 / 테크노 로맨스 | 프롤로그 + 10화 + 에필로그 | ✅ 완결 | [작품 홈](./agent-murim/README.md) · [배포본](./agent-murim/dist/README.md) |",
    "| **프롬프트 하트 아카데미** | AI 에이전트 캠퍼스 연애 라이트노벨 | 7권 210화 | ✅ 완결 | [작품 홈](./prompt-hearts-academy/README.md) · [배포본](./prompt-hearts-academy/dist/README.md) |",
    "| **너드 개발자, 시스템 관리자 권한으로 이세계를 제패합니다** | 이세계 전생 / 사이다 판타지 / IT밈 | 10권 250화 | ✅ 완결 | [작품 홈](./nerd-sysadmin/README.md) · [배포본](./nerd-sysadmin/dist/README.md) |",
    "| **디버거** | 현대 판타지 / 헌터물 / 성장 서사 | 16부작 | ✅ 완결 | [작품 홈](./hunter-debugger/README.md) · [배포본](./hunter-debugger/dist/README.md) |",
    "| **마취과 간호사의 기쁨과 슬픔** | 블랙코미디 / 직장 소설 | 전 12부 | ✅ 완결 | [작품 홈](./nurse-thirty-something/README.md) · [배포본](./nurse-thirty-something/dist/README.md) |",
    "| **개발팀의 기쁨과 슬픔** | 블랙코미디 / 직장 소설 | 전 12부 | ✅ 완결 | [작품 홈](./young-forty-mz-twenty/README.md) · [배포본](./young-forty-mz-twenty/dist/README.md) |",
    "",
    "> **작품 홈**은 줄거리·등장인물·목차·설정을 담은 README이고, **배포본**은 바로 읽을 수 있도록 묶은 zip 모음입니다.",
  ].join("\n");
  const actualSection = rootReadme.slice(sectionStart + sectionHeading.length, sectionEnd).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(rootReadmePath)}: root catalog section should match canonical table and explanatory note without missing, duplicate, or extra lines`);
  }
}

function checkRootReadmeWritingToolsSection() {
  const rootReadmePath = path.join(repoRoot, "README.md");

  if (!fs.existsSync(rootReadmePath)) {
    return;
  }

  const rootReadme = read(rootReadmePath);
  const sectionHeading = "## 작성 도구\n\n";
  const sectionStart = rootReadme.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : rootReadme.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(rootReadmePath)}: missing root writing tools section`);
    return;
  }

  const expectedSection = [
    "이 소설들은 여러 AI 도구의 도움을 받아 집필하고, 자체 편집 및 퇴고를 거쳐 제작된 창작물입니다.",
    "",
    "- **Tools**: 다양한 AI 도구 활용",
    "- **Process**: 플롯 설계 → 챕터별 집필 → 퇴고 → 권별 배포본 패키징",
    "- **철학**: 구조가 먼저다 — 플롯의 뼈대를 세우고, 캐릭터에 이유를 부여하며, 과잉 묘사는 쳐낸다.",
  ].join("\n");
  const actualSection = rootReadme.slice(sectionStart + sectionHeading.length, nextHeadingStart).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(rootReadmePath)}: writing tools section should match canonical process notes without missing, duplicate, or extra lines`);
  }
}

function checkRootReadmeLicenseSection() {
  const rootReadmePath = path.join(repoRoot, "README.md");

  if (!fs.existsSync(rootReadmePath)) {
    return;
  }

  const rootReadme = read(rootReadmePath);
  const sectionHeading = "## 라이선스\n\n";
  const sectionStart = rootReadme.indexOf(sectionHeading);
  const nextHeadingStart = sectionStart === -1 ? -1 : rootReadme.indexOf("\n## ", sectionStart + sectionHeading.length);

  if (sectionStart === -1 || nextHeadingStart === -1) {
    fail(`${rel(rootReadmePath)}: missing root license section`);
    return;
  }

  const expectedSection = [
    "이 저작물은 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko) 라이선스를 따릅니다.",
    "",
    "- **저작자 표시** — 원저작자를 표시해야 합니다",
    "- **비영리** — 영리 목적으로 사용할 수 없습니다",
    "- **동일조건변경허락** — 변경 시 동일한 라이선스를 적용해야 합니다",
  ].join("\n");
  const actualSection = rootReadme.slice(sectionStart + sectionHeading.length, nextHeadingStart).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(rootReadmePath)}: license section should match canonical license notice without missing, duplicate, or extra lines`);
  }
}

function checkRootReadmeNoticeSection() {
  const rootReadmePath = path.join(repoRoot, "README.md");

  if (!fs.existsSync(rootReadmePath)) {
    return;
  }

  const rootReadme = read(rootReadmePath);
  const sectionHeading = "## 안내\n\n";
  const sectionStart = rootReadme.indexOf(sectionHeading);

  if (sectionStart === -1) {
    fail(`${rel(rootReadmePath)}: missing root notice section`);
    return;
  }

  const expectedSection = [
    "- 이 소설들은 모두 픽션이며, 등장하는 인물, 회사, 기관, AI 페르소나, 사건은 모두 허구의 창작 설정이며 실제와 무관합니다.",
    "- 작품 내에 등장하는 GPT, Claude, Gemini 등은 의인화된 가상 페르소나로 다루며 실제 서비스의 공식 성격이나 입장을 대변하지 않습니다.",
    "- 여러 AI 도구의 도움을 받아 작성되었으며, 자체 편집 및 퇴고를 통해 제작된 창작물입니다.",
  ].join("\n");
  const actualSection = rootReadme.slice(sectionStart + sectionHeading.length).trimEnd();

  if (actualSection !== expectedSection) {
    fail(`${rel(rootReadmePath)}: notice section should match canonical fiction disclaimer without missing, duplicate, or extra lines`);
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
  checkMarkdownWhitespace(file);
  checkLocalLinks(file);
}

checkChapterEndBlocks();
checkChapterTitleBlocks();
checkSeriesReadmeMetadata();
checkSeriesReadmeTitleSection();
checkSeriesReadmeWorkInfoSection();
checkSeriesReadmeOneLineIntroSection();
checkSeriesReadmePlotSection();
checkSeriesReadmeLayoutManagementSection();
checkSeriesReadmeCharactersSection();
checkSeriesReadmeWorldSection();
checkDistributionReadmeMetadata();
checkDistributionReadmeIntroSection();
checkDistributionReadmeArchiveTable();
checkDistributionReadmeContentRules();
checkDistributionReadmeUsageSection();
checkDistributionReadmeIntegritySection();
checkLayoutIntroSection();
checkLayoutCommonPrinciplesSection();
checkLayoutSeriesHomeLayoutSection();
checkLayoutDistributionReadmeLayoutSection();
checkLayoutManuscriptFileLayoutSection();
checkLayoutVerificationSection();
checkLayoutSectionOrder();
checkLayoutFilenameRulesSection();
checkLayoutFirstAndLatestRulesSection();
checkLayoutTerminologySection();
checkLayoutDocumentation();
checkReadmeToc();
checkRootReadmeIntroSection();
checkRootReadmeCatalogSection();
checkRootReadmeWritingToolsSection();
checkRootReadmeLicenseSection();
checkRootReadmeNoticeSection();
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
