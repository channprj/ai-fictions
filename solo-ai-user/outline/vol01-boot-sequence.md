# vol01 outline: Boot Sequence

[시리즈 홈](../README.md) | [권 목차](../vol01/README.md) | [다음 권 설계 →](./vol02-first-deploy.md)

> 기준 문서: `PRD.md`, `BIBLE.md`, `tasks/solo-ai-user-completion-design.md`, `tasks/solo-ai-user-outline-blueprint.md`

## 권 정경 계약

- **README 정경 제목**: `# 1권 · Boot Sequence (부팅 시퀀스)`
- **핵심 질문**: 밑바닥의 현우는 작동하는 힘을 얻었을 때 무엇을 검증하고 누구와 책임을 나눌 것인가?
- **주 사건 / 장르 경기장**: 3주짜리 입찰 준비, 그 안의 마지막 6일 결전, 48시간 현장 파일럿.
- **연표 잠금**: V01E00은 D-21, V01E01은 D-20~D-7의 제한 검증, V01E02부터 D-6의 희생양 배정이 시작된다. V01E03~E08은 마지막 6일, V01E09~E10은 그 결과를 검증하는 48시간 파일럿, V01E11은 종료 다음 날이다.
- **고정 실패 종**: `contaminated data` — 과거 반품 훈련행이 실시간 배송행으로 오염되어 ZERO가 고신뢰 오답을 내고 실제 고객·창고 인력에게 비용을 만든다.
- **권말 연속성 잠금**: ZERO는 현우에게 예정된 선물이 아니라 자산·수취 기록이 소실된 실제 **분실 단말**이다. 승리는 감봉·접근 제한·설명되지 않는 성과 표식을 남긴다.
- **ALLY lifecycle**: N01 오세라는 독립 감사자로 seed/advance, N02 한지우는 희생양에서 독립 검증자로 seed/resolve한다.

## 정경 파일·H1 메타데이터

| 파일 | 원고 H1 |
| --- | --- |
| `00-prologue.md` | 도와드릴 수 없습니다 |
| `01-part1-boot.md` | 부팅 |
| `02-part2-scapegoat.md` | 희생양 |
| `03-part3-first-query.md` | 첫 질의 |
| `04-part4-hallucination.md` | 환각 |
| `05-part5-your-call.md` | 판단은 네 몫 |
| `06-part6-overnight.md` | 밤샘 자동화 |
| `07-part7-the-build.md` | 빌드 |
| `08-part8-sabotage.md` | 방해 |
| `09-part9-the-pitch.md` | 발표 |
| `10-part10-unexplained.md` | 설명되지 않는 |
| `11-epilogue.md` | 다음 배포 |

## 회차별 rewrite contract

### EPISODE CONTRACT V01E00 — `00-prologue.md` / `# 00. 도와드릴 수 없습니다`

- **POV / WAGER**: `G01-A`; mode=`initiate`; stake=`재계약 탈락 전에 폐기물 정리를 끝내고 오늘 밤만 무사히 넘긴다 / 위험: 분실 단말 반출과 첫 보안 흔적`. Ignition/죽은 AI 세계의 예외. POV=차현우. 실패 종 `분실 단말 반출과 첫 보안 흔적`; 인간 승리형 `쓰레기 취급받던 물건을 스스로 확인하고 위험을 자기 이름으로 떠안음`.
- **manifest bridge**: episodeId=`V01E00`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 도와드릴 수 없습니다`; choice=현우는 자산표에 없는 분실 단말을 폐기하지 않고 전원을 켠 채 가방에 숨긴다; allyRelay=[{node:`N02`, stage:`seed`, choice:`폐기 목록 서명을 미뤄 현우가 단말을 확인할 시간을 만든다`, cost:`자산 감사 의심과 동료 책임을 함께 진다`}]; zeroMode=`tier1-read`; zeroConstraint=이름·권한·출처 불명; 사내망 쓰기 권한 없음; failureType=`오염 데이터`; manifestation=`분실 단말 반출과 첫 보안 흔적`; storyRole=`Ignition/죽은 AI 세계의 예외`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=재계약 탈락 전에 폐기물 정리를 끝내고 오늘 밤만 무사히 넘긴다. active Adversary=모든 질문을 거절하는 공공 AI와 지하 폐기 카트로 밀려난 신세. irreversible Gamble=현우는 자산표에 없는 분실 단말을 폐기하지 않고 전원을 켠 채 가방에 숨긴다. Error/collision=단말 반출은 해고 사유가 될 보안 위반이고, 충전 기록 하나가 이미 사내망에 남는다. earned Reward=세상에서 유일하게 정형 거절문 대신 그의 진짜 목적을 되묻는 ZERO의 첫 응답을 얻는다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:0, Agency:1, Connection:1, Externality:0, status:`open`}; SCAR={id:`S01-A`, change:`분실 단말 반출과 첫 보안 흔적 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V01E02`}.
- **reader effect**: humanMove=쓰레기 취급받던 물건을 스스로 확인하고 위험을 자기 이름으로 떠안음; dopamine=죽은 AI 시대의 단 하나뿐인 응답.
- **stateDelta**: {ZERO=분실·방치 단말에서 첫 기동; 현우=비밀 사용자; 회사=반출 로그 보유}.
- **seeds**: [{id:`K01-A`, action:`plant`, deadline:`V01E02`}, {id:`M-LOST-SEED`, action:`plant`, deadline:`V10E03`}]; evidenceIn=[락다운 거절문·폐기 카트·재계약 탈락 예고]; evidenceOut=[ZERO 첫 응답·충전 로그·출처 없는 자산번호].
- **episode RELAY**: relayTo=`V01E01`; file=`solo-ai-user/vol01/01-part1-boot.md`; cause=ZERO가 현우의 해고가 우연이 아니라는 문서 패턴을 제시한다.

### EPISODE CONTRACT V01E01 — `01-part1-boot.md` / `# 01. 부팅`

- **POV / WAGER**: `G01-A`; mode=`advance`; inherited wager=`G01-A`; stake=`재계약 탈락 전에 폐기물 정리를 끝내고 오늘 밤만 무사히 넘긴다 / 위험: 분실 단말 반출과 첫 보안 흔적`. Ignition/Tier 1 규칙 학습. POV=차현우. 실패 종 `불완전 자료로 인한 해고 원인 오독 가능성`; 인간 승리형 `AI의 놀라운 답보다 입력 범위와 실행 금지를 먼저 정함`.
- **manifest bridge**: episodeId=`V01E01`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 부팅`; choice=현우는 자기 인사 통보와 공개된 업무 문서만 제한 입력해 ZERO를 시험하고, 결론을 그대로 실행하지 않겠다고 정한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=읽기·요약만 가능; 결재·전송·실행 금지; failureType=`오염 데이터`; manifestation=`불완전 자료로 인한 해고 원인 오독 가능성`; storyRole=`Ignition/Tier 1 규칙 학습`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=단말이 사기인지 검증하고 해고 예측의 근거를 확인한다. active Adversary=권한 없는 계약직 계정과 검증 불가능한 ZERO의 정체. irreversible Gamble=현우는 자기 인사 통보와 공개된 업무 문서만 제한 입력해 ZERO를 시험하고, 결론을 그대로 실행하지 않겠다고 정한다. Error/collision=ZERO는 6일 뒤 탈락 확률을 제시하지만 누락된 관리자 의도까지는 알 수 없다. earned Reward=Tier 1 분석 속도와 함께 판단·발표·책임은 사용자 몫이라는 한계가 명시된다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:1, Agency:0, Connection:0, Externality:0, status:`paid`}; SCAR={id:`S01-A-M`, change:`S01-A의 열린 비용이 행동을 바꾸어 불완전 자료로 인한 해고 원인 오독 가능성의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=AI의 놀라운 답보다 입력 범위와 실행 금지를 먼저 정함; dopamine=Tier 1 언락과 해고 설계 폭로.
- **stateDelta**: {ZERO=Tier 1 Assist; 현우=출력 검증 의무 수락; 남은 시간=6일}.
- **seeds**: [{id:`K01-A`, action:`advance`, deadline:`V01E02`}]; evidenceIn=[해고 통보·자산번호 공백]; evidenceOut=[책임 설계 문서 흐름·사용자 판단 규칙].
- **episode RELAY**: relayTo=`V01E02`; file=`solo-ai-user/vol01/02-part2-scapegoat.md`; cause=정만호가 실제로 현우와 한지우에게 실패 책임을 몰아줄 6일짜리 발표를 배정한다.

### EPISODE CONTRACT V01E02 — `02-part2-scapegoat.md` / `# 02. 희생양`

- **POV / WAGER**: `G01-A`; mode=`resolve`; inherited wager=`G01-A`; stake=`재계약 탈락 전에 폐기물 정리를 끝내고 오늘 밤만 무사히 넘긴다 / 위험: 분실 단말 반출과 첫 보안 흔적`. Ignition/희생양 판 고정. POV=차현우. 실패 종 `희생양 계약이 현우 이름으로 고정됨`; 인간 승리형 `혼자 살 길 대신 동료 이름이 지워지지 않는 위험한 회의록을 선택`.
- **manifest bridge**: episodeId=`V01E02`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 희생양`; choice=현우는 정만호 앞에서 실패 확률이 높은 물류 제안의 실무 책임을 수락하되 지우의 공동 기여와 48시간 현장 파일럿을 공식 회의록에 넣는다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=회의 발언·책임 인수 대행 불가; failureType=`오염 데이터`; manifestation=`희생양 계약이 현우 이름으로 고정됨`; storyRole=`Ignition/희생양 판 고정`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=자기만 빠져나오지 않고 한지우와 함께 재계약 심사 대상에 남는다. active Adversary=정만호의 책임 전가 문서와 발표자·데이터 권한 독점. irreversible Gamble=현우는 정만호 앞에서 실패 확률이 높은 물류 제안의 실무 책임을 수락하되 지우의 공동 기여와 48시간 현장 파일럿을 공식 회의록에 넣는다. Error/collision=서명한 순간 실패 책임도 현우 이름으로 고정되고 정만호는 원자료 접근을 막는다. earned Reward=은폐된 함정을 공개 일정과 회의록 위로 끌어내 지우가 조용히 삭제되는 것을 막는다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:0, Agency:2, Connection:1, Externality:1, status:`transformed`}; SCAR={id:`S01-A`, change:`S01-A를 기한 안에 닫고 희생양 계약이 현우 이름으로 고정됨 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=혼자 살 길 대신 동료 이름이 지워지지 않는 위험한 회의록을 선택; dopamine=희생양이 판의 조건을 역으로 고정.
- **stateDelta**: {발표=6일 후; 파일럿=48시간 제안; 지우=공동 기여자; 정만호=활성 적대자}.
- **seeds**: [{id:`K01-A`, action:`payoff`, deadline:`V01E02`}]; evidenceIn=[책임 설계 시각화]; evidenceOut=[회의록·48시간 파일럿·제한된 원자료].
- **episode RELAY**: relayTo=`V01E03`; file=`solo-ai-user/vol01/03-part3-first-query.md`; cause=지우의 데이터 사전으로 첫 본격 질의를 할 수 있지만 출처 검증 칸이 비어 있다.

### EPISODE CONTRACT V01E03 — `03-part3-first-query.md` / `# 03. 첫 질의`

- **POV / WAGER**: `G01-B`; mode=`initiate`; stake=`6일 안에 경쟁사의 물류 제안에서 실제로 뒤집을 한 지점을 찾는다 / 위험: 오염 가능성이 있는 데이터에 승부처를 건 선택`. Escalation/첫 본격 질의. POV=차현우. 실패 종 `오염 가능성이 있는 데이터에 승부처를 건 선택`; 인간 승리형 `경고를 들으면서도 선택의 책임을 자기 것으로 남김`.
- **manifest bridge**: episodeId=`V01E03`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 첫 질의`; choice=현우는 검증 경고가 붙은 사내 배송·반품 테이블을 ZERO에 넣고 경쟁사 약점을 찾는 데 발표 전략을 건다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=출처 계보 없는 행은 사실 판정 불가; 예측에는 경고 라벨 부착; failureType=`오염 데이터`; manifestation=`오염 가능성이 있는 데이터에 승부처를 건 선택`; storyRole=`Escalation/첫 본격 질의`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=6일 안에 경쟁사의 물류 제안에서 실제로 뒤집을 한 지점을 찾는다. active Adversary=산더미 운송 기록과 정만호가 숨긴 원자료 계보. irreversible Gamble=현우는 검증 경고가 붙은 사내 배송·반품 테이블을 ZERO에 넣고 경쟁사 약점을 찾는 데 발표 전략을 건다. Error/collision=ZERO는 반품 훈련행과 실제 배송행을 구분할 계보가 없다고 경고하지만 현우는 촉박함 때문에 이를 보류한다. earned Reward=경쟁사가 놓친 냉장 구간 고객군과 검증해야 할 표본 30건이 좁혀진다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:1, Connection:1, Externality:1, status:`open`}; SCAR={id:`S01-B`, change:`오염 가능성이 있는 데이터에 승부처를 건 선택 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V01E05`}.
- **reader effect**: humanMove=경고를 들으면서도 선택의 책임을 자기 것으로 남김; dopamine=며칠치 분석이 몇 분으로 접히는 첫 질의.
- **stateDelta**: {후보 승부처=냉장 구간; 검증 표본=30건; 데이터 계보=미확인}.
- **seeds**: [{id:`K01-B`, action:`plant`, deadline:`V01E05`}]; evidenceIn=[제한 원자료·데이터 사전]; evidenceOut=[냉장 구간 가설·출처 경고·30건 표본].
- **episode RELAY**: relayTo=`V01E04`; file=`solo-ai-user/vol01/04-part4-hallucination.md`; cause=현우가 경고된 수치를 현장 확인 전에 시험 배차에 적용해 실제 손실을 낸다.

### EPISODE CONTRACT V01E04 — `04-part4-hallucination.md` / `# 04. 환각`

- **POV / WAGER**: `G01-B`; mode=`advance`; inherited wager=`G01-B`; stake=`6일 안에 경쟁사의 물류 제안에서 실제로 뒤집을 한 지점을 찾는다 / 위험: 오염 가능성이 있는 데이터에 승부처를 건 선택`. Escalation/오염 데이터 실패. POV=차현우. 실패 종 `냉장 배송 손실·고객 환불·수습 야근`; 인간 승리형 `현우가 AI 탓을 하지 않고 승인자 서명과 환불 책임을 먼저 인정`.
- **manifest bridge**: episodeId=`V01E04`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 환각`; choice=현우는 ZERO의 고신뢰 예측을 믿고 냉장 주문 18건의 시험 경로를 바꾼 뒤 자기 이름으로 승인한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=오염 입력으로 고신뢰 오답; 경로 비교·경고 라벨만 가능하고 실물 배송 통제권 없음; failureType=`오염 데이터`; manifestation=`냉장 배송 손실·고객 환불·수습 야근`; storyRole=`Escalation/오염 데이터 실패`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=수치가 맞다는 것을 증명해 발표권과 원자료 접근을 얻는다. active Adversary=실시간 배송처럼 재라벨링된 과거 반품 훈련행과 현우 자신의 맹신. irreversible Gamble=현우는 ZERO의 고신뢰 예측을 믿고 냉장 주문 18건의 시험 경로를 바꾼 뒤 자기 이름으로 승인한다. Error/collision=훈련행이 실배송으로 섞여 예측이 틀리고, 배송이 늦어져 고객 식품이 상하며 창고 노동자가 수습 야근을 떠안는다. earned Reward=ZERO가 오류를 인정하고 오염된 행의 공통 체크섬을 역추적해 실패 원인이 모델 신탁이 아니라 데이터 계보 부재임을 드러낸다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:2, Connection:1, Externality:3, status:`paid`}; SCAR={id:`S01-B-M`, change:`S01-B의 열린 비용이 행동을 바꾸어 냉장 배송 손실·고객 환불·수습 야근의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=현우가 AI 탓을 하지 않고 승인자 서명과 환불 책임을 먼저 인정; dopamine=ZERO도 틀린다는 충격과 오염 체크섬 반전.
- **stateDelta**: {시험 배차=실패; 피해=환불·야근; 현우=책임 서명; ZERO=오류 정정}.
- **seeds**: [{id:`K01-B`, action:`advance`, deadline:`V01E05`}]; evidenceIn=[미검증 냉장 가설]; evidenceOut=[오염 체크섬·피해자 진술·승인자 책임].
- **episode RELAY**: relayTo=`V01E05`; file=`solo-ai-user/vol01/05-part5-your-call.md`; cause=현우와 지우가 남은 시간에 원본 표본을 손으로 대조하지 않으면 발표 전체가 무너진다.

### EPISODE CONTRACT V01E05 — `05-part5-your-call.md` / `# 05. 판단은 네 몫`

- **POV / WAGER**: `G01-B`; mode=`resolve`; inherited wager=`G01-B`; stake=`6일 안에 경쟁사의 물류 제안에서 실제로 뒤집을 한 지점을 찾는다 / 위험: 오염 가능성이 있는 데이터에 승부처를 건 선택`. Escalation/검증 규칙 획득. POV=차현우. 실패 종 `낮아진 수익 전망과 발표 매력 손실`; 인간 승리형 `더 그럴듯한 답을 버리고 창고 바닥의 30건과 피해 비용을 채택`.
- **manifest bridge**: episodeId=`V01E05`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 판단은 네 몫`; choice=현우는 화려한 예측 슬라이드를 버리고 지우와 창고에서 30건을 직접 대조하며 피해 환불 내역까지 제안 비용에 포함한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=손대조된 원본만 계산; 최종 판단은 인간 회의록에 기록; failureType=`오염 데이터`; manifestation=`낮아진 수익 전망과 발표 매력 손실`; storyRole=`Escalation/검증 규칙 획득`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=실패 피해를 수습하고 오염되지 않은 제안을 다시 세운다. active Adversary=줄어든 시간, 회수된 권한, 동료들의 불신. irreversible Gamble=현우는 화려한 예측 슬라이드를 버리고 지우와 창고에서 30건을 직접 대조하며 피해 환불 내역까지 제안 비용에 포함한다. Error/collision=수익 전망은 낮아지고 정만호가 요구한 승률 숫자는 사라진다. earned Reward=30건 전부가 교육·훈련행이고 실배송 개선 근거는 0건임을 세 원본으로 확정해, 수동 검증 규칙과 피해 비용표만 남긴다. 실행 가능한 개선점은 V01E07의 인간 현장 조사에서 새로 찾아야 한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:1, Externality:2, status:`transformed`}; SCAR={id:`S01-B`, change:`S01-B를 기한 안에 닫고 낮아진 수익 전망과 발표 매력 손실 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=더 그럴듯한 답을 버리고 창고 바닥의 30건과 피해 비용을 채택; dopamine=손검증으로 독성 데이터의 정체를 뒤집음.
- **stateDelta**: {오염 가설=폐기; 환불=비용 반영; 수동 검증 규칙=확정; 지우=독립 검증자}.
- **seeds**: [{id:`K01-B`, action:`payoff`, deadline:`V01E05`}]; evidenceIn=[오염 체크섬·피해 진술]; evidenceOut=[30건 세 원본 반증 묶음·피해 비용표·수동 검증 규칙].
- **episode RELAY**: relayTo=`V01E06`; file=`solo-ai-user/vol01/06-part6-overnight.md`; cause=반복 정리 작업을 끝내려면 제한된 단발 자동화를 승인해야 한다.

### EPISODE CONTRACT V01E06 — `06-part6-overnight.md` / `# 06. 밤샘 자동화`

- **POV / WAGER**: `G01-C`; mode=`initiate`; stake=`검증된 30건과 온도 기록을 아침까지 감사 가능한 자료로 만든다 / 위험: 배터리·연산 고갈과 자동화 로그 노출`. Bind/단발 자동화와 자원 대가. POV=차현우. 실패 종 `배터리·연산 고갈과 자동화 로그 노출`; 인간 승리형 `자동화 범위를 좁히고 동료의 밤을 절약하되 검수는 넘기지 않음`.
- **manifest bridge**: episodeId=`V01E06`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 밤샘 자동화`; choice=현우는 파일 복사·표 변환 한 작업만 ZERO에 승인하고 전송·수정 권한은 잠근 채 밤샘 자동화를 실행한다; allyRelay=[]; zeroMode=`tier2-reversible`; zeroConstraint=단발 작업만; 네트워크 전송·원본 수정·후속 실행 금지; failureType=`오염 데이터`; manifestation=`배터리·연산 고갈과 자동화 로그 노출`; storyRole=`Bind/단발 자동화와 자원 대가`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=검증된 30건과 온도 기록을 아침까지 감사 가능한 자료로 만든다. active Adversary=반복 정리 분량과 방전 직전 단말. irreversible Gamble=현우는 파일 복사·표 변환 한 작업만 ZERO에 승인하고 전송·수정 권한은 잠근 채 밤샘 자동화를 실행한다. Error/collision=작업은 끝나지만 단말 배터리와 연산 여유가 고갈돼 다음 날 결정적 분석을 할 수 없다. earned Reward=사람이 확인할 원본 링크와 변환 이력이 붙은 자료가 완성되고 팀원들의 밤을 돌려준다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:3, Agency:1, Connection:0, Externality:1, status:`open`}; SCAR={id:`S01-C`, change:`배터리·연산 고갈과 자동화 로그 노출 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V01E08`}.
- **reader effect**: humanMove=자동화 범위를 좁히고 동료의 밤을 절약하되 검수는 넘기지 않음; dopamine=하룻밤 분량이 감사 가능한 한 묶음으로 완성.
- **stateDelta**: {ZERO=단발 Automate 경험; 자원=고갈; 자료=원본 링크 포함}.
- **seeds**: [{id:`K01-C`, action:`plant`, deadline:`V01E08`}]; evidenceIn=[수기 대조·온도 기록]; evidenceOut=[변환 이력·자동화 로그·방전된 단말].
- **episode RELAY**: relayTo=`V01E07`; file=`solo-ai-user/vol01/07-part7-the-build.md`; cause=ZERO가 쓸 수 없는 동안 현우가 직접 현장을 돌며 데이터 밖 요구를 찾아야 한다.

### EPISODE CONTRACT V01E07 — `07-part7-the-build.md` / `# 07. 빌드`

- **POV / WAGER**: `G01-C`; mode=`advance`; inherited wager=`G01-C`; stake=`검증된 30건과 온도 기록을 아침까지 감사 가능한 자료로 만든다 / 위험: 배터리·연산 고갈과 자동화 로그 노출`. Bind/인간 통찰로 빌드. POV=차현우. 실패 종 `발표 준비 지연과 징계 위험`; 인간 승리형 `모델을 깨우려 하지 않고 현장의 사람들에게 무엇이 필요한지 직접 묻음`.
- **manifest bridge**: episodeId=`V01E07`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 빌드`; choice=현우는 발표 연습을 멈추고 기사·창고 노동자·고객 담당자를 찾아가 실패 경로를 몸으로 재현한다; allyRelay=[{node:`N01`, stage:`seed`, choice:`현장 인터뷰 원본과 피해 비용을 독립 검토한다`, cost:`현우를 면책하지 않은 채 감사 책임을 맡는다`}]; zeroMode=`off`; zeroConstraint=배터리 고갈; 현장 관찰과 인터뷰에 개입하지 않음; failureType=`오염 데이터`; manifestation=`발표 준비 지연과 징계 위험`; storyRole=`Bind/인간 통찰로 빌드`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=검증 자료를 실제 고객이 승인할 제안으로 바꾼다. active Adversary=데이터에 없는 하역 동선과 정만호가 정한 과장된 KPI. irreversible Gamble=현우는 발표 연습을 멈추고 기사·창고 노동자·고객 담당자를 찾아가 실패 경로를 몸으로 재현한다. Error/collision=슬라이드 완성 시간이 줄고 정만호는 무단 현장 이탈로 징계를 예고한다. earned Reward=진짜 병목은 예측 정확도가 아니라 하역 승인 11분과 온도 인계 서명 부재임을 찾아 사람이 운영 가능한 파일럿을 설계한다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:2, Agency:1, Connection:2, Externality:1, status:`paid`}; SCAR={id:`S01-C-M`, change:`S01-C의 열린 비용이 행동을 바꾸어 발표 준비 지연과 징계 위험의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=모델을 깨우려 하지 않고 현장의 사람들에게 무엇이 필요한지 직접 묻음; dopamine=AI 데이터에 없던 11분 병목 발견.
- **stateDelta**: {제안 핵심=온도 인계 서명·11분 단축; 오세라=독립 감사 관찰자}.
- **seeds**: [{id:`K01-C`, action:`advance`, deadline:`V01E08`}]; evidenceIn=[방전 단말·현장 온도 기록]; evidenceOut=[기사 진술·하역 동선·인계 서명 설계].
- **episode RELAY**: relayTo=`V01E08`; file=`solo-ai-user/vol01/08-part8-sabotage.md`; cause=완성된 제안과 인터뷰 원본이 발표 전날 사라지고 현우 이름도 명단에서 지워진다.

### EPISODE CONTRACT V01E08 — `08-part8-sabotage.md` / `# 08. 방해`

- **POV / WAGER**: `G01-C`; mode=`resolve`; inherited wager=`G01-C`; stake=`검증된 30건과 온도 기록을 아침까지 감사 가능한 자료로 만든다 / 위험: 배터리·연산 고갈과 자동화 로그 노출`. Bind/방해를 증거로 전환. POV=차현우. 실패 종 `단말 보안 위반과 무단 감사 제보 동시 노출`; 인간 승리형 `복구본을 무기로 독점하지 않고 감사 채널과 동료 증언에 나눠 맡김`.
- **manifest bridge**: episodeId=`V01E08`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 방해`; choice=현우는 복구본만 몰래 들고 가지 않고 삭제 시각·권한 변경·지우 원본을 오세라 감사 채널에 동시 보존한 뒤 명단 밖 발표를 요구한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=흔적 재구성만; 감사 제보와 무대 진입은 현우 선택; failureType=`오염 데이터`; manifestation=`단말 보안 위반과 무단 감사 제보 동시 노출`; storyRole=`Bind/방해를 증거로 전환`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=사라진 제안을 복구하고 지우의 기여까지 지킨다. active Adversary=정만호의 파일 잠금·발표자 삭제·성과 탈취. irreversible Gamble=현우는 복구본만 몰래 들고 가지 않고 삭제 시각·권한 변경·지우 원본을 오세라 감사 채널에 동시 보존한 뒤 명단 밖 발표를 요구한다. Error/collision=보안 위반 단말과 무단 감사 제보가 함께 드러나 현우는 이겨도 징계를 피할 수 없다. earned Reward=정만호가 성과는 가져가고 실패 책임은 현우에게 남기려 한 권한 흐름이 독립 로그로 고정된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:2, Connection:2, Externality:1, status:`transformed`}; SCAR={id:`S01-C`, change:`S01-C를 기한 안에 닫고 단말 보안 위반과 무단 감사 제보 동시 노출 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=복구본을 무기로 독점하지 않고 감사 채널과 동료 증언에 나눠 맡김; dopamine=삭제가 오히려 정만호의 설계 증거가 됨.
- **stateDelta**: {제안=복구; 로그=오세라 봉인; 발표자=현우 제외; 징계=불가피}.
- **seeds**: [{id:`K01-C`, action:`payoff`, deadline:`V01E08`}]; evidenceIn=[인계 서명 설계·삭제 로그]; evidenceOut=[독립 봉인 해시·지우 진술·명단 밖 발표 요구].
- **episode RELAY**: relayTo=`V01E09`; file=`solo-ai-user/vol01/09-part9-the-pitch.md`; cause=오세라가 48시간 파일럿과 원본 공개를 조건으로 현우에게 발표 7분을 준다.

### EPISODE CONTRACT V01E09 — `09-part9-the-pitch.md` / `# 09. 발표`

- **POV / WAGER**: `G01-D`; mode=`initiate`; stake=`검증 가능한 파일럿으로 계약을 따내고 지우를 희생양 명단에서 빼낸다 / 위험: 승리와 동시에 보안·책임 심사 개시`. Detonate/48시간 파일럿 승부. POV=차현우. 실패 종 `승리와 동시에 보안·책임 심사 개시`; 인간 승리형 `실패를 감추지 않은 작은 파일럿에 자기 자리를 걸고 피해 당사자가 검증하게 함`.
- **manifest bridge**: episodeId=`V01E09`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 발표`; choice=현우는 높은 예측치를 포기하고 자기 실패·30건 표본·온도 인계 절차를 공개하며 48시간 수동 검증 파일럿에 자기 직위를 건다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=발표 초안·증거 정렬만; 답변·약속·책임은 현우; failureType=`오염 데이터`; manifestation=`승리와 동시에 보안·책임 심사 개시`; storyRole=`Detonate/48시간 파일럿 승부`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=검증 가능한 파일럿으로 계약을 따내고 지우를 희생양 명단에서 빼낸다. active Adversary=정만호의 권위, 경쟁사 수치, 현우의 오염 데이터 실패 전력. irreversible Gamble=현우는 높은 예측치를 포기하고 자기 실패·30건 표본·온도 인계 절차를 공개하며 48시간 수동 검증 파일럿에 자기 직위를 건다. Error/collision=임원들은 자동화 기적보다 낮은 수익 전망과 보안 위반을 문제 삼고 즉시 계약을 보류한다. earned Reward=고객 현장 책임자가 11분 병목과 피해 비용을 확인하고 파일럿을 선택하며 정만호의 책임 전가 문서가 같은 무대에서 드러난다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:1, Connection:1, Externality:2, status:`open`}; SCAR={id:`S01-D`, change:`승리와 동시에 보안·책임 심사 개시 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V01E11`}.
- **reader effect**: humanMove=실패를 감추지 않은 작은 파일럿에 자기 자리를 걸고 피해 당사자가 검증하게 함; dopamine=희생양이 자기 실패까지 무기로 판을 뒤집는 발표.
- **stateDelta**: {파일럿=승인; 정만호 설계=노출; 현우·지우=재계약 심사 유지}.
- **seeds**: [{id:`K01-D`, action:`plant`, deadline:`V01E11`}]; evidenceIn=[봉인 로그·48시간 조건]; evidenceOut=[고객 파일럿 승인·징계 심사·설명되지 않는 성과].
- **episode RELAY**: relayTo=`V01E10`; file=`solo-ai-user/vol01/10-part10-unexplained.md`; cause=성과는 인정되지만 오세라가 단말 반출과 자동화 로그를 설명하라고 요구한다.

### EPISODE CONTRACT V01E10 — `10-part10-unexplained.md` / `# 10. 설명되지 않는`

- **POV / WAGER**: `G01-D`; mode=`advance`; inherited wager=`G01-D`; stake=`검증 가능한 파일럿으로 계약을 따내고 지우를 희생양 명단에서 빼낸다 / 위험: 승리와 동시에 보안·책임 심사 개시`. Detonate/승리 비용 결산. POV=차현우. 실패 종 `감봉·접근권 제한·지속 감시`; 인간 승리형 `기적의 공로를 독점하지 않고 오류와 징계를 자기 이름으로 남김`.
- **manifest bridge**: episodeId=`V01E10`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 설명되지 않는`; choice=현우는 지우·기사·창고 노동자의 기여와 자기 승인 오류를 기록하고, 출처를 밝힐 수 없는 분석 방식 때문에 감봉·접근권 제한을 수용한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=정체 비공개; 추가 사내 자동화 중지; failureType=`오염 데이터`; manifestation=`감봉·접근권 제한·지속 감시`; storyRole=`Detonate/승리 비용 결산`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=성과의 주인을 정직하게 나누고 보안 위반 책임을 피하지 않는다. active Adversary=영웅 서사를 원하는 임원과 ZERO를 숨겨야 하는 현실. irreversible Gamble=현우는 지우·기사·창고 노동자의 기여와 자기 승인 오류를 기록하고, 출처를 밝힐 수 없는 분석 방식 때문에 감봉·접근권 제한을 수용한다. Error/collision=재계약은 지키지만 핵심 데이터 접근을 잃고 ‘설명되지 않는 성과’라는 감시 꼬리표가 남는다. earned Reward=지우의 계약과 파일럿은 개인 기적이 아니라 감사 가능한 인간 절차로 보호되고 정만호의 인사 권한은 정지된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:1, Connection:1, Externality:1, status:`paid`}; SCAR={id:`S01-D-M`, change:`S01-D의 열린 비용이 행동을 바꾸어 감봉·접근권 제한·지속 감시의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=기적의 공로를 독점하지 않고 오류와 징계를 자기 이름으로 남김; dopamine=재계약·되갚음과 동시에 값이 청구되는 승리.
- **stateDelta**: {현우=재계약+감봉+제한; 지우=재계약; 정만호=권한 정지; exposure=low}.
- **seeds**: [{id:`K01-D`, action:`advance`, deadline:`V01E11`}]; evidenceIn=[징계 심사·기여 원본]; evidenceOut=[설명되지 않는 성과 표식·회사 밖 사용 유혹].
- **episode RELAY**: relayTo=`V01E11`; file=`solo-ai-user/vol01/11-epilogue.md`; cause=박순임의 부재중 전화가 오고, 현우는 답하기 전에 단말을 회사 밖에서 써도 되는지 확인하려 한다.

### EPISODE CONTRACT V01E11 — `11-epilogue.md` / `# 11. 다음 배포`

- **POV / WAGER**: `G01-D`; mode=`resolve`; inherited wager=`G01-D`; stake=`검증 가능한 파일럿으로 계약을 따내고 지우를 희생양 명단에서 빼낸다 / 위험: 승리와 동시에 보안·책임 심사 개시`. Afterimage/분실 단말 미스터리. POV=차현우. 실패 종 `소유권 불명 상태의 외부 사용 책임`; 인간 승리형 `운명적 선물로 착각하지 않고 분실물 책임과 신고 흔적을 남김`.
- **manifest bridge**: episodeId=`V01E11`; arena=`3주 준비·마지막 6일·48시간 파일럿 / 다음 배포`; choice=현우는 ZERO를 반납한 척 숨기지 않고 자산 담당자에게 분실 단말 발견 사실을 남긴 뒤, 소유자가 나타날 때까지 개인 사용 책임을 지겠다고 서면화한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=자기 출처·삭제된 운송 기록을 복원할 권한 없음; failureType=`오염 데이터`; manifestation=`소유권 불명 상태의 외부 사용 책임`; storyRole=`Afterimage/분실 단말 미스터리`; genre=`직장 역전극·AI 미스터리`.
- **WAGER detail**: Want=단말 출처를 확인해 회사 밖에서 써도 되는지 판단한다. active Adversary=비어 있는 자산대장과 이미 삭제된 배송·수취 기록. irreversible Gamble=현우는 ZERO를 반납한 척 숨기지 않고 자산 담당자에게 분실 단말 발견 사실을 남긴 뒤, 소유자가 나타날 때까지 개인 사용 책임을 지겠다고 서면화한다. Error/collision=정식 소유권도 면책도 얻지 못하고 회사 밖 사용은 새 위반이 된다. earned Reward=단말은 현우에게 보내진 선물이 아니라 수취인·터미널 번호가 소실된 실제 분실물이며, 마지막 남은 운송 영수증의 17분 공백을 확보한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:1, Connection:1, Externality:1, status:`transformed`}; SCAR={id:`S01-D`, change:`S01-D를 기한 안에 닫고 소유권 불명 상태의 외부 사용 책임 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=운명적 선물로 착각하지 않고 분실물 책임과 신고 흔적을 남김; dopamine=수취인이 사라진 단말과 17분 공백 미스터리.
- **stateDelta**: {단말=lost terminal; 소유권=불명; 신고=접수; 다음 의뢰=박순임}.
- **seeds**: [{id:`K01-D`, action:`payoff`, deadline:`V01E11`}]; evidenceIn=[자산번호 공백·회사 밖 연락]; evidenceOut=[운송 영수증 17분 공백·분실 신고·순임반찬 폐업 위기].
- **episode RELAY**: relayTo=`V02E00`; file=`solo-ai-user/vol02/00-prologue.md`; cause=박순임이 가게 문을 닫기 전 마지막 재고 사진을 보내면서 V02E00을 연다.

[시리즈 홈](../README.md) | [권 목차](../vol01/README.md) | [다음 권 설계 →](./vol02-first-deploy.md)
