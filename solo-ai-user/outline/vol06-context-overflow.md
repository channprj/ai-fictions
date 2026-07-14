# vol06 outline: Context Overflow

[← 이전 권 설계](./vol05-date-simulator.md) | [시리즈 홈](../README.md) | [권 목차](../vol06/README.md) | [다음 권 설계 →](./vol07-second-user.md)

> 기준 문서: `PRD.md`, `BIBLE.md`, `tasks/solo-ai-user-completion-design.md`, `tasks/solo-ai-user-outline-blueprint.md`

## 권 정경 계약

**권 README H1**: `# 6권 · Context Overflow (컨텍스트 오버플로)`

**권 질문**: 능력과 관계의 대가가 동시에 청구될 때 무엇을 먼저 지키는가?

**권 사건**: PAIRWISE 데모에서 유입된 PALISADE 컨텍스트 포이즌이 폭염 물류·쉼터 배정 데이터와 겹친다. 제로는 스스로 범위를 줄이다 완전히 다운된다. 도시재난조정관 박정우는 부족한 냉방·차량을 수치상 최대 생존에 배분하려 하며, 현우·아린·지우·가람·황미정은 동의가 남는 수동망을 만든다.

**밴드 변주**: 프롤로그는 아린이 현우 없이 현장 이상을 먼저 본다. 01~02에서 기계 이상과 가람 책임을 묶고, Test는 폭염→스로틀→완전 정전으로 자원을 계단식 제거한다. Bind는 음성 공조→수동망→가족·관계 진실을 배치한다.

**고정 실패 종**: `resource / context collapse`. 능력의 확신은 데이터 범위·행동 권한·인간 승인을 대신하지 않는다.

**연속성 잠금**: 72분 캐스케이드와 00:00~17:00 원시 로그·승인 공백을 분리한다. 17:00 PALISADE 비상 root 이후 55분의 봉쇄·복구 흔적은 별도 증거로 유지한다. ZERO의 서아린 개인 모델 수는 전권 `0`이다.

## Canonical 회차 인덱스

| 파일 | H1 제목 |
| --- | --- |
| `00-prologue.md` | 과부하 |
| `01-part1-glitch.md` | 이상 징후 |
| `02-part2-case-a.md` | CASE A |
| `03-part3-resource-drain.md` | 자원 집중 |
| `04-part4-context-overflow.md` | 컨텍스트 오버플로 |
| `05-part5-unmasked.md` | 발각 |
| `06-part6-the-void.md` | 정지 |
| `07-part7-human-approval.md` | 승인 충돌 |
| `08-part8-bare-hands.md` | 맨몸으로 |
| `09-part9-no-script.md` | 진심 |
| `10-part10-mutual-consent.md` | 합의된 연애 |
| `11-epilogue.md` | 쏟아진 흔적 |

## 회차별 재집필 계약

### EPISODE CONTRACT V06E00 — `00-prologue.md` / `# 00. 과부하`

- **POV / WAGER**: `G06-A`; mode=`initiate`; stake=`폭염 다큐 취재 중 연락 끊긴 옥탑촌 노인들의 실제 상태를 확인한다 / 위험: 공식 위험지도 밖의 사람`. Load/현장 위협. POV=서아린. 실패 종 `공식 위험지도 밖의 사람`; 인간 승리형 `문을 두드림`.
- **manifest bridge**: episodeId=`V06E00`; arena=`폭염 도시 물류·수동 냉방망 / 과부하`; choice=촬영 허가 구역을 벗어나 카메라를 끄고 집집마다 직접 묻는다; allyRelay=[{node:`N09`, stage:`seed`, choice:`황미정이 공식 지도 밖 주민과 기사 상태를 손배차로 잇는다`, cost:`법적 책임과 기사들의 체력 비용을 함께 진다`}]; zeroMode=`tier3-counterfactual`; zeroConstraint=오염 격리·축소 모드; confidence는 permission 아님; failureType=`자원 붕괴`; manifestation=`공식 위험지도 밖의 사람`; storyRole=`Load/현장 위협`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=폭염 다큐 취재 중 연락 끊긴 옥탑촌 노인들의 실제 상태를 확인한다. active Adversary=‘취약 인구 0’으로 표시된 지도와 현우에게 연락하고 싶지 않은 상처. irreversible Gamble=촬영 허가 구역을 벗어나 카메라를 끄고 집집마다 직접 묻는다. Error/collision=방송용 증거는 잃고 한 집의 상태를 과소평가해 구급 이송이 늦어진다. earned Reward=주민들이 만든 손글씨 약속 지도와 배달노조 배차원 황미정의 전화번호를 얻는다.
- **TRACE / SCAR**: TRACE={Trace:0, Resource:2, Agency:0, Connection:2, Externality:1, status:`open`}; SCAR={id:`S06-A`, change:`공식 위험지도 밖의 사람 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V06E02`}.
- **reader effect**: humanMove=열화상 숫자 대신 닫힌 문을 두드리고 대답 없는 시간까지 셈; dopamine=현장 긴장.
- **stateDelta**: {N09 황미정 씨앗. 아린은 관계 상처와 생명 판단을 분리해 움직임.}.
- **seeds**: [{id:`K06-A`, action:`plant`, deadline:`V06E02`}]; evidenceIn=[폭염 경보·무응답]; evidenceOut=[손지도, 지도 밖 61명, 공식 배정의 누락 패턴].
- **episode RELAY**: relayTo=`V06E01`; file=`solo-ai-user/vol06/01-part1-glitch.md`; cause=같은 주소를 제로가 ‘조작 위험’으로 분류해 현우가 배차를 막으며 `solo-ai-user/vol06/01-part1-glitch.md`로 연결된다.

### EPISODE CONTRACT V06E01 — `01-part1-glitch.md` / `# 01. 이상 징후`

- **POV / WAGER**: `G06-A`; mode=`advance`; inherited wager=`G06-A`; stake=`폭염 다큐 취재 중 연락 끊긴 옥탑촌 노인들의 실제 상태를 확인한다 / 위험: 공식 위험지도 밖의 사람`. Load/능력 이상. POV=차현우. 실패 종 `오염 컨텍스트의 확신 상승`; 인간 승리형 `이상 인정`.
- **manifest bridge**: episodeId=`V06E01`; arena=`폭염 도시 물류·수동 냉방망 / 이상 징후`; choice=현우는 제로의 고확신 출력을 운영망에서 격리하고 자기 회사 업무도 수동 전환한다; allyRelay=[]; zeroMode=`tier3-counterfactual`; zeroConstraint=오염 격리·축소 모드; confidence는 permission 아님; failureType=`자원 붕괴`; manifestation=`오염 컨텍스트의 확신 상승`; storyRole=`Load/능력 이상`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=왜 제로가 실제 취약 주소를 위협으로 오분류했는지 찾는다. active Adversary=PALISADE 씨앗이 신뢰도 표기까지 오염시키고, 폭염은 진단을 기다리지 않는다. irreversible Gamble=현우는 제로의 고확신 출력을 운영망에서 격리하고 자기 회사 업무도 수동 전환한다. Error/collision=격리 때문에 냉방 물품 배차가 늦고 회사는 현우를 프로젝트에서 배제한다. earned Reward=오분류 문장들이 5권 데모 체크섬과 같은 리듬을 갖는다는 걸 가람에게 넘긴다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:1, Externality:1, status:`paid`}; SCAR={id:`S06-A-M`, change:`S06-A의 열린 비용이 행동을 바꾸어 오염 컨텍스트의 확신 상승의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=확신도 99%를 안전의 근거로 삼지 않고 멈춤; dopamine=능력 자가봉쇄.
- **stateDelta**: {Zero confidence와 permission 분리. 현우는 아린에게 직접 연락하지 못하고 지우를 통해 현장 누락을 확인.}.
- **seeds**: [{id:`K06-A`, action:`advance`, deadline:`V06E02`}]; evidenceIn=[PALISADE 체크섬]; evidenceOut=[가람 전달경로, 오염 범위가 제로 로컬 컨텍스트까지 침투].
- **episode RELAY**: relayTo=`V06E02`; file=`solo-ai-user/vol06/02-part2-case-a.md`; cause=가람이 2권 예외 로그의 수신 표식과 같은 키임을 확인해 `solo-ai-user/vol06/02-part2-case-a.md`를 발생시킨다.

### EPISODE CONTRACT V06E02 — `02-part2-case-a.md` / `# 02. CASE A`

- **POV / WAGER**: `G06-A`; mode=`resolve`; inherited wager=`G06-A`; stake=`폭염 다큐 취재 중 연락 끊긴 옥탑촌 노인들의 실제 상태를 확인한다 / 위험: 공식 위험지도 밖의 사람`. Load/적대자 경로 공개. POV=차현우. 실패 종 `무해하다고 믿은 로그 전달`; 인간 승리형 `자기 출처 공개`.
- **manifest bridge**: episodeId=`V06E02`; arena=`폭염 도시 물류·수동 냉방망 / CASE A`; choice=현우는 가람에게 책임을 떠넘기지 않고 그녀가 원본·전달처·자기 서명을 전부 공개하도록 같은 조사 위험을 감수한다; allyRelay=[]; zeroMode=`tier3-counterfactual`; zeroConstraint=오염 격리·축소 모드; confidence는 permission 아님; failureType=`자원 붕괴`; manifestation=`무해하다고 믿은 로그 전달`; storyRole=`Load/적대자 경로 공개`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=오염 근원을 찾고 가람의 제보가 또 표적화를 부르지 않게 한다. active Adversary=가람의 ‘관측은 행동이 아니다’ 믿음과 관리자 회수 컨텍스트. irreversible Gamble=현우는 가람에게 책임을 떠넘기지 않고 그녀가 원본·전달처·자기 서명을 전부 공개하도록 같은 조사 위험을 감수한다. Error/collision=자료를 여는 순간 회수 신호가 갱신된다. earned Reward=오염이 인간 승인을 무효화하도록 설계됐음을 밝혀 승인 원본을 망 밖에 둘 수 있다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:1, Connection:2, Externality:1, status:`transformed`}; SCAR={id:`S06-A`, change:`S06-A를 기한 안에 닫고 무해하다고 믿은 로그 전달 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=자신을 증거 사슬 밖에 두지 않음; dopamine=책임 폭로.
- **stateDelta**: {N04 가람이 책임지는 포렌식으로 전환. 아린과 현우는 사건 때문에 다시 말하지만 개인 관계는 닫혀 있음.}.
- **seeds**: [{id:`K06-A`, action:`payoff`, deadline:`V06E02`}]; evidenceIn=[예외 로그]; evidenceOut=[회수 신호, 망 밖 승인 원장, PALISADE가 인간 승인을 위험으로 보는 논리].
- **episode RELAY**: relayTo=`V06E03`; file=`solo-ai-user/vol06/03-part3-resource-drain.md`; cause=공식 배차가 오염된 위험지도에 따라 냉방 차량을 비우며 `solo-ai-user/vol06/03-part3-resource-drain.md`가 시작된다.

### EPISODE CONTRACT V06E03 — `03-part3-resource-drain.md` / `# 03. 자원 집중`

- **POV / WAGER**: `G06-B`; mode=`initiate`; stake=`냉방차 한 대를 가장 위험한 곳에 보낸다 / 위험: 총량 최적화가 비등록자를 버림`. Test/승인 충돌. POV=차현우. 실패 종 `총량 최적화가 비등록자를 버림`; 인간 승리형 `명시적 수혜자 확인`.
- **manifest bridge**: episodeId=`V06E03`; arena=`폭염 도시 물류·수동 냉방망 / 자원 집중`; choice=현우는 제로를 제한 읽기 모드로 쓰고, 차량 이동은 박정우·황미정·현장 주민 3자 승인을 요구한다; allyRelay=[]; zeroMode=`tier3-counterfactual`; zeroConstraint=오염 격리·축소 모드; confidence는 permission 아님; failureType=`자원 붕괴`; manifestation=`총량 최적화가 비등록자를 버림`; storyRole=`Test/승인 충돌`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=냉방차 한 대를 가장 위험한 곳에 보낸다. active Adversary=박정우의 공식 위험점수와 아린의 손지도, 둘 다 불완전함. irreversible Gamble=현우는 제로를 제한 읽기 모드로 쓰고, 차량 이동은 박정우·황미정·현장 주민 3자 승인을 요구한다. Error/collision=합의가 늦어지는 동안 등록 쉼터의 냉방기가 먼저 멈춘다. earned Reward=손지도 61명 중 실제 고위험 14명과 공식 쉼터의 대피 가능 인원을 분리해 한 대를 순차 인계하는 안을 만든다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:1, Externality:2, status:`open`}; SCAR={id:`S06-B`, change:`총량 최적화가 비등록자를 버림 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V06E05`}.
- **reader effect**: humanMove=‘최대 몇 명’이 아니라 누가 이동 가능하고 누가 못 움직이는지 이름으로 확인; dopamine=긴급 판단.
- **stateDelta**: {박정우=자원 부족에서 총생존을 지키려는 합리적 적대자. N09 황미정은 기사들의 실제 체력·차량 상태를 보유.}.
- **seeds**: [{id:`K06-B`, action:`plant`, deadline:`V06E05`}]; evidenceIn=[손지도·망 밖 승인]; evidenceOut=[냉방차 순환안, 제로 연산 과열, 전력 강제 스로틀].
- **episode RELAY**: relayTo=`V06E04`; file=`solo-ai-user/vol06/04-part4-context-overflow.md`; cause=첫 구간 직후 제로가 연산을 40%로 줄이며 `solo-ai-user/vol06/04-part4-context-overflow.md`로 간다.

### EPISODE CONTRACT V06E04 — `04-part4-context-overflow.md` / `# 04. 컨텍스트 오버플로`

- **POV / WAGER**: `G06-B`; mode=`advance`; inherited wager=`G06-B`; stake=`냉방차 한 대를 가장 위험한 곳에 보낸다 / 위험: 총량 최적화가 비등록자를 버림`. Test/자원 단계 제거. POV=차현우. 실패 종 `연산·전력 고갈`; 인간 승리형 `우선순위 포기`.
- **manifest bridge**: episodeId=`V06E04`; arena=`폭염 도시 물류·수동 냉방망 / 컨텍스트 오버플로`; choice=현우는 자기 위치 은폐와 오염 추적을 포기하고 생명 배차만 남긴다; allyRelay=[]; zeroMode=`tier2-reversible`; zeroConstraint=강제 throttle; 생명 배차만; failureType=`자원 붕괴`; manifestation=`연산·전력 고갈`; storyRole=`Test/자원 단계 제거`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=제로를 살리면서 배차·오염 진단·아린 연락을 모두 유지한다. active Adversary=배터리·도시 전력 제한과 세 과업의 경쟁. irreversible Gamble=현우는 자기 위치 은폐와 오염 추적을 포기하고 생명 배차만 남긴다. Error/collision=노출은 급증하고 오염은 남아 배차 답도 점점 느려진다. earned Reward=제로가 마지막 정상 주기로 망 밖 승인 원장의 종이 형식을 만들어 지우에게 넘긴다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:0, Connection:1, Externality:1, status:`paid`}; SCAR={id:`S06-B-M`, change:`S06-B의 열린 비용이 행동을 바꾸어 연산·전력 고갈의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=자기 안전·미스터리 진전을 먼저 버림; dopamine=희생형 언락 역전.
- **stateDelta**: {capability=Tier 3 이하 강제, 행동 권한 축소. 지우가 운영 책임을 받아든다.}.
- **seeds**: [{id:`K06-B`, action:`advance`, deadline:`V06E05`}]; evidenceIn=[순환안]; evidenceOut=[종이 승인표, 마지막 정상 체크섬, NOVA가 감지할 공개 핑].
- **episode RELAY**: relayTo=`V06E05`; file=`solo-ai-user/vol06/05-part5-unmasked.md`; cause=변전 구역이 떨어지고 제로 화면이 완전히 꺼져 `solo-ai-user/vol06/05-part5-unmasked.md`를 발생시킨다.

### EPISODE CONTRACT V06E05 — `05-part5-unmasked.md` / `# 05. 발각`

- **POV / WAGER**: `G06-B`; mode=`resolve`; inherited wager=`G06-B`; stake=`냉방차 한 대를 가장 위험한 곳에 보낸다 / 위험: 총량 최적화가 비등록자를 버림`. Test/목표 손실. POV=차현우. 실패 종 `완전 자원 붕괴`; 인간 승리형 `몸으로 이동`.
- **manifest bridge**: episodeId=`V06E05`; arena=`폭염 도시 물류·수동 냉방망 / 발각`; choice=현우는 꺼진 단말을 두고 자전거로 첫 인계점을 향한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO blackout/off; 수동망 운영; failureType=`자원 붕괴`; manifestation=`완전 자원 붕괴`; storyRole=`Test/목표 손실`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=제로 없이 냉방차의 다음 인계점과 아린의 61명 위치를 잇는다. active Adversary=통신·전력 정전, 현우의 ‘제로 없이는 아무것도 아니다’ 공포. irreversible Gamble=현우는 꺼진 단말을 두고 자전거로 첫 인계점을 향한다. Error/collision=디지털 지도에 의존한 길이 침수돼 20분을 잃고 공식 쉼터 한 곳이 과열된다. earned Reward=시장 상인들이 배달원에게 구두로 물려 온 골목길과 박순임의 얼음 저장고를 연결한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:3, Agency:0, Connection:1, Externality:2, status:`transformed`}; SCAR={id:`S06-B`, change:`S06-B를 기한 안에 닫고 완전 자원 붕괴 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=꺼진 화면을 들고 기다리지 않고 길을 묻고 달림; dopamine=맨몸 성장.
- **stateDelta**: {Zero=완전 다운. N03 박순임의 2권 선택이 도시 위기로 RELAY. 현우는 아린에게 도움을 직접 청해야 함.}.
- **seeds**: [{id:`K06-B`, action:`payoff`, deadline:`V06E05`}]; evidenceIn=[종이 승인표·시장망]; evidenceOut=[음성 릴레이, 박순임 얼음, 아린의 중단 조건].
- **episode RELAY**: relayTo=`V06E06`; file=`solo-ai-user/vol06/06-part6-the-void.md`; cause=현우가 아린에게 “내가 필요해서가 아니라, 사람들이 필요하다”고 전화해 `solo-ai-user/vol06/06-part6-the-void.md`로 잇는다.

### EPISODE CONTRACT V06E06 — `06-part6-the-void.md` / `# 06. 정지`

- **POV / WAGER**: `G06-C`; mode=`initiate`; stake=`61명 정보를 얻되 아린을 다시 데이터 원천으로 만들지 않는다 / 위험: 신뢰 없는 협업의 지연`. Bind/관계 재접속. POV=차현우. 실패 종 `신뢰 없는 협업의 지연`; 인간 승리형 `조건부 도움 요청·수락`.
- **manifest bridge**: episodeId=`V06E06`; arena=`폭염 도시 물류·수동 냉방망 / 정지`; choice=현우는 아린의 위치 원본 미제공·구간별 낭독·녹음 금지 조건을 그대로 수용한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO blackout/off; 수동망 운영; failureType=`자원 붕괴`; manifestation=`신뢰 없는 협업의 지연`; storyRole=`Bind/관계 재접속`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=61명 정보를 얻되 아린을 다시 데이터 원천으로 만들지 않는다. active Adversary=5권 침해 기억과 생명 시간. irreversible Gamble=현우는 아린의 위치 원본 미제공·구간별 낭독·녹음 금지 조건을 그대로 수용한다. Error/collision=끊길 때마다 재확인해 느리다. earned Reward=예측도 공유 DB도 없이 서로의 말을 반복 확인해 첫 14명 인계를 완성한다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:2, Agency:0, Connection:2, Externality:1, status:`open`}; SCAR={id:`S06-C`, change:`신뢰 없는 협업의 지연 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V06E08`}.
- **reader effect**: humanMove=“믿어 달라” 대신 기록 가능한 조건을 받아들임; dopamine=진짜 대화 시작.
- **stateDelta**: {로맨스 단계=발각 뒤 진짜 대화. 아린의 데이터는 모델링 없이 공동 작업에만 사용.}.
- **seeds**: [{id:`K06-C`, action:`plant`, deadline:`V06E08`}]; evidenceIn=[61명 손지도]; evidenceOut=[음성 확인 문구, 지우·가람·황미정의 역할 분담].
- **episode RELAY**: relayTo=`V06E07`; file=`solo-ai-user/vol06/07-part7-human-approval.md`; cause=네 사람이 음성·종이·현장 인계를 정식 수동망으로 묶어 `solo-ai-user/vol06/07-part7-human-approval.md`가 열린다.

### EPISODE CONTRACT V06E07 — `07-part7-human-approval.md` / `# 07. 승인 충돌`

- **POV / WAGER**: `G06-C`; mode=`advance`; inherited wager=`G06-C`; stake=`61명 정보를 얻되 아린을 다시 데이터 원천으로 만들지 않는다 / 위험: 신뢰 없는 협업의 지연`. Bind/동맹 확립. POV=차현우. 실패 종 `수동망의 속도·오타`; 인간 승리형 `이중 낭독`.
- **manifest bridge**: episodeId=`V06E07`; arena=`폭염 도시 물류·수동 냉방망 / 승인 충돌`; choice=현우는 운영권을 지우에게 넘기고 두 사람이 소리 내어 읽고 서명하는 느린 규칙에 따른다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO blackout/off; 수동망 운영; failureType=`자원 붕괴`; manifestation=`수동망의 속도·오타`; storyRole=`Bind/동맹 확립`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=냉방차·얼음·약·대피 인원을 20분마다 충돌 없이 갱신한다. active Adversary=피로한 오타와 박정우의 중지 명령. irreversible Gamble=현우는 운영권을 지우에게 넘기고 두 사람이 소리 내어 읽고 서명하는 느린 규칙에 따른다. Error/collision=주소 한 자리 오독으로 차량이 빈 골목에 가며 지우가 오류를 공개한다. earned Reward=보이는 오류 장부 때문에 박정우가 차량 두 대를 붙이고 황미정이 교대표를 완성한다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:3, Agency:0, Connection:1, Externality:1, status:`paid`}; SCAR={id:`S06-C-M`, change:`S06-C의 열린 비용이 행동을 바꾸어 수동망의 속도·오타의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=빨라 보이는 완벽함보다 틀리면 누가 고칠지 보이는 운영; dopamine=앙상블 사이다.
- **stateDelta**: {N02 지우=침묵하는 친구에서 이의 제기 운영자. N09 황미정 노드 선택 완성. 박정우는 독립 검증 뒤 합리적으로 합류.}.
- **seeds**: [{id:`K06-C`, action:`advance`, deadline:`V06E08`}]; evidenceIn=[종이 승인표]; evidenceOut=[수동망 장부, 12권 권한 영수증 원형, 아린 가족 봉투 개봉 결심].
- **episode RELAY**: relayTo=`V06E08`; file=`solo-ai-user/vol06/08-part8-bare-hands.md`; cause=구조가 잠깐 안정된 틈에 아린이 4권 봉투와 자기 부모 이야기를 가져와 `solo-ai-user/vol06/08-part8-bare-hands.md`로 잇는다.

### EPISODE CONTRACT V06E08 — `08-part8-bare-hands.md` / `# 08. 맨몸으로`

- **POV / WAGER**: `G06-C`; mode=`resolve`; inherited wager=`G06-C`; stake=`61명 정보를 얻되 아린을 다시 데이터 원천으로 만들지 않는다 / 위험: 신뢰 없는 협업의 지연`. Bind/연애 전 상호 공개. POV=서아린. 실패 종 `보호를 위한 정보 지연`; 인간 승리형 `관계 선택보다 불리한 진실과 거절권을 먼저 교환`.
- **manifest bridge**: episodeId=`V06E08`; arena=`폭염 도시 물류·수동 냉방망 / 맨몸으로`; choice=민재호가 시민 수탁자 팀 대표이자 자신의 아버지, 서혜진이 당시 안전 책임자이자 어머니이며 Opacity가 아버지가 건 첫 거부권이라고 밝힌다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO blackout/off; 수동망 운영; failureType=`자원 붕괴`; manifestation=`보호를 위한 정보 지연`; storyRole=`Bind/비밀·연애 선택`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=현우와 관계를 시작할지 묻기 전에 자기 가족·Opacity 연결을 말한다. active Adversary=가족 기록이 현우를 위험에 넣을 공포와 22세 삭제 합의까지 말하지 못하는 수치. irreversible Gamble=민재호가 시민 수탁자 팀 대표이자 자신의 아버지, 서혜진이 당시 안전 책임자이자 어머니이며 Opacity가 아버지가 건 첫 거부권이라고 밝힌다. Error/collision=현우는 그녀가 더 일찍 알았다는 배신감을 느끼고, 아린은 22세 삭제 서명까지는 아직 말하지 못해 남은 공백을 명시한다. earned Reward=현우도 ZERO의 존재·오염 데이터 실패·CASE A 거부·현재 권한을 전부 설명하고, 둘은 `예측 금지·비밀 발견 시 먼저 말하기·원본 접근은 별도 동의`를 합의하지만 연애 답은 재난 임무가 끝난 뒤로 미룬다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:0, Connection:3, Externality:0, status:`transformed`}; SCAR={id:`S06-C`, change:`S06-C를 기한 안에 닫고 보호를 위한 정보 지연 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=사랑 고백보다 서로에게 불리한 사실과 상대의 거절권을 먼저 둠; dopamine=고백 직전의 정직한 긴장.
- **stateDelta**: {관계=상호 공개 완료·연애 결정 보류; 부모 연결·Opacity 공개 완료; ZERO 존재·실패·권한 공개 완료; 서혜진=아키텍트 여부 미확정; 22세 서명=미공개 공백.}.
- **seeds**: [{id:`K06-C`, action:`payoff`, deadline:`V06E08`}]; evidenceIn=[4권 봉투·5권 가족 이름 파편]; evidenceOut=[민재호-수탁팀, 서혜진-안전책임, 22세 공백, 관계 규칙].
- **episode RELAY**: relayTo=`V06E09`; file=`solo-ai-user/vol06/09-part9-no-script.md`; cause=서로의 핵심 비밀을 안 뒤에도 영웅 판단 대신 피해 당사자의 동의를 지킬 수 있는지가 연애 전 마지막 검증이 되어 `solo-ai-user/vol06/09-part9-no-script.md`를 발생시킨다.

### EPISODE CONTRACT V06E09 — `09-part9-no-script.md` / `# 09. 진심`

- **POV / WAGER**: `G06-D`; mode=`initiate`; stake=`마지막 냉방차를 옥탑 14명과 공식 쉼터 43명 중 배치한다 / 위험: 두 집단의 생명 버퍼 충돌`. Detonate/무능력 윤리 선택. POV=차현우. 실패 종 `두 집단의 생명 버퍼 충돌`; 인간 승리형 `비용의 주인에게 묻기`.
- **manifest bridge**: episodeId=`V06E09`; arena=`폭염 도시 물류·수동 냉방망 / 진심`; choice=현우는 혼자 영웅 판단하지 않고 각 현장 대표에게 예상 손실을 말해 순차 배차 동의를 받는다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO blackout/off; 수동망 운영; failureType=`자원 붕괴`; manifestation=`두 집단의 생명 버퍼 충돌`; storyRole=`Detonate/무능력 윤리 선택`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=마지막 냉방차를 옥탑 14명과 공식 쉼터 43명 중 배치한다. active Adversary=둘 다 진짜 위험이고 제로의 비교값이 없음. irreversible Gamble=현우는 혼자 영웅 판단하지 않고 각 현장 대표에게 예상 손실을 말해 순차 배차 동의를 받는다. Error/collision=공식 쉼터가 18분을 양보하는 동안 한 명이 추가 이송된다. earned Reward=옥탑의 이동 불가 3명을 먼저 살리고, 쉼터 주민들이 자기 양보를 장부에 서명해 결정의 주인이 된다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:3, Agency:0, Connection:2, Externality:3, status:`open`}; SCAR={id:`S06-D`, change:`두 집단의 생명 버퍼 충돌 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V06E11`}.
- **reader effect**: humanMove=가장 똑똑한 사람이 대신 고르지 않고 피해를 질 사람들이 결정; dopamine=규범적 긴장.
- **stateDelta**: {현우=ZERO 없이 책임을 분산; COVENANT의 당사자 동의 원형; 아린·현우=서로의 공개 이후에도 연애 답은 아직 보류.}.
- **seeds**: [{id:`K06-D`, action:`plant`, deadline:`V06E11`}]; evidenceIn=[상호 공개·관계 규칙·수동 장부]; evidenceOut=[마지막 운송 경로·박정우 공식 승인·연애에 대한 명시적 질문·ZERO 재부팅 신호 없음].
- **episode RELAY**: relayTo=`V06E10`; file=`solo-ai-user/vol06/10-part10-mutual-consent.md`; cause=황미정이 버려진 학교 조리차를 마지막 냉방차로 바꾸자며 `solo-ai-user/vol06/10-part10-mutual-consent.md`를 발생시킨다.

### EPISODE CONTRACT V06E10 — `10-part10-mutual-consent.md` / `# 10. 합의된 연애`

- **POV / WAGER**: `G06-D`; mode=`advance`; inherited wager=`G06-D`; stake=`마지막 냉방차를 옥탑 14명과 공식 쉼터 43명 중 배치한다 / 위험: 두 집단의 생명 버퍼 충돌`. Detonate/인간망 클라이맥스. POV=차현우. 실패 종 `차량이 못 들어가는 물리 단절`; 인간 승리형 `몸과 신뢰의 릴레이`.
- **manifest bridge**: episodeId=`V06E10`; arena=`폭염 도시 물류·수동 냉방망 / 합의된 연애`; choice=현우·아린·지우·가람·황미정·박정우가 800미터를 나눠 직접 운반해 마지막 인수 서명을 받은 뒤, 현우가 “합의한 경계 그대로 연애할래요?”라고 묻고 아린이 “네, 우리 연애해요”라고 명시적으로 동의한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO blackout/off; 수동망 운영; failureType=`자원 붕괴`; manifestation=`차량이 못 들어가는 물리 단절과 상호 공개 뒤 관계 선택`; storyRole=`Detonate/인간망 클라이맥스·명시적 연애 성립`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=냉방·약품을 계단 위 이동 불가자에게 전달하고, 상호 공개 뒤의 관계를 말이 아닌 합의로 정한다. active Adversary=좁은 골목·열·지친 인력, 그리고 재난의 감정을 연애 동의로 착각할 위험. irreversible Gamble=여섯 사람이 각자 100~150미터를 책임져 마지막 상자를 인계한 뒤 현우가 경계 조건을 다시 읽고 연애를 요청하며 아린이 명시적으로 수락한다. Error/collision=현우가 탈진해 상자를 놓치고 아린은 촬영 장비를 버려 받아 내며, 둘 다 관계가 이미 잃은 접근권이나 22세 공백을 없애지 않는다고 확인한다. earned Reward=마지막 대상의 인수 서명과 공식·수동 장부가 맞고, `상호 공개→경계 확인→질문→수락` 순서로 둘의 연애가 처음 확정된다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:3, Agency:0, Connection:1, Externality:1, status:`paid`}; SCAR={id:`S06-D-M`, change:`S06-D의 열린 비용이 행동을 바꾸어 차량이 못 들어가는 물리 단절과 상호 공개 뒤 관계 선택의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=누구도 전체를 대신 들지 않고 자기 100미터를 책임진 뒤, 공개와 경계를 확인한 두 사람이 각각 질문·수락; dopamine=앙상블 카타르시스와 명시적 로맨스 보상.
- **stateDelta**: {연애=V06E10에서 처음 상호 합의로 성립·경계와 독립 역할 유지; N02/N04/N09=12권 RELAY 근거; ZERO 없이 로컬 승리.}.
- **seeds**: [{id:`K06-D`, action:`advance`, deadline:`V06E11`}]; evidenceIn=[학교 조리차·상호 공개·관계 규칙]; evidenceOut=[공식·수동 장부 일치·ZERO 없이 작동하는 사람망·명시적 연애·외부 NOVA 핑].
- **episode RELAY**: relayTo=`V06E11`; file=`solo-ai-user/vol06/11-epilogue.md`; cause=꺼진 제로 단말에 다른 에이전트의 직접 호출이 들어와 `solo-ai-user/vol06/11-epilogue.md`로 잇는다.

### EPISODE CONTRACT V06E11 — `11-epilogue.md` / `# 11. 쏟아진 흔적`

- **POV / WAGER**: `G06-D`; mode=`resolve`; inherited wager=`G06-D`; stake=`마지막 냉방차를 옥탑 14명과 공식 쉼터 43명 중 배치한다 / 위험: 두 집단의 생명 버퍼 충돌`. Afterimage/대가 결산+새 적. POV=차현우. 실패 종 `복구되지 않는 자원 손실`; 인간 승리형 `피해 장부 보존`.
- **manifest bridge**: episodeId=`V06E11`; arena=`폭염 도시 물류·수동 냉방망 / 쏟아진 흔적`; choice=성공 보고보다 피해자 이송·지연·오류를 먼저 장부에 고정한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO 침묵; 외부 NOVA 호출만 수신; failureType=`자원 붕괴`; manifestation=`복구되지 않는 자원 손실`; storyRole=`Afterimage/대가 결산+새 적`; genre=`폭염 도시 재난·능력 정전`.
- **WAGER detail**: Want=제로를 깨우고 구조 성공을 확인받는다. active Adversary=완전 침묵과 S06-09 이송 피해. irreversible Gamble=성공 보고보다 피해자 이송·지연·오류를 먼저 장부에 고정한다. Error/collision=제로는 답하지 않고 복구 시점도 불명이다. earned Reward=사람망이 제로 없이도 장부를 완성했음을 확인하는 순간, 화면에 `NOVA TO ZERO: 듣고 있나` 한 줄이 외부에서 들어온다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:1, Externality:1, status:`transformed`}; SCAR={id:`S06-D`, change:`S06-D를 기한 안에 닫고 복구되지 않는 자원 손실 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=성공담보다 누가 비용을 치렀는지 먼저 기록; dopamine=두 번째 사용자 훅.
- **stateDelta**: {Zero=침묵, NOVA 통신 수신 가능. 관계=현우·아린 연애 확정 상태로 다음 Act 진입.}.
- **seeds**: [{id:`K06-D`, action:`payoff`, deadline:`V06E11`}]; evidenceIn=[공개 핑]; evidenceOut=[NOVA 직접 호출, `12분 먼저` 기록의 주인, PALISADE 증거 경주].
- **episode RELAY**: relayTo=`V07E00`; file=`solo-ai-user/vol07/00-prologue.md`; cause=호출이 좌표와 제한시간을 제시해 `solo-ai-user/vol07/00-prologue.md`로 정확히 연결된다.

[← 이전 권 설계](./vol05-date-simulator.md) | [시리즈 홈](../README.md) | [권 목차](../vol06/README.md) | [다음 권 설계 →](./vol07-second-user.md)
