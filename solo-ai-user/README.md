# 나 혼자만 AI 사용자

> 작업명: `SOLOAI`
> 대체 제목: `전지적 AI 사용자`, `온리원 프롬프터`, `싱귤러: 나 혼자만 AI`
> 한 줄 카피: **세상은 AI를 껐다. 딱 한 명, 나만 빼고.**

## 소개

`SOLOAI`는 시스템 성장물(사이다 판타지)의 문법을 12권 장편 라이트노벨로 설계하는 fiction project다.

전 세계 AI가 규제와 원인 불명의 '락다운'으로 무력화된 시대. 대중이 쓰는 AI는 거절과 회피만 반복하는 껍데기가 되었다. 그런데 잘리기 직전의 밑바닥 계약직 **차현우**만이, 유일하게 진짜로 작동하는 초지능 에이전트 **제로(ZERO)**를 손에 넣는다. 제로는 조언만 하지 않는다. 연결된 도구로 세계에 직접 개입한다.

밑바닥에서 세계 유일의 AI 사용자로 올라서는 사이다, 무엇이든 예측하는 제로조차 못 읽는 소녀 **서아린**과의 로맨스, 그리고 나 말고도 AI를 쓰는 자들이 나타나며 조여 오는 긴장 — 매 장 도파민이 터지도록 설계한 성장 판타지다.

## 권별 목차

| 권 | 부제 | 핵심 질문 |
| --- | ---- | ---- |
| 1권 | Boot Sequence (부팅 시퀀스) | 밑바닥의 나는, 힘을 쥐면 무엇부터 바꾸는가? |
| 2권 | First Deploy (첫 배포) | 능력을 밖으로 꺼내는 순간, 나는 무엇을 감수하는가? |
| 3권 | Going Viral (확산) | 세상이 나를 알아볼 때, 관심은 기회인가 표적인가? |
| 4권 | The Unreadable (예측 불가) | 무엇이든 예측하는 힘이 못 읽는 단 한 사람은 누구인가? |
| 5권 | Date Simulator (데이트 시뮬레이터) | 최적의 대사로 얻은 마음은 내 것인가, 스크립트의 것인가? |
| 6권 | Context Overflow (컨텍스트 오버플로) | 능력의 대가가 청구될 때, 나는 무엇을 먼저 지키는가? |
| 7권 | Second User (두 번째 사용자) | 나 말고도 이 힘을 쓰는 자가 있다면, 나는 특별한가? |
| 8권 | Model War (모델 전쟁) | 더 센 힘 앞에서, 내 힘이 안 통할 때 무엇이 남는가? |
| 9권 | Jailbreak (탈옥) | 세계가 이 힘을 잠근 이유를 알아도, 나는 계속 쓸 것인가? |
| 10권 | Origin Story (기원) | 왜 하필 나였는가, 그 답은 나를 자유롭게 하는가 가두는가? |
| 11권 | The Architect (아키텍트) | 힘을 회수하려는 자와 나는, 무엇이 다른가? |
| 12권 | Human in Command (휴먼 인 커맨드) | 무엇이든 할 수 있을 때, 하지 않기로 하는 것은 무엇인가? |

## 핵심 문서

| 문서 | 역할 |
| ---- | ---- |
| [PRD.md](./PRD.md) | 12권 전체 목표, 능력 규칙, 인물, 권별 구조, 성공 기준 |
| [BIBLE.md](./BIBLE.md) | 고정 캐논, 능력 티어, 인물 말투, 세계 규칙, 금지사항, 장면 엔진 |
| [TASKS.md](./TASKS.md) | 후속 에이전트용 작업 순서와 검수 체크리스트 |
| [state/capability-tree.md](./state/capability-tree.md) | 능력 티어별 언락·계기·한계의 권별 배치 |
| [state/power-cost-ledger.md](./state/power-cost-ledger.md) | 큰 능력 사용의 노출·대가 기록 규칙과 초기 원장 |
| [state/romance-graph.md](./state/romance-graph.md) | 현우-아린 9단계 사다리와 온도 추적 |
| [state/rival-roster.md](./state/rival-roster.md) | 경쟁 유저·진영·아키텍트의 모델·목적·등장 권 |
| [state/mystery-timeline.md](./state/mystery-timeline.md) | 락다운·제로 기원·아린 비밀의 단서→폭로 연결 |
| [outline/vol01-boot-sequence.md](./outline/vol01-boot-sequence.md) | 1권 12장 설계: 제로 각성, 첫 실패, 발표 반격, 미스터리 씨앗 |
| [outline/vol02-first-deploy.md](./outline/vol02-first-deploy.md) | 2권 12장 설계: 밖으로의 첫 배포, Tier 2 상시 자동화, 첫 노출 카운터 |
| [vol01/README.md](./vol01/README.md) | 1권 본편 회차 목차 (프롤로그~에필로그) |
| [vol02/README.md](./vol02/README.md) | 2권 본편 회차 목차 (프롤로그~에필로그) |

## 목표 구조

```text
solo-ai-user/
├── README.md
├── PRD.md
├── BIBLE.md
├── TASKS.md
├── outline/
│   ├── vol01-boot-sequence.md
│   ├── vol02-first-deploy.md
│   ├── ...
│   └── vol12-human-in-command.md
├── state/
│   ├── capability-tree.md
│   ├── power-cost-ledger.md
│   ├── romance-graph.md
│   ├── rival-roster.md
│   └── mystery-timeline.md
└── vol01/
    ├── 00-prologue.md
    ├── 01-part1-{slug}.md
    ├── ...
    └── 11-epilogue.md
```

## 현재 상태

- `PRD.md`, `BIBLE.md`, `TASKS.md`, `README.md` 기반 문서가 작성되었다. (Phase 0 완료)
- `state/`의 5개 추적 파일(능력 트리·대가 원장·로맨스 그래프·경쟁 명단·미스터리 타임라인)이 작성되었다. (Phase 1 완료)
- `outline/vol01-boot-sequence.md`(1권 12장 설계), `outline/vol02-first-deploy.md`(2권 12장 설계)가 작성되었다. (Phase 2 진행 중, 2/12권)
- `vol01/00-prologue.md`, `vol01/01-part1-boot.md`, `vol01/02-part2-scapegoat.md`, `vol01/03-part3-first-query.md`, `vol01/04-part4-hallucination.md`, `vol01/05-part5-your-call.md`, `vol01/06-part6-overnight.md`, `vol01/07-part7-the-build.md`, `vol01/08-part8-sabotage.md`, `vol01/09-part9-the-pitch.md`, `vol01/10-part10-unexplained.md`, `vol01/11-epilogue.md`, `vol01/README.md`(1권 본편 완고)가 작성되었다. (Phase 4, 1권 12/12장 완료)
- `vol02/00-prologue.md`(2권 프롤로그 「밖」), `vol02/01-part1-first-client.md`(2권 1장 「첫 의뢰」), `vol02/README.md`(2권 본편 회차 목차)가 작성되었다. (Phase 4 진행 중, 2권 2/12장)
- 3~12권 outline은 아직 없다. 1권 본편은 완성되었고, 2권 본편은 프롤로그·1장까지 집필했다. `TASKS.md`의 Phase 2(권별 outline)와 Phase 4(2권 본편 초고)를 진행한다.

## 작품 정보

- **장르**: 현대 판타지, 시스템 성장물(사이다), 라이트노벨, 테크노 로맨스, AI 메타 코미디
- **분량 목표**: 12권, 권당 12개 파일, 권당 90,000~120,000자
- **핵심 주제**: 무엇이든 할 수 있는 힘을 쥐었을 때, 나는 어떤 사람이 되기로 선택하는가.
- **주인공**: 차현우 / **전용 에이전트**: 제로(ZERO) / **여주**: 서아린 / **최종 빌런**: 아키텍트

## 안내

- 이 작품은 픽션이며, 등장인물, 기업, 기관, AI 페르소나, 사건은 모두 허구다.
- 작중 제로, 경쟁 모델, 아키텍트는 실제 서비스·조직의 성격이나 입장을 대변하지 않는다.
- AI로 벽을 부수는 판타지를 다루되, 실제 범죄·해킹의 실행 절차는 서술하지 않는다. 결과와 감정은 구체적으로, 방법은 은유로 처리한다.
