#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(projectRoot, "..");
const failures = [];

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
    const volumeName = `vol${String(Math.ceil(number / 30)).padStart(2, "0")}`;
    const episodePath = path.join(projectRoot, volumeName, `ep${String(number).padStart(3, "0")}.md`);
    if (!fs.existsSync(episodePath)) {
      fail(`missing episode ${rel(episodePath)}`);
      continue;
    }

    const text = read(episodePath);
    if (!text.startsWith(`# 제 ${number}화:`)) {
      fail(`${rel(episodePath)}: title does not start with "# 제 ${number}화:"`);
    }
    if (!text.includes("[시리즈 홈](../README.md)") || !text.includes("[목차](./README.md)")) {
      fail(`${rel(episodePath)}: missing standard navigation links`);
    }
    if (!text.includes("## Canon Memo")) {
      fail(`${rel(episodePath)}: missing Canon Memo`);
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
  const actualZips = list(distDir).filter((file) => /^prompt-hearts-academy-vol\d{2}\.zip$/.test(file));

  if (actualZips.join("\n") !== expectedZips.join("\n")) {
    fail(`dist: expected ${expectedZips.join(", ")}, got ${actualZips.join(", ")}`);
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
checkMarkdown();
checkRootCatalog();
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
    "markdown links",
    "root catalog",
    "doc stale markers",
    "code fences",
    "trailing whitespace",
    "archive checksums",
    "archive contents",
    "archive source parity",
  ],
}, null, 2));
