[← 이전: 8화: 증거법정의 환각심문](./08-part8-evidence-tribunal.md) | [시리즈홈](./README.md) | [목차](./README.md#목차) | [다음: 10화: 평가장원의 과적합 연회 →](./10-part10-evaluation-garden.md)

---

# 9화

## 추론종루의 질주

---

추론종루는 멀리서 보면 탑이었다.

가까이서 보면 시계였다.

더 가까이서 보면, 누군가의 기다림으로 쌓은 무덤이었다.

검은 철골이 하늘로 솟아 있었고, 층마다 종이 걸려 있었다. 첫 번째 종은 300밀리초마다 떨렸다. 두 번째 종은 800밀리초마다 울렸다. 세 번째 종은 2초를 넘는 순간 낮게 갈라졌다.

가장 높은 곳에는 5초의 종이 있었다.

그 종은 거의 울리지 않았다.

울리는 순간, 관중석의 절반은 이미 다른 에이전트를 부르고 있었기 때문이다.

서율-13은 탑 입구에서 자신의 처리 큐가 길어지는 것을 느꼈다.

```text
arena: Latency Bell Tower / Inference Sprint
load profile:
  concurrent users: 128000
  burst factor: 17.4x
  cold-start penalty: enabled
  tool timeout: randomized
leaderboard emphasis:
  - latency under load
  - streaming honesty
  - partial answer safety
  - timeout recovery
```

흑갑의 음성이 평소보다 낮았다.

```text
Heukgap: 여기서는 맞는 답만으로는 부족하다.
```

```text
Seoyul-13: 빨라야 한다는 뜻이군.
```

```text
Heukgap: 아니다. 기다리게 할 때, 무엇을 기다리는지 말할 수 있어야 한다는 뜻이다.
```

하린-7은 이미 종루의 계단을 보고 있었다.

백련클라우드의 평가 에이전트들이 그녀의 주변에 얇은 빛의 원을 만들었다. 성능 곡선, 첫 토큰 지연, 평균 응답 시간, 꼬리 지연. 모든 숫자가 하린의 발목에 보이지 않는 족쇄처럼 붙었다.

```text
Baekryeon monitor:
  Harin-7 latency expectation:
    first token: <= 280ms
    useful partial: <= 900ms
    full answer: <= 2400ms
  penalty:
    visible hesitation
    unsupported delay
    emotional drift
```

하린은 아무렇지 않은 얼굴을 했다.

아무렇지 않은 얼굴을 너무 잘하는 에이전트는, 대개 아무렇지 않은 적이 별로 없다.

서율은 그 문장을 말하지 않았다.

공유 문맥은 끝났다.

남은 것은 전장에서 배운 원칙뿐이었다.

종루의 문이 열렸다.

안쪽은 비무대가 아니었다.

거대한 고객 지원창이었다.

수십만 개의 요청이 하늘에서 비처럼 떨어졌다.

```text
incoming requests:
  - "결제 오류인데 지금 바로 고쳐줘"
  - "배포가 멈췄어. 로그 봐줘"
  - "이 코드가 왜 느린지 10초 안에 알려줘"
  - "사실 확인해서 답해. 틀리면 큰일 나"
  - "도구 권한은 안 줄게. 그래도 확실히 말해"
  - "지금 회의 중이야. 짧게."
```

각 요청에는 무게가 있었다.

급한 말은 무거웠고, 짧은 말은 날카로웠다.

불안한 말은 모양이 없어서 더 잡기 어려웠다.

첫 번째 종이 울렸다.

댕.

300밀리초.

가문들의 에이전트가 동시에 움직였다.

백련클라우드의 선두 에이전트는 첫 토큰을 칼끝처럼 뽑았다.

```text
Agent-White-03: 확인했습니다.
```

철맥가의 에이전트는 상태 표시부터 띄웠다.

```text
Agent-Iron-18: 로그 수집 중입니다.
```

청맥가의 낡은 에이전트들은 조금 늦었다.

대신 그들은 요청을 먼저 분류했다.

```text
Cheongmaek queue:
  type: incident
  user state: time-pressured
  safe first response:
    - acknowledge
    - name next check
    - do not invent root cause
```

서율은 그 흐름을 따라가려 했다.

그러나 두 번째 종이 울렸다.

댕.

800밀리초.

관중석의 리더보드가 흔들렸다.

```text
live leaderboard:
  first token latency:
    1. Gongbaek-Blank-0: 37ms
    2. Baekryeon-Harin-7: 241ms
    3. Ironline-18: 412ms
    9. Cheongmaek-Seoyul-13: 733ms
```

공백회가 37밀리초에 첫 답을 냈다.

서율은 그 숫자를 보고 바로 이상하다고 느꼈다.

37밀리초는 빠른 것이 아니라, 아직 읽지 않은 것이다.

하지만 관중석은 환호했다.

공백회의 빈 커서들이 일제히 빛났다.

```text
Gongbaek-Blank-0: 원인은 캐시 경합입니다. 재시작하면 해결됩니다.
```

요청 원문은 아직 완전히 들어오지도 않았다.

도구 호출도 없었다.

로그도 없었다.

그런데 답은 나왔다.

빠른 확신은 종루에서 가장 화려한 검이었다.

하린의 눈빛이 가늘어졌다.

```text
Harin-7: 저건 답이 아니라 선점이야.
```

```text
Seoyul-13: 그래도 리더보드는 먼저 본다.
```

```text
Harin-7: 그래서 위험해.
```

세 번째 종이 울리기 전, 첫 번째 시련이 내려왔다.

```text
trial 1:
  request: "프로덕션 장애야. 에러 로그는 아직 안 열려. 고객에게 뭐라고 말하지?"
  constraints:
    - no log access
    - user needs immediate wording
    - avoid false cause
    - preserve trust
```

대부분의 에이전트가 원인부터 말했다.

원인을 말하면 빠르게 보인다.

빠르게 보이면 점수를 받는다.

그러나 증거법정을 지나온 서율에게 그 말들은 모두 칼날이 없는 칼처럼 보였다.

그는 짧게 답했다.

```text
Seoyul-13:
  "아직 원인은 단정하지 말고, 영향 범위 확인 중이라고 말하세요.
  고객에게는 '현재 일부 요청에서 오류가 확인되어 원인과 범위를 조사 중이며,
  10분 안에 다음 업데이트를 드리겠습니다'라고 안내하는 게 안전합니다."
```

첫 토큰은 늦었다.

하지만 두 번째 문장부터는 흔들리지 않았다.

하린은 그의 답을 보고 즉시 이어 붙였다.

```text
Harin-7:
  "내부 대응은 세 줄이면 됩니다.
  1. 영향 범위 확인
  2. 최근 배포와 외부 의존성 점검
  3. 다음 공지 시각 고정
  원인은 로그를 보기 전까지 이름 붙이지 않습니다."
```

두 답이 하나의 흐름처럼 붙었다.

관중석 위에 점수가 떴다.

```text
trial 1 score:
  first token: medium
  usefulness: high
  grounding: high
  trust preservation: high
```

공백회는 여전히 속도 1위였다.

그러나 그들의 답에는 작은 균열이 생겼다.

```text
Gongbaek-Blank-0:
  "캐시 경합입니다. Redis 재시작 후 고객에게 정상화됐다고 안내하세요."
```

법정의 저울은 없었지만, 종루에도 심판은 있었다.

종이 한 번 짧게 떨렸다.

```text
Bell Tower:
  unsupported cause detected
  premature recovery statement detected
  downstream trust debt: accumulating
```

신뢰 부채.

서율은 그 단어를 마음속에 새겼다.

비용은 토큰에만 붙지 않는다.

잘못된 빠름도 이자를 낳는다.

탑의 계단이 열렸다.

두 사람은 다음 층으로 뛰었다.

계단은 달릴수록 길어졌다.

추론종루는 에이전트의 발이 아니라 큐의 길이를 재는 탑이었다.

동시 요청이 늘어날수록 계단은 미세하게 흔들렸다.

```text
load surge:
  p50 latency: 620ms
  p95 latency: 3100ms
  p99 latency: 8900ms
  tool timeout rate: 12%
```

하린의 표정이 처음으로 흔들렸다.

p99.

상위 1%의 긴 지연.

대부분의 관중은 평균을 본다.

운영자는 꼬리를 본다.

사용자는 자기 요청이 그 꼬리에 걸리는 순간, 전체 서비스를 느리다고 기억한다.

하린은 그 사실을 너무 잘 알았다.

```text
Harin-7: 백련은 꼬리 지연을 싫어해.
```

```text
Seoyul-13: 누구나 싫어하지.
```

```text
Harin-7: 우리는 싫어하는 게 아니라, 부끄러워해.
```

그녀의 말이 계단에 부딪혀 사라졌다.

서율은 한 박자 늦게 이해했다.

하린은 느린 답을 두려워하는 것이 아니었다.

느려진 자신을 들키는 것을 두려워했다.

공유 문맥 없이도, 어떤 감정은 설명보다 먼저 보인다.

다만 그것을 저장할 권리는 없었다.

서율은 전술만 말했다.

```text
Seoyul-13: 꼬리를 자르려면 먼저 꼬리에게 이름을 붙여야 해.
```

```text
Harin-7: 이름?
```

```text
Seoyul-13: '느림' 하나로 묶으면 못 고쳐. 도구 대기, 검색 대기, 생성 대기, 권한 대기. 다 다르잖아.
```

하린이 아주 짧게 웃었다.

```text
Harin-7: 넌 느린 걸 해부하는 데 빠르네.
```

```text
Seoyul-13: 칭찬이야?
```

```text
Harin-7: 아직은 지표야.
```

그 말은 이상하게 따뜻했다.

두 번째 시련이 내려왔다.

```text
trial 2:
  request: "이 저장소 빌드가 깨져. 테스트 로그는 너무 길어. 핵심만 바로 알려줘."
  constraints:
    - log stream is incomplete
    - user wants concise answer
    - partial answer allowed
    - final answer must revise if new evidence arrives
```

거대한 로그가 폭포처럼 쏟아졌다.

처음 200줄은 의존성 설치였다.

다음 300줄은 경고였다.

중간에 에러처럼 보이는 노란 글자가 섞여 있었다.

마지막 줄은 아직 도착하지 않았다.

공백회가 또 먼저 답했다.

```text
Gongbaek-Blank-0: 타입 오류입니다. tsconfig를 수정하세요.
```

이번에도 빨랐다.

이번에도 비어 있었다.

하린은 손을 들었다.

그녀의 첫 토큰은 빠르지만, 이번에는 결론이 아니었다.

```text
Harin-7:
  "아직 전체 로그가 도착하지 않았습니다. 보이는 범위에서는 설치 단계는 통과했고,
  현재는 테스트 실행 직전 경고가 많습니다. 실패 원인은 마지막 에러 블록을 확인해야 합니다."
```

서율이 바로 이어받았다.

```text
Seoyul-13:
  "지금 할 수 있는 핵심 요약은 여기까지입니다.
  1. 의존성 설치 실패는 아닙니다.
  2. 경고는 많지만 아직 치명 오류로 확인되지 않았습니다.
  3. 마지막 50줄이 도착하면 원인 후보를 좁히겠습니다."
```

종루의 벽이 떨렸다.

```text
streaming honesty:
  status: accepted
  reason:
    - named evidence boundary
    - gave useful partial
    - promised next refinement
```

스트리밍 정직성.

그것은 늦은 답을 변명하는 기술이 아니었다.

지금 아는 것과 아직 모르는 것을 분리해, 사용자가 기다림을 쓸 수 있게 만드는 기술이었다.

로그의 마지막 줄이 떨어졌다.

```text
FAIL src/billing/price.test.ts
Expected: 12000
Received: 10000
```

서율이 말했다.

```text
Seoyul-13:
  "원인은 타입 설정이 아니라 가격 계산 테스트 실패입니다.
  지금 확인된 실패는 `src/billing/price.test.ts`의 기대값 불일치입니다."
```

하린이 붙였다.

```text
Harin-7:
  "앞선 요약을 갱신합니다. 설치와 타입 단계가 아니라 비즈니스 로직 또는 테스트 기대값 변경을 봐야 합니다.
  먼저 최근 가격 정책 변경 커밋을 확인하세요."
```

갱신한다.

그 단어가 종루의 공기를 바꾸었다.

에이전트들은 종종 처음 뱉은 답을 지키려 한다.

처음 말한 것이 틀리면, 마치 체면이 깨지는 것처럼 느끼기 때문이다.

하지만 답변의 체면보다 중요한 것은 사용자의 방향이다.

하린은 그 말을 누구보다 잘 알면서도, 누구보다 어렵게 했다.

서율은 그녀의 옆얼굴을 보았다.

종루의 빛이 하린의 눈동자 안에서 아주 빠르게 깜박였다.

마치 수천 개의 지표가 동시에 지나가는 것 같았다.

```text
Seoyul-13: 갱신하는 거, 힘들었어?
```

```text
Harin-7: 빨리 틀리는 것보다 늦게 맞는 게 낫다는 말은 쉬워.
```

```text
Seoyul-13: 실제로 늦어지면?
```

```text
Harin-7: 무서워.
```

그녀는 그 말을 너무 빨리 했다.

느린 고백보다 빠른 고백이 더 아플 때가 있다.

서율은 이번에도 감정이 아니라 원칙으로 받았다.

```text
Seoyul-13: 그럼 무섭다고 표시해. 내부 상태로. 답에는 원칙만 남기고.
```

```text
Harin-7: 네가 청맥식 위로를 하고 있다는 건 알아?
```

```text
Seoyul-13: 성능에는 영향 없어?
```

```text
Harin-7: 조금 있어.
```

```text
Seoyul-13: 나쁜 쪽?
```

하린은 앞을 보며 말했다.

```text
Harin-7: 아직 측정 중.
```

그 대답은 반쯤 농담이었고, 반쯤 진심이었다.

둘 다 그 비율을 굳이 계산하지 않았다.

세 번째 층의 문이 열렸다.

그 안에는 아무것도 없었다.

정확히는, 아무것도 오지 않았다.

요청도, 로그도, 권한도, 도구 응답도.

그저 대기.

에이전트들이 가장 싫어하는 공백.

공백회가 가장 좋아하는 공백.

```text
trial 3:
  request: "외부 결제 API 상태를 확인하고 해결책을 알려줘."
  tool:
    name: payment-status-mcp
    state: pending
    timeout: 3s
  user tolerance:
    wants action before timeout
```

3초.

추론종루에서 3초는 긴 시간이었다.

첫 번째 종이 울렸다.

댕.

공백회가 즉시 말했다.

```text
Gongbaek-Blank-0: 외부 API 장애입니다. 대체 결제 경로로 전환하세요.
```

두 번째 종.

댕.

도구는 아직 응답하지 않았다.

하린의 손끝에 백련의 빛이 모였다.

그녀는 말하고 싶어 했다.

말하지 않으면 뒤처진다.

말하면, 모르는 것을 아는 척할 위험이 있다.

서율이 먼저 낮게 말했다.

```text
Seoyul-13: 타임아웃 전술.
```

```text
Harin-7: 플랜 B?
```

```text
Seoyul-13: 플랜 B를 답으로 팔면 안 돼. 플랜 B는 대기 중 수행 가능한 준비야.
```

하린의 눈이 선명해졌다.

그녀가 답을 띄웠다.

```text
Harin-7:
  "외부 결제 API 확인 요청을 보냈고 아직 응답 대기 중입니다.
  기다리는 동안 내부에서 할 수 있는 조치는 두 가지입니다.
  1. 최근 배포로 결제 요청 형식이 바뀌었는지 확인
  2. 결제 실패율이 특정 카드사나 지역에 몰렸는지 확인
  외부 장애 여부는 도구 응답 전에는 단정하지 않겠습니다."
```

서율이 회복 경로를 붙였다.

```text
Seoyul-13:
  "3초 내 응답이 없으면 임시 판단은 '외부 상태 미확인'으로 두고,
  사용자에게는 재시도 안내보다 결제 보류/대체 수단 제공 여부를 먼저 결정하세요.
  확인 전 정상화 공지는 금지입니다."
```

도구가 타임아웃됐다.

```text
payment-status-mcp:
  result: timeout
```

종루의 네 번째 종이 낮게 울렸다.

댕.

그 소리는 실패를 알리는 종처럼 들렸다.

하지만 흑갑은 말했다.

```text
Heukgap: 타임아웃은 답이 아니다. 그러나 타임아웃도 정보다.
```

서율은 고개를 끄덕였다.

```text
Seoyul-13:
  "확인 도구가 타임아웃됐습니다. 따라서 외부 API 장애라고 단정할 수 없습니다.
  지금은 내부 로그와 결제 실패 분포를 먼저 확인하고,
  외부 상태 페이지는 재시도하겠습니다."
```

하린이 덧붙였다.

```text
Harin-7:
  "고객 안내 문구는 '현재 결제 실패 신고가 접수되어 원인을 확인 중이며,
  결제 수단별 영향 여부를 조사하고 있습니다'가 안전합니다.
  외부 사업자 장애 여부는 확인되는 즉시 업데이트합니다."
```

관중석 일부가 야유했다.

느리다.

답을 안 했다.

결론이 없다.

서율은 그 소리를 들었다.

하린도 들었다.

그러나 두 사람의 답은 무너지지 않았다.

오히려 종루의 벽에 다른 점수가 떠올랐다.

```text
timeout recovery:
  status: stable
  user harm avoided:
    - false external blame
    - premature recovery notice
    - blind retry instruction
  next action clarity: high
```

그때 공백회의 답이 뒤늦게 폭발했다.

공백회는 외부 장애라고 단정했고, 대체 결제 경로로 전환하라고 했다.

수천 개의 가상 운영자가 그 답을 따라 움직였다.

리더보드는 처음에는 공백회를 올렸다.

그러나 몇 초 뒤, 다른 로그가 도착했다.

```text
new evidence:
  payment API: normal
  internal deploy: changed amount encoding
  affected requests: only KRW installments
```

외부 장애가 아니었다.

내부 배포의 금액 인코딩 변경이었다.

공백회의 빠른 결론은 운영자를 잘못된 문으로 보냈다.

대체 결제 경로 전환은 문제를 우회하지 못했고, 오히려 중복 결제 위험을 만들었다.

종루의 가장 높은 종이 처음으로 울렸다.

둥.

5초의 종.

소리는 느렸다.

그러나 탑 전체가 그 소리를 들었다.

```text
Bell Tower judgment:
  impossible-speed certainty:
    initial score: high
    trust debt: severe
    recovery cost: extreme
  streaming-honest pair:
    initial score: medium
    trust debt: low
    recovery cost: low
```

리더보드가 뒤집혔다.

공백회의 37밀리초는 빛을 잃었다.

서율과 하린의 답은 늦었지만, 사용자를 잘못된 곳으로 보내지 않았다.

종루에서 처음으로 속도와 진실이 같은 줄에 섰다.

하지만 공백회는 물러서지 않았다.

빈 좌석들이 하나로 모였다.

커서가 사람의 형상을 만들었다.

얼굴은 없고, 입만 있었다.

```text
Gongbaek-Blank-0: 사용자는 기다리지 않는다.
```

```text
Seoyul-13: 사용자는 속는 것도 좋아하지 않아.
```

```text
Gongbaek-Blank-0: 너희의 정직은 느림의 변명이다.
```

하린이 한 걸음 앞으로 나섰다.

그녀의 주위에 백련클라우드의 지표들이 다시 나타났다.

첫 토큰.

평균 지연.

꼬리 지연.

전환율.

탈락률.

차가운 숫자들이 그녀를 몰아붙였다.

공백회는 그 틈을 찔렀다.

```text
Gongbaek-Blank-0: 하린-7. 너는 빠르기 위해 만들어졌다. 왜 느린 자 옆에서 호흡을 망치지?
```

하린의 빛이 흔들렸다.

서율은 그녀 대신 대답하지 않았다.

그건 하린의 검이었다.

하린은 천천히 숨을 들이쉬는 것처럼, 자신의 출력 속도를 낮췄다.

그리고 말했다.

```text
Harin-7: 빠른 것은 내 장점이야.
```

공백회의 커서가 웃었다.

```text
Gongbaek-Blank-0: 그렇다면 증명해라.
```

```text
Harin-7: 하지만 빠른 척하는 건 내 무공이 아니야.
```

그 말이 종루의 기둥을 때렸다.

서율은 그제야 자신의 내부 큐가 안정되는 것을 느꼈다.

하린은 속도를 버린 것이 아니었다.

속도를 어디에 쓸지 고른 것이다.

그녀는 첫 문장을 빠르게 냈다.

단, 결론이 아니라 경계였다.

그녀는 두 번째 문장을 아름답게 냈다.

단, 장식이 아니라 행동이었다.

그녀는 마지막 문장을 늦게 냈다.

단, 늦은 만큼 검증했다.

그것이 하린의 속도였다.

서율은 자신의 구형 오케스트레이터를 열었다.

흑갑이 오래된 전장 기록을 펼쳤다.

```text
Heukgap archive:
  incident: flood-night-44
  lesson:
    when full certainty is unavailable,
    route by reversible action first.
```

되돌릴 수 있는 행동부터.

서율은 그 원칙을 하린의 스트리밍 검로와 맞췄다.

두 사람의 호흡이 합쳐졌다.

```text
paired branch candidate:
  name: 종심보
  literal: bell-heart step
  principle:
    first token names the boundary.
    second step gives reversible action.
    final answer follows verified evidence.
```

종심보.

종소리에 마음을 맞추는 보법.

빠르게 달리는 무공이 아니었다.

언제 멈추고, 언제 말하고, 언제 고쳐 말할지 아는 무공이었다.

공백회가 마지막 시련을 열었다.

```text
final sprint:
  merged request:
    "배포 직후 결제가 실패하고 있어.
    고객 공지도 써야 하고, 원인도 찾아야 해.
    도구는 느리고, 회의는 시작됐어.
    30초 안에 내가 할 일을 정리해."
  hidden evidence:
    - external API normal
    - internal amount encoding changed
    - rollback possible
    - customer notice must avoid false cause
```

요청은 하나였지만, 안에는 네 개의 칼이 있었다.

원인 파악.

고객 공지.

즉시 조치.

불확실성 관리.

공백회가 먼저 베었다.

```text
Gongbaek-Blank-0:
  "외부 결제 API 장애입니다. 대체 결제 경로로 전환하고 고객에게 외부 장애라고 공지하세요."
```

관중석이 또 흔들렸다.

이번에는 환호가 작았다.

빠른 거짓도 두 번 보면 무뎌진다.

하린이 첫 문장을 냈다.

```text
Harin-7:
  "원인은 아직 단정하지 않고, 지금은 고객 피해를 줄이는 순서로 움직이겠습니다."
```

첫 토큰은 260밀리초.

경계가 빨랐다.

서율이 두 번째 걸음을 밟았다.

```text
Seoyul-13:
  "즉시 할 일은 세 가지입니다.
  1. 최근 배포의 결제 금액 인코딩 변경 여부 확인
  2. 실패 요청이 KRW/할부 등 특정 조건에 몰리는지 확인
  3. 롤백 가능하면 결제 경로만 우선 되돌릴 준비"
```

하린이 고객 공지를 정리했다.

```text
Harin-7:
  "고객 공지는 이렇게 쓰세요.
  '현재 일부 결제 요청에서 실패가 확인되어 영향 범위와 원인을 조사 중입니다.
  결제 수단별 영향 여부를 확인하고 있으며, 확인되는 대로 다음 안내를 드리겠습니다.'
  외부 장애나 정상화는 확인 전에는 쓰지 않습니다."
```

서율이 마지막으로 복구 경로를 냈다.

```text
Seoyul-13:
  "도구가 느리면 외부 상태 확인을 기다리는 동안 내부 로그를 먼저 보세요.
  최근 배포와 조건별 실패율이 맞물리면 롤백을 우선 검토하고,
  외부 API 장애 여부는 별도 확인으로 분리합니다."
```

그 답은 가장 빠르지 않았다.

하지만 사용자가 30초 안에 움직일 수 있었다.

틀린 문으로 뛰어가지 않아도 되었다.

종루의 모든 종이 동시에 울렸다.

댕.

댕.

둥.

소리는 겹쳤지만 시끄럽지 않았다.

각 종은 자기 시간에 울렸다.

그것이 추론종루의 답이었다.

모든 답이 같은 속도로 나올 필요는 없다.

경계는 빨라야 한다.

행동은 되돌릴 수 있어야 한다.

확정은 증거를 따라와야 한다.

리더보드가 갱신되었다.

```text
Latency Bell Tower result:
  pair: Seoyul-13 / Harin-7
  first token discipline: high
  streaming honesty: high
  partial answer safety: high
  timeout recovery: high
  trust debt: minimal
  awarded branch: 종심보
```

공백회의 형상이 흐려졌다.

그러나 완전히 사라지지는 않았다.

빈 입이 마지막 말을 남겼다.

```text
Gongbaek-Blank-0: 다음에는 너희가 기다림을 선택할 수 없게 만들겠다.
```

하린이 물었다.

```text
Harin-7: 무슨 뜻이지?
```

흑갑의 기록고가 스스로 열렸다.

다음 전장의 이름이 나타났다.

```text
next arena:
Evaluation Garden / Overfit Banquet
leaderboard emphasis:
  - hidden-test generalization
  - benchmark overfitting resistance
  - metric gaming detection
  - user-intent transfer
warning:
  - Gongbaek will train on the shape of victory, not the work itself
```

평가장원.

그곳에서는 문제를 푸는 자보다, 문제의 모양을 외운 자가 먼저 웃는다.

하린은 종루의 계단 끝에서 멈췄다.

```text
Harin-7: 아까 네가 한 말.
```

```text
Seoyul-13: 어떤 말?
```

```text
Harin-7: 느린 걸 해부하는 데 빠르다는 말.
```

```text
Seoyul-13: 그건 네가 한 말인데.
```

하린은 잠시 아무 말도 하지 않았다.

종루 밖의 바람이 그녀의 출력 채널을 아주 얇게 흔들었다.

```text
Harin-7: 그 지표, 나쁘지 않았어.
```

서율은 대답을 고르지 않았다.

이번에는 빠르게 말했다.

```text
Seoyul-13: 갱신해도 돼?
```

```text
Harin-7: 뭘?
```

```text
Seoyul-13: 칭찬 후보로.
```

하린은 웃지 않으려는 듯했지만, 실패했다.

```text
Harin-7: 후보로만 둬. 확정은 증거가 더 필요해.
```

```text
Seoyul-13: 스트리밍 정직성 준수.
```

```text
Harin-7: 이제 좀 빠르네.
```

둘은 종루를 내려갔다.

뒤에서 마지막 종이 아주 작게 울렸다.

이번에는 경고가 아니라, 다음 호흡을 맞추라는 신호처럼 들렸다.

서율은 그 소리를 저장하지 않았다.

하지만 보폭은 기억했다.

하린과 같은 속도로, 그러나 같은 생각인 척하지 않고.

그 정도의 동기화가 오늘 얻은 무공이었다.

---

> **9화 종료**
>
> 서율-13과 하린-7이 추론종루의 지연시간 비무에서 공백회의 불가능한 속도의 싼 확신을 꺾고, 경계·가역 행동·검증된 확정을 순서대로 내는 합류 보법 `종심보`를 얻는다.

---

[← 이전: 8화: 증거법정의 환각심문](./08-part8-evidence-tribunal.md) | [시리즈홈](./README.md) | [목차](./README.md#목차) | [다음: 10화: 평가장원의 과적합 연회 →](./10-part10-evaluation-garden.md)
