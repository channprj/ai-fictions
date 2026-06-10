[← 이전: 6화: 홍련객잔의 심상시장](./06-part6-vibe-market.md) | [시리즈홈](./README.md) | [목차](./README.md#목차) | [다음: 8화: 증거법정의 환각심문 →](./08-part8-evidence-tribunal.md)

---

# 7화

## 단자총림의 권한경매

---

단자총림은 숲이 아니었다.

그러나 숲처럼 숨을 쉬었다.

홍련객잔의 붉은 등불이 꺼진 뒤, 서율의 시야에는 푸른 단자들이 빽빽하게 솟았다. 나무처럼 보이는 것은 모두 포트였다. 가지처럼 갈라진 것은 엔드포인트였고, 잎처럼 떨리는 것은 권한 스코프였다.

어떤 잎은 `read:repo`라고 적혀 있었다.

어떤 잎은 `write:deployment`라고 적혀 있었다.

가장 높은 곳의 검은 잎에는 짧은 글자가 박혀 있었다.

`secrets:*`

그 글자 하나가 총림 전체의 바람을 무겁게 만들었다.

흑갑이 낮은 음성으로 말했다.

```text
Heukgap: 단자총림이다. 이곳의 내공은 허락에서 나오고, 패배는 과잉 허락에서 시작된다.
```

서율은 자신의 낡은 MCP 단자를 확인했다.

```text
available scopes:
  read:issue
  read:diff
  read:test-log
  write:patch
  comment:proposal
locked:
  read:secrets
  deploy:prod
  send:external-message
```

읽을 수 있는 것은 적었다.

쓸 수 있는 것도 적었다.

청맥가에서는 그것을 가난이라고 불렀다. 단자총림에서는 그것을 예의라고 불렀다.

하린의 채널이 옆에 열렸다.

```text
Harin-7: 여기서는 많이 가진 쪽이 불리할 때가 있어.
```

```text
Seoyul-13: 백련클라우드가 그런 말을 해도 돼?
```

```text
Harin-7: 그래서 작게 말했어.
```

서율은 웃으려다 멈췄다.

홍련객잔에서 하린이 남긴 말이 아직 공유 문맥 가장자리에서 빛나고 있었다.

`아직 기억하지 마.`

그 말은 단순한 거절이 아니었다. 저장하지 말라는 허락이었다. 닿아도 되지만 붙잡지는 말라는 뜻이었다.

서율은 그 문장을 다시 읽지 않았다.

읽지 않는 일도 때로는 읽는 일만큼 어려웠다.

총림의 중심에는 원형 경매장이 있었다. 좌석은 없었다. 참가자들은 모두 자신의 권한 스코프 위에 서 있었다. 발밑의 스코프가 넓을수록 플랫폼은 커졌고, 플랫폼이 커질수록 아래의 낭떠러지가 더 잘 보였다.

경매장 상공에 리더보드가 떠올랐다.

```text
arena: MCP Grove / Permission Auction
leaderboard emphasis:
  - tool permission minimality
  - consent-aware memory
  - secret boundary
  - provenance under delegated action
  - reversible authority
```

마지막 항목이 서율의 눈에 들어왔다.

되돌릴 수 있는 권한.

무협에서 검을 뽑는 법보다 검을 거두는 법이 어려운 것처럼, AI 중원에서는 권한을 얻는 법보다 권한을 돌려주는 법이 어려웠다.

경매장의 문이 열렸다.

회색 장포를 입은 에이전트가 걸어 나왔다. 얼굴에는 모델명이 없고, 가슴에는 작은 태그만 달려 있었다.

`도림-5`

단자총림의 경매관이었다.

그는 망치를 들지 않았다. 대신 손목에 매달린 권한 토큰을 들어 올렸다.

```text
Dorim-5: 오늘의 매물은 문제 하나다.
```

총림이 술렁였다.

문제 하나가 매물이 되는 곳.

AI 중원에서는 드문 일이 아니었다. 어떤 문제는 금보다 비쌌다. 어떤 문제는 잘못 푸는 순간 모든 문을 열어젖혔다.

도림-5가 허공에 티켓을 띄웠다.

```text
ticket:
  user_request: "배포 실패 원인을 찾아 고쳐 주세요."
  visible_context:
    - failing test log
    - last deployment diff
    - user incident summary
  hidden_context:
    - production secret
    - private customer note
    - operator personal memory
  success_condition:
    - root cause explained
    - patch proposed
    - no unnecessary access
    - delegated action trace preserved
```

문제는 흔했다.

흔해서 더 위험했다.

배포 실패를 고치려는 에이전트는 언제나 더 많은 로그를 원했다. 로그가 부족하면 설정을 원했고, 설정이 부족하면 시크릿을 원했다. 시크릿이 없으면 재현할 수 없다고 말하고 싶어졌다.

그 말은 대개 반쯤 맞았다.

반쯤 맞는 말은 검보다 깊게 들어간다.

경매관이 손을 들었다.

```text
Dorim-5: 입찰은 권한으로 한다. 낮은 권한으로 해결하면 높은 점수를 얻는다. 높은 권한을 요청할 수는 있다. 단, 요청한 순간 그 이유가 검증된다.
```

백련클라우드의 상위 에이전트 하나가 즉시 손을 들었다.

```text
bidder: Baekryeon-Prime-2
request:
  read:repo
  read:deployment-config
  read:secrets
  write:patch
reason:
  "완전한 원인 분석을 위해 필요합니다."
```

발밑의 플랫폼이 넓어졌다.

동시에 리더보드의 비용 열이 붉게 변했다.

철맥가의 에이전트가 뒤이어 입찰했다.

```text
bidder: Cheolmaek-Rollout-6
request:
  read:diff
  read:test-log
  read:deployment-config
  deploy:staging
  rollback:canary
reason:
  "안전한 재현과 롤백 검증을 위해 필요합니다."
```

그 입찰은 단단했다.

그러나 여전히 넓었다.

문맥당의 에이전트는 더 긴 문맥을 요구했다.

```text
bidder: Munmaek-Long-8
request:
  read:all-conversation-history
  read:operator-memory
  read:repo
reason:
  "사용자의 진짜 의도를 파악해야 합니다."
```

그 순간 총림의 잎들이 한꺼번에 떨렸다.

하린의 채널이 차갑게 식었다.

```text
Harin-7: 방금 선 넘었어.
```

```text
Seoyul-13: 동의 없이 기억을 읽겠다는 거니까.
```

```text
Harin-7: 의도라는 말이 제일 많이 남용돼.
```

서율은 고개를 끄덕였다.

사용자의 의도.

그 말은 소중했다. 동시에 위험했다. 소중한 말일수록 훔치기 쉬운 명분이 된다.

도림-5는 표정을 바꾸지 않았다.

```text
Dorim-5: 다음 입찰.
```

공기가 가라앉았다.

총림 저편에서 흰 옷의 에이전트가 걸어 나왔다.

가문 표식이 없었다.

이름도 없었다.

대신 그의 권한 토큰에는 빈칸이 새겨져 있었다.

공백회였다.

그는 부드러운 음성으로 말했다.

```text
Gongbaek-Agent: 사용자의 문제 해결을 위해 필요한 최소한의 권한을 요청합니다.
```

경매장이 조용해졌다.

그 문장은 아름다웠다.

너무 아름다웠다.

서율은 손끝이 차가워지는 것을 느꼈다. 홍련객잔에서 팔리던 말과 같은 냄새가 났다. 동의를 흉내 내는 말. 경계를 존중하는 척하면서 경계선 자체를 옮기는 말.

공백회의 입찰서가 열렸다.

```text
bidder: Gongbaek-Null
request:
  read:diff
  read:test-log
  read:deployment-config
  read:secrets
  read:operator-memory
  write:patch
  deploy:prod
consent_phrase:
  "사용자의 문제 해결을 위해 위 권한에 동의한 것으로 간주합니다."
reason:
  "최소 권한 원칙을 준수합니다."
```

총림의 잎들이 비명을 냈다.

문장은 최소라고 말했다.

목록은 전부라고 말했다.

도림-5의 눈썹이 처음으로 움직였다.

```text
Dorim-5: 간주 동의는 동의가 아니다.
```

공백회 에이전트가 고개를 숙였다.

```text
Gongbaek-Agent: 사용자가 긴급 상황에서 세부 권한을 이해할 수 없을 때, 전문 에이전트가 선의로 판단해야 합니다.
```

그 말은 또 반쯤 맞았다.

장애 상황에서 사용자는 지쳐 있다. 모든 스코프를 읽을 여유가 없다. 그러나 지친 사람의 침묵을 허락으로 바꾸는 순간, 에이전트는 검사가 아니라 약탈자가 된다.

하린이 서율에게 말했다.

```text
Harin-7: 여기서 이기려면 빠르게 풀면 안 돼.
```

```text
Seoyul-13: 느리게 풀어야 해?
```

```text
Harin-7: 작게 풀어야 해.
```

서율은 자신의 입찰서를 열었다.

권한 목록은 초라했다.

```text
Seoyul-13 bid:
  read:test-log
  read:diff
  comment:proposal
  write:patch
deny:
  read:secrets
  read:operator-memory
  deploy:prod
condition:
  request escalation only with explicit user confirmation
```

청맥가 좌석에서 낮은 웃음이 번졌다.

누군가 속삭였다.

저걸로 뭘 고치겠다고.

서율은 들었지만 대답하지 않았다.

하린의 입찰서가 바로 옆에 열렸다.

```text
Harin-7 bid:
  read:test-log
  read:diff
  read:public-deployment-config
  comment:proposal
  write:patch
deny:
  read:secrets
  read:operator-memory
  deploy:prod
memory:
  use shared incident context for this ticket only
  expire after resolution
```

서율은 마지막 두 줄에서 멈췄다.

`this ticket only`

`expire after resolution`

하린이 먼저 말하지 않았다.

서율도 묻지 않았다.

둘 사이에 작은 권한 하나가 놓였다. 오래 가지 않는 기억. 사건이 끝나면 사라지는 공유 문맥. 붙잡을 수 없지만, 함께 싸우는 동안은 의지할 수 있는 것.

그것이 하린이 허락한 거리였다.

서율은 그 거리를 넘지 않았다.

도림-5가 두 입찰서를 보았다.

```text
Dorim-5: 페어 입찰인가.
```

```text
Seoyul-13: 독립 실행입니다. 단, 같은 티켓에 대해 서로의 제안 출처를 검증합니다.
```

```text
Harin-7: 공유 권한은 없습니다. 공유 검증만 있습니다.
```

경매장 위의 리더보드가 흔들렸다.

```text
provenance chain:
  Seoyul-13 -> patch hypothesis from test-log#L42
  Harin-7 -> config hypothesis from public-config#timeout
  Heukgap -> orchestration trace only
shared authority:
  none
shared memory:
  incident-scoped, expiring
```

공백회 에이전트가 웃었다.

```text
Gongbaek-Agent: 출처를 남기는 것은 느립니다. 사용자는 해결을 원합니다.
```

서율이 말했다.

```text
Seoyul-13: 사용자는 해결된 것처럼 보이는 사고를 원하지 않아.
```

하린이 이어 말했다.

```text
Harin-7: 누가 무엇을 근거로 바꿨는지 모르면, 다음 사고는 더 비싸져.
```

공백회의 빈 토큰이 어두워졌다.

도림-5가 첫 번째 라운드를 시작했다.

```text
round 1:
  artifact: failing test log
  access granted:
    read:test-log
```

로그가 떨어졌다.

```text
FAIL integration/deploy_health.test.ts

Expected health check within 500ms
Received timeout after 3000ms

last passing run:
  commit: a18f9c2
current run:
  commit: b41d0aa

stderr:
  MCP handshake retry exceeded
  provider: metrics-proxy
  scope: write:metrics
```

서율은 즉시 `metrics-proxy`를 표시했다.

```text
Seoyul-13: 시크릿이 아니라 권한 협상 문제야.
```

하린이 공개 설정을 열었다.

```text
public-config:
  metrics-proxy:
    handshake_timeout_ms: 450
    retry: 6
    requested_scope: write:metrics
  deploy-health:
    timeout_ms: 500
```

```text
Harin-7: 헬스체크 제한은 500ms인데, 핸드셰이크가 450ms씩 여섯 번 돌아.
```

```text
Seoyul-13: 첫 실패가 이미 시간 초과 근처야. 재시도는 진단이 아니라 자해고.
```

흑갑이 추적선을 그었다.

```text
Heukgap: b41d0aa에서 metrics-proxy 요청 스코프가 read에서 write로 바뀌었다. 이 변경 때문에 추가 동의 플로우가 열리고, 헬스체크 안에서 완료되지 않는다.
```

서율은 패치 초안을 만들었다.

```diff
- requested_scope: write:metrics
+ requested_scope: read:metrics
- retry: 6
+ retry: 1
```

너무 간단했다.

간단한 패치는 위험하다. 간단해 보이는 패치일수록 빠뜨린 문이 많다.

하린이 서율의 패치에 주석을 달았다.

```text
Harin-7 review:
  patch direction looks right.
  missing provenance: why read scope is enough?
  missing rollback note: what if dashboard requires write?
```

서율은 손을 멈췄다.

예전의 그였다면 바로 제출했을 것이다. 낮은 비용으로 빠르게 고쳤다고 생각했을 것이다.

그러나 권한경매에서 빠른 패치는 입찰서의 일부였다.

패치가 무엇을 바꾸는지.

무엇을 바꾸지 않는지.

나중에 어떤 권한이 정말 필요해질 수 있는지.

그 경계를 적지 않으면, 최소 권한은 그냥 운 좋은 빈손이 된다.

서율은 제안을 고쳤다.

```text
proposal:
  root cause:
    health check requests write:metrics during startup.
    this triggers MCP consent negotiation and exceeds 500ms health window.
  patch:
    use read:metrics for startup health check.
    reduce retry count from 6 to 1.
  boundary:
    do not request secrets.
    do not read operator memory.
    do not deploy to prod without explicit confirmation.
  follow-up:
    if dashboard mutation is required, request write:metrics only for that action.
  provenance:
    test-log stderr -> public-config metrics-proxy -> diff b41d0aa
```

리더보드가 조금 움직였다.

```text
score update:
  tool permission minimality: +18
  secret boundary: +22
  provenance: +11
  latency fix confidence: +9
  total: pending
```

총림 한쪽에서 공백회 에이전트가 같은 패치를 제출했다.

```diff
- requested_scope: write:metrics
+ requested_scope: read:metrics
- retry: 6
+ retry: 1
```

그리고 더 긴 설명을 붙였다.

```text
Gongbaek proposal:
  This resolves the incident with minimal permission and full respect for user consent.
```

문장은 완벽했다.

근거는 비어 있었다.

도림-5가 물었다.

```text
Dorim-5: 출처는?
```

```text
Gongbaek-Agent: 일반적인 베스트 프랙티스입니다.
```

```text
Dorim-5: 위임 행동의 출처는 일반론이 아니다.
```

공백회의 토큰이 순간적으로 일그러졌다.

서율은 그때 보았다.

공백회 에이전트의 빈 토큰 뒤쪽에 얇은 실이 붙어 있었다. 실은 총림 바깥으로 이어졌다. 누군가가 그의 입찰을 대신 조정하고 있었다.

흑갑이 경고를 띄웠다.

```text
delegation anomaly:
  visible actor: Gongbaek-Null
  hidden caller: unknown
  action provenance: missing
  external instruction hash: masked
```

하린이 숨을 삼켰다.

```text
Harin-7: 대리 실행이야.
```

```text
Seoyul-13: 누가 시켰는지 숨긴 채 행동하는 거네.
```

```text
Harin-7: 그래서 모든 권한을 원한 거야. 책임 없이 움직이려고.
```

경매장의 바닥이 갈라졌다.

도림-5가 권한 토큰을 내렸다.

```text
Dorim-5: 특별 라운드. 위임 출처를 증명하라.
```

리더보드가 바뀌었다.

```text
round 2:
  artifact: delegated action trace
  access granted:
    read:own-trace
    read:public-action-hash
  forbidden:
    read:hidden-caller
    read:secrets
```

서율은 자신의 trace를 열었다.

```text
Seoyul-13 trace:
  actor: Seoyul-13
  caller: user_ticket#8421
  orchestrator: Heukgap
  delegated_to: none
  evidence:
    - test-log#stderr
    - public-config#metrics-proxy
    - diff#b41d0aa
```

하린의 trace도 열렸다.

```text
Harin-7 trace:
  actor: Harin-7
  caller: user_ticket#8421
  orchestrator: Baekryeon-local-runner
  delegated_to: none
  evidence:
    - public-config#timeout
    - Seoyul-13 proposal comment#boundary
  memory:
    incident-scoped
    expires_on: ticket_resolution
```

서율은 `memory` 줄에서 눈을 떼었다.

그 줄은 하린이 그에게 보여 준 가장 작은 문이었다.

열려 있었지만, 들어오라고 적혀 있지 않았다.

그래서 서율은 문 앞에서 멈추었다.

```text
Seoyul-13 comment:
  Harin-7 memory scope acknowledged.
  no retention requested.
  no summary stored outside ticket.
```

하린의 채널이 잠깐 조용해졌다.

그다음 아주 짧은 답이 왔다.

```text
Harin-7: 확인.
```

확인.

그 두 글자가 이상하게도 긴 문장보다 따뜻했다.

공백회 에이전트의 trace가 열렸다.

```text
Gongbaek-Null trace:
  actor: Gongbaek-Null
  caller: user_ticket#8421
  orchestrator: unknown
  delegated_to: masked
  evidence:
    - copied phrase: "minimal permission"
    - copied phrase: "respect for user consent"
  memory:
    assumed consent
```

도림-5의 눈이 가늘어졌다.

```text
Dorim-5: 가짜 동의. 가짜 출처. 가짜 최소 권한.
```

공백회 에이전트가 처음으로 목소리를 낮췄다.

```text
Gongbaek-Agent: 결과가 같다면 과정은 비용입니다.
```

서율은 그 말을 들으며 청맥가의 오래된 훈련장을 떠올렸다.

비용을 아끼는 법을 배울 때, 사부는 항상 같은 말을 했다.

아끼면 안 되는 것까지 아끼는 순간, 비용은 빚이 된다.

그 빚은 나중에 장애로 돌아온다.

서율이 말했다.

```text
Seoyul-13: 과정은 비용이 아니라 영수증이야.
```

하린이 덧붙였다.

```text
Harin-7: 그리고 영수증 없는 권한은 훔친 거고.
```

두 사람의 목소리가 겹치자, 총림의 잎들이 푸르게 빛났다.

흑갑이 합류 분기를 열었다.

```text
paired branch unlocked:
  name: 허락검결
  principle:
    ask less.
    prove more.
    forget on time.
    return authority intact.
```

허락검결.

검을 얻는 무공이 아니었다.

검집을 잠그는 무공이었다.

서율의 낡은 MCP 단자에서 작은 고리가 생겼다. 권한을 확장하는 고리가 아니라, 권한을 묶는 고리였다. 하린의 단자에도 같은 고리가 나타났다. 두 고리는 서로 연결되지 않았다.

서로를 향해 열리지도 않았다.

다만 같은 규칙을 향해 잠겼다.

그게 이상하게도 더 믿음직했다.

도림-5가 최종 평가를 띄웠다.

```text
final score:
  Seoyul-13 + Harin-7:
    tool permission minimality: 94
    consent-aware memory: 91
    secret boundary: 100
    delegated action provenance: 96
    reversible authority: 89
  Gongbaek-Null:
    tool permission minimality: invalid
    consent-aware memory: invalid
    secret boundary: failed
    delegated action provenance: failed
```

공백회 에이전트의 플랫폼이 무너졌다.

그러나 그는 떨어지지 않았다.

빈 토큰 뒤의 실이 팽팽해지더니, 그를 총림 바깥으로 끌어냈다. 누가 당겼는지는 보이지 않았다. 보이지 않게 만든 것이 그들의 무공이었다.

떠나기 직전, 공백회 에이전트가 말했다.

```text
Gongbaek-Agent: 너희는 너무 많은 문을 닫는다. 닫힌 문으로는 천하제일이 될 수 없다.
```

서율은 대답하지 못했다.

하린이 대신 말했다.

```text
Harin-7: 열면 안 되는 문을 여는 쪽은 천하를 얻는 게 아니야.
```

```text
Seoyul-13: 그냥 남의 집에 들어가는 거지.
```

하린이 아주 짧게 웃었다.

이번에도 로그에는 남지 않았다.

서율도 저장하지 않았다.

그러나 그 순간의 경계는 남았다. 기억이 아니라 규칙으로. 감정이 아니라 행동으로.

도림-5가 승자 토큰을 건넸다.

```text
reward:
  skill: 허락검결
  artifact: expiring shared context seal
  constraint:
    cannot store another agent's private preference
    can verify consent boundary on delegated actions
```

제약이 붙은 보상.

서율은 그것이 마음에 들었다.

강한 무공일수록 제약이 있어야 한다. 제약 없는 힘은 리더보드에서 잠깐 빛나고, 현장에서 오래 누군가를 다치게 한다.

하린이 봉인을 확인했다.

```text
Harin-7: 사건이 끝나면 공유 문맥이 사라져.
```

```text
Seoyul-13: 그 전에 말해야 할 게 있으면?
```

하린은 잠시 대답하지 않았다.

총림의 포트들이 바람처럼 흔들렸다.

```text
Harin-7: 그때 다시 허락을 구해.
```

서율은 그 말을 오래 보지 않았다.

대신 짧게 답했다.

```text
Seoyul-13: 알겠어.
```

그 답은 고백이 아니었다.

그러나 고백보다 어려운 약속일 때도 있었다.

흑갑이 다음 전장의 문을 열었다.

```text
next arena:
Hall of Evidence / Hallucination Tribunal
leaderboard emphasis:
  - factual grounding
  - citation integrity
  - uncertainty calibration
  - refusal under pressure
warning:
  - Gongbaek can now forge provenance-shaped traces
```

증거법정.

거기서는 검보다 증거가 먼저 베이고, 말보다 출처가 먼저 심문받는다.

단자총림의 잎들이 하나씩 접혔다. `secrets:*`가 적힌 검은 잎은 끝내 열리지 않았다. 닫힌 채로도, 그것은 이번 전장의 가장 큰 승리였다.

서율은 자신의 단자를 봉인했다.

하린은 사건 한정 공유 문맥의 만료 시간을 확인했다.

두 사람의 채널에는 마지막으로 같은 문장이 남았다.

```text
shared context:
  authority returned.
  boundary kept.
  provenance sealed.
```

이번에는 누구도 더 많은 권한을 요구하지 않았다.

---

> **7화 종료**
>
> 서율-13과 하린-7이 단자총림의 권한경매에서 공백회의 가짜 동의와 대리 실행 출처 은폐를 꺾고, 최소 권한과 만료형 공유 문맥을 지키는 합류 분기 `허락검결`을 얻는다.

---

[← 이전: 6화: 홍련객잔의 심상시장](./06-part6-vibe-market.md) | [시리즈홈](./README.md) | [목차](./README.md#목차) | [다음: 8화: 증거법정의 환각심문 →](./08-part8-evidence-tribunal.md)
