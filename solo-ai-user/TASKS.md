# 장기 집필 태스크: 나 혼자만 AI 사용자

[← 이전 문서](./BIBLE.md) | [시리즈 홈](./README.md) | [문서 목차](./README.md#핵심-문서)

> 12권 144회 원고를 파일 수가 아니라 정경·인과·분량·내비게이션·독자 재미까지 검증 가능한 완결 상태로 만드는 실행 문서다.

## 현재 감사 상태

2026-07-14 최종 감사 스냅샷이다. 이후 원고나 계약을 바꾸면 아래 숫자를 기대값으로 고정하지 말고 검증 명령의 최신 출력을 다시 기록한다.

- 핵심 문서 `README.md`, `PRD.md`, `BIBLE.md`, `TASKS.md`가 존재한다.
- `outline/`에 12권 설계 문서가 존재한다.
- `vol01/`부터 `vol12/`까지 12개 권과 권별 README가 존재한다.
- 프롤로그·본편 10회·에필로그 구성으로 정확히 144개 원고가 존재한다.
- 핵심 문서·6개 state·12개 outline·12개 권별 README·144개 원고, 총 178개 Markdown에 동일한 상단·하단 내비게이션이 적용되어 있다.
- 검증기 구문 검사와 자체 테스트 **179개**가 통과했다.
- `state/episode-manifest.json`은 정경 순서 144/144 레코드이며, outline binding 144/144·WAGER·SCAR·SEED·ALLY 수명주기와 N01~N12 payoff를 통과했다.
- 전체 strict 게이트는 `status: ok`, 실패 0, 경고 0, strict 승격 경고 0이다.
- 정규화 동일 문장·12토큰 연쇄·여러 회차 7토큰 연쇄·shingle 장면 유사도는 모두 0건이다.
- 전권 수동 독회와 독립 재감수는 캐논·권 경계·인과·인물 agency·로맨스·미스터리·COVENANT·감정 보상을 다시 확인했다. 1권 계약 인과와 2권 경계, 11~12권 클라이맥스 압축의 최종 판정은 Blocker 0 / Major 0 / Minor 0이다.
- 프로젝트 상태는 **전 12권 144회 완결**이다.

## Episode manifest 선행 게이트

`state/episode-manifest.json`은 개작 결과를 나중에 요약하는 파일이 아니라 원고보다 먼저 확정할 144회 외부 계약이다. 배열은 정경 순서의 `V01E00`~`V12E11` 정확히 144개 항목으로 구성하며 각 항목은 아래 최상위 스키마를 사용한다.

```json
{
  "id": "V01E00",
  "file": "vol01/00-prologue.md",
  "title": "원고 H1과 같은 제목",
  "storyRole": "Load/위협 선행",
  "genre": "직장 생존·입찰전",
  "pov": "차현우",
  "arena": "구체 사건장",
  "choice": "POV 인물의 비가역 선택",
  "zeroMode": "tier1-read",
  "failureType": { "class": "오염 데이터", "manifestation": "장면 속 발현" },
  "TRACE": { "Trace": 1, "Resource": 1, "Agency": 0, "Connection": 0, "Externality": 0, "status": "open" },
  "humanMove": "ZERO가 대신할 수 없는 인간의 한 수",
  "dopamine": "의도한 reader effect",
  "hook": "다음 압력",
  "stateDelta": { "capability": "능력·권한 변화", "mystery": "공개·보류 사실", "relationship": "동의·접근권·관계 변화" },
  "relay": "Reward 또는 SCAR가 다음 Want·Adversary를 만드는 인과",
  "relayTo": "V01E01",
  "seeds": [{ "id": "M-01-01", "action": "plant", "deadline": "V10E03" }],
  "allyRelay": [{ "node": "N01", "stage": "seed", "choice": "독립 선택", "cost": "현우가 치른 비용" }],
  "WAGER": { "id": "G01-A", "mode": "initiate", "stake": "구체 지분" },
  "SCAR": { "id": "S01-00", "change": "지속 변화", "status": "open", "closeBy": "V01E02" }
}
```

고정 수명주기:

- `id`·`file`·`title`은 권·회차 위치, 프로젝트 루트 기준 실제 정경 경로, 원고 H1·outline·권 README와 각각 일치한다.
- `zeroMode`는 `off|manual|tier1-read|tier2-reversible|tier3-counterfactual|tier4-orchestrate|root`만 쓴다. 세부 권한 축은 `stateDelta.capability`에 기록한다.
- `failureType`은 비어 있지 않은 `{ class, manifestation }` 객체다. `class`는 `오염 데이터|운영·Goodhart|적대적 정보오염|접근권·블랙스완|사회적 수행성|자원 붕괴|상대 적응|다중 에이전트 충돌|외부효과·정당성|자기참조·정체성|권한 회수|정답 없는 규범 문제`만 허용한다. `TRACE`는 다섯 축 0~3 정수와 `open|paid|transformed` 상태를 모두 가진다.
- `seeds[].action`은 `plant|advance|payoff`, `allyRelay[].stage`는 `seed|advance|payoff`, `WAGER.mode`는 `initiate|inherit|advance|resolve`다. 실천·제도화의 중간 진전은 `advance`로 통합하며, 같은 ID·node의 선행 단계 없이 진전·회수하지 않는다.
- manifest는 144개 레코드의 최상위 JSON 배열이며 정경 회차 순서를 바꾸지 않는다. 최상위·중첩 객체에 임의 필드를 추가하지 않고 `stateDelta`는 정확히 `capability|mystery|relationship` 세 비어 있지 않은 문자열을 가진다. 세 값은 `능력:|미스터리:|관계:`로 시작하고, 변화 없는 축을 사건 보상으로 대신하지 않는다.
- `state/mystery-timeline.md`의 모든 `SEED:ID`를 정확히 한 번 plant하고 기한까지 payoff한다. 각 ALLY node도 1~10권의 정확히 한 seed와 12권의 정확히 한 payoff를 가지며 그 사이는 `advance`만 쓴다.
- `SCAR.status`가 `open`이면 `closeBy`는 현재보다 1~2회 뒤의 정경 episode ID다. 같은 SCAR ID를 기한까지 `paid|transformed`로 닫고, 닫힌 레코드의 `closeBy`는 `null`로 둔다. 단일 객체 스키마에서는 서로 다른 open SCAR가 같은 `closeBy`를 공유하지 않으며, 동시 비용은 한 인과적 SCAR로 묶는다.
- 비종결 회차는 `hook`·`relay`가 비어 있지 않고 `relayTo`가 정확한 다음 episode ID다. `V12E11`만 `hook: null`, `relayTo: null`이며 WAGER를 resolve하고 SCAR를 `paid|transformed`로 닫는다.
- manifest의 ID·경로·제목·스키마·수명주기 strict 검증을 통과하기 전에는 원고 개작을 시작하지 않는다.

## 캐논 우선순위

충돌이 생기면 다음 순서로 판단한다.

1. `PRD.md`: 독자 약속, 12권 구조, 완결 불변식
2. `BIBLE.md`: 세계 규칙, 인물 말투, 금지사항, 장면 인과 엔진
3. `state/`: 능력·TRACE·미스터리·로맨스·라이벌·ALLY payoff 상태
4. 해당 권 `outline/`: 권 사건과 회차별 설계
5. 원고: 상위 문서와 정합해야 하는 실제 서사

원고가 상위 캐논과 충돌하면 원고를 보존 대상으로 간주하지 않는다. 독자 재미와 인과를 살리는 쪽으로 장면을 다시 설계한다.

## 고정 완료 정의

작품 완결은 다음 조건을 모두 만족할 때만 선언한다.

### 구조와 분량

- 12개 outline, 12개 권별 README, 144개 원고가 정확한 이름으로 존재한다.
- 프롤로그·에필로그는 각 5,000자 이상, 01~10 본편은 각 8,000자 이상이다.
- 각 권 원고 본문 합계는 90,000자 이상이다.
- 전체 원고가 12권 연속 서사로 읽히며 압축 개요나 장면 메모처럼 보이는 회차가 없다.

### 내비게이션과 문서

- 모든 읽기 대상 Markdown의 상단·하단 내비게이션이 동일하다.
- 첫 원고는 이전 회차 링크가 없고, 최종 에필로그는 다음 회차 링크가 없다.
- 권 경계의 이전·다음 링크가 실제 직전·다음 원고를 가리킨다.
- 로컬 링크와 fragment가 모두 존재하고, outline·권별 README·원고 제목이 일치한다.
- README·PRD·BIBLE·TASKS·state가 실제 집필 상태와 같은 캐논을 사용한다.

### 회차 인과와 상태

- 144회차 모두 위 고정 스키마의 `storyRole`·`genre`·`pov`·`arena`·`choice`·`zeroMode`·`failureType`·`TRACE`·`humanMove`·`dopamine`·`hook`·`stateDelta`·`relay`·`relayTo`·`seeds`·`allyRelay`·`WAGER`·`SCAR`가 정경 순서로 등록되고, outline의 기계 판독 계약과 일치한다.
- 비종결 회차의 Reward 또는 SCAR가 다음 회차 Want·Adversary를 실제로 발생시킨다.
- 열린 SCAR는 정해진 회차 안에 `paid` 또는 `transformed`로 닫힌다.
- `vol12/11-epilogue.md`만 `episode RELAY: terminal`, `relayTo: null`을 사용한다.
- N01~N12는 현우에게 진 빚이 아니라 각 공동체의 독립 이유로 12권에 참여하고, 자기 분야에서 현우에게도 거부권을 행사할 수 있다.

### 캐논과 독자 품질

- ZERO의 능력은 Tier × data scope × action permission × confidence × human approval의 결합으로만 작동한다.
- root는 Tier 5가 아니며, 결말에 재결합 불가능한 승인 권한으로 분해된다.
- Opacity Key는 은신·삭제가 아니라 비동의 개인 모델링 거부권이다. ZERO는 아린 개인 모델을 한 번도 만들지 않는다.
- 아린은 2권 원본 보존, 3권 공동 조사, 4권 경계 존중, 5권 CASE A 침해와 접근권 회수, 6권 상호 합의 연애, 7~12권 독립 역할과 공동 책임의 순서를 지킨다.
- 현우는 선택받은 계승자가 아니며 분실된 ZERO 시드를 우연히 주운 첫 합법 로컬 보유자다.
- 서혜진의 자백 하나가 진실이나 승리를 만들지 않는다. 첫 17분은 포렌식·원본 아카이브·권한 영수증·수탁자 증언으로 독립 입증한다.
- 정규화 동일 문장 중복, 12토큰 연쇄 중복, 여러 회차에 재사용된 7토큰 연쇄, shingle 유사도 기반 장면 템플릿 반복 검사를 모두 통과한다.
- 수동 독회에서 각 회차에 존재 이유, 인물 선택, 장면 변화, 다음 회차를 읽게 하는 힘이 확인된다.

## 권별 완료 기록

manifest 선행 게이트를 통과한 뒤 고정 실패 종과 인간 승리형을 기준으로 전권을 개작했다. 아래 본문 수치는 내비게이션·제목·코드블록을 제외한 최종 strict 산출값이다.

| 권 | 고정 실패 종 | 본문 글자 수 | 완료 상태 |
| --: | ------------ | -----------: | --------- |
| 1 | 오염 데이터 | 110,429 | strict·수동 독회 통과 |
| 2 | 운영·Goodhart | 98,678 | strict·수동 독회 통과 |
| 3 | 적대적 정보오염 | 95,109 | strict·수동 독회 통과 |
| 4 | 접근권·블랙스완 | 99,855 | strict·수동 독회 통과 |
| 5 | 사회적 수행성 | 99,080 | strict·수동 독회 통과 |
| 6 | 자원 붕괴 | 98,293 | strict·수동 독회 통과 |
| 7 | 상대 적응 | 98,434 | strict·수동 독회 통과 |
| 8 | 다중 에이전트 충돌 | 98,178 | strict·수동 독회 통과 |
| 9 | 외부효과·정당성 | 96,401 | strict·수동 독회 통과 |
| 10 | 자기참조·정체성 | 99,763 | strict·수동 독회 통과 |
| 11 | 권한 회수 | 99,616 | strict·수동 독회 통과 |
| 12 | 정답 없는 규범 문제 | 97,794 | strict·수동 독회 통과 |

분량을 채우기 위한 반복 장면을 추가하지 않는다. 장면 확장은 새 선택, 적의 새 수, 관계의 새 비용, 독립 증거, 회수되는 복선 중 하나 이상을 만들어야 한다.

## 권별 실행 순서

후속 개정이 생기면 각 권에 아래 순서를 반복한다.

1. `PRD.md`와 `BIBLE.md`의 해당 권 불변식을 읽는다.
2. state 6개 문서와 해당 권 outline을 읽는다.
3. 직전 권 에필로그, 대상 권 12회, 다음 권 프롤로그를 이어 읽는다.
4. 대상 권 12개 manifest 항목을 고정 스키마로 먼저 작성하고 ID·`file`·`title`·수명주기를 검증한다.
5. 대상 권 strict 게이트를 실행해 분량·링크·중복·제목 실패를 기록한다.
6. manifest에 고정한 실패 종, 인간 승리형, 관계·미스터리 공개 순서를 검산한다.
7. 각 회차를 WAGER → SCAR → episode RELAY 인과로 개작한다.
8. 개작으로 계약 변경이 필요하면 먼저 상위 캐논과 manifest를 검토하고, 승인된 영구 상태를 state와 manifest에 함께 반영한다.
9. 대상 권 strict 게이트를 다시 실행한다.
10. 직전·다음 권 경계와 N01~N12 씨앗을 수동 검산한다.
11. 전체 strict 게이트를 실행해 다른 권의 중복·링크·캐논 회귀가 없는지 확인한다.

## 검증 명령

저장소 루트에서 실행한다.

검증기 자체 테스트:

```sh
node solo-ai-user/scripts/verify-completion.js --self-test
```

기대 결과는 최신 검증기의 `status: ok`다. 자체 테스트 개수는 검증기와 함께 늘거나 줄 수 있으므로 이 문서의 역사적 숫자와 비교해 실패로 판정하지 않고, 실행 시 출력된 최신 개수와 실패 내용을 근거로 판단한다.

권별 strict 검증 예시:

```sh
node solo-ai-user/scripts/verify-completion.js --volume vol02 --strict
```

작업 대상에 맞춰 `vol02`를 실제 권 번호로 바꾼다. 해당 권을 닫을 때 종료 코드는 0이어야 한다.

전체 strict 검증:

```sh
node solo-ai-user/scripts/verify-completion.js --strict
```

완결 선언 시 종료 코드 0, `status: ok`, 실패 0, strict 경고 0이어야 한다.

임시표시 검사:

```sh
rg -n -P '\b[T]ODO\b|\b[T]BD\b|\b[F]IXME\b|\b[P]LACEHOLDER\b|\x7b\x7b|\x5b\x5b|작성\s*예정|추후\s*작성|(?<![\p{L}\p{N}])미\s*정(?![\p{L}\p{N}])' solo-ai-user --glob '*.md'
```

결과가 없어야 한다.

금지 캐논 회귀 검사:

```sh
rg -n 'Tier 5|아린.{0,20}(독심|개인 모델 생성|투명화|은신)|제로.{0,20}아린.{0,20}(예측 성공|모델 생성)|선택받은 (계승자|영웅)|민재호.{0,20}(단독 창조|혼자 만들)' solo-ai-user --glob '*.md'
```

검색 결과가 인용·금지 설명이 아니라 실제 캐논 회귀인지 문맥으로 판정한다.

## 완료 표시 규칙

- 파일 144개 존재만으로 완결이라 쓰지 않는다.
- 한 권 strict 통과만으로 시리즈 완결이라 쓰지 않는다.
- 자동 게이트는 최소 조건이며 재미·인과·감정 보상 수동 독회를 대체하지 않는다.
- 전체 완료 정의를 충족한 뒤에만 시리즈 README와 루트 README의 상태를 완결로 바꾼다.
- 검증 출력과 수동 검수 결과를 남기지 못하면 상태를 다시 **전권 정경 개작 중**으로 되돌린다.
- 전체 strict 실패·경고 0과 전권 수동 독회를 함께 다시 남긴 뒤에만 **전 12권 144회 완결**로 표시한다.

[← 이전 문서](./BIBLE.md) | [시리즈 홈](./README.md) | [문서 목차](./README.md#핵심-문서)
