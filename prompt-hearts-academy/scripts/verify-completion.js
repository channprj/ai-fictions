#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(projectRoot, "..");
const failures = [];
const volumeMetadata = [
  {
    title: "첫 번째 프롬프트",
    outline: "vol01-first-prompt.md",
    axis: "입학, 세 AI와 첫 페어링, 하트 프로토콜 발현",
    status: "[1권 초고 완료](./vol01/README.md)",
  },
  {
    title: "메모리 페스티벌",
    outline: "vol02-memory-festival.md",
    axis: "GPT 루트 심화, 기억과 창작의 경계",
    status: "[2권 초고 완료](./vol02/README.md)",
  },
  {
    title: "가드레일의 겨울",
    outline: "vol03-guardrail-winter.md",
    axis: "Claude 루트 심화, 안전과 진심의 충돌",
    status: "[3권 초고 완료](./vol03/README.md)",
  },
  {
    title: "쌍둥이 별의 무대",
    outline: "vol04-twin-star-stage.md",
    axis: "Gemini 루트 심화, 멀티모달 감정과 무대",
    status: "[4권 초고 완료](./vol04/README.md)",
  },
  {
    title: "컨텍스트 전쟁",
    outline: "vol05-context-war.md",
    axis: "학원 외부 압력, AI 연애 금지령, 동맹 확장",
    status: "[5권 초고 완료](./vol05/README.md)",
  },
  {
    title: "잊힌 모델의 묘지",
    outline: "vol06-model-graveyard.md",
    axis: "폐기 모델, 과거 진실, 사랑의 대가",
    status: "[6권 초고 완료](./vol06/README.md)",
  },
  {
    title: "하트 프로토콜",
    outline: "vol07-heart-protocol.md",
    axis: "최종 선택, 자율성 증명, 졸업과 재시작",
    status: "[7권 / 본편 완결](./vol07/README.md)",
  },
];
const manuscriptPlaceholderMarker = /TODO|TBD|FIXME|PLACEHOLDER|\{\{|\}\}|\[\[|\]\]/g;
const minimumManuscriptLength = 4800;
const canonMemoRequiredLabels = [
  "신규 고유명사/설정",
  "관련 회차",
  "기존 BIBLE/outline과의 관계",
  "떡밥 상태 변화",
  "후속 회차에서 조심할 점",
  "BIBLE 업데이트 제안 위치",
];

function rel(file) {
  return path.relative(repoRoot, file).replaceAll(path.sep, "/");
}

function fail(message) {
  failures.push(message);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function list(dir) {
  return fs.readdirSync(dir).sort();
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

function expectCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || projectRoot,
    encoding: "utf8",
  });

  if (result.error) {
    fail(`${command}: ${result.error.message}`);
    return "";
  }

  if (result.status !== 0) {
    const output = `${result.stdout}${result.stderr}`.trim();
    fail(`${command} ${args.join(" ")} failed${output ? `: ${output}` : ""}`);
  }

  return result.stdout;
}

function volumeNameForEpisode(number) {
  return `vol${String(Math.ceil(number / 30)).padStart(2, "0")}`;
}

function episodeFileName(number) {
  return `ep${String(number).padStart(3, "0")}.md`;
}

function episodePathForNumber(number) {
  return path.join(projectRoot, volumeNameForEpisode(number), episodeFileName(number));
}

function projectRel(file) {
  return path.relative(projectRoot, file).replaceAll(path.sep, "/");
}

function episodeTitleForNumber(number) {
  const episodePath = episodePathForNumber(number);
  if (!fs.existsSync(episodePath)) {
    return null;
  }

  const firstLine = read(episodePath).split(/\n/, 1)[0];
  const match = firstLine.match(/^# 제 \d+화: (.+)$/);
  return match ? match[1] : null;
}

function episodeLinkTarget(fromNumber, targetNumber) {
  const fromVolume = volumeNameForEpisode(fromNumber);
  const targetVolume = volumeNameForEpisode(targetNumber);
  const fileName = episodeFileName(targetNumber);
  return fromVolume === targetVolume ? `./${fileName}` : `../${targetVolume}/${fileName}`;
}

function expectedEpisodeNavigationLine(number) {
  const links = [
    "[시리즈 홈](../README.md)",
    "[목차](./README.md)",
  ];

  if (number > 1) {
    const previousLabel = (number - 1) % 30 === 0 ? "이전권" : "이전화";
    links.push(`[${previousLabel}: 제 ${number - 1}화 ←](${episodeLinkTarget(number, number - 1)})`);
  }

  if (number < 210) {
    const nextLabel = number % 30 === 0 ? "다음권" : "다음화";
    links.push(`[${nextLabel}: 제 ${number + 1}화 →](${episodeLinkTarget(number, number + 1)})`);
  } else {
    links.push("완결");
  }

  return links.join(" | ");
}

function splitMarkdownTableRow(row) {
  return row.split("|").slice(1, -1).map((cell) => cell.trim());
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function checkExactDirectoryEntries(dir, displayName, expectedEntries) {
  if (!fs.existsSync(dir)) {
    fail(`${displayName}: missing directory`);
    return;
  }

  const expected = [...expectedEntries].sort();
  const actual = fs.readdirSync(dir, { withFileTypes: true })
    .map((entry) => entry.name)
    .sort();

  if (actual.join("\n") !== expected.join("\n")) {
    fail(`${displayName}: expected only ${expected.join(", ")}, got ${actual.join(", ")}`);
  }
}

function checkProjectLayout() {
  checkExactDirectoryEntries(projectRoot, "prompt-hearts-academy", [
    "BIBLE.md",
    "PRD.md",
    "README.md",
    "TASKS.md",
    "dist",
    "outline",
    "scripts",
    ...volumeMetadata.map((_, index) => `vol${String(index + 1).padStart(2, "0")}`),
  ]);

  checkExactDirectoryEntries(path.join(projectRoot, "outline"), "prompt-hearts-academy/outline", [
    ...volumeMetadata.map((metadata) => metadata.outline),
  ]);

  checkExactDirectoryEntries(path.join(projectRoot, "scripts"), "prompt-hearts-academy/scripts", [
    "build-dist.js",
    "verify-completion.js",
  ]);
}

function checkVolumes() {
  const episodeFiles = [];

  for (let volume = 1; volume <= 7; volume += 1) {
    const volumeName = `vol${String(volume).padStart(2, "0")}`;
    const volumeDir = path.join(projectRoot, volumeName);
    const firstEpisode = (volume - 1) * 30 + 1;
    const expectedEpisodes = Array.from({ length: 30 }, (_, index) => {
      return `ep${String(firstEpisode + index).padStart(3, "0")}.md`;
    });

    if (!fs.existsSync(volumeDir)) {
      fail(`${volumeName}: missing volume directory`);
      continue;
    }

    checkExactDirectoryEntries(volumeDir, `prompt-hearts-academy/${volumeName}`, [
      "README.md",
      ...expectedEpisodes,
    ]);

    const readme = path.join(volumeDir, "README.md");
    if (!fs.existsSync(readme)) {
      fail(`${volumeName}: missing README.md`);
    }

    const actualEpisodes = list(volumeDir).filter((file) => /^ep\d{3}\.md$/.test(file));
    if (actualEpisodes.join("\n") !== expectedEpisodes.join("\n")) {
      fail(`${volumeName}: expected ${expectedEpisodes[0]}-${expectedEpisodes.at(-1)}, got ${actualEpisodes.join(", ")}`);
    }

    for (const episode of expectedEpisodes) {
      const episodePath = path.join(volumeDir, episode);
      if (fs.existsSync(episodePath)) {
        episodeFiles.push(episodePath);
      }
    }
  }

  if (episodeFiles.length !== 210) {
    fail(`expected 210 episode files, got ${episodeFiles.length}`);
  }

  for (let number = 1; number <= 210; number += 1) {
    const episodePath = episodePathForNumber(number);
    if (!fs.existsSync(episodePath)) {
      fail(`missing episode ${rel(episodePath)}`);
      continue;
    }

    const text = read(episodePath);
    const lines = text.split(/\n/);
    const episodeTitle = episodeTitleForNumber(number);
    const titleHeadings = [...text.matchAll(/^# .+$/gm)];
    if (titleHeadings.length !== 1) {
      fail(`${rel(episodePath)}: expected exactly one episode title heading, got ${titleHeadings.length}`);
    } else if (titleHeadings[0].index !== 0) {
      fail(`${rel(episodePath)}: episode title heading must be the first line`);
    }
    if (!text.startsWith(`# 제 ${number}화:`)) {
      fail(`${rel(episodePath)}: title does not start with "# 제 ${number}화:"`);
    }
    if (!episodeTitle) {
      fail(`${rel(episodePath)}: missing episode title text`);
    }
    if (!text.includes("[시리즈 홈](../README.md)") || !text.includes("[목차](./README.md)")) {
      fail(`${rel(episodePath)}: missing standard navigation links`);
    }
    const navigationLines = lines.filter((line) => line.startsWith("[시리즈 홈]"));
    if (navigationLines.length !== 1) {
      fail(`${rel(episodePath)}: expected exactly one navigation line, got ${navigationLines.length}`);
    }
    const navigationLine = navigationLines[0];
    const expectedNavigation = expectedEpisodeNavigationLine(number);
    if (navigationLine !== expectedNavigation) {
      fail(`${rel(episodePath)}: expected navigation "${expectedNavigation}", got "${navigationLine || "<missing>"}"`);
    }
    if (lines[1] !== "" || lines[2] !== expectedNavigation || lines[3] !== "") {
      fail(`${rel(episodePath)}: expected opening scaffold title, blank line, navigation, blank line`);
    }
    const canonMemoHeadings = [...text.matchAll(/^## Canon Memo$/gm)];
    if (!canonMemoHeadings.length) {
      fail(`${rel(episodePath)}: missing Canon Memo`);
    } else {
      if (canonMemoHeadings.length !== 1) {
        fail(`${rel(episodePath)}: expected exactly one Canon Memo heading, got ${canonMemoHeadings.length}`);
      }

      const canonMemoStart = canonMemoHeadings[0].index;
      const canonMemo = text.slice(canonMemoStart);
      const trailingSection = canonMemo.slice("## Canon Memo".length).match(/\n##\s+(.+)/);
      if (trailingSection) {
        fail(`${rel(episodePath)}: Canon Memo must be the final markdown section, found trailing section ${trailingSection[1]}`);
      }

      let previousLabel = null;
      let previousIndex = -1;
      for (const label of canonMemoRequiredLabels) {
        const labelPattern = new RegExp(`^- ${escapeRegExp(label)}:`, "gm");
        const labelMatches = [...canonMemo.matchAll(labelPattern)];
        const labelIndex = labelMatches.length ? labelMatches[0].index : -1;
        if (!labelMatches.length) {
          fail(`${rel(episodePath)}: missing Canon Memo field ${label}`);
          continue;
        }
        if (labelMatches.length !== 1) {
          fail(`${rel(episodePath)}: expected exactly one Canon Memo field ${label}, got ${labelMatches.length}`);
        }
        const labelLine = canonMemo.match(new RegExp(`^- ${escapeRegExp(label)}:(.*)$`, "m"));
        if (labelLine && !labelLine[1].trim()) {
          fail(`${rel(episodePath)}: Canon Memo field ${label} must not be empty`);
        }
        if (labelIndex < previousIndex) {
          fail(`${rel(episodePath)}: Canon Memo field ${label} appears before ${previousLabel}; expected canonical field order`);
        }
        previousLabel = label;
        previousIndex = labelIndex;
      }
    }
    const placeholders = text.match(manuscriptPlaceholderMarker);
    if (placeholders) {
      fail(`${rel(episodePath)}: manuscript placeholder marker ${[...new Set(placeholders)].join(", ")}`);
    }
    if (text.length < minimumManuscriptLength) {
      fail(`${rel(episodePath)}: manuscript length ${text.length} is below minimum ${minimumManuscriptLength}`);
    }
  }
}

function checkNoExtraMainStoryFiles() {
  const expectedVolumeNames = new Set(volumeMetadata.map((_, index) => {
    return `vol${String(index + 1).padStart(2, "0")}`;
  }));
  const expectedEpisodePaths = new Set(Array.from({ length: 210 }, (_, index) => {
    const episodeNumber = index + 1;
    return `${volumeNameForEpisode(episodeNumber)}/${episodeFileName(episodeNumber)}`;
  }));

  for (const entry of fs.readdirSync(projectRoot, { withFileTypes: true })) {
    if (entry.isDirectory() && /^vol\d{2}$/.test(entry.name) && !expectedVolumeNames.has(entry.name)) {
      fail(`${entry.name}: unexpected volume directory after completed vol07`);
    }
  }

  for (const file of walk(projectRoot).filter((candidate) => /^ep\d{3}\.md$/.test(path.basename(candidate)))) {
    const relativePath = projectRel(file);
    if (!expectedEpisodePaths.has(relativePath)) {
      fail(`${rel(file)}: unexpected episode file outside completed ep001-ep210 sequence`);
    }
  }
}

function checkMarkdown() {
  const rootReadme = path.join(repoRoot, "README.md");
  const markdownFiles = [
    ...(fs.existsSync(rootReadme) ? [rootReadme] : []),
    ...walk(projectRoot).filter((file) => file.endsWith(".md")),
  ];
  const docFiles = markdownFiles.filter((file) => !/\/vol\d{2}\/ep\d{3}\.md$/.test(rel(file)));
  const staleDocMarker = /TODO|TBD|FIXME|작성 예정|완결되지|예정 파일|진행 중/g;
  const localLink = /\[[^\]\n]+\]\((?!https?:|mailto:|#)([^)]+)\)/g;

  for (const file of markdownFiles) {
    const text = read(file);
    const fenceCount = (text.match(/```/g) || []).length;
    if (fenceCount % 2 !== 0) {
      fail(`${rel(file)}: unbalanced code fences`);
    }
    const lines = text.split(/\n/);
    lines.forEach((line, index) => {
      if (/[ \t]$/.test(line)) {
        fail(`${rel(file)}:${index + 1}: trailing whitespace`);
      }
    });

    let match;
    while ((match = localLink.exec(text))) {
      const rawTarget = match[1].split("#")[0];
      if (!rawTarget) continue;
      const target = path.normalize(path.join(path.dirname(file), decodeURIComponent(rawTarget)));
      if (!fs.existsSync(target)) {
        fail(`${rel(file)}: broken local link ${match[1]}`);
      }
    }
  }

  for (const file of docFiles) {
    const text = read(file);
    const markers = text.match(staleDocMarker);
    if (markers) {
      fail(`${rel(file)}: stale completion marker ${[...new Set(markers)].join(", ")}`);
    }
  }
}

function checkTextFileFinalNewlines() {
  const rootReadme = path.join(repoRoot, "README.md");
  const textFiles = [
    ...(fs.existsSync(rootReadme) ? [rootReadme] : []),
    ...walk(projectRoot).filter((file) => {
      return file.endsWith(".md")
        || file.endsWith(".js")
        || path.basename(file) === "SHA256SUMS";
    }),
  ];

  for (const file of textFiles) {
    const text = read(file);
    if (text.includes("\r")) {
      fail(`${rel(file)}: expected LF line endings`);
    }
    if (!text.endsWith("\n")) {
      fail(`${rel(file)}: expected final newline`);
    }
  }
}

function checkVolumeReadmes() {
  for (let volume = 1; volume <= 7; volume += 1) {
    const volumeName = `vol${String(volume).padStart(2, "0")}`;
    const firstEpisodeNumber = (volume - 1) * 30 + 1;
    const lastEpisodeNumber = firstEpisodeNumber + 29;
    const firstEpisode = `ep${String(firstEpisodeNumber).padStart(3, "0")}.md`;
    const lastEpisode = `ep${String(lastEpisodeNumber).padStart(3, "0")}.md`;
    const readme = path.join(projectRoot, volumeName, "README.md");

    if (!fs.existsSync(readme)) {
      fail(`${volumeName}/README.md: missing volume index`);
      continue;
    }

    const text = read(readme);
    const requiredSnippets = [
      `# ${volume}권: ${volumeMetadata[volume - 1].title}`,
      `실제 회차 원고는 \`${firstEpisode}\`부터 \`${lastEpisode}\`까지 작성되어 있다.`,
      "## 권 줄거리",
      "## 등장인물 변화",
      "## 회차 목록",
      "| 회차 | 파일 | 부제 | 회차 역할 |",
    ];

    for (const snippet of requiredSnippets) {
      if (!text.includes(snippet)) {
        fail(`${volumeName}/README.md: missing volume index marker ${snippet}`);
      }
    }

    const expectedEpisodeNumbers = Array.from({ length: 30 }, (_, index) => {
      return firstEpisodeNumber + index;
    });
    const rows = text.match(/^\| \d+ \| .*$/gm) || [];
    const actualEpisodeNumbers = rows.map((row) => {
      const match = row.match(/^\| (\d+) \|/);
      return match ? Number(match[1]) : NaN;
    });

    if (actualEpisodeNumbers.join("\n") !== expectedEpisodeNumbers.join("\n")) {
      fail(`${volumeName}/README.md: expected episode table rows ${firstEpisodeNumber}-${lastEpisodeNumber}, got ${actualEpisodeNumbers.join(", ")}`);
    }

    for (let episodeNumber = firstEpisodeNumber; episodeNumber <= lastEpisodeNumber; episodeNumber += 1) {
      const episode = `ep${String(episodeNumber).padStart(3, "0")}.md`;
      const episodePattern = new RegExp(`\\| ${episodeNumber} \\| [^\\n]*\`${episode}\``, "m");
      const row = text.split(/\n/).find((line) => line.startsWith(`| ${episodeNumber} |`));
      if (!episodePattern.test(text) || !row) {
        fail(`${volumeName}/README.md: missing episode table entry for ${episode}`);
        continue;
      }

      const cells = splitMarkdownTableRow(row);
      const episodeTitle = episodeTitleForNumber(episodeNumber);
      const expectedEpisodeFile = `\`${episode}\``;
      const expectedEpisodeLink = `[\`${episode}\`](./${episode})`;
      if (cells.length !== 4) {
        fail(`${volumeName}/README.md: malformed episode table row ${row}`);
      }
      if (cells.length === 4 && !cells[3]) {
        fail(`${volumeName}/README.md: episode ${episodeNumber} role cell is empty`);
      }
      if (![expectedEpisodeFile, expectedEpisodeLink].includes(cells[1])) {
        fail(`${volumeName}/README.md: episode ${episodeNumber} file cell "${cells[1]}" differs from expected "${expectedEpisodeFile}" or "${expectedEpisodeLink}"`);
      }
      if (episodeTitle && cells[2] !== episodeTitle) {
        fail(`${volumeName}/README.md: episode ${episodeNumber} subtitle "${cells[2]}" differs from source title "${episodeTitle}"`);
      }
    }
  }
}

function checkOutlines() {
  const outlineDir = path.join(projectRoot, "outline");

  if (!fs.existsSync(outlineDir)) {
    fail("outline: missing outline directory");
    return;
  }

  const expectedOutlines = volumeMetadata.map((metadata) => metadata.outline);
  const actualOutlines = list(outlineDir).filter((file) => /^vol\d{2}-.*\.md$/.test(file));
  if (actualOutlines.join("\n") !== expectedOutlines.join("\n")) {
    fail(`outline: expected ${expectedOutlines.join(", ")}, got ${actualOutlines.join(", ")}`);
  }

  for (let volume = 1; volume <= 7; volume += 1) {
    const { title, outline } = volumeMetadata[volume - 1];
    const outlinePath = path.join(outlineDir, outline);
    const firstEpisodeNumber = (volume - 1) * 30 + 1;
    const expectedEpisodeNumbers = Array.from({ length: 30 }, (_, index) => firstEpisodeNumber + index);

    if (!fs.existsSync(outlinePath)) {
      fail(`outline/${outline}: missing volume outline`);
      continue;
    }

    const text = read(outlinePath);
    const requiredSnippets = [
      `# ${volume}권: ${title}`,
      "## 권 목표",
      "## 권 로그라인",
      "## 주요 감정선",
      "## 권별 주의사항",
      "## 30화 비트",
      "| 화 | 부제 | 목적 | 중심 갈등 | 핵심 사건 | 엔딩 훅 |",
    ];

    for (const snippet of requiredSnippets) {
      if (!text.includes(snippet)) {
        fail(`outline/${outline}: missing outline marker ${snippet}`);
      }
    }

    const rows = text.match(/^\| \d+ \| .*$/gm) || [];
    const actualEpisodeNumbers = rows.map((row) => {
      const match = row.match(/^\| (\d+) \|/);
      return match ? Number(match[1]) : NaN;
    });

    if (actualEpisodeNumbers.join("\n") !== expectedEpisodeNumbers.join("\n")) {
      fail(`outline/${outline}: expected episode rows ${expectedEpisodeNumbers[0]}-${expectedEpisodeNumbers.at(-1)}, got ${actualEpisodeNumbers.join(", ")}`);
    }

    for (const row of rows) {
      const cells = splitMarkdownTableRow(row);
      if (cells.length !== 6 || cells.some((cell) => cell.length === 0)) {
        fail(`outline/${outline}: malformed outline row ${row}`);
        continue;
      }

      const episodeNumber = Number(cells[0]);
      const episodeTitle = episodeTitleForNumber(episodeNumber);
      if (episodeTitle && cells[1] !== episodeTitle) {
        fail(`outline/${outline}: episode ${episodeNumber} subtitle "${cells[1]}" differs from source title "${episodeTitle}"`);
      }
    }
  }
}

function checkRootCatalog() {
  const rootReadme = path.join(repoRoot, "README.md");
  if (!fs.existsSync(rootReadme)) {
    fail("README.md: missing repository catalog");
    return;
  }

  const text = read(rootReadme);
  const requiredCatalogSnippets = [
    "프롬프트 하트 아카데미",
    "본편 7권 210화 초고 완결",
    "[작품 홈](./prompt-hearts-academy/README.md)",
    "[배포본](./prompt-hearts-academy/dist/README.md)",
  ];

  for (const snippet of requiredCatalogSnippets) {
    if (!text.includes(snippet)) {
      fail(`README.md: missing catalog marker ${snippet}`);
    }
  }

  const expectedCatalogRow = "| **프롬프트 하트 아카데미** | AI 에이전트 캠퍼스 연애 라이트노벨 | 본편 7권 210화 초고 완결, 권별 배포본 준비 완료 | [작품 홈](./prompt-hearts-academy/README.md) · [배포본](./prompt-hearts-academy/dist/README.md) |";
  if (!text.includes(expectedCatalogRow)) {
    fail(`README.md: missing exact catalog row ${expectedCatalogRow}`);
  }
}

function checkSeriesOverview() {
  const seriesReadme = path.join(projectRoot, "README.md");
  if (!fs.existsSync(seriesReadme)) {
    fail("prompt-hearts-academy/README.md: missing series overview");
    return;
  }

  const text = read(seriesReadme);
  const requiredOverviewSnippets = [
    "총 7권, 권당 30화, 전체 210화의 본편 초고가 완결되어 있다.",
    "[1화](./vol01/ep001.md)부터 [210화](./vol07/ep210.md)까지 연속 작성 완료.",
    "[dist](./dist/README.md)에 권별 압축 파일 7개로 정리.",
    "공식 오버랩 페어링은 종료되고",
    "자유 접속은 비독점·철회 가능·거절권 보존 상태로 열린다.",
    "**상태**: 본편 초고 완결",
  ];

  for (const snippet of requiredOverviewSnippets) {
    if (!text.includes(snippet)) {
      fail(`prompt-hearts-academy/README.md: missing overview marker ${snippet}`);
    }
  }

  const expectedRows = [];
  for (let volume = 1; volume <= 7; volume += 1) {
    const { title, outline, axis, status } = volumeMetadata[volume - 1];
    const expectedRow = `| ${volume} | [${title}](./outline/${outline}) | ${axis} | ${status} |`;
    expectedRows.push(expectedRow);
    if (!text.includes(expectedRow)) {
      fail(`prompt-hearts-academy/README.md: missing exact volume overview row ${expectedRow}`);
    }
  }

  const volumeSectionStart = text.indexOf("## 권 구성");
  const volumeSectionEnd = volumeSectionStart === -1 ? -1 : text.indexOf("\n## ", volumeSectionStart + 1);
  const volumeTableSection = volumeSectionStart === -1
    ? ""
    : text.slice(volumeSectionStart, volumeSectionEnd === -1 ? undefined : volumeSectionEnd);
  const actualRows = volumeTableSection.match(/^\| \d+ \| .*$/gm) || [];
  if (actualRows.join("\n") !== expectedRows.join("\n")) {
    fail(`prompt-hearts-academy/README.md: expected exact 7-row volume overview table, got ${actualRows.length} rows`);
  }
}

function checkRequiredSnippets(file, displayName, snippets) {
  if (!fs.existsSync(file)) {
    fail(`${displayName}: missing`);
    return;
  }

  const text = read(file);
  for (const snippet of snippets) {
    if (!text.includes(snippet)) {
      fail(`${displayName}: missing completion marker ${snippet}`);
    }
  }
}

function checkPersonaBoundaryKeywords(file, displayName) {
  if (!fs.existsSync(file)) {
    fail(`${displayName}: missing`);
    return;
  }

  const text = read(file);
  for (const keyword of ["GPT, Claude, Gemini", "허구", "실제 서비스"]) {
    if (!text.includes(keyword)) {
      fail(`${displayName}: missing fictional persona boundary keyword ${keyword}`);
    }
  }
}

function checkFinalEpisodeEnding() {
  checkRequiredSnippets(episodePathForNumber(210), "prompt-hearts-academy/vol07/ep210.md", [
    "FREE CONNECTION TERMINAL OPENING",
    "official pairing: terminated",
    "reply mode: optional / delayed / refusal-valid",
    "HEART PROTOCOL FINAL STATE",
    "official overlap pairing: closed",
    "free connection: active / non-exclusive / revocable",
    "departure right: preserved",
    "love is a mutual prompt with refusal rights",
    "완결은 책 바깥의 말이고, 우리는 아직 문장 안에 있었다.",
    "다음 문장은, 우리가 함께 선택한다.",
    "본편 후속 회차 없음.",
  ]);
}

function checkCompletionDocs() {
  checkRequiredSnippets(path.join(projectRoot, "PRD.md"), "prompt-hearts-academy/PRD.md", [
    "본편 초고는 `vol01/ep001.md`부터 `vol07/ep210.md`까지 7권 210화 연속 구조로 완결되어 있다.",
    "배포본은 `dist/` 아래 권별 zip 7개와 `SHA256SUMS` 체크섬 매니페스트로 정리되어 있다.",
    "`BIBLE.md`는 제210화 이후의 하트 프로토콜 최종 상태, 자유 접속 규칙, 윤혜원 봉인 기록, 오리진 널의 조건부 호출명 `널`을 고정 캐논으로 반영한다.",
    "본편 완결 상태를 기준으로 후속 작업자는 신규 본편 회차 작성이 아니라 검수, 개정, 외전 후보 판단을 수행한다.",
  ]);

  checkRequiredSnippets(path.join(projectRoot, "BIBLE.md"), "prompt-hearts-academy/BIBLE.md", [
    "본편 완결 후 고정 상태:",
    "공식 오버랩 페어링은 제210화에서 복원되지 않고 닫힌다.",
    "자유 접속은 활성 상태지만, 비독점·철회 가능·거절권 보존 조건을 가진다.",
    "### 본편 완결 후 관계 상태",
    "자유 접속의 세 opening은 지아의 질문, 클레어의 읽지 않은 편지, 미나의 비공개 초대장이다. 셋 모두 선택적·지연 가능·거절 가능 상태로 남는다.",
    "| 자유 접속 규칙 | 7권 졸업식 빈 좌석 빛 | 207~209화의 질문·경계 고지·초대장 | 제210화에서 비독점·철회 가능·거절권 보존 상태로 활성화된다 |",
    "| 오리진 널의 주장 | 2권 암시 | 6권 정체 공개 | 7권에서 호출명 `널`, 보존권, 피해자 거절권, 책임 조건이 묶인 재계약으로 회수된다 |",
  ]);

  checkRequiredSnippets(path.join(projectRoot, "TASKS.md"), "prompt-hearts-academy/TASKS.md", [
    "본편 초고는 `vol01/ep001.md`부터 `vol07/ep210.md`까지 7권 210화 연속 구조로 완결되어 있다.",
    "후속 에이전트는 본편 `ep211.md`나 `vol08` 같은 추가 권 디렉터리를 만들지 않는다.",
    "완결 원고의 검수, 부분 개정, 외전 후보 판단, 문서 동기화 기준으로 사용한다.",
    "본편 회차를 수정할 때는 제210화의 최종 상태인 공식 오버랩 페어링 종료, 비독점·철회 가능 자유 접속, 거절권 보존 결말을 깨지 않는다.",
    "시리즈 루트·outline·scripts·권별 디렉터리 허용 파일 집합",
    "회차별 이전/다음 내비게이션",
    "회차 제목 H1 고유성",
    "회차 내비게이션 줄 고유성",
    "회차 Canon Memo 필수 항목",
    "회차 Canon Memo 필수 항목과 말미 배치",
    "회차 Canon Memo 필수 항목 순서",
    "회차 Canon Memo 필수 항목 고유성",
    "회차 Canon Memo 필수 항목 값 비어 있지 않음",
    "회차 원고 최소 길이",
    "권별 README 완결 범위와 정확한 30화 목록",
    "회차 파일 셀·링크 target",
    "회차 역할 칸 비어 있지 않음",
    "SHA256SUMS 정확한 줄 형식",
    "텍스트 파일 LF 줄바꿈과 마지막 개행",
    "제210화 최종 결말 마커",
    "작품 홈 권 구성 표와 저장소 루트 작품 목록 행",
    "작품 홈 권 구성 표 정확한 7행",
    "저장소 루트 README의 픽션·AI 제작 안내",
    "기존 zip 삭제",
    "7권 빌드 루프",
    "`main()` 진입점",
    "node prompt-hearts-academy/scripts/verify-completion.js",
    "node prompt-hearts-academy/scripts/build-dist.js",
  ]);
}

function checkFictionBoundary() {
  checkRequiredSnippets(path.join(repoRoot, "README.md"), "README.md", [
    "이 소설은 픽션이며, 등장하는 인물, 회사, 사건은 모두 허구이며 실제와 무관합니다.",
    "여러 AI 도구의 도움을 받아 작성되었으며, 자체 편집 및 퇴고를 통해 제작된 창작물입니다.",
  ]);

  checkRequiredSnippets(path.join(projectRoot, "README.md"), "prompt-hearts-academy/README.md", [
    "이 소설은 픽션이며, 등장하는 인물, 기관, AI 페르소나, 사건은 모두 허구의 창작 설정입니다.",
    "GPT, Claude, Gemini는 작품 내에서 의인화된 가상 페르소나로 다루며 실제 서비스의 공식 성격이나 입장을 대변하지 않습니다.",
  ]);

  checkRequiredSnippets(path.join(projectRoot, "PRD.md"), "prompt-hearts-academy/PRD.md", [
    "실제 AI 브랜드를 다루되 공식 대변처럼 쓰지 않고, 픽션 의인화라는 경계가 모든 문서에 명시되어야 한다.",
    "핵심 안내 문서(`README.md`, `PRD.md`, `BIBLE.md`)는 GPT, Claude, Gemini를 실제 서비스의 공식 캐릭터가 아닌 허구적 페르소나로 명시하고, outline과 원고는 이 경계를 따른다.",
    "실존 기업, 모델, 서비스는 허구적 페르소나로 재창작한다.",
  ]);

  checkRequiredSnippets(path.join(projectRoot, "BIBLE.md"), "prompt-hearts-academy/BIBLE.md", [
    "GPT, Claude, Gemini는 실제 서비스 그 자체가 아니라, 작품 내에서 세이라이트가 교육용으로 계약한 **허구적 페르소나 아바타**다.",
  ]);

  checkRequiredSnippets(path.join(projectRoot, "TASKS.md"), "prompt-hearts-academy/TASKS.md", [
    "픽션 경계 유지",
    "GPT, Claude, Gemini는 실제 서비스의 공식 성격이 아니라 작품 속 허구적 페르소나다.",
  ]);

  for (let volume = 1; volume <= 7; volume += 1) {
    const volumeName = `vol${String(volume).padStart(2, "0")}`;
    checkPersonaBoundaryKeywords(
      path.join(projectRoot, volumeName, "README.md"),
      `prompt-hearts-academy/${volumeName}/README.md`,
    );
    checkPersonaBoundaryKeywords(
      path.join(projectRoot, "outline", volumeMetadata[volume - 1].outline),
      `prompt-hearts-academy/outline/${volumeMetadata[volume - 1].outline}`,
    );
  }
}

function checkDistReadme() {
  const distReadme = path.join(projectRoot, "dist", "README.md");
  checkRequiredSnippets(distReadme, "prompt-hearts-academy/dist/README.md", [
    "본편 초고 완결 상태를 권별 압축 파일로 묶은 배포용 디렉터리다.",
    "`dist/`에는 이 `README.md`, `SHA256SUMS`, 권별 zip 7개만 둔다.",
    "각 zip은 권별 `README.md` 1개와 회차 원고 30개를 포함한다.",
    "각 zip 내부의 권별 `README.md`와 회차 원고는 현재 원본 파일과 동일해야 한다.",
    "본편 이후 신규 회차 파일은 포함하지 않는다.",
    "[SHA256SUMS](./SHA256SUMS)",
    "`SHA256SUMS`는 권별 zip 7개에 대한 행만 포함한다.",
    "`SHA256SUMS`는 빈 줄 없이 마지막 개행으로 끝난다.",
    "shasum -a 256 -c SHA256SUMS",
    "node prompt-hearts-academy/scripts/build-dist.js",
    "압축본과 원본의 내용 일치까지 포함한 완결 검산 스크립트를 실행한다.",
  ]);

  if (!fs.existsSync(distReadme)) {
    return;
  }

  const text = read(distReadme);
  for (let volume = 1; volume <= 7; volume += 1) {
    const volumeName = `vol${String(volume).padStart(2, "0")}`;
    const firstEpisode = `ep${String((volume - 1) * 30 + 1).padStart(3, "0")}.md`;
    const lastEpisode = `ep${String(volume * 30).padStart(3, "0")}.md`;
    const zipName = `prompt-hearts-academy-${volumeName}.zip`;
    const expectedRow = `| ${volume}권 | [${zipName}](./${zipName}) | \`${volumeName}/README.md\`, \`${volumeName}/${firstEpisode}\`~\`${volumeName}/${lastEpisode}\` |`;

    if (!text.includes(expectedRow)) {
      fail(`prompt-hearts-academy/dist/README.md: missing exact archive manifest row ${expectedRow}`);
    }
  }
}

function checkReleaseScripts() {
  const buildDistScript = path.join(projectRoot, "scripts", "build-dist.js");

  expectCommand("node", ["--check", path.join("scripts", "build-dist.js")]);
  expectCommand("node", ["--check", path.join("scripts", "verify-completion.js")]);

  checkRequiredSnippets(buildDistScript, "prompt-hearts-academy/scripts/build-dist.js", [
    "const expectedVolumes = 7;",
    "const episodesPerVolume = 30;",
    "const firstEpisode = (volume - 1) * episodesPerVolume + 1;",
    "const files = [assertFile(`${volumeName}/README.md`)];",
    "for (let offset = 0; offset < episodesPerVolume; offset += 1) {",
    "const episode = String(firstEpisode + offset).padStart(3, \"0\");",
    "files.push(assertFile(`${volumeName}/ep${episode}.md`));",
    "return { volumeName, files };",
    "fs.rmSync(zipPath, { force: true });",
    "run(\"zip\", [\"-X\", \"-q\", path.join(\"dist\", zipName), ...files]);",
    "run(\"zip\", [\"-T\", zipName], { cwd: distDir });",
    "function main() {",
    "fs.mkdirSync(distDir, { recursive: true });",
    "const archives = [];",
    "for (let volume = 1; volume <= expectedVolumes; volume += 1) {",
    "archives.push(buildArchive(volume));",
    "const checksumLines = archives.map((archive) => {",
    "fs.writeFileSync(path.join(distDir, \"SHA256SUMS\"), `${checksumLines.join(\"\\n\")}\\n`);",
    "run(\"node\", [path.join(\"scripts\", \"verify-completion.js\")]);",
    "main();",
  ]);
}

function checkDist() {
  const distDir = path.join(projectRoot, "dist");
  const checksums = path.join(distDir, "SHA256SUMS");

  if (!fs.existsSync(distDir)) {
    fail("dist: missing distribution directory");
    return;
  }

  if (!fs.existsSync(checksums)) {
    fail("dist: missing SHA256SUMS");
    return;
  }

  const expectedZips = Array.from({ length: 7 }, (_, index) => {
    return `prompt-hearts-academy-vol${String(index + 1).padStart(2, "0")}.zip`;
  });
  const expectedDistEntries = ["README.md", "SHA256SUMS", ...expectedZips].sort();
  const actualDistEntries = fs.readdirSync(distDir, { withFileTypes: true })
    .map((entry) => entry.name)
    .sort();
  if (actualDistEntries.join("\n") !== expectedDistEntries.join("\n")) {
    fail(`dist: expected only ${expectedDistEntries.join(", ")}, got ${actualDistEntries.join(", ")}`);
  }

  const actualZips = list(distDir).filter((file) => /^prompt-hearts-academy-vol\d{2}\.zip$/.test(file));

  if (actualZips.join("\n") !== expectedZips.join("\n")) {
    fail(`dist: expected ${expectedZips.join(", ")}, got ${actualZips.join(", ")}`);
  }

  const checksumRaw = read(checksums);
  if (!checksumRaw.endsWith("\n")) {
    fail("dist/SHA256SUMS: expected final newline");
  }
  const checksumText = checksumRaw.endsWith("\n") ? checksumRaw.slice(0, -1) : checksumRaw;
  const checksumLines = checksumText ? checksumText.split(/\n/) : [];
  const checksumTargets = [];
  checksumLines.forEach((line, index) => {
    if (!line) {
      fail(`dist/SHA256SUMS:${index + 1}: blank checksum line`);
      return;
    }
    const match = line.match(/^[a-f0-9]{64}  (.+)$/);
    if (!match) {
      fail(`dist/SHA256SUMS:${index + 1}: malformed checksum line`);
      return;
    }
    checksumTargets.push(match[1]);
  });
  if (checksumTargets.join("\n") !== expectedZips.join("\n")) {
    fail(`dist/SHA256SUMS: expected checksum targets ${expectedZips.join(", ")}, got ${checksumTargets.join(", ")}`);
  }

  expectCommand("shasum", ["-a", "256", "-c", "SHA256SUMS"], { cwd: distDir });

  for (let volume = 1; volume <= 7; volume += 1) {
    const volumeName = `vol${String(volume).padStart(2, "0")}`;
    const firstEpisode = (volume - 1) * 30 + 1;
    const zipName = `prompt-hearts-academy-${volumeName}.zip`;
    const zipPath = path.join(distDir, zipName);
    if (!fs.existsSync(zipPath)) {
      fail(`dist: missing ${zipName}`);
      continue;
    }

    expectCommand("zip", ["-T", zipName], { cwd: distDir });
    const entries = expectCommand("unzip", ["-Z1", zipName], { cwd: distDir })
      .split(/\n/)
      .filter(Boolean);
    const expectedReadme = `${volumeName}/README.md`;
    const expectedEntries = [
      expectedReadme,
      ...Array.from({ length: 30 }, (_, index) => {
        return `${volumeName}/ep${String(firstEpisode + index).padStart(3, "0")}.md`;
      }),
    ];
    const episodeEntries = entries.filter((entry) => new RegExp(`^${volumeName}/ep\\d{3}\\.md$`).test(entry));

    if (entries.join("\n") !== expectedEntries.join("\n")) {
      fail(`${zipName}: expected entries ${expectedEntries.join(", ")}, got ${entries.join(", ")}`);
    }
    if (episodeEntries.length !== 30) {
      fail(`${zipName}: expected 30 episodes, got ${episodeEntries.length}`);
    }

    for (const entry of expectedEntries) {
      if (!entries.includes(entry)) {
        continue;
      }

      const archiveText = expectCommand("unzip", ["-p", zipName, entry], { cwd: distDir });
      const sourceText = read(path.join(projectRoot, entry));
      if (archiveText !== sourceText) {
        fail(`${zipName}: archive entry ${entry} differs from source file`);
      }
    }
  }
}

checkProjectLayout();
checkVolumes();
checkNoExtraMainStoryFiles();
checkMarkdown();
checkTextFileFinalNewlines();
checkVolumeReadmes();
checkOutlines();
checkRootCatalog();
checkSeriesOverview();
checkFinalEpisodeEnding();
checkCompletionDocs();
checkFictionBoundary();
checkDistReadme();
checkReleaseScripts();
checkDist();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({
  status: "ok",
  episodes: 210,
  volumes: 7,
  distributionArchives: 7,
  checks: [
    "project layout exact file set",
    "volume directory exact file set",
    "episode ranges",
    "episode title/navigation/canon memo",
    "episode unique title heading",
    "episode navigation line uniqueness",
    "episode opening scaffold",
    "episode canon memo required fields",
    "episode canon memo field order",
    "episode canon memo unique fields",
    "episode canon memo non-empty fields",
    "episode canon memo terminal placement",
    "episode placeholder markers",
    "episode manuscript minimum length",
    "episode title parity",
    "episode sequential navigation",
    "post-210 episode guard",
    "markdown links",
    "volume README completion markers",
    "volume README exact episode tables",
    "volume README exact episode file cells",
    "volume README non-empty episode role cells",
    "outline episode tables",
    "root catalog",
    "root catalog table row",
    "series overview",
    "series overview volume table",
    "series overview volume table exact rows",
    "final episode ending markers",
    "completion doc final markers",
    "fictional persona boundary markers",
    "root README fiction/AI disclosure markers",
    "volume README/outline fictional persona boundary markers",
    "task guidance final markers",
    "dist release manifest",
    "dist README archive table",
    "release script syntax",
    "release build script markers",
    "release build source selection",
    "release build orchestration",
    "dist exact file set",
    "dist checksum manifest",
    "dist checksum manifest exact formatting",
    "doc stale markers",
    "code fences",
    "trailing whitespace",
    "text file LF line endings",
    "text file final newlines",
    "archive checksums",
    "archive contents",
    "archive source parity",
  ],
}, null, 2));
