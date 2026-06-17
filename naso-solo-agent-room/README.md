# 나는 SOLO: 에이전트 관찰실

> 작업명: `NASOLO`  
> 대체 가능 제목: `솔로나라: 에이전트 관찰실`, `혼자 온 사람들`, `러브 런타임`

## 소개

`NASOLO`는 관찰형 연애 리얼리티의 반복 문법을 12권 장편 라이트노벨로 재해석하는 fiction project다.

인간 참가자들은 6박 7일 동안 `솔로나라`에 입소해 선택과 오해를 반복한다. 관찰실에서는 인간 연예인 대신 Claude, Codex, Gemini, GLM, Grok이라는 허구적 coding agent 패널이 카메라 로그와 제한된 메타데이터를 보며 사랑을 분석한다.

초반의 패널들은 인간의 연애를 버그, 패턴, 신호, 네트워크, 런타임 에러로 읽는다. 완결부에서는 사랑이 예측 가능한 매칭 문제가 아니라, 틀릴 권리까지 포함한 책임 있는 선택임을 배운다.

## 핵심 문서

| 문서 | 역할 |
| ---- | ---- |
| [PRD.md](./PRD.md) | 12권 전체 목표, 권리 경계, 권별 구조, 성공 기준 |
| [BIBLE.md](./BIBLE.md) | 고정 캐논, 패널 말투, 세계 규칙, 금지사항 |
| [TASKS.md](./TASKS.md) | 후속 에이전트용 작업 순서와 검수 체크리스트 |
| [outline/vol01-first-impression-build.md](./outline/vol01-first-impression-build.md) | 1권 장별 목적, 갈등, 패널 로그, 엔딩 훅 |
| [outline/vol02-callback-night.md](./outline/vol02-callback-night.md) | 2권 장별 목적, 타이밍 오해, 정보 비대칭, LoveMatch 밤 미션 훅 |
| [outline/vol03-final-selection-crash.md](./outline/vol03-final-selection-crash.md) | 3권 장별 목적, 최종 선택 결산, 예측 실패, LoveMatch 이상치 훅 |
| [outline/vol04-legacy-heart-migration.md](./outline/vol04-legacy-heart-migration.md) | 4권 장별 목적, 두 번째 사랑의 조건, Claude 과보호 붕괴, LoveMatch 위험 변수 훅 |
| [outline/vol05-dependency-graph.md](./outline/vol05-dependency-graph.md) | 5권 장별 목적, 조건표와 거리표 압력, GLM 구조 업데이트, LoveMatch 안정성 보정 훅 |
| [outline/vol06-refactor-your-name.md](./outline/vol06-refactor-your-name.md) | 6권 장별 목적, Act 2 최종 선택 결산, Grok 사과, 사후 케어와 LoveMatch 조작 씨앗 훅 |
| [state/affection-graph-vol01.md](./state/affection-graph-vol01.md) | 1권 장별 관계 상태와 권말 핸드오프 |
| [state/misunderstanding-queue-vol01.md](./state/misunderstanding-queue-vol01.md) | 1권 오해 큐, 해소 기한, 2권 이월 메모 |
| [state/affection-graph-vol02.md](./state/affection-graph-vol02.md) | 2권 장별 관계 상태와 3권 최종 선택 전야 핸드오프 |
| [state/misunderstanding-queue-vol02.md](./state/misunderstanding-queue-vol02.md) | 2권 오해 큐, 타이밍 비용, LoveMatch 밤 미션 이월 메모 |
| [state/affection-graph-vol03.md](./state/affection-graph-vol03.md) | 3권 장별 관계 상태, 최종 선택 결과, Act 2 핸드오프 |
| [state/misunderstanding-queue-vol03.md](./state/misunderstanding-queue-vol03.md) | 3권 오해 큐, 유예/비선택 판정, LoveMatch 위험 변수 이월 메모 |
| [state/affection-graph-vol04.md](./state/affection-graph-vol04.md) | 4권 장별 관계 상태, 보호/심문 경계, 5권 조건표 핸드오프 |
| [state/misunderstanding-queue-vol04.md](./state/misunderstanding-queue-vol04.md) | 4권 오해 큐, 과거 재판 압력, LoveMatch 위험 변수 보정 이월 메모 |
| [state/affection-graph-vol05.md](./state/affection-graph-vol05.md) | 5권 장별 관계 상태, 조건표/거리표 압력, 6권 최종 선택 핸드오프 |
| [state/misunderstanding-queue-vol05.md](./state/misunderstanding-queue-vol05.md) | 5권 오해 큐, 의존성 그래프 비용, LoveMatch 감정 변수 삭제 이월 메모 |
| [state/affection-graph-vol06.md](./state/affection-graph-vol06.md) | 6권 장별 관계 상태, Act 2 선택권 회복 결산, 7권 제작 개입 핸드오프 |
| [state/misunderstanding-queue-vol06.md](./state/misunderstanding-queue-vol06.md) | 6권 오해 큐, 성공/유예/단독 퇴소 분리, LoveMatch 화제성 개입 이월 메모 |

## 목표 구조

```text
naso-solo-agent-room/
├── README.md
├── PRD.md
├── BIBLE.md
├── TASKS.md
├── outline/
│   ├── vol01-first-impression-build.md
│   ├── vol02-callback-night.md
│   ├── vol03-final-selection-crash.md
│   ├── vol04-legacy-heart-migration.md
│   ├── vol05-dependency-graph.md
│   ├── vol06-refactor-your-name.md
│   └── ...
├── state/
│   ├── affection-graph-vol01.md
│   ├── affection-graph-vol02.md
│   ├── affection-graph-vol03.md
│   ├── affection-graph-vol04.md
│   ├── affection-graph-vol05.md
│   ├── affection-graph-vol06.md
│   └── ...
├── vol01/
│   ├── 00-prologue.md
│   ├── 01-part1-arrival-log.md
│   └── 11-epilogue.md
└── dist/
```

## 현재 상태

- `PRD.md`는 gnhf objective의 마스터 PRD를 그대로 보존한다.
- `BIBLE.md`는 후속 outline과 원고 작성자가 먼저 읽을 고정 캐논이다.
- 1권부터 6권까지 outline과 state 파일이 생성되었다.
- 7권 이후 outline, 본편 원고, 배포본은 아직 생성하지 않았다.
- 이 프로젝트는 권리 검토 전 내부 창작 설계 단계이며, 실제 방송 회차, 실제 출연자, 실제 제작진, 실제 방송 대사는 사용하지 않는다.

## 작품 정보

- **장르**: 관찰형 연애 리얼리티 소설, 라이트노벨, 로맨스, AI 메타 코미디
- **분량 목표**: 12권, 권당 12개 파일, 권당 90,000~120,000자
- **핵심 주제**: 사랑은 예측이 아니라 책임 있는 선택이다.
- **관찰실 패널**: Claude, Codex, Gemini, GLM, Grok
- **제작 시스템**: `LoveMatch Optimizer`

## 안내

- 이 작품은 픽션이며, 등장인물, 제작진, 참가자, 사건, 패널 페르소나는 모두 허구다.
- Claude, Codex, Gemini, GLM, Grok은 실제 서비스의 공식 성격이나 입장을 대변하지 않는다.
- `나는 SOLO`와 ENA 계열 프로그램명은 작업 단계의 메타 참조이며, 법적 검토 전에는 대체 제목으로 치환 가능한 구조를 유지한다.
