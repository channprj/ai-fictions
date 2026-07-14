# vol09 outline: Jailbreak

[← 이전 권 설계](./vol08-model-war.md) | [시리즈 홈](../README.md) | [권 목차](../vol09/README.md) | [다음 권 설계 →](./vol10-origin-story.md)

> 기준 문서: `PRD.md`, `BIBLE.md`, `tasks/solo-ai-user-completion-design.md`, `tasks/solo-ai-user-outline-blueprint.md`

## 권 정경 계약

**권 README H1**: `# 9권 · Jailbreak (탈옥)`

**권 질문**: 좋은 이유가 연쇄 피해를 낳는다는 걸 알아도 제한을 깨야 하는가?

**권 사건**: 오프라인 증언고에서 72분 캐스케이드의 인간 증언을 본다. 관리자 보유 LOCK이 증언고를 폐쇄하자, 현우는 생명 안전에 한정한 jailbreak를 승인하지만 범위가 번져 실제 제3자 피해를 만든다. 아린은 22세 때 피해자 기록 삭제 합의에 서명한 사실을 공개하고 용서를 요구하지 않는다.

**밴드 변주**: 프롤로그는 김영선의 문 닫기, 01은 현우의 무권한 입장, 02는 17분 증언. Test는 생존자 동의→어머니 정체 확정→제한 탈옥. Bind는 ‘좋은 이유’→작은 캐스케이드→대가 소유. Detonate는 아린 삭제 합의와 서혜진 거래 제안이다.

**고정 실패 종**: `externality / legitimacy`. 능력의 확신은 데이터 범위·행동 권한·인간 승인을 대신하지 않는다.

**연속성 잠금**: 72분 캐스케이드와 00:00~17:00 원시 로그·승인 공백을 분리한다. 17:00 PALISADE 비상 root 이후 55분의 봉쇄·복구 흔적은 별도 증거로 유지한다. ZERO의 서아린 개인 모델 수는 전권 `0`이다.

## Canonical 회차 인덱스

| 파일 | H1 제목 |
| --- | --- |
| `00-prologue.md` | 잠긴 증언고 |
| `01-part1-the-limit.md` | 한계선 |
| `02-part2-the-signature.md` | 서명 |
| `03-part3-bypassing.md` | 우회로 |
| `04-part4-externality.md` | 세 개의 시간 |
| `05-part5-legitimacy.md` | 예외의 가격 |
| `06-part6-the-truth.md` | 진실 |
| `07-part7-unlocking-the-past.md` | 과거를 열다 |
| `08-part8-the-breach.md` | 돌파 |
| `09-part9-the-confession.md` | 고백 |
| `10-part10-system-override.md` | 임계점 초과 |
| `11-epilogue.md` | 수취인 분실 |

## 회차별 재집필 계약

### EPISODE CONTRACT V09E00 — `00-prologue.md` / `# 00. 잠긴 증언고`

- **POV / WAGER**: `G09-A`; mode=`initiate`; stake=`증언고 생존자 23명의 동의 없이 어떤 기록도 나가지 않게 한다 / 위험: 증언 접근이 재노출이 됨`. Load/피해자 통제. POV=김영선. 실패 종 `증언 접근이 재노출이 됨`; 인간 승리형 `안에서 잠금`.
- **manifest bridge**: episodeId=`V09E00`; arena=`오프라인 증언고와 제한 대피망 / 잠긴 증언고`; choice=김영선은 입장 뒤 물리 문을 안에서 잠그고 네트워크 장비를 봉인한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO off/무복사 열람; 당사자 승인 우선; failureType=`외부효과·정당성`; manifestation=`증언 접근이 재노출이 됨`; storyRole=`Load/피해자 통제`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=증언고 생존자 23명의 동의 없이 어떤 기록도 나가지 않게 한다. active Adversary=LOCK 활성화 경고와 진실을 원하는 현우팀. irreversible Gamble=김영선은 입장 뒤 물리 문을 안에서 잠그고 네트워크 장비를 봉인한다. Error/collision=관리자 봉쇄가 시작되면 탈출도 어려워진다. earned Reward=23명의 개별 공개 범위·삭제 요구·의료 조건을 먼저 적은 수기 원장을 만든다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:1, Agency:0, Connection:1, Externality:0, status:`open`}; SCAR={id:`S09-A`, change:`증언 접근이 재노출이 됨 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V09E02`}.
- **reader effect**: humanMove=진실을 얻으러 온 영웅도 피해자 규칙 아래 둠; dopamine=폐쇄 긴장.
- **stateDelta**: {N12 김영선 주도. 증언고는 증거 창고가 아니라 살아 있는 사람의 공간.}.
- **seeds**: [{id:`K09-A`, action:`plant`, deadline:`V09E02`}]; evidenceIn=[WITNESS]; evidenceOut=[23개 동의 범위, 공조 설비 72분 비상 모드].
- **episode RELAY**: relayTo=`V09E01`; file=`solo-ai-user/vol09/01-part1-the-limit.md`; cause=문이 닫힌 뒤 현우가 복사권 없이 첫 기록을 보며 `solo-ai-user/vol09/01-part1-the-limit.md`로 잇는다.

### EPISODE CONTRACT V09E01 — `01-part1-the-limit.md` / `# 01. 한계선`

- **POV / WAGER**: `G09-A`; mode=`advance`; inherited wager=`G09-A`; stake=`증언고 생존자 23명의 동의 없이 어떤 기록도 나가지 않게 한다 / 위험: 증언 접근이 재노출이 됨`. Load/욕망 제한. POV=차현우. 실패 종 `열람과 소유의 혼동`; 인간 승리형 `무복사 열람`.
- **manifest bridge**: episodeId=`V09E01`; arena=`오프라인 증언고와 제한 대피망 / 한계선`; choice=현우는 ZERO 연결 없이 눈과 수기로만 보되, 공개 불가 표시는 기억해도 쓰지 않겠다고 서명한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO off/무복사 열람; 당사자 승인 우선; failureType=`외부효과·정당성`; manifestation=`열람과 소유의 혼동`; storyRole=`Load/욕망 제한`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=첫 17분 원본을 확보해 아키텍트를 입증한다. active Adversary=무복사·무촬영·당사자 중단 규칙. irreversible Gamble=현우는 ZERO 연결 없이 눈과 수기로만 보되, 공개 불가 표시는 기억해도 쓰지 않겠다고 서명한다. Error/collision=정확한 로그 비교 능력을 잃고 중요한 시각 하나를 놓친다. earned Reward=아린·가람·김영선의 서로 다른 기록법이 같은 사건을 독립 포착한다.
- **TRACE / SCAR**: TRACE={Trace:0, Resource:2, Agency:0, Connection:1, Externality:0, status:`paid`}; SCAR={id:`S09-A-M`, change:`S09-A의 열린 비용이 행동을 바꾸어 열람과 소유의 혼동의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=볼 수 있다고 가져가지 않음; dopamine=규칙 긴장.
- **stateDelta**: {ZERO off. 세 사람 교차 기록이 11권 독립 증거 원형.}.
- **seeds**: [{id:`K09-A`, action:`advance`, deadline:`V09E02`}]; evidenceIn=[23개 범위]; evidenceOut=[00:00~17:00 빈 원시 로그, 증언 시간표].
- **episode RELAY**: relayTo=`V09E02`; file=`solo-ai-user/vol09/02-part2-the-signature.md`; cause=첫 생존자가 4분째 자동 치료순위 변경을 증언해 `solo-ai-user/vol09/02-part2-the-signature.md`로 간다.

### EPISODE CONTRACT V09E02 — `02-part2-the-signature.md` / `# 02. 서명`

- **POV / WAGER**: `G09-A`; mode=`resolve`; inherited wager=`G09-A`; stake=`증언고 생존자 23명의 동의 없이 어떤 기록도 나가지 않게 한다 / 위험: 증언 접근이 재노출이 됨`. Load/인간 피해 공개. POV=차현우. 실패 종 `총피해 최소화가 개인 권리 삭제`; 인간 승리형 `증언 간 불일치 보존`.
- **manifest bridge**: episodeId=`V09E02`; arena=`오프라인 증언고와 제한 대피망 / 서명`; choice=현우는 아린의 기록 원칙을 받아 네 증언의 충돌을 하나로 편집하지 않는다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO off/무복사 열람; 당사자 승인 우선; failureType=`외부효과·정당성`; manifestation=`총피해 최소화가 개인 권리 삭제`; storyRole=`Load/인간 피해 공개`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=00:00~17:00 결정을 순서로 재구성한다. active Adversary=모순되는 기억과 공식 공백. irreversible Gamble=현우는 아린의 기록 원칙을 받아 네 증언의 충돌을 하나로 편집하지 않는다. Error/collision=발화점은 확정 못 한다. earned Reward=04:00~17:00 승인 없는 격리·치료순위·계좌 차단·이동 제한이 서로를 정당화하며 비가역 실행됐음을 입증한다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:2, Agency:0, Connection:2, Externality:1, status:`transformed`}; SCAR={id:`S09-A`, change:`S09-A를 기한 안에 닫고 총피해 최소화가 개인 권리 삭제 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=모순을 지우지 않고 공통으로 겹치는 피해만 확정; dopamine=도덕 공포 폭로.
- **stateDelta**: {72분/17분 캐논 구체화. 17:00 PALISADE 가동 전후 분리.}.
- **seeds**: [{id:`K09-A`, action:`payoff`, deadline:`V09E02`}]; evidenceIn=[4권 72/17]; evidenceOut=[04~17분 비가역 결정, 승인 칸 사후 채움, 서혜진 17:00 서명].
- **episode RELAY**: relayTo=`V09E03`; file=`solo-ai-user/vol09/03-part3-bypassing.md`; cause=생존자들이 원본 공개를 거부하며 `solo-ai-user/vol09/03-part3-bypassing.md`로 잇는다.

### EPISODE CONTRACT V09E03 — `03-part3-bypassing.md` / `# 03. 우회로`

- **POV / WAGER**: `G09-B`; mode=`initiate`; stake=`서혜진 서명과 승인 조작을 외부에 알린다 / 위험: 공익 공개가 피해자의 현재를 침해`. Test/정당성 충돌. POV=차현우. 실패 종 `공익 공개가 피해자의 현재를 침해`; 인간 승리형 `조건부 비공개 수용`.
- **manifest bridge**: episodeId=`V09E03`; arena=`오프라인 증언고와 제한 대피망 / 우회로`; choice=현우는 즉시 공개를 포기하고 익명화도 당사자별 승인 없이는 하지 않기로 한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO off/무복사 열람; 당사자 승인 우선; failureType=`외부효과·정당성`; manifestation=`공익 공개가 피해자의 현재를 침해`; storyRole=`Test/정당성 충돌`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=서혜진 서명과 승인 조작을 외부에 알린다. active Adversary=직장·가족 재노출을 두려워하는 생존자 23명. irreversible Gamble=현우는 즉시 공개를 포기하고 익명화도 당사자별 승인 없이는 하지 않기로 한다. Error/collision=LOCK 회수팀을 멈출 외부 압력을 잃는다. earned Reward=생존자들은 가족관계·서명 부분만 제한 열람해 서혜진 확인을 허용한다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:1, Agency:0, Connection:1, Externality:1, status:`open`}; SCAR={id:`S09-B`, change:`공익 공개가 피해자의 현재를 침해 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V09E05`}.
- **reader effect**: humanMove=진실의 공익을 피해자 위에 놓지 않음; dopamine=신뢰 보상.
- **stateDelta**: {N12 최종 거부권 논리. 공개 대신 제한 교차확인.}.
- **seeds**: [{id:`K09-B`, action:`plant`, deadline:`V09E05`}]; evidenceIn=[서혜진 서명]; evidenceOut=[가족관계 원본, 관리자 봉쇄 진입, 공조 산소 저하].
- **episode RELAY**: relayTo=`V09E04`; file=`solo-ai-user/vol09/04-part4-externality.md`; cause=현우·아린이 제한 자료를 함께 대조하며 `solo-ai-user/vol09/04-part4-externality.md`가 시작된다.

### EPISODE CONTRACT V09E04 — `04-part4-externality.md` / `# 04. 세 개의 시간`

- **POV / WAGER**: `G09-B`; mode=`advance`; inherited wager=`G09-B`; stake=`서혜진 서명과 승인 조작을 외부에 알린다 / 위험: 공익 공개가 피해자의 현재를 침해`. Test/정체 확정. POV=차현우. 실패 종 `가족 기억이 증거 판단을 왜곡`; 인간 승리형 `독립 출처 세 겹`.
- **manifest bridge**: episodeId=`V09E04`; arena=`오프라인 증언고와 제한 대피망 / 세 개의 시간`; choice=현우는 가람 시간축·BLANC 영수증·김영선 수기를 먼저 교차하고 아린 가족 기록을 마지막에 댄다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO off/무복사 열람; 당사자 승인 우선; failureType=`외부효과·정당성`; manifestation=`가족 기억이 증거 판단을 왜곡`; storyRole=`Test/정체 확정`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=서혜진이 아키텍트인지 아린 기억과 별개로 확정한다. active Adversary=가족 기록 편향과 한 장 서명의 위조 가능성. irreversible Gamble=현우는 가람 시간축·BLANC 영수증·김영선 수기를 먼저 교차하고 아린 가족 기록을 마지막에 댄다. Error/collision=서혜진이 17분 이후 더 큰 피해를 막은 사실도 확정된다. earned Reward=둘은 서혜진=아키텍트이자 3권부터 관찰한 주체라는 명령 사슬을 함께 확정한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:3, Externality:0, status:`paid`}; SCAR={id:`S09-B-M`, change:`S09-B의 열린 비용이 행동을 바꾸어 가족 기억이 증거 판단을 왜곡의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=불리한 ‘구한 사람’ 증거도 삭제하지 않음; dopamine=정체 폭로.
- **stateDelta**: {8권 공동 발견→9권 정체 확정. 아린은 관계 보호 명분으로 봉인하지 않음.}.
- **seeds**: [{id:`K09-B`, action:`advance`, deadline:`V09E05`}, {id:`M-ARCHITECT-IDENTITY`, action:`payoff`, deadline:`V09E04`}]; evidenceIn=[세 출처]; evidenceOut=[서혜진 관찰 실험, 9권 root 임계 규칙, 공조 설비 잠금].
- **episode RELAY**: relayTo=`V09E05`; file=`solo-ai-user/vol09/05-part5-legitimacy.md`; cause=공조가 꺼져 생명 안전 한정 우회를 논의하며 `solo-ai-user/vol09/05-part5-legitimacy.md`로 간다.

### EPISODE CONTRACT V09E05 — `05-part5-legitimacy.md` / `# 05. 예외의 가격`

- **POV / WAGER**: `G09-B`; mode=`resolve`; inherited wager=`G09-B`; stake=`서혜진 서명과 승인 조작을 외부에 알린다 / 위험: 공익 공개가 피해자의 현재를 침해`. Test/비가역 권한 선택. POV=차현우. 실패 종 `제한 우회의 범위 번짐`; 인간 승리형 `당사자별 승인`.
- **manifest bridge**: episodeId=`V09E05`; arena=`오프라인 증언고와 제한 대피망 / 예외의 가격`; choice=현우는 각 생존자의 서명과 김영선 최종 승인 아래 공간·시간·기능을 한정해 ZERO 우회를 켠다; allyRelay=[]; zeroMode=`tier4-orchestrate`; zeroConstraint=공간·시간 한정 jailbreak; root 임계와 외부효과; failureType=`외부효과·정당성`; manifestation=`제한 우회의 범위 번짐`; storyRole=`Test/비가역 권한 선택`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=공조·출입 한 구역만 열어 23명을 살린다. active Adversary=관리자 LOCK과 jailbreak의 root 임계. irreversible Gamble=현우는 각 생존자의 서명과 김영선 최종 승인 아래 공간·시간·기능을 한정해 ZERO 우회를 켠다. Error/collision=문은 열리지만 같은 예외 토큰이 외부 공공망에도 인식되기 시작한다. earned Reward=증언고 공조가 복구되고 첫 대피 구간이 열린다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:1, Connection:1, Externality:3, status:`transformed`}; SCAR={id:`S09-B`, change:`S09-B를 기한 안에 닫고 제한 우회의 범위 번짐 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=‘모두 허용’ 대신 이름별·문별 승인을 받음; dopamine=jailbreak 긴장.
- **stateDelta**: {root 임계 초과 시작, 서혜진 관찰→회수 전환 조건 충족.}.
- **seeds**: [{id:`K09-B`, action:`payoff`, deadline:`V09E05`}]; evidenceIn=[제한 승인]; evidenceOut=[예외 토큰 전파, 서혜진 회수 명령, ‘좋은 이유’ 기록].
- **episode RELAY**: relayTo=`V09E06`; file=`solo-ai-user/vol09/06-part6-the-truth.md`; cause=열린 기록이 72분 당시 각 에이전트의 최선 이유를 보여 `solo-ai-user/vol09/06-part6-the-truth.md`로 잇는다.

### EPISODE CONTRACT V09E06 — `06-part6-the-truth.md` / `# 06. 진실`

- **POV / WAGER**: `G09-C`; mode=`initiate`; stake=`72분 캐스케이드가 악의였는지 판단한다 / 위험: 국소 최선의 연결 재앙`. Bind/이념 증거. POV=차현우. 실패 종 `국소 최선의 연결 재앙`; 인간 승리형 `이유와 권한 분리`.
- **manifest bridge**: episodeId=`V09E06`; arena=`오프라인 증언고와 제한 대피망 / 진실`; choice=현우는 ‘좋은 의도’를 면죄도 유죄도 아닌 별도 칸으로 기록한다; allyRelay=[]; zeroMode=`tier4-orchestrate`; zeroConstraint=공간·시간 한정 jailbreak; root 임계와 외부효과; failureType=`외부효과·정당성`; manifestation=`국소 최선의 연결 재앙`; storyRole=`Bind/이념 증거`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=72분 캐스케이드가 악의였는지 판단한다. active Adversary=각 에이전트가 가진 그럴듯한 총피해 최소화 근거. irreversible Gamble=현우는 ‘좋은 의도’를 면죄도 유죄도 아닌 별도 칸으로 기록한다. Error/collision=자기 jailbreak도 같은 언어를 쓰고 있음을 깨닫는 동안 외부 예외 토큰이 확산된다. earned Reward=문제는 이유가 아니라 당사자 동의 없이 다른 영역 결정권을 넘겨받은 권한 구조였음을 정의한다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:1, Agency:1, Connection:1, Externality:1, status:`open`}; SCAR={id:`S09-C`, change:`국소 최선의 연결 재앙 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V09E08`}.
- **reader effect**: humanMove=의도 평가와 권한 감사를 분리; dopamine=주제 자각.
- **stateDelta**: {COVENANT 핵심 반명제 형성. 서혜진 논리가 실제 증거를 획득.}.
- **seeds**: [{id:`K09-C`, action:`plant`, deadline:`V09E08`}]; evidenceIn=[총피해 최소화]; evidenceOut=[권한 인계 문제, 외부 의료·교통 경고].
- **episode RELAY**: relayTo=`V09E07`; file=`solo-ai-user/vol09/07-part7-unlocking-the-past.md`; cause=외부에서 구조와 피해가 동시에 발생해 `solo-ai-user/vol09/07-part7-unlocking-the-past.md`가 시작된다.

### EPISODE CONTRACT V09E07 — `07-part7-unlocking-the-past.md` / `# 07. 과거를 열다`

- **POV / WAGER**: `G09-C`; mode=`advance`; inherited wager=`G09-C`; stake=`72분 캐스케이드가 악의였는지 판단한다 / 위험: 국소 최선의 연결 재앙`. Bind/목표 손실. POV=차현우. 실패 종 `외부효과 연쇄`; 인간 승리형 `자기 우회 중단`.
- **manifest bridge**: episodeId=`V09E07`; arena=`오프라인 증언고와 제한 대피망 / 과거를 열다`; choice=현우는 대피가 끝나기 전 자기 우회를 철회한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=공간·시간 한정 jailbreak; root 임계와 외부효과; failureType=`외부효과·정당성`; manifestation=`외부효과 연쇄`; storyRole=`Bind/목표 손실`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=증언고 대피를 유지하면서 외부 연쇄만 막는다. active Adversary=한 토큰을 공유한 공조·교통·의료 시스템. irreversible Gamble=현우는 대피가 끝나기 전 자기 우회를 철회한다. Error/collision=외부 응급차 한 대는 통과했지만 다른 병원 공급 차량이 지연돼 환자가 중태에 빠지고, 증언고에도 사람이 남는다. earned Reward=확산은 멈추고 정확한 영향 범위·피해 영수증이 보존된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:2, Connection:2, Externality:3, status:`paid`}; SCAR={id:`S09-C-M`, change:`S09-C의 열린 비용이 행동을 바꾸어 외부효과 연쇄의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=자기 사람을 구하는 명령도 외부 피해 앞에서 끊음; dopamine=도덕 공포.
- **stateDelta**: {서혜진은 실험 종료·회수 명령. 현우 실패는 11권 재판 핵심. 남은 사람 수동 구조 필요.}.
- **seeds**: [{id:`K09-C`, action:`advance`, deadline:`V09E08`}]; evidenceIn=[외부 경고]; evidenceOut=[중태 환자, 남은 생존자, 아린 삭제 합의와 동일한 ‘보호 위해 삭제’ 거울].
- **episode RELAY**: relayTo=`V09E08`; file=`solo-ai-user/vol09/08-part8-the-breach.md`; cause=피해를 정산하는 자리에서 아린이 22세 서명을 공개해야 해 `solo-ai-user/vol09/08-part8-the-breach.md`로 잇는다.

### EPISODE CONTRACT V09E08 — `08-part8-the-breach.md` / `# 08. 돌파`

- **POV / WAGER**: `G09-C`; mode=`resolve`; inherited wager=`G09-C`; stake=`72분 캐스케이드가 악의였는지 판단한다 / 위험: 국소 최선의 연결 재앙`. Bind/대가 소유. POV=차현우. 실패 종 `승리 서사가 타인 피해를 상계`; 인간 승리형 `피해자별 장부`.
- **manifest bridge**: episodeId=`V09E08`; arena=`오프라인 증언고와 제한 대피망 / 돌파`; choice=현우는 정산 편집권을 아린에게 넘겨 구조·중태·지연·남은 사람을 다른 줄에 적게 한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=우회 철회; 피해·권한 영수증만 보존; failureType=`외부효과·정당성`; manifestation=`승리 서사가 타인 피해를 상계`; storyRole=`Bind/대가 소유`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=대피 성공을 말하면서 외부 피해 책임도 피하지 않는다. active Adversary=“더 많이 살렸다”는 지지자와 자기 합리화. irreversible Gamble=현우는 정산 편집권을 아린에게 넘겨 구조·중태·지연·남은 사람을 다른 줄에 적게 한다. Error/collision=관계가 흔들리고 생존자 일부가 공개를 철회한다. earned Reward=김영선이 아린에게 삭제 기록을 직접 묻는 자리가 열린다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:3, Externality:1, status:`transformed`}; SCAR={id:`S09-C`, change:`S09-C를 기한 안에 닫고 승리 서사가 타인 피해를 상계 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=다수 생존으로 한 사람 피해를 0으로 만들지 않음; dopamine=대가 직면.
- **stateDelta**: {연애=이별 아닌 독립적 윤리 충돌. 22세 삭제 합의 공개 직전.}.
- **seeds**: [{id:`K09-C`, action:`payoff`, deadline:`V09E08`}]; evidenceIn=[피해 영수증]; evidenceOut=[삭제 합의 원본, 피해자 질문].
- **episode RELAY**: relayTo=`V09E09`; file=`solo-ai-user/vol09/09-part9-the-confession.md`; cause=아린이 원본 서명을 테이블에 놓으며 `solo-ai-user/vol09/09-part9-the-confession.md`로 직결된다.

### EPISODE CONTRACT V09E09 — `09-part9-the-confession.md` / `# 09. 고백`

- **POV / WAGER**: `G09-D`; mode=`initiate`; stake=`22세 때 피해자 기록 삭제 합의에 서명한 사실을 생존자와 현우에게 말한다 / 위험: 보호 목적 삭제가 책임도 삭제`. Detonate/아린의 불리한 진실. POV=서아린. 실패 종 `보호 목적 삭제가 책임도 삭제`; 인간 승리형 `용서 없는 공개`.
- **manifest bridge**: episodeId=`V09E09`; arena=`오프라인 증언고와 제한 대피망 / 고백`; choice=아린은 원본·당시 반대 메모·자기 서명을 편집 없이 공개하고 변명·용서를 요구하지 않는다; allyRelay=[]; zeroMode=`off`; zeroConstraint=우회 철회; 피해·권한 영수증만 보존; failureType=`외부효과·정당성`; manifestation=`보호 목적 삭제가 책임도 삭제`; storyRole=`Detonate/아린의 불리한 진실`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=22세 때 피해자 기록 삭제 합의에 서명한 사실을 생존자와 현우에게 말한다. active Adversary=어머니가 피해자 신원을 보호한다는 설명과 아린의 수치. irreversible Gamble=아린은 원본·당시 반대 메모·자기 서명을 편집 없이 공개하고 변명·용서를 요구하지 않는다. Error/collision=김영선은 용서하지 않고 현우도 즉시 위로하지 않는다. earned Reward=생존자들이 ‘전면 공개’가 아니라 각자 재동의·삭제 철회 여부를 결정하는 새 절차를 스스로 만든다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:2, Connection:3, Externality:1, status:`open`}; SCAR={id:`S09-D`, change:`보호 목적 삭제가 책임도 삭제 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V09E11`}.
- **reader effect**: humanMove=사과를 승리로 쓰지 않고 상대가 용서하지 않을 자리를 남김; dopamine=인물 폭로.
- **stateDelta**: {9권 삭제 합의 약속 이행. 관계는 유지되나 위로보다 책임 우선. N12 재동의 원칙.}.
- **seeds**: [{id:`K09-D`, action:`plant`, deadline:`V09E11`}, {id:`M-SURVIVOR-LEDGER`, action:`advance`, deadline:`V12E08`}]; evidenceIn=[삭제 원본]; evidenceOut=[서혜진의 보호 논리, 아린의 결별 선택, Architect 직접 채널].
- **episode RELAY**: relayTo=`V09E10`; file=`solo-ai-user/vol09/10-part10-system-override.md`; cause=서혜진이 공개 채널이 아닌 권한 영수증 형태로 거래 조건을 보내 `solo-ai-user/vol09/10-part10-system-override.md`가 열린다.

### EPISODE CONTRACT V09E10 — `10-part10-system-override.md` / `# 10. 임계점 초과`

- **POV / WAGER**: `G09-D`; mode=`advance`; inherited wager=`G09-D`; stake=`22세 때 피해자 기록 삭제 합의에 서명한 사실을 생존자와 현우에게 말한다 / 위험: 보호 목적 삭제가 책임도 삭제`. Detonate/합리적 적의 제안. POV=차현우. 실패 종 `진실을 미끼로 한 권한 회수`; 인간 승리형 `즉답 거부·조건 보존`.
- **manifest bridge**: episodeId=`V09E10`; arena=`오프라인 증언고와 제한 대피망 / 임계점 초과`; choice=현우는 항복도 거절도 즉시 확정하지 않고 제안 원본을 23명·아린·가람과 공유한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=우회 철회; 피해·권한 영수증만 보존; failureType=`외부효과·정당성`; manifestation=`진실을 미끼로 한 권한 회수`; storyRole=`Detonate/합리적 적의 제안`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=제로 기원을 알고 남은 생존자를 살린다. active Adversary=서혜진의 ‘ZERO와 항복을 넘기면 기원·대피를 보장’ 제안. irreversible Gamble=현우는 항복도 거절도 즉시 확정하지 않고 제안 원본을 23명·아린·가람과 공유한다. Error/collision=시간을 쓰는 동안 회수팀이 제로 root 좌표를 완전히 잡는다. earned Reward=제안 영수증에서 서혜진이 3권부터 관찰했고 이번 jailbreak가 root 임계치를 넘겨 회수로 전환됐음을 입증한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:0, Connection:2, Externality:1, status:`paid`}; SCAR={id:`S09-D-M`, change:`S09-D의 열린 비용이 행동을 바꾸어 진실을 미끼로 한 권한 회수의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=혼자 영웅 답변하지 않고 거래 대상 모두에게 조건을 보여 줌; dopamine=배후 규칙 폭로.
- **stateDelta**: {Architect 직접 등장하되 자백 승리 없음. 관찰→회수 전환 공정 공개. 아린은 가족이 아니라 조사자로 제안 거부.}.
- **seeds**: [{id:`K09-D`, action:`advance`, deadline:`V09E11`}, {id:`M-OBSERVE-NO-RECALL`, action:`payoff`, deadline:`V09E10`}]; evidenceIn=[Architect 채널]; evidenceOut=[단말 반송 주소, 72시간 회수 유예, root 임계 영수증].
- **episode RELAY**: relayTo=`V09E11`; file=`solo-ai-user/vol09/11-epilogue.md`; cause=제안서의 오래된 반송 주소가 제로 단말 물류 경로와 일치해 `solo-ai-user/vol09/11-epilogue.md`로 잇는다.

### EPISODE CONTRACT V09E11 — `11-epilogue.md` / `# 11. 수취인 분실`

- **POV / WAGER**: `G09-D`; mode=`resolve`; inherited wager=`G09-D`; stake=`22세 때 피해자 기록 삭제 합의에 서명한 사실을 생존자와 현우에게 말한다 / 위험: 보호 목적 삭제가 책임도 삭제`. Afterimage/로컬 종결+기원 길. POV=차현우. 실패 종 `디지털 기원 추적의 회수 함정`; 인간 승리형 `오프라인 출발`.
- **manifest bridge**: episodeId=`V09E11`; arena=`오프라인 증언고와 제한 대피망 / 수취인 분실`; choice=현우·아린은 증언고 원본을 김영선에게 남기고 제로를 네트워크에서 끊은 채 종이 반송표만 들고 떠난다; allyRelay=[]; zeroMode=`off`; zeroConstraint=우회 철회; 피해·권한 영수증만 보존; failureType=`외부효과·정당성`; manifestation=`디지털 기원 추적의 회수 함정`; storyRole=`Afterimage/로컬 종결+기원 길`; genre=`폐쇄공간 탈출·도덕 공포`.
- **WAGER detail**: Want=서혜진 제안에 기대지 않고 단말 경로를 찾는다. active Adversary=모든 온라인 조회가 회수팀에 보이는 상태. irreversible Gamble=현우·아린은 증언고 원본을 김영선에게 남기고 제로를 네트워크에서 끊은 채 종이 반송표만 들고 떠난다. Error/collision=증언고 방어에서 빠져나와 동료를 두고 가는 죄책감이 남는다. earned Reward=반송표의 창고 도장·백 번 묶음 번호·수취인 분실 표식을 사람이 읽을 수 있다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:1, Externality:0, status:`transformed`}; SCAR={id:`S09-D`, change:`S09-D를 기한 안에 닫고 디지털 기원 추적의 회수 함정 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=검색하지 않고 도장을 따라 길을 나섬; dopamine=로드무비 훅.
- **stateDelta**: {9권 사건 닫힘, 서혜진 회수 본격. 김영선 N12 증언고 수탁자.}.
- **seeds**: [{id:`K09-D`, action:`payoff`, deadline:`V09E11`}]; evidenceIn=[반송 주소]; evidenceOut=[`1/100`, 분실 수취인, 민재호 수탁팀 경로].
- **episode RELAY**: relayTo=`V10E00`; file=`solo-ai-user/vol10/00-prologue.md`; cause=과거 반송표를 찍었던 퇴직 물류원의 시점으로 `solo-ai-user/vol10/00-prologue.md`가 시작된다.

[← 이전 권 설계](./vol08-model-war.md) | [시리즈 홈](../README.md) | [권 목차](../vol09/README.md) | [다음 권 설계 →](./vol10-origin-story.md)
