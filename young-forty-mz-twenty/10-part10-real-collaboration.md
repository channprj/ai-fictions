[← 이전: 첫 걸음](./09-part9-awkward-harmony.md) | [목차](./README.md) | [다음: 루프 →](./11-epilogue.md)

---

# PART 10

## 머지: 하나가 되다

> _"merge는 두 개의 branch를 합치는 것이 아니다. 서로 다른 생각을 하나의 코드로 만드는 것이다."_

---

### 10-1. git merge legacy modern

프로젝트 '피닉스' 2.0, 런칭 날.

드디어 첫 번째 메이저 기능 배포 날이 왔다.

회의실에 팀 전체가 모였다. 분위기는 긴장과 기대가 반반이었다.

"자, 오늘 머지합니다."

김철수 실장이 말했다.

"드디어요!"

박지은이 신나서 대답했다.

"이준호 씨 브랜치랑 지은 씨 브랜치 합치는 거예요."

이준호 선임이 노트북을 열었다.

"저는 레거시 최적화 브랜치 작업했고요."

박지은이 끼어들었다.

"저는 모던 피처 브랜치요."

김철수 실장이 화면을 프로젝터에 띄웠다.

```bash
$ git merge legacy-optimization modern-features

Auto-merging src/payment/processor.ts
CONFLICT (content): Merge conflict in src/payment/processor.ts
Automatic merge failed; fix conflicts and then commit the result.
```

"어, 컨플릭트다."

예전 같았으면 여기서 싸움이 시작됐을 것이다. "내 코드가 더 좋은데" vs "원래 이렇게 해야 하는 거야"의 불꽃 튀는 논쟁.

하지만 지금은 달랐다.

"같이 볼까요?"

"네."

---

### 10-2. 컨플릭트 해결

두 사람이 나란히 화면을 봤다.

```typescript
<<<<<<< legacy-optimization
// 이준호 선임의 코드
function processPayment(amount: number) {
  // 캐싱으로 성능 최적화
  const cachedResult = cache.get(amount);
  if (cachedResult) return cachedResult;
  return executePayment(amount);
}
=======
// 박지은의 코드
async function processPayment(amount: number): Promise<PaymentResult> {
  // 타입 안전성 강화
  const validatedAmount = validateAndParse(amount);
  const result = await newPaymentProcessor.execute(validatedAmount);
  return result;
}
>>>>>>> modern-features
```

"둘 다 좋은데."

김철수 실장이 말했다.

"합칠 수 있지 않을까요?"

박지은이 제안했다.

"어떻게?"

"선임 코드의 캐싱이랑 제 코드의 타입 안전성을 합치면요."

이준호 선임이 생각했다.

"캐싱은 성능에 필수고..."

"타입 안전성은 유지보수에 필수예요."

"그럼 둘 다 살리자."

---

**30분 후**

```typescript
// 합쳐진 코드 - 최종
async function processPayment(amount: number): Promise<PaymentResult> {
  // [이준호] 캐싱 시도 (실패해도 진행)
  try {
    const cachedResult = await cache.get<PaymentResult>(amount);
    if (cachedResult) {
      logger.debug("Cache hit for payment", { amount });
      return cachedResult;
    }
  } catch (cacheError) {
    logger.warn("Cache read failed, proceeding without cache", { cacheError });
  }

  // [박지은] 타입 안전성 강화
  const validatedAmount = validateAndParse(amount);

  // [이준호 경험 + 박지은 기술]
  const result = await newPaymentProcessor.execute(validatedAmount);

  // [이준호] 결과 캐싱 시도
  try {
    await cache.set(amount, result, { ttl: 3600 });
  } catch (cacheError) {
    logger.warn("Cache write failed", { cacheError });
  }

  return result;
}
```

"완벽해요."

박지은이 웃었다.

"선임 경험이랑 제 아이디어가 합쳐진 거예요."

"git merge legacy modern이 진짜 됐네."

김철수 실장이 박수를 쳤다.

"이게 진짜 협업이야. 서로의 코드를 무시하는 게 아니라, 서로의 강점을 합치는 거."

---

### 10-3. 런칭

드디어 2.0 런칭.

박지은이 버튼을 눌렀다.

```bash
$ npm run deploy

Building application...
Running tests...
  ✓ Unit tests passed (423/423)
  ✓ Integration tests passed (87/87)
  ✓ E2E tests passed (34/34)
All tests passed (coverage: 82%)

Deploying to production...
  → Building Docker image...
  → Pushing to registry...
  → Running health checks...

✅ Deployment successful!
🚀 피닉스 2.0 is now live!
```

"됐다!"

환호가 터졌다.

"테스트도 통과하고!"

"에러 없이!"

"드디어!"

박지은이 눈물을 글썽였다.

"우리... 해냈어요."

---

**런칭 후 1주일**

```
📊 피닉스 2.0 런칭 리포트

장애 건수: 0건 (1.0: 12건)
버그 리포트: 3건 (1.0: 47건)
사용자 만족도: 4.2/5.0 (1.0: 2.8/5.0)

기술적 성과:
- 응답 속도 40% 개선
- 테스트 커버리지 82%
- 코드 리뷰 완료율 100%

비기술적 성과:
- 팀 소통 점수 89점 (이전: 42점)
- 자발적 야근: 0회
- 이직 의향: 0명
```

"우리... 해냈어요."

박지은이 말했다.

"해냈네."

김철수 실장이 대답했다.

---

### 10-4. 다음 스테이지

런칭 2주 후.

"다음 뭐 해요?"

박지은이 물었다.

"음... 뭘 하고 싶어요?"

"저요?"

"응. 이제 니 의견이 제일 중요해."

"ML 기반 추천 시스템 고도화 하고 싶어요."

"좋아. 그거 하자."

"진짜요?"

"응. 근데 조건 있어."

"뭐요?"

"니가 리드해."

"제가요?"

"응. 이번 프로젝트는 니가 PM 해봐."

박지은은 놀랐다.

"저 아직 3년 차인데요."

"경력이 중요한 게 아니야. 역량이 중요하지."

"그럼... 해볼게요."

"좋아. 기대할게."

---

### 10-5. 회식

팀 회식 자리.

"건배합시다."

김철수 실장이 맥주잔을 들었다.

"뭐에 건배해요?"

"음... 실패에?"

"실패요? ㅋㅋ"

"응. 실패가 없었으면 우리 여기까지 못 왔어."

박지은이 웃었다.

"그럼 실패에 건배요."

"건배!"

잔이 부딪쳤다.

---

"실장님."

"응?"

"감사해요."

"뭐가?"

"바뀌려고 노력해주셔서요."

김철수 실장이 피식 웃었다.

"나도 감사해."

"뭐가요?"

"솔직하게 말해줘서. 그리고 포기 안 해줘서."

"포기요?"

"응. 1.0 때 퇴사할 수 있었잖아."

"... 생각은 했었어요."

"알아. 근데 안 했잖아."

"왜 안 했는지 아세요?"

"왜?"

"뭔가 바뀔 것 같았어요. 아주 조금."

"그 '조금'이 여기까지 온 거네."

"그러게요."

이준호 선임이 끼어들었다.

"저도 그래요. 중간에서 힘들었는데, 포기 안 하길 잘했어요."

"준호야, 너도 고마워."

"뭐가요?"

"가장 힘들었을 텐데, 둘 사이에서 버텨줘서."

"ㅋㅋ 그게 제 역할인걸요."

---

### 10-6. 팀의 완성

박지은의 트위터.

**@dev_jieun**: 6개월 전에는 퇴사 생각만 했는데, 지금은 이 팀이 좋다. 사람은 변한다. 팀도 변한다. 포기하지 않으면. #개발자일상 #팀워크 #성장

좋아요 8,721개.

댓글:

- "실화냐"
- "저도 우리 팀 바꾸고 싶은데 방법이 있을까요?"
- "포기하지 않으면... 좋은 말이다"

"또 실화임."

박지은이 대답했다.

"그리고 다음 달에 PM 됨. 기대해주세요. 😎"

---

**슬랙 #dev-team**

**@김철수**

> 공지: 다음 프로젝트 PM은 박지은 씨입니다.
> ML 추천 시스템 고도화 프로젝트.
> 모두 협조 부탁드립니다.

**@이준호**

> 오 지은이 PM? 축하해!

**@최민수**

> 와 대박. 응원합니다!

**@박지은**

> 감사합니다... 열심히 하겠습니다 😊

**@김철수**

> 니가 잘 할 거야. 믿어.

---

프로젝트 피닉스 2.0은 성공했다.

하지만 더 중요한 건, 팀이 성공했다는 것이다.

서로 다른 세대, 서로 다른 생각, 서로 다른 방식.

그것들이 충돌할 때 문제가 됐지만, 합쳐질 때 시너지가 됐다.

git merge legacy modern.

두 개의 브랜치가 하나가 됐다.

두 세대가 하나가 됐다.

그것이 진짜 협업이었다.

---

_에필로그에서 계속..._

---

## [← 이전: 첫 걸음](./09-part9-awkward-harmony.md) | [목차](./README.md) | [다음: 루프 →](./11-epilogue.md)
