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
| [state/affection-graph-vol01.md](./state/affection-graph-vol01.md) | 1권 장별 관계 상태와 권말 핸드오프 |
| [state/misunderstanding-queue-vol01.md](./state/misunderstanding-queue-vol01.md) | 1권 오해 큐, 해소 기한, 2권 이월 메모 |

## 목표 구조

```text
naso-solo-agent-room/
├── README.md
├── PRD.md
├── BIBLE.md
├── TASKS.md
├── outline/
│   ├── vol01-first-impression-build.md
│   └── ...
├── state/
│   ├── affection-graph-vol01.md
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
- 1권 outline과 1권 state 파일 2개가 생성되었고, 2권 이후 outline과 본편 원고는 아직 생성하지 않았다.
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
