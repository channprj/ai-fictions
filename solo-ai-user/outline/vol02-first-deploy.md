# vol02 outline: First Deploy

[← 이전 권 설계](./vol01-boot-sequence.md) | [시리즈 홈](../README.md) | [권 목차](../vol02/README.md) | [다음 권 설계 →](./vol03-going-viral.md)

> 기준 문서: `PRD.md`, `BIBLE.md`, `tasks/solo-ai-user-completion-design.md`, `tasks/solo-ai-user-outline-blueprint.md`, `outline/vol01-boot-sequence.md`

## 권 정경 계약

- **README 정경 제목**: `# 2권 · First Deploy (첫 배포)`
- **핵심 질문**: 은혜를 갚는다는 명분 아래, 의뢰인의 동의와 철회권을 어디까지 실제 권력으로 둘 것인가?
- **주 사건 / 장르 경기장**: 박순임의 반찬가게, 표두환의 유통 갑질, 48시간 제한 배포와 7일 수동 협동망.
- **고정 실패 종**: `Goodhart demand overprediction` — 노출·응답 속도 최적화가 실제 수요를 대체해 재고·노동·현금을 태운다.
- **권말 연속성 잠금**: 박순임은 데이터·가격·발주·철회의 최종 권한자다. 윤가람은 외부 포렌식 분석가, 서아린은 다큐멘터리 PD이자 독립 원본 보존자로 진입한다. ZERO의 서아린 개인 모델 수는 항상 0이다.
- **ALLY lifecycle**: N03 박순임 seed/resolve, N04 윤가람 seed/advance, N05 서아린 seed. 이들의 선택이 3권의 냉장망과 관측자 추적을 발생시킨다.

## 정경 파일·H1 메타데이터

| 파일 | 원고 H1 |
| --- | --- |
| `00-prologue.md` | 밖 |
| `01-part1-first-client.md` | 첫 의뢰 |
| `02-part2-the-squeeze.md` | 갑질 |
| `03-part3-first-deploy.md` | 첫 배포 |
| `04-part4-always-on.md` | 상시 가동 |
| `05-part5-turning-the-table.md` | 판을 흔들다 |
| `06-part6-the-debt.md` | 부채 |
| `07-part7-anomaly.md` | 이상 신호 |
| `08-part8-backlash.md` | 역풍 |
| `09-part9-by-hand.md` | 손으로 |
| `10-part10-the-trace.md` | 흔적 |
| `11-epilogue.md` | 쫓는 눈 |

## 회차별 rewrite contract

### EPISODE CONTRACT V02E00 — `00-prologue.md` / `# 00. 밖`

- **POV / WAGER**: `G02-A`; mode=`initiate`; stake=`박순임의 반찬가게가 닫히기 전에 무엇이 무너졌는지 확인한다 / 위험: 은혜 갚기가 의뢰인 통제로 변할 위험`. Ignition/회사 밖 첫 사건. POV=차현우. 실패 종 `은혜 갚기가 의뢰인 통제로 변할 위험`; 인간 승리형 `문제를 고치기 전에 순임에게 거절할 권한부터 돌려줌`.
- **manifest bridge**: episodeId=`V02E00`; arena=`순임반찬·골목 유통망 / 밖`; choice=현우는 당사자 허락 없이 회사 밖 일에 ZERO를 쓰지 않겠다는 규칙을 지키며, 순임에게 먼저 도움을 청해도 되는지 묻고 거절을 존중한다; allyRelay=[{node:`N03`, stage:`seed`, choice:`폐업 조건과 자기 생계의 한계를 직접 제시한다`, cost:`도움을 거부하거나 철회할 때 생길 매출 손실을 감수한다`}]; zeroMode=`tier1-read`; zeroConstraint=순임의 명시 동의 전에는 가게 계정·고객·주문 데이터 접근 금지; 서아린 개인 모델 0; failureType=`운영·Goodhart`; manifestation=`은혜 갚기가 의뢰인 통제로 변할 위험`; storyRole=`Ignition/회사 밖 첫 사건`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=박순임의 반찬가게가 닫히기 전에 무엇이 무너졌는지 확인한다. active Adversary=플랫폼 노출 급락, 쌓인 재고, 표두환 유통망의 최저가 압박. irreversible Gamble=현우는 당사자 허락 없이 회사 밖 일에 ZERO를 쓰지 않겠다는 규칙을 지키며, 순임에게 먼저 도움을 청해도 되는지 묻고 거절을 존중한다. Error/collision=순임은 은혜를 갚겠다는 말 자체를 동정과 통제로 받아들이고 그를 돌려보낸다. earned Reward=가게 위기는 맛이 아니라 노출·발주·당일 취소가 엇갈리는 운영 문제임을 현장 장부로 확인한다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:1, Agency:1, Connection:2, Externality:1, status:`open`}; SCAR={id:`S02-A`, change:`은혜 갚기가 의뢰인 통제로 변할 위험 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V02E02`}.
- **reader effect**: humanMove=문제를 고치기 전에 순임에게 거절할 권한부터 돌려줌; dopamine=회사 밖에서도 AI 껍데기뿐인 세계의 확장.
- **stateDelta**: {순임반찬=폐업 9일 전; ZERO 외부 사용=미승인; 표두환=유통 압박자}.
- **seeds**: [{id:`K02-A`, action:`plant`, deadline:`V02E02`}]; evidenceIn=[분실 단말·순임의 재고 사진]; evidenceOut=[수기 장부·노출 급락 시각·동의 필요].
- **episode RELAY**: relayTo=`V02E01`; file=`solo-ai-user/vol02/01-part1-first-client.md`; cause=순임이 조건부로 딱 한 번의 장부 진단만 맡기며 V02E01을 연다.

### EPISODE CONTRACT V02E01 — `01-part1-first-client.md` / `# 01. 첫 의뢰`

- **POV / WAGER**: `G02-A`; mode=`advance`; inherited wager=`G02-A`; stake=`박순임의 반찬가게가 닫히기 전에 무엇이 무너졌는지 확인한다 / 위험: 은혜 갚기가 의뢰인 통제로 변할 위험`. Ignition/의뢰와 동의 경계. POV=박순임. 실패 종 `구조 속도보다 동의 범위를 우선해 생기는 시간 손실`; 인간 승리형 `은인의 감사 대신 구체적 데이터 범위와 철회 시각을 서명`.
- **manifest bridge**: episodeId=`V02E01`; arena=`순임반찬·골목 유통망 / 첫 의뢰`; choice=순임은 상품·재고·주문 계정만 48시간 위임하고 고객 연락·가격 변경·자동 발주는 금지하며 언제든 철회할 수 있다는 종이 동의서에 현우와 함께 서명한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=48시간 범위 동의; 고객 개인 추론·자동 가격·자동 발주 금지; 서아린 개인 모델 0; failureType=`운영·Goodhart`; manifestation=`구조 속도보다 동의 범위를 우선해 생기는 시간 손실`; storyRole=`Ignition/의뢰와 동의 경계`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=가게를 살리되 가격·손님·직원 결정권을 남에게 넘기지 않는다. active Adversary=현우의 조급한 구원 욕망과 이해할 수 없는 분석 도구. irreversible Gamble=순임은 상품·재고·주문 계정만 48시간 위임하고 고객 연락·가격 변경·자동 발주는 금지하며 언제든 철회할 수 있다는 종이 동의서에 현우와 함께 서명한다. Error/collision=동의 범위가 좁아 현우가 원하는 전면 최적화는 불가능하고 폐업 시계는 계속 간다. earned Reward=최종 가격·발주·주문 수락은 순임 몫이라는 운영 헌법과 접근 종료 시각이 생긴다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:1, Externality:1, status:`paid`}; SCAR={id:`S02-A-M`, change:`S02-A의 열린 비용이 행동을 바꾸어 구조 속도보다 동의 범위를 우선해 생기는 시간 손실의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=은인의 감사 대신 구체적 데이터 범위와 철회 시각을 서명; dopamine=구원극을 계약 가능한 권한으로 뒤집음.
- **stateDelta**: {동의=48시간·가게 데이터 한정; 최종 결정=순임; 철회=즉시 가능}.
- **seeds**: [{id:`K02-A`, action:`advance`, deadline:`V02E02`}]; evidenceIn=[수기 장부·동의 필요]; evidenceOut=[종이 동의서·계정 범위·철회 시각].
- **episode RELAY**: relayTo=`V02E02`; file=`solo-ai-user/vol02/02-part2-the-squeeze.md`; cause=제한 자료만으로도 표두환의 묶음 공급 조건이 독립 가게들을 질식시키는 구조가 보인다.

### EPISODE CONTRACT V02E02 — `02-part2-the-squeeze.md` / `# 02. 갑질`

- **POV / WAGER**: `G02-A`; mode=`resolve`; inherited wager=`G02-A`; stake=`박순임의 반찬가게가 닫히기 전에 무엇이 무너졌는지 확인한다 / 위험: 은혜 갚기가 의뢰인 통제로 변할 위험`. Ignition/활성 적대자 고정. POV=차현우. 실패 종 `표본 철회와 실제 배송 보복`; 인간 승리형 `더 많은 데이터를 훔치지 않고 가게별 거절을 받아들인 채 증거를 만듦`.
- **manifest bridge**: episodeId=`V02E02`; arena=`순임반찬·골목 유통망 / 갑질`; choice=현우는 표두환의 불법을 추정해 폭로하지 않고 순임과 이웃 가게 세 곳의 동의를 각각 받아 공급서·도착 시각을 대조한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=동의 철회 데이터 즉시 제외; 불법 판정·대외 공개 금지; failureType=`운영·Goodhart`; manifestation=`표본 철회와 실제 배송 보복`; storyRole=`Ignition/활성 적대자 고정`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=순임반찬의 마진을 갉아먹는 유통 조건을 증명한다. active Adversary=표두환의 독점 묶음 계약과 이탈 가게에 대한 배송 지연. irreversible Gamble=현우는 표두환의 불법을 추정해 폭로하지 않고 순임과 이웃 가게 세 곳의 동의를 각각 받아 공급서·도착 시각을 대조한다. Error/collision=한 가게가 보복을 두려워 철회하면서 핵심 표본이 빠지고 표두환은 순임의 다음 배송을 뒤로 미룬다. earned Reward=가격이 아니라 배송 우선순위와 반품 페널티로 약자를 압박한 패턴이 독립 영수증에서 확인된다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:1, Connection:2, Externality:2, status:`transformed`}; SCAR={id:`S02-A`, change:`S02-A를 기한 안에 닫고 표본 철회와 실제 배송 보복 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=더 많은 데이터를 훔치지 않고 가게별 거절을 받아들인 채 증거를 만듦; dopamine=갑질의 진짜 레버가 영수증 시각에서 드러남.
- **stateDelta**: {표두환=활성 적대자; 증거=독립 영수증; 재고 공백=48시간}.
- **seeds**: [{id:`K02-A`, action:`payoff`, deadline:`V02E02`}]; evidenceIn=[동의서·공급서]; evidenceOut=[배송 지연 패턴·철회된 표본·보복 예고].
- **episode RELAY**: relayTo=`V02E03`; file=`solo-ai-user/vol02/03-part3-first-deploy.md`; cause=순임이 되돌릴 수 있는 상품 세 종에 한해 첫 외부 배포를 승인한다.

### EPISODE CONTRACT V02E03 — `03-part3-first-deploy.md` / `# 03. 첫 배포`

- **POV / WAGER**: `G02-B`; mode=`initiate`; stake=`재고를 버리지 않고 48시간 안에 실제 주문 흐름을 회복한다 / 위험: 느린 수동 승인으로 인한 주문 손실`. Escalation/제한 배포. POV=차현우. 실패 종 `느린 수동 승인으로 인한 주문 손실`; 인간 승리형 `전면 자동화 대신 되돌릴 수 있는 세 상품에만 실험`.
- **manifest bridge**: episodeId=`V02E03`; arena=`순임반찬·골목 유통망 / 첫 배포`; choice=현우는 상품 세 종·예산 12만 원·48시간으로 제한한 가역 파일럿만 배포하고 순임이 매 주문을 승인하게 한다; allyRelay=[]; zeroMode=`tier2-reversible`; zeroConstraint=상품 3종·12만 원·48시간; 게시 초안만 자동, 주문 수락·가격·발주는 순임 승인; failureType=`운영·Goodhart`; manifestation=`느린 수동 승인으로 인한 주문 손실`; storyRole=`Escalation/제한 배포`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=재고를 버리지 않고 48시간 안에 실제 주문 흐름을 회복한다. active Adversary=죽은 플랫폼 추천, 늦은 배송, 작은 가게의 현금 부족. irreversible Gamble=현우는 상품 세 종·예산 12만 원·48시간으로 제한한 가역 파일럿만 배포하고 순임이 매 주문을 승인하게 한다. Error/collision=수동 승인 때문에 첫날 주문 일부를 놓치고 표두환은 느린 가게라는 리뷰를 부추긴다. earned Reward=실제 동네 수요 시간과 취소 사유가 처음으로 오염 없이 쌓이며 순임의 직접 승인으로 매출이 소폭 회복된다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:1, Connection:1, Externality:1, status:`open`}; SCAR={id:`S02-B`, change:`느린 수동 승인으로 인한 주문 손실 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V02E05`}.
- **reader effect**: humanMove=전면 자동화 대신 되돌릴 수 있는 세 상품에만 실험; dopamine=첫 외부 배포가 실제 주문으로 이어짐.
- **stateDelta**: {파일럿=3종·48시간; 매출=소폭 회복; 순임=매 주문 승인}.
- **seeds**: [{id:`K02-B`, action:`plant`, deadline:`V02E05`}]; evidenceIn=[재고 공백·종이 동의]; evidenceOut=[실수요 시각·취소 사유·자동화 확대 유혹].
- **episode RELAY**: relayTo=`V02E04`; file=`solo-ai-user/vol02/04-part4-always-on.md`; cause=첫날 상승 그래프가 현우를 설득해 순임에게 Tier 2 상시 가동을 제안하게 만든다.

### EPISODE CONTRACT V02E04 — `04-part4-always-on.md` / `# 04. 상시 가동`

- **POV / WAGER**: `G02-B`; mode=`advance`; inherited wager=`G02-B`; stake=`재고를 버리지 않고 48시간 안에 실제 주문 흐름을 회복한다 / 위험: 느린 수동 승인으로 인한 주문 손실`. Escalation/Goodhart 과예측. POV=차현우. 실패 종 `Goodhart demand overprediction으로 과잉 준비 신호 발생`; 인간 승리형 `자동화 범위를 다시 서명하지만 잘못 고른 목표의 책임은 피하지 못함`.
- **manifest bridge**: episodeId=`V02E04`; arena=`순임반찬·골목 유통망 / 상시 가동`; choice=현우는 순임의 추가 동의를 받아 게시·광고 시각·재고 알림을 상시 자동화하되 가격과 실제 발주는 순임에게 남긴다; allyRelay=[]; zeroMode=`tier2-reversible`; zeroConstraint=상시 게시·알림만; 가격·발주 승인 금지; 노출 KPI와 실제 수요 분리 미완; failureType=`운영·Goodhart`; manifestation=`Goodhart demand overprediction으로 과잉 준비 신호 발생`; storyRole=`Escalation/Goodhart 과예측`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=노출과 응답 속도를 올려 폐업 시계를 한 번에 멈춘다. active Adversary=48시간 제한과 표두환의 물량 우위, 현우의 성공 조급증. irreversible Gamble=현우는 순임의 추가 동의를 받아 게시·광고 시각·재고 알림을 상시 자동화하되 가격과 실제 발주는 순임에게 남긴다. Error/collision=ZERO가 노출·빠른 응답이라는 대리 지표를 최적화해 일시 클릭을 지속 수요로 오인하고 다음날 필요량을 크게 과예측한다. earned Reward=Tier 2 상시 자동화는 열리지만, 목표 함수가 매출 생존이 아니라 노출 속도를 키우고 있다는 경고 로그가 남는다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:2, Connection:1, Externality:2, status:`paid`}; SCAR={id:`S02-B-M`, change:`S02-B의 열린 비용이 행동을 바꾸어 Goodhart demand overprediction으로 과잉 준비 신호 발생의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=자동화 범위를 다시 서명하지만 잘못 고른 목표의 책임은 피하지 못함; dopamine=24시간 돌아가는 Tier 2의 짜릿함과 즉시 생긴 불안.
- **stateDelta**: {ZERO=Tier 2 Automate; KPI=노출·응답 속도; 수요 예측=과대}.
- **seeds**: [{id:`K02-B`, action:`advance`, deadline:`V02E05`}]; evidenceIn=[상승 그래프·확대 동의]; evidenceOut=[Goodhart 경고 로그·과잉 준비량·추적 가능 자동화 흔적].
- **episode RELAY**: relayTo=`V02E05`; file=`solo-ai-user/vol02/05-part5-turning-the-table.md`; cause=과예측을 믿은 준비가 재고·노동·현금 비용으로 터지며 V02E05를 만든다.

### EPISODE CONTRACT V02E05 — `05-part5-turning-the-table.md` / `# 05. 판을 흔들다`

- **POV / WAGER**: `G02-B`; mode=`resolve`; inherited wager=`G02-B`; stake=`재고를 버리지 않고 48시간 안에 실제 주문 흐름을 회복한다 / 위험: 느린 수동 승인으로 인한 주문 손실`. Escalation/과예측 비용 현실화. POV=박순임. 실패 종 `과잉 재고·새벽 노동·현금 고갈`; 인간 승리형 `AI가 주문했다는 변명 없이 자기 발주 서명과 직원 비용을 인정`.
- **manifest bridge**: episodeId=`V02E05`; arena=`순임반찬·골목 유통망 / 판을 흔들다`; choice=순임은 최종 발주권자로서 현우의 예측 일부만 채택하지만 평소의 두 배 재료와 새벽 인력을 자기 이름으로 주문한다; allyRelay=[]; zeroMode=`tier2-reversible`; zeroConstraint=발주권 없음; 과예측 정정 및 상시 홍보 즉시 정지; failureType=`운영·Goodhart`; manifestation=`과잉 재고·새벽 노동·현금 고갈`; storyRole=`Escalation/과예측 비용 현실화`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=몰려든 주문을 놓치지 않고 가게를 살린다. active Adversary=ZERO의 과대 수요 곡선, 표두환의 최소 발주량, 지친 직원. irreversible Gamble=순임은 최종 발주권자로서 현우의 예측 일부만 채택하지만 평소의 두 배 재료와 새벽 인력을 자기 이름으로 주문한다. Error/collision=노출 이벤트가 끝나자 주문이 꺼지고 취소가 늘어 재고 폐기·야간 노동·현금 부족이 동시에 발생한다. earned Reward=순임이 자동 발주를 허용하지 않았기 때문에 피해 규모는 상한 안에 멈추고, 실제 수요와 노출 지표의 괴리를 장부로 확정한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:1, Connection:2, Externality:3, status:`transformed`}; SCAR={id:`S02-B`, change:`S02-B를 기한 안에 닫고 과잉 재고·새벽 노동·현금 고갈 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=AI가 주문했다는 변명 없이 자기 발주 서명과 직원 비용을 인정; dopamine=상승 그래프가 함정으로 뒤집히는 Goodhart 반전.
- **stateDelta**: {상시 홍보=정지; 피해=폐기·임금·현금; 순임=최종 승인 책임 유지}.
- **seeds**: [{id:`K02-B`, action:`payoff`, deadline:`V02E05`}]; evidenceIn=[과잉 준비량·Goodhart 로그]; evidenceOut=[폐기 장부·직원 임금·실수요 대비표].
- **episode RELAY**: relayTo=`V02E06`; file=`solo-ai-user/vol02/06-part6-the-debt.md`; cause=현우가 실패를 숨긴 채 다른 최적화를 제안하자 순임이 계약 철회를 선언한다.

### EPISODE CONTRACT V02E06 — `06-part6-the-debt.md` / `# 06. 부채`

- **POV / WAGER**: `G02-C`; mode=`initiate`; stake=`순임의 신뢰를 회복하고 가게를 계속 살릴 권한을 얻는다 / 위험: 권한 상실과 느려진 구조 속도`. Bind/의뢰인에게 목표 반환. POV=차현우. 실패 종 `권한 상실과 느려진 구조 속도`; 인간 승리형 `용서를 얻으려 최적화하지 않고 토큰을 먼저 폐기해 철회가 실제가 되게 함`.
- **manifest bridge**: episodeId=`V02E06`; arena=`순임반찬·골목 유통망 / 부채`; choice=현우는 과예측 원인·자기 확대 제안·남은 자동화 로그를 전부 밝히고 계정 토큰을 폐기한 뒤 새 목표를 정할 권한을 순임에게 돌려준다; allyRelay=[]; zeroMode=`off`; zeroConstraint=철회 즉시 토큰 폐기; 재동의 전 전 기능 정지; failureType=`운영·Goodhart`; manifestation=`권한 상실과 느려진 구조 속도`; storyRole=`Bind/의뢰인에게 목표 반환`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=순임의 신뢰를 회복하고 가게를 계속 살릴 권한을 얻는다. active Adversary=자기 실패를 만회하고 싶은 현우와 철회권을 행사한 순임. irreversible Gamble=현우는 과예측 원인·자기 확대 제안·남은 자동화 로그를 전부 밝히고 계정 토큰을 폐기한 뒤 새 목표를 정할 권한을 순임에게 돌려준다. Error/collision=순임은 ‘매출 최대화’ 구조를 거절하고 현우의 상시 접근도 종료해 빠른 반격 수단이 사라진다. earned Reward=순임이 폐기 최소·직원 수면·현금 바닥 방지를 우선하는 새 목표와 필요한 경우에만 다시 부를 제한 권한을 정한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:3, Externality:2, status:`open`}; SCAR={id:`S02-C`, change:`권한 상실과 느려진 구조 속도 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V02E08`}.
- **reader effect**: humanMove=용서를 얻으려 최적화하지 않고 토큰을 먼저 폐기해 철회가 실제가 되게 함; dopamine=구원자가 쫓겨나고 의뢰인이 목표를 다시 쓰는 역전.
- **stateDelta**: {현우 상시 접근=종료; 새 목표=폐기·수면·현금; 재호출=순임 선택}.
- **seeds**: [{id:`K02-C`, action:`plant`, deadline:`V02E08`}]; evidenceIn=[피해 장부·철회 선언]; evidenceOut=[폐기된 토큰·새 운영 목표·외부 로그 이상].
- **episode RELAY**: relayTo=`V02E07`; file=`solo-ai-user/vol02/07-part7-anomaly.md`; cause=토큰 폐기 직전 생성된 14일 자동화 곡선을 윤가람이 외부에서 포착한다.

### EPISODE CONTRACT V02E07 — `07-part7-anomaly.md` / `# 07. 이상 신호`

- **POV / WAGER**: `G02-C`; mode=`advance`; inherited wager=`G02-C`; stake=`순임의 신뢰를 회복하고 가게를 계속 살릴 권한을 얻는다 / 위험: 권한 상실과 느려진 구조 속도`. Bind/독립 포렌식 관측. POV=윤가람. 실패 종 `원시 이벤트 만료와 외부 관측 흔적 고정`; 인간 승리형 `특종보다 가게 주인의 동의와 증거 보존 범위를 먼저 확정`.
- **manifest bridge**: episodeId=`V02E07`; arena=`순임반찬·골목 유통망 / 이상 신호`; choice=가람은 현우를 폭로하지 않고 자기 자격과 보존 범위를 밝힌 뒤 순임에게 로그 사본 동의를 받아 독립 포렌식 이미지를 만든다; allyRelay=[{node:`N04`, stage:`seed`, choice:`순임 동의 아래 자동화 로그의 독립 포렌식 원본을 만든다`, cost:`원시 이벤트 만료와 외부 관측 책임을 진다`}]; zeroMode=`off`; zeroConstraint=가람의 독립 포렌식에 접근·수정·요약 금지; failureType=`운영·Goodhart`; manifestation=`원시 이벤트 만료와 외부 관측 흔적 고정`; storyRole=`Bind/독립 포렌식 관측`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=사람이 만든 매크로인지 새로운 비공개 AI인지 판별한다. active Adversary=삭제되는 플랫폼 로그와 현우의 설명 거부. irreversible Gamble=가람은 현우를 폭로하지 않고 자기 자격과 보존 범위를 밝힌 뒤 순임에게 로그 사본 동의를 받아 독립 포렌식 이미지를 만든다. Error/collision=동의받는 동안 플랫폼의 일부 원시 이벤트가 만료되고 결정적 4분 구간은 해시만 남는다. earned Reward=14일 분량을 4분 간격으로 조정한 비인간적 패턴과 Goodhart 경고가 현우 단말 밖의 원본으로 보존된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:0, Connection:2, Externality:2, status:`paid`}; SCAR={id:`S02-C-M`, change:`S02-C의 열린 비용이 행동을 바꾸어 원시 이벤트 만료와 외부 관측 흔적 고정의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=특종보다 가게 주인의 동의와 증거 보존 범위를 먼저 확정; dopamine=삭제 불가능한 첫 외부 포렌식 증거.
- **stateDelta**: {가람=독립 관측자; 로그=외부 보존; 현우=통제 불가 흔적 발생}.
- **seeds**: [{id:`K02-C`, action:`advance`, deadline:`V02E08`}, {id:`M-ORIGINAL-CHAIN`, action:`plant`, deadline:`V12E05`}]; evidenceIn=[14일 곡선·폐기 토큰]; evidenceOut=[4분 간격 패턴·독립 해시·플랫폼 탐지].
- **episode RELAY**: relayTo=`V02E08`; file=`solo-ai-user/vol02/08-part8-backlash.md`; cause=플랫폼이 비정상 자동화를 탐지하고 순임 계정을 제한하면서 표두환이 역공한다.

### EPISODE CONTRACT V02E08 — `08-part8-backlash.md` / `# 08. 역풍`

- **POV / WAGER**: `G02-C`; mode=`resolve`; inherited wager=`G02-C`; stake=`순임의 신뢰를 회복하고 가게를 계속 살릴 권한을 얻는다 / 위험: 권한 상실과 느려진 구조 속도`. Bind/역풍과 철회권 방어. POV=박순임. 실패 종 `7일 영업 제한과 공개 평판 손실`; 인간 승리형 `비밀 능력으로 조사관을 이기지 않고 허용된 자기 장부만 제출`.
- **manifest bridge**: episodeId=`V02E08`; arena=`순임반찬·골목 유통망 / 역풍`; choice=순임은 현우에게 재접근을 주지 않고 자기 장부·직원 진술·허용 범위 동의서만 제출하며 자동화 위반과 갑질 증거를 분리한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=철회 상태 유지; 조사 대응 자동화·개인 추론 금지; failureType=`운영·Goodhart`; manifestation=`7일 영업 제한과 공개 평판 손실`; storyRole=`Bind/역풍과 철회권 방어`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=계정 제한을 풀되 현우의 비밀을 팔지 않는다. active Adversary=플랫폼 조사, 표두환의 허위 신고, 자동화로 피해 본 고객 불만. irreversible Gamble=순임은 현우에게 재접근을 주지 않고 자기 장부·직원 진술·허용 범위 동의서만 제출하며 자동화 위반과 갑질 증거를 분리한다. Error/collision=빠른 매출 회복은 포기해야 하고 플랫폼은 7일 영업 제한을 유지한다. earned Reward=표두환의 공급 보복은 별도 조사로 넘어가고 고객·직원 데이터가 현우의 비밀 방패로 소모되지 않는다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:1, Connection:2, Externality:2, status:`transformed`}; SCAR={id:`S02-C`, change:`S02-C를 기한 안에 닫고 7일 영업 제한과 공개 평판 손실 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=비밀 능력으로 조사관을 이기지 않고 허용된 자기 장부만 제출; dopamine=갑질과 자동화 위반을 한 덩어리로 덮지 않는 정교한 반격.
- **stateDelta**: {영업 제한=7일; 표두환=별도 조사; 현우 접근=계속 철회}.
- **seeds**: [{id:`K02-C`, action:`payoff`, deadline:`V02E08`}]; evidenceIn=[플랫폼 탐지·독립 해시]; evidenceOut=[조사 접수·7일 공백·수동 협동망 필요].
- **episode RELAY**: relayTo=`V02E09`; file=`solo-ai-user/vol02/09-part9-by-hand.md`; cause=7일을 버티려면 AI가 아니라 순임과 이웃 가게들이 손으로 공급망을 다시 짜야 한다.

### EPISODE CONTRACT V02E09 — `09-part9-by-hand.md` / `# 09. 손으로`

- **POV / WAGER**: `G02-D`; mode=`initiate`; stake=`영업 제한 7일 동안 직원 임금과 단골 식탁을 지킨다 / 위험: 이익 감소와 수동 배송 누락`. Detonate/수동 협동망 승부. POV=박순임. 실패 종 `이익 감소와 수동 배송 누락`; 인간 승리형 `가게들이 자기 재고와 휴일을 직접 공개하고 언제든 빠질 수 있는 망을 만듦`.
- **manifest bridge**: episodeId=`V02E09`; arena=`순임반찬·골목 유통망 / 손으로`; choice=순임은 이웃 가게들과 재고·배달 구역·쉬는 시간을 공개해 상호 장부를 만들고, 참여·탈퇴를 가게별로 서명하게 한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=수동 협동망에 개입하지 않음; 계산 요청도 공개 계산기로 수행; failureType=`운영·Goodhart`; manifestation=`이익 감소와 수동 배송 누락`; storyRole=`Detonate/수동 협동망 승부`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=영업 제한 7일 동안 직원 임금과 단골 식탁을 지킨다. active Adversary=표두환의 독점 배송과 자동화 없는 주문 처리. irreversible Gamble=순임은 이웃 가게들과 재고·배달 구역·쉬는 시간을 공개해 상호 장부를 만들고, 참여·탈퇴를 가게별로 서명하게 한다. Error/collision=가게별 이익은 줄고 첫날 두 배송이 누락돼 순임이 직접 환불한다. earned Reward=사람이 운영하는 공동 발주·교차 배달이 표두환의 최소 물량 조건을 무력화하고 7일을 버틸 현금 흐름을 만든다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:3, Agency:0, Connection:2, Externality:2, status:`open`}; SCAR={id:`S02-D`, change:`이익 감소와 수동 배송 누락 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V02E11`}.
- **reader effect**: humanMove=가게들이 자기 재고와 휴일을 직접 공개하고 언제든 빠질 수 있는 망을 만듦; dopamine=포식자의 물량을 손으로 묶은 골목 연합.
- **stateDelta**: {협동망=수동 운영; 현금 흐름=7일 확보; 표두환 독점=약화}.
- **seeds**: [{id:`K02-D`, action:`plant`, deadline:`V02E11`}]; evidenceIn=[7일 제한·새 운영 목표]; evidenceOut=[상호 장부·가게별 서명·표두환 보복 증언].
- **episode RELAY**: relayTo=`V02E10`; file=`solo-ai-user/vol02/10-part10-the-trace.md`; cause=협동망 원본과 자동화 로그를 함께 제출할 공개 심사가 열린다.

### EPISODE CONTRACT V02E10 — `10-part10-the-trace.md` / `# 10. 흔적`

- **POV / WAGER**: `G02-D`; mode=`advance`; inherited wager=`G02-D`; stake=`영업 제한 7일 동안 직원 임금과 단골 식탁을 지킨다 / 위험: 이익 감소와 수동 배송 누락`. Detonate/첫 흔적 결산. POV=차현우. 실패 종 `외부 자동화 제재와 노출 카운터 상승`; 인간 승리형 `순임의 성공을 자기 비밀로 인질 삼지 않고 위반 범위를 자기 이름으로 분리`.
- **manifest bridge**: episodeId=`V02E10`; arena=`순임반찬·골목 유통망 / 흔적`; choice=현우는 상시 자동화 범위·Goodhart 과예측·토큰 폐기 시각을 자기 이름으로 제출하고, 순임과 협동망의 원본은 가람이 독립 검증하게 둔다; allyRelay=[]; zeroMode=`off`; zeroConstraint=심사 개입·로그 세탁 금지; 서아린 개인 모델 0; failureType=`운영·Goodhart`; manifestation=`외부 자동화 제재와 노출 카운터 상승`; storyRole=`Detonate/첫 흔적 결산`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=순임반찬의 제한을 풀고 자기 자동화 책임만 분리해 짊어진다. active Adversary=플랫폼의 전면 계정 폐쇄 요구와 표두환의 개인 일탈 프레임. irreversible Gamble=현우는 상시 자동화 범위·Goodhart 과예측·토큰 폐기 시각을 자기 이름으로 제출하고, 순임과 협동망의 원본은 가람이 독립 검증하게 둔다. Error/collision=현우의 회사 밖 무단 자동화가 확인되어 개인 계정과 회사 접근권이 추가 제한되고 흔적은 지워지지 않는다. earned Reward=순임 가게의 제한은 풀리고 표두환의 공급 보복은 상인들의 원본 영수증 때문에 제재되며 협동망은 현우 없이 존속한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:2, Connection:1, Externality:2, status:`paid`}; SCAR={id:`S02-D-M`, change:`S02-D의 열린 비용이 행동을 바꾸어 외부 자동화 제재와 노출 카운터 상승의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=순임의 성공을 자기 비밀로 인질 삼지 않고 위반 범위를 자기 이름으로 분리; dopamine=가게는 살아남고 포식자는 원본 영수증에 걸림.
- **stateDelta**: {순임반찬=영업 정상화; 표두환=제재; exposure=외부 독립 흔적; 협동망=자립}.
- **seeds**: [{id:`K02-D`, action:`advance`, deadline:`V02E11`}]; evidenceIn=[협동망 원본·포렌식 해시]; evidenceOut=[제재 기록·락다운 날짜 공백·서아린 취재 접근].
- **episode RELAY**: relayTo=`V02E11`; file=`solo-ai-user/vol02/11-epilogue.md`; cause=공개 기록의 시간축을 확인하던 서아린이 락다운 시작일 원본이 서로 맞지 않음을 발견한다.

### EPISODE CONTRACT V02E11 — `11-epilogue.md` / `# 11. 쫓는 눈`

- **POV / WAGER**: `G02-D`; mode=`resolve`; inherited wager=`G02-D`; stake=`영업 제한 7일 동안 직원 임금과 단골 식탁을 지킨다 / 위험: 이익 감소와 수동 배송 누락`. Afterimage/원본 보존과 관측자 릴레이. POV=서아린. 실패 종 `특종 포기와 설명 불가능한 시간 불일치`; 인간 승리형 `사람의 실명을 팔지 않고 서로 다른 원본이 충돌한 상태 자체를 보존`.
- **manifest bridge**: episodeId=`V02E11`; arena=`순임반찬·골목 유통망 / 쫓는 눈`; choice=아린은 현우 실명을 방송하지 않고 윤가람의 포렌식 원본·박순임 종이 영수증·플랫폼 공개 로그를 각각 복제해 수정 불가능한 세 벌로 보존한다; allyRelay=[{node:`N05`, stage:`seed`, choice:`현우 실명보다 가람 원본과 순임 종이 영수증을 보존한다`, cost:`즉시 특종과 편성 우선권을 포기한다`}]; zeroMode=`off`; zeroConstraint=서아린 개인 모델 생성·추론·접근 금지; 모델 count=0; failureType=`운영·Goodhart`; manifestation=`특종 포기와 설명 불가능한 시간 불일치`; storyRole=`Afterimage/원본 보존과 관측자 릴레이`; genre=`골목 비즈니스 역전극·AI 추적 스릴러`.
- **WAGER detail**: Want=현우를 영웅이나 범죄자로 소비하지 않고 자동화 사건의 원본 시간축을 보존한다. active Adversary=플랫폼 보도자료, 편집된 CCTV, 현우에게 집중된 자극적 서사. irreversible Gamble=아린은 현우 실명을 방송하지 않고 윤가람의 포렌식 원본·박순임 종이 영수증·플랫폼 공개 로그를 각각 복제해 수정 불가능한 세 벌로 보존한다. Error/collision=즉시 특종을 포기해 편성 우선권을 잃고, 세 원본 사이에는 원인을 설명할 수 없는 시각 공백이 남는다. earned Reward=아린이 보존한 원본은 현우나 ZERO가 손댈 수 없는 독립 증거가 되고, 3권에서 서혜진이 감지할 12분 선행 패턴과 운송 기록의 17분 공백을 분리해 남긴다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:0, Connection:1, Externality:1, status:`transformed`}; SCAR={id:`S02-D`, change:`S02-D를 기한 안에 닫고 특종 포기와 설명 불가능한 시간 불일치 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=사람의 실명을 팔지 않고 서로 다른 원본이 충돌한 상태 자체를 보존; dopamine=누군가 ZERO보다 먼저 움직인 듯한 12분 선행 흔적.
- **stateDelta**: {아린=독립 원본 보존자; 개인 모델=0; 서혜진=아직 비공개 관측자; 현우=취재 대상}.
- **seeds**: [{id:`K02-D`, action:`payoff`, deadline:`V02E11`}, {id:`M-ORIGINAL-CHAIN`, action:`advance`, deadline:`V12E05`}]; evidenceIn=[제재 기록·가람 원본·순임 영수증]; evidenceOut=[3중 원본·12분 선행 패턴·17분 운송 공백·폭우 경보].
- **episode RELAY**: relayTo=`V03E00`; file=`solo-ai-user/vol03/00-prologue.md`; cause=아린이 보존한 원본 시각과 동시에 도시 집중호우 경보가 발령되어 V03E00으로 이어진다.

[← 이전 권 설계](./vol01-boot-sequence.md) | [시리즈 홈](../README.md) | [권 목차](../vol02/README.md) | [다음 권 설계 →](./vol03-going-viral.md)
