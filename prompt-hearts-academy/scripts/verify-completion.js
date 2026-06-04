#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(projectRoot, "..");
const failures = [];
const volumeMetadata = [
  { title: "첫 번째 프롬프트", outline: "vol01-first-prompt.md" },
  { title: "메모리 페스티벌", outline: "vol02-memory-festival.md" },
  { title: "가드레일의 겨울", outline: "vol03-guardrail-winter.md" },
  { title: "쌍둥이 별의 무대", outline: "vol04-twin-star-stage.md" },
  { title: "컨텍스트 전쟁", outline: "vol05-context-war.md" },
  { title: "잊힌 모델의 묘지", outline: "vol06-model-graveyard.md" },
  { title: "하트 프로토콜", outline: "vol07-heart-protocol.md" },
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
    const episodeTitle = episodeTitleForNumber(number);
    if (!text.startsWith(`# 제 ${number}화:`)) {
      fail(`${rel(episodePath)}: title does not start with "# 제 ${number}화:"`);
    }
    if (!episodeTitle) {
      fail(`${rel(episodePath)}: missing episode title text`);
    }
    if (!text.includes("[시리즈 홈](../README.md)") || !text.includes("[목차](./README.md)")) {
      fail(`${rel(episodePath)}: missing standard navigation links`);
    }
    const navigationLine = text.split(/\n/).find((line) => line.startsWith("[시리즈 홈]"));
    const expectedNavigation = expectedEpisodeNavigationLine(number);
    if (navigationLine !== expectedNavigation) {
      fail(`${rel(episodePath)}: expected navigation "${expectedNavigation}", got "${navigationLine || "<missing>"}"`);
    }
    if (!text.includes("## Canon Memo")) {
      fail(`${rel(episodePath)}: missing Canon Memo`);
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
      if (cells.length !== 4) {
        fail(`${volumeName}/README.md: malformed episode table row ${row}`);
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
    "회차별 이전/다음 내비게이션",
    "node prompt-hearts-academy/scripts/verify-completion.js",
    "node prompt-hearts-academy/scripts/build-dist.js",
  ]);
}

function checkDistReadme() {
  checkRequiredSnippets(path.join(projectRoot, "dist", "README.md"), "prompt-hearts-academy/dist/README.md", [
    "본편 초고 완결 상태를 권별 압축 파일로 묶은 배포용 디렉터리다.",
    "`dist/`에는 이 `README.md`, `SHA256SUMS`, 권별 zip 7개만 둔다.",
    "각 zip은 권별 `README.md` 1개와 회차 원고 30개를 포함한다.",
    "각 zip 내부의 권별 `README.md`와 회차 원고는 현재 원본 파일과 동일해야 한다.",
    "본편 이후 신규 회차 파일은 포함하지 않는다.",
    "[SHA256SUMS](./SHA256SUMS)",
    "`SHA256SUMS`는 권별 zip 7개에 대한 행만 포함한다.",
    "shasum -a 256 -c SHA256SUMS",
    "node prompt-hearts-academy/scripts/build-dist.js",
    "압축본과 원본의 내용 일치까지 포함한 완결 검산 스크립트를 실행한다.",
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

  const checksumText = read(checksums).trimEnd();
  const checksumLines = checksumText ? checksumText.split(/\n/) : [];
  const checksumTargets = [];
  checksumLines.forEach((line, index) => {
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

checkVolumes();
checkNoExtraMainStoryFiles();
checkMarkdown();
checkVolumeReadmes();
checkOutlines();
checkRootCatalog();
checkSeriesOverview();
checkCompletionDocs();
checkDistReadme();
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
    "episode ranges",
    "episode title/navigation/canon memo",
    "episode title parity",
    "episode sequential navigation",
    "post-210 episode guard",
    "markdown links",
    "volume README completion markers",
    "outline episode tables",
    "root catalog",
    "series overview",
    "completion doc final markers",
    "task guidance final markers",
    "dist release manifest",
    "dist exact file set",
    "dist checksum manifest",
    "doc stale markers",
    "code fences",
    "trailing whitespace",
    "archive checksums",
    "archive contents",
    "archive source parity",
  ],
}, null, 2));
