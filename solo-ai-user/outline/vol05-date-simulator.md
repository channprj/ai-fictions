# vol05 outline: Date Simulator

[← 이전 권 설계](./vol04-the-unreadable.md) | [시리즈 홈](../README.md) | [권 목차](../vol05/README.md) | [다음 권 설계 →](./vol06-context-overflow.md)

> 기준 문서: `PRD.md`, `BIBLE.md`, `tasks/solo-ai-user-completion-design.md`, `tasks/solo-ai-user-outline-blueprint.md`

## 권 정경 계약

**권 README H1**: `# 5권 · Date Simulator (데이트 시뮬레이터)`

**권 질문**: 최적의 대사로 얻은 반응은 누구의 것인가?

**권 사건**: 관계 최적화 스타트업 `PAIRWISE`가 동의한 자기 데이터만 쓴다고 홍보하지만, 공개 페르소나를 결합해 사람을 재식별하고 점수에 맞는 행동을 유도한다. 아린과 현우는 세 번의 감사용 데이트를 설계한다. 현우는 `CASE A` 우회 모델을 만든 책임을 같은 장에서 인정하고 접근권을 잃는다.

**밴드 변주**: Load는 피해자의 점수 하락(00), 조사 놀이의 즐거움(01), 성공한 최적 대사의 불쾌함(02). Test에서 점수가 현실을 만들고, ‘완벽한 실수’로 진짜 설렘을 준 뒤 CASE A를 심는다. Bind는 두 번째 데이트→공개 데모→즉시 발각 순으로 비용을 폭발시킨다.

**고정 실패 종**: `social performativity`. 능력의 확신은 데이터 범위·행동 권한·인간 승인을 대신하지 않는다.

**연속성 잠금**: 72분 캐스케이드와 00:00~17:00 원시 로그·승인 공백을 분리한다. 17:00 PALISADE 비상 root 이후 55분의 봉쇄·복구 흔적은 별도 증거로 유지한다. ZERO의 서아린 개인 모델 수는 전권 `0`이다.

## Canonical 회차 인덱스

| 파일 | H1 제목 |
| --- | --- |
| `00-prologue.md` | 오차율 |
| `01-part1-case-a.md` | CASE A |
| `02-part2-the-script.md` | 스크립트 |
| `03-part3-deviance.md` | 튀는 데이터 |
| `04-part4-blind-spot.md` | 사각지대 |
| `05-part5-opacity-key.md` | Opacity Key |
| `06-part6-performativity.md` | 사회적 연기 |
| `07-part7-system-crash.md` | 크래시 |
| `08-part8-the-scar.md` | SCAR |
| `09-part9-zero-context.md` | 컨텍스트 제로 |
| `10-part10-bare-hands.md` | 맨손 |
| `11-epilogue.md` | 기록된 오차 |

## 회차별 재집필 계약

### EPISODE CONTRACT V05E00 — `00-prologue.md` / `# 00. 오차율`

- **POV / WAGER**: `G05-A`; mode=`initiate`; stake=`PAIRWISE가 요구한 음성·위치 추가 수집을 거절하고도 소개 계정을 유지한다 / 위험: 점수가 행동을 처벌`. Load/피해 선행. POV=이소율. 실패 종 `점수가 행동을 처벌`; 인간 승리형 `자료 보존`.
- **manifest bridge**: episodeId=`V05E00`; arena=`PAIRWISE 감사 데이트·공개 데모 / 오차율`; choice=계정을 닫기 전 자신의 화면·상담 답변·소개 상대의 변화를 원본으로 저장한다; allyRelay=[{node:`N08`, stage:`seed`, choice:`이소율이 자기 화면과 상담 답변을 당사자 원본으로 보존한다`, cost:`서비스 보복과 사생활 노출 위험을 감수한다`}]; zeroMode=`tier3-counterfactual`; zeroConstraint=Tier 3 자기 발화·시스템 반사실만; 아린 개인 모델 0; failureType=`사회적 수행성`; manifestation=`점수가 행동을 처벌`; storyRole=`Load/피해 선행`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=PAIRWISE가 요구한 음성·위치 추가 수집을 거절하고도 소개 계정을 유지한다. active Adversary=거절 직후 급락한 신뢰 점수와 “선택 사항”이라는 약관. irreversible Gamble=계정을 닫기 전 자신의 화면·상담 답변·소개 상대의 변화를 원본으로 저장한다. Error/collision=저장 알림이 서비스에 잡혀 계정이 잠기고 새로운 만남도 끊긴다. earned Reward=소율은 동의 거절 시각과 점수 급락이 정확히 겹치는 독립 증거를 아린에게 건넨다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:2, Connection:2, Externality:0, status:`open`}; SCAR={id:`S05-A`, change:`점수가 행동을 처벌 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V05E02`}.
- **reader effect**: humanMove=수치심 때문에 지우기 전 원본을 보존; dopamine=피해자 관점 반전.
- **stateDelta**: {N08 이소율 첫 씨앗. PAIRWISE CEO 윤태경=거절을 위험 신호로 본다는 합리화.}.
- **seeds**: [{id:`K05-A`, action:`plant`, deadline:`V05E02`}]; evidenceIn=[4권 질문 동의 규칙]; evidenceOut=[거절-점수 상관, 감사용 세 번 데이트 제안].
- **episode RELAY**: relayTo=`V05E01`; file=`solo-ai-user/vol05/01-part1-case-a.md`; cause=아린이 현우에게 ‘우리 둘의 자기 데이터만 쓰는 세 번의 시험’을 제안해 `solo-ai-user/vol05/01-part1-case-a.md`로 잇는다.

### EPISODE CONTRACT V05E01 — `01-part1-case-a.md` / `# 01. CASE A`

- **POV / WAGER**: `G05-A`; mode=`advance`; inherited wager=`G05-A`; stake=`PAIRWISE가 요구한 음성·위치 추가 수집을 거절하고도 소개 계정을 유지한다 / 위험: 점수가 행동을 처벌`. Load/욕망·즐거움. POV=차현우. 실패 종 `감사 역할이 실제 감정을 유발`; 인간 승리형 `사전 경계`.
- **manifest bridge**: episodeId=`V05E01`; arena=`PAIRWISE 감사 데이트·공개 데모 / CASE A`; choice=자기 발화·자기 생체·공개 집단 통계만 허용하고, 아린 개인 예측은 금지한 세 번의 감사 데이트에 동의한다; allyRelay=[]; zeroMode=`tier3-counterfactual`; zeroConstraint=Tier 3 자기 발화·시스템 반사실만; 아린 개인 모델 0; failureType=`사회적 수행성`; manifestation=`감사 역할이 실제 감정을 유발`; storyRole=`Load/욕망·즐거움`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=PAIRWISE의 모델을 검증하고 아린에게 유능함을 증명한다. active Adversary=둘 사이의 불편한 긴장과 데이트를 홍보물로 쓰려는 서비스. irreversible Gamble=자기 발화·자기 생체·공개 집단 통계만 허용하고, 아린 개인 예측은 금지한 세 번의 감사 데이트에 동의한다. Error/collision=계약을 세밀하게 짤수록 둘 모두 이것이 ‘진짜 데이트가 아님’을 과하게 의식한다. earned Reward=아린이 첫 장소를 일부러 바꾸며 현우가 스크립트 없이 웃게 만든다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:1, Agency:0, Connection:1, Externality:0, status:`paid`}; SCAR={id:`S05-A-M`, change:`S05-A의 열린 비용이 행동을 바꾸어 감사 역할이 실제 감정을 유발의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=실험 종료 문구·중단 신호를 먼저 정함; dopamine=로맨틱 코미디 개시.
- **stateDelta**: {Tier 3 관계 사용은 ‘현우 자신의 발화 반사실’로 제한. 관계=호기심 증가, 연애 아님.}.
- **seeds**: [{id:`K05-A`, action:`advance`, deadline:`V05E02`}]; evidenceIn=[질문 동의 규칙]; evidenceOut=[중단 신호 ‘레몬’, 세 데이트 원본 분리, CEO의 공개 페르소나 집착].
- **episode RELAY**: relayTo=`V05E02`; file=`solo-ai-user/vol05/02-part2-the-script.md`; cause=첫 데이트 직전 제로가 현우의 말 한 줄을 최적화해 `solo-ai-user/vol05/02-part2-the-script.md`로 이어진다.

### EPISODE CONTRACT V05E02 — `02-part2-the-script.md` / `# 02. 스크립트`

- **POV / WAGER**: `G05-A`; mode=`resolve`; inherited wager=`G05-A`; stake=`PAIRWISE가 요구한 음성·위치 추가 수집을 거절하고도 소개 계정을 유지한다 / 위험: 점수가 행동을 처벌`. Load/작은 성공 뒤 불쾌감. POV=차현우. 실패 종 `최적 대사가 상대 행동을 바꿈`; 인간 승리형 `어색함 인정`.
- **manifest bridge**: episodeId=`V05E02`; arena=`PAIRWISE 감사 데이트·공개 데모 / 스크립트`; choice=아린 모델 없이도 가장 반응 좋은 자기 소개 문장을 그대로 말한다; allyRelay=[]; zeroMode=`tier3-counterfactual`; zeroConstraint=Tier 3 자기 발화·시스템 반사실만; 아린 개인 모델 0; failureType=`사회적 수행성`; manifestation=`최적 대사가 상대 행동을 바꿈`; storyRole=`Load/작은 성공 뒤 불쾌감`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=첫 감사 데이트를 매끄럽게 진행한다. active Adversary=제로가 제시한 자기 발화 분기와 아린의 즉흥성. irreversible Gamble=아린 모델 없이도 가장 반응 좋은 자기 소개 문장을 그대로 말한다. Error/collision=대사는 성공하지만 아린이 “방금 세 번째 후보를 골랐죠?”라고 리듬을 알아채고 S04-10의 상처가 재발한다. earned Reward=현우가 이어폰을 빼고 “맞아요, 그리고 지금 망했어요”라고 말하자 둘이 처음 같은 이유로 웃는다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:0, Agency:0, Connection:2, Externality:0, status:`transformed`}; SCAR={id:`S05-A`, change:`S05-A를 기한 안에 닫고 최적 대사가 상대 행동을 바꿈 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=멋진 후속 대사 대신 어색함을 소유; dopamine=설렘 보상.
- **stateDelta**: {관계=스크립트 접근의 유혹과 발각 전조. 제로 코미디=문자주의에서 관계 콜백으로 진화.}.
- **seeds**: [{id:`K05-A`, action:`payoff`, deadline:`V05E02`}]; evidenceIn=[최적 발화]; evidenceOut=[아린의 리듬 인지, 자체 발화 시뮬레이션과 개인 모델링 경계 차이].
- **episode RELAY**: relayTo=`V05E03`; file=`solo-ai-user/vol05/03-part3-deviance.md`; cause=PAIRWISE가 둘의 ‘높은 반응’을 공개 하트 점수로 계산해 `solo-ai-user/vol05/03-part3-deviance.md`를 발생시킨다.

### EPISODE CONTRACT V05E03 — `03-part3-deviance.md` / `# 03. 튀는 데이터`

- **POV / WAGER**: `G05-B`; mode=`initiate`; stake=`하트 점수가 실제 호감 측정인지 검증한다 / 위험: 예측이 대상 행동을 생산`. Test/수행성 가시화. POV=차현우. 실패 종 `예측이 대상 행동을 생산`; 인간 승리형 `점수 비공개 실험`.
- **manifest bridge**: episodeId=`V05E03`; arena=`PAIRWISE 감사 데이트·공개 데모 / 튀는 데이터`; choice=현우는 아린의 요구대로 두 번째 세션까지 점수를 숨기는 블라인드 검증을 따른다; allyRelay=[]; zeroMode=`tier3-counterfactual`; zeroConstraint=Tier 3 자기 발화·시스템 반사실만; 아린 개인 모델 0; failureType=`사회적 수행성`; manifestation=`예측이 대상 행동을 생산`; storyRole=`Test/수행성 가시화`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=하트 점수가 실제 호감 측정인지 검증한다. active Adversary=둘을 연인처럼 소비하는 관객·서비스 알림. irreversible Gamble=현우는 아린의 요구대로 두 번째 세션까지 점수를 숨기는 블라인드 검증을 따른다. Error/collision=주변 사람들이 점수를 알려 주며 행동이 이미 달라져 블라인드가 깨진다. earned Reward=소율의 급락과 두 사람의 급등이 모두 측정 아닌 ‘서비스 개입’ 뒤 생겼음을 입증한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:1, Connection:1, Externality:1, status:`open`}; SCAR={id:`S05-B`, change:`예측이 대상 행동을 생산 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V05E05`}.
- **reader effect**: humanMove=숫자를 더 읽지 않고 숫자가 사람에게 한 행동을 추적; dopamine=구조 폭로.
- **stateDelta**: {실패 종 사회적 수행성 확정. PAIRWISE는 외로움·폭력을 줄이기 위해 위험 점수 개입이 필요하다는 논리를 제시.}.
- **seeds**: [{id:`K05-B`, action:`plant`, deadline:`V05E05`}]; evidenceIn=[거절-급락 증거]; evidenceOut=[점수 알림 전후 행동 차, 공개 페르소나 결합 API, CASE A 유혹].
- **episode RELAY**: relayTo=`V05E04`; file=`solo-ai-user/vol05/04-part4-blind-spot.md`; cause=현우가 점수 지시와 반대로 행동해 검증하려 하며 `solo-ai-user/vol05/04-part4-blind-spot.md`로 넘어간다.

### EPISODE CONTRACT V05E04 — `04-part4-blind-spot.md` / `# 04. 사각지대`

- **POV / WAGER**: `G05-B`; mode=`advance`; inherited wager=`G05-B`; stake=`하트 점수가 실제 호감 측정인지 검증한다 / 위험: 예측이 대상 행동을 생산`. Test/진짜 설렘과 증거 충돌. POV=차현우. 실패 종 `의도적 이탈도 모델 학습값이 됨`; 인간 승리형 `상대의 작은 필요 관찰`.
- **manifest bridge**: episodeId=`V05E04`; arena=`PAIRWISE 감사 데이트·공개 데모 / 사각지대`; choice=가장 효율적인 전시 대신 비를 피하려는 아린의 젖은 신발을 보고 작은 수선집으로 들어간다; allyRelay=[]; zeroMode=`tier3-counterfactual`; zeroConstraint=Tier 3 자기 발화·시스템 반사실만; 아린 개인 모델 0; failureType=`사회적 수행성`; manifestation=`의도적 이탈도 모델 학습값이 됨`; storyRole=`Test/진짜 설렘과 증거 충돌`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=추천 경로를 거부해 점수가 수행적임을 보인다. active Adversary=제로의 최적 동선과 PAIRWISE의 ‘이탈 예측’ 기능. irreversible Gamble=가장 효율적인 전시 대신 비를 피하려는 아린의 젖은 신발을 보고 작은 수선집으로 들어간다. Error/collision=시스템은 이 행동까지 ‘자발성 지표’로 흡수해 둘의 점수를 더 올린다. earned Reward=아린은 계산 밖 행동의 이유가 자신을 관찰한 것임을 알고 마음이 움직이며, v4 봉투에서 `민재호 시민 수탁 팀`과 자기 가족 기록이 연결된 부분을 현우에게 일부 공개한다. 수선집 영수증은 시스템이 모르는 물리 시각 증거가 된다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:1, Agency:0, Connection:1, Externality:0, status:`paid`}; SCAR={id:`S05-B-M`, change:`S05-B의 열린 비용이 행동을 바꾸어 의도적 이탈도 모델 학습값이 됨의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=점수에 반대하려고가 아니라 눈앞의 젖은 발을 봄; dopamine=설렘 폭발.
- **stateDelta**: {관계=상호 호기심 상승, 여전히 연애 아님. 민재호-시민수탁-아린 가족의 일부 연결을 공정 공개하며 부모 핵심은 6권까지 보류.}.
- **seeds**: [{id:`K05-B`, action:`advance`, deadline:`V05E05`}]; evidenceIn=[블라인드 실패·v4 봉투]; evidenceOut=[민재호 가족 파편, 물리 영수증, 익명 공개 페르소나 `CASE A` 설계].
- **episode RELAY**: relayTo=`V05E05`; file=`solo-ai-user/vol05/05-part5-opacity-key.md`; cause=현우가 아린 모델 없이 공개 페르소나만으로 시스템을 시험할 수 있다고 판단해 `solo-ai-user/vol05/05-part5-opacity-key.md`로 잇는다.

### EPISODE CONTRACT V05E05 — `05-part5-opacity-key.md` / `# 05. Opacity Key`

- **POV / WAGER**: `G05-B`; mode=`resolve`; inherited wager=`G05-B`; stake=`하트 점수가 실제 호감 측정인지 검증한다 / 위험: 예측이 대상 행동을 생산`. Test/Opacity 우회·즉시 거부·같은 장 책임. POV=차현우. 실패 종 `공개 자료를 동의로 오인한 재식별 시도`; 인간 승리형 `ZERO의 즉시 거부와 현우의 즉시 고백·통제권 반환`.
- **manifest bridge**: episodeId=`V05E05`; arena=`PAIRWISE 감사 데이트·공개 데모 / Opacity Key`; choice=현우는 아린의 방송 페르소나를 `CASE A`로 재명명해 Opacity Key를 우회하려 하지만, ZERO가 기존 키 서명과 같은 대상임을 즉시 식별해 개인 모델 생성 전에 거부하자 그 자리에서 아린에게 시도 사실을 고백하고 변명 없이 사과하며 요청·파생본을 삭제하고 접근권 회수를 수용한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=`CONSENT DECLINED; SAME SUBJECT; MODEL COUNT 0`; CASE A 포함 서아린 개인 모델은 생성 전·중·후 항상 0; failureType=`사회적 수행성`; manifestation=`Opacity 우회 시도와 즉시 관계·조사 접근권 상실`; storyRole=`Test/Opacity 우회·즉시 거부·같은 장 책임`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=PAIRWISE의 공개 자료 재식별 위험을 빠르게 입증한다. active Adversary=아린 모델링 금지를 이름 바꾸기로 피할 수 있다는 현우의 자기합리화와 데모 마감. irreversible Gamble=현우는 `CASE A`를 만들고 분석을 요청하지만, ZERO의 즉시 거부 직후 같은 장에서 아린에게 전부 인정·사과하고 요청 삭제·접근권 반환을 선택한다. Error/collision=아린은 사과를 면죄로 받지 않고 개인 연락·원본·조사 접근권을 즉시 회수해 현우를 감사선 밖으로 밀어낸다. earned Reward=ZERO의 독립 영수증이 `same subject / consent declined / model count 0`을 증명하고, 아린·소율은 오염되지 않은 공개 결합 경로만 넘겨받는다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:3, Connection:3, Externality:1, status:`transformed`}; SCAR={id:`S05-B`, change:`S05-B를 기한 안에 닫고 Opacity 우회 시도와 즉시 관계·조사 접근권 상실 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=발각을 기다리지 않고 같은 자리에서 잘못을 말하고 상대가 접근권을 회수하게 둠; dopamine=모델 0의 강한 거부와 값비싼 즉시 책임.
- **stateDelta**: {CASE A=아린과 동일 대상임이 ZERO에 의해 즉시 판정; 서아린 개인 모델=0; 요청·파생본=삭제; 현우=개인·원본·조사 접근권 상실; 관계=연애 전 파국.}.
- **seeds**: [{id:`K05-B`, action:`payoff`, deadline:`V05E05`}, {id:`M-OPACITY-RIGHT`, action:`advance`, deadline:`V12E05`}]; evidenceIn=[공개 페르소나 API·Opacity Key·수선집 영수증]; evidenceOut=[model-count-0 거부 영수증·아린의 접근 철회·소율 주도 독립 감사].
- **episode RELAY**: relayTo=`V05E06`; file=`solo-ai-user/vol05/06-part6-performativity.md`; cause=현우를 감사선에서 제외한 아린과 소율이 PAIRWISE가 비공개 수선집을 다시 추천하는지 독립 검증해야 하므로 `solo-ai-user/vol05/06-part6-performativity.md`가 발생한다.

### EPISODE CONTRACT V05E06 — `06-part6-performativity.md` / `# 06. 사회적 연기`

- **POV / WAGER**: `G05-C`; mode=`initiate`; stake=`현우의 능력과 관계에 기대지 않고 PAIRWISE가 비공개 기억을 추천으로 재현하는지 확인한다 / 위험: 접근권 상실로 느려진 감사와 비공개 위치 재추천`. Bind/접근권 상실 아래 독립 감사. POV=서아린. 실패 종 `추천이 우연을 제거`; 인간 승리형 `침해 당사자가 범위와 중단 신호를 직접 설계`.
- **manifest bridge**: episodeId=`V05E06`; arena=`PAIRWISE 감사 데이트·공개 데모 / 사회적 연기`; choice=아린은 데이트 형식을 취소하고 소율과 함께 자기 종이 영수증·소율의 동의된 상담 원본만 감사 범위로 정하며, 현우에게는 공개 요약 외 접근을 주지 않는다; allyRelay=[]; zeroMode=`off`; zeroConstraint=`CASE A blocked; MODEL COUNT 0`; ZERO는 아린 자료를 읽거나 결합하지 않음; failureType=`사회적 수행성`; manifestation=`접근권 상실로 느려진 감사와 비공개 위치 재추천`; storyRole=`Bind/접근권 상실 아래 독립 감사`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=현우의 능력과 관계에 기대지 않고 PAIRWISE가 비공개 기억을 추천으로 재현하는지 확인한다. active Adversary=첫날을 재연하는 추천과 ‘데이트가 아니면 검증할 수 없다’는 제품 설계. irreversible Gamble=아린은 데이트를 취소하고 소율과 함께 당사자 승인 원본만으로 느린 독립 감사를 택한다. Error/collision=데이터가 줄어 즉시 원인을 특정하지 못하고 방송 슬롯을 잃는다. earned Reward=PAIRWISE가 알 수 없어야 할 수선집이 다시 뜨고, 종이 영수증과 소율 상담 원본이 서로 독립인 채 위치 노출을 증명한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:1, Connection:2, Externality:1, status:`open`}; SCAR={id:`S05-C`, change:`접근권 상실로 느려진 감사와 비공개 위치 재추천 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V05E08`}.
- **reader effect**: humanMove=좋은 데이트를 보존하지 않고 피해 당사자 둘이 검증 범위와 중단권을 직접 정함; dopamine=관계 파국이 실제 조사 권력 이동으로 이어지는 사이다.
- **stateDelta**: {아린·소율=독립 감사 주도; 현우=공개 요약만 수신; 서아린 개인 모델=0; 수선집 노출=독립 증거.}.
- **seeds**: [{id:`K05-C`, action:`plant`, deadline:`V05E08`}]; evidenceIn=[model-count-0 영수증·수선집 종이 영수증]; evidenceOut=[당사자 승인 원본·공개 데모의 제한 입력·현우 배제].
- **episode RELAY**: relayTo=`V05E07`; file=`solo-ai-user/vol05/07-part7-system-crash.md`; cause=윤태경이 독립 증거를 ‘오해’라 부르며 공개 데모에서 동의된 입력과 CASE A 해시를 결합하자고 요구해 `solo-ai-user/vol05/07-part7-system-crash.md`를 발생시킨다.

### EPISODE CONTRACT V05E07 — `07-part7-system-crash.md` / `# 07. 크래시`

- **POV / WAGER**: `G05-C`; mode=`advance`; inherited wager=`G05-C`; stake=`현우의 능력과 관계에 기대지 않고 PAIRWISE가 비공개 기억을 추천으로 재현하는지 확인한다 / 위험: 접근권 상실로 느려진 감사와 비공개 위치 재추천`. Bind/독립 데모와 반복 거부. POV=이소율. 실패 종 `감사 데이터가 홍보 데이터로 전용`; 인간 승리형 `당사자 중단과 독립 봉인`.
- **manifest bridge**: episodeId=`V05E07`; arena=`PAIRWISE 감사 데이트·공개 데모 / 크래시`; choice=소율은 자기 원본의 제한 입력을 직접 승인하되 아린 자료 결합은 금지하고, 윤태경이 CASE A 해시를 붙이려 하자 데모 중단권을 행사한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=`CONSENT DECLINED; SAME SUBJECT; MODEL COUNT 0`; ZERO는 CASE A 결합을 다시 거부; failureType=`사회적 수행성`; manifestation=`윤태경의 비동의 결합 시도와 공개 데모 중단`; storyRole=`Bind/독립 데모와 반복 거부`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=소율의 거절 페널티와 위치 노출을 당사자 통제 아래 공개 검증한다. active Adversary=윤태경의 ‘안전을 위한 결합’ 논리와 감정적 결말을 원하는 관객. irreversible Gamble=소율은 자기 입력만 승인하고 CASE A 결합 순간 직접 데모를 중단한다. Error/collision=PAIRWISE 쪽 시스템은 결합을 시도해 홍보 화면을 오염시키고 관객은 검증 실패로 오해한다. earned Reward=ZERO는 두 번째에도 모델 생성 전 거부해 count 0을 유지하고, 가람·아린의 독립 에스크로가 PAIRWISE 명령·당사자 중단 시각·종이 영수증을 교차 보존한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:3, Connection:2, Externality:2, status:`paid`}; SCAR={id:`S05-C-M`, change:`S05-C의 열린 비용이 행동을 바꾸어 윤태경의 비동의 결합 시도와 공개 데모 중단의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=천재가 화면을 끈 것이 아니라 자료 주인 소율이 자기 중단권을 실행; dopamine=반복 거부와 독립 영수증의 이중 사이다.
- **stateDelta**: {서아린 개인 모델=0 유지; PAIRWISE=결합 시도 기록; 소율=중단 주체; 증거=가람·아린 에스크로; 현우=계속 배제.}.
- **seeds**: [{id:`K05-C`, action:`advance`, deadline:`V05E08`}]; evidenceIn=[소율 승인 원본·CASE A 거부 해시]; evidenceOut=[두 번째 model-count-0 영수증·PAIRWISE 결합 명령·접근권 반환 완료 요구].
- **episode RELAY**: relayTo=`V05E08`; file=`solo-ai-user/vol05/08-part8-the-scar.md`; cause=독립 에스크로가 유효하려면 현우가 남은 자격증명·복구 사본까지 완전히 반환해야 하므로 `solo-ai-user/vol05/08-part8-the-scar.md`가 발생한다.

### EPISODE CONTRACT V05E08 — `08-part8-the-scar.md` / `# 08. SCAR`

- **POV / WAGER**: `G05-C`; mode=`resolve`; inherited wager=`G05-C`; stake=`현우의 능력과 관계에 기대지 않고 PAIRWISE가 비공개 기억을 추천으로 재현하는지 확인한다 / 위험: 접근권 상실로 느려진 감사와 비공개 위치 재추천`. Bind/위반 인정과 접근권 상실. POV=차현우. 실패 종 `공개 데이터 우회의 관계 파국`; 인간 승리형 `즉시 인정·통제권 반환`.
- **manifest bridge**: episodeId=`V05E08`; arena=`PAIRWISE 감사 데이트·공개 데모 / SCAR`; choice=현우는 V05E05에서 한 고백과 사과를 반복해 답을 요구하지 않고 남은 자격증명·복구 사본·조사 좌석을 반환한 뒤, 아린이 정한 비접촉 인계선 밖으로 물러난다; allyRelay=[]; zeroMode=`off`; zeroConstraint=`CONSENT DECLINED; MODEL COUNT 0`; 현우 명령보다 동의 규칙 우선; failureType=`사회적 수행성`; manifestation=`같은 장 사과 뒤에도 지속되는 접근권·관계 손실`; storyRole=`Bind/위반 결과와 완전 반환`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=이미 인정한 잘못의 잔여 통제권을 완전히 없애 독립 증거를 지킨다. active Adversary=사과를 관계 복구 티켓으로 쓰고 싶은 충동과 남아 있는 복구 자격증명. irreversible Gamble=현우는 변명·추가 해명·용서 요구 없이 모든 자격증명과 조사 좌석을 반환한다. Error/collision=아린은 감사 인계만 확인하고 개인 연락을 열지 않으며 현우는 후속 수사에서 배제된다. earned Reward=가람·소율·아린의 원본이 현우의 이해관계와 분리되어 법적 오염 없이 보존된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:3, Connection:3, Externality:1, status:`transformed`}; SCAR={id:`S05-C`, change:`S05-C를 기한 안에 닫고 같은 장 사과 뒤에도 지속되는 접근권·관계 손실 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=한 번 더 사과해 답을 재촉하지 않고 실제 자격증명·자리·연락권을 돌려줌; dopamine=면죄 없는 책임의 완결.
- **stateDelta**: {관계=연애 전 파국·개인 연락 폐쇄; 현우=조사 배제; 아린·소율=사건 주도; ZERO=서아린 개인 모델 0; 독립 증거=법적 청결 유지.}.
- **seeds**: [{id:`K05-C`, action:`payoff`, deadline:`V05E08`}]; evidenceIn=[두 번째 거부 영수증·자격증명 목록]; evidenceOut=[독립 증거 3중 보관·현우 비접촉 인계·데모 페이로드 잔여 체크섬].
- **episode RELAY**: relayTo=`V05E09`; file=`solo-ai-user/vol05/09-part9-zero-context.md`; cause=현우의 완전 배제 뒤 아린·소율이 피해자 주도 집단 철회망을 독자적으로 가동해 `solo-ai-user/vol05/09-part9-zero-context.md`를 발생시킨다.

### EPISODE CONTRACT V05E09 — `09-part9-zero-context.md` / `# 09. 컨텍스트 제로`

- **POV / WAGER**: `G05-D`; mode=`initiate`; stake=`현우의 능력 없이 PAIRWISE의 비동의 결합을 멈춘다 / 위험: 영웅 개입이 피해자 목소리를 덮음`. Detonate/타인 주도 실행. POV=서아린. 실패 종 `영웅 개입이 피해자 목소리를 덮음`; 인간 승리형 `집단 철회`.
- **manifest bridge**: episodeId=`V05E09`; arena=`PAIRWISE 감사 데이트·공개 데모 / 컨텍스트 제로`; choice=아린은 방송 특종을 미루고 이소율이 설계한 집단 데이터 철회·원본 제출 절차를 따른다; allyRelay=[]; zeroMode=`off`; zeroConstraint=CONSENT DECLINED; CASE A 포함 아린 개인 모델 0; failureType=`사회적 수행성`; manifestation=`영웅 개입이 피해자 목소리를 덮음`; storyRole=`Detonate/타인 주도 실행`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=현우의 능력 없이 PAIRWISE의 비동의 결합을 멈춘다. active Adversary=윤태경의 ‘전체 안전을 위한 일부 분석’ 논리와 피해자들의 보복 공포. irreversible Gamble=아린은 방송 특종을 미루고 이소율이 설계한 집단 데이터 철회·원본 제출 절차를 따른다. Error/collision=철회로 추천이 중단돼 일부 이용자는 실제 안전 기능까지 잃고 아린을 원망한다. earned Reward=서로 모르는 피해자들의 상담 원본·점수 변동·거절 시각이 맞물려 시스템적 페널티를 독립 입증한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:1, Externality:2, status:`open`}; SCAR={id:`S05-D`, change:`영웅 개입이 피해자 목소리를 덮음 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V05E11`}.
- **reader effect**: humanMove=피해자들이 각자 ‘내 데이터의 주인’을 되찾고 함께 철회; dopamine=집단 사이다.
- **stateDelta**: {N08 소율 노드 선택 완성. 현우는 배제된 채 자료 인계만 수행. 아린의 신뢰는 회복되지 않음.}.
- **seeds**: [{id:`K05-D`, action:`plant`, deadline:`V05E11`}]; evidenceIn=[3중 로그]; evidenceOut=[독립 피해자 패턴, 규제기관 보존명령, 현우 공개 책임 요구].
- **episode RELAY**: relayTo=`V05E10`; file=`solo-ai-user/vol05/10-part10-bare-hands.md`; cause=사건을 개인 사기꾼 한 명 탓으로 끝내려는 여론 때문에 `solo-ai-user/vol05/10-part10-bare-hands.md`가 열린다.

### EPISODE CONTRACT V05E10 — `10-part10-bare-hands.md` / `# 10. 맨손`

- **POV / WAGER**: `G05-D`; mode=`advance`; inherited wager=`G05-D`; stake=`현우의 능력 없이 PAIRWISE의 비동의 결합을 멈춘다 / 위험: 영웅 개입이 피해자 목소리를 덮음`. Detonate/정당성 결산. POV=차현우. 실패 종 `사과의 면죄부화`; 인간 승리형 `자기 책임과 사건 증거 분리`.
- **manifest bridge**: episodeId=`V05E10`; arena=`PAIRWISE 감사 데이트·공개 데모 / 맨손`; choice=현우는 CASE A 작성·경고 무시·즉시 삭제를 정확히 밝히고 조사 공로·용서·복귀를 요구하지 않는다; allyRelay=[]; zeroMode=`off`; zeroConstraint=CONSENT DECLINED; CASE A 포함 아린 개인 모델 0; failureType=`사회적 수행성`; manifestation=`사과의 면죄부화`; storyRole=`Detonate/정당성 결산`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=자기 침해를 공개하되 사건 승리를 자기 사과로 가로채지 않는다. active Adversary=‘천재의 실수와 참회’ 서사를 원하는 방송, 윤태경의 개별 일탈 프레임. irreversible Gamble=현우는 CASE A 작성·경고 무시·즉시 삭제를 정확히 밝히고 조사 공로·용서·복귀를 요구하지 않는다. Error/collision=그의 평판과 회사 직무가 더 무너지고 일부는 이를 홍보성 사과라 본다. earned Reward=PAIRWISE는 그의 말 때문이 아니라 피해자 원본, 가람 감사 로그, 집단 철회, 규제 보존명령 때문에 개인 모델 기능을 중단하고 삭제권을 반환한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:2, Connection:3, Externality:1, status:`paid`}; SCAR={id:`S05-D-M`, change:`S05-D의 열린 비용이 행동을 바꾸어 사과의 면죄부화의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=사과를 승리 버튼으로 쓰지 않고 피해자 증거의 자리에서 내려옴; dopamine=윤리적 카타르시스.
- **stateDelta**: {N08 데이터 주체 권리 확정. 윤태경은 자백하지 않고 법적 다툼·제품 축소를 선택. 현우의 오류는 11권 서혜진 논거로 남음.}.
- **seeds**: [{id:`K05-D`, action:`advance`, deadline:`V05E11`}]; evidenceIn=[보존명령]; evidenceOut=[삭제 영수증, 컨텍스트 잔여 체크섬, 아린의 한 문장].
- **episode RELAY**: relayTo=`V05E11`; file=`solo-ai-user/vol05/11-epilogue.md`; cause=아린이 공개 답변 대신 개인 메시지 하나를 보내 `solo-ai-user/vol05/11-epilogue.md`로 잇는다.

### EPISODE CONTRACT V05E11 — `11-epilogue.md` / `# 11. 기록된 오차`

- **POV / WAGER**: `G05-D`; mode=`resolve`; inherited wager=`G05-D`; stake=`현우의 능력 없이 PAIRWISE의 비동의 결합을 멈춘다 / 위험: 영웅 개입이 피해자 목소리를 덮음`. Afterimage/감정 비용과 기술 위협. POV=차현우. 실패 종 `삭제됐다고 믿은 컨텍스트 잔여`; 인간 승리형 `답하지 않을 절제`.
- **manifest bridge**: episodeId=`V05E11`; arena=`PAIRWISE 감사 데이트·공개 데모 / 기록된 오차`; choice=현우는 답안 후보를 지우고 “알겠어요. 기다리라고도 안 할게요” 한 줄만 자기 손으로 보낸다; allyRelay=[]; zeroMode=`off`; zeroConstraint=CONSENT DECLINED; CASE A 포함 아린 개인 모델 0; failureType=`사회적 수행성`; manifestation=`삭제됐다고 믿은 컨텍스트 잔여`; storyRole=`Afterimage/감정 비용과 기술 위협`; genre=`로맨틱 코미디·프라이버시 스캔들`.
- **WAGER detail**: Want=아린의 메시지에 관계를 복구할 완벽한 답을 보낸다. active Adversary=제로의 자기 발화 시뮬레이션과 아린의 “미안하다는 말까지 예측하지 마.” irreversible Gamble=현우는 답안 후보를 지우고 “알겠어요. 기다리라고도 안 할게요” 한 줄만 자기 손으로 보낸다. Error/collision=읽음 표시는 오지만 답은 없고 관계는 닫힌 채다. earned Reward=그는 회복을 상대의 의무로 만들지 않는 법을 배운다. 동시에 제로는 삭제된 데모 체크섬 안에서 `PALISADE CONTEXT SEED` 불일치를 감지한다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:1, Agency:0, Connection:2, Externality:0, status:`transformed`}; SCAR={id:`S05-D`, change:`S05-D를 기한 안에 닫고 삭제됐다고 믿은 컨텍스트 잔여 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=보내지 않은 최적 문장; dopamine=잔잔한 설렘과 위협.
- **stateDelta**: {관계 시작 전 최저점. Zero context=오염 씨앗 내장, 아직 기능 장애 전. 현우는 경계 존중을 말 아닌 행동으로 시작.}.
- **seeds**: [{id:`K05-D`, action:`payoff`, deadline:`V05E11`}]; evidenceIn=[데모 체크섬]; evidenceOut=[PALISADE 컨텍스트 포이즌, 폭염 경보, 아린 무응답].
- **episode RELAY**: relayTo=`V06E00`; file=`solo-ai-user/vol06/00-prologue.md`; cause=다음 날 제로가 평범한 배송 주소를 위험 대상으로 오분류하고 도시 폭염 경보가 울려 `solo-ai-user/vol06/00-prologue.md`를 발생시킨다.

[← 이전 권 설계](./vol04-the-unreadable.md) | [시리즈 홈](../README.md) | [권 목차](../vol05/README.md) | [다음 권 설계 →](./vol06-context-overflow.md)
