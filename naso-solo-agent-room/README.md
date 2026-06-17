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
| [outline/vol07-spec-sheet-lovers.md](./outline/vol07-spec-sheet-lovers.md) | 7권 장별 목적, 고스펙 기수, Codex 조건표 붕괴, LoveMatch 자동 개입 승인 훅 |
| [outline/vol08-deadlock-paradise.md](./outline/vol08-deadlock-paradise.md) | 8권 장별 목적, 다자 교착, Gemini 과적합 붕괴, LoveMatch 자동 미션과 윤아 증거 훅 |
| [outline/vol09-observer-effect.md](./outline/vol09-observer-effect.md) | 9권 장별 목적, 윤아 증거 제시, 패널 책임 인정, 최종 선택 중단과 Act 4 예측 제한 훅 |
| [outline/vol10-zero-shot-hearts.md](./outline/vol10-zero-shot-hearts.md) | 10권 장별 목적, 모태솔로 기수, 빈 모델과 예측 중지, 11권 human review 훅 |
| [outline/vol11-human-in-the-loop.md](./outline/vol11-human-in-the-loop.md) | 11권 장별 목적, 이전 참가자 human review, 패널 락아웃, Codex 예측 제거 패치와 12권 무예측 촬영 훅 |
| [outline/vol12-no-final-algorithm.md](./outline/vol12-no-final-algorithm.md) | 12권 장별 목적, 마지막 기수, 최종 대시보드 중단, 패널 공동 커밋과 선택권 보존 결말 |
| [vol01/00-prologue.md](./vol01/00-prologue.md) | 1권 프롤로그 초고, 관찰실 부팅, LoveMatch 중립 도구 소개, 선우-하린 낮은 성공률 씨앗 |
| [vol01/01-part1-arrival-log.md](./vol01/01-part1-arrival-log.md) | 1권 1장 초고, 하린 POV 입소, 첫 시선 로그, 선우와 도윤의 대비, 첫인상 기록지 훅 |
| [vol01/02-part2-first-choice.md](./vol01/02-part2-first-choice.md) | 1권 2장 초고, 선우 POV 첫인상 선택 실패, 도윤의 공개 선택, Codex 첫 오분류 훅 |
| [vol01/03-part3-dinner-build.md](./vol01/03-part3-dinner-build.md) | 1권 3장 초고, 다정 POV 저녁 준비, 식탁 관계 그래프, M-01-03 정보 허브 오해 씨앗 |
| [vol01/04-part4-introduction-patch.md](./vol01/04-part4-introduction-patch.md) | 1권 4장 초고, 소연 POV 자기소개, 도윤-소연 조건 조합, M-01-02 비교표 오해 씨앗 |
| [vol01/05-part5-night-walk.md](./vol01/05-part5-night-walk.md) | 1권 5장 초고, 하린 POV 밤 산책, 도윤의 빠른 확신, 선우의 지연 비용, M-01-01/M-01-02 심화 |
| [vol01/06-part6-panel-overfit.md](./vol01/06-part6-panel-overfit.md) | 1권 6장 초고, Gemini/관찰실 POV 과적합, 도윤-하린 신호 예측 성공, 선우의 머리끈 탐색 사각지대 훅 |
| [vol01/07-part7-date-ticket.md](./vol01/07-part7-date-ticket.md) | 1권 7장 초고, 민재 POV 데이트권 미션, 다정의 전달자 경계, M-01-03 비용 확정과 선우 데이트권 훅 |
| [vol01/08-part8-silent-commit.md](./vol01/08-part8-silent-commit.md) | 1권 8장 초고, 선우 POV 침묵의 커밋, 데이트권 공개 지연, 머리끈 회수와 M-01-01 해소 지연 훅 |
| [vol01/09-part9-wrong-branch.md](./vol01/09-part9-wrong-branch.md) | 1권 9장 초고, 소연 POV 잘못 탄 브랜치, 도윤의 관리형 친절과 M-01-02 비교 기준 질문 훅 |
| [vol01/10-part10-first-crack.md](./vol01/10-part10-first-crack.md) | 1권 10장 초고, Codex/관찰실 POV 첫 균열, 데이트권 미사용과 숨은 배려 로그 충돌, LoveMatch 추천 제외 훅 |
| [vol01/11-epilogue.md](./vol01/11-epilogue.md) | 1권 에필로그 초고, 선우의 머리끈/메모 콜백, 하린의 직접 질문 전환, LoveMatch 밤 미션 자동 추천 훅 |
| [vol02/00-prologue.md](./vol02/00-prologue.md) | 2권 프롤로그 초고, 하린의 메모 수신 이후 질문권 회수, LoveMatch 밤 미션 추천 재정렬 훅 |
| [vol02/01-part1-morning-race.md](./vol02/01-part1-morning-race.md) | 2권 1장 초고, 다정 POV 아침 식탁 배치, 정보 허브 압력, 하린의 질문 시간 직접 지정 훅 |
| [vol02/02-part2-one-on-one.md](./vol02/02-part2-one-on-one.md) | 2권 2장 초고, 하린 POV 1:1 직접 질문, 선우의 회피 없는 응시와 늦은 응답 훅 |
| [vol02/03-part3-delayed-response.md](./vol02/03-part3-delayed-response.md) | 2권 3장 초고, 선우 POV 늦은 응답, 하린의 현재 행동 요구, 생활 리듬 대화 미션 훅 |
| [vol02/04-part4-spec-talk.md](./vol02/04-part4-spec-talk.md) | 2권 4장 초고, 소연 POV 조건의 대화, 도윤-소연 생활 리듬 호감과 M-02-03 비교 지표 훅 |
| [vol02/05-part5-rumor-packet.md](./vol02/05-part5-rumor-packet.md) | 2권 5장 초고, 다정 POV 소문 패킷, M-02-02 맥락 손실과 정보 허브 윤리 비용 훅 |
| [vol02/06-part6-night-callback.md](./vol02/06-part6-night-callback.md) | 2권 6장 초고, 하린 POV 밤의 콜백, LoveMatch 추천 동선과 하린-도윤 야간 대화, 선우의 지연 반복 훅 |
| [vol02/07-part7-debug-table.md](./vol02/07-part7-debug-table.md) | 2권 7장 초고, 관찰실/GLM POV 디버그 테이블, M-02-02/M-02-04 원인 충돌과 LoveMatch 몰입도 성공 신호 훅 |
| [vol02/08-part8-question-first.md](./vol02/08-part8-question-first.md) | 2권 8장 초고, 하린 POV 질문권 회수, Claude/GLM 해석 충돌, 선우의 현재 응답 중단 훅 |
| [vol02/09-part9-defensive-date.md](./vol02/09-part9-defensive-date.md) | 2권 9장 초고, 소연 POV 방어적 데이트, M-02-03 조건 설명 붕괴와 도윤의 정리 실패 진전 훅 |
| [vol02/10-part10-dead-signal.md](./vol02/10-part10-dead-signal.md) | 2권 10장 초고, 선우 POV 죽은 신호, M-02-01 반복 침묵 비용과 하린의 도윤 밤 미션 카드 훅 |
| [vol02/11-epilogue.md](./vol02/11-epilogue.md) | 2권 에필로그 초고, 백이현/한서윤 POV 재시도 예약, LoveMatch 밤 미션 이상치와 3권 로그 감사 훅 |
| [vol03/00-prologue.md](./vol03/00-prologue.md) | 3권 프롤로그 초고, Codex/관찰실 POV 최종 선택 예측표, LoveMatch `low success / high retention` 모순 훅 |
| [vol03/01-part1-last-breakfast.md](./vol03/01-part1-last-breakfast.md) | 3권 1장 초고, 다정 POV 마지막 아침, 정보 허브 경계와 선우-하린 죽은 신호 유지 훅 |
| [vol03/02-part2-choice-mission.md](./vol03/02-part2-choice-mission.md) | 3권 2장 초고, 한서윤/백이현 POV 선택 미션, LoveMatch 동선 압력과 파라미터 마스킹 훅 |
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
| [state/affection-graph-vol07.md](./state/affection-graph-vol07.md) | 7권 장별 관계 상태, 조건표 붕괴, 관찰 동의, 8권 자동 미션 핸드오프 |
| [state/misunderstanding-queue-vol07.md](./state/misunderstanding-queue-vol07.md) | 7권 오해 큐, 조건 일치율 오독, 카메라 거부, LoveMatch 자동 미션 이월 메모 |
| [state/affection-graph-vol08.md](./state/affection-graph-vol08.md) | 8권 장별 관계 상태, 다자 교착, Gemini 과적합, 9권 증거 제시 핸드오프 |
| [state/misunderstanding-queue-vol08.md](./state/misunderstanding-queue-vol08.md) | 8권 오해 큐, 기다림 루프, 화려한 신호 오독, 자동 미션 이월 메모 |
| [state/affection-graph-vol09.md](./state/affection-graph-vol09.md) | 9권 장별 관계 상태, 선택 가능 상태, 패널 책임 인정, 10권 예측 제한 핸드오프 |
| [state/misunderstanding-queue-vol09.md](./state/misunderstanding-queue-vol09.md) | 9권 오해 큐, 윤아 증거, 패널 로그 재사용, 최종 선택 중단 이월 메모 |
| [state/affection-graph-vol10.md](./state/affection-graph-vol10.md) | 10권 장별 관계 상태, 제로샷 선택 형태, 빈 모델 업데이트, 11권 human review 핸드오프 |
| [state/misunderstanding-queue-vol10.md](./state/misunderstanding-queue-vol10.md) | 10권 오해 큐, 빈 예측 칸, 처음 질투, 경계 학습, 예측 기능 제거 이월 메모 |
| [state/affection-graph-vol11.md](./state/affection-graph-vol11.md) | 11권 장별 사후 관계 상태, 돌아온 참가자 리뷰, 패널 수동 관찰, 12권 무예측 촬영 핸드오프 |
| [state/misunderstanding-queue-vol11.md](./state/misunderstanding-queue-vol11.md) | 11권 오해 큐, 재등장 목적, 실패/비선택 재분류, 패널 락아웃과 최종 대시보드 이월 메모 |
| [state/affection-graph-vol12.md](./state/affection-graph-vol12.md) | 12권 장별 관계 상태, 마지막 기수, 무예측 선택, 패널 공동 커밋과 보호 기능 결말 |
| [state/misunderstanding-queue-vol12.md](./state/misunderstanding-queue-vol12.md) | 12권 오해 큐, 대시보드 없음, 자유 데이트 압력, 침묵 권리, 최종 대시보드 중단 결말 |

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
│   ├── vol07-spec-sheet-lovers.md
│   ├── vol08-deadlock-paradise.md
│   ├── vol09-observer-effect.md
│   ├── vol10-zero-shot-hearts.md
│   ├── vol11-human-in-the-loop.md
│   └── vol12-no-final-algorithm.md
├── state/
│   ├── affection-graph-vol01.md
│   ├── affection-graph-vol02.md
│   ├── affection-graph-vol03.md
│   ├── affection-graph-vol04.md
│   ├── affection-graph-vol05.md
│   ├── affection-graph-vol06.md
│   ├── affection-graph-vol07.md
│   ├── affection-graph-vol08.md
│   ├── affection-graph-vol09.md
│   ├── affection-graph-vol10.md
│   ├── affection-graph-vol11.md
│   ├── affection-graph-vol12.md
│   ├── misunderstanding-queue-vol01.md
│   ├── ...
│   └── misunderstanding-queue-vol12.md
├── vol01/
│   ├── 00-prologue.md
│   ├── 01-part1-arrival-log.md
│   ├── 02-part2-first-choice.md
│   ├── 03-part3-dinner-build.md
│   ├── 04-part4-introduction-patch.md
│   ├── 05-part5-night-walk.md
│   ├── 06-part6-panel-overfit.md
│   ├── 07-part7-date-ticket.md
│   ├── 08-part8-silent-commit.md
│   ├── 09-part9-wrong-branch.md
│   ├── 10-part10-first-crack.md
│   └── 11-epilogue.md
├── vol02/
│   ├── 00-prologue.md
│   ├── 01-part1-morning-race.md
│   ├── 02-part2-one-on-one.md
│   ├── 03-part3-delayed-response.md
│   ├── 04-part4-spec-talk.md
│   ├── 05-part5-rumor-packet.md
│   ├── 06-part6-night-callback.md
│   ├── 07-part7-debug-table.md
│   ├── 08-part8-question-first.md
│   ├── 09-part9-defensive-date.md
│   ├── 10-part10-dead-signal.md
│   └── 11-epilogue.md
├── vol03/
│   ├── 00-prologue.md
│   ├── 01-part1-last-breakfast.md
│   └── 02-part2-choice-mission.md
└── dist/
```

## 현재 상태

- `PRD.md`는 gnhf objective의 마스터 PRD를 그대로 보존한다.
- `BIBLE.md`는 후속 outline과 원고 작성자가 먼저 읽을 고정 캐논이다.
- 1권부터 12권까지 outline이 생성되었다.
- 1권부터 12권까지 state 파일이 생성되었다.
- 1권 `00-prologue.md` 초고가 생성되었다.
- 1권 `01-part1-arrival-log.md` 초고가 생성되었다.
- 1권 `02-part2-first-choice.md` 초고가 생성되었다.
- 1권 `03-part3-dinner-build.md` 초고가 생성되었다.
- 1권 `04-part4-introduction-patch.md` 초고가 생성되었다.
- 1권 `05-part5-night-walk.md` 초고가 생성되었다.
- 1권 `06-part6-panel-overfit.md` 초고가 생성되었다.
- 1권 `07-part7-date-ticket.md` 초고가 생성되었다.
- 1권 `08-part8-silent-commit.md` 초고가 생성되었다.
- 1권 `09-part9-wrong-branch.md` 초고가 생성되었다.
- 1권 `10-part10-first-crack.md` 초고가 생성되었다.
- 1권 `11-epilogue.md` 초고가 생성되었다.
- 2권 `00-prologue.md` 초고가 생성되었다.
- 2권 `01-part1-morning-race.md` 초고가 생성되었다.
- 2권 `02-part2-one-on-one.md` 초고가 생성되었다.
- 2권 `03-part3-delayed-response.md` 초고가 생성되었다.
- 2권 `04-part4-spec-talk.md` 초고가 생성되었다.
- 2권 `05-part5-rumor-packet.md` 초고가 생성되었다.
- 2권 `06-part6-night-callback.md` 초고가 생성되었다.
- 2권 `07-part7-debug-table.md` 초고가 생성되었다.
- 2권 `08-part8-question-first.md` 초고가 생성되었다.
- 2권 `09-part9-defensive-date.md` 초고가 생성되었다.
- 2권 `10-part10-dead-signal.md` 초고가 생성되었다.
- 2권 `11-epilogue.md` 초고가 생성되었다.
- 3권 `00-prologue.md` 초고가 생성되었다.
- 3권 `01-part1-last-breakfast.md` 초고가 생성되었다.
- 3권 `02-part2-choice-mission.md` 초고가 생성되었다.
- 다음 본편 초고는 3권 `03-part3-sunwoo-harin.md`다.
- 1권 배포본은 아직 생성하지 않았다.
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
