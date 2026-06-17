# 장기 집필 태스크: 나는 SOLO: 에이전트 관찰실

> 후속 에이전트가 한 번에 한 문서, 한 outline, 한 장면 단위로 작업해도 12권 캐논이 무너지지 않도록 하는 실행 문서다.

## 현재 상태

- `PRD.md`는 gnhf objective의 마스터 PRD를 보존한다.
- `BIBLE.md`는 패널 말투, 세계 규칙, 금지사항, 장면 엔진을 고정한다.
- `outline/vol01-first-impression-build.md`는 생성되었다.
- `outline/vol02-callback-night.md`는 생성되었다.
- `outline/vol03-final-selection-crash.md`는 생성되었다.
- `outline/vol04-legacy-heart-migration.md`는 생성되었다.
- `outline/vol05-dependency-graph.md`는 생성되었다.
- `outline/vol06-refactor-your-name.md`는 생성되었다.
- `outline/vol07-spec-sheet-lovers.md`는 생성되었다.
- `outline/vol08-deadlock-paradise.md`는 생성되었다.
- `outline/vol09-observer-effect.md`는 생성되었다.
- `outline/vol10-zero-shot-hearts.md`는 생성되었다.
- `outline/vol11-human-in-the-loop.md`는 생성되었다.
- `outline/vol12-no-final-algorithm.md`는 생성되었다.
- `state/affection-graph-vol01.md`와 `state/misunderstanding-queue-vol01.md`는 생성되었다.
- `state/affection-graph-vol02.md`와 `state/misunderstanding-queue-vol02.md`는 생성되었다.
- `state/affection-graph-vol03.md`와 `state/misunderstanding-queue-vol03.md`는 생성되었다.
- `state/affection-graph-vol04.md`와 `state/misunderstanding-queue-vol04.md`는 생성되었다.
- `state/affection-graph-vol05.md`와 `state/misunderstanding-queue-vol05.md`는 생성되었다.
- `state/affection-graph-vol06.md`와 `state/misunderstanding-queue-vol06.md`는 생성되었다.
- `state/affection-graph-vol07.md`와 `state/misunderstanding-queue-vol07.md`는 생성되었다.
- `state/affection-graph-vol08.md`와 `state/misunderstanding-queue-vol08.md`는 생성되었다.
- `state/affection-graph-vol09.md`와 `state/misunderstanding-queue-vol09.md`는 생성되었다.
- `state/affection-graph-vol10.md`와 `state/misunderstanding-queue-vol10.md`는 생성되었다.
- `state/affection-graph-vol11.md`와 `state/misunderstanding-queue-vol11.md`는 생성되었다.
- `state/affection-graph-vol12.md`와 `state/misunderstanding-queue-vol12.md`는 생성되었다.
- 1권 `00-prologue.md` 초고는 생성되었다.
- 1권 `01-part1-arrival-log.md` 초고는 생성되었다.
- 1권 `02-part2-first-choice.md` 초고는 생성되었다.
- 1권 `03-part3-dinner-build.md` 초고는 생성되었다.
- 1권 `04-part4-introduction-patch.md` 초고는 생성되었다.
- 1권 `05-part5-night-walk.md` 초고는 생성되었다.
- 1권 `06-part6-panel-overfit.md`부터의 본편 원고와 배포본은 아직 생성하지 않았다.
- 후속 작업은 `PRD.md`와 `BIBLE.md`를 먼저 읽은 뒤 진행한다.

## 작업 원칙

- **구조 우선**: 원고를 쓰기 전에 해당 권 outline과 관계 상태 파일을 만든다.
- **인간 장면 우선**: 패널 코미디는 인간 참가자 감정을 더 선명하게 만들 때만 둔다.
- **권리 경계 유지**: 실제 방송 회차, 실제 출연자, 실제 제작진, 실제 방송 대사를 쓰지 않는다.
- **작은 단위**: 한 iteration은 한 문서, 한 권 outline, 한 장, 또는 한 state 파일 묶음으로 제한한다.
- **검증 가능성**: 파일 수, 표 행 수, 금지 placeholder 부재, 링크 존재, 제목 규칙처럼 확인 가능한 기준을 남긴다.

## Phase 0: 프로젝트 기반

| ID | 태스크 | 산출물 | 완료 기준 |
| -- | ------ | ------ | --------- |
| P0-01 | PRD 보존 | `PRD.md` | gnhf prompt의 PRD 본문이 프로젝트 루트에 존재 |
| P0-02 | 시리즈 바이블 작성 | `BIBLE.md` | 패널 5명, 인간 축 4명, 세계 규칙, 금지사항, 장면 엔진 포함 |
| P0-03 | 작업 지시서 작성 | `TASKS.md` | 후속 작업 순서와 검수 기준 포함 |
| P0-04 | 프로젝트 색인 작성 | `README.md` | 핵심 문서 링크와 현재 상태 포함 |

## Phase 1: 상태 추적 기반

| ID | 태스크 | 산출물 | 완료 기준 |
| -- | ------ | ------ | --------- |
| S1-01 | 상태 디렉터리 생성 | `state/` | Git 추적 가능한 상태 파일 포함 |
| S1-02 | 패널 아크 매트릭스 | `state/panel-arc.md` | 패널별 12권 관점 붕괴와 업데이트 3회 이상 배치 |
| S1-03 | 제작 미스터리 타임라인 | `state/production-mystery-timeline.md` | LoveMatch 개입 단서, 폭로, 제한 결말이 권별로 연결 |
| S1-04 | 캐논 업데이트 대기열 | `state/continuity-notes.md` | 새 설정 승인 전 기록 규칙 포함 |

## Phase 2: 권별 outline

각 outline은 `00-prologue`부터 `11-epilogue`까지 12개 장을 포함한다.

| ID | 태스크 | 산출물 |
| -- | ------ | ------ |
| O2-01 | 1권 outline | `outline/vol01-first-impression-build.md` |
| O2-02 | 2권 outline | `outline/vol02-callback-night.md` |
| O2-03 | 3권 outline | `outline/vol03-final-selection-crash.md` |
| O2-04 | 4권 outline | `outline/vol04-legacy-heart-migration.md` |
| O2-05 | 5권 outline | `outline/vol05-dependency-graph.md` |
| O2-06 | 6권 outline | `outline/vol06-refactor-your-name.md` |
| O2-07 | 7권 outline | `outline/vol07-spec-sheet-lovers.md` |
| O2-08 | 8권 outline | `outline/vol08-deadlock-paradise.md` |
| O2-09 | 9권 outline | `outline/vol09-observer-effect.md` |
| O2-10 | 10권 outline | `outline/vol10-zero-shot-hearts.md` |
| O2-11 | 11권 outline | `outline/vol11-human-in-the-loop.md` |
| O2-12 | 12권 outline | `outline/vol12-no-final-algorithm.md` |

각 outline 완료 기준:

- 권 로그라인과 감정 질문이 있다.
- 12개 파일명과 장 제목이 있다.
- 각 장에 목적, 중심 갈등, 핵심 사건, 패널 로그, 엔딩 훅이 있다.
- 최소 2개 로맨스 축, 1개 오해 축, 1개 패널 성장 축, 1개 제작 시스템 떡밥이 표시된다.
- 권말 에필로그가 다음 권의 참가자, 시스템, 패널 갈등 중 하나를 예고한다.

## Phase 3: 권별 state 파일

각 권 outline 직후 다음 파일을 만든다.

```text
state/
├── affection-graph-volNN.md
└── misunderstanding-queue-volNN.md
```

완료 기준:

- `affection-graph`는 주요 참가자 간 초기 감정 방향을 포함한다.
- `misunderstanding-queue`는 오해 id, 원인, 누락 정보, 해소 기한, 대가를 포함한다.
- outline의 장 번호와 state의 deadline이 서로 연결된다.

## Phase 4: 본편 초고

각 권은 다음 구조를 따른다.

```text
volNN/
├── 00-prologue.md
├── 01-part1-{slug}.md
├── 02-part2-{slug}.md
├── ...
├── 10-part10-{slug}.md
└── 11-epilogue.md
```

장별 완료 기준:

- 중심 POV 인물 1명이 분명하다.
- Human Scene, Pressure Device, Panel Turn, Emotional Delta, Hook이 모두 있다.
- DRAFT 테스트를 통과한다.
- 관찰실 장면은 요약이 아니라 해석 충돌을 만든다.
- 마지막 300~700자 안에 다음 장을 읽게 하는 훅이 있다.
- 장 끝 또는 별도 state 파일에 Affection Graph와 Misunderstanding Queue 변화가 반영된다.

## Phase 5: 검수와 배포

| ID | 태스크 | 산출물 | 완료 기준 |
| -- | ------ | ------ | --------- |
| R5-01 | 권별 리비전 | 수정 원고 | 감정 질문, 패널 오류, 권리 경계, 반복 피로 검수 |
| R5-02 | 전체 캐논 검산 | 갱신된 `BIBLE.md`, `state/` | LoveMatch 떡밥과 패널 성장선 회수 확인 |
| R5-03 | 배포본 생성 | `dist/` | 권별 zip 12개, 합본 zip, `SHA256SUMS`, 배포 안내 |

## 회차 브리프 템플릿

```markdown
## volNN chNN 브리프

- 파일:
- 장 목적:
- 중심 POV:
- 시작 욕망:
- 시작 두려움:
- Pressure Device:
- 패널 해석 충돌:
- 관계 변화:
- 엔딩 훅:
- state 갱신:
```

## 장면 검수 체크리스트

- 장 시작과 끝 사이 최소 한 관계의 온도가 바뀌었는가.
- 참가자가 말이 아니라 행동으로 선택했는가.
- 오해가 우연이 아니라 누락 정보에서 발생했는가.
- 패널 중 최소 1명은 자기 해석의 한계를 드러냈는가.
- 기술 은유가 감정을 선명하게 했는가.
- Grok의 농담이 존재 비하가 아니라 허세 또는 자기기만을 겨냥했는가.
- Claude가 안전을 이유로 선택권을 빼앗지 않았는가.
- Codex가 줄거리 요약만 하지 않았는가.
- Gemini가 만능 탐지기로 쓰이지 않았는가.
- GLM이 개인의 용기를 구조로만 환원하지 않았는가.

## 구조 검증 명령

현재 기반 문서만 검증할 때:

```sh
test -f naso-solo-agent-room/PRD.md
test -f naso-solo-agent-room/BIBLE.md
test -f naso-solo-agent-room/TASKS.md
test -f naso-solo-agent-room/README.md
rg -n "[T]BD|[T]ODO|[F]IXME|작성[[:space:]]예정|미[ ]정" naso-solo-agent-room --glob '*.md'
```

`rg` 명령은 결과가 없어야 한다.

권별 outline 12개가 생성된 뒤 추가로 확인할 기준:

```sh
find naso-solo-agent-room/outline -maxdepth 1 -type f -name 'vol*.md' | wc -l
rg -n '^\\| `0[0-9]-|^\\| `1[01]-' naso-solo-agent-room/outline
```

첫 명령은 `12`가 되어야 하고, 두 번째 명령은 outline 표의 144개 장 행을 확인하는 용도로 사용한다.
