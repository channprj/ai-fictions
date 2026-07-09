# 장기 집필 태스크: 나 혼자만 AI 사용자

> 후속 에이전트가 한 번에 한 문서, 한 outline, 한 장면 단위로 작업해도 12권 캐논이 무너지지 않도록 하는 실행 문서다.

## 현재 상태

- `PRD.md`는 12권 마스터 기획을 고정한다.
- `BIBLE.md`는 능력 티어, 인물 말투, 세계 규칙, 금지사항, 장면 엔진을 고정한다.
- `TASKS.md`는 후속 작업 순서와 검수 기준을 담는다.
- `README.md`는 프로젝트 색인과 현재 상태를 담는다.
- `state/`의 5개 추적 파일이 생성되었다(Phase 1 완료).
- `outline/vol01-boot-sequence.md`(1권 outline)가 생성되었다(Phase 2, O2-01 완료).
- `vol01/00-prologue.md`, `vol01/01-part1-boot.md`, `vol01/02-part2-scapegoat.md`, `vol01/03-part3-first-query.md`, `vol01/04-part4-hallucination.md`, `vol01/05-part5-your-call.md`, `vol01/06-part6-overnight.md`, `vol01/07-part7-the-build.md`, `vol01/08-part8-sabotage.md`, `vol01/09-part9-the-pitch.md`, `vol01/10-part10-unexplained.md`, `vol01/README.md`(1권 본편 초고)가 생성되었다(Phase 4, 1권 11/12장). 1권은 outline이 완성돼 있어 본편 초고를 병행 진행한다.
- 남은 일: 2~12권 outline(Phase 2)과 1권 마지막 장 `11-epilogue`(Phase 4)를 병행 진행한다.

## 작업 원칙

- **구조 우선**: 원고를 쓰기 전에 해당 권 outline과 state 파일을 만든다.
- **사이다 규율**: 매 장 도파민 비트 최소 1개, 종류 로테이션, 큰 사이다 앞에는 진짜 벽과 대가.
- **능력 일관성**: 새 능력은 언락 계기와 함께 등장하고, 권당 최소 1회 능력이 실패한다.
- **권리 경계**: 실제 해킹·금융범죄 절차 서술 금지. 방법은 은유, 결과·감정만 서술.
- **작은 단위**: 한 iteration은 한 문서, 한 권 outline, 한 장, 또는 한 state 파일 묶음으로 제한한다.
- **검증 가능성**: 파일 수, 표 행 수, 금지 placeholder 부재, 링크 존재, 제목 규칙처럼 확인 가능한 기준을 남긴다.

## Phase 0: 프로젝트 기반 (완료)

| ID | 태스크 | 산출물 | 완료 기준 |
| -- | ------ | ------ | --------- |
| P0-01 | 마스터 PRD 작성 | `PRD.md` | 12권 목표·능력 규칙·인물·권별 설계·집필 규칙 포함 |
| P0-02 | 시리즈 바이블 작성 | `BIBLE.md` | 능력 티어, 캐스트, 세계 규칙, 금지사항, 장면 엔진 포함 |
| P0-03 | 작업 지시서 작성 | `TASKS.md` | 후속 작업 순서와 검수 기준 포함 |
| P0-04 | 프로젝트 색인 작성 | `README.md` | 핵심 문서 링크와 현재 상태 포함 |

## Phase 1: 상태 추적 기반 (완료)

| ID | 태스크 | 산출물 | 완료 기준 |
| -- | ------ | ------ | --------- |
| S1-01 | 능력 트리 | `state/capability-tree.md` | Tier 1~4 언락 항목과 계기·한계, 권별 배치 |
| S1-02 | 대가 원장 | `state/power-cost-ledger.md` | 큰 능력 사용별 노출·대가 기록 규칙과 초기 표 |
| S1-03 | 로맨스 그래프 | `state/romance-graph.md` | 현우-아린 9단계 사다리와 온도 추적 규칙 |
| S1-04 | 경쟁 유저 명단 | `state/rival-roster.md` | 라이벌 유저·진영·아키텍트의 모델·목적·등장 권 |
| S1-05 | 미스터리 타임라인 | `state/mystery-timeline.md` | 락다운·제로 기원·아린 비밀의 단서→폭로 권별 연결 |

## Phase 2: 권별 outline

각 outline은 `00-prologue`부터 `11-epilogue`까지 12개 장을 포함한다.

| ID | 태스크 | 산출물 | 상태 |
| -- | ------ | ------ | ---- |
| O2-01 | 1권 outline | `outline/vol01-boot-sequence.md` | 완료 |
| O2-02 | 2권 outline | `outline/vol02-first-deploy.md` | 대기 |
| O2-03 | 3권 outline | `outline/vol03-going-viral.md` | 대기 |
| O2-04 | 4권 outline | `outline/vol04-the-unreadable.md` | 대기 |
| O2-05 | 5권 outline | `outline/vol05-date-simulator.md` | 대기 |
| O2-06 | 6권 outline | `outline/vol06-context-overflow.md` | 대기 |
| O2-07 | 7권 outline | `outline/vol07-second-user.md` | 대기 |
| O2-08 | 8권 outline | `outline/vol08-model-war.md` | 대기 |
| O2-09 | 9권 outline | `outline/vol09-jailbreak.md` | 대기 |
| O2-10 | 10권 outline | `outline/vol10-origin-story.md` | 대기 |
| O2-11 | 11권 outline | `outline/vol11-the-architect.md` | 대기 |
| O2-12 | 12권 outline | `outline/vol12-human-in-command.md` | 대기 |

각 outline 완료 기준:

- 권 로그라인과 핵심 질문이 있다.
- 12개 파일명과 장 제목이 있다.
- 각 장에 목적, 중심 벽, 핵심 사건, 도파민 비트 종류, 능력/대가, 엔딩 훅이 있다.
- 최소 1개 메인 사건, 1개 능력 언락, 1개 로맨스 진전/흔들림, 1개 미스터리 떡밥이 표시된다.
- 권말 에필로그가 다음 권의 위협·인물·능력 국면 중 하나를 예고한다.

## Phase 3: 권별 state 갱신

각 권 outline 직후 해당 권 진행을 반영해 `state/` 파일을 갱신한다.

완료 기준:

- `capability-tree`에 해당 권 언락과 한계가 추가된다.
- `power-cost-ledger`에 해당 권 큰 능력 사용과 대가가 기록된다.
- `romance-graph`가 해당 권 관계 단계·온도를 반영한다.
- outline의 장 번호와 state 항목이 서로 연결된다.

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

- 중심 POV 인물 1명이 분명하다(기본 현우).
- Wall, Move, Dopamine Beat, Delta, Hook이 모두 있다.
- 능력 사용에 대가·한계가 함께 나온다.
- 제로 코멘트가 장면을 다시 보게 만들되 감정을 훼손하지 않는다.
- 마지막 300~700자 안에 다음 장을 읽게 하는 훅이 있다.
- 해당 `state/` 파일에 능력·대가·관계 변화가 반영된다.

## Phase 5: 검수와 배포

| ID | 태스크 | 산출물 | 완료 기준 |
| -- | ------ | ------ | --------- |
| R5-01 | 권별 리비전 | 수정 원고 | 도파민 리듬, 능력 일관성, 권리 경계, 반복 피로 검수 |
| R5-02 | 전체 캐논 검산 | 갱신된 `BIBLE.md`, `state/` | 미스터리 떡밥과 능력 성장선 회수 확인 |
| R5-03 | 루트 README 등록 | `../README.md` | 작품 목록에 본작 등재 및 상태 갱신 |

## 회차 브리프 템플릿

```markdown
## volNN chNN 브리프

- 파일:
- 장 목적:
- 중심 POV:
- 이 장의 벽(Wall):
- 대응(Move)과 대가(Cost):
- 도파민 비트 종류:
- 능력 언락 여부:
- 로맨스/미스터리 진전:
- 엔딩 훅:
- state 갱신:
```

## 장면 검수 체크리스트

- 장에 도파민 비트가 최소 1개 있는가.
- 큰 능력 사용에 대가·한계가 붙었는가.
- 능력이 편의상 갑자기 세지지 않았는가(언락 계기가 있는가).
- 현우가 능력 덕분에만 이기지 않고 관찰력·근성·선택이 작동했는가.
- 아린이 예상을 배신하는 순간이 있었는가(등장 시).
- 경쟁 유저·악당이 순수 악으로 소비되지 않았는가.
- 기술 은유가 감정을 선명하게 했는가.
- 실제 범죄 실행 절차를 서술하지 않았는가.

## 구조 검증 명령

기반 문서 검증:

```sh
test -f solo-ai-user/PRD.md
test -f solo-ai-user/BIBLE.md
test -f solo-ai-user/TASKS.md
test -f solo-ai-user/README.md
rg -n "[T]BD|[T]ODO|[F]IXME|작성[[:space:]]예정|미[ ]정" solo-ai-user --glob '*.md'
```

`rg` 명령은 결과가 없어야 한다.

권별 outline 12개가 생성된 뒤 추가 확인:

```sh
find solo-ai-user/outline -maxdepth 1 -type f -name 'vol*.md' | wc -l
```

이 명령은 최종적으로 `12`가 되어야 한다.
