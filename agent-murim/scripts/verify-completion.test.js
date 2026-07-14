const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const {
  unicodeLength,
  findDuplicateLongParagraphs,
  findDuplicateManuscriptParagraphs,
  extractLocalMarkdownLinks,
  validateLocalLinks,
  expectedNavigation,
  countFencedCodeBlocks,
  validateDocumentHygiene,
  validateEndingBlock,
  extractMarkdownH1Lines,
  extractSection,
  safeReadDirectory,
  safeReadText,
  validateSeriesReadme,
  validateRootReadme,
} = require('./verify-completion.js');

test('unicodeLength counts Unicode code points in Korean and emoji text', () => {
  assert.equal(unicodeLength('한글🙂A'), 4);
  assert.equal(unicodeLength('검⚔️'), 3);
});

test('findDuplicateLongParagraphs reports exact duplicate paragraphs at least 120 code points long', () => {
  const longParagraph = `${'가'.repeat(119)}🙂`;
  const shortParagraph = '짧은 문단';
  const text = [
    longParagraph,
    shortParagraph,
    longParagraph,
    shortParagraph,
  ].join('\n\n');

  assert.deepEqual(findDuplicateLongParagraphs(text), [
    { paragraph: longParagraph, occurrences: 2 },
  ]);
});

test('findDuplicateManuscriptParagraphs excludes repeated boundary navigation from prose duplication', () => {
  const navigation = `[시리즈홈](${'n'.repeat(130)})`;
  const bodyParagraph = '본문'.repeat(60);
  const text = [
    navigation,
    '',
    bodyParagraph,
    '',
    bodyParagraph,
    '',
    navigation,
    '',
  ].join('\n');

  assert.deepEqual(findDuplicateManuscriptParagraphs(text, navigation), [
    { paragraph: bodyParagraph, occurrences: 2 },
  ]);
});

test('extractLocalMarkdownLinks returns decoded local targets while excluding anchors and external schemes', () => {
  const text = [
    '[원고](./01-part1.md#첫-장면)',
    '[자료](<../shared/My File.md>)',
    '[인코딩](./자료%20목록.md#항목)',
    '[앵커](#목차)',
    '[웹](https://example.com/book)',
    '[웹2](http://example.com/book)',
    '[메일](mailto:writer@example.com)',
    '[전화](tel:+821012345678)',
  ].join('\n');

  assert.deepEqual(extractLocalMarkdownLinks(text), [
    './01-part1.md#첫-장면',
    '../shared/My File.md',
    './자료 목록.md#항목',
  ]);
});

test('local Markdown links preserve balanced parentheses and split suffixes before decoding paths', () => {
  assert.deepEqual(
    extractLocalMarkdownLinks('[괄호](./chapter(v2).md?view=1#intro) [공백](<./My File.md#part>)'),
    ['./chapter(v2).md?view=1#intro', './My File.md#part'],
  );

  const resolvedPaths = [];
  const errors = validateLocalLinks(
    path.resolve(__dirname, '..', 'README.md'),
    '[인코딩](./chapter%23draft.md?mode=raw#top)',
    (resolved) => {
      resolvedPaths.push(resolved);
      return true;
    },
  );
  assert.deepEqual(errors, []);
  assert.equal(path.basename(resolvedPaths[0]), 'chapter#draft.md');
});

test('validateLocalLinks rejects paths outside the repository even when they exist', () => {
  const errors = validateLocalLinks(
    path.resolve(__dirname, '..', 'README.md'),
    '[탈출](../../../../etc/passwd)',
    () => true,
  );

  assert.match(errors.join('\n'), /저장소 밖/u);
});

test('expectedNavigation returns exact navigation for the first, middle, and last manuscripts', () => {
  assert.equal(
    expectedNavigation(0),
    '[시리즈홈](./README.md) | [목차](./README.md#목차) | [다음: 1부 고철곡의 유성 →](./01-part1-scrapyard-meteor.md)',
  );
  assert.equal(
    expectedNavigation(6),
    '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 5부 천하공도회](./05-part5-tournament-gate.md) | [다음: 7부 심판의 덫 →](./07-part7-tribunal-trap.md)',
  );
  assert.equal(
    expectedNavigation(11),
    '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 10부 결전](./10-part10-final-duel.md)',
  );
});

test('countFencedCodeBlocks counts opening fences and reports an unterminated block', () => {
  const twoBlocks = [
    '```js',
    'const marker = "~~~";',
    '~~~',
    '```',
    '',
    '~~~text',
    '두 번째 블록',
    '~~~~',
    '',
  ].join('\n');
  assert.deepEqual(countFencedCodeBlocks(twoBlocks), {
    count: 2,
    unterminated: false,
  });

  assert.deepEqual(countFencedCodeBlocks('```js\nconst open = true;\n'), {
    count: 1,
    unterminated: true,
  });

  assert.deepEqual(countFencedCodeBlocks('> ```js\n> const quoted = true;\n> ````\n'), {
    count: 1,
    unterminated: false,
  });
});

test('Markdown inspection ignores H1 and local links inside ordinary and blockquote fences', () => {
  const text = [
    '```md',
    '# 가짜 H1',
    '[가짜 링크](./missing-one.md)',
    '```',
    '> ~~~md',
    '> # 두 번째 가짜 H1',
    '> [두 번째 가짜 링크](./missing-two.md)',
    '> ~~~~',
    '# 실제 H1',
    '[실제 링크](./real.md)',
    '',
  ].join('\n');

  assert.deepEqual(extractMarkdownH1Lines(text), ['# 실제 H1']);
  assert.deepEqual(extractLocalMarkdownLinks(text), ['./real.md']);
});

test('extractSection only recognizes real line-level H2 headings outside fences', () => {
  const fencedOnly = [
    '```md',
    '## 목차',
    '| 00 | [가짜](./00-prologue.md) | 완결 |',
    '```',
    '## 작품 정보',
    '본문',
    '',
  ].join('\n');
  assert.equal(extractSection(fencedOnly, '## 목차'), '');

  const realSection = `${fencedOnly}\n## 목차\n| 실제 목차 |\n\n## 다음\n`;
  assert.equal(extractSection(realSection, '## 목차').trim(), '| 실제 목차 |');
});

test('validateDocumentHygiene catches BIBLE markers, trailing whitespace, and a missing final newline', () => {
  const errors = validateDocumentHygiene(
    'agent-murim/BIBLE.md',
    '완료된 설정  \nTODO: 제거',
  );

  assert.equal(errors.length, 3);
  assert.match(errors.join('\n'), /TODO/u);
  assert.match(errors.join('\n'), /후행 공백/u);
  assert.match(errors.join('\n'), /최종 개행/u);
});

test('validateEndingBlock rejects a blank summary and accepts a non-empty one-line summary', () => {
  const spec = {
    file: '01-part1-scrapyard-meteor.md',
    ending: '1부',
    navigation: expectedNavigation(1),
  };
  const blankSummary = [
    '> **1부 종료**',
    '>',
    '> ',
    '',
    '---',
    '',
    spec.navigation,
    '',
  ].join('\n');
  const completeSummary = [
    '> **1부 종료**',
    '>',
    '> 유성은 첫 조각을 지키고 흑시로 향한다.',
    '',
    '---',
    '',
    spec.navigation,
    '',
  ].join('\n');

  assert.match(validateEndingBlock(spec, blankSummary).join('\n'), /비어/u);
  assert.deepEqual(validateEndingBlock(spec, completeSummary), []);
});

test('validateEndingBlock rejects an ending marker embedded in a prose line', () => {
  const spec = {
    file: '01-part1-scrapyard-meteor.md',
    ending: '1부',
    navigation: expectedNavigation(1),
  };
  const embeddedMarker = [
    '본문 끝 > **1부 종료**',
    '>',
    '> 유성은 첫 조각을 지키고 흑시로 향한다.',
    '',
    '---',
    '',
    spec.navigation,
    '',
  ].join('\n');

  assert.match(validateEndingBlock(spec, embeddedMarker).join('\n'), /독립된 줄/u);
});

test('safe I/O wrappers accumulate path-specific read errors and return control to the caller', () => {
  const errors = [];
  const denied = () => {
    throw new Error('permission denied');
  };

  assert.equal(safeReadDirectory('/virtual/series', errors, denied), null);
  assert.equal(safeReadText('/virtual/series/BIBLE.md', errors, denied), null);
  assert.equal(errors.length, 2);
  assert.match(errors[0], /\/virtual\/series/u);
  assert.match(errors[0], /permission denied/u);
  assert.match(errors[1], /BIBLE\.md/u);
  assert.match(errors[1], /permission denied/u);

  assert.equal(safeReadText('/virtual/series/README.md', errors, () => 'ok\n'), 'ok\n');
});

test('validateSeriesReadme does not accept completion status hidden inside a fence', () => {
  const text = [
    '```md',
    '**상태**: 완결 (리부트판)',
    '```',
    '',
    '## 목차',
    '',
  ].join('\n');

  assert.match(validateSeriesReadme(text).join('\n'), /상태가 .*아닙니다/u);
});

test('validateRootReadme does not accept badges or completion copy hidden inside a fence', () => {
  const text = [
    '```md',
    '![Works](https://img.shields.io/badge/작품-8편-informational)',
    '![Status](https://img.shields.io/badge/상태-8편%20완결-green)',
    '완결작 8편',
    '```',
    '',
    '## 작품 목록',
    '',
  ].join('\n');
  const errors = validateRootReadme(text).join('\n');

  assert.match(errors, /작품 8편 배지 또는 문구가 없습니다/u);
  assert.match(errors, /상태 '8편 완결' 배지가 없습니다/u);
  assert.match(errors, /소개 문구에 '완결작 8편'이 없습니다/u);
});
