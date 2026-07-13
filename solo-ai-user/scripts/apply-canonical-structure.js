#!/usr/bin/env node

"use strict";

// Apply the canonical page structure that scripts/verify-completion.js enforces:
//   - manuscript / README / outline / doc / state H1 shapes and titles
//   - identical top and bottom navigation lines (H1 first, nav as first body line)
//   - volume README table of contents sourced from the outline title tables
// Prose bodies are preserved verbatim; only scaffolding (H1, nav, separators) is rewritten.
// The canonical nav/title strings below are copied from verify-completion.js so the two stay in lockstep.

const fs = require("node:fs");
const path = require("node:path");

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
].map((metadata) => ({ ...metadata, directory: `vol${String(metadata.number).padStart(2, "0")}` }));

const canonicalStateOrder = [
  "capability-tree.md",
  "power-cost-ledger.md",
  "mystery-timeline.md",
  "romance-graph.md",
  "rival-roster.md",
  "ally-payoff-ledger.md",
];

// --- canonical string builders (mirror verify-completion.js) ---

function markdownLink(label, target) {
  return `[${label}](${target})`;
}

function relativeMarkdownLink(fromFile, toFile, fragment = "") {
  let target = path.relative(path.dirname(fromFile), toFile).replaceAll(path.sep, "/");
  if (!target.startsWith("..")) target = `./${target}`;
  return `${target}${fragment}`;
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

// --- outline title source of truth ---

function splitTableRow(line) {
  if (!line.trim().startsWith("|") || !line.trim().endsWith("|")) return [];
  return line.trim().slice(1, -1).split("|").map((cell) => cell.trim());
}

function parseOutlineTitles(outlineFile) {
  const titles = new Map();
  const text = fs.readFileSync(outlineFile, "utf8");
  for (const line of text.split("\n")) {
    const cells = splitTableRow(line);
    if (cells.length < 2) continue;
    const match = cells[0].match(/^`([^`]+\.md)`$/);
    if (match && /^(?:00-prologue|(?:0[1-9]|10)-part\d+-[a-z0-9-]+|11-epilogue)\.md$/.test(match[1])) {
      titles.set(match[1], cells[1].trim());
    }
  }
  return titles;
}

// --- shared body helpers ---

function stripTrailingWhitespace(body) {
  return body.split("\n").map((line) => line.replace(/[ \t]+$/, "")).join("\n");
}

function trimBlankEdges(lines) {
  while (lines.length && lines[0].trim() === "") lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
  return lines;
}

function stripEdgeRules(lines) {
  const isRule = (line) => /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line);
  trimBlankEdges(lines);
  while (lines.length && isRule(lines[0])) { lines.shift(); trimBlankEdges(lines); }
  while (lines.length && isRule(lines[lines.length - 1])) { lines.pop(); trimBlankEdges(lines); }
  return lines;
}

function assemble(h1, navLine, bodyLines) {
  const body = bodyLines.join("\n").replace(/\n{3,}/g, "\n\n");
  return `${h1}\n\n${navLine}\n\n${body}\n\n${navLine}\n`;
}

let changed = 0;
let inspected = 0;

function writeIfChanged(file, next) {
  inspected += 1;
  const current = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  if (current === next) return false;
  fs.writeFileSync(file, next, "utf8");
  changed += 1;
  console.log(`  updated ${path.relative(repoRoot, file)}`);
  return true;
}

// --- manuscripts ---

function buildManuscriptSlots() {
  const slots = [];
  for (const volume of volumes) {
    const titles = parseOutlineTitles(path.join(projectRoot, "outline", volume.outline));
    const dir = path.join(projectRoot, volume.directory);
    const names = fs.readdirSync(dir).filter((n) => n.endsWith(".md") && n !== "README.md");
    const byPosition = new Map();
    for (const name of names) {
      let position = null;
      if (name === "00-prologue.md") position = 0;
      else if (name === "11-epilogue.md") position = 11;
      else {
        const m = name.match(/^(\d{2})-part\d+-/);
        if (m) position = Number(m[1]);
      }
      if (position === null) continue;
      byPosition.set(position, name);
    }
    for (let position = 0; position <= 11; position += 1) {
      const name = byPosition.get(position);
      if (!name) throw new Error(`${volume.directory}: missing manuscript position ${position}`);
      const title = titles.get(name);
      if (!title) throw new Error(`${volume.directory}: no outline title for ${name}`);
      slots.push({
        volume,
        position,
        name,
        title,
        file: path.join(dir, name),
        label: `${String(position).padStart(2, "0")}. ${title}`,
      });
    }
  }
  return slots;
}

function rewriteManuscripts(slots) {
  slots.forEach((slot, index) => {
    const raw = fs.readFileSync(slot.file, "utf8").replace(/\r/g, "");
    const lines = raw.split("\n");
    const kept = [];
    let removedH1 = false;
    for (const line of lines) {
      if (line.includes("../README.md") || line.includes("./README.md")) continue; // nav
      if (!removedH1 && /^#\s+/.test(line)) { removedH1 = true; continue; } // old title
      kept.push(line);
    }
    const bodyLines = stripEdgeRules(kept);
    const previous = index > 0 ? slots[index - 1] : null;
    const next = index < slots.length - 1 ? slots[index + 1] : null;
    const navLine = canonicalManuscriptNavigation({
      previous: previous ? { label: previous.label, target: relativeMarkdownLink(slot.file, previous.file) } : null,
      homeTarget: "../README.md",
      indexTarget: "./README.md",
      next: next ? { label: next.label, target: relativeMarkdownLink(slot.file, next.file) } : null,
    });
    const h1 = `# ${slot.label}`;
    writeIfChanged(slot.file, stripTrailingWhitespace(assemble(h1, navLine, bodyLines)));
  });
}

// --- volume READMEs ---

function rewriteVolumeReadmes(slots) {
  for (const volume of volumes) {
    const volumeSlots = slots.filter((slot) => slot.volume.directory === volume.directory)
      .sort((a, b) => a.position - b.position);
    const navLine = canonicalVolumeNavigation(volume);
    const question = VOLUME_QUESTIONS[volume.directory];
    const rows = volumeSlots.map((slot) => {
      const kind = slot.position === 0 ? "프롤로그" : slot.position === 11 ? "에필로그" : `${slot.position}화`;
      return `| ${kind} | ${markdownLink(slot.label, `./${slot.name}`)} |`;
    });
    const body = [
      `> **핵심 질문**: ${question}`,
      "",
      "## 회차 목록",
      "",
      "| 구분 | 회차 |",
      "| --- | ---- |",
      ...rows,
    ].join("\n");
    const h1 = `# ${volume.number}권 · ${volume.name} (${volume.korean})`;
    const content = `${h1}\n\n${navLine}\n\n${body}\n\n${navLine}\n`;
    writeIfChanged(path.join(projectRoot, volume.directory, "README.md"), stripTrailingWhitespace(content));
  }
}

const VOLUME_QUESTIONS = {
  vol01: "밑바닥의 나는, 힘을 쥐면 무엇부터 바꾸는가?",
  vol02: "능력을 밖으로 꺼낼 때 어떤 흔적을 보존하고 누구의 동의를 구하는가?",
  vol03: "관찰당하는 힘과 기록하는 사람은 서로를 어떻게 믿는가?",
  vol04: "이해하고 싶다는 욕망보다 모델링 거부권이 먼저일 수 있는가?",
  vol05: "추정하지 않고 직접 묻는 사랑은 어떤 위험을 감수하는가?",
  vol06: "관계를 선택하기 전에 상대가 알아야 할 진실은 무엇인가?",
  vol07: "우연히 주운 힘을 독점한 나는 다른 사용자보다 정당한가?",
  vol08: "타인의 agency를 빼앗지 않고 여러 힘을 조정할 수 있는가?",
  vol09: "root 임계치를 넘는 승리는 정말 승리인가?",
  vol10: "선택받지 않았다는 답 뒤에도 나는 수탁자가 될 수 있는가?",
  vol11: "자백 없이도 첫 17분의 책임을 입증할 수 있는가?",
  vol12: "무엇이든 할 수 있는 한 사람 대신 어떤 구조가 힘을 맡아야 하는가?",
};

// --- outlines: insert nav after H1 and at the tail, keep the rest verbatim ---

const NAV_MARKERS = [
  "시리즈 홈", "시리즈홈", "[← 이전 회차:", "[다음 회차:", "[← 이전:", "[다음:",
  "[권 목차]", "[목차]", "[문서 목차]", "[← 이전 문서]", "[다음 문서",
  "[← 이전 권", "[다음 권", "[← 이전 권 설계]", "[다음 권 설계",
  "[← 이전 상태 문서]", "[다음 상태 문서", "[작품 목록](#작품-목록)", "SOLOAI 바로가기",
];

function isNavLine(line) {
  return NAV_MARKERS.some((marker) => line.includes(marker));
}

function reflowWithNav(file, navLine) {
  const raw = fs.readFileSync(file, "utf8").replace(/\r/g, "");
  const lines = raw.split("\n");
  const h1 = lines[0];
  const rest = lines.slice(1).filter((line) => !isNavLine(line));
  const bodyLines = trimBlankEdges(rest);
  const body = bodyLines.join("\n").replace(/\n{3,}/g, "\n\n");
  const content = `${h1}\n\n${navLine}\n\n${body}\n\n${navLine}\n`;
  writeIfChanged(file, stripTrailingWhitespace(content));
}

function rewriteOutlines() {
  for (const volume of volumes) {
    reflowWithNav(path.join(projectRoot, "outline", volume.outline), canonicalOutlineNavigation(volume));
  }
}

function rewriteProjectDocs() {
  const docs = ["README.md", "PRD.md", "BIBLE.md", "TASKS.md"];
  docs.forEach((name, index) => {
    reflowWithNav(path.join(projectRoot, name), canonicalProjectNavigation(docs, index));
  });
}

function rewriteStateDocs() {
  const stateDir = path.join(projectRoot, "state");
  const rank = new Map(canonicalStateOrder.map((name, index) => [name, index]));
  const names = fs.readdirSync(stateDir)
    .filter((name) => name.endsWith(".md"))
    .sort((left, right) => {
      const l = rank.has(left) ? rank.get(left) : canonicalStateOrder.length;
      const r = rank.has(right) ? rank.get(right) : canonicalStateOrder.length;
      return l - r || left.localeCompare(right, "en");
    });
  names.forEach((name, index) => {
    reflowWithNav(path.join(stateDir, name), canonicalStateNavigation(names, index));
  });
}

function rewriteRepoReadme() {
  const file = path.join(repoRoot, "README.md");
  if (!fs.existsSync(file)) return;
  const navLine = `${markdownLink("작품 목록", "#작품-목록")} | ${markdownLink("SOLOAI 바로가기", "./solo-ai-user/README.md")}`;
  reflowWithNav(file, navLine);
}

function main() {
  const slots = buildManuscriptSlots();
  console.log("Rewriting manuscripts...");
  rewriteManuscripts(slots);
  console.log("Rewriting volume READMEs...");
  rewriteVolumeReadmes(slots);
  console.log("Rewriting outlines...");
  rewriteOutlines();
  console.log("Rewriting project docs...");
  rewriteProjectDocs();
  console.log("Rewriting state docs...");
  rewriteStateDocs();
  console.log("Rewriting repo README...");
  rewriteRepoReadme();
  console.log(`\nInspected ${inspected} files, updated ${changed}.`);
}

main();
