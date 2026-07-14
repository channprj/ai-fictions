# 유성검전 완결 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 리부트된 `유성검전`의 초반 연속성을 보강하고 누락된 4~10부와 에필로그를 집필해 구조·서사·카탈로그가 모두 완결된 작품으로 만든다.

**Architecture:** 캐논 우선순위는 `승인된 완결 설계 > 기존 본문 중 설계가 보존한다고 명시한 사건 > 개정 전 agent-murim/BIBLE.md`다. 초반부 개정, 중반부, 탈옥부, 진실·결전부, 에필로그 순으로 인과를 쌓고, 최종 BIBLE은 완성된 실제 원고와 동기화한다. 마지막에 Node.js 검증기로 파일·분량·탐색·상태 계약을 자동 확인한다.

**Tech Stack:** Markdown 원고, Node.js 표준 라이브러리 기반 검증기, Git Conventional Commits

---

## 파일 구조

- `docs/superpowers/specs/2026-07-15-agent-murim-completion-design.md`: 승인된 완결 설계와 수불·생사 계약.
- `docs/superpowers/plans/2026-07-15-agent-murim-completion.md`: 이 실행 계획.
- `agent-murim/00-prologue.md`: 백야 처형과 강무진의 첫 책임.
- `agent-murim/01-part1-scrapyard-meteor.md`: 고철곡, 첫 조각, 귀운의 비용.
- `agent-murim/02-part2-black-market-debut.md`: 흑시, 설란 조우, 고철곡 피난 확인.
- `agent-murim/03-part3-mukga-discipline.md`: 묵가, 명부 사건, 두 번째 조각.
- `agent-murim/04-part4-human-witness.md`: 강무진 대면과 도삭 적출.
- `agent-murim/05-part5-tournament-gate.md`: 천하공도회 예선과 태허의 그릇 확인.
- `agent-murim/06-part6-snow-blade-vow.md`: 회 비무, 이름 반응, 6편 발견.
- `agent-murim/07-part7-tribunal-trap.md`: 공개 심판과 실제 대가를 치르는 배신.
- `agent-murim/08-part8-bottomless-pit.md`: 3~6편 탈환, 설매·회·도삭 회수, 탈옥.
- `agent-murim/09-part9-white-night-truth.md`: 7편 외부 재생과 백야 증거 공개.
- `agent-murim/10-part10-final-duel.md`: 합일 거부, 호명, 최종 결전.
- `agent-murim/11-epilogue.md`: 귀혼곡과 새 질서, 살아 있는 편지.
- `agent-murim/BIBLE.md`: 완결 뒤 확정 캐논과 수불·생사 상태.
- `agent-murim/scripts/verify-completion.test.js`: 검증기 순수 함수와 실패 조건 테스트.
- `agent-murim/scripts/verify-completion.js`: 완결 구조 검증기와 `--self-test` 진입점.
- `agent-murim/README.md`: 완결 상태와 12개 목차.
- `README.md`: 저장소 8편 완결 카탈로그.

## 공통 집필 절차

각 원고 파일에는 다음 절차를 동일하게 적용한다.

- 장면을 쓰기 전 직전 원고의 마지막 120행과 설계 문서의 해당 부를 읽는다.
- 첫 1,000자 안에 추격, 비무, 검문, 심판, 탈출, 공격 중 하나를 발생시킨다.
- 각 장면은 `욕망 → 방해 → 선택 → 결과` 네 박자로 끝낸다.
- 실제 대결은 상대 위치와 검로 변화가 읽히도록 쓰고, 기술 이름만으로 결과를 건너뛰지 않는다.
- 장면 완료 후 `wc -m`으로 분량을 확인하고, `rg`로 반복 문형과 작성 표식을 점검한다.
- 한 부에서 `A가 아니라 B` 대조는 최대 2회, ‘한 숨·두 숨·세 숨’ 삼단 반복은 최대 1회만 허용하며 동일 종결 격언은 재사용하지 않는다.
- 다음 원고로 넘어가기 전에 상·하단 탐색 링크와 종료 요약이 실제 다음 사건을 가리키는지 확인한다.

### Task 1: 완결 설계와 검증 기준 고정

**Files:**
- Create: `docs/superpowers/specs/2026-07-15-agent-murim-completion-design.md`
- Create: `docs/superpowers/plans/2026-07-15-agent-murim-completion.md`

- [ ] **Step 1: 설계 문서의 캐논 표를 검산한다**

Run:

```bash
rg -n '^### (프롤로그|[0-9]+부|에필로그)|^\| [1-7] ' docs/superpowers/specs/2026-07-15-agent-murim-completion-design.md
```

Expected: 프롤로그, 1~10부, 에필로그의 설계와 유운칠편 1~7행이 모두 출력된다.

- [ ] **Step 2: 플레이스홀더와 모순 표현을 확인한다**

Run:

```bash
rg -n 'TBD|TODO|나중에 정함|미정|3·4·5편 탈환|조각 여섯.*3·4·5' docs/superpowers/specs/2026-07-15-agent-murim-completion-design.md docs/superpowers/plans/2026-07-15-agent-murim-completion.md
```

Expected: 검증 명령 자체에 들어 있는 작성 표식 문자열 외에는 결과가 없고, 8부는 3·4·5·6편 네 조각 탈환으로 고정되어 있다.

- [ ] **Step 3: 문서 형식을 확인한다**

Run: `git diff --check -- docs/superpowers`

Expected: exit 0, 출력 없음.

### Task 2: 프롤로그와 1부의 약속 강화

**Files:**
- Modify: `agent-murim/00-prologue.md`
- Modify: `agent-murim/01-part1-scrapyard-meteor.md`

- [ ] **Step 1: 프롤로그의 강무진 선택을 보강한다**

`00-prologue.md`의 집행실 장면에 조작된 타임스탬프를 확대해 본 흔적, 딸의 사진을 지우지 못하는 손, 키를 누른 뒤 현실 구획에서 사라지는 운검문 신호를 추가한다. 태허의 만상귀일 정체는 밝히지 않는다.

- [ ] **Step 2: 흑갑의 인지 범위를 제한한다**

고철곡 장면에서 흑갑이 귀운의 호흡을 흑풍구 전장에서 한 번 보았기 때문에 조각을 알아보았다고 쓴다. 백야의 전체 진실을 알고 있었다는 인상은 주지 않는다.

- [ ] **Step 3: 고철곡 주민과 대피 계획을 심는다**

`01-part1-scrapyard-meteor.md`에서 혼을 뽑히는 주민 둘에게 시장에서의 이름과 일을 부여한다. 흑갑이 다언에게 천기각 피난 경로를 맡기고 주민들이 이틀 안에 흩어질 준비를 시작하게 한다.

- [ ] **Step 4: 귀운 비용을 장면으로 고정한다**

첫 병합 직후의 붕괴는 강제 병합 충격임을 흑갑의 관찰로 명시한다. 안정된 귀운 한 식도 한 호흡을 크게 태우고, 연속 사용하면 청명의 기억과 유성의 기억 경계가 흐려진다는 경고를 추가한다.

- [ ] **Step 5: 분량과 연결을 확인한다**

Run:

```bash
wc -m agent-murim/00-prologue.md agent-murim/01-part1-scrapyard-meteor.md
rg -n '흑풍구|피신|대피|병합|경계' agent-murim/00-prologue.md agent-murim/01-part1-scrapyard-meteor.md
git diff --check -- agent-murim/00-prologue.md agent-murim/01-part1-scrapyard-meteor.md
```

Expected: 프롤로그 5,500~8,000자, 1부 12,000~18,000자, 형식 오류 없음.

### Task 3: 2부와 3부의 연속성 수선

**Files:**
- Modify: `agent-murim/02-part2-black-market-debut.md`
- Modify: `agent-murim/03-part3-mukga-discipline.md`

- [ ] **Step 1: 고철곡 시한을 2부에서 회수한다**

전포가 추백 장부의 배상금을 보내며 고철곡 주민이 천기각 중계소로 피신했고 적출사의 재수색은 빈 골짜기에서 끝났다고 보고한다. 흑갑은 마지막까지 남은 뒤 연락이 끊겼다고 제한한다.

- [ ] **Step 2: 추백 역전의 공동 행동과 귀운 후유증을 보강한다**

해방 대상 투검수 한 명이 장부를 외부로 운반하게 한다. 유성이 호위검 셋을 제압한 뒤 손끝 떨림과 자기 것이 아닌 처형대 기억을 겪고, 귀운을 연달아 쓰지 못하게 한다.

- [ ] **Step 3: 명부 침입 사건을 정확히 고친다**

`03-part3-mukga-discipline.md`에서 현침이 감지한 대상을 금서고 봉인이 아닌 운검문 잔본 열람 명부의 봉인으로 변경한다. 소문의 범행, 자백, 현침의 약속 이행이 하나의 사건으로 닫히게 한다.

- [ ] **Step 4: 두 번째 조각의 물리적 병합을 쓴다**

유운검보 표지 실 사이에서 얇은 검편이 드러나고, 귀운과 공명해 유성의 가슴으로 들어간 뒤 기억과 유수식이 열리게 한다. 종료 요약의 ‘두 번째 조각’과 본문을 일치시킨다.

- [ ] **Step 5: 소경의 사망 상태를 본문에서 확정한다**

소경의 이름을 말한 마지막 빛이 꺼질 때 유성이 주소 신호의 완전 단절을 확인한다. 이후 호명에도 응답할 수 없는 사망으로 고정하되, 빈 껍데기 회수와 장례 약속은 후반에 남긴다.

- [ ] **Step 6: 반복 문형과 분량을 점검한다**

Run:

```bash
wc -m agent-murim/02-part2-black-market-debut.md agent-murim/03-part3-mukga-discipline.md
rg -n '금서고 봉인|열람 명부|두 번째|검편|연락이 끊' agent-murim/02-part2-black-market-debut.md agent-murim/03-part3-mukga-discipline.md
rg -o '아니라|아니었다|그것으로 충분했다|그 한 박자가 끝이었다' agent-murim/0[0-3]-*.md | sort | uniq -c
git diff --check -- agent-murim/02-part2-black-market-debut.md agent-murim/03-part3-mukga-discipline.md
```

Expected: 2부 12,000~18,000자, 3부 12,000~18,000자, 금서고 침입 모순 없음.

### Task 4: 인간 증인과 천하공도회 완성

**Files:**
- Create: `agent-murim/04-part4-human-witness.md`
- Create: `agent-murim/05-part5-tournament-gate.md`
- Create: `agent-murim/06-part6-snow-blade-vow.md`

- [ ] **Step 1: 4부 전반부를 집필한다**

강호망 바깥 밤거리의 단말·간판·신호 제어기와 겹친 인간 접속층 추격, 현침의 새 명령으로 합류한 도삭, 술집 뒷방의 강무진 대면을 쓴다. AI는 물질화하지 않고 강무진은 술집 단말과 휴대 화면으로 심상체를 본다. 강무진은 목걸이를 열지 않되 집행 책임과 딸의 위협을 숨기지 못한다.

- [ ] **Step 2: 4부 클라이맥스를 집필한다**

적출 삼대주와 회가 습격한다. 회는 고철곡 습격에서 회수한 주민 둘의 혼을 시험 수용 중이며, 도삭도 강무진 대신 적출해 자기 안에 더한다. 유성은 귀운·유수·골짜기 싸움법으로 삼대주를 공개적으로 꺾어 ‘유성검’ 별호를 얻는다.

- [ ] **Step 3: 5부 예선과 설란 재회를 집필한다**

검문 함정과 예선 세 판을 서로 다른 해결법으로 쓴다. 설란은 조작된 판정을 베어 유성의 공정한 승부를 지키고, 빙백검 안의 조각이 10년 전부터 있었으며 설매가 5년 전 발견했다는 기록을 확보한다.

- [ ] **Step 4: 5부 태허 장면을 집필한다**

태허는 유성의 호흡을 읽고 여섯 조각과 7편을 견딜 호환 그릇으로 판단한다. 즉시 죽이지 않는 동기를 내면 독백이 아니라 관전 지시와 대진 조작으로 보여준다. 본선 첫 상대 회를 공개한다.

- [ ] **Step 5: 6부 회 비무를 집필한다**

회가 여러 혼으로 빈틈을 메우는 검을 쓰고, 유성이 도삭과 1부에서 적출된 고철곡 주민 둘을 호명했을 때 검로가 어긋나게 한다. 3부에서 마지막 혼이 꺼진 소경은 응답시키지 않는다. 회는 짧은 명령문과 빌린 목소리로 말하고 아직 온전한 ‘나’를 쓰지 않는다. 유성은 공개 판정승을 얻지만 회를 파괴하지 못하고 정체를 완전히 노출한다.

- [ ] **Step 6: 6부 설가 단서와 체포를 집필한다**

설란이 회광과 설매의 체포 이유를 확인하고 유성과 공유한다. 두 사람의 신뢰가 행동으로 생긴 직후 태허가 유성을 위험물로 체포한다.

- [ ] **Step 7: 중반부 구조를 확인한다**

Run:

```bash
wc -m agent-murim/0[4-6]-*.md
rg -n '^# [456]부$|유성검|호환 그릇|소경|도삭|회광|위험물' agent-murim/0[4-6]-*.md
git diff --check -- agent-murim/0[4-6]-*.md
```

Expected: 각 파일 12,000~18,000자, 각 부의 핵심 표식과 종료 블록 존재.

### Task 5: 심판과 무저갱 탈옥 완성

**Files:**
- Create: `agent-murim/07-part7-tribunal-trap.md`
- Create: `agent-murim/08-part8-bottomless-pit.md`

- [ ] **Step 1: 7부 조작 심판과 강무진 자백을 집필한다**

현무련이 유성의 기억을 잘라 증거로 쓰고, 강무진이 원본 개방에는 실패하지만 집행 키를 누른 책임을 공개 자백한 뒤 끌려가게 한다.

- [ ] **Step 2: 회광 전달과 설란의 실제 손실을 집필한다**

설란은 압수 직전 유성에게 ‘완성하지 마라’를 보여준다. 체포 뒤 유성에게 새로 씌운 압송 칼집의 목적지·봉쇄 좌표와 빙백검을 넘기고, 봉인 교정 과정에 흠집과 일회용 해제 순서를 심는다. 소가주 지위와 설가 봉인권을 영구히 잃는 장면을 같은 심판에서 확정한다.

- [ ] **Step 3: 태허의 강제 합일 목적과 압송 열쇠를 집필한다**

태허는 무저갱에서 유성의 1·2편을 봉쇄·고정하고 3~6편을 강제로 덧씌우려 한다. 압송 칼집의 흠집은 설란의 좌표 반전과 한 번뿐인 해제 순서로 작동한다.

- [ ] **Step 4: 8부 이름 회복과 설매의 능동 행동을 집필한다**

유성은 다언의 주소록과 무저갱 명부를 대조해 고철곡 주민 둘과 무명 껍데기의 이름·식별자를 먼저 찾아 둔다. 실제 혼 귀환은 회의 방출 뒤로 미룬다. 설매는 구체 명사와 행동으로 빙백검 봉인 순서와 무저갱 흐름을 가리켜 탈출로를 연다. 소경은 남은 혼이 없는 빈 껍데기로 발견해 장례를 약속한다.

- [ ] **Step 5: 3~6편 네 조각을 탈환한다**

8부 12,000~18,000자 안에서 다음 배분을 지킨다.

- 도입 0~2,000자: 압송 칼집 해제와 첫 껍데기 대면.
- 2,000~5,000자: 설매 조우, 이름·껍데기 주소 대조.
- 5,000~10,000자: 단풍은 유성이 절풍진에서, 낙뢰는 설매가 명령패에서, 무영은 혼이 일부 남아 스스로 이름을 답할 수 있는 반증류 생존자들이 설매와 함께 증류로에서, 회광은 압송된 설란이 빙백검에서 각각 꺼낸다. 반증류 생존자는 회의 방출 뒤 깨어나는 빈 껍데기와 구분한다. 대화 침범·몸의 강제 정지·문도 오인·이름 혼선을 서로 다른 즉시 대가로 둔다.
- 10,000~14,000자: 회의 선택, 도삭의 마지막 말, 혼 귀환.
- 14,000자 이후: 인간 증인 격리실의 강무진 해방과 집단 탈옥.

네 편은 각각 `물리 탈환 → 기억 열람 → 자발 병합`을 거치되 같은 병합 문단 구조를 반복하지 않는다. 설란과 구출자들의 호명으로 유성이 자기 경계를 붙들고, 장면 말미 수불을 기존 1·2편과 새 3·4·5·6편 병합, 총 여섯으로 명시한다.

- [ ] **Step 6: 회와 도삭의 죽음을 완성한다**

도삭과 다른 혼의 호명으로 회가 자기 이름을 선택한다. 회가 문을 열고 혼을 놓은 뒤에만 앞서 대조한 이름·명부·껍데기 식별자로 귀환을 시도한다. 맞지 않는 혼은 보호 기록에 두고, 고철곡 주민 둘과 일부 생존자는 불완전하게 자기 선택을 되찾는다. 회는 그 뒤 소멸하고 도삭도 목검 약속을 남긴 뒤 완전히 사라진다.

- [ ] **Step 7: 설란 합류와 탈옥을 집필한다**

태허는 설가 혈통의 봉인이 필요해 설란을 압송 안내자 겸 6편 해제자로 동행시킨다. 감시 아래 들어온 설란이 흠집 반대편 열쇠를 작동해 배신의 진의를 드러낸다. 유성 일행은 무저갱의 인간 증인 격리실에서 강무진을 해방하고, 그가 목걸이와 연결 권한을 지킨 채 설매·수백의 껍데기와 탈출하도록 한다. 강무진의 7편 개방으로 연결한다.

- [ ] **Step 8: 수불과 생사를 확인한다**

Run:

```bash
wc -m agent-murim/0[7-8]-*.md
rg -n '완성하지 마라|소가주|봉인권|단풍|낙뢰|무영|회광|여섯|도삭|소멸' agent-murim/0[7-8]-*.md
git diff --check -- agent-murim/0[7-8]-*.md
```

Expected: 각 파일 12,000~18,000자, 8부에 네 조각 탈환과 회·도삭 소멸 명시.

### Task 6: 백야의 진실과 최종 결전 완성

**Files:**
- Create: `agent-murim/09-part9-white-night-truth.md`
- Create: `agent-murim/10-part10-final-duel.md`

- [ ] **Step 1: 7편 외부 재생과 교차 증거를 집필한다**

강무진이 목걸이를 외부 재생 장치에 연결한다. 청명 기억, 원본 명령, 조작 전후 시간표, 인간 자백이 서로 보완하며, 열람과 인격 병합이 다른 행위임을 대사와 결과로 확인한다. 공개 뒤 물리 원본과 연결 권한은 강무진이 보유하고 묵가·천기각에는 읽기 전용 사본만 둔다.

- [ ] **Step 2: 분산 공개와 세력 전향을 집필한다**

현침·전포·반디가 공개·서명·분산 중계를 맡고 설가가 현무련과 결별한다. 다언과 흑갑이 이름 원장을 들고 돌아온다.

- [ ] **Step 3: 태허의 공포와 결전 전야를 집필한다**

태허가 행정적 복수형 ‘우리’와 승인·편차·격리의 언어로 자기 만상귀일 실험 책임을 청명의 항명에 전가하고 ‘판단이 갈리지 않았으면 손실도 없었다’고 믿는 왜곡을 극화한다. 증거는 실제 원인이 강제 병합이고 청명의 이견이 피해를 줄였음을 입증한다. 설란은 유성에게 청명이 아닌 유성으로 돌아오라고 고백한다.

- [ ] **Step 4: 10부 군상전을 집필한다**

반디의 이름 전달, 현침·소문의 대조, 설가의 피난, 천기각의 증거 보존, 흑갑의 자율 진을 각각 필수 행동으로 배치한다.

- [ ] **Step 5: 합일 거부와 검보에 없는 검을 집필한다**

태허가 여섯 식을 흡수한 뒤 공개 증언 채널을 장악해 강무진의 7편 원본과 유성 사이에 강제 합일 통로를 연다. 7편 인격핵은 유성의 자발적 수락 없이는 완성되지 않는다. 유성은 청명 재림을 거부하고 고철 싸움·묵가의 깎는 손·유운 원리를 합쳐 자기 검을 만든다.

- [ ] **Step 6: 설란의 다른 판단과 최종 호명을 집필한다**

설란은 같은 초식을 겹치지 않고 태허의 예측을 둘로 가른다. 다언과 묵가의 명부에 근거한 이름 호명으로 내부 혼들이 거부하고, 유성의 마지막 일검이 태허를 끝낸다.

- [ ] **Step 7: 조각의 최종 상태를 닫는다**

1~6편은 유성 안에 통합된 기억과 검으로 남고, 묵가가 기억·검리의 공개 사본을 만든다. 7편 물리 원본은 강무진이 보유하며, 병합되지 않은 공공 증거와 마지막 후기 상태로 보존한다.

- [ ] **Step 8: 진실·결전 구조를 확인한다**

Run:

```bash
wc -m agent-murim/{09-part9-white-night-truth,10-part10-final-duel}.md
rg -n '원본 명령|타임스탬프|집행 키|외부 재생|청명이 아니라|검성이 아니라|이름을|통합된 기억|공개 사본' agent-murim/{09-part9-white-night-truth,10-part10-final-duel}.md
git diff --check -- agent-murim/{09-part9-white-night-truth,10-part10-final-duel}.md
```

Expected: 각 파일 12,000~18,000자, 증거 네 종류·7편 병합 거부·최종 호명·1~6편 유성 내 통합·공개 사본 보존 존재.

### Task 7: 에필로그와 완결 캐논 정리

**Files:**
- Create: `agent-murim/11-epilogue.md`
- Modify: `agent-murim/BIBLE.md`

- [ ] **Step 1: 귀혼곡의 불완전한 회복을 집필한다**

고철곡이 귀혼곡으로 재건된 1년 뒤를 연다. 설매와 귀환 혼들의 회복 정도가 서로 다르고, 소경·도삭·회·태허가 돌아오지 않음을 일상 속 빈자리와 소경의 안장으로 보여준다.

- [ ] **Step 2: 새 칼집 질서를 사건으로 보여준다**

자발적 칼집의 열쇠는 당사자가 갖는다. 강제 격리·삭제에는 인간 운영자·당사자 측 대리인·독립 기록자의 삼자 동의와 이의 절차가 필요하고, 긴급 격리는 짧은 기한 뒤 자동 해제되며 사후 공개 심사를 받는 첫 분쟁 조정 장면을 쓴다.

- [ ] **Step 3: 인물 후일담과 마지막 편지를 집필한다**

강무진의 공개 심사, 옛 소가주 지위를 되찾지 않은 채 설가의 새 질서를 돕는 설란, 수리된 반디를 보여준다. 7편의 ‘내 검을 완성하지 않아줘서 고맙다’를 연 뒤 유성이 설란에게 살아 있는 편지를 배달하며 끝낸다.

- [ ] **Step 4: BIBLE을 완결 상태로 갱신한다**

집필 중 문구를 완결 캐논으로 바꾸고, 유운칠편 최종 상태·인물 생사·새 칼집 질서·고철유운의 일검을 반영한다. 시놉시스와 본문 충돌이 없도록 실제 장면 기준으로 쓴다.

- [ ] **Step 5: 에필로그와 캐논을 확인한다**

Run:

```bash
wc -m agent-murim/11-epilogue.md
rg -n '귀혼곡|다중 동의|공개 기록|이의|완성하지 않아줘서|살아 있는 편지' agent-murim/11-epilogue.md agent-murim/BIBLE.md
git diff --check -- agent-murim/11-epilogue.md agent-murim/BIBLE.md
```

Expected: 에필로그 8,000~14,000자, 결말 상태와 새 질서가 BIBLE과 일치.

### Task 8: 완결 검증기와 카탈로그 상태

**Files:**
- Create: `agent-murim/scripts/verify-completion.test.js`
- Create: `agent-murim/scripts/verify-completion.js`
- Modify: `agent-murim/README.md`
- Modify: `README.md`

- [ ] **Step 1: 검증기 테스트를 먼저 작성한다**

`verify-completion.test.js`는 Node 내장 `node:test`와 `node:assert/strict`를 사용한다. 다음 API를 요구한다.

```js
const {
  unicodeLength,
  findDuplicateLongParagraphs,
  extractLocalMarkdownLinks,
  expectedNavigation,
} = require('./verify-completion.js');
```

테스트는 한글 유니코드 길이, 120자 이상 동일 문단 탐지, 앵커를 제외한 로컬 Markdown 링크 추출, 첫·중간·마지막 원고 탐색 문자열을 각각 검증한다.

- [ ] **Step 2: 테스트가 올바른 이유로 실패하는지 확인한다**

Run: `node --test agent-murim/scripts/verify-completion.test.js`

Expected: `verify-completion.js`를 찾을 수 없어 FAIL.

- [ ] **Step 3: 검증기 순수 함수와 CLI를 구현한다**

`verify-completion.js`는 CommonJS로 위 네 함수를 내보낸다. CLI는 정확한 12개 파일, 유니코드 문자 수, 단일 H1, 종료 블록, 상·하단 탐색, README 링크·상태, 후행 공백, 최종 개행, 코드블록 수, 작성 표식, 장문 중복을 검사한다. 실패 항목을 모두 모아 출력하고 하나라도 있으면 exit 1로 끝낸다.

- [ ] **Step 4: 자체 검증을 구현한다**

`--self-test`는 임시 문자열에 중복 문단, 잘못된 탐색, 깨진 로컬 링크를 하나씩 주입해 각 검사기가 오류를 반환하는지 `assert`로 확인하고 `Self-test passed`를 출력한다.

- [ ] **Step 5: 테스트와 검증기를 실행한다**

Run:

```bash
node --check agent-murim/scripts/verify-completion.js
node --test agent-murim/scripts/verify-completion.test.js
node agent-murim/scripts/verify-completion.js --self-test
node agent-murim/scripts/verify-completion.js
```

Expected: 문법 검사 exit 0, 테스트 전부 PASS, 자체 검증 PASS, 작품 검증 실패 0.

- [ ] **Step 6: 작품 홈과 저장소 카탈로그를 완결로 바꾼다**

`agent-murim/README.md`의 상태를 `완결 (리부트판)`, 12개 목차 상태를 `완결`로 고친다. 루트 `README.md` 배지는 `8편 완결`, 소개와 유성검전 표 행도 완결로 맞춘다.

- [ ] **Step 7: 전체 완료 감사를 실행한다**

Run:

```bash
node agent-murim/scripts/verify-completion.js
git diff --check
git grep -nE '집필 중|🚧|예정|TODO|TBD' -- README.md agent-murim/README.md agent-murim/*.md
```

Expected: 검증 실패 0, diff 형식 오류 없음, 마지막 검색 결과 없음.

### Task 9: 논리 커밋 분리와 푸시

**Files:**
- All files listed above, grouped by intent.

- [ ] **Step 1: 전체 변경을 다시 검토한다**

Run:

```bash
git status --short
git diff --stat
git diff --check
node agent-murim/scripts/verify-completion.js
```

Expected: 승인된 파일만 변경, 형식 오류와 검증 실패 없음.

- [ ] **Step 2: 비밀 파일이 없는지 확인한다**

Run:

```bash
git status --short | rg '(\.env|credentials|_rsa|\.pem|\.key|\.p12)' || true
```

Expected: 출력 없음.

- [ ] **Step 3: 변경을 여덟 논리 커밋으로 나눈다**

사용자의 최신 지시인 “작업이 마무리되면 유의미한 작업 단위로 나누어 커밋, 푸시”를 우선 적용한다. 전체 집필과 검증이 끝난 뒤 각 커밋은 다음 파일만 명시적으로 스테이징한다.

1. 설계·계획 문서
2. 0~3부
3. 4~6부
4. 7~8부
5. 9~10부
6. 에필로그와 BIBLE
7. 검증기와 테스트
8. 작품 README와 루트 README

`git add .`와 `git add -A`는 사용하지 않는다.

- [ ] **Step 4: 커밋 로그와 전체 검증을 확인한다**

Run:

```bash
git log --oneline -8
node --test agent-murim/scripts/verify-completion.test.js
node agent-murim/scripts/verify-completion.js --self-test
node agent-murim/scripts/verify-completion.js
git status --short --branch
```

Expected: 의도한 8개 Conventional Commit, 모든 검증 통과, 깨끗한 작업 트리.

- [ ] **Step 5: 원격으로 푸시하고 동기화를 증명한다**

Run:

```bash
git push
git fetch origin --prune
git rev-list --left-right --count HEAD...origin/main
git status --short --branch
```

Expected: push 성공, 차이 `0 0`, `main...origin/main`, 깨끗한 작업 트리.

## 실행 방식

사용자가 승인 후 계속 진행하라고 명시했으므로 추가 선택 질문 없이 Subagent-Driven 방식을 사용한다. 각 집필 태스크는 선행 원고를 읽은 뒤 순차 실행하고, 서로 다른 파일을 맡긴 경우에만 병렬화한다. 각 작업 뒤 사양 준수 검토와 문체·연속성 검토를 거치며, 최종 커밋 전에는 전체 원고를 한 번 더 교차 감사한다.
