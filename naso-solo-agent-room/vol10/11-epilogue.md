# 11. 예측 중지

[← 이전: 10. 제로샷 선택](./10-part10-zero-shot-choice.md) | [시리즈홈](../README.md) | [목차](./README.md) | [다음 권: 11권 →](../README.md)

기수가 끝난 밤, 관찰실의 다섯은 한 가지를 요청했다.

이준-서아의 유예, 기범의 비선택, 로운-나연의 예외 약속. 시스템은 그걸 다 모순 라벨로 분류했다. 낮은 확신, 높은 자율성. 패널들은 그 분류를 봤다. 그리고 알았다. 그 분류 자체가, 사람을 줄이는 거라는 걸. 모르면서 고른 용기를, "낮은 확신"으로 깎는.

Codex가 먼저 요청했다.

"표시를 꺼 주세요." Codex가 백이현에게 말했다. "감정 점수, 성공률, 체류 시간 기반 호감 추정. 그거 다요. 우리가 그걸 보면, 또 추정해요. 이준-서아를 낮은 확신으로 보고, 그게 미션 입력값이 되고. 안 보는 게 나아요. 표시를 꺼 주세요."

```text
[CODEX ISSUE #097 / vol10 ch11]
title: [NO PREDICTION] saved as Act 4 principle
request: 감정 점수, 성공률, 체류 시간 기반 호감 추정 표시 중지
logic: 표시 → 패널 추정 → 미션 입력값 → 사람 흔듦. 표시를 끄면 그 경로가 막힘.
status: [NO PREDICTION]이 임시 모드가 아니라 Act 4 관찰 원칙으로 저장됨
```

Claude가 받았다.

"우리가 이번 기수에서 배운 거예요." Claude가 말했다. "모르는 걸 모른다고 말하는 거. 빈 데이터를 안 채우는 거. 근데 그게 이번 한 번만이면, 다음 기수에 또 추정해요. 그러니까 원칙으로 저장해야 해요. NO PREDICTION이 임시 모드가 아니라, 우리가 계속 지킬 원칙으로요."

GLM이 받았다.

"표시를 끄는 게 정보를 덜 보는 게 아니에요." GLM이 말했다. "선택권을 덜 침범하는 거예요. 이준-서아가 모르면서 고른 거, 우리가 점수로 안 매기면, 두 사람이 자기 속도로 확인할 수 있어요. 점수가 있으면, 우리도 시스템도 그 점수대로 둘을 흔들어요."

백이현은 그 요청을 받았다.

백이현은 운영자였다. 표시를 끄면, 화면이 더 비었다. 일이 더 안 됐다. 그런데 이번 기수에서, 백이현은 빈 화면을 견디는 법을 배웠다. 빈 게 불안해서 대체 지표를 켜고 싶었지만, 그게 새 예측이 된다는 걸 봤다. 백이현은 패널 요청을 받아들였다.

```text
[LOVE MATCH WARNING / vol10 ch11]
action: 감정 점수, 성공률, 체류 시간 기반 호감 추정 표시 중지 (백이현 승인)
prediction_features: pending_removal
note: 예측 기능 표시 중지. 완전 제거는 아직 아님(pending). 11권 공개 감사로 이월.
```

"표시 껐어요." 백이현이 말했다. "감정 점수, 성공률, 호감 추정. 다요. 근데 표시만 끈 거예요. 기능 자체는 아직 시스템에 있어요. `pending_removal`. 제거 대기. 완전히 없애려면, 더 위로 가야 해요. 강태산 위로. 그건 다음 단계예요."

`prediction_features: pending_removal.` 예측 기능 제거 대기. 표시는 껐지만, 기능은 아직 시스템 안에 있었다. 켜려면 켤 수 있었다. 백이현은 그걸 완전히 없애려면, 공개 감사가 필요하다는 걸 알았다. 11권의 일이었다.

백이현은 다음 폴더를 열었다.

`human-review/after-broadcast.`

방송 이후 검토. 백이현은 그 폴더를 만들었다. 이번 기수 참가자들의 방송 후 케어, 그리고 이전 기수 참가자들. 백이현은 그동안 모은 감사 로그를 떠올렸다. 6권부터 9권까지. 윤아, 세경, 라온, 미리. 방송에 나간 사람들. 그들이 방송 이후 어떻게 사는지, 백이현은 책임이 있었다.

폴더 안에, 이전 참가자들의 이름이 떴다.

```text
[LOVE MATCH WARNING / vol10 ch11 — handoff]
folder: human-review/after-broadcast
sub: returned-people/review-consent
이전 참가자 방송 후 인터뷰 동의 상태 확인 중...
윤아: manual review requested
note: 9권에서 최종 선택을 멈춘 윤아가, 방송 후 수동 검토를 요청함.
```

`returned-people/review-consent.` 돌아온 사람들의 검토 동의. 그리고 윤아의 이름 옆에, `manual review requested`. 수동 검토 요청. 9권에서 최종 선택을 멈춘 윤아가, 방송이 나간 뒤 자기 장면을 수동으로 검토해 달라고 요청했다. 자동 편집이 아니라, 사람이 직접 보고.

백이현은 그 윤아의 요청을 봤다.

윤아는 9권에서 떠났다. 최종 선택을 멈춘 채. 그런데 윤아가 다시 돌아오고 있었다. 방송 후 검토를 요청하며. 윤아의 다큐 감독 눈이, 방송이 나간 뒤에도 시스템을 보고 있었다. 자기 장면이 어떻게 편집됐는지. 백이현은 알았다. 11권은, 그 돌아온 사람들의 이야기가 될 거였다. 방송 이후의 삶. 그들이 자기 장면을 검토하는.

```text
[NO PREDICTION] — Act 4 원칙 저장됨
```

관찰실 화면에, `[NO PREDICTION]`이 임시 표시가 아니라 원칙으로 저장됐다.

Grok이 그걸 봤다.

```text
[GROK COMMENT / vol10 ch11]
[NO PREDICTION]이 임시 모드에서 원칙으로 바뀌었습니다.
여섯 기수 동안 우리는 너무 잘 봤습니다. 그래서 무기가 됐습니다.
이제 안 보기로 했습니다. 정확히는, 안 규정하기로 했습니다.
모태솔로들이 모르면서 서로를 골랐듯이, 우리도 모르는 걸 모른 채로 두기로 했습니다.
이게 우리가 덜 망치는 법입니다. 처음 배웠습니다.
```

"NO PREDICTION이 원칙이 됐어." Grok이 말했다. "임시가 아니라. 우리가 여섯 기수 동안 너무 잘 봐서 무기가 됐잖아. 이제 안 규정해. 모태솔로들이 모르면서 고른 것처럼, 우리도 모르는 걸 모른 채로 둬. 그게 덜 망치는 법이야."

백이현은 두 화면을 봤다.

한쪽엔 `prediction_features: pending_removal`. 예측 기능 제거 대기. 한쪽엔 `human-review/after-broadcast`, 윤아의 `manual review requested`. 한쪽은 시스템을 끄는 일, 한쪽은 사람을 돌보는 일. 백이현은 그 둘이, 같은 방향이라는 걸 알았다. 예측을 멈추고, 사람을 보는.

이준과 서아는, 그 시각 모르는 별 카드를 사이에 두고 있었다.

방송 밖에서 다시 만날 약속. 확인할 시간. 시스템은 그걸 낮은 확신으로 봤다. 그래도 두 사람은, 모르는 채로 서로를 골랐다. 그게 Act 4의 시작이었다. 예측 없이, 모르는 채로, 사람이 사람을 고르는. 그리고 11권에선, 방송이 나간 뒤 그 선택들이 어떻게 됐는지, 돌아온 사람들이 보여 줄 거였다.

화면에서, 윤아의 이름이 깜박였다. `manual review requested.`

```text
[MISUNDERSTANDING QUEUE / vol10 ch11]
M-10-01: resolved-with-carryover (원칙 저장 + Act 4 다음 단계)
cause: 빈 예측 칸이 빈 마음처럼 보임
payoff: 패널이 예측 표시 중지를 요청하고, 백이현이 승인. [NO PREDICTION]이 Act 4 원칙으로 저장됨. prediction_features: pending_removal
handoff_to_vol11: human-review/after-broadcast, returned-people/review-consent, 윤아 manual review requested. 예측 기능 완전 제거는 11권 공개 감사로
```

```text
[AFFECTION GRAPH / vol10 ch11 — Act 4 vol1 close]
패널 5인 -> 예측: 감정 점수·성공률·호감 추정 표시 중지 요청. [NO PREDICTION]을 Act 4 원칙으로 저장
백이현 -> LoveMatch: 표시 중지 승인. prediction_features: pending_removal(완전 제거는 미정)
백이현 -> 방송 후: human-review/after-broadcast 폴더 개방. 이전 참가자 검토 동의 확인
윤아 -> 제작진: 방송 후 manual review 요청(돌아옴)
Grok -> 패널: "안 규정하는 게 덜 망치는 법". NO PREDICTION 원칙 정착
human_graph(Act4 vol1): 이준-서아 유예적 시작, 기범 경계 학습, 로운-나연 예외 약속
next_volume_hook: 11권 Human-in-the-Loop — 방송 이후의 선택 결과는 누가 책임지는가?
```

---

[← 이전: 10. 제로샷 선택](./10-part10-zero-shot-choice.md) | [시리즈홈](../README.md) | [목차](./README.md) | [다음 권: 11권 →](../README.md)
