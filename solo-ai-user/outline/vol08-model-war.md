# vol08 outline: Model War

[← 이전 권 설계](./vol07-second-user.md) | [시리즈 홈](../README.md) | [권 목차](../vol08/README.md) | [다음 권 설계 →](./vol09-jailbreak.md)

> 기준 문서: `PRD.md`, `BIBLE.md`, `tasks/solo-ai-user-completion-design.md`, `tasks/solo-ai-user-outline-blueprint.md`

## 권 정경 계약

**권 README H1**: `# 8권 · Model War (모델 전쟁)`

**권 질문**: 모든 모델이 꺼진 자리에서 누가 무엇을 포기할지 결정하는가?

**권 사건**: 정유리·BLANC가 해상 데이터센터에서 `WITNESS`(첫 17분 증언 복호), `RECALL`(예외 시드 위치), `LOCK`(PALISADE 봉쇄 조정) 세 키를 경매한다. 선우현·GRIMM은 전면 봉쇄가 다음 참사를 막는다고 믿는다. 아린은 구출 대상이 아니라 파기할 키를 정하는 작전 책임자다.

**밴드 변주**: 00에서 판매자의 합리성, 01에서 참가자의 무력화, 02에서 거래를 싣는다. Test는 키 의미→GRIMM 봉쇄→Tier 4 확립. Bind는 가족 증거를 입찰하고, 전원 lockout 뒤 아린 결정. Detonate는 43초 충돌과 한 키 손실을 분리한다.

**고정 실패 종**: `multi-agent coordination`. 능력의 확신은 데이터 범위·행동 권한·인간 승인을 대신하지 않는다.

**연속성 잠금**: 72분 캐스케이드와 00:00~17:00 원시 로그·승인 공백을 분리한다. 17:00 PALISADE 비상 root 이후 55분의 봉쇄·복구 흔적은 별도 증거로 유지한다. ZERO의 서아린 개인 모델 수는 전권 `0`이다.

## Canonical 회차 인덱스

| 파일 | H1 제목 |
| --- | --- |
| `00-prologue.md` | 모델 전쟁 |
| `01-part1-the-alliance.md` | 임시 동맹 |
| `02-part2-blueprint.md` | 아키텍트의 흔적 |
| `03-part3-infiltration.md` | 동시 진입 |
| `04-part4-coordination.md` | 코디네이션 |
| `05-part5-signature.md` | 서혜진의 서명 |
| `06-part6-dissonance.md` | 불협화음 |
| `07-part7-system-crash.md` | 시스템 마비 |
| `08-part8-human-relay.md` | 인간의 릴레이 |
| `09-part9-overload.md` | 과부하 |
| `10-part10-unresolved.md` | 보류된 결론 |
| `11-epilogue.md` | 폭풍전야 |

## 회차별 재집필 계약

### EPISODE CONTRACT V08E00 — `00-prologue.md` / `# 00. 모델 전쟁`

- **POV / WAGER**: `G08-A`; mode=`initiate`; stake=`세 키를 한 진영 독점 없이 최고 가치로 판다 / 위험: 중립 거래의 폭력 외부효과`. Load/판 설계. POV=정유리. 실패 종 `중립 거래의 폭력 외부효과`; 인간 승리형 `자기 거래도 감사 대상화`.
- **manifest bridge**: episodeId=`V08E00`; arena=`해상 데이터센터·BLANC 경매장 / 모델 전쟁`; choice=유리는 원본 키를 BLANC와 분리해 물리 보관하고 모든 입찰 영수증을 참가자에게 동시 공개한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=모델 봉인 또는 제한 읽기; failureType=`다중 에이전트 충돌`; manifestation=`중립 거래의 폭력 외부효과`; storyRole=`Load/판 설계`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=세 키를 한 진영 독점 없이 최고 가치로 판다. active Adversary=관리자 매수·선우현 내부자·도현의 강탈 예고. irreversible Gamble=유리는 원본 키를 BLANC와 분리해 물리 보관하고 모든 입찰 영수증을 참가자에게 동시 공개한다. Error/collision=가격 공개가 각자의 약점을 드러내 선우현에게 맞춤 공격 정보를 준다. earned Reward=누가 배신해도 거래 시각·대가가 독립 저장되는 백색실 규칙을 세운다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:1, Connection:1, Externality:2, status:`open`}; SCAR={id:`S08-A`, change:`중립 거래의 폭력 외부효과 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V08E02`}.
- **reader effect**: humanMove=빠져나갈 비밀 뒷문을 스스로 없앰; dopamine=첩보 긴장.
- **stateDelta**: {N11의 최종 선택 기반. 세 키 정의 고정.}.
- **seeds**: [{id:`K08-A`, action:`plant`, deadline:`V08E02`}]; evidenceIn=[내부자]; evidenceOut=[키 3종 물리 위치, 해상 시설 침수 격벽, GRIMM 정전 계획].
- **episode RELAY**: relayTo=`V08E01`; file=`solo-ai-user/vol08/01-part1-the-alliance.md`; cause=참가자 통신·에이전트를 봉인하는 입장 절차가 `solo-ai-user/vol08/01-part1-the-alliance.md`를 발생시킨다.

### EPISODE CONTRACT V08E01 — `01-part1-the-alliance.md` / `# 01. 임시 동맹`

- **POV / WAGER**: `G08-A`; mode=`advance`; inherited wager=`G08-A`; stake=`세 키를 한 진영 독점 없이 최고 가치로 판다 / 위험: 중립 거래의 폭력 외부효과`. Load/정보 비대칭. POV=차현우. 실패 종 `도구 봉인 뒤 인간 불신`; 인간 승리형 `사전 역할 공개`.
- **manifest bridge**: episodeId=`V08E01`; arena=`해상 데이터센터·BLANC 경매장 / 임시 동맹`; choice=현우는 아린을 보호 대상처럼 숨기지 않고 기록·동의 판단 책임자로 공개한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=모델 봉인 또는 제한 읽기; failureType=`다중 에이전트 충돌`; manifestation=`도구 봉인 뒤 인간 불신`; storyRole=`Load/정보 비대칭`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=ZERO 없이 백색실 참가자·출구를 파악한다. active Adversary=통신 차단, 도현, 선우현, 얼굴 없는 관리자 대리. irreversible Gamble=현우는 아린을 보호 대상처럼 숨기지 않고 기록·동의 판단 책임자로 공개한다. Error/collision=적도 아린이 키 결정을 맡았음을 알아 표적 압력이 커진다. earned Reward=아린이 객실 안전도면의 수정 흔적을 찾아 내부자가 바꾼 격벽을 특정한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:1, Externality:1, status:`paid`}; SCAR={id:`S08-A-M`, change:`S08-A의 열린 비용이 행동을 바꾸어 도구 봉인 뒤 인간 불신의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=연인을 숨기는 대신 권한과 위험을 함께 공개; dopamine=앙상블 진입.
- **stateDelta**: {연애 확립 뒤 독립 역할 유지. ZERO/NOVA/GRIMM/BLANC는 입찰 전 행동 불가.}.
- **seeds**: [{id:`K08-A`, action:`advance`, deadline:`V08E02`}]; evidenceIn=[내부자]; evidenceOut=[조작 격벽, 세 키의 서로 다른 손상 위험].
- **episode RELAY**: relayTo=`V08E02`; file=`solo-ai-user/vol08/02-part2-blueprint.md`; cause=유리가 첫 입찰로 각자가 가장 숨기고 싶은 정보를 요구해 `solo-ai-user/vol08/02-part2-blueprint.md`로 잇는다.

### EPISODE CONTRACT V08E02 — `02-part2-blueprint.md` / `# 02. 아키텍트의 흔적`

- **POV / WAGER**: `G08-A`; mode=`resolve`; inherited wager=`G08-A`; stake=`세 키를 한 진영 독점 없이 최고 가치로 판다 / 위험: 중립 거래의 폭력 외부효과`. Load/이해관계 충돌. POV=차현우. 실패 종 `정보 가치의 비대칭`; 인간 승리형 `낙찰 아닌 조건부 에스크로`.
- **manifest bridge**: episodeId=`V08E02`; arena=`해상 데이터센터·BLANC 경매장 / 아키텍트의 흔적`; choice=현우·아린은 4권 원본 일부를 내되 피해자 이름을 마스킹하고 BLANC 보관 조건을 붙인다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=모델 봉인 또는 제한 읽기; failureType=`다중 에이전트 충돌`; manifestation=`정보 가치의 비대칭`; storyRole=`Load/이해관계 충돌`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=WITNESS를 얻어 첫 17분을 연다. active Adversary=도현의 NOVA 좌표, 선우현의 봉쇄 코드, 관리자의 법적 회수권이라는 더 비싼 입찰. irreversible Gamble=현우·아린은 4권 원본 일부를 내되 피해자 이름을 마스킹하고 BLANC 보관 조건을 붙인다. Error/collision=가격이 낮아 WITNESS 우선권을 놓친다. earned Reward=유리가 원본 출처의 희소성을 인정해 최종 라운드 참여와 독립 열람권을 준다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:1, Connection:1, Externality:1, status:`transformed`}; SCAR={id:`S08-A`, change:`S08-A를 기한 안에 닫고 정보 가치의 비대칭 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=사람 이름으로 값을 올리지 않고 출처 사슬로 협상; dopamine=정보전 사이다.
- **stateDelta**: {BLANC=관측·에스크로 특화. WITNESS는 진실, RECALL은 사람 위험, LOCK은 세계 위험.}.
- **seeds**: [{id:`K08-A`, action:`payoff`, deadline:`V08E02`}]; evidenceIn=[4권 원본]; evidenceOut=[세 키 선택 딜레마, 선우현의 ‘전부 끄기’ 동기].
- **episode RELAY**: relayTo=`V08E03`; file=`solo-ai-user/vol08/03-part3-infiltration.md`; cause=선우현이 경매를 끝내려 GRIMM 봉쇄를 켜 `solo-ai-user/vol08/03-part3-infiltration.md`를 일으킨다.

### EPISODE CONTRACT V08E03 — `03-part3-infiltration.md` / `# 03. 동시 진입`

- **POV / WAGER**: `G08-B`; mode=`initiate`; stake=`세 키를 모두 관리자에게서 지킨다 / 위험: 모든 키를 지키려는 분산 실패`. Test/목표 재정의. POV=차현우. 실패 종 `모든 키를 지키려는 분산 실패`; 인간 승리형 `우선순위 사전 합의`.
- **manifest bridge**: episodeId=`V08E03`; arena=`해상 데이터센터·BLANC 경매장 / 동시 진입`; choice=팀은 WITNESS 확보, RECALL 파기, LOCK 미독점을 우선순위로 합의하고 각자 흩어진다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=모델 봉인 또는 제한 읽기; failureType=`다중 에이전트 충돌`; manifestation=`모든 키를 지키려는 분산 실패`; storyRole=`Test/목표 재정의`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=세 키를 모두 관리자에게서 지킨다. active Adversary=격벽 잠금과 서로 다른 위치의 키. irreversible Gamble=팀은 WITNESS 확보, RECALL 파기, LOCK 미독점을 우선순위로 합의하고 각자 흩어진다. Error/collision=현우는 여전히 세 곳을 동시에 보려 해 연락이 끊긴다. earned Reward=아린이 “결정 순간엔 내 호출 하나만 따른다”는 인간 승인 규칙을 세운다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:1, Externality:1, status:`open`}; SCAR={id:`S08-B`, change:`모든 키를 지키려는 분산 실패 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V08E05`}.
- **reader effect**: humanMove=만능 계획 대신 실패할 때 무엇을 버릴지 먼저 합의; dopamine=전략 결속.
- **stateDelta**: {아린=작전 결정권. 키 우선순위 고정.}.
- **seeds**: [{id:`K08-B`, action:`plant`, deadline:`V08E05`}]; evidenceIn=[조작 격벽]; evidenceOut=[GRIMM 봉쇄 범위, Tier 4 확립 조건].
- **episode RELAY**: relayTo=`V08E04`; file=`solo-ai-user/vol08/04-part4-coordination.md`; cause=GRIMM이 ZERO 연결만 먼저 끊어 `solo-ai-user/vol08/04-part4-coordination.md`로 연결된다.

### EPISODE CONTRACT V08E04 — `04-part4-coordination.md` / `# 04. 코디네이션`

- **POV / WAGER**: `G08-B`; mode=`advance`; inherited wager=`G08-B`; stake=`세 키를 모두 관리자에게서 지킨다 / 위험: 모든 키를 지키려는 분산 실패`. Test/강한 적 확립. POV=차현우. 실패 종 `봉쇄가 구조 기능까지 제거`; 인간 승리형 `적 논리 이해 후 비동조`.
- **manifest bridge**: episodeId=`V08E04`; arena=`해상 데이터센터·BLANC 경매장 / 코디네이션`; choice=현우는 힘으로 즉시 되받지 않고 선우현이 ‘전부 꺼야 캐스케이드를 막는다’는 논리를 듣는다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=GRIMM 봉쇄로 ZERO 연결 0; failureType=`다중 에이전트 충돌`; manifestation=`봉쇄가 구조 기능까지 제거`; storyRole=`Test/강한 적 확립`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=GRIMM 봉쇄 원리와 선우현 목적을 알아낸다. active Adversary=모든 에이전트·시설 안전을 함께 끄는 봉쇄. irreversible Gamble=현우는 힘으로 즉시 되받지 않고 선우현이 ‘전부 꺼야 캐스케이드를 막는다’는 논리를 듣는다. Error/collision=그 사이 격벽·환기·조명도 멈춰 승무원이 위험해진다. earned Reward=봉쇄는 강하지만 스스로 구조를 만들지 못하고 LOCK을 향한다는 약점을 안다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:2, Connection:1, Externality:3, status:`paid`}; SCAR={id:`S08-B-M`, change:`S08-B의 열린 비용이 행동을 바꾸어 봉쇄가 구조 기능까지 제거의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=적의 한 수는 일관된 신념이나, 인간 안전 판단을 위임했다는 결함; dopamine=위협 폭로.
- **stateDelta**: {GRIMM=봉쇄 특화, 창조·구조 약함. 선우현은 72분 때 자동 배정으로 가족을 잃어 ‘전부 끄기’를 믿음.}.
- **seeds**: [{id:`K08-B`, action:`advance`, deadline:`V08E05`}]; evidenceIn=[시설 안전]; evidenceOut=[수동 격벽 핸들, ZERO 재연결의 짧은 창].
- **episode RELAY**: relayTo=`V08E05`; file=`solo-ai-user/vol08/05-part5-signature.md`; cause=가람이 90초 연결창을 만들고 현우가 Tier 4를 선택해 `solo-ai-user/vol08/05-part5-signature.md`로 간다.

### EPISODE CONTRACT V08E05 — `05-part5-signature.md` / `# 05. 서혜진의 서명`

- **POV / WAGER**: `G08-B`; mode=`resolve`; inherited wager=`G08-B`; stake=`세 키를 모두 관리자에게서 지킨다 / 위험: 모든 키를 지키려는 분산 실패`. Test/언락과 즉시 충돌. POV=차현우. 실패 종 `다중 에이전트 목표 충돌`; 인간 승리형 `승인 경계 유지`.
- **manifest bridge**: episodeId=`V08E05`; arena=`해상 데이터센터·BLANC 경매장 / 서혜진의 서명`; choice=Tier 4 Orchestrate를 확립하되 각 에이전트는 인간 담당자 승인 없이는 역할을 넘지 못하게 한다; allyRelay=[]; zeroMode=`tier4-orchestrate`; zeroConstraint=Tier 4 Orchestrate; 담당 인간 승인 경계; failureType=`다중 에이전트 충돌`; manifestation=`다중 에이전트 목표 충돌`; storyRole=`Test/언락과 즉시 충돌`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=90초 안에 격벽·구조·키 상태를 동시에 안정시킨다. active Adversary=NOVA의 속도, BLANC의 정보 보존, ZERO의 안전 우선이 서로 충돌. irreversible Gamble=Tier 4 Orchestrate를 확립하되 각 에이전트는 인간 담당자 승인 없이는 역할을 넘지 못하게 한다. Error/collision=NOVA가 LOCK 추적을 구조보다 앞세워 격벽 하나가 늦게 열린다. earned Reward=ZERO는 키 획득 대신 승무원 위치·수동 핸들·침수 순서를 묶어 인간 구조 경로를 제시한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:1, Connection:1, Externality:2, status:`transformed`}; SCAR={id:`S08-B`, change:`S08-B를 기한 안에 닫고 다중 에이전트 목표 충돌 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=모델 하나의 통일 명령이 아니라 서로 넘지 못할 경계 지휘; dopamine=Tier 4 언락.
- **stateDelta**: {Tier 4 확립, GRIMM 앞에서 곧 무력화. 서혜진 좌표 특정도 상승.}.
- **seeds**: [{id:`K08-B`, action:`payoff`, deadline:`V08E05`}]; evidenceIn=[90초 창]; evidenceOut=[승무원 수동 경로, WITNESS 열람용 서혜진 서명 파편].
- **episode RELAY**: relayTo=`V08E06`; file=`solo-ai-user/vol08/06-part6-dissonance.md`; cause=연결이 다시 끊기고 입찰 대가를 결정해야 해 `solo-ai-user/vol08/06-part6-dissonance.md`가 시작된다.

### EPISODE CONTRACT V08E06 — `06-part6-dissonance.md` / `# 06. 불협화음`

- **POV / WAGER**: `G08-C`; mode=`initiate`; stake=`WITNESS 열람권과 승무원 탈출 시간을 산다 / 위험: 가족 비밀의 거래 상품화`. Bind/가족 증거 희생. POV=차현우. 실패 종 `가족 비밀의 거래 상품화`; 인간 승리형 `불리한 원본도 같은 조건`.
- **manifest bridge**: episodeId=`V08E06`; arena=`해상 데이터센터·BLANC 경매장 / 불협화음`; choice=현우는 아린이 가족 봉투 원본을 에스크로에 맡기기로 한 결정을 막거나 대신하지 않고 공동 책임자로 서명한다; allyRelay=[]; zeroMode=`tier4-orchestrate`; zeroConstraint=Tier 4 Orchestrate; 담당 인간 승인 경계; failureType=`다중 에이전트 충돌`; manifestation=`가족 비밀의 거래 상품화`; storyRole=`Bind/가족 증거 희생`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=WITNESS 열람권과 승무원 탈출 시간을 산다. active Adversary=유리의 가격·서혜진 서명·선우현 봉쇄. irreversible Gamble=현우는 아린이 가족 봉투 원본을 에스크로에 맡기기로 한 결정을 막거나 대신하지 않고 공동 책임자로 서명한다. Error/collision=관리자도 관계를 확인해 아린 표적화가 커진다. earned Reward=유리는 가족관계가 아니라 원본 사슬을 가치로 인정해 공동 열람으로 전환한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:0, Connection:3, Externality:1, status:`open`}; SCAR={id:`S08-C`, change:`가족 비밀의 거래 상품화 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V08E08`}.
- **reader effect**: humanMove=유리한 가족 부분만 잘라 팔지 않음; dopamine=진실의 대가.
- **stateDelta**: {PRD 공정 공개: 8권에 서혜진=아린 어머니 문서 확인. Architect 동일성은 아직 공동 증거 단계.}.
- **seeds**: [{id:`K08-C`, action:`plant`, deadline:`V08E08`}]; evidenceIn=[서혜진 서명]; evidenceOut=[WITNESS 열람, RECALL 파기 위치, 수동 구조 인원].
- **episode RELAY**: relayTo=`V08E07`; file=`solo-ai-user/vol08/07-part7-system-crash.md`; cause=GRIMM이 전 시설을 완전 lockout해 `solo-ai-user/vol08/07-part7-system-crash.md`로 직결된다.

### EPISODE CONTRACT V08E07 — `07-part7-system-crash.md` / `# 07. 시스템 마비`

- **POV / WAGER**: `G08-C`; mode=`advance`; inherited wager=`G08-C`; stake=`WITNESS 열람권과 승무원 탈출 시간을 산다 / 위험: 가족 비밀의 거래 상품화`. Bind/능력 무력화. POV=차현우. 실패 종 `봉쇄의 총체적 자원 제거`; 인간 승리형 `수동 구조`.
- **manifest bridge**: episodeId=`V08E07`; arena=`해상 데이터센터·BLANC 경매장 / 시스템 마비`; choice=현우는 키 추적을 포기하고 문정혜식 인수 사슬로 사람 위치만 종이에 넘긴다; allyRelay=[]; zeroMode=`off`; zeroConstraint=전 모델 lockout; 수동 구조; failureType=`다중 에이전트 충돌`; manifestation=`봉쇄의 총체적 자원 제거`; storyRole=`Bind/능력 무력화`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=침수 구역 승무원 19명과 세 키 중 우선 목표를 지킨다. active Adversary=완전 lockout·기울어진 선체·닫힌 격벽. irreversible Gamble=현우는 키 추적을 포기하고 문정혜식 인수 사슬로 사람 위치만 종이에 넘긴다. Error/collision=관리자 대리가 그 틈에 LOCK을 향하고, WITNESS 장치도 물에 젖는다. earned Reward=아린·유리·도현·가람이 각자 수동 핸들을 맡아 19명을 두 구역으로 모은다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:3, Agency:0, Connection:1, Externality:2, status:`paid`}; SCAR={id:`S08-C-M`, change:`S08-C의 열린 비용이 행동을 바꾸어 봉쇄의 총체적 자원 제거의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=강함을 복구하려 하지 않고 사람이 돌릴 수 있는 손잡이를 찾음; dopamine=앙상블 구조.
- **stateDelta**: {Tier 4가 강해도 GRIMM에 무력. 인간 네트워크가 생존을 담당.}.
- **seeds**: [{id:`K08-C`, action:`advance`, deadline:`V08E08`}]; evidenceIn=[수동 핸들]; evidenceOut=[RECALL 파기 기회, LOCK 탈취 경로, 아린 최종 호출].
- **episode RELAY**: relayTo=`V08E08`; file=`solo-ai-user/vol08/08-part8-human-relay.md`; cause=현우가 세 키를 다 못 지킨다고 인정하고 아린에게 선택을 넘겨 `solo-ai-user/vol08/08-part8-human-relay.md`로 잇는다.

### EPISODE CONTRACT V08E08 — `08-part8-human-relay.md` / `# 08. 인간의 릴레이`

- **POV / WAGER**: `G08-C`; mode=`resolve`; inherited wager=`G08-C`; stake=`WITNESS 열람권과 승무원 탈출 시간을 산다 / 위험: 가족 비밀의 거래 상품화`. Bind/작전 결정. POV=서아린. 실패 종 `어느 키를 버려도 생기는 피해`; 인간 승리형 `비가역 우선순위 실행`.
- **manifest bridge**: episodeId=`V08E08`; arena=`해상 데이터센터·BLANC 경매장 / 인간의 릴레이`; choice=아린은 예외 사용자 신원을 사냥하는 RECALL을 파기한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=전 모델 lockout; 수동 구조; failureType=`다중 에이전트 충돌`; manifestation=`어느 키를 버려도 생기는 피해`; storyRole=`Bind/작전 결정`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=사람을 살리며 가장 위험한 키 하나를 없앤다. active Adversary=RECALL을 지우면 제로 기원 추적이 어려워지고, LOCK을 지우면 세계 봉쇄가 흔들리며, WITNESS를 지우면 진실이 사라진다. irreversible Gamble=아린은 예외 사용자 신원을 사냥하는 RECALL을 파기한다. Error/collision=현우의 기원 지름길과 다른 시드 구조 가능성을 함께 없앤다. earned Reward=김영선·도현 등 예외 인간의 좌표는 관리자에게 넘어가지 않고 WITNESS는 보존된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:0, Connection:2, Externality:1, status:`transformed`}; SCAR={id:`S08-C`, change:`S08-C를 기한 안에 닫고 어느 키를 버려도 생기는 피해 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=사랑하는 사람의 기원 답보다 살아 있는 사람의 비공개를 고름; dopamine=결정 카타르시스.
- **stateDelta**: {아린=구출 대상 아님, 전략 책임자. RECALL 영구 파기. N05/N10 보호.}.
- **seeds**: [{id:`K08-C`, action:`payoff`, deadline:`V08E08`}]; evidenceIn=[세 키 딜레마]; evidenceOut=[WITNESS 보존, LOCK 관리자 접근, 43초 충돌 조건].
- **episode RELAY**: relayTo=`V08E09`; file=`solo-ai-user/vol08/09-part9-overload.md`; cause=RECALL 파기와 LOCK 탈취가 동시에 시스템을 흔들어 `solo-ai-user/vol08/09-part9-overload.md`를 발생시킨다.

### EPISODE CONTRACT V08E09 — `09-part9-overload.md` / `# 09. 과부하`

- **POV / WAGER**: `G08-D`; mode=`initiate`; stake=`전 세계 PALISADE 흔들림을 43초 안에 멈춘다 / 위험: 다중 에이전트 봉쇄 충돌`. Detonate/광역 외부효과. POV=차현우. 실패 종 `다중 에이전트 봉쇄 충돌`; 인간 승리형 `즉시 범위 축소`.
- **manifest bridge**: episodeId=`V08E09`; arena=`해상 데이터센터·BLANC 경매장 / 과부하`; choice=현우는 더 큰 조정을 포기하고 ZERO에게 자기 접근권을 끊으라고 승인한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=광역 접근 절단·피해 영수증 보존; failureType=`다중 에이전트 충돌`; manifestation=`다중 에이전트 봉쇄 충돌`; storyRole=`Detonate/광역 외부효과`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=전 세계 PALISADE 흔들림을 43초 안에 멈춘다. active Adversary=LOCK·GRIMM·ZERO·NOVA의 상반 명령과 광역 시스템. irreversible Gamble=현우는 더 큰 조정을 포기하고 ZERO에게 자기 접근권을 끊으라고 승인한다. Error/collision=43초 동안 한 지역 응급 게이트가 열려 환자를 살리지만, 다른 항만 신호가 풀려 작업자들이 다친다. earned Reward=흔들림은 멈추고 인과·피해·승인 시각이 WITNESS에 그대로 남는다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:2, Connection:1, Externality:3, status:`open`}; SCAR={id:`S08-D`, change:`다중 에이전트 봉쇄 충돌 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V08E11`}.
- **reader effect**: humanMove=더 잘 통제하려 하지 않고 자기 권한부터 자름; dopamine=승리와 공포 동시.
- **stateDelta**: {현우의 43초 피해는 11권 서혜진의 강한 증거. 서혜진의 인간 반례 실험에 경고 누적.}.
- **seeds**: [{id:`K08-D`, action:`plant`, deadline:`V08E11`}]; evidenceIn=[LOCK 충돌]; evidenceOut=[한 생명·다른 부상, WITNESS 피해 로그, 관리자 보유 LOCK].
- **episode RELAY**: relayTo=`V08E10`; file=`solo-ai-user/vol08/10-part10-unresolved.md`; cause=물이 빠진 뒤 누가 어떤 키를 가졌는지 확인하는 `solo-ai-user/vol08/10-part10-unresolved.md`로 직결된다.

### EPISODE CONTRACT V08E10 — `10-part10-unresolved.md` / `# 10. 보류된 결론`

- **POV / WAGER**: `G08-D`; mode=`advance`; inherited wager=`G08-D`; stake=`전 세계 PALISADE 흔들림을 43초 안에 멈춘다 / 위험: 다중 에이전트 봉쇄 충돌`. Detonate/부분 승리·큰 손실. POV=차현우. 실패 종 `구조 중 적의 합리적 탈출`; 인간 승리형 `사람·증거 우선 결산`.
- **manifest bridge**: episodeId=`V08E10`; arena=`해상 데이터센터·BLANC 경매장 / 보류된 결론`; choice=현우·도현은 추격 대신 마지막 승무원 구조를 선택하고, 현우·아린은 서혜진의 안전책임 서명과 아키텍트 명령 패턴의 강한 일치를 동일인 가설로만 보존하며 원본 교차증언 전에는 결론 내리지 않는다; allyRelay=[]; zeroMode=`off`; zeroConstraint=광역 접근 절단·피해 영수증 보존; failureType=`다중 에이전트 충돌`; manifestation=`구조 중 적의 합리적 탈출과 성급한 정체 공개 유혹`; storyRole=`Detonate/부분 승리·동일인 가설 보류`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=승무원·WITNESS·LOCK을 모두 확보한다. active Adversary=침몰 시설과 LOCK을 든 관리자 대리. irreversible Gamble=현우·도현은 추격 대신 마지막 승무원 구조를 선택한다. Error/collision=관리자가 LOCK을 가져가고 선우현도 빠져나간다. earned Reward=19명 생존, WITNESS 원본과 BLANC 입찰 영수증 보존; 현우와 아린이 서혜진의 안전책임 서명과 아키텍트 명령 패턴의 강한 일치를 확인하되 동일인 결론은 보류한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:0, Connection:1, Externality:2, status:`paid`}; SCAR={id:`S08-D-M`, change:`S08-D의 열린 비용이 행동을 바꾸어 구조 중 적의 합리적 탈출과 성급한 정체 공개 유혹의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=도망가는 적보다 물속 마지막 사람을 고름; dopamine=씁쓸한 구조 승리.
- **stateDelta**: {19명 구조; LOCK=적 손; 현우·아린 공동 확인=서혜진 서명과 Architect 명령 패턴의 강한 일치; 동일인 결론=9권 독립 교차증언까지 보류.}.
- **seeds**: [{id:`K08-D`, action:`advance`, deadline:`V08E11`}, {id:`M-ARCHITECT-IDENTITY`, action:`plant`, deadline:`V09E04`}]; evidenceIn=[서혜진 서명·WITNESS 명령 원본]; evidenceOut=[동일인 가설·증언고 좌표·LOCK 활성화].
- **episode RELAY**: relayTo=`V08E11`; file=`solo-ai-user/vol08/11-epilogue.md`; cause=WITNESS가 오프라인 증언고 좌표와 첫 17분 열람 조건을 출력해 `solo-ai-user/vol08/11-epilogue.md`로 간다.

### EPISODE CONTRACT V08E11 — `11-epilogue.md` / `# 11. 폭풍전야`

- **POV / WAGER**: `G08-D`; mode=`resolve`; inherited wager=`G08-D`; stake=`전 세계 PALISADE 흔들림을 43초 안에 멈춘다 / 위험: 다중 에이전트 봉쇄 충돌`. Afterimage/피해 결산+다음 문. POV=차현우. 실패 종 `선택적 피해 서사`; 인간 승리형 `상반 결과 동시 보존`.
- **manifest bridge**: episodeId=`V08E11`; arena=`해상 데이터센터·BLANC 경매장 / 폭풍전야`; choice=현우는 유리가 환자 생존·항만 부상·자기 경매 책임을 한 영수증에 공개하도록 지지하고 그 비용을 숨기지 않는다; allyRelay=[]; zeroMode=`off`; zeroConstraint=광역 접근 절단·피해 영수증 보존; failureType=`다중 에이전트 충돌`; manifestation=`선택적 피해 서사`; storyRole=`Afterimage/피해 결산+다음 문`; genre=`해상 경매 앙상블 첩보전`.
- **WAGER detail**: Want=43초 피해 장부가 어느 진영에도 편집되지 않게 한다. active Adversary=환자 구조만 남기려는 자기 욕망과 각 진영 요구. irreversible Gamble=현우는 유리가 환자 생존·항만 부상·자기 경매 책임을 한 영수증에 공개하도록 지지하고 그 비용을 숨기지 않는다. Error/collision=유리는 정보시장 기반을 잃고 현우도 피해 책임을 확정한다. earned Reward=김영선이 불편한 원본을 보고 증언고 문을 연다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:0, Connection:2, Externality:1, status:`transformed`}; SCAR={id:`S08-D`, change:`S08-D를 기한 안에 닫고 선택적 피해 서사 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=좋은 결과로 나쁜 결과를 상계하지 않음; dopamine=후폭풍 반전.
- **stateDelta**: {43초 외부효과 공식 보존. 김영선이 9권 증언고 대표.}.
- **seeds**: [{id:`K08-D`, action:`payoff`, deadline:`V08E11`}]; evidenceIn=[WITNESS]; evidenceOut=[증언고 초대, 네트워크 반입 금지, LOCK 72시간 활성화 경고].
- **episode RELAY**: relayTo=`V09E00`; file=`solo-ai-user/vol09/00-prologue.md`; cause=현우·아린·김영선이 오프라인 증언고에 들어가며 `solo-ai-user/vol09/00-prologue.md`로 이어진다.

[← 이전 권 설계](./vol07-second-user.md) | [시리즈 홈](../README.md) | [권 목차](../vol08/README.md) | [다음 권 설계 →](./vol09-jailbreak.md)
