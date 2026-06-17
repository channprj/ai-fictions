# vol03 Misunderstanding Queue: Final Selection Crash

> 기준 문서: `outline/vol03-final-selection-crash.md`, `state/affection-graph-vol03.md`, `state/misunderstanding-queue-vol02.md`, `state/production-mystery-timeline.md`

## 사용 규칙

- 3권의 오해는 모두 "최종 선택의 실패란 무엇인가"라는 질문으로 돌아와야 한다.
- 오해는 누가 누구를 좋아하는지 맞히는 퍼즐에 머물지 않고, 선택하지 않음과 유예 선택이 왜 비용 있는 선택인지 드러내야 한다.
- LoveMatch와 패널이 붙이는 `success`, `failure`, `low success`, `high retention` 라벨은 참가자의 감정 결과를 대체하지 않는다.
- 모든 오해는 2~4장 안에 행동 결과를 만들고, 해소 뒤에도 카메라 이후의 얼굴, 사후 책임, Act 2 시스템 보정으로 비용을 남긴다.
- 이 큐의 `deadline`은 원고 작성자가 해당 오해를 행동으로 폭발시키거나 다음 권으로 넘길 근거를 남겨야 하는 장이다.

## 큐 요약

| ID | 상태 | 원인 | 행동 결과 | Deadline | Payoff |
| -- | ---- | ---- | --------- | -------- | ------ |
| M-03-01 | resolved-with-cost | 선우의 2권 마지막 침묵이 하린에게 마음이 끝난 신호처럼 남아 있다 | 하린은 선우의 진심을 들어도 방송 안에서 즉시 확정하지 않는다 | `09-part9-final-selection.md` | `03-part3`에서 실패를 인정하고, `09-part9`에서 방송 밖 재시도라는 유예 선택으로 닫는다 |
| M-03-02 | active-carryover | LoveMatch의 최종 선택 미션이 우연한 순서 조정처럼 보인다 | 참가자는 자기 마음과 제작 동선을 분리하기 어려워지고, 백이현은 로그 이상치를 의심한다 | `11-epilogue.md` | `02-part2`에서 이상한 미션 순서를 보이고, `11-epilogue`에서 Act 2 위험 변수 보정으로 넘긴다 |
| M-03-03 | resolved-with-cost | 도윤의 "나도 왜 이러는지 모르겠다"가 소연에게 미성숙한 회피처럼 들릴 수 있다 | 소연은 도윤에게 끌리면서도 자신을 증명하기 위한 연애를 멈춘다 | `09-part9-final-selection.md` | `04-part4`에서 좋아하지만 고르지 않는 이유를 말하고, 최종 선택장에서 서로를 벌하지 않는 비선택으로 닫는다 |
| M-03-04 | resolved-with-cost | 다정이 더 이상 말을 옮기지 않겠다고 하자 차가운 단절처럼 보인다 | 민재는 답을 요구하려다 멈추고, 다정은 자기 피로와 경계를 처음으로 행동화한다 | `06-part6-dajeong-fatigue.md` | 다정의 경계는 정보 허브 포기가 아니라 타인의 선택 시간을 돌려주는 행동으로 남는다 |
| M-03-05 | resolved-reframed | 패널과 LoveMatch가 최종 선택을 커플 수로 판정하려 한다 | Codex의 예측표와 LoveMatch 성공률 출력이 유예, 비선택, 거절을 모두 낮은 성과처럼 오독한다 | `10-part10-after-camera.md` | 한서윤의 "유예" 메모와 카메라 이후 얼굴이 `failure` 라벨을 뒤집고, Codex가 예측 실패를 인정한다 |

## 상세 항목

### M-03-01: 죽은 신호는 끝난 마음인가

```text
id: M-03-01
status: resolved-with-cost
cause: 선우의 2권 마지막 침묵이 하린에게 마음이 끝난 신호처럼 남아 있다.
missing_info: 선우는 마음이 식은 것이 아니라 모두가 보는 자리에서 하린을 붙잡는 일이 다시 압박이 될까 봐 멈췄다.
first_evidence: 01-part1-last-breakfast.md에서 선우는 하린의 컵을 챙기지만 직접 말하지 못한다.
action_result: 03-part3-sunwoo-harin.md에서 선우는 "제가 늦었습니다"라고 실패를 인정하고, 하린은 사과를 받아도 즉시 답하지 않는다.
deadline: 09-part9-final-selection.md에서 하린의 최종 문장이 방송 안 확정이 아니라 방송 밖 재시도여야 한다.
payoff: 하린은 선우에게 가지만 "오늘부터 사귀자"가 아니라 "밖에서 한 번 더 늦지 않게 만나자"고 말한다.
cost: 선우의 진심은 회복되지만, 늦었던 시간은 사라지지 않아 둘은 방송 밖에서 다시 책임을 확인해야 한다.
panel_error: Codex는 죽은 신호를 실패로 판정하려 하지만, Claude는 늦은 사과가 상대에게 선택 시간을 돌려주는지 봐야 한다고 수정한다.
```

### M-03-02: 추천된 선택 미션은 중립인가

```text
id: M-03-02
status: active-carryover
cause: LoveMatch의 최종 선택 미션이 우연한 순서 조정처럼 보인다.
missing_info: 시스템은 커플 수보다 시청자 몰입도 하락을 막기 위해 불안정한 조합을 후반까지 붙잡아 둔다.
first_evidence: 00-prologue.md에서 선우-하린 조합 옆에 low success와 high retention이 동시에 뜬다.
action_result: 02-part2-choice-mission.md에서 선우와 하린은 가까워지지만 고백 직전마다 공개 장소와 촬영 동선에 끊긴다.
deadline: 11-epilogue.md에서 백이현이 마스킹된 파라미터와 `risk_variable_seed`를 별도 감사 파일로 보관해야 한다.
payoff: Act 2에서 LoveMatch는 이혼, 자녀, 가족 반응을 위험 변수로 표시하며 보호 명분의 보정을 시작한다.
cost: 참가자는 자기 마음이 아니라 주어진 시간표에 반응했는지 의심하게 되고, 제작진은 연출과 조작의 경계에 첫 발을 들인다.
panel_error: GLM은 참가자 간 정보 흐름을 분석하지만, 시스템 동선이 정보 비대칭을 설계했다는 입력값은 아직 늦게 본다.
```

### M-03-03: 모르겠다는 말은 회피인가 정직인가

```text
id: M-03-03
status: resolved-with-cost
cause: 도윤의 "나도 왜 이러는지 모르겠다"는 말이 소연에게 미성숙한 회피처럼 들릴 수 있다.
missing_info: 도윤은 소연을 좋아하지만, 지금 선택하면 소연을 자기 선택 능력의 증명으로 만들까 봐 두려워한다.
first_evidence: 04-part4-doyoon-soyeon.md에서 도윤은 조건 설명 없이 좋아한다고 말하지만 확정 문장을 끝까지 밀어붙이지 못한다.
action_result: 소연은 좋아하는데도 고르지 않을 수 있음을 처음 말하고, 울음 대신 자기 존엄을 지키는 비선택을 준비한다.
deadline: 09-part9-final-selection.md에서 도윤과 소연은 서로를 선택하지 않되 서로를 벌하지 않아야 한다.
payoff: 두 사람은 커플이 되지 않지만 서로에게 고마움을 남기고, 소연은 자신을 증명하기 위한 연애를 멈춘다.
cost: 도윤은 매끄러운 답을 잃은 대가를 받아들이고, 소연은 혼자 나오는 표정까지 자기 선택으로 감당한다.
panel_error: Codex는 조건 설명이 사라졌는데도 관계가 진전되지 않는 actual을 오류로 보지만, Grok은 실패를 포장하지 않는 말을 더 정확히 본다.
```

### M-03-04: 경계는 버림인가

```text
id: M-03-04
status: resolved-with-cost
cause: 다정이 더 이상 말을 옮기지 않겠다고 하자 일부 참가자는 차가운 단절로 받아들인다.
missing_info: 다정은 무심한 것이 아니라, 누군가의 선택 시간을 대신 소비한 책임을 감당하지 못할 만큼 지쳤다.
first_evidence: 01-part1-last-breakfast.md에서 참가자들이 마지막까지 다정에게 다른 사람의 마음을 묻는다.
action_result: 06-part6-dajeong-fatigue.md에서 다정은 민재에게 누구의 마음도 대신 전하지 않겠다고 말하고, 민재는 더 묻지 않는다.
deadline: 06-part6-dajeong-fatigue.md에서 다정의 경계와 민재의 멈춤이 행동으로 확인되어야 한다.
payoff: 다정은 자기 이름이 적힌 선택 카드를 오래 바라보며 정보 허브가 아닌 선택 주체로 남는다.
cost: 다정이 더 이상 편리한 전달자가 아니게 되면서 숙소의 정보 흐름은 느려지지만, 각자의 선택은 더 직접적이 된다.
panel_error: GLM은 정보 허브의 기능 저하로 먼저 읽지만, Claude는 멈춤이 상대를 버리는 행동이 아닐 수 있다고 본다.
```

### M-03-05: 커플 수가 결과인가

```text
id: M-03-05
status: resolved-reframed
cause: 패널과 LoveMatch는 최종 선택을 커플 수로 판정하려 한다.
missing_info: 하린의 유예, 소연의 비선택, 은채의 거절, 다정의 경계는 낮은 매칭률이 아니라 자기 선택권 회복이다.
first_evidence: 00-prologue.md에서 Codex는 final selection expected를 만들고 LoveMatch는 성공률을 출력한다.
action_result: 09-part9-final-selection.md에서 성공, 실패, 유예, 비선택이 동시에 발생하며 Codex의 표와 LoveMatch 라벨이 빗나간다.
deadline: 10-part10-after-camera.md에서 카메라 이후의 얼굴과 한서윤의 손글씨가 `failure` 판정을 뒤집어야 한다.
payoff: 한서윤은 제작 메모의 "실패" 옆에 "유예"라고 고쳐 쓰고, Codex는 예측 실패를 수정 대상보다 감사 대상으로 남긴다.
cost: Act 1은 커플 수가 아니라 선택권 회복으로 닫히며, Act 2는 시스템이 위험 변수를 보정하려는 더 무거운 문제로 넘어간다.
panel_error: Codex는 결과 예측 실패를 인정하고, Gemini는 선택 이후의 얼굴이 예측표보다 오래 남는다고 수정한다.
```

## 장별 큐 적용

| 장 | 적용할 오해 | 작성 지시 |
| -- | ----------- | --------- |
| `00-prologue.md` | M-03-02, M-03-05 | LoveMatch의 low success와 high retention을 함께 띄우고, Codex의 최종표가 정답처럼 보이다가 흔들릴 준비를 만든다 |
| `01-part1-last-breakfast.md` | M-03-01, M-03-04 | 선우의 조용한 배려와 다정에게 몰리는 질문을 식탁 동선으로 보여 주되 즉시 해소하지 않는다 |
| `02-part2-choice-mission.md` | M-03-02 | 미션 순서와 공개 동선이 우연처럼 보이지만 참가자의 감정 응답 시간을 비틀게 한다 |
| `03-part3-sunwoo-harin.md` | M-03-01 | 선우가 실패를 인정하고 하린이 사과와 즉시 확정을 분리하게 한다 |
| `04-part4-doyoon-soyeon.md` | M-03-03 | 도윤이 좋아한다고 말하면서도 소연을 자기 증명으로 만들 두려움을 함께 말하게 한다 |
| `05-part5-taeo-eunchae.md` | M-03-05 | 태오의 변화는 인정받지만 커플 성공률로 보상받지 않는다는 점을 준비한다 |
| `06-part6-dajeong-fatigue.md` | M-03-04 | 다정의 경계와 민재의 멈춤을 동시에 행동으로 보여 준다 |
| `07-part7-panel-crash.md` | M-03-02, M-03-05 | 패널 예측 모델들이 서로 모순되고, LoveMatch의 recommended edit point가 인간 그래프와 어긋나게 한다 |
| `08-part8-final-walk.md` | M-03-01 | 선우와 하린이 방송 안 확정 대신 방송 밖 책임을 말하는 유예 선택의 감정 근거를 만든다 |
| `09-part9-final-selection.md` | M-03-01, M-03-03, M-03-05 | 하린의 유예, 소연의 비선택, 은채의 거절, 다정의 자기 선택을 짧은 최종 문장으로 결산한다 |
| `10-part10-after-camera.md` | M-03-05 | 카메라 이후 얼굴과 한서윤의 "유예" 메모로 LoveMatch의 `failure` 라벨을 뒤집는다 |
| `11-epilogue.md` | M-03-02 | 백이현이 추천 로그 이상치와 `risk_variable_seed`를 보관해 Act 2 위험 변수 보정으로 넘긴다 |

## 4권 이월 메모

- M-03-01은 Act 1의 Late Signal 축을 닫는다. 4권 이후에는 선우와 하린의 유예 선택을 후일담의 정답처럼 고정하지 말고, "늦지 않게 다시 묻는 책임"으로만 남긴다.
- M-03-02는 4권 `Legacy Heart Migration`의 핵심 시스템 씨앗이다. LoveMatch는 이혼, 자녀, 가족 반응을 보호 명분의 위험 변수로 표시한다.
- M-03-03은 도윤과 소연의 Spec Trap 축을 닫는다. 이후 조건형 로맨스를 쓸 때는 조건표 실패를 사람의 실패로 단순화하지 않는다.
- M-03-04는 다정의 정보 허브 피로를 닫는다. 후속 권의 정보 비대칭은 편리한 전달자에게 의존하지 말고 각 권의 구조와 미션에서 새로 만들어야 한다.
- M-03-05는 Codex의 첫 큰 예측 실패와 한서윤의 판정 수정으로 이어진다. 4권부터 패널이 상처와 조건을 변수화하려 할 때, 3권의 실패 기준 붕괴를 반복해서 반박 근거로 사용할 수 있다.
