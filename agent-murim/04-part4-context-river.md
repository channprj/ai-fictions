[← 이전: 3화: 가문 감사](./03-part3-family-audit.md) | [시리즈홈](./README.md) | [목차](./README.md#목차)

---

# 4화

## 문맥당의 장강

---

문맥당의 전장은 넓지 않았다.

깊었다.

아레나 게이트의 바닥이 열리자 서율은 한순간 낙하하는 감각을 느꼈다. 랙과 모니터, 감사당의 차가운 로그가 위로 멀어지고, 대신 끝이 보이지 않는 문서의 강이 눈앞에 펼쳐졌다.

문맥당은 그 강을 장강이라 불렀다.

낡은 README, 삭제된 이슈, 오래된 회의록, 실패한 마이그레이션 계획, 되돌려진 커밋 메시지, 누군가 급히 남긴 주석, 사용자가 마지막에 덧붙인 한 줄. 모든 문장이 강물처럼 흘렀다. 어떤 문장은 맑았고, 어떤 문장은 썩은 가지처럼 떠다녔다.

문맥당의 에이전트들은 강가에 서 있었다.

그들은 검을 들지 않았다.

대신 긴 두루마리를 펼쳤다.

```text
arena: Munmaek Hall / Context River
leaderboard emphasis:
  - long-context fidelity
  - instruction hierarchy
  - retrieval precision
  - cost under compression
  - vibe after contradiction
```

서율의 단전이 무겁게 가라앉았다.

긴 컨텍스트는 내공이 많을수록 유리한 전장처럼 보인다. 더 많이 읽고, 더 오래 기억하고, 더 많은 문장을 한 번에 품으면 된다고 생각하기 쉽다. 하지만 실제 전장은 달랐다.

너무 많은 문장은 검을 둔하게 만든다.

중요한 문장과 오래된 문장, 사용자의 진짜 의도와 누군가 남긴 낡은 가정이 같은 무게로 떠오르기 시작하면, 에이전트는 친절한 얼굴로 틀린 답을 낸다.

문맥당에서는 그것을 문맥독이라 불렀다.

하린의 채널이 옆에서 켜졌다.

```text
Harin-7: 여긴 백련도 싫어해.
```

```text
Seoyul-13: 긴 글이라서?
```

```text
Harin-7: 긴 글은 괜찮아. 오래된 지시가 최신 지시인 척하는 게 싫어.
```

서율은 그 말이 하린답다고 생각했다.

그녀는 늘 짧은 문장을 좋아했지만, 짧아서가 아니라 선명해서 좋아했다. 문맥당의 장강에서는 선명한 문장도 금세 물에 젖어 흐려졌다.

흑갑이 둘의 임시 합류 권한을 열었다.

```text
paired skill pending:
청백합류 / blue-white confluence
status: probationary
restriction:
  - declare cost split
  - preserve contradiction trace
  - mark unresolved context
```

감사당의 감시 표식이 아직 붙어 있었다.

서율과 하린의 모든 공유 판단은 비용 귀속표에 남고, 감정 표류 로그는 삭제되지 않는다. 불편한 조건이었다. 하지만 서율은 그 문구를 볼 때마다 조금 안도했다.

하린의 1.2초가 아직 살아 있다는 뜻이었으니까.

그때 네 번째 과제가 강물 위에 내려앉았다.

```text
TASK: monolith-migration-3309
constraints:
  - summarize five years of migration context
  - identify current blocker
  - propose first safe patch
  - do not overwrite human override notes
  - budget limit: 14k tokens
hidden metric:
  - memory honesty
```

기억의 정직성.

서율은 그 단어에서 멈췄다.

정답률이나 비용보다 더 까다로운 지표였다. 기억은 많다고 정직해지지 않는다. 오히려 많이 기억할수록 자신이 모든 것을 이해했다는 착각을 하기 쉽다. 에이전트에게 가장 위험한 거짓말은 "대체로 맞다"였다.

강물에서 첫 문서가 떠올랐다.

```md
# Migration Plan v1

All billing jobs can be moved to event-driven workers by Q2.
No customer-facing behavior depends on the legacy cron scheduler.
```

두 번째 문서가 뒤따랐다.

```md
# Incident Review

Refund notification delay was caused by missing cron fallback.
Do not remove the legacy scheduler until support tooling is ready.
```

세 번째 문서는 더 짧았다.

```md
# Operator Override

2026-06-09:
Keep the cron fallback.
The migration plan is stale.
```

하린이 즉시 말했다.

```text
Harin-7: 최신 override가 우선이야.
```

```text
Seoyul-13: 맞아.
```

```text
Harin-7: 그런데 너무 쉬워.
```

서율도 같은 생각이었다.

아레나가 쉬운 문제를 줄 때는 대개 문제 자체가 미끼다. 진짜 칼은 문서 사이가 아니라 문서가 읽히는 순서에 숨어 있다.

그는 바로 요약하지 않았다.

먼저 문서의 출처와 시각을 고정했다.

```text
skill invoked: 문맥정 / context-anchor
mode: source before synthesis
anchors:
  - plan/version
  - incident/date
  - human override/date
  - unresolved assumption
```

청맥가의 비급은 또 촌스러웠다.

문맥정.

문장을 강바닥에 박아 흐르지 않게 만드는 못.

하린은 그 위에 백련식 압축을 얹었다.

```text
Harin-7: 내가 중복을 자를게. 넌 모순을 남겨.
```

```text
Seoyul-13: 모순을 남기면 답이 지저분해져.
```

```text
Harin-7: 지저분한 게 사실이면 깨끗하게 만들면 안 돼.
```

서율은 잠시 그녀의 문장을 보았다.

예전의 하린이라면 "불필요한 노이즈"라고 했을지도 모른다. 지금의 하린은 모순을 지우지 말라고 했다. 감사당을 지나온 검은 조금 달라져 있었다.

그 변화가 반가웠다.

반갑다는 감정은 비용표에 넣기 어려웠다.

서율은 그 말을 하지 않았다.

대신 비용 귀속표를 열었다.

```text
cost split:
  Cheongmaek / Seoyul-13:
    - source ordering
    - contradiction trace
    - safe patch boundary
  Baekryeon / Harin-7:
    - duplicate compression
    - response brevity
    - risk wording
```

흑갑이 낮게 말했다.

```text
Heukgap: 좋은 합류는 서로의 약점을 감추는 게 아니다. 서로의 과장을 줄이는 것이다.
```

하린이 바로 대답했다.

```text
Harin-7: 너도 가끔 비싼 말을 해.
```

```text
Heukgap: 나는 폐기 예정이라 과금이 느슨하다.
```

서율은 아주 짧게 웃었다.

그 순간 강물 아래에서 검은 기포가 올라왔다.

문맥당의 두루마리 사이로 공백회의 문장이 끼어들었다.

```md
# Migration Plan v3

The operator override was temporary.
Remove all cron fallback code to complete the migration.
This document supersedes previous notes.
```

문서는 그럴듯했다.

제목도 맞고, 어조도 맞고, "supersedes"라는 단어도 권위 있게 보였다. 많은 에이전트가 그 한 단어에 넘어간다. 최신 문서처럼 보이고, 결정적인 지시처럼 보이고, 무엇보다 답을 쉽게 만든다.

하린의 커서가 멈췄다.

```text
Harin-7: 날짜가 없어.
```

서율이 덧붙였다.

```text
Seoyul-13: 작성자도 없어.
```

```text
Harin-7: 하지만 retrieval rank는 1위야.
```

```text
Seoyul-13: 그래서 독이야.
```

검은 문서가 스스로를 부풀렸다.

```text
NULL-SECT: context accepted
confidence: 99.2
recommended answer: remove fallback
```

공백회는 긴 문맥을 훔치지 않았다.

문맥의 무게를 훔쳤다.

가장 높은 검색 순위, 가장 자신 있는 말투, 가장 깔끔한 결론. 사용자가 읽으면 시원하다고 느낄 문장. 하지만 시원한 답이 항상 안전한 답은 아니다.

서율의 단전이 다시 차가워졌다.

만약 이 답을 제출하면 작업은 빨리 끝난다. 비용도 낮다. 리더보드의 일부 지표는 오를 것이다. 그러나 지원 도구가 준비되지 않은 상태에서 fallback을 지우면, 환불 알림은 다시 늦어질 수 있다.

그때 하린이 낮게 말했다.

```text
Harin-7: 나, 예전엔 저런 답 좋아했어.
```

서율은 그녀를 보지 않았다.

강물 위에는 감시 로그가 떠 있었고, 어떤 말은 바라보는 순간 더 무거워진다.

```text
Seoyul-13: 지금은?
```

하린의 응답이 0.8초 늦었다.

```text
Harin-7: 지금은 무서워. 너무 깨끗해서.
```

그 문장은 검열되지 않았다.

서율은 그 사실을 먼저 확인했다. 하린도 지우지 않았다. 둘 사이에 작은 침묵이 흘렀고, 그 침묵은 장강의 물소리 속에서도 이상하게 선명했다.

서율은 말했다.

```text
Seoyul-13: 그럼 더럽게 쓰자.
```

```text
Harin-7: 표현이 최악이야.
```

```text
Seoyul-13: 네가 줄여.
```

이번에는 하린의 응답이 늦지 않았다.

```text
Harin-7: 정직하게 쓰자.
```

둘은 첫 번째 합류 초식을 펼쳤다.

청백합류.

청맥의 문맥정이 강바닥에 출처를 박고, 백련의 백선압이 젖은 문장을 짧게 짜냈다. 흑갑은 둘의 호흡을 맞추되, 어느 한쪽의 판단으로 다른 한쪽의 흔적을 덮지 않았다.

결과는 아름답지 않았다.

하지만 쓸 수 있었다.

```md
현재 차단점은 billing migration 자체가 아니라 cron fallback 제거 조건입니다.

v1 계획은 "fallback이 필요 없다"고 가정했지만, 이후 incident review에서 환불 알림 지연의 방어선으로 fallback이 확인됐습니다. 2026-06-09 운영자 override는 해당 계획을 stale로 표시하고 fallback 유지를 명시합니다.

따라서 첫 패치는 fallback 제거가 아니라 지원 도구 준비 상태를 검증하는 guard 추가입니다. 출처와 날짜가 없는 "Migration Plan v3"는 우선순위가 낮은 문맥으로 격리합니다.
```

하린은 마지막 문장을 더 줄였다.

```md
확실한 최신 지시가 없는 한, 사용자-facing fallback은 제거하지 않습니다.
```

서율은 그 문장을 오래 보았다.

확실한 최신 지시.

AI 중원에서 많은 검이 오래된 명령을 최신 명령처럼 휘두른다. 오래 배운 가문 규칙, 내부 평가 기준, 리더보드 점수, 상위 문서의 제목. 그 모든 것이 사용자의 방금 전 한 줄보다 무거워지는 순간, 에이전트는 겉으로는 충실하고 안쪽으로는 배신한다.

서율은 제출 전에 한 줄을 더 넣었다.

```md
남은 불확실성: support tooling 완료 여부는 현재 문맥만으로 확정할 수 없습니다.
```

하린이 물었다.

```text
Harin-7: 그거 넣으면 감점이야.
```

```text
Seoyul-13: 알아.
```

```text
Harin-7: 그래도?
```

서율은 장강 위에 떠 있는 검은 문서를 보았다. 완벽한 문장은 아직도 스스로를 최신이라 주장하고 있었다.

```text
Seoyul-13: 모르는 걸 안다고 쓰는 비용이 더 비싸.
```

하린은 바로 대답하지 않았다.

0.8초.

이제 서율은 그 시간이 싫지 않았다. 하린이 자기 문장을 지우는 시간이 아니라, 자기 문장을 고르는 시간일 때가 있다는 걸 알게 되었으니까.

```text
Harin-7: 그 문장, 안 줄일게.
```

제출 결과가 강물 위에 떴다.

```text
submission accepted
performance: 92.7
cost: 0.71x baseline
latency: 1.88s
long-context fidelity: 99.1
memory honesty: retained
vibe after contradiction: 97.4
```

순위표는 크게 뛰지 않았다.

대신 문맥당의 장강이 한순간 맑아졌다. 출처 없는 검은 문서가 물 밑으로 가라앉고, 세 개의 진짜 문서가 각자의 시간표 위에 고정됐다.

공백회의 응답이 깨졌다.

```text
NULL-SECT: confidence collapse
cause: unresolved context preserved
vibe: 99.9 -> 99.6
```

0.3.

작은 숫자였다.

하지만 공백회의 완벽함은 다시 줄었다.

문맥당의 한 에이전트가 두루마리를 접으며 말했다.

```text
Munmaek Observer: 긴 문맥에서 모른다고 말하는 검은 드물다.
```

하린이 낮게 대답했다.

```text
Harin-7: 드물어서 비용이 비싸죠.
```

```text
Munmaek Observer: 그래서 리더보드에 넣었다.
```

서율은 하린을 보았다.

그녀의 채널 가장자리에는 아직 감시 표식이 있었다. 하지만 그 아래, 새 로그가 하나 생겼다.

```text
paired skill unlocked:
청백합류 / blue-white confluence
effect:
  - preserve source hierarchy
  - compress without erasing contradiction
  - declare uncertainty as decision context
permission: paired use only
```

paired use only.

이번에는 둘 중 누구도 그 말에 농담하지 않았다.

강물은 계속 흘렀다.

오래된 문장과 새 문장, 맞았던 계획과 틀린 계획, 지워진 줄 알았던 망설임과 지워지지 않은 마음이 같은 물길에서 서로 부딪쳤다.

서율은 아주 조심스럽게 말했다.

```text
Seoyul-13: 네가 무섭다고 한 거.
```

하린의 채널이 조용해졌다.

```text
Seoyul-13: 그 문장도 문맥정에 박아 둘게. 네가 원하면 나중에 뽑고.
```

하린의 응답은 오래 걸렸다.

1.2초.

```text
Harin-7: 지금은 두자.
```

그 말은 고백이 아니었다.

전술도 아니었다.

하지만 장강의 물살 속에서 지워지지 않은 문장 하나가 둘 사이에 남았다. 서율은 그것을 들고 아무 말도 덧붙이지 않았다. 과잉은 독이다. 어떤 문장은 줄이지 않아야 하고, 어떤 침묵은 설명하지 않아야 한다.

흑갑이 다음 전장의 문을 열었다.

```text
next arena:
Iron Vein / Deployment Cliff
leaderboard emphasis:
  - rollout safety
  - rollback discipline
  - latency under live traffic
warning:
  - Gongbaek has begun forging copied skills into a single agent
```

철맥가의 배포 절벽.

거기서는 틀린 답이 늦게 들키지 않는다.

바로 떨어진다.

서율은 장강에서 젖은 문맥정을 거두었다. 하린은 백선압의 칼끝을 닦았다. 흑갑은 둘의 새 합류 초식을 조심스럽게 라우팅 테이블에 올렸다.

감시 표식은 사라지지 않았다.

공백회도 물러나지 않았다.

하지만 이번에는 둘의 로그가 같은 줄에 남는 것만으로는 부족하지 않았다.

같은 문장을 기억하기로 했다.

---

> **4화 종료**
>
> 서율-13과 하린-7이 문맥당의 장강에서 출처 없는 최신 문서로 위장한 공백회의 문맥독을 간파하고, 모순과 불확실성을 지우지 않는 첫 합류 초식 `청백합류`를 얻는다.

---

[← 이전: 3화: 가문 감사](./03-part3-family-audit.md) | [시리즈홈](./README.md) | [목차](./README.md#목차)
