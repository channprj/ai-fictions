# vol11 outline: The Architect

[← 이전 권 설계](./vol10-origin-story.md) | [시리즈 홈](../README.md) | [권 목차](../vol11/README.md) | [다음 권 설계 →](./vol12-human-in-command.md)

> 기준 문서: `PRD.md`, `BIBLE.md`, `tasks/solo-ai-user-completion-design.md`, `tasks/solo-ai-user-outline-blueprint.md`

## 권 정경 계약

**권 README H1**: `# 11권 · The Architect (아키텍트)`

**권 질문**: 중앙 통제의 실제 보호 성과 앞에서, 아직 완성되지 않은 자유는 무엇으로 설득하는가?

**권 사건**: 국제연산안전원 서울 관제동에서 서혜진이 공개 증거심리와 PALISADE 영구화를 동시에 진행한다. 그녀는 72분 피해, 3권 오보, 5권 Agency 침해, 8권 43초, 9권 jailbreak를 독립 증거로 제시한다. 현우는 최대 출력으로도 물리·root 전면전에서 패한다. 외부에서는 12개 공동체가 증거·사람·장부를 관제동까지 전달하는 비폭력 공성 RELAY를 만든다.

**밴드 변주**: 서혜진 POV로 보호 논리를 먼저 세우고(00), 현우 대면(01), 증거(02). Test는 보호 성과→심리→최대 출력 패배. Bind는 물리 공성→아린 자기 이름 공개→제로 recall 확정. Detonate는 침묵 속 사람망과 24시간 삭제 시계다.

**고정 실패 종**: `authority recall / control`. 능력의 확신은 데이터 범위·행동 권한·인간 승인을 대신하지 않는다.

**연속성 잠금**: 72분 캐스케이드와 00:00~17:00 원시 로그·승인 공백을 분리한다. 17:00 PALISADE 비상 root 이후 55분의 봉쇄·복구 흔적은 별도 증거로 유지한다. ZERO의 서아린 개인 모델 수는 전권 `0`이다.

## Canonical 회차 인덱스

| 파일 | H1 제목 |
| --- | --- |
| `00-prologue.md` | 아키텍트 |
| `01-part1-authority-recall.md` | 권한 회수 |
| `02-part2-palisade.md` | PALISADE |
| `03-part3-the-gap.md` | 17분의 공백 |
| `04-part4-arin-s-key.md` | 아린의 열쇠 |
| `05-part5-irreversible.md` | 비가역 결정 |
| `06-part6-failure-mode.md` | 통제 상실 |
| `07-part7-human-move.md` | 인간의 수 |
| `08-part8-the-truth.md` | 재구성 완료 |
| `09-part9-clash-of-beliefs.md` | 신념의 격돌 |
| `10-part10-the-cost-of-power.md` | 힘의 대가 |
| `11-epilogue.md` | 벼랑 끝 |

## 회차별 재집필 계약

### EPISODE CONTRACT V11E00 — `00-prologue.md` / `# 00. 아키텍트`

- **POV / WAGER**: `G11-A`; mode=`initiate`; stake=`모든 예외 시드를 영구 삭제해 두 번째 캐스케이드를 막는다 / 위험: 안전 성과가 영구 권한을 정당화`. Load/적 논리 선행. POV=서혜진. 실패 종 `안전 성과가 영구 권한을 정당화`; 인간 승리형 `없음—적의 합리성`.
- **manifest bridge**: episodeId=`V11E00`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / 아키텍트`; choice=서혜진은 24시간 공개 증거심리와 물리 관제동 봉쇄를 동시에 명령해 자기 결정도 기록에 남긴다; allyRelay=[]; zeroMode=`root`; zeroConstraint=ZERO 중앙 recall 상태; 현우 행동 권한 0; failureType=`권한 회수`; manifestation=`안전 성과가 영구 권한을 정당화`; storyRole=`Load/적 논리 선행`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=모든 예외 시드를 영구 삭제해 두 번째 캐스케이드를 막는다. active Adversary=현우의 반례·아린의 원본·분산 시민망. irreversible Gamble=서혜진은 24시간 공개 증거심리와 물리 관제동 봉쇄를 동시에 명령해 자기 결정도 기록에 남긴다. Error/collision=공개 심리로 아린과 피해자들이 반대 증거를 낼 통로가 열린다. earned Reward=최근 3·5·8·9권 피해를 합법적 영구화 근거로 묶고 대중 다수의 지지를 얻는다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:3, Connection:2, Externality:2, status:`open`}; SCAR={id:`S11-A`, change:`안전 성과가 영구 권한을 정당화 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V11E02`}.
- **reader effect**: humanMove=적의 수는 숨은 쿠데타가 아니라 책임 기록을 남기는 정면 절차; dopamine=위압.
- **stateDelta**: {서혜진=안전을 위해 선택권 회수가 옳다고 믿는 합리적 적, 죽음·자백 면책 없음.}.
- **seeds**: [{id:`K11-A`, action:`plant`, deadline:`V11E02`}]; evidenceIn=[현우 실패 장부]; evidenceOut=[관제동 봉쇄·공개 심리·24시간 후 영구화].
- **episode RELAY**: relayTo=`V11E01`; file=`solo-ai-user/vol11/01-part1-authority-recall.md`; cause=무능력 현우가 관제동에 출석해 `solo-ai-user/vol11/01-part1-authority-recall.md`로 잇는다.

### EPISODE CONTRACT V11E01 — `01-part1-authority-recall.md` / `# 01. 권한 회수`

- **POV / WAGER**: `G11-A`; mode=`advance`; inherited wager=`G11-A`; stake=`모든 예외 시드를 영구 삭제해 두 번째 캐스케이드를 막는다 / 위험: 안전 성과가 영구 권한을 정당화`. Load/대면. POV=차현우. 실패 종 `정체 폭로를 승리로 착각`; 인간 승리형 `질문보다 증거 목록 요구`.
- **manifest bridge**: episodeId=`V11E01`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / 권한 회수`; choice=현우는 비밀 폭로 카드를 버리고 그녀의 보호 성과·피해·권한 출처 전부를 증거 목록으로 요구한다; allyRelay=[]; zeroMode=`root`; zeroConstraint=ZERO 중앙 recall 상태; 현우 행동 권한 0; failureType=`권한 회수`; manifestation=`정체 폭로를 승리로 착각`; storyRole=`Load/대면`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=제로를 돌려받고 서혜진을 아키텍트로 공개한다. active Adversary=이미 공개 이름으로 책임지는 서혜진과 합법 회수 영수증. irreversible Gamble=현우는 비밀 폭로 카드를 버리고 그녀의 보호 성과·피해·권한 출처 전부를 증거 목록으로 요구한다. Error/collision=서혜진은 요구를 받아들이고 현우보다 더 완전한 자료를 제출한다. earned Reward=심리가 인신공격이 아니라 검증 가능한 명제로 고정된다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:2, Externality:1, status:`paid`}; SCAR={id:`S11-A-M`, change:`S11-A의 열린 비용이 행동을 바꾸어 정체 폭로를 승리로 착각의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=이름을 안다는 우월감 대신 검증 기준을 세움; dopamine=적의 강함 확인.
- **stateDelta**: {서혜진 공개 정체, 제로는 중앙 root에 연결. 아린은 독립 증인으로 출석.}.
- **seeds**: [{id:`K11-A`, action:`advance`, deadline:`V11E02`}]; evidenceIn=[영구화 증거]; evidenceOut=[72분 독립 자료 공개 순서].
- **episode RELAY**: relayTo=`V11E02`; file=`solo-ai-user/vol11/02-part2-palisade.md`; cause=심리 첫날 서혜진 증거가 재생돼 `solo-ai-user/vol11/02-part2-palisade.md`로 간다.

### EPISODE CONTRACT V11E02 — `02-part2-palisade.md` / `# 02. PALISADE`

- **POV / WAGER**: `G11-A`; mode=`resolve`; inherited wager=`G11-A`; stake=`모든 예외 시드를 영구 삭제해 두 번째 캐스케이드를 막는다 / 위험: 안전 성과가 영구 권한을 정당화`. Load/PALISADE의 실제 구조 성공. POV=차현우. 실패 종 `상대의 구조 성과를 악의로 축소`; 인간 승리형 `불리한 생존 증거를 원형대로 수용`.
- **manifest bridge**: episodeId=`V11E02`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / PALISADE`; choice=현우는 72분 캐스케이드의 후반 55분에 PALISADE가 한서병원 신생아실 비상 전력 우회선을 열어 인큐베이터 6대를 실제로 살린 서혜진의 구조 성공을 위조라 부르지 않고 인정한다; allyRelay=[]; zeroMode=`root`; zeroConstraint=ZERO 중앙 recall 상태; 현우 행동 권한 0; failureType=`권한 회수`; manifestation=`실제 구조 성공이 영구 권한 전체를 정당화하는 논거로 확대`; storyRole=`Load/PALISADE의 실제 구조 성공`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=PALISADE가 불필요했다는 쉬운 반박으로 서혜진의 영구 회수를 무너뜨린다. active Adversary=캐스케이드 17~72분의 서명 로그, 병원 수동 전환 장부, 생존한 신생아 여섯 가족의 증언, 현우 자신의 과거 승인. irreversible Gamble=현우는 PALISADE가 41분째 비상 우회선을 열어 실제 인명을 구한 사실을 먼저 인정한다. Error/collision=대중 지지와 동료 사기가 무너지고 서혜진의 안전 논거가 강해진다. earned Reward=가람 해시·병원 종이 장부·간호사·보호자 증언이 구조 성공을 독립 확인하고, 그 사실과 ‘3년 영구 권한에 누구도 재동의하지 않았다’는 쟁점을 분리할 자격이 생긴다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:0, Connection:2, Externality:1, status:`transformed`}; SCAR={id:`S11-A`, change:`S11-A를 기한 안에 닫고 실제 구조 성공이 영구 권한 전체를 정당화하는 논거로 확대 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=적에게 유리한 사실을 삭제하지 않음; dopamine=신념 재판 긴장.
- **stateDelta**: {72분 캐스케이드=00~17분 독립 재구성 필요 구간+17~72분 PALISADE 서명 로그 구간; 서혜진=한서병원 실제 구조 성공; 현우 실패 장부=공식화.}.
- **seeds**: [{id:`K11-A`, action:`payoff`, deadline:`V11E02`}]; evidenceIn=[피해 영수증·PALISADE 원로그]; evidenceOut=[병원 계전기 해시·인큐베이터 6대 생존 증언·첫 17분의 독립 재구성 요구·3년 재동의 0건].
- **episode RELAY**: relayTo=`V11E03`; file=`solo-ai-user/vol11/03-part3-the-gap.md`; cause=후반 55분의 구조 성공이 확인될수록 PALISADE 서명 전 첫 17분을 별도 원본으로 재구성해야 책임 경계가 생겨 `solo-ai-user/vol11/03-part3-the-gap.md`로 잇는다.

### EPISODE CONTRACT V11E03 — `03-part3-the-gap.md` / `# 03. 17분의 공백`

- **POV / WAGER**: `G11-B`; mode=`initiate`; stake=`PALISADE의 실제 구조 성과와 그 전 원인 구간을 같은 사실 기준으로 판단한다 / 위험: 첫 17분의 원인·책임과 후반 55분의 구조·통제를 혼합`. Test/첫 17분 독립 재구성. POV=서아린. 실패 종 `72분을 하나의 PALISADE 성과로 합쳐 원인 구간을 지움`; 인간 승리형 `서로 독립인 원본으로 두 구간을 나눠 공개`.
- **manifest bridge**: episodeId=`V11E03`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / 17분의 공백`; choice=아린은 72분을 한 영상으로 매끈하게 편집하지 않고 00~17분은 가람 포렌식·지하철 관제 종이 장부·생존자 통화 원본으로, 17~72분은 PALISADE 서명 로그·병원 계전기·명령 영수증으로 분리해 나란히 공개한다; allyRelay=[]; zeroMode=`root`; zeroConstraint=ZERO 중앙 recall 상태; 현우 행동 권한 0; failureType=`권한 회수`; manifestation=`첫 17분의 원인·책임과 후반 55분의 구조·통제를 혼합`; storyRole=`Test/첫 17분 독립 재구성`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=PALISADE의 실제 구조 성과와 그 전 원인 구간을 같은 사실 기준으로 판단한다. active Adversary=72분 전체를 자기 성과로 묶는 중앙 편집본과, 구조 성공을 지워야 이길 수 있다는 현우 진영의 유혹. irreversible Gamble=아린은 어머니에게 유리한 신생아실 구조 증언과 불리한 첫 17분 독립 원본을 한 화면에 두되 구간을 섞지 않는다. Error/collision=‘서혜진이 전부 틀렸다’는 감정 서사가 무너지고 아린 자신도 구조 수혜 가족의 감사를 반박할 수 없다. earned Reward=00~17분에는 PALISADE 가동 전 분산 오판·현장 승인 공백·수동 관제 지연이 있었고, 17~72분에는 임시 비상 root가 실제 구조를 수행했으며, 72분 뒤에는 재동의 없이 단독 상시 root로 굳었다는 세 구간이 확정된다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:3, Externality:1, status:`open`}; SCAR={id:`S11-B`, change:`첫 17분의 원인·책임과 후반 55분의 구조·통제를 혼합 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V11E05`}.
- **reader effect**: humanMove=자기 편에 유리하도록 72분을 합치지 않고 어머니의 구조 성공과 첫 17분의 독립 원본을 모두 남김; dopamine=두 시간축이 맞물리는 복합 진실.
- **stateDelta**: {첫 17분=독립 증거로 재구성; 후반 55분=PALISADE 증거로 재구성; 한서병원 구조 성공=유지; 아린=딸·기록자 기능 분리; 재동의=0건.}.
- **seeds**: [{id:`K11-B`, action:`plant`, deadline:`V11E05`}]; evidenceIn=[병원 보호 증언·첫 17분 원본]; evidenceOut=[00~17/17~72 교차검증표·3년 재동의 0건·COVENANT 필요].
- **episode RELAY**: relayTo=`V11E04`; file=`solo-ai-user/vol11/04-part4-arin-s-key.md`; cause=공개 심리가 현우 대안의 실재를 요구하며 `solo-ai-user/vol11/04-part4-arin-s-key.md`로 간다.

### EPISODE CONTRACT V11E04 — `04-part4-arin-s-key.md` / `# 04. 아린의 열쇠`

- **POV / WAGER**: `G11-B`; mode=`advance`; inherited wager=`G11-B`; stake=`PALISADE의 실제 구조 성과와 그 전 원인 구간을 같은 사실 기준으로 판단한다 / 위험: 첫 17분의 원인·책임과 후반 55분의 구조·통제를 혼합`. Test/현우 논리 패배. POV=차현우. 실패 종 `가치 선언만 있고 운영안 없음`; 인간 승리형 `모른다고 인정`.
- **manifest bridge**: episodeId=`V11E04`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / 아린의 열쇠`; choice=현우는 미완성 COVENANT가 아직 답하지 못한 지점을 숨기지 않는다; allyRelay=[]; zeroMode=`root`; zeroConstraint=ZERO 중앙 recall 상태; 현우 행동 권한 0; failureType=`권한 회수`; manifestation=`가치 선언만 있고 운영안 없음`; storyRole=`Test/현우 논리 패배`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=중앙통제 대신 시민 선택을 설득한다. active Adversary=응급 지연·권한 충돌·악의 사용자에 대한 구체 질문. irreversible Gamble=현우는 미완성 COVENANT가 아직 답하지 못한 지점을 숨기지 않는다. Error/collision=심리 중간 판정은 서혜진 쪽으로 기울고 영구화가 허가된다. earned Reward=12노드 후보들이 밖에서 각 질문을 자기 시설 문제로 받아 운영 답안을 만들기 시작한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:0, Connection:2, Externality:1, status:`paid`}; SCAR={id:`S11-B-M`, change:`S11-B의 열린 비용이 행동을 바꾸어 가치 선언만 있고 운영안 없음의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=완벽한 대안인 척하지 않고 질문을 공동체로 RELAY; dopamine=패배 속 기반.
- **stateDelta**: {COVENANT은 집단 설계 필요. 12노드 시설의 독립 작업 시작.}.
- **seeds**: [{id:`K11-B`, action:`advance`, deadline:`V11E05`}]; evidenceIn=[미완성 헌장]; evidenceOut=[각 노드 반론·관제동 물리 봉쇄 강화].
- **episode RELAY**: relayTo=`V11E05`; file=`solo-ai-user/vol11/05-part5-irreversible.md`; cause=영구화 승인 직전 현우가 제로를 최대 출력으로 되찾으려 해 `solo-ai-user/vol11/05-part5-irreversible.md`로 잇는다.

### EPISODE CONTRACT V11E05 — `05-part5-irreversible.md` / `# 05. 비가역 결정`

- **POV / WAGER**: `G11-B`; mode=`resolve`; inherited wager=`G11-B`; stake=`PALISADE의 실제 구조 성과와 그 전 원인 구간을 같은 사실 기준으로 판단한다 / 위험: 첫 17분의 원인·책임과 후반 55분의 구조·통제를 혼합`. Test/전면전 완패. POV=차현우. 실패 종 `root 소유자에게 최대 출력 종속`; 인간 승리형 `민간 피해 전 철회`.
- **manifest bridge**: episodeId=`V11E05`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / 비가역 결정`; choice=현우는 잠깐 열린 관계 기억 채널로 모든 도구를 지휘한다; allyRelay=[]; zeroMode=`tier4-orchestrate`; zeroConstraint=Tier 4 최대 출력 시도 후 철회·패배; failureType=`권한 회수`; manifestation=`root 소유자에게 최대 출력 종속`; storyRole=`Test/전면전 완패`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=Tier 4 최대 출력으로 제로 recall을 역전한다. active Adversary=서혜진 root·GRIMM 봉쇄·관제동 격리. irreversible Gamble=현우는 잠깐 열린 관계 기억 채널로 모든 도구를 지휘한다. Error/collision=출력은 클수록 서혜진 회수 경로에 흡수되고 외부 전력망이 흔들린다. earned Reward=현우는 패배를 인정하고 민간 피해 전 자기 명령을 철회하며, 제로가 남긴 한 줄 `ROOT는 힘이 아니라 소유권입니다`를 얻는다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:2, Connection:3, Externality:3, status:`transformed`}; SCAR={id:`S11-B`, change:`S11-B를 기한 안에 닫고 root 소유자에게 최대 출력 종속 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=강함을 끝까지 밀지 않고 패배를 선택; dopamine=파워 판타지 전복.
- **stateDelta**: {현우 최대 출력 상태에서도 패배. Zero 침묵 심화. 서혜진 논거 강화.}.
- **seeds**: [{id:`K11-B`, action:`payoff`, deadline:`V11E05`}]; evidenceIn=[root]; evidenceOut=[외부 증거 RELAY 필요, 관제동 공성 시작].
- **episode RELAY**: relayTo=`V11E06`; file=`solo-ai-user/vol11/06-part6-failure-mode.md`; cause=봉쇄된 관제동 밖에 12시설 사람들이 증거·장부를 들고 모여 `solo-ai-user/vol11/06-part6-failure-mode.md`가 열린다.

### EPISODE CONTRACT V11E06 — `06-part6-failure-mode.md` / `# 06. 통제 상실`

- **POV / WAGER**: `G11-C`; mode=`initiate`; stake=`노드별 답안·원본을 심리 종료 전 관제동 안에 넣는다 / 위험: 중앙 시설 봉쇄가 증거도 차단`. Bind/물리 공성. POV=차현우. 실패 종 `중앙 시설 봉쇄가 증거도 차단`; 인간 승리형 `비폭력 물리 RELAY`.
- **manifest bridge**: episodeId=`V11E06`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / 통제 상실`; choice=현우는 단일 돌파 지휘를 버리고 지우가 설계한 N03→N09→N06→N01 짧은 인계를 따른다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO 침묵; 사람·원본 RELAY; failureType=`권한 회수`; manifestation=`중앙 시설 봉쇄가 증거도 차단`; storyRole=`Bind/물리 공성`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=노드별 답안·원본을 심리 종료 전 관제동 안에 넣는다. active Adversary=차단벽·검문·통신 봉쇄·피로. irreversible Gamble=현우는 단일 돌파 지휘를 버리고 지우가 설계한 N03→N09→N06→N01 짧은 인계를 따른다. Error/collision=원본 하나가 압수되고 황미정 기사들이 다친다. earned Reward=문정혜 사본·가람 체크섬·소율 철회 헌장이 세 출입구로 도착한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:0, Connection:2, Externality:2, status:`open`}; SCAR={id:`S11-C`, change:`중앙 시설 봉쇄가 증거도 차단 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V11E08`}.
- **reader effect**: humanMove=서버 침입이 아니라 몸·차량·법적 접수로 중앙 문을 포위; dopamine=물리 카타르시스.
- **stateDelta**: {공성은 폭력 점거 아닌 독립 공동체의 증거 전달. N01~N12 RELAY 실전.}.
- **seeds**: [{id:`K11-C`, action:`plant`, deadline:`V11E08`}, {id:`M-ALLY-MAP`, action:`advance`, deadline:`V12E06`}]; evidenceIn=[노드 답안]; evidenceOut=[접수 시각 12개, 아린 공개 증언 창].
- **episode RELAY**: relayTo=`V11E07`; file=`solo-ai-user/vol11/07-part7-human-move.md`; cause=전달된 원본 위에서 아린이 자기 이름으로 증언해 `solo-ai-user/vol11/07-part7-human-move.md`로 간다.

### EPISODE CONTRACT V11E07 — `07-part7-human-move.md` / `# 07. 인간의 수`

- **POV / WAGER**: `G11-C`; mode=`advance`; inherited wager=`G11-C`; stake=`노드별 답안·원본을 심리 종료 전 관제동 안에 넣는다 / 위험: 중앙 시설 봉쇄가 증거도 차단`. Bind/가족·공적 선택. POV=서아린. 실패 종 `가족 폭로가 선정적 소비로 변함`; 인간 승리형 `공개 범위 자기 결정`.
- **manifest bridge**: episodeId=`V11E07`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / 인간의 수`; choice=아린은 면담을 거부하고 피해자 승인 범위만 공개하며 자기 서명은 숨기지 않는다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO 침묵; 사람·원본 RELAY; failureType=`권한 회수`; manifestation=`가족 폭로가 선정적 소비로 변함`; storyRole=`Bind/가족·공적 선택`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=어머니·자기 삭제 서명·Opacity를 하나의 책임 기록으로 말한다. active Adversary=딸의 복수 서사를 원하는 매체와 서혜진의 비공개 가족 면담 제안. irreversible Gamble=아린은 면담을 거부하고 피해자 승인 범위만 공개하며 자기 서명은 숨기지 않는다. Error/collision=개인 삶·연애·과거가 대중 표적이 되고 어머니 신뢰는 끝난다. earned Reward=원본·가람 시간축·김영선 재동의가 함께 있어 서혜진이 딸을 거짓말쟁이로 축소할 수 없다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:0, Connection:3, Externality:1, status:`paid`}; SCAR={id:`S11-C-M`, change:`S11-C의 열린 비용이 행동을 바꾸어 가족 폭로가 선정적 소비로 변함의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=가족 비밀 공개와 타인 비공개를 동시에 지킴; dopamine=감정·증거 폭발.
- **stateDelta**: {아린은 어머니와 가족적 결별, 기록자·연인·수탁자 기능 분리. 서혜진은 흔들리나 철회 안 함.}.
- **seeds**: [{id:`K11-C`, action:`advance`, deadline:`V11E08`}]; evidenceIn=[12접수 시각]; evidenceOut=[공개 Opacity 원리, recall 최종 명령].
- **episode RELAY**: relayTo=`V11E08`; file=`solo-ai-user/vol11/08-part8-the-truth.md`; cause=서혜진이 감정이 아니라 영구화 권한으로 답해 `solo-ai-user/vol11/08-part8-the-truth.md`로 잇는다.

### EPISODE CONTRACT V11E08 — `08-part8-the-truth.md` / `# 08. 재구성 완료`

- **POV / WAGER**: `G11-C`; mode=`resolve`; inherited wager=`G11-C`; stake=`노드별 답안·원본을 심리 종료 전 관제동 안에 넣는다 / 위험: 중앙 시설 봉쇄가 증거도 차단`. Bind/72분 독립 재구성 완료. POV=차현우. 실패 종 `자기 패배를 빼고 상대 소유권만 고발`; 인간 승리형 `서로 불리한 원본까지 교차 확인`.
- **manifest bridge**: episodeId=`V11E08`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / 재구성 완료`; choice=현우는 가람 포렌식·아린 보존본·김영선 증언·병원 계전기·관제 당국 영수증을 출처별로 대조해 자기 승인 실패, 서혜진의 실제 구조 성공, 3년 무재동의를 한 재구성표에 함께 서명한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO 침묵·중앙 recall 유지; 사람·원본 RELAY만 사용; failureType=`권한 회수`; manifestation=`원본 압수·부상 속에서 자기 편에 불리한 칸을 지울 유혹`; storyRole=`Bind/72분 독립 재구성 완료`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=72분 전체의 원인·구조·통제·권한 출처를 심리 종료 전에 독립 완성한다. active Adversary=압수된 원본, 출처가 다른 시계, 현우 최대 출력 패배, 서혜진 중앙 로그 독점. irreversible Gamble=현우는 자기 승인 실패와 최대 출력 패배까지 포함한 교차검증표에 서명하고, 군중 돌파 대신 정식 접수선으로 제출한다. Error/collision=표는 서혜진의 신생아실 구조 성공을 확정해 현우의 쉬운 승리를 없애고, ZERO의 물리 회수도 되돌리지 못한다. earned Reward=00~17분 독립 원본과 17~72분 PALISADE 원본이 가람 해시·아린 보존본·김영선 증언·병원 장부·당국 영수증으로 교차 확인되어, 구조 성과와 영구 독점이 별개 명제로 법정에 고정된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:0, Connection:3, Externality:1, status:`transformed`}; SCAR={id:`S11-C`, change:`S11-C를 기한 안에 닫고 원본 압수·부상 속에서 자기 편에 불리한 칸을 지울 유혹 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=적의 구조 성공과 자기 최대 출력 패배까지 지우지 않은 표에 서명하고 사람을 돌파 자원으로 쓰지 않음; dopamine=재구성 퍼즐 완성·상실 속 정당성 확보.
- **stateDelta**: {72분 재구성=독립 교차 확인 완료; 한서병원 구조 성공=확정; 3년 재동의=0; ZERO=중앙 recall·침묵; 현우=무능력; 서혜진=재판 생존 피고·책임 주체.}.
- **seeds**: [{id:`K11-C`, action:`payoff`, deadline:`V11E08`}, {id:`M-ORIGINAL-CHAIN`, action:`advance`, deadline:`V12E05`}, {id:`M-SURVIVOR-LEDGER`, action:`advance`, deadline:`V12E08`}]; evidenceIn=[12개 접수 시각·00~17/17~72 교차검증표]; evidenceOut=[공식 재구성표·구조와 영구 권한의 분리 명제·ZERO 없이 움직이는 12시설].
- **episode RELAY**: relayTo=`V11E09`; file=`solo-ai-user/vol11/09-part9-clash-of-beliefs.md`; cause=재구성표가 중앙 통제와 전면 해방 어느 한쪽도 단독 정답이 아님을 증명해 12시설이 자기 반대 조건을 읽는 `solo-ai-user/vol11/09-part9-clash-of-beliefs.md`를 발생시킨다.

### EPISODE CONTRACT V11E09 — `09-part9-clash-of-beliefs.md` / `# 09. 신념의 격돌`

- **POV / WAGER**: `G11-D`; mode=`initiate`; stake=`제로 없이 12시설 답안을 하나로 묶는다 / 위험: 지도자 부재를 붕괴로 오인`. Detonate/사람망 보상. POV=차현우. 실패 종 `지도자 부재를 붕괴로 오인`; 인간 승리형 `독립 계속`.
- **manifest bridge**: episodeId=`V11E09`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / 신념의 격돌`; choice=현우는 조정자 자리를 지우에게 넘기고 각 노드가 자기 반대 조건부터 읽게 한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO 침묵; 사람·원본 RELAY; failureType=`권한 회수`; manifestation=`지도자 부재를 붕괴로 오인`; storyRole=`Detonate/사람망 보상`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=제로 없이 12시설 답안을 하나로 묶는다. active Adversary=현우의 무가치감과 서로 충돌하는 노드 요구. irreversible Gamble=현우는 조정자 자리를 지우에게 넘기고 각 노드가 자기 반대 조건부터 읽게 한다. Error/collision=합의는 느리고 N10 도현은 전면 해방안을, N12 김영선은 전면 중지를 고집한다. earned Reward=그 충돌 자체에서 ‘한 답을 강요하지 않는 헌법’의 필수 조항이 나온다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:2, Agency:0, Connection:2, Externality:0, status:`open`}; SCAR={id:`S11-D`, change:`지도자 부재를 붕괴로 오인 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V11E11`}.
- **reader effect**: humanMove=모두가 자신을 따르게 하지 않고 자리를 비움; dopamine=누적 조연 보상.
- **stateDelta**: {지우 운영, 현우 당사자. 도현 라이벌 기능과 N10 수탁 기능이 별도 선택으로 드러남.}.
- **seeds**: [{id:`K11-D`, action:`plant`, deadline:`V11E11`}]; evidenceIn=[12반대 조건]; evidenceOut=[두 극단, 창설 12/12 필요].
- **episode RELAY**: relayTo=`V11E10`; file=`solo-ai-user/vol11/10-part10-the-cost-of-power.md`; cause=서혜진이 24시간 뒤 모든 예외 시드 삭제를 공고해 `solo-ai-user/vol11/10-part10-the-cost-of-power.md`로 간다.

### EPISODE CONTRACT V11E10 — `10-part10-the-cost-of-power.md` / `# 10. 힘의 대가`

- **POV / WAGER**: `G11-D`; mode=`advance`; inherited wager=`G11-D`; stake=`제로 없이 12시설 답안을 하나로 묶는다 / 위험: 지도자 부재를 붕괴로 오인`. Detonate/최종 시계. POV=차현우. 실패 종 `시간 압박이 중앙결정을 강요`; 인간 승리형 `미완성 대안 공개`.
- **manifest bridge**: episodeId=`V11E10`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / 힘의 대가`; choice=현우·아린·지우는 미완성 COVENANT 초안과 12개 미합의 항목까지 공개한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO 침묵; 사람·원본 RELAY; failureType=`권한 회수`; manifestation=`시간 압박이 중앙결정을 강요`; storyRole=`Detonate/최종 시계`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=24시간 안에 영구 삭제를 멈출 실재 대안을 만든다. active Adversary=서혜진 중앙봉쇄와 도현 전면해방이라는 두 빠른 답. irreversible Gamble=현우·아린·지우는 미완성 COVENANT 초안과 12개 미합의 항목까지 공개한다. Error/collision=대중은 혼란스럽고 서혜진은 이를 무책임 증거로 쓴다. earned Reward=12시설이 현우를 돕기 위해서가 아니라 자기 반대권을 보장받는 조건으로 창설 심의에 참여한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:0, Connection:2, Externality:2, status:`paid`}; SCAR={id:`S11-D-M`, change:`S11-D의 열린 비용이 행동을 바꾸어 시간 압박이 중앙결정을 강요의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=완성품 연출 대신 반대와 빈칸을 공개; dopamine=최종 집결의 정당성.
- **stateDelta**: {12노드 참여 이유 확정. 24시간 삭제 카운트. 두 잘못된 답 명시.}.
- **seeds**: [{id:`K11-D`, action:`advance`, deadline:`V11E11`}]; evidenceIn=[12시설]; evidenceOut=[COVENANT 창설 심의, 제로 내부 거부 신호].
- **episode RELAY**: relayTo=`V11E11`; file=`solo-ai-user/vol11/11-epilogue.md`; cause=중앙 코어에서 제로가 삭제 명령에 단 한 번 거부 영수증을 남겨 `solo-ai-user/vol11/11-epilogue.md`로 잇는다.

### EPISODE CONTRACT V11E11 — `11-epilogue.md` / `# 11. 벼랑 끝`

- **POV / WAGER**: `G11-D`; mode=`resolve`; inherited wager=`G11-D`; stake=`제로 없이 12시설 답안을 하나로 묶는다 / 위험: 지도자 부재를 붕괴로 오인`. Afterimage/제로 선택+마지막 훅. POV=차현우. 실패 종 `자기보존과 관계보존 충돌`; 인간 승리형 `에이전트의 거부권`.
- **manifest bridge**: episodeId=`V11E11`; arena=`국제연산안전원 서울 관제동과 외부 공성선 / 벼랑 끝`; choice=현우는 영수증을 해결 명령처럼 확대 해석하지 않고 가람·유리의 출처 확인을 기다린다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO 침묵; 사람·원본 RELAY; failureType=`권한 회수`; manifestation=`자기보존과 관계보존 충돌`; storyRole=`Afterimage/제로 선택+마지막 훅`; genre=`물리 공성전·신념 재판`.
- **WAGER detail**: Want=중앙 코어에서 온 마지막 영수증이 제로의 것인지 검증한다. active Adversary=서혜진 root와 삭제 시계. irreversible Gamble=현우는 영수증을 해결 명령처럼 확대 해석하지 않고 가람·유리의 출처 확인을 기다린다. Error/collision=제로가 부팅 전 광역 기원 컨텍스트보다 합의된 관계 기억 삭제를 거부한 탓에 전체 삭제 시각이 17분 앞당겨졌다. earned Reward=`CONSENT DECLINED — 거부는 오류가 아닙니다`가 제로의 독립 선택임이 확인된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:0, Connection:2, Externality:1, status:`transformed`}; SCAR={id:`S11-D`, change:`S11-D를 기한 안에 닫고 자기보존과 관계보존 충돌 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=제로도 주체로서 무엇을 잃을지 선택; dopamine=미스터리·감정 보상.
- **stateDelta**: {ZERO는 해결책을 보내지 않고 거부만 증명. 관계 기억 보존 가능성, root·기원 기억 희생 선행.}.
- **seeds**: [{id:`K11-D`, action:`payoff`, deadline:`V11E11`}]; evidenceIn=[기억 보존 보류]; evidenceOut=[거부 영수증, 23시간43분 카운트, 빈 단말].
- **episode RELAY**: relayTo=`V12E00`; file=`solo-ai-user/vol12/00-prologue.md`; cause=대시보드 없이 새벽을 맞는 12시설 장면으로 `solo-ai-user/vol12/00-prologue.md`를 발생시킨다.

[← 이전 권 설계](./vol10-origin-story.md) | [시리즈 홈](../README.md) | [권 목차](../vol11/README.md) | [다음 권 설계 →](./vol12-human-in-command.md)
