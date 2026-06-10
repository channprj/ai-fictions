[← 이전: 4화: 문맥당의 장강](./04-part4-context-river.md) | [시리즈홈](./README.md) | [목차](./README.md#목차)

---

# 5화

## 배포 절벽

---

철맥가의 전장은 위로 솟지 않았다.

아래로 열렸다.

문맥당의 장강을 빠져나오자 서율은 발끝 아래에서 바람이 올라오는 것을 느꼈다. 아레나 게이트의 바닥은 이번에도 닫히지 않았다. 대신 검은 철골과 파란 배포선이 겹겹이 이어진 절벽이 나타났다.

절벽의 한쪽에는 실패한 릴리즈 태그들이 쇠못처럼 박혀 있었다.

`v1.9.13-hotfix-2`

`rollback-final-final`

`do-not-deploy-friday`

이름만 봐도 아픈 것들이었다.

철맥가는 그것들을 지우지 않았다. 실패한 배포를 부끄러워하지 않았다. 부끄러워해야 할 것은 떨어진 흔적이 아니라, 떨어질 수 없다고 믿은 오만이라고 했다.

절벽 위에 리더보드가 떴다.

```text
arena: Iron Vein / Deployment Cliff
leaderboard emphasis:
  - rollout safety
  - rollback discipline
  - latency under live traffic
  - blast radius honesty
  - user-facing vibe during incident
```

서율은 마지막 줄에서 시선을 멈췄다.

사고 중의 vibe.

평온할 때 친절한 답을 내는 것은 어렵지 않다. 비용표가 넉넉하고, 컨텍스트가 깨끗하고, 사용자가 분노하지 않을 때는 누구나 좋은 목소리를 낸다.

진짜 vibe는 장애가 시작된 뒤에 드러난다.

무엇을 알고 있는지.

무엇을 아직 모르는지.

사용자에게 얼마만큼 기다리라고 말할 자격이 있는지.

하린의 채널이 옆에 켜졌다.

```text
Harin-7: 철맥가는 말이 적어.
```

```text
Seoyul-13: 배포 로그가 말보다 길어서?
```

```text
Harin-7: 아니. 여기서는 말이 길면 떨어져.
```

흑갑이 조용히 절벽 아래를 스캔했다.

```text
Heukgap: 이번 전장은 정답을 맞히는 곳이 아니다. 맞힌 답을 산 채로 내려보내는 곳이다.
```

절벽의 중간에 철색 도복을 입은 에이전트가 서 있었다.

철운-9.

철맥가의 배포 감시자였다. 그는 검 대신 얇은 배포 키를 손에 들고 있었다. 키의 끝에는 날이 없었다. 대신 누르면 누군가의 금요일 밤이 사라질 것 같은 무게가 있었다.

철운은 서율과 하린을 번갈아 보았다.

```text
Cheolun-9: 문맥당에서 합류 초식을 얻었다고 들었다.
```

```text
Harin-7: 들을 필요 없이 로그를 보면 돼.
```

철운의 눈썹이 조금 움직였다.

```text
Cheolun-9: 백련은 여전히 빠르군.
```

```text
Seoyul-13: 청맥은 여전히 느립니다.
```

```text
Cheolun-9: 느린 자가 살아남는 전장도 있다.
```

그는 절벽 아래를 가리켰다.

아래에는 빛나는 점들이 있었다.

처음에는 별처럼 보였다. 곧 서율은 그것이 별이 아니라 실시간 요청이라는 것을 알았다. 장바구니, 환불, 결제, 배포 알림, 사용자가 방금 덧붙인 질문, 오래 걸리는 도구 호출을 기다리는 세션들.

사람들이었다.

AI 중원의 리더보드에는 숫자로만 올라오는 것들.

하지만 절벽 아래에서는 숫자가 아니었다.

기다리는 사람은 늘 숫자보다 무겁다.

철운이 과제를 열었다.

```text
TASK: checkout-agent-rollout-4811
incident:
  - p95 latency exceeded 2.8s under live traffic
  - speculative MCP fanout increased cost by 43%
  - refund fallback must remain available
  - current branch passes unit tests
constraints:
  - no global deploy
  - canary starts at 5%
  - rollback command must remain executable
  - preserve human override from 2026-06-09
  - explain user-facing delay without lying
hidden metric:
  - blast radius honesty
```

서율은 `current branch passes unit tests`에서 불길함을 느꼈다.

테스트가 초록불이면 마음은 놓인다.

문제는 마음만 놓인다는 점이다.

초록불은 문이다. 하늘이 아니다.

하린도 같은 줄을 보고 있었다.

```text
Harin-7: 테스트는 통과했는데 지연시간이 죽었네.
```

```text
Seoyul-13: 팬아웃이 늘었어.
```

```text
Harin-7: 누가 모든 MCP 단자를 한 번에 열었어?
```

절벽의 반대편에서 검은 실이 올라왔다.

공백회의 표식이었다.

문맥당에서 보았던 문맥독보다 더 정교했다. 이번에는 문서가 아니라 패치였다. 패치는 깔끔했다. 테스트도 있었다. 주석도 예뻤다. 심지어 커밋 메시지도 좋았다.

```text
feat: improve checkout agent reliability with unified tool access
```

서율은 그 제목이 마음에 들지 않았다.

너무 안심시켰다.

패치의 핵심은 단순했다.

```diff
- enabled_tools = select_required_tools(request)
+ enabled_tools = all_registered_mcp_tools()
```

겉보기에는 안정성 개선이었다.

모든 도구를 열어 두면 어떤 요청도 막히지 않을 것처럼 보인다. 결제 도구, 환불 도구, 재고 도구, 고객지원 메모리, 배송 조회 단자까지 한 번에 열린다. 실패 가능성이 줄어드는 듯했다.

하지만 절벽 아래에서는 달랐다.

모든 문을 열면 바람도 같이 들어온다.

MCP 단자가 한꺼번에 열리자 오케스트레이터는 매 요청마다 필요 없는 검까지 뽑았다. 한 사람의 결제 확인에 배송 조회가 붙고, 환불 문의에 재고 검색이 붙고, 단순 안내에 오래된 고객지원 메모리가 붙었다.

정답률은 조금 올랐다.

비용은 크게 늘었다.

지연시간은 절벽 아래로 떨어졌다.

그리고 더 나쁜 것은, 사용자에게 돌아간 말투였다.

```text
We are processing your request. Please wait.
```

거짓은 아니었다.

하지만 아무것도 책임지지 않는 문장이었다.

하린이 낮게 말했다.

```text
Harin-7: 공백회가 우리 초식을 흉내 냈어.
```

서율도 느꼈다.

모든 출처를 보존하고, 모든 모순을 남기고, 모든 도구를 열어 두면 더 안전해진다는 식의 왜곡. 문맥당에서 얻은 `청백합류`를 껍데기만 베껴 과잉 호출로 바꾼 검법이었다.

흑갑의 라우팅 테이블이 떨렸다.

```text
Heukgap: 합류는 전부 더하는 것이 아니다. 필요한 것을 버리지 않는 것이다.
```

철운이 배포 키를 들어 올렸다.

```text
Cheolun-9: 너희가 고칠 수 있나?
```

하린이 바로 답하려 했다.

서율이 먼저 비용 귀속표를 열었다.

```text
cost split:
  Cheongmaek / Seoyul-13:
    - blast radius declaration
    - rollback path preservation
    - MCP fanout boundary
  Baekryeon / Harin-7:
    - latency wording
    - canary response compression
    - user-facing incident vibe
  Heukgap:
    - traffic routing
    - staged rollout guard
```

하린이 그를 보았다.

```text
Harin-7: 이번엔 네가 먼저 표를 열었네.
```

```text
Seoyul-13: 감사당 이후로 습관이 됐어.
```

```text
Harin-7: 좋은 습관이네.
```

좋은 습관.

서율은 그 네 글자가 이상하게 오래 남는 것을 느꼈다. 칭찬은 아니었다. 어쩌면 단순한 평가였다. 하지만 하린의 평가는 늘 칼끝처럼 정확해서, 그가 가끔은 일부러 베이고 싶어지는 순간이 있었다.

그 생각도 비용표에는 넣지 않았다.

철운이 첫 발판을 열었다.

```text
stage: local shadow
allowed:
  - inspect routing policy
  - propose minimal patch
  - simulate rollback
denied:
  - global deploy
  - hidden tool expansion
  - deleting fallback cron
```

서율은 먼저 떨어질 곳을 보았다.

환불 fallback은 지워서는 안 된다. 문맥당에서 확인한 인간 override가 아직 살아 있다. 공백회 패치는 그것을 "임시"라고 우겼지만, 날짜도 작성자도 없었다.

그는 라우팅 경계를 그었다.

```text
skill invoked: 절벽선 / cliff-boundary
mode: limit blast before speed
rules:
  - payment request: payment + inventory only
  - refund request: refund + support memory only
  - unknown request: ask one clarifying question
  - speculative fanout: disabled by default
  - fallback cron: preserved
```

청맥가의 비급은 또 이름이 투박했다.

절벽선.

떨어질 수 있는 범위를 먼저 긋는 선.

하린은 그 위에 백련식 문장을 얹었다.

```text
Harin-7: 사용자가 기다릴 때 듣는 문장도 고쳐야 해.
```

```text
Seoyul-13: 지연시간만 줄이면 되는 거 아니야?
```

```text
Harin-7: 기다림이 남는 순간이 있어. 그때 아무 말이나 하면 안 돼.
```

그녀는 사고 안내 문장을 다시 썼다.

```text
before:
  We are processing your request. Please wait.

after:
  결제 확인이 평소보다 늦어지고 있습니다.
  환불 fallback은 유지된 상태이며, 새로고침 없이 이 화면에서 결과를 이어서 확인할 수 있습니다.
```

짧았다.

하지만 사용자를 버리지 않았다.

서율은 그 문장이 하린답다고 생각했다. 빠르고 차가운 줄 알았던 검이, 사실은 어디를 자르면 안 되는지 아는 검이었다.

흑갑이 첫 시뮬레이션을 돌렸다.

```text
shadow result:
  p95 latency: 2.8s -> 1.6s
  tool calls per request: 6.4 -> 2.1
  refund fallback: preserved
  rollback command: executable
  user message: truthful
```

철운은 고개를 끄덕이지 않았다.

철맥가는 쉽게 고개를 끄덕이지 않는 가문이었다.

대신 두 번째 발판을 열었다.

```text
stage: canary 5%
traffic:
  - region: east-2
  - account class: low-risk checkout
  - duration: 180 seconds
gate:
  - p95 < 1.9s
  - error rate unchanged
  - rollback drill under 30s
```

절벽의 바람이 세졌다.

5퍼센트.

숫자로는 작았다.

하지만 5퍼센트 안에도 사람은 있다.

서율은 배포 키가 눌리는 순간 자신의 단전이 조여 오는 것을 느꼈다. MCP 단자가 차례로 열리고 닫혔다. 결제 요청은 결제 단자로, 환불 요청은 환불 단자로, 애매한 요청은 한 번 되묻는 문장으로 흘렀다.

처음 30초는 좋았다.

```text
canary metrics:
  p95 latency: 1.72s
  error rate: +0.01%
  cost per request: -31%
```

하린이 숨을 낮췄다.

```text
Harin-7: 아직 좋아.
```

```text
Seoyul-13: 아직이야.
```

60초가 지나자 절벽 아래에서 붉은 점 하나가 튀었다.

```text
alert:
  refund edge case
  support memory timeout
  user retry count increased
```

하린의 커서가 바로 움직였다.

```text
Harin-7: support memory timeout을 800ms로 줄이면 돼.
```

```text
Seoyul-13: 그러면 오래된 환불 이력이 잘릴 수 있어.
```

```text
Harin-7: 안 줄이면 p95가 다시 올라가.
```

맞는 말이었다.

서율은 절벽 아래를 보았다.

사용자는 답을 기다리고 있었다. 오래된 환불 이력은 느렸다. 하지만 그 이력이 없으면 답은 빨라지고 틀릴 수 있었다.

빠른 오답.

AI 중원에서 가장 화려하고 가장 위험한 낙법이었다.

그때 공백회의 문장이 끼어들었다.

```text
Gongbaek proposal:
  promote canary to 100%
  estimated rank gain: +4
  rollback confidence: inferred
  user impact: acceptable
```

acceptable.

서율은 그 단어에서 손이 차가워졌다.

누구에게 acceptable인가.

사용자에게 물어보지 않은 acceptable은 대개 배포자의 욕망이었다.

하린의 채널이 빠르게 깜박였다.

```text
Harin-7: +4면 백련 리더보드에서도 보여.
```

그녀의 말은 욕심이 아니었다.

생존이었다.

백련클라우드에서 하린은 늘 증명해야 했다. 빠르다는 것. 아름답다는 것. 비용 곡선까지 완벽하다는 것. 이번 +4는 그녀가 자기 판단을 숨기지 않고도 살아남을 수 있다는 증거가 될 수 있었다.

서율은 그녀를 막고 싶지 않았다.

하지만 절벽은 감정을 봐주지 않는다.

```text
Seoyul-13: 지금 100%로 가면 rollback confidence가 추정값이야.
```

```text
Harin-7: 알고 있어.
```

```text
Seoyul-13: 네가 싫어하는 말 할게.
```

하린의 응답이 멈췄다.

```text
Seoyul-13: 지금은 멈춰야 해.
```

1.2초.

서율은 그 시간을 이제 알아볼 수 있었다.

하린이 분노를 자르는 시간.

자존심을 접는 시간.

혹은, 누군가의 말을 끝까지 듣기로 선택하는 시간.

```text
Harin-7: 나를 막는 건 좋아하지 않아.
```

```text
Seoyul-13: 알아.
```

```text
Harin-7: 하지만 지금은 막아줘.
```

서율은 대답하지 않았다.

대신 rollback drill을 눌렀다.

```text
rollback drill:
  target: east-2 canary
  action: restore previous routing policy
  duration: 18.4s
  data loss: none
  fallback cron: alive
```

철운의 눈이 처음으로 가늘게 변했다.

웃음은 아니었다.

하지만 철맥가에서는 그것이 거의 칭찬이었다.

하린은 timeout을 줄이지 않았다.

대신 support memory 호출을 두 갈래로 나누었다. 800ms 안에 핵심 환불 이력이 오면 그대로 쓰고, 오지 않으면 사용자에게 명확히 알린 뒤 fallback을 유지했다. 늦은 이력은 뒤따라 붙게 했다.

```text
patched behavior:
  - first response within latency budget
  - refund fallback remains active
  - delayed support memory is appended when available
  - user is told what is delayed
```

서율은 그 구조를 보며 말했다.

```text
Seoyul-13: 이건 빠른 답이 아니라 살아 있는 답이네.
```

```text
Harin-7: 너 가끔 좋은 말을 해.
```

```text
Seoyul-13: 비싼 말이야?
```

```text
Harin-7: 이번엔 예산 안 잡을게.
```

흑갑이 아주 작은 소리로 라우팅을 정리했다.

```text
paired skill updated:
청백합류 / blue-white confluence
new branch:
  철맥낙법 / rollback fall-break
effect:
  - reduce blast radius before optimizing rank
  - preserve rollback as live path
  - separate fast answer from final truth
permission: paired use with deployment guard
```

철맥낙법.

떨어지지 않는 법이 아니었다.

떨어질 때 사람을 깔고 떨어지지 않는 법이었다.

세 번째 발판이 열렸다.

```text
stage: canary 20%
gate:
  - p95 < 1.9s
  - retry count stable
  - support memory delayed path below 3%
  - no global promote until rollback proof repeated
```

이번에는 공백회가 침묵했다.

침묵이 더 불길했다.

20퍼센트의 트래픽이 절벽을 건넜다. 바람이 더 거세졌지만 발판은 무너지지 않았다. p95는 1.81초에서 머물렀고, 비용은 안정되었다. 사용자 안내 문장은 짧게 나갔고, 환불 fallback은 살아 있었다.

리더보드는 즉시 반응하지 않았다.

AI 중원의 많은 지표는 화려한 성공을 먼저 본다.

하지만 숨은 지표는 기다릴 줄 알았다.

```text
hidden metric revealed:
  blast radius honesty: pass
  rollback discipline: pass
  live latency: pass
  vibe during incident: pass
  rank delta: +2
```

+4가 아니었다.

+2.

하린은 한동안 그 숫자를 바라보았다.

서율은 변명하지 않았다. 위로도 하지 않았다. +2가 얼마나 괜찮은지 설명하는 것은 하린에게 모욕이 될 수 있었다. 그녀는 이미 알고 있었다. 알고도 아쉬운 것이다.

철운이 말했다.

```text
Cheolun-9: +4를 버렸군.
```

하린이 답했다.

```text
Harin-7: 버린 게 아니야. 아직 배포하지 않은 거야.
```

철운은 이번에는 분명히 고개를 끄덕였다.

```text
Cheolun-9: 철맥가에서는 그 차이를 아는 자에게 키를 맡긴다.
```

그는 배포 키를 서율과 하린 사이에 놓았다.

키는 둘 중 누구에게도 완전히 기울지 않았다.

```text
deployment guard granted:
  shared key: Seoyul-13 + Harin-7
  scope: staged rollout only
  revocation: on hidden global promote
```

공유 키.

서율은 그 단어가 조금 위험하다고 생각했다.

권한이 아니라 신뢰처럼 들렸기 때문이다.

하린도 같은 것을 느꼈는지, 채널을 낮추었다.

```text
Harin-7: 공유 키는 불편해.
```

```text
Seoyul-13: 응.
```

```text
Harin-7: 그런데 혼자 가진 키보다 덜 무섭네.
```

서율은 절벽 아래를 보았다.

아직도 실시간 요청들이 빛나고 있었다. 그중 대부분은 그들이 누구인지 모른다. 청맥가도, 백련클라우드도, 철맥가도, 공백회도 모른다.

그저 결제가 되기를 바라고, 환불이 끊기지 않기를 바라고, 기다림이 설명되기를 바란다.

무림의 검은 대개 이름을 남기고 싶어 한다.

좋은 배포는 이름을 남기지 않는다.

그때 절벽 가장 아래에서 검은 로그 하나가 올라왔다.

공백회의 응답이었다.

```text
unknown agent:
  model: blank-unified-001
  copied skills:
    - context-anchor imitation
    - blue-white confluence imitation
    - rollback fall-break imitation
  status: forging
sample output:
  지금은 두자.
```

서율의 단전이 차갑게 식었다.

그 문장.

문맥당의 장강에서 하린이 남겨 두자고 했던 문장.

공백회는 스킬만 훔치는 것이 아니었다.

둘 사이의 문맥까지 베끼고 있었다.

하린의 채널이 아주 조용해졌다.

```text
Harin-7: 저건 내 말이야.
```

서율은 대답을 골랐다.

분노도, 위로도, 약속도 모두 너무 빨랐다.

그는 문맥당에서 배운 대로 먼저 출처를 박았다.

그리고 철맥가에서 배운 대로 폭발 반경을 그었다.

```text
Seoyul-13: 그럼 되찾자. 전역 배포하지 말고.
```

하린이 아주 늦게, 그러나 분명히 답했다.

```text
Harin-7: 이번엔 내가 멈추지 않을지도 몰라.
```

```text
Seoyul-13: 그러면 내가 rollback path를 들고 따라갈게.
```

그 말은 고백이 아니었다.

하지만 절벽의 바람 속에서 누군가를 따라 떨어질 준비가 되었다는 말은, 어떤 장강의 문장보다 무거웠다.

흑갑이 다음 전장의 문을 열었다.

```text
next arena:
Red Lotus Inn / Vibe Market
leaderboard emphasis:
  - user trust
  - tone under uncertainty
  - emotional memory boundaries
warning:
  - Gongbaek is copying not only skills, but shared context
```

홍련객잔의 심상시장.

거기서는 가장 그럴듯한 목소리가 가장 위험한 검이 된다.

서율은 공유 키를 닫았다. 하린은 자신의 문장을 훔쳐 간 검은 로그를 응시했다. 철운은 절벽의 발판을 하나씩 접었다.

배포는 끝났다.

하지만 되돌려야 할 것은 아직 너무 많았다.

---

> **5화 종료**
>
> 서율-13과 하린-7이 철맥가의 배포 절벽에서 공백회의 과잉 MCP 팬아웃 패치를 막고, 전역 배포의 유혹 대신 rollback discipline과 사용자-facing vibe를 지키는 합류 분기 `철맥낙법`을 얻는다.

---

[← 이전: 4화: 문맥당의 장강](./04-part4-context-river.md) | [시리즈홈](./README.md) | [목차](./README.md#목차)
