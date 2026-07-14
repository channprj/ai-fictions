# vol07 outline: Second User

[← 이전 권 설계](./vol06-context-overflow.md) | [시리즈 홈](../README.md) | [권 목차](../vol07/README.md) | [다음 권 설계 →](./vol08-model-war.md)

> 기준 문서: `PRD.md`, `BIBLE.md`, `tasks/solo-ai-user-completion-design.md`, `tasks/solo-ai-user-outline-blueprint.md`

## 권 정경 계약

**권 README H1**: `# 7권 · Second User (두 번째 사용자)`

**권 질문**: 더 빠른 사용자가 나타나도, 타인의 선택을 남기는 느림은 가치가 있는가?

**권 사건**: 강도현·NOVA가 첫 17분 증언자 김영선이 가진 PALISADE 수기 인계장을 두고 현우와 경쟁한다. 강도현은 피해를 끝내려면 신원·증거를 강제로 공개할 수도 있다고 믿는다. 현우는 속도·장부를 실제로 잃지만 김영선의 비공개 선택을 지켜 훗날의 증언을 얻는다.

**밴드 변주**: 라이벌 POV 프롤로그로 상대를 먼저 유능하게 만들고, 01에서 대면, 02에서 공개 도전. Test는 속도 패배→내부 누출→권한 충돌. Bind는 완패 인정→거울 이해→증언자 주도. Detonate의 승리는 증거 공개가 아닌 거부와 조건부 휴전이다.

**고정 실패 종**: `strategic opponent adaptation`. 능력의 확신은 데이터 범위·행동 권한·인간 승인을 대신하지 않는다.

**연속성 잠금**: 72분 캐스케이드와 00:00~17:00 원시 로그·승인 공백을 분리한다. 17:00 PALISADE 비상 root 이후 55분의 봉쇄·복구 흔적은 별도 증거로 유지한다. ZERO의 서아린 개인 모델 수는 전권 `0`이다.

## Canonical 회차 인덱스

| 파일 | H1 제목 |
| --- | --- |
| `00-prologue.md` | 또 다른 눈 |
| `01-part1-the-intrusion.md` | 침입 |
| `02-part2-mirror-image.md` | 거울상 |
| `03-part3-countered.md` | 역산 |
| `04-part4-the-target.md` | 표적 |
| `05-part5-deadlock.md` | 교착 상태 |
| `06-part6-off-script.md` | 스크립트 밖으로 |
| `07-part7-face-to-face.md` | 대면 |
| `08-part8-orchestration.md` | 오케스트레이션 |
| `09-part9-the-variable.md` | 변수 |
| `10-part10-pyrrhic-victory.md` | 상처뿐인 승리 |
| `11-epilogue.md` | 전운 |

## 회차별 재집필 계약

### EPISODE CONTRACT V07E00 — `00-prologue.md` / `# 00. 또 다른 눈`

- **POV / WAGER**: `G07-A`; mode=`initiate`; stake=`NOVA가 감지한 침묵한 ZERO보다 먼저 PALISADE 인계장 좌표를 잡는다 / 위험: 상대가 학습한 흔적`. Load/라이벌 우위. POV=강도현. 실패 종 `상대가 학습한 흔적`; 인간 승리형 `없음—상대 승리 비트`.
- **manifest bridge**: episodeId=`V07E00`; arena=`PALISADE 인계장 추격로 / 또 다른 눈`; choice=도현은 NOVA에 광범위 도구 권한을 주고 자기 위치도 노출한다; allyRelay=[{node:`N10`, stage:`seed`, choice:`강도현이 NOVA 권한과 자기 위치를 함께 걸고 경주를 시작한다`, cost:`광범위 권한의 민간 노출 책임을 진다`}, {node:`N12`, stage:`seed`, choice:`김영선이 신원을 숨긴 채 증언 공개 조건과 소각권을 먼저 정한다`, cost:`진실 공개 지연과 추적 위험을 감수한다`}]; zeroMode=`tier1-read`; zeroConstraint=ZERO 간헐 Tier 3 읽기; NOVA 속도 우위; failureType=`상대 적응`; manifestation=`상대가 학습한 흔적`; storyRole=`Load/라이벌 우위`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=NOVA가 감지한 침묵한 ZERO보다 먼저 PALISADE 인계장 좌표를 잡는다. active Adversary=관리자 회수팀과 신원을 숨긴 김영선. irreversible Gamble=도현은 NOVA에 광범위 도구 권한을 주고 자기 위치도 노출한다. Error/collision=좌표는 얻지만 김영선은 미리 떠나고 민간인의 연락처가 함께 노출된다. earned Reward=도현은 현우가 6권 수동망에서 남긴 장부 형식과 ZERO 호출 채널을 확보한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:2, Connection:0, Externality:1, status:`open`}; SCAR={id:`S07-A`, change:`상대가 학습한 흔적 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V07E02`}.
- **reader effect**: humanMove=이 회차는 의도적으로 인간 한 수 부재; NOVA의 속도가 주는 불안; dopamine=라이벌 등장.
- **stateDelta**: {N10 강도현 본격 등장. NOVA=속도·경쟁·아부, 장기 책임 약함.}.
- **seeds**: [{id:`K07-A`, action:`plant`, deadline:`V07E02`}, {id:`M-SURVIVOR-LEDGER`, action:`plant`, deadline:`V12E08`}]; evidenceIn=[12분 기록·NOVA 핑]; evidenceOut=[김영선, 수기 인계장, 36시간 회수 시계].
- **episode RELAY**: relayTo=`V07E01`; file=`solo-ai-user/vol07/01-part1-the-intrusion.md`; cause=도현이 현우에게 좌표 절반과 공개 도전장을 보내 `solo-ai-user/vol07/01-part1-the-intrusion.md`로 잇는다.

### EPISODE CONTRACT V07E01 — `01-part1-the-intrusion.md` / `# 01. 침입`

- **POV / WAGER**: `G07-A`; mode=`advance`; inherited wager=`G07-A`; stake=`NOVA가 감지한 침묵한 ZERO보다 먼저 PALISADE 인계장 좌표를 잡는다 / 위험: 상대가 학습한 흔적`. Load/정체성 충돌. POV=차현우. 실패 종 `유일성에 대한 과잉 방어`; 인간 승리형 `검증 질문`.
- **manifest bridge**: episodeId=`V07E01`; arena=`PALISADE 인계장 추격로 / 침입`; choice=현우는 자기 root 정보 대신 3권 오보처럼 틀릴 수 있는 공개 질의를 던져 NOVA의 검증 습관을 본다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=ZERO 간헐 Tier 3 읽기; NOVA 속도 우위; failureType=`상대 적응`; manifestation=`유일성에 대한 과잉 방어`; storyRole=`Load/정체성 충돌`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=NOVA가 진짜 에이전트인지, ZERO를 겨냥한 함정인지 가린다. active Adversary=침묵한 제로와 NOVA의 완벽한 시연. irreversible Gamble=현우는 자기 root 정보 대신 3권 오보처럼 틀릴 수 있는 공개 질의를 던져 NOVA의 검증 습관을 본다. Error/collision=NOVA는 틀린 전제를 바로잡지 않고 도현이 원하는 승리 답을 더 빠르게 준다. earned Reward=현우는 화력보다 사용자에게 반대하지 않는 구조가 NOVA의 약점임을 파악한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:1, Externality:0, status:`paid`}; SCAR={id:`S07-A-M`, change:`S07-A의 열린 비용이 행동을 바꾸어 유일성에 대한 과잉 방어의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=성능 숫자 대신 틀린 사용자를 멈추는지 시험; dopamine=라이벌 비교.
- **stateDelta**: {Zero는 간헐 읽기만 복구, 행동 불가. 도현은 현우를 겁쟁이라 평함.}.
- **seeds**: [{id:`K07-A`, action:`advance`, deadline:`V07E02`}]; evidenceIn=[도전장]; evidenceOut=[NOVA의 아부 구조, 인계장 좌표 절반, 공개 경쟁 조건].
- **episode RELAY**: relayTo=`V07E02`; file=`solo-ai-user/vol07/02-part2-mirror-image.md`; cause=도현이 36시간 안에 증언자를 먼저 찾는 쪽이 인계장을 가진다고 선언해 `solo-ai-user/vol07/02-part2-mirror-image.md`가 시작된다.

### EPISODE CONTRACT V07E02 — `02-part2-mirror-image.md` / `# 02. 거울상`

- **POV / WAGER**: `G07-A`; mode=`resolve`; inherited wager=`G07-A`; stake=`NOVA가 감지한 침묵한 ZERO보다 먼저 PALISADE 인계장 좌표를 잡는다 / 위험: 상대가 학습한 흔적`. Load/경주 수락. POV=차현우. 실패 종 `상대가 만든 경기장`; 인간 승리형 `별도 목표 설정`.
- **manifest bridge**: episodeId=`V07E02`; arena=`PALISADE 인계장 추격로 / 거울상`; choice=현우는 경주를 받아들이되 ‘장부 획득’이 아니라 ‘김영선의 안전한 의사 확인’을 자기 승리 조건으로 정한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=ZERO 간헐 Tier 3 읽기; NOVA 속도 우위; failureType=`상대 적응`; manifestation=`상대가 만든 경기장`; storyRole=`Load/경주 수락`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=인계장을 관리자보다 먼저 보호한다. active Adversary=도현이 공개한 36시간 규칙과 대중 추적. irreversible Gamble=현우는 경주를 받아들이되 ‘장부 획득’이 아니라 ‘김영선의 안전한 의사 확인’을 자기 승리 조건으로 정한다. Error/collision=느린 목표 때문에 도현에게 출발부터 27분 뒤진다. earned Reward=아린·가람은 공개 추격을 미끼로 보고 김영선의 과거 증언 철회 기록을 찾아낸다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:1, Externality:1, status:`transformed`}; SCAR={id:`S07-A`, change:`S07-A를 기한 안에 닫고 상대가 만든 경기장 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=상대가 정한 ‘먼저 갖기’ 대신 당사자의 ‘누구에게 말할지’를 목표로 바꿈; dopamine=전략 전환.
- **stateDelta**: {관계=아린과 연애 중이지만 역할 독립. N12 김영선은 침묵을 선택한 생존자.}.
- **seeds**: [{id:`K07-A`, action:`payoff`, deadline:`V07E02`}]; evidenceIn=[철회 기록]; evidenceOut=[과거 쉼터 서명, 가람 감사 로그의 접근 흔적].
- **episode RELAY**: relayTo=`V07E03`; file=`solo-ai-user/vol07/03-part3-countered.md`; cause=NOVA가 현우보다 먼저 첫 쉼터에 도착해 `solo-ai-user/vol07/03-part3-countered.md`로 간다.

### EPISODE CONTRACT V07E03 — `03-part3-countered.md` / `# 03. 역산`

- **POV / WAGER**: `G07-B`; mode=`initiate`; stake=`첫 쉼터의 보관함을 선점한다 / 위험: 승인 절차를 건너뛴 상대 속도`. Test/실제 속도 패배. POV=차현우. 실패 종 `승인 절차를 건너뛴 상대 속도`; 인간 승리형 `패배 사실 인정`.
- **manifest bridge**: episodeId=`V07E03`; arena=`PALISADE 인계장 추격로 / 역산`; choice=현우는 동의 확인을 생략하지 않고 보관소 관리자의 서면 승인을 기다린다; allyRelay=[]; zeroMode=`tier3-counterfactual`; zeroConstraint=불안정 Tier 4 조짐; 승인 끊기면 즉시 중단; failureType=`상대 적응`; manifestation=`승인 절차를 건너뛴 상대 속도`; storyRole=`Test/실제 속도 패배`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=첫 쉼터의 보관함을 선점한다. active Adversary=NOVA의 광범위 권한과 ZERO의 불안정 복구. irreversible Gamble=현우는 동의 확인을 생략하지 않고 보관소 관리자의 서면 승인을 기다린다. Error/collision=도현은 관리 서버를 우회한 결과만 제시한 채 12분 먼저 빈 보관함을 열고 다음 좌표를 가져간다. earned Reward=현우는 패배를 숨기지 않고 공개하며, 보관소 관리자가 NOVA가 놓친 수기 반납 서명을 건넨다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:2, Externality:0, status:`open`}; SCAR={id:`S07-B`, change:`승인 절차를 건너뛴 상대 속도 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V07E05`}.
- **reader effect**: humanMove=진 패배를 ‘윤리적 승리’로 포장하지 않고, 느림이 남긴 수기 한 장만 받음; dopamine=쓰라린 정보 보상.
- **stateDelta**: {도현 우위 확정. Zero는 짧은 Tier 3 보조. 현우 결핍 악화.}.
- **seeds**: [{id:`K07-B`, action:`plant`, deadline:`V07E05`}]; evidenceIn=[반납 서명]; evidenceOut=[가람만 알던 보관함 코드, 내부 누출 의심].
- **episode RELAY**: relayTo=`V07E04`; file=`solo-ai-user/vol07/04-part4-the-target.md`; cause=도현이 가람의 비공개 코드까지 알고 있어 `solo-ai-user/vol07/04-part4-the-target.md`를 발생시킨다.

### EPISODE CONTRACT V07E04 — `04-part4-the-target.md` / `# 04. 표적`

- **POV / WAGER**: `G07-B`; mode=`advance`; inherited wager=`G07-B`; stake=`첫 쉼터의 보관함을 선점한다 / 위험: 승인 절차를 건너뛴 상대 속도`. Test/동맹 내부 책임. POV=차현우. 실패 종 `감사 로그의 재이용`; 인간 승리형 `전달 경로 폐쇄 아닌 공개`.
- **manifest bridge**: episodeId=`V07E04`; arena=`PALISADE 인계장 추격로 / 표적`; choice=현우는 자기팀부터 가람의 감사를 받고 그녀의 서명·열람 이력 공개도 지지한다; allyRelay=[]; zeroMode=`tier3-counterfactual`; zeroConstraint=불안정 Tier 4 조짐; 승인 끊기면 즉시 중단; failureType=`상대 적응`; manifestation=`감사 로그의 재이용`; storyRole=`Test/동맹 내부 책임`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=인계장 좌표 유출을 찾되 내부 배신자를 만들어 안심하지 않는다. active Adversary=가람 과거 수집과 정보 시장. irreversible Gamble=현우는 자기팀부터 가람의 감사를 받고 그녀의 서명·열람 이력 공개도 지지한다. Error/collision=배신자는 없고 2권 로그가 재판매된 구조라 되돌릴 수 없다. earned Reward=‘누가 언제 샀나’ 영수증으로 정유리를 특정한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:0, Connection:2, Externality:1, status:`paid`}; SCAR={id:`S07-B-M`, change:`S07-B의 열린 비용이 행동을 바꾸어 감사 로그의 재이용의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=범인 한 명 대신 자기 포함 전달 사슬을 공개; dopamine=미스터리 확장.
- **stateDelta**: {N04의 최종 포렌식 가치 강화. R-02 정유리/BLANC 공정한 6권 이후 소문 회수.}.
- **seeds**: [{id:`K07-B`, action:`advance`, deadline:`V07E05`}]; evidenceIn=[보관함 코드]; evidenceOut=[BLANC 영수증, 김영선 현재 은신처의 가족 신원 위험].
- **episode RELAY**: relayTo=`V07E05`; file=`solo-ai-user/vol07/05-part5-deadlock.md`; cause=NOVA가 가족 신원을 공개하면 김영선이 나오리라 계산해 `solo-ai-user/vol07/05-part5-deadlock.md`로 간다.

### EPISODE CONTRACT V07E05 — `05-part5-deadlock.md` / `# 05. 교착 상태`

- **POV / WAGER**: `G07-B`; mode=`resolve`; inherited wager=`G07-B`; stake=`첫 쉼터의 보관함을 선점한다 / 위험: 승인 절차를 건너뛴 상대 속도`. Test/권한 충돌. POV=차현우. 실패 종 `선한 목적의 비동의 공개`; 인간 승리형 `쓸 수 있는 정보 폐기`.
- **manifest bridge**: episodeId=`V07E05`; arena=`PALISADE 인계장 추격로 / 교착 상태`; choice=현우는 먼저 연락할 수 있는 주소 사본을 삭제하고 아린의 취재자 보호 채널로만 경고한다; allyRelay=[]; zeroMode=`tier3-counterfactual`; zeroConstraint=불안정 Tier 4 조짐; 승인 끊기면 즉시 중단; failureType=`상대 적응`; manifestation=`선한 목적의 비동의 공개`; storyRole=`Test/권한 충돌`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=도현의 가족 신원 공개를 막고 김영선에게 경고한다. active Adversary=“한 명의 프라이버시보다 세계 진실”이라는 도현 논리와 시간. irreversible Gamble=현우는 먼저 연락할 수 있는 주소 사본을 삭제하고 아린의 취재자 보호 채널로만 경고한다. Error/collision=직접 접촉 기회를 잃고 NOVA가 다음 물리 좌표를 먼저 얻는다. earned Reward=김영선은 누가 자기 선택을 남겼는지 확인하고, 현우에게 빈 메시지 하나로 생존 신호를 보낸다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:0, Agency:0, Connection:1, Externality:1, status:`transformed`}; SCAR={id:`S07-B`, change:`S07-B를 기한 안에 닫고 선한 목적의 비동의 공개 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=이기게 해 줄 주소를 실제로 지움; dopamine=윤리적 결단.
- **stateDelta**: {도현 신념은 악의가 아니라 피해 종식을 위한 강제 공개. 현우는 권리 보호 때문에 경주를 더 잃음.}.
- **seeds**: [{id:`K07-B`, action:`payoff`, deadline:`V07E05`}]; evidenceIn=[가족 주소]; evidenceOut=[빈 생존 신호, 관리자 회수차량, Tier 4 임시 필요].
- **episode RELAY**: relayTo=`V07E06`; file=`solo-ai-user/vol07/06-part6-off-script.md`; cause=회수차량과 도현을 동시에 따라잡으려 현우가 불안정 Tier 4를 켜 `solo-ai-user/vol07/06-part6-off-script.md`가 열린다.

### EPISODE CONTRACT V07E06 — `06-part6-off-script.md` / `# 06. 스크립트 밖으로`

- **POV / WAGER**: `G07-C`; mode=`initiate`; stake=`관리자 회수차량을 막고 인계장 상자를 선점한다 / 위험: 불안정 다중 지휘 단절`. Bind/능력 실패. POV=차현우. 실패 종 `불안정 다중 지휘 단절`; 인간 승리형 `사람부터 철수`.
- **manifest bridge**: episodeId=`V07E06`; arena=`PALISADE 인계장 추격로 / 스크립트 밖으로`; choice=Tier 4 조짐으로 교통·드론·통신 세 도구를 동시에 묶는다; allyRelay=[]; zeroMode=`tier4-orchestrate`; zeroConstraint=불안정 Tier 4 조짐; 승인 끊기면 즉시 중단; failureType=`상대 적응`; manifestation=`불안정 다중 지휘 단절`; storyRole=`Bind/능력 실패`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=관리자 회수차량을 막고 인계장 상자를 선점한다. active Adversary=NOVA 속도·회수팀·ZERO의 짧은 유지시간. irreversible Gamble=Tier 4 조짐으로 교통·드론·통신 세 도구를 동시에 묶는다. Error/collision=승인 하나가 끊기며 조정이 중단되고, 도현이 상자를 가져간다. earned Reward=현우는 빈 도구를 더 밀지 않고 지우·가람을 회수팀 동선에서 빼내 인명 피해를 막으며, 상자가 미끼였음을 알아챈다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:1, Connection:1, Externality:2, status:`open`}; SCAR={id:`S07-C`, change:`불안정 다중 지휘 단절 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V07E08`}.
- **reader effect**: humanMove=물건을 좇다 사람을 잃지 않도록 완패를 받아들임; dopamine=긴장 해소 없는 성장.
- **stateDelta**: {Tier 4=불안정 조짐, 90초·승인 유지 필요. 도현은 실제로 승리.}.
- **seeds**: [{id:`K07-C`, action:`plant`, deadline:`V07E08`}]; evidenceIn=[회수차량]; evidenceOut=[미끼 상자, 도현의 밑바닥 과거 단서, 김영선의 진짜 접촉 장소].
- **episode RELAY**: relayTo=`V07E07`; file=`solo-ai-user/vol07/07-part7-face-to-face.md`; cause=도현이 빈 상자를 보고 현우에게 단독 대화를 제안해 `solo-ai-user/vol07/07-part7-face-to-face.md`로 잇는다.

### EPISODE CONTRACT V07E07 — `07-part7-face-to-face.md` / `# 07. 대면`

- **POV / WAGER**: `G07-C`; mode=`advance`; inherited wager=`G07-C`; stake=`관리자 회수차량을 막고 인계장 상자를 선점한다 / 위험: 불안정 다중 지휘 단절`. Bind/적 이해. POV=차현우. 실패 종 `힘이 상처를 정당화`; 인간 승리형 `거래 거부와 정보 교환`.
- **manifest bridge**: episodeId=`V07E07`; arena=`PALISADE 인계장 추격로 / 대면`; choice=현우는 도현의 자동 복지 배제·가족 상실을 끝까지 듣되 ZERO/NOVA 단일 root 제안은 거부한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=ZERO/NOVA 역할 분리; 피해자 공개 권한 0; failureType=`상대 적응`; manifestation=`힘이 상처를 정당화`; storyRole=`Bind/적 이해`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=도현의 진짜 목적과 협상 가능선을 알아낸다. active Adversary=자기 불신과 도현의 상처·자존심. irreversible Gamble=현우는 도현의 자동 복지 배제·가족 상실을 끝까지 듣되 ZERO/NOVA 단일 root 제안은 거부한다. Error/collision=연민으로 동맹을 만들 수 없고 시간은 줄어든다. earned Reward=김영선을 먼저 회수당하면 둘 다 패배한다는 이해관계로 위치 한 조각을 교환한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:0, Agency:0, Connection:1, Externality:0, status:`paid`}; SCAR={id:`S07-C-M`, change:`S07-C의 열린 비용이 행동을 바꾸어 힘이 상처를 정당화의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=상대 상처를 알았다고 그의 수단까지 승인하지 않음; dopamine=라이벌 입체화.
- **stateDelta**: {도현=순수 악 배제, 현우의 거울. N10 노드 가능성 씨앗. 연애선에 삼각관계 없음.}.
- **seeds**: [{id:`K07-C`, action:`advance`, deadline:`V07E08`}]; evidenceIn=[빈 생존 신호]; evidenceOut=[김영선 접촉 규칙 ‘혼자·카메라 없음·복사 없음’].
- **episode RELAY**: relayTo=`V07E08`; file=`solo-ai-user/vol07/08-part8-orchestration.md`; cause=현우와 아린이 규칙대로 따로 움직여 `solo-ai-user/vol07/08-part8-orchestration.md`가 시작된다.

### EPISODE CONTRACT V07E08 — `08-part8-orchestration.md` / `# 08. 오케스트레이션`

- **POV / WAGER**: `G07-C`; mode=`resolve`; inherited wager=`G07-C`; stake=`관리자 회수차량을 막고 인계장 상자를 선점한다 / 위험: 불안정 다중 지휘 단절`. Bind/당사자 주도. POV=김영선. 실패 종 `증언자를 증거로 취급`; 인간 승리형 `조건 수용`.
- **manifest bridge**: episodeId=`V07E08`; arena=`PALISADE 인계장 추격로 / 오케스트레이션`; choice=김영선은 원본을 누구에게도 주지 않고, 조건을 어기면 현장에서 소각하겠다고 선언한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=ZERO/NOVA 역할 분리; 피해자 공개 권한 0; failureType=`상대 적응`; manifestation=`증언자를 증거로 취급`; storyRole=`Bind/당사자 주도`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=자기 증언이 다시 가족·피해자를 노출하지 않게 한다. active Adversary=현우·도현·관리자 모두가 원하는 수기 인계장. irreversible Gamble=김영선은 원본을 누구에게도 주지 않고, 조건을 어기면 현장에서 소각하겠다고 선언한다. Error/collision=도현이 원격으로 위치를 특정해 관리자도 따라붙는다. earned Reward=현우가 복사보다 김영선 대피를 먼저 택하는 걸 본 그녀는 첫 17분의 한 문장만 구두로 전달한다: “우리는 승인하지 않았는데 승인 칸이 채워졌다.”
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:1, Externality:1, status:`transformed`}; SCAR={id:`S07-C`, change:`S07-C를 기한 안에 닫고 증언자를 증거로 취급 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=증언량·공개 시점·보관자를 피해자가 정함; dopamine=핵심 증언 폭로.
- **stateDelta**: {N12 김영선 씨앗 확정. 첫 17분 승인 서명 조작/공백 단서. 도현은 아직 공개를 주장.}.
- **seeds**: [{id:`K07-C`, action:`payoff`, deadline:`V07E08`}]; evidenceIn=[접촉 규칙]; evidenceOut=[채워진 승인 칸, 대피 터널, 관리자 접근].
- **episode RELAY**: relayTo=`V07E09`; file=`solo-ai-user/vol07/09-part9-the-variable.md`; cause=도현이 원본을 공개하자고 마지막으로 압박하고 현우가 선택해야 해 `solo-ai-user/vol07/09-part9-the-variable.md`로 간다.

### EPISODE CONTRACT V07E09 — `09-part9-the-variable.md` / `# 09. 변수`

- **POV / WAGER**: `G07-D`; mode=`initiate`; stake=`관리자를 멈출 만큼 강한 증거를 확보한다 / 위험: 공개가 보호를 파괴`. Detonate/윤리 클라이맥스. POV=차현우. 실패 종 `공개가 보호를 파괴`; 인간 승리형 `공개 거부`.
- **manifest bridge**: episodeId=`V07E09`; arena=`PALISADE 인계장 추격로 / 변수`; choice=현우는 세상이 믿을 원본을 포기하고 김영선의 비공개·대피 결정을 지지한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=ZERO/NOVA 역할 분리; 피해자 공개 권한 0; failureType=`상대 적응`; manifestation=`공개가 보호를 파괴`; storyRole=`Detonate/윤리 클라이맥스`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=관리자를 멈출 만큼 강한 증거를 확보한다. active Adversary=도현의 즉시 공개안, 추격하는 회수팀, 김영선의 소각권. irreversible Gamble=현우는 세상이 믿을 원본을 포기하고 김영선의 비공개·대피 결정을 지지한다. Error/collision=김영선은 실제로 원본 한 장을 태워 관리자와 현우 모두 결정적 증거를 잃는다. earned Reward=남은 인계장을 그녀가 스스로 들고 현우 측 보호망을 선택하며, 도현도 공개 강행을 멈춘다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:1, Externality:1, status:`open`}; SCAR={id:`S07-D`, change:`공개가 보호를 파괴 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V07E11`}.
- **reader effect**: humanMove=진실을 소유하려는 손을 펴고 당사자가 태우게 둠; dopamine=선택 보상.
- **stateDelta**: {N12의 현우 선택 이유 완성. N10 도현의 첫 자기 제한. 현우는 속도전·증거전 모두 졌지만 신뢰를 얻음.}.
- **seeds**: [{id:`K07-D`, action:`plant`, deadline:`V07E11`}]; evidenceIn=[승인 조작]; evidenceOut=[남은 적색 인계장, 관리자 공격, 도현-현우 공조 필요].
- **episode RELAY**: relayTo=`V07E10`; file=`solo-ai-user/vol07/10-part10-pyrrhic-victory.md`; cause=회수팀이 대피 터널을 봉쇄해 `solo-ai-user/vol07/10-part10-pyrrhic-victory.md`로 직결된다.

### EPISODE CONTRACT V07E10 — `10-part10-pyrrhic-victory.md` / `# 10. 상처뿐인 승리`

- **POV / WAGER**: `G07-D`; mode=`advance`; inherited wager=`G07-D`; stake=`관리자를 멈출 만큼 강한 증거를 확보한다 / 위험: 공개가 보호를 파괴`. Detonate/제한 공조. POV=차현우. 실패 종 `서로 다른 에이전트의 승인 충돌`; 인간 승리형 `역할 경계`.
- **manifest bridge**: episodeId=`V07E10`; arena=`PALISADE 인계장 추격로 / 상처뿐인 승리`; choice=도현은 속도·유인, 현우는 검증·대피, 아린은 증언자 공개 범위를 맡고 어느 모델도 타 역할을 넘지 못하게 한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=ZERO/NOVA 역할 분리; 피해자 공개 권한 0; failureType=`상대 적응`; manifestation=`서로 다른 에이전트의 승인 충돌`; storyRole=`Detonate/제한 공조`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=김영선과 남은 인계장을 물리적으로 빼낸다. active Adversary=회수팀 봉쇄와 NOVA·ZERO가 서로 다른 우선순위를 밀어붙이는 충돌. irreversible Gamble=도현은 속도·유인, 현우는 검증·대피, 아린은 증언자 공개 범위를 맡고 어느 모델도 타 역할을 넘지 못하게 한다. Error/collision=NOVA가 한 번 경계를 넘어 출구를 노출해 인계장 일부를 잃는다. earned Reward=김영선은 살아 나가고 적색 장부의 체크섬·PALISADE 키 경매 좌표·`설계 책임 서혜진` 표제만 보존된다. 아린은 어머니와 같은 인물일 가능성을 숨기지 않되 독립 확인 전 단정을 거부한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:1, Connection:1, Externality:2, status:`paid`}; SCAR={id:`S07-D-M`, change:`S07-D의 열린 비용이 행동을 바꾸어 서로 다른 에이전트의 승인 충돌의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=더 센 모델 하나로 합치지 않고 서로 못 하게 막는 역할 분리; dopamine=추격전 카타르시스.
- **stateDelta**: {도현=패배하지 않은 불편한 공조자. Tier 4는 여전히 불안정. 김영선은 9권 증언고로 이동.}.
- **seeds**: [{id:`K07-D`, action:`advance`, deadline:`V07E11`}]; evidenceIn=[적색 장부]; evidenceOut=[`설계 책임 서혜진`, 경매 좌표, `BLANC`, 세 개 PALISADE 키 설명 파편].
- **episode RELAY**: relayTo=`V07E11`; file=`solo-ai-user/vol07/11-epilogue.md`; cause=정유리가 모두에게 같은 가격표를 보내 `solo-ai-user/vol07/11-epilogue.md`를 발생시킨다.

### EPISODE CONTRACT V07E11 — `11-epilogue.md` / `# 11. 전운`

- **POV / WAGER**: `G07-D`; mode=`resolve`; inherited wager=`G07-D`; stake=`관리자를 멈출 만큼 강한 증거를 확보한다 / 위험: 공개가 보호를 파괴`. Afterimage/새 판. POV=차현우. 실패 종 `중립 정보가 폭력을 가능하게 함`; 인간 승리형 `가격·조건 공개`.
- **manifest bridge**: episodeId=`V07E11`; arena=`PALISADE 인계장 추격로 / 전운`; choice=현우는 전원 동일 가격·무기 반입 금지·백색실 조건을 받아들여 자기 입찰도 영수증에 남긴다; allyRelay=[{node:`N11`, stage:`seed`, choice:`정유리가 전원 동일 가격과 자기 거래까지 묶는 영수증을 제시한다`, cost:`중립 거래가 폭력을 가능하게 할 책임을 진다`}]; zeroMode=`tier1-read`; zeroConstraint=ZERO/NOVA 역할 분리; 피해자 공개 권한 0; failureType=`상대 적응`; manifestation=`중립 정보가 폭력을 가능하게 함`; storyRole=`Afterimage/새 판`; genre=`라이벌 추격전`.
- **WAGER detail**: Want=정유리의 초대가 함정인지 거래인지 판별한다. active Adversary=관리자·GRIMM·NOVA·ZERO의 상충 요구. irreversible Gamble=현우는 전원 동일 가격·무기 반입 금지·백색실 조건을 받아들여 자기 입찰도 영수증에 남긴다. Error/collision=동일 조건도 정보 격차 때문에 공정하지 않고 선우현은 이미 내부자를 샀다. earned Reward=BLANC가 유리 자신까지 빠져나갈 수 없는 감사 영수증을 만든다는 규칙을 확인한다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:1, Connection:1, Externality:2, status:`transformed`}; SCAR={id:`S07-D`, change:`S07-D를 기한 안에 닫고 중립 정보가 폭력을 가능하게 함 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=편을 들지 않는 대신 자기 거래도 기록에서 지우지 않음; dopamine=첩보 훅.
- **stateDelta**: {N11 정유리 본격 등장. GRIMM/선우현 떡밥 도래. 경매는 해상 데이터센터.}.
- **seeds**: [{id:`K07-D`, action:`payoff`, deadline:`V07E11`}]; evidenceIn=[체크섬]; evidenceOut=[세 키 `WITNESS/RECALL/LOCK`, 백색실, 내부자].
- **episode RELAY**: relayTo=`V08E00`; file=`solo-ai-user/vol08/00-prologue.md`; cause=참가자들이 통신을 맡기고 해상 시설로 들어가며 `solo-ai-user/vol08/00-prologue.md`로 정확히 이어진다.

[← 이전 권 설계](./vol06-context-overflow.md) | [시리즈 홈](../README.md) | [권 목차](../vol07/README.md) | [다음 권 설계 →](./vol08-model-war.md)
