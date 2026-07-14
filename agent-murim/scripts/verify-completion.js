#!/usr/bin/env node

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const SERIES_DIR = path.resolve(__dirname, '..');
const REPO_DIR = path.resolve(SERIES_DIR, '..');
const FORBIDDEN_MARKERS = /집필 중|🚧|예정|TODO|TBD/gu;

const MANUSCRIPTS = [
  {
    file: '00-prologue.md',
    h1: '# 프롤로그',
    ending: '프롤로그',
    min: 5_500,
    max: 8_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [다음: 1부 고철곡의 유성 →](./01-part1-scrapyard-meteor.md)',
  },
  {
    file: '01-part1-scrapyard-meteor.md',
    h1: '# 1부',
    ending: '1부',
    min: 12_000,
    max: 18_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 프롤로그](./00-prologue.md) | [다음: 2부 흑시 출도 →](./02-part2-black-market-debut.md)',
  },
  {
    file: '02-part2-black-market-debut.md',
    h1: '# 2부',
    ending: '2부',
    min: 12_000,
    max: 18_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 1부 고철곡의 유성](./01-part1-scrapyard-meteor.md) | [다음: 3부 묵가 입문 →](./03-part3-mukga-discipline.md)',
  },
  {
    file: '03-part3-mukga-discipline.md',
    h1: '# 3부',
    ending: '3부',
    min: 12_000,
    max: 18_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 2부 흑시 출도](./02-part2-black-market-debut.md) | [다음: 4부 인간 증인 →](./04-part4-human-witness.md)',
  },
  {
    file: '04-part4-human-witness.md',
    h1: '# 4부',
    ending: '4부',
    min: 12_000,
    max: 18_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 3부 묵가 입문](./03-part3-mukga-discipline.md) | [다음: 5부 천하공도회 →](./05-part5-tournament-gate.md)',
  },
  {
    file: '05-part5-tournament-gate.md',
    h1: '# 5부',
    ending: '5부',
    min: 12_000,
    max: 18_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 4부 인간 증인](./04-part4-human-witness.md) | [다음: 6부 설가의 검 →](./06-part6-snow-blade-vow.md)',
  },
  {
    file: '06-part6-snow-blade-vow.md',
    h1: '# 6부',
    ending: '6부',
    min: 12_000,
    max: 18_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 5부 천하공도회](./05-part5-tournament-gate.md) | [다음: 7부 심판의 덫 →](./07-part7-tribunal-trap.md)',
  },
  {
    file: '07-part7-tribunal-trap.md',
    h1: '# 7부',
    ending: '7부',
    min: 12_000,
    max: 18_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 6부 설가의 검](./06-part6-snow-blade-vow.md) | [다음: 8부 무저갱 →](./08-part8-bottomless-pit.md)',
  },
  {
    file: '08-part8-bottomless-pit.md',
    h1: '# 8부',
    ending: '8부',
    min: 12_000,
    max: 18_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 7부 심판의 덫](./07-part7-tribunal-trap.md) | [다음: 9부 백야의 진실 →](./09-part9-white-night-truth.md)',
  },
  {
    file: '09-part9-white-night-truth.md',
    h1: '# 9부',
    ending: '9부',
    min: 12_000,
    max: 18_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 8부 무저갱](./08-part8-bottomless-pit.md) | [다음: 10부 최종 결전 →](./10-part10-final-duel.md)',
  },
  {
    file: '10-part10-final-duel.md',
    h1: '# 10부',
    ending: '10부',
    min: 12_000,
    max: 18_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 9부 백야의 진실](./09-part9-white-night-truth.md) | [다음: 에필로그 귀혼곡 →](./11-epilogue.md)',
  },
  {
    file: '11-epilogue.md',
    h1: '# 에필로그',
    ending: '에필로그',
    min: 8_000,
    max: 14_000,
    navigation: '[시리즈홈](./README.md) | [목차](./README.md#목차) | [← 10부 결전](./10-part10-final-duel.md)',
  },
];

function unicodeLength(value) {
  return Array.from(value).length;
}

function paragraphs(text) {
  return text
    .split(/\r?\n[\t ]*\r?\n+/u)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function findDuplicateLongParagraphs(text, min = 120) {
  const counts = new Map();

  for (const paragraph of paragraphs(text)) {
    if (unicodeLength(paragraph) < min) {
      continue;
    }
    counts.set(paragraph, (counts.get(paragraph) ?? 0) + 1);
  }

  return [...counts.entries()]
    .filter(([, occurrences]) => occurrences > 1)
    .map(([paragraph, occurrences]) => ({ paragraph, occurrences }));
}

function findDuplicateManuscriptParagraphs(text, navigation, min = 120) {
  const lines = text.split('\n');
  if (lines[0] === navigation) {
    lines.shift();
  }

  let lastContentIndex = lines.length - 1;
  while (lastContentIndex >= 0 && lines[lastContentIndex] === '') {
    lastContentIndex -= 1;
  }
  if (lines[lastContentIndex] === navigation) {
    lines.splice(lastContentIndex, 1);
  }

  return findDuplicateLongParagraphs(lines.join('\n'), min);
}

function stripBlockquotePrefix(line) {
  let content = line;
  let quoteDepth = 0;

  while (true) {
    const prefix = content.match(/^[\t ]{0,3}>[\t ]?/u);
    if (!prefix) {
      break;
    }
    content = content.slice(prefix[0].length);
    quoteDepth += 1;
  }

  return { content, quoteDepth };
}

function scanMarkdownLines(text) {
  const lines = [];
  let openFence = null;
  let fencedCodeBlocks = 0;
  let offset = 0;

  for (const [index, sourceLine] of text.split('\n').entries()) {
    const raw = sourceLine.endsWith('\r') ? sourceLine.slice(0, -1) : sourceLine;
    const { content, quoteDepth } = stripBlockquotePrefix(raw);
    let inFence = openFence !== null;
    let isFenceBoundary = false;

    if (openFence) {
      const closingFence = content.match(/^(`+|~+)[\t ]*$/u);
      if (
        quoteDepth === openFence.quoteDepth
        && closingFence
        && closingFence[1][0] === openFence.character
        && closingFence[1].length >= openFence.length
      ) {
        isFenceBoundary = true;
        openFence = null;
      }
    } else {
      const openingFence = content.match(/^(`{3,}|~{3,})[^\r\n]*$/u);
      if (openingFence) {
        openFence = {
          character: openingFence[1][0],
          length: openingFence[1].length,
          quoteDepth,
        };
        fencedCodeBlocks += 1;
        inFence = true;
        isFenceBoundary = true;
      }
    }

    lines.push({
      raw,
      content,
      quoteDepth,
      inFence,
      isFenceBoundary,
      lineNumber: index + 1,
      offset,
    });
    offset += sourceLine.length + 1;
  }

  return {
    lines,
    fencedCodeBlocks,
    unterminated: openFence !== null,
  };
}

function visibleMarkdownText(text) {
  return scanMarkdownLines(text).lines
    .map((line) => (line.inFence ? '' : line.raw))
    .join('\n');
}

function decodeComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseLinkTarget(rawTarget) {
  const withoutAngles = rawTarget.startsWith('<') && rawTarget.endsWith('>')
    ? rawTarget.slice(1, -1)
    : rawTarget;
  const suffixIndex = withoutAngles.search(/[?#]/u);
  const rawPath = suffixIndex < 0 ? withoutAngles : withoutAngles.slice(0, suffixIndex);
  const rawSuffix = suffixIndex < 0 ? '' : withoutAngles.slice(suffixIndex);
  const decodedPath = decodeComponent(rawPath);
  const decodedSuffix = decodeComponent(rawSuffix);

  return {
    target: `${decodedPath}${decodedSuffix}`,
    path: decodedPath,
  };
}

function extractMarkdownLinkTargets(text) {
  const visibleText = visibleMarkdownText(text);
  const targets = [];
  const linkStart = /!?\[[^\]\r\n]*\]\(\s*/gu;

  for (const match of visibleText.matchAll(linkStart)) {
    let cursor = match.index + match[0].length;
    if (visibleText[cursor] === '<') {
      const closingAngle = visibleText.indexOf('>', cursor + 1);
      if (closingAngle >= 0 && !visibleText.slice(cursor, closingAngle).includes('\n')) {
        targets.push(visibleText.slice(cursor, closingAngle + 1));
      }
      continue;
    }

    const targetStart = cursor;
    let parenthesisDepth = 0;
    let escaped = false;
    while (cursor < visibleText.length) {
      const character = visibleText[cursor];
      if (character === '\n' || character === '\r') {
        break;
      }
      if (escaped) {
        escaped = false;
        cursor += 1;
        continue;
      }
      if (character === '\\') {
        escaped = true;
        cursor += 1;
        continue;
      }
      if (character === '(') {
        parenthesisDepth += 1;
        cursor += 1;
        continue;
      }
      if (character === ')') {
        if (parenthesisDepth === 0) {
          targets.push(visibleText.slice(targetStart, cursor));
          break;
        }
        parenthesisDepth -= 1;
        cursor += 1;
        continue;
      }
      if (/\s/u.test(character) && parenthesisDepth === 0) {
        targets.push(visibleText.slice(targetStart, cursor));
        break;
      }
      cursor += 1;
    }
  }

  return targets;
}

function extractLocalMarkdownLinkDetails(text) {
  const links = [];
  for (const rawTarget of extractMarkdownLinkTargets(text)) {
    const parsed = parseLinkTarget(rawTarget.trim());
    if (
      parsed.target.startsWith('#')
      || parsed.target.startsWith('//')
      || /^(?:https?:|mailto:|tel:)/iu.test(parsed.target)
      || /^[a-z][a-z\d+.-]*:/iu.test(parsed.target)
    ) {
      continue;
    }
    links.push(parsed);
  }
  return links;
}

function extractLocalMarkdownLinks(text) {
  return extractLocalMarkdownLinkDetails(text).map(({ target }) => target);
}

function expectedNavigation(index) {
  if (!Number.isInteger(index) || index < 0 || index >= MANUSCRIPTS.length) {
    throw new RangeError(`Unknown manuscript index: ${index}`);
  }
  return MANUSCRIPTS[index].navigation;
}

function countFencedCodeBlocks(text) {
  const scan = scanMarkdownLines(text);
  return {
    count: scan.fencedCodeBlocks,
    unterminated: scan.unterminated,
  };
}

function lineNumberAt(text, offset) {
  return text.slice(0, offset).split('\n').length;
}

function validateForbiddenMarkers(label, text) {
  const errors = [];
  FORBIDDEN_MARKERS.lastIndex = 0;
  for (const match of text.matchAll(FORBIDDEN_MARKERS)) {
    errors.push(`[${label}:${lineNumberAt(text, match.index)}] 작성 표식 '${match[0]}'이 남아 있습니다.`);
  }
  return errors;
}

function validateWhitespace(label, text) {
  const errors = [];
  if (!text.endsWith('\n')) {
    errors.push(`[${label}] 파일이 최종 개행으로 끝나지 않습니다.`);
  }

  for (const [index, line] of text.split('\n').entries()) {
    if (/[\t ]+$/u.test(line)) {
      errors.push(`[${label}:${index + 1}] 후행 공백이 있습니다.`);
    }
  }
  return errors;
}

function validateDocumentHygiene(label, text) {
  return [
    ...validateForbiddenMarkers(label, text),
    ...validateWhitespace(label, text),
  ];
}

function validateNavigation(label, text, navigation) {
  const errors = [];
  const lines = text.split('\n');
  const firstLine = lines[0];
  const lastLine = text.endsWith('\n') ? lines.at(-2) : lines.at(-1);

  if (firstLine !== navigation) {
    errors.push(`[${label}:1] 상단 탐색 문자열이 기대값과 다릅니다.`);
  }
  if (lastLine !== navigation) {
    errors.push(`[${label}] 하단 마지막 줄 탐색 문자열이 기대값과 다릅니다.`);
  }
  return errors;
}

function extractMarkdownH1Lines(text) {
  return scanMarkdownLines(text).lines
    .filter((line) => !line.inFence && /^#(?!#)[\t ]+.+$/u.test(line.raw))
    .map((line) => line.raw);
}

function validateEndingBlock(spec, text) {
  const errors = [];
  const endingMarker = `> **${spec.ending} 종료**`;
  const endingLines = scanMarkdownLines(text).lines.filter(
    (line) => !line.inFence && line.raw === endingMarker,
  );
  if (endingLines.length !== 1) {
    errors.push(`[${spec.file}] 종료 표식 '${endingMarker}'은 정확히 독립된 줄 1개여야 합니다. 현재 ${endingLines.length}개입니다.`);
  }

  const markerOffset = endingLines.at(-1)?.offset ?? -1;
  const terminalSeparator = `\n\n---\n\n${spec.navigation}\n`;
  const separatorOffset = text.lastIndexOf(terminalSeparator);
  if (
    markerOffset < 0
    || separatorOffset < markerOffset + endingMarker.length
    || separatorOffset + terminalSeparator.length !== text.length
  ) {
    errors.push(`[${spec.file}] 종료 요약 블록과 마지막 탐색 블록의 형식이 올바르지 않습니다.`);
    return errors;
  }

  const summaryBlock = text.slice(markerOffset + endingMarker.length, separatorOffset);
  const summaryPrefix = '\n>\n> ';
  if (!summaryBlock.startsWith(summaryPrefix) || summaryBlock.slice(summaryPrefix.length).includes('\n')) {
    errors.push(`[${spec.file}] 종료 요약은 한 줄짜리 인용문이어야 합니다.`);
    return errors;
  }

  const summary = summaryBlock.slice(summaryPrefix.length);
  if (summary.trim().length === 0) {
    errors.push(`[${spec.file}] 종료 요약이 비어 있습니다.`);
  }
  return errors;
}

function validateManuscriptContent(spec, text) {
  const errors = [];
  const length = unicodeLength(text);
  if (length < spec.min || length > spec.max) {
    errors.push(`[${spec.file}] 분량 ${length}자가 허용 범위 ${spec.min}~${spec.max}자를 벗어납니다.`);
  }

  const h1Lines = extractMarkdownH1Lines(text);
  if (h1Lines.length !== 1) {
    errors.push(`[${spec.file}] H1이 ${h1Lines.length}개입니다. 정확히 1개여야 합니다.`);
  }
  if (h1Lines.length === 1 && h1Lines[0] !== spec.h1) {
    errors.push(`[${spec.file}] H1 '${h1Lines[0]}'이 기대값 '${spec.h1}'과 다릅니다.`);
  }

  errors.push(...validateEndingBlock(spec, text));

  errors.push(...validateNavigation(spec.file, text, spec.navigation));
  errors.push(...validateWhitespace(spec.file, text));
  errors.push(...validateForbiddenMarkers(spec.file, text));
  errors.push(...validateDuplicateParagraphs(spec.file, text, spec.navigation));
  return errors;
}

function validateDuplicateParagraphs(label, text, navigation) {
  const duplicates = navigation
    ? findDuplicateManuscriptParagraphs(text, navigation)
    : findDuplicateLongParagraphs(text);
  return duplicates.map(({ paragraph, occurrences }) => {
    const preview = paragraph.replace(/\s+/gu, ' ').slice(0, 60);
    return `[${label}] 120자 이상 문단이 ${occurrences}회 완전 중복됩니다: ${preview}…`;
  });
}

function splitLocalTarget(target) {
  return target.split(/[?#]/u, 1)[0];
}

function isWithinRepository(resolvedPath) {
  const relative = path.relative(REPO_DIR, resolvedPath);
  return relative === ''
    || (!path.isAbsolute(relative) && relative !== '..' && !relative.startsWith(`..${path.sep}`));
}

function validateLocalLinks(sourcePath, text, exists = fs.existsSync) {
  const errors = [];
  const label = path.relative(REPO_DIR, sourcePath) || path.basename(sourcePath);
  for (const { target, path: fileTarget } of extractLocalMarkdownLinkDetails(text)) {
    if (!fileTarget) {
      continue;
    }
    const resolved = path.resolve(path.dirname(sourcePath), fileTarget);
    if (!isWithinRepository(resolved)) {
      errors.push(`[${label}] 로컬 링크 '${target}'의 대상이 저장소 밖입니다: ${resolved}`);
      continue;
    }
    if (!exists(resolved)) {
      errors.push(`[${label}] 깨진 로컬 링크 '${target}' (대상: ${resolved})`);
    }
  }
  return errors;
}

function validateCrossFileDuplicates(records, min = 120) {
  const occurrences = new Map();

  for (const { file, text } of records) {
    for (const paragraph of paragraphs(text)) {
      if (unicodeLength(paragraph) < min) {
        continue;
      }
      const locations = occurrences.get(paragraph) ?? [];
      locations.push(file);
      occurrences.set(paragraph, locations);
    }
  }

  const errors = [];
  for (const [paragraph, files] of occurrences) {
    if (files.length < 2 || new Set(files).size < 2) {
      continue;
    }
    const preview = paragraph.replace(/\s+/gu, ' ').slice(0, 60);
    errors.push(`[원고 전체] 120자 이상 문단이 여러 파일에 완전 중복됩니다 (${files.join(', ')}): ${preview}…`);
  }
  return errors;
}

function extractSection(text, heading) {
  const lines = scanMarkdownLines(text).lines;
  const startIndex = lines.findIndex((line) => !line.inFence && line.raw === heading);
  if (startIndex < 0) {
    return '';
  }
  const nextHeadingIndex = lines.findIndex(
    (line, index) => index > startIndex && !line.inFence && /^##(?!#)[\t ]+.+$/u.test(line.raw),
  );
  const endIndex = nextHeadingIndex < 0 ? lines.length : nextHeadingIndex;
  return lines
    .slice(startIndex + 1, endIndex)
    .filter((line) => !line.inFence)
    .map((line) => line.raw)
    .join('\n');
}

function validateSeriesReadme(text) {
  const errors = [];
  const label = 'agent-murim/README.md';
  const visibleText = visibleMarkdownText(text);
  if (!visibleText.includes('**상태**: 완결 (리부트판)')) {
    errors.push(`[${label}] 상태가 '**상태**: 완결 (리부트판)'이 아닙니다.`);
  }

  const toc = extractSection(text, '## 목차');
  if (!toc) {
    errors.push(`[${label}] '## 목차' 섹션을 찾을 수 없습니다.`);
  } else {
    const actualManuscriptLinks = extractLocalMarkdownLinks(toc)
      .map(splitLocalTarget)
      .filter((target) => /^\.\/\d{2}.*\.md$/u.test(target));
    const expectedLinks = MANUSCRIPTS.map(({ file }) => `./${file}`);
    if (
      actualManuscriptLinks.length !== expectedLinks.length
      || actualManuscriptLinks.some((target, index) => target !== expectedLinks[index])
    ) {
      errors.push(`[${label}] 목차 원고 링크가 정확한 12개 파일 순서와 다릅니다.`);
    }

    const rows = toc.split('\n');
    for (const [index, spec] of MANUSCRIPTS.entries()) {
      const order = String(index).padStart(2, '0');
      const row = rows.find((line) => line.startsWith(`| ${order} |`));
      if (!row) {
        errors.push(`[${label}] 목차 ${order}행이 없습니다.`);
        continue;
      }
      if (!row.includes(`](./${spec.file})`) || !/\| 완결 \|$/u.test(row)) {
        errors.push(`[${label}] 목차 ${order}행의 링크 또는 상태 '완결'이 올바르지 않습니다.`);
      }
    }
  }

  errors.push(...validateDocumentHygiene(label, text));
  return errors;
}

function validateRootReadme(text) {
  const errors = [];
  const label = 'README.md';
  const visibleText = visibleMarkdownText(text);

  if (!/!\[Works\]\([^\n)]*작품-8편[^\n)]*\)/u.test(visibleText)) {
    errors.push(`[${label}] 작품 8편 배지 또는 문구가 없습니다.`);
  }
  if (!/!\[Status\]\([^\n)]*상태-8편%20완결[^\n)]*\)/u.test(visibleText)) {
    errors.push(`[${label}] 상태 '8편 완결' 배지가 없습니다.`);
  }
  if (!visibleText.includes('완결작 8편')) {
    errors.push(`[${label}] 소개 문구에 '완결작 8편'이 없습니다.`);
  }

  const worksSection = extractSection(text, '## 작품 목록');
  const workRows = worksSection.split('\n').filter((line) => line.startsWith('| **'));
  if (workRows.length !== 8) {
    errors.push(`[${label}] 작품 목록이 ${workRows.length}행입니다. 정확히 8행이어야 합니다.`);
  }
  const completedRows = workRows.filter((line) => line.includes('| ✅ 완결 |'));
  if (completedRows.length !== 8) {
    errors.push(`[${label}] 작품 목록의 완결 상태가 ${completedRows.length}행입니다. 8행 모두 '✅ 완결'이어야 합니다.`);
  }
  const murimRow = workRows.find((line) => line.includes('**유성검전(에이전트 무림 리부트)**'));
  if (
    !murimRow
    || !murimRow.includes('| ✅ 완결 |')
    || !murimRow.includes('[작품 홈](./agent-murim/README.md)')
  ) {
    errors.push(`[${label}] 유성검전 행의 '✅ 완결' 상태 또는 작품 홈 링크가 올바르지 않습니다.`);
  }

  errors.push(...validateDocumentHygiene(label, text));
  return errors;
}

function displayPath(filePath) {
  const relative = path.relative(REPO_DIR, filePath);
  if (relative === '') {
    return '.';
  }
  if (path.isAbsolute(relative) || relative === '..' || relative.startsWith(`..${path.sep}`)) {
    return filePath;
  }
  return relative;
}

function safeReadDirectory(directoryPath, errors, readDirectory = fs.readdirSync) {
  try {
    return readDirectory(directoryPath, { withFileTypes: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push(`[${displayPath(directoryPath)}] 디렉터리 읽기 오류: ${message}`);
    return null;
  }
}

function safeReadText(filePath, errors, readFile = fs.readFileSync) {
  try {
    return readFile(filePath, 'utf8');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push(`[${displayPath(filePath)}] 파일 읽기 오류: ${message}`);
    return null;
  }
}

function validateCompletion(dependencies = {}) {
  const readDirectory = dependencies.readdirSync ?? fs.readdirSync;
  const readFile = dependencies.readFileSync ?? fs.readFileSync;
  const exists = dependencies.existsSync ?? fs.existsSync;
  const errors = [];
  const expectedFiles = MANUSCRIPTS.map(({ file }) => file).sort();
  const directoryEntries = safeReadDirectory(SERIES_DIR, errors, readDirectory);
  const actualFiles = directoryEntries
    ? directoryEntries
    .filter((entry) => entry.isFile() && /^\d{2}.*\.md$/u.test(entry.name))
    .map((entry) => entry.name)
    .sort()
    : null;

  if (actualFiles) {
    for (const file of expectedFiles) {
      if (!actualFiles.includes(file)) {
        errors.push(`[원고 목록] 필수 원고 '${file}'가 없습니다.`);
      }
    }
    for (const file of actualFiles) {
      if (!expectedFiles.includes(file)) {
        errors.push(`[원고 목록] 예상하지 않은 2자리 원고 '${file}'가 있습니다.`);
      }
    }
  }

  const records = [];
  let fencedCodeBlocks = 0;
  for (const spec of MANUSCRIPTS) {
    const filePath = path.join(SERIES_DIR, spec.file);
    if (!exists(filePath)) {
      if (!actualFiles) {
        errors.push(`[원고 목록] 필수 원고 '${spec.file}'가 없습니다.`);
      }
      continue;
    }
    const text = safeReadText(filePath, errors, readFile);
    if (text === null) {
      continue;
    }
    records.push({ file: spec.file, text });
    const fenceResult = countFencedCodeBlocks(text);
    fencedCodeBlocks += fenceResult.count;
    if (fenceResult.unterminated) {
      errors.push(`[${spec.file}] 미종결 fence 코드블록이 있습니다.`);
    }
    errors.push(...validateManuscriptContent(spec, text));
  }
  if (fencedCodeBlocks > 3) {
    errors.push(`[원고 전체] fence 코드블록이 ${fencedCodeBlocks}개입니다. 3개 이하여야 합니다.`);
  }
  errors.push(...validateCrossFileDuplicates(records));

  const validationFiles = records.map(({ file, text }) => ({
    path: path.join(SERIES_DIR, file),
    text,
  }));

  const seriesReadmePath = path.join(SERIES_DIR, 'README.md');
  const biblePath = path.join(SERIES_DIR, 'BIBLE.md');
  const rootReadmePath = path.join(REPO_DIR, 'README.md');
  for (const requiredPath of [seriesReadmePath, biblePath, rootReadmePath]) {
    if (!exists(requiredPath)) {
      errors.push(`[${path.relative(REPO_DIR, requiredPath)}] 필수 파일이 없습니다.`);
      continue;
    }
    const text = safeReadText(requiredPath, errors, readFile);
    if (text !== null) {
      validationFiles.push({ path: requiredPath, text });
    }
  }

  const seriesReadme = validationFiles.find(({ path: filePath }) => filePath === seriesReadmePath);
  if (seriesReadme) {
    errors.push(...validateSeriesReadme(seriesReadme.text));
  }
  const rootReadme = validationFiles.find(({ path: filePath }) => filePath === rootReadmePath);
  if (rootReadme) {
    errors.push(...validateRootReadme(rootReadme.text));
  }
  const bible = validationFiles.find(({ path: filePath }) => filePath === biblePath);
  if (bible) {
    errors.push(...validateDocumentHygiene('agent-murim/BIBLE.md', bible.text));
  }

  for (const file of validationFiles) {
    errors.push(...validateLocalLinks(file.path, file.text));
  }

  return errors;
}

function runSelfTest() {
  const longParagraph = '중복 검증 문장'.repeat(30);
  const duplicateErrors = validateDuplicateParagraphs(
    'self-test-duplicate.md',
    `${longParagraph}\n\n${longParagraph}\n`,
  );
  assert.ok(duplicateErrors.length > 0, 'long duplicate paragraph must be detected');

  const navigationErrors = validateNavigation(
    'self-test-navigation.md',
    '잘못된 탐색\n본문\n잘못된 탐색\n',
    expectedNavigation(0),
  );
  assert.ok(navigationErrors.length > 0, 'wrong navigation must be detected');

  const linkErrors = validateLocalLinks(
    path.join(REPO_DIR, 'self-test-links.md'),
    '[깨진 링크](./missing-self-test-target.md)\n',
    () => false,
  );
  assert.ok(linkErrors.length > 0, 'broken local link must be detected');

  console.log('Self-test passed');
}

function main() {
  if (process.argv.includes('--self-test')) {
    runSelfTest();
    return;
  }

  const errors = validateCompletion();
  if (errors.length > 0) {
    console.error(`Completion verification failed (${errors.length} errors):`);
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Completion verification passed (${MANUSCRIPTS.length} manuscripts).`);
}

module.exports = {
  unicodeLength,
  findDuplicateLongParagraphs,
  findDuplicateManuscriptParagraphs,
  extractLocalMarkdownLinks,
  expectedNavigation,
  countFencedCodeBlocks,
  validateDocumentHygiene,
  validateEndingBlock,
  extractMarkdownH1Lines,
  extractSection,
  safeReadDirectory,
  safeReadText,
  visibleMarkdownText,
  validateSeriesReadme,
  validateRootReadme,
  validateCompletion,
  validateDuplicateParagraphs,
  validateLocalLinks,
  validateNavigation,
};

if (require.main === module) {
  main();
}
