#!/usr/bin/env node

"use strict";

const assert = require("node:assert/strict");
const childProcess = require("node:child_process");
const path = require("node:path");
const test = require("node:test");

const verifier = require("./verify-completion.js");

test("parseArguments accepts strict volume scope and rejects invalid volumes", () => {
  assert.deepEqual(
    verifier.parseArguments(["--strict", "--volume", "vol04"]),
    { selectedVolume: "vol04", strict: true, selfTest: false },
  );
  assert.deepEqual(
    verifier.parseArguments(["--volume=vol12"]),
    { selectedVolume: "vol12", strict: false, selfTest: false },
  );
  assert.throws(
    () => verifier.parseArguments(["--volume", "vol13"]),
    /vol01 through vol12/u,
  );
});

test("expectedFilePattern enforces every canonical manuscript position", () => {
  assert.match("00-prologue.md", verifier.expectedFilePattern(0));
  assert.match("01-part1-arrival-log.md", verifier.expectedFilePattern(1));
  assert.match("10-part10-after-final.md", verifier.expectedFilePattern(10));
  assert.match("11-epilogue.md", verifier.expectedFilePattern(11));
  assert.doesNotMatch("01-part2-wrong-position.md", verifier.expectedFilePattern(1));
  assert.doesNotMatch("10-part10-UPPER.md", verifier.expectedFilePattern(10));
});

test("README and outline metadata normalize one- and two-digit title labels", () => {
  const readme = [
    "| 프롤로그 | [0. 콜백 지옥](./00-prologue.md) |",
    "| 1화 | [01. 아침 배치](./01-part1-morning-race.md) |",
  ].join("\n");
  const outline = [
    "| `00-prologue.md` | 콜백 지옥 | 목적 |",
    "| `01-part1-morning-race.md` | 아침 배치 | 목적 |",
  ].join("\n");

  assert.deepEqual(verifier.parseVolumeReadmeMetadata(readme), [
    { fileName: "00-prologue.md", title: "콜백 지옥" },
    { fileName: "01-part1-morning-race.md", title: "아침 배치" },
  ]);
  assert.deepEqual(verifier.parseOutlineMetadata(outline), [
    { fileName: "00-prologue.md", title: "콜백 지옥" },
    { fileName: "01-part1-morning-race.md", title: "아침 배치" },
  ]);
});

test("inspectMarkdown finds balanced quoted fences and ignores fenced H1s", () => {
  const text = [
    "# 00. 실제 제목",
    "",
    "> ```text",
    "> # 가짜 제목",
    "> [가짜](./missing.md)",
    "> ````",
    "",
  ].join("\n");
  const inspection = verifier.inspectMarkdown(text);

  assert.equal(inspection.unterminated, null);
  assert.equal(inspection.fencedBlocks.length, 1);
  assert.deepEqual(verifier.visibleH1Lines(text), ["# 00. 실제 제목"]);
  assert.deepEqual(verifier.extractLocalMarkdownLinks(text), []);
});

test("canonical manuscript navigation crosses volume boundaries through manuscripts", () => {
  const previous = {
    relativePath: "vol01/11-epilogue.md",
    titleLabel: "11. 다음 로그",
  };
  const current = {
    relativePath: "vol02/00-prologue.md",
    titleLabel: "0. 콜백 지옥",
  };
  const next = {
    relativePath: "vol02/01-part1-morning-race.md",
    titleLabel: "1. 아침 배치",
  };

  assert.equal(
    verifier.canonicalManuscriptNavigation(current, previous, next),
    "[← 이전: 11. 다음 로그](../vol01/11-epilogue.md) | "
      + "[시리즈홈](../README.md) | [목차](./README.md) | "
      + "[다음: 1. 아침 배치 →](./01-part1-morning-race.md)",
  );
});

test("canonical volume navigation points at adjacent volume indexes", () => {
  assert.equal(
    verifier.canonicalVolumeNavigation(1),
    "[시리즈홈](../README.md) | [다음 권 →](../vol02/README.md)",
  );
  assert.equal(
    verifier.canonicalVolumeNavigation(6),
    "[← 이전 권](../vol05/README.md) | [시리즈홈](../README.md) | "
      + "[다음 권 →](../vol07/README.md)",
  );
  assert.equal(
    verifier.canonicalVolumeNavigation(12),
    "[← 이전 권](../vol11/README.md) | [시리즈홈](../README.md)",
  );
});

test("validateDocumentHygiene catches placeholders and byte-format defects", () => {
  const problems = verifier.validateDocumentHygiene(
    "fixture.md",
    "완성 원고  \r\nTODO: 제거",
  );
  assert.ok(problems.some((message) => message.includes("placeholder")));
  assert.ok(problems.some((message) => message.includes("trailing whitespace")));
  assert.ok(problems.some((message) => message.includes("CR/CRLF")));
  assert.ok(problems.some((message) => message.includes("final newline")));
});

test("extractLocalMarkdownLinks preserves balanced parentheses and decodes paths", () => {
  assert.deepEqual(
    verifier.extractLocalMarkdownLinks(
      "[괄호](./chapter(v2).md?view=1#intro) "
        + "[공백](<./My%20File.md#part>) "
        + "[웹](https://example.com)",
    ),
    ["./chapter(v2).md?view=1#intro", "./My File.md#part"],
  );
});

test("unicodeLength matches wc -m style code-point counting", () => {
  assert.equal(verifier.unicodeLength("한글🙂A\n"), 5);
});

test("findDuplicateProse reports exact paragraphs and cross-file token reuse", () => {
  const repeatedParagraph = Array.from(
    { length: 45 },
    (_, index) => `고유단어${index}`,
  ).join(" ");
  const records = [
    { file: "/tmp/a.md", text: `${repeatedParagraph}\n` },
    { file: "/tmp/b.md", text: `${repeatedParagraph}\n` },
  ];
  const result = verifier.findDuplicateProse(records, {
    paragraphMinimumCharacters: 120,
    tokenWindow: 18,
    tokenMinimumCharacters: 60,
  });

  assert.equal(result.exactParagraphs.length, 1);
  assert.ok(result.tokenSequences.length >= 1);
});

test("required canon and status artifacts cover all volume ledgers", () => {
  const artifacts = verifier.requiredArtifactsForVolumes(["vol01", "vol12"]);
  assert.ok(artifacts.includes("PRD.md"));
  assert.ok(artifacts.includes("BIBLE.md"));
  assert.ok(artifacts.includes("state/panel-arc.md"));
  assert.ok(artifacts.includes("state/affection-graph-vol01.md"));
  assert.ok(artifacts.includes("state/misunderstanding-queue-vol12.md"));
});

test("self-test exercises the exported verifier primitives", () => {
  const summary = verifier.runSelfTests();
  assert.equal(summary.status, "ok");
  assert.ok(summary.selfTests >= 10);
});

test("current corpus discovery always covers all twelve volumes", () => {
  const script = path.join(__dirname, "verify-completion.js");
  const result = childProcess.spawnSync(
    process.execPath,
    [script, "--strict"],
    { encoding: "utf8" },
  );

  assert.ok(result.status === 0 || result.status === 1, result.stderr);
  const summary = JSON.parse(result.stdout);
  assert.equal(summary.found.outlines, 12);
  assert.equal(summary.found.volumes, 12);
  assert.equal(summary.found.manuscripts, 144);
});
