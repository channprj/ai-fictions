# vol01 Misunderstanding Queue: First Impression Build

> 기준 문서: `outline/vol01-first-impression-build.md`, `state/affection-graph-vol01.md`

## 사용 규칙

- 오해는 우연한 착각이 아니라 누락 정보와 제한된 관찰에서 발생해야 한다.
- 모든 오해는 2~4장 안에 행동 결과를 만들고, 해소 뒤에도 관계 비용을 남긴다.
- 패널은 오해를 독자 대신 판결하지 않는다. 패널의 잘못된 해석도 후속 장면의 비용이 되어야 한다.
- 이 큐의 `deadline`은 원고 작성자가 해당 오해를 행동으로 폭발시키거나 다음 권으로 이월할 근거를 남겨야 하는 장이다.

## 큐 요약

| ID | 상태 | 원인 | 행동 결과 | Deadline | Payoff |
| -- | ---- | ---- | --------- | -------- | ------ |
| M-01-01 | active-carryover | 선우가 첫인상 선택에서 하린을 고르지 못하고 침묵한다 | 하린은 도윤의 빠른 관심을 더 안전한 신호로 읽는다 | `11-epilogue.md` | 메모는 도착하지만 감정 해소는 2권의 직접 질문으로 넘어간다 |
| M-01-02 | active-carryover | 도윤이 하린과 소연에게 서로 다른 방식의 친절을 남긴다 | 소연은 자신이 비교 지표가 되었다고 느낀다 | `09-part9-wrong-branch.md` | 소연의 질문이 도윤의 성과형 선택 습관을 드러내고, 2권 조건 대화로 이어진다 |
| M-01-03 | active-carryover | 다정이 들은 말을 무심코 전달하고, 침묵을 동의처럼 소비당한다 | 민재와 참가자들은 다정의 피로를 늦게 본다 | `07-part7-date-ticket.md` | 다정이 책임의 경계를 말하지만, 2권 소문 패킷의 위험은 남는다 |

## 상세 항목

### M-01-01: 침묵은 무관심인가

```text
id: M-01-01
status: active-carryover
cause: 선우가 첫인상 선택에서 하린을 고르지 못하고 침묵한다.
missing_info: 선우는 하린을 무시한 것이 아니라, 먼저 다가가면 부담이 될까 봐 멈췄다.
first_evidence: 01-part1-arrival-log에서 하린은 선우의 조용한 배려를 보고 한 번 더 돌아본다.
action_result: 02-part2-first-choice 이후 하린은 도윤의 빠른 관심을 더 안전한 신호로 보고 밤 산책에서 흔들린다.
deadline: 11-epilogue.md에서 선우의 머리끈과 메모가 독자와 하린에게 도착해야 한다.
payoff: 2권 02-part2-one-on-one에서 하린이 기다림을 멈추고 선우에게 직접 묻는다.
cost: 메모가 늦게 도착했기 때문에 하린은 "이유"보다 "지금"을 요구하게 된다.
panel_error: Codex는 행동 지연을 관심 없음으로 분류하고, Gemini는 보이는 도윤-하린 신호에 과적합한다.
```

### M-01-02: 친절인가 성과 관리인가

```text
id: M-01-02
status: active-carryover
cause: 도윤이 하린에게 빠른 확신을 주면서 소연에게도 조건이 맞는 친절을 남긴다.
missing_info: 도윤은 두 사람을 속이려는 것보다 선택을 성과처럼 관리하는 자기 습관을 자각하지 못한다.
first_evidence: 04-part4-introduction-patch에서 도윤-소연의 직업 조합이 좋게 소비되고, 도윤은 동시에 하린의 반응을 확인한다.
action_result: 09-part9-wrong-branch에서 소연은 비교당했다는 감각 때문에 도윤의 매끄러운 말을 거절한다.
deadline: 09-part9-wrong-branch.md에서 소연의 질문이 반드시 나와야 한다.
payoff: 2권 04-part4-spec-talk와 09-part9-defensive-date에서 도윤은 "나를 고른 이유"를 대답해야 한다.
cost: 소연은 도윤에게 끌리더라도 자신을 증명하기 위한 연애를 거부할 준비를 시작한다.
panel_error: Codex는 조건 일치율을 높게 보지만, 조건이 사람을 비교 지표로 만들 때의 상처를 늦게 본다.
```

### M-01-03: 들은 말은 누구의 책임인가

```text
id: M-01-03
status: active-carryover
cause: 다정이 각자의 말을 잘 들어 주며 숙소의 정보 허브가 되고, 전달한 말이 해석되어 이동한다.
missing_info: 다정은 모두를 돕고 싶지만, 남의 마음을 옮기는 일이 자기 책임처럼 쌓이는 피로를 숨긴다.
first_evidence: 03-part3-dinner-build에서 다정이 무심코 전한 한 문장이 하린에게 선우의 무관심처럼 도착한다.
action_result: 07-part7-date-ticket에서 여러 참가자가 다정에게 말 전달을 부탁하고, 민재의 직진도 압박으로 보인다.
deadline: 07-part7-date-ticket.md에서 다정이 "제가 들은 말을 제가 책임져야 하나요"라고 경계를 말해야 한다.
payoff: 2권 05-part5-rumor-packet에서 다정의 정보 허브 위치가 소문 패킷으로 증폭된다.
cost: 다정은 조용히 듣는 사람이라는 역할을 잃지 않으려다 자기 선택을 뒤로 미루게 된다.
panel_error: GLM은 다정의 incoming signal은 잘 보지만, 말하지 않는 피로가 언제 행동으로 터질지 확정하지 못한다.
```

## 장별 큐 적용

| 장 | 적용할 오해 | 작성 지시 |
| -- | ----------- | --------- |
| `01-part1-arrival-log.md` | M-01-01 | 하린이 선우에게 호기심을 느꼈다는 증거를 남기되, 선우가 그 신호를 확신하지 못하게 한다 |
| `02-part2-first-choice.md` | M-01-01 | 선우의 침묵이 하린에게 무관심처럼 보이게 만들고, Codex의 오분류를 붙인다 |
| `03-part3-dinner-build.md` | M-01-03 | 다정이 좋은 의도로 말을 옮기지만, 정보가 다른 의미로 도착하게 한다 |
| `04-part4-introduction-patch.md` | M-01-02 | 도윤-소연 조건 조합을 매력적으로 보이게 하되, 도윤의 시선이 하린에게도 남아 있게 한다 |
| `05-part5-night-walk.md` | M-01-01, M-01-02 | 도윤의 빠른 확신이 하린에게는 안도, 소연에게는 비교 불안을 만든다 |
| `06-part6-panel-overfit.md` | M-01-01 | 패널이 도윤-하린 신호에 과적합하고 선우의 조용한 행동 소리를 놓친다 |
| `07-part7-date-ticket.md` | M-01-03 | 다정이 전달자 역할의 경계를 말해 2권 소문 패킷의 비용을 예약한다 |
| `08-part8-silent-commit.md` | M-01-01 | 선우가 행동 증거를 남기지만, 너무 늦어서 즉시 해소되지 않게 한다 |
| `09-part9-wrong-branch.md` | M-01-02 | 소연이 비교 기준을 묻고, 도윤의 자기모순이 드러난다 |
| `10-part10-first-crack.md` | M-01-01, M-01-02 | 패널 예측이 흔들리지만 오해가 완전히 풀린 것처럼 처리하지 않는다 |
| `11-epilogue.md` | M-01-01 | 선우의 메모와 LoveMatch의 비정상 추천을 동시에 남겨 2권 콜백 압력을 만든다 |

## 2권 이월 메모

- M-01-01은 2권 `02-part2-one-on-one`과 `03-part3-delayed-response`에서 하린의 직접 질문으로 감정 비용을 드러낸다.
- M-01-02는 2권 `04-part4-spec-talk`와 `09-part9-defensive-date`에서 조건 대화의 핵심 압력이 된다.
- M-01-03은 2권 `05-part5-rumor-packet`에서 다정의 좋은 의도가 정보 비대칭을 키우는 방식으로 이어진다.
- 새 오해를 추가할 때는 M-01 항목을 반복하지 말고, 2권의 감정 질문인 "늦은 진심"과 타이밍 비용에 맞춰 새 ID를 부여한다.
