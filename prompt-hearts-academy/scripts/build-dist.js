#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const expectedVolumes = 7;
const episodesPerVolume = 30;

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || projectRoot,
    encoding: "utf8",
    stdio: options.stdio || "pipe",
  });

  if (result.error) {
    throw new Error(`${command}: ${result.error.message}`);
  }

  if (result.status !== 0) {
    const output = `${result.stdout || ""}${result.stderr || ""}`.trim();
    throw new Error(`${command} ${args.join(" ")} failed${output ? `: ${output}` : ""}`);
  }

  return result.stdout || "";
}

function assertFile(relativePath) {
  const fullPath = path.join(projectRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`missing required distribution source: ${relativePath}`);
  }
  return relativePath;
}

function volumeFiles(volume) {
  const volumeName = `vol${String(volume).padStart(2, "0")}`;
  const firstEpisode = (volume - 1) * episodesPerVolume + 1;
  const files = [assertFile(`${volumeName}/README.md`)];

  for (let offset = 0; offset < episodesPerVolume; offset += 1) {
    const episode = String(firstEpisode + offset).padStart(3, "0");
    files.push(assertFile(`${volumeName}/ep${episode}.md`));
  }

  return { volumeName, files };
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function buildArchive(volume) {
  const { volumeName, files } = volumeFiles(volume);
  const zipName = `prompt-hearts-academy-${volumeName}.zip`;
  const zipPath = path.join(distDir, zipName);

  fs.rmSync(zipPath, { force: true });
  run("zip", ["-X", "-q", path.join("dist", zipName), ...files]);
  run("zip", ["-T", zipName], { cwd: distDir });

  return zipName;
}

function main() {
  fs.mkdirSync(distDir, { recursive: true });

  const archives = [];
  for (let volume = 1; volume <= expectedVolumes; volume += 1) {
    archives.push(buildArchive(volume));
  }

  const checksumLines = archives.map((archive) => {
    return `${sha256(path.join(distDir, archive))}  ${archive}`;
  });
  fs.writeFileSync(path.join(distDir, "SHA256SUMS"), `${checksumLines.join("\n")}\n`);

  run("node", [path.join("scripts", "verify-completion.js")]);

  console.log(JSON.stringify({
    status: "ok",
    archives,
    checksums: "dist/SHA256SUMS",
  }, null, 2));
}

main();
