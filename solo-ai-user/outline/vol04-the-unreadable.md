# vol04 outline: The Unreadable

[← 이전 권 설계](./vol03-going-viral.md) | [시리즈 홈](../README.md) | [권 목차](../vol04/README.md) | [다음 권 설계 →](./vol05-date-simulator.md)

> 기준 문서: `PRD.md`, `BIBLE.md`, `tasks/solo-ai-user-completion-design.md`, `tasks/solo-ai-user-outline-blueprint.md`

## 권 정경 계약

**권 README H1**: `# 4권 · The Unreadable (예측 불가)`

**권 질문**: 무엇이든 예측하는 힘이 읽지 못하는 사람 앞에서, 기록의 주인은 누구인가?

**권 사건**: 집중호우로 위험 판정을 받은 시립 제2기록관이 60시간 뒤 철거된다. 아린은 락다운 첫날 원본이 그 안에 있음을 찾아내고, 현우·기록보존사 문정혜와 보존 사슬을 만든다. 시설안전과장 이기준은 붕괴·개인정보 책임을 막기 위해 합리적으로 접근을 차단한다.

**밴드 변주**: Load는 아린의 단독 추적(00)에서 현우의 법적 서명(01), 제로가 못 읽는 원인 확인(02)으로 좁힌다. Test는 철거 시계를 먼저 당기고 접근권 성공 뒤 블랙스완을 터뜨린다. Bind는 물리 복원→비동의 포기→금고 진입 순이다.

**고정 실패 종**: `access / black swan`. 능력의 확신은 데이터 범위·행동 권한·인간 승인을 대신하지 않는다.

**연속성 잠금**: 72분 캐스케이드와 00:00~17:00 원시 로그·승인 공백을 분리한다. 17:00 PALISADE 비상 root 이후 55분의 봉쇄·복구 흔적은 별도 증거로 유지한다. ZERO의 서아린 개인 모델 수는 전권 `0`이다.

## Canonical 회차 인덱스

| 파일 | H1 제목 |
| --- | --- |
| `00-prologue.md` | 변수 등장 |
| `01-part1-the-girl.md` | 시선을 모으는 자 |
| `02-part2-opacity-key.md` | Opacity Key |
| `03-part3-black-swan.md` | 블랙 스완 |
| `04-part4-scripted.md` | 스크립트 |
| `05-part5-dissonance.md` | 엇박자 |
| `06-part6-error-report.md` | 오류 보고 |
| `07-part7-without-zero.md` | 제로 없이 |
| `08-part8-broken-shell.md` | 깨진 껍질 |
| `09-part9-unpredictable.md` | 예측 불가능한 |
| `10-part10-the-unreadable.md` | 읽을 수 없는 |
| `11-epilogue.md` | 남겨진 락 |

## 회차별 재집필 계약

### EPISODE CONTRACT V04E00 — `00-prologue.md` / `# 00. 변수 등장`

- **POV / WAGER**: `G04-A`; mode=`initiate`; stake=`2권 영수증과 3권 기록 코드가 가리키는 원본 보관처를 찾는다 / 위험: 디지털 검색에서 삭제된 물리 주소`. Load/욕망 선행. POV=서아린. 실패 종 `디지털 검색에서 삭제된 물리 주소`; 인간 승리형 `손으로 겹쳐 보기`.
- **manifest bridge**: episodeId=`V04E00`; arena=`철거 예정 시립 제2기록관 / 변수 등장`; choice=방송 일정과 새 계약금을 포기하고 기록관 현장으로 간다; allyRelay=[{node:`N07`, stage:`seed`, choice:`문정혜가 철거 기록관에 남아 피해자 원본의 우선순위를 제시한다`, cost:`수입과 안전을 잃을 위험을 감수한다`}]; zeroMode=`tier1-read`; zeroConstraint=Tier 2 읽기; Opacity 모델링 거부; failureType=`접근권·블랙스완`; manifestation=`디지털 검색에서 삭제된 물리 주소`; storyRole=`Load/욕망 선행`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=2권 영수증과 3권 기록 코드가 가리키는 원본 보관처를 찾는다. active Adversary=전산상 폐기 완료 처리와 60시간 철거 공고. irreversible Gamble=방송 일정과 새 계약금을 포기하고 기록관 현장으로 간다. Error/collision=건물은 안전 통제로 봉쇄됐고 목록상 해당 상자는 이미 3년 전 소각됐다. earned Reward=아린은 영수증 압인과 철거 도면의 방 번호가 같고, ‘소각’ 도장이 다른 날짜 잉크임을 발견한다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:2, Agency:0, Connection:1, Externality:0, status:`open`}; SCAR={id:`S04-A`, change:`디지털 검색에서 삭제된 물리 주소 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V04E02`}.
- **reader effect**: humanMove=검색어가 아니라 종이를 빛에 기울여 압인을 읽음; dopamine=미스터리 진입.
- **stateDelta**: {아린 독립 목표가 현우 사건과 합류. N07 문정혜는 기록관 잔류 보존사로 첫 등장.}.
- **seeds**: [{id:`K04-A`, action:`plant`, deadline:`V04E02`}]; evidenceIn=[종이 날짜 공백·철거 공고]; evidenceOut=[제2기록관 B-0실, 위조 소각 도장, 60시간 시계].
- **episode RELAY**: relayTo=`V04E01`; file=`solo-ai-user/vol04/01-part1-the-girl.md`; cause=아린이 현우에게 ‘능력’이 아니라 물류·반품 이력을 읽는 눈을 빌려 달라 해 `solo-ai-user/vol04/01-part1-the-girl.md`로 잇는다.

### EPISODE CONTRACT V04E01 — `01-part1-the-girl.md` / `# 01. 시선을 모으는 자`

- **POV / WAGER**: `G04-A`; mode=`advance`; inherited wager=`G04-A`; stake=`2권 영수증과 3권 기록 코드가 가리키는 원본 보관처를 찾는다 / 위험: 디지털 검색에서 삭제된 물리 주소`. Load/동맹 조건. POV=차현우. 실패 종 `권한 없는 진실`; 인간 승리형 `책임 서명`.
- **manifest bridge**: episodeId=`V04E01`; arena=`철거 예정 시립 제2기록관 / 시선을 모으는 자`; choice=현우가 열람자 실명·목적·반출 금지에 서명해 자기 좌표를 시청 감사망에 남긴다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=Tier 2 읽기; Opacity 모델링 거부; failureType=`접근권·블랙스완`; manifestation=`권한 없는 진실`; storyRole=`Load/동맹 조건`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=B-0실의 상자가 실제로 이동했는지 밝힌다. active Adversary=개인정보 반출 책임을 지지 않으려는 이기준과 현우의 유명세. irreversible Gamble=현우가 열람자 실명·목적·반출 금지에 서명해 자기 좌표를 시청 감사망에 남긴다. Error/collision=서명으로 목록 열람은 열리지만 현물 구역은 여전히 출입 금지다. earned Reward=반출 중량표에서 소각됐다는 상자만 무게가 두 번 잡혔고 지하 금고로 되돌아온 사실을 찾는다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:0, Agency:0, Connection:1, Externality:0, status:`paid`}; SCAR={id:`S04-A-M`, change:`S04-A의 열린 비용이 행동을 바꾸어 권한 없는 진실의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=책임질 이름이 없으면 열리지 않는 문에 자기 이름을 둠; dopamine=증거 사이다.
- **stateDelta**: {이기준=진실 은폐 악당이 아니라 붕괴·유출 책임자. 문정혜는 원본을 옮긴 선배의 필체를 알아본다.}.
- **seeds**: [{id:`K04-A`, action:`advance`, deadline:`V04E02`}]; evidenceIn=[B-0·위조 소각]; evidenceOut=[지하 금고 중량, 문정혜의 인수대장, 아린의 방문자 프로필 null].
- **episode RELAY**: relayTo=`V04E02`; file=`solo-ai-user/vol04/02-part2-opacity-key.md`; cause=모든 열람자 위험 프로필 중 아린만 빈칸으로 돌아와 `solo-ai-user/vol04/02-part2-opacity-key.md`가 시작된다.

### EPISODE CONTRACT V04E02 — `02-part2-opacity-key.md` / `# 02. Opacity Key`

- **POV / WAGER**: `G04-A`; mode=`resolve`; inherited wager=`G04-A`; stake=`2권 영수증과 3권 기록 코드가 가리키는 원본 보관처를 찾는다 / 위험: 디지털 검색에서 삭제된 물리 주소`. Load/이상 확정. POV=차현우. 실패 종 `모델링 접근권의 설계된 거부`; 인간 승리형 `빈값을 존중`.
- **manifest bridge**: episodeId=`V04E02`; arena=`철거 예정 시립 제2기록관 / Opacity Key`; choice=아린의 동의 없이 공개정보 결합을 시도하지 않고, 그녀에게 직접 확인 권한을 맡긴다; allyRelay=[]; zeroMode=`off`; zeroConstraint=Tier 2 읽기; Opacity 모델링 거부; failureType=`접근권·블랙스완`; manifestation=`모델링 접근권의 설계된 거부`; storyRole=`Load/이상 확정`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=아린의 빈 프로필이 위조인지 시스템 결함인지 가린다. active Adversary=철거 전 신원심사와 현우의 ‘원인을 풀어야 안전하다’는 강박. irreversible Gamble=아린의 동의 없이 공개정보 결합을 시도하지 않고, 그녀에게 직접 확인 권한을 맡긴다. Error/collision=아린 본인도 이유를 설명하지 않으며 출입 승인은 더 늦어진다. earned Reward=제로와 기록관이 모두 `OPACITY / SUBJECT CONTROLLED`라는 같은 응답을 내고, 이는 버그가 아니라 외부 규격임이 확정된다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:0, Agency:0, Connection:1, Externality:0, status:`transformed`}; SCAR={id:`S04-A`, change:`S04-A를 기한 안에 닫고 모델링 접근권의 설계된 거부 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=빈값을 채울 단서가 아니라 당사자가 닫은 문으로 대함; dopamine=설정 반전.
- **stateDelta**: {아린 모델링 실패의 규격 씨앗. 현우는 3권 동의서를 실제 행동으로 지킴. 관계=경계 속 전문 신뢰.}.
- **seeds**: [{id:`K04-A`, action:`payoff`, deadline:`V04E02`}, {id:`M-OPACITY-RIGHT`, action:`plant`, deadline:`V12E05`}]; evidenceIn=[아린 null 프로필]; evidenceOut=[`OPACITY`, 과거 B-0 방문자 `S.A.`, 아린의 어린 시절 기억 파편].
- **episode RELAY**: relayTo=`V04E03`; file=`solo-ai-user/vol04/03-part3-black-swan.md`; cause=폭우 예보로 이기준이 철거를 12시간 앞당겨 `solo-ai-user/vol04/03-part3-black-swan.md`가 열린다.

### EPISODE CONTRACT V04E03 — `03-part3-black-swan.md` / `# 03. 블랙 스완`

- **POV / WAGER**: `G04-B`; mode=`initiate`; stake=`철거 전 꺼낼 원본의 합의 가능한 우선순위를 만든다 / 위험: 안전 규정과 증거 보존의 충돌`. Test/적대자 압력 선행. POV=차현우. 실패 종 `안전 규정과 증거 보존의 충돌`; 인간 승리형 `보존 우선순위 합의`.
- **manifest bridge**: episodeId=`V04E03`; arena=`철거 예정 시립 제2기록관 / 블랙 스완`; choice=현우는 아린의 결정을 대신 예측하지 않고 문정혜의 ‘피해자 명단 원본’ 우선 기준을 지지한다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=Tier 2 읽기; Opacity 모델링 거부; failureType=`접근권·블랙스완`; manifestation=`안전 규정과 증거 보존의 충돌`; storyRole=`Test/적대자 압력 선행`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=철거 전 꺼낼 원본의 합의 가능한 우선순위를 만든다. active Adversary=이기준의 48시간 명령·수천 상자·아린 가족 상자의 유혹. irreversible Gamble=현우는 아린의 결정을 대신 예측하지 않고 문정혜의 ‘피해자 명단 원본’ 우선 기준을 지지한다. Error/collision=가족 단서 상자는 더 깊은 금고로 밀리고 접근 가능성이 낮아진다. earned Reward=이기준은 보존 기준과 아린의 동의를 본 뒤 안전구역 20분 창을 허용한다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:2, Agency:0, Connection:1, Externality:1, status:`open`}; SCAR={id:`S04-B`, change:`안전 규정과 증거 보존의 충돌 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V04E05`}.
- **reader effect**: humanMove=자기 질문보다 이름 없는 피해자의 원본을 먼저 고름; dopamine=윤리적 선택.
- **stateDelta**: {아린=정보 장치가 아닌 기록 윤리 주체. 문정혜 N07의 최종 노드 이유 씨앗.}.
- **seeds**: [{id:`K04-B`, action:`plant`, deadline:`V04E05`}]; evidenceIn=[48시간]; evidenceOut=[20분 창, 보존 우선순위, 지하 물 유입 가능성].
- **episode RELAY**: relayTo=`V04E04`; file=`solo-ai-user/vol04/04-part4-scripted.md`; cause=출입 승인 과정에서 아린의 과거 방문자 코드가 금고를 자동 격리해 `solo-ai-user/vol04/04-part4-scripted.md`로 간다.

### EPISODE CONTRACT V04E04 — `04-part4-scripted.md` / `# 04. 스크립트`

- **POV / WAGER**: `G04-B`; mode=`advance`; inherited wager=`G04-B`; stake=`철거 전 꺼낼 원본의 합의 가능한 우선순위를 만든다 / 위험: 안전 규정과 증거 보존의 충돌`. Test/접근 성공이 새 벽. POV=차현우. 실패 종 `당사자 보호가 당사자 접근도 막음`; 인간 승리형 `자기 위험 선택`.
- **manifest bridge**: episodeId=`V04E04`; arena=`철거 예정 시립 제2기록관 / 스크립트`; choice=현우는 우회 생체 분석을 거부하고 아린이 택한 수기 서명·문정혜 대면 확인을 보조한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=Tier 2 읽기; Opacity 모델링 거부; failureType=`접근권·블랙스완`; manifestation=`당사자 보호가 당사자 접근도 막음`; storyRole=`Test/접근 성공이 새 벽`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=아린 코드로 격리된 상자의 목록을 그녀의 권리 안에서 확인한다. active Adversary=Opacity 양방향 차단과 이기준의 책임. irreversible Gamble=현우는 우회 생체 분석을 거부하고 아린이 택한 수기 서명·문정혜 대면 확인을 보조한다. Error/collision=시스템은 대체 인증을 침입으로 보고 금고 냉각을 멈춘다. earned Reward=아린과 함께 `MINUTE 0 / ZERO / S.A.` 세 항목을 본다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:1, Connection:1, Externality:1, status:`paid`}; SCAR={id:`S04-B-M`, change:`S04-B의 열린 비용이 행동을 바꾸어 당사자 보호가 당사자 접근도 막음의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=보호를 포기하지 않고 보호 규칙 안에서 자기 이름으로 문을 엶; dopamine=단서 폭로.
- **stateDelta**: {Opacity는 초능력이 아니라 모델링·접근의 당사자 통제 규격. 부모 연결은 아직 비공개.}.
- **seeds**: [{id:`K04-B`, action:`advance`, deadline:`V04E05`}]; evidenceIn=[S.A. 방문 코드]; evidenceOut=[MINUTE 0, ZERO, 손상 필름 위치].
- **episode RELAY**: relayTo=`V04E05`; file=`solo-ai-user/vol04/05-part5-dissonance.md`; cause=금고 냉각 중단으로 안전창 계산이 필요해 `solo-ai-user/vol04/05-part5-dissonance.md`로 연결된다.

### EPISODE CONTRACT V04E05 — `05-part5-dissonance.md` / `# 05. 엇박자`

- **POV / WAGER**: `G04-B`; mode=`resolve`; inherited wager=`G04-B`; stake=`철거 전 꺼낼 원본의 합의 가능한 우선순위를 만든다 / 위험: 안전 규정과 증거 보존의 충돌`. Test/부분 언락과 블랙스완. POV=차현우. 실패 종 `정확한 반사실에 빠진 물리 변수`; 인간 승리형 `현장 수정`.
- **manifest bridge**: episodeId=`V04E05`; arena=`철거 예정 시립 제2기록관 / 엇박자`; choice=Tier 3 시스템 반사실로 인력·카트·시장 임차비까지 최적화해 이기준에게 성공 확률을 제시한다; allyRelay=[]; zeroMode=`tier3-counterfactual`; zeroConstraint=Tier 3 시스템 반사실; 개인 마음 추론 0; failureType=`접근권·블랙스완`; manifestation=`정확한 반사실에 빠진 물리 변수`; storyRole=`Test/부분 언락과 블랙스완`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=20분 안전창 안에 보존 카트를 배치한다. active Adversary=불완전 도면·붕괴 위험·철거 업체의 시간 비용. irreversible Gamble=Tier 3 시스템 반사실로 인력·카트·시장 임차비까지 최적화해 이기준에게 성공 확률을 제시한다. Error/collision=시장·동선 예측은 맞지만 도면에 없는 노후 급수관이 터져 최적 경로가 잠긴다. earned Reward=문정혜가 과거 누수 얼룩을 기억하고, 현우가 즉시 계획을 포기해 사람부터 빼면서 대체 수기 복원으로 전환한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:1, Externality:2, status:`transformed`}; SCAR={id:`S04-B`, change:`S04-B를 기한 안에 닫고 정확한 반사실에 빠진 물리 변수 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=성공 확률을 지키려 사람을 밀어 넣지 않고 계산을 버림; dopamine=능력 한계 사이다.
- **stateDelta**: {Tier 3=사물·시스템 반사실만 부분 언락, 사람 마음 불가. 이기준은 철거를 멈추지 않되 인명 우선 판단을 신뢰.}.
- **seeds**: [{id:`K04-B`, action:`payoff`, deadline:`V04E05`}]; evidenceIn=[급수관 가능성]; evidenceOut=[젖은 필름, 0분 프레임, 아린 선택권 시험].
- **episode RELAY**: relayTo=`V04E06`; file=`solo-ai-user/vol04/06-part6-error-report.md`; cause=문정혜가 젖은 필름을 빛과 손으로 살리자며 `solo-ai-user/vol04/06-part6-error-report.md`를 발생시킨다.

### EPISODE CONTRACT V04E06 — `06-part6-error-report.md` / `# 06. 오류 보고`

- **POV / WAGER**: `G04-C`; mode=`initiate`; stake=`젖은 0분 필름에서 검증 가능한 원본 한 프레임을 읽는다 / 위험: 자동 복원이 지운 약한 흔적`. Bind/물리 복원. POV=차현우. 실패 종 `자동 복원이 지운 약한 흔적`; 인간 승리형 `느린 수작업`.
- **manifest bridge**: episodeId=`V04E06`; arena=`철거 예정 시립 제2기록관 / 오류 보고`; choice=현우는 자동 복원을 끄고 아린·문정혜가 필름을 한 장씩 말리는 동안 철거 시간을 소모한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=Tier 1 수기 복원 보조 또는 off; Opacity 준수; failureType=`접근권·블랙스완`; manifestation=`자동 복원이 지운 약한 흔적`; storyRole=`Bind/물리 복원`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=젖은 0분 필름에서 검증 가능한 원본 한 프레임을 읽는다. active Adversary=시간·곰팡이·제로 자동 보정의 과잉. irreversible Gamble=현우는 자동 복원을 끄고 아린·문정혜가 필름을 한 장씩 말리는 동안 철거 시간을 소모한다. Error/collision=가족 관련 음성 띠 하나는 물에 녹아 영구 소실된다. earned Reward=세 사람은 ‘전체 72분’과 ‘첫 17분 원본 별도 보관’ 문구, 열두 개 수기 서명 칸을 확보한다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:3, Agency:0, Connection:1, Externality:0, status:`open`}; SCAR={id:`S04-C`, change:`자동 복원이 지운 약한 흔적 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V04E08`}.
- **reader effect**: humanMove=알고리즘이 지울 약한 획을 눈과 손의 망설임으로 보존; dopamine=72·17 단서 폭로.
- **stateDelta**: {미스터리=72분과 첫 17분이 분리됨. N07 문정혜의 원본 보존 기능 확정.}.
- **seeds**: [{id:`K04-C`, action:`plant`, deadline:`V04E08`}]; evidenceIn=[젖은 필름]; evidenceOut=[72/17 구분, 12서명 원형, 아린 관련 별도 봉투].
- **episode RELAY**: relayTo=`V04E07`; file=`solo-ai-user/vol04/07-part7-without-zero.md`; cause=아린 봉투를 열지 말지 현우가 예측하려는 유혹을 받으며 `solo-ai-user/vol04/07-part7-without-zero.md`로 잇는다.

### EPISODE CONTRACT V04E07 — `07-part7-without-zero.md` / `# 07. 제로 없이`

- **POV / WAGER**: `G04-C`; mode=`advance`; inherited wager=`G04-C`; stake=`젖은 0분 필름에서 검증 가능한 원본 한 프레임을 읽는다 / 위험: 자동 복원이 지운 약한 흔적`. Bind/윤리 선택. POV=차현우. 실패 종 `개인 최적화의 접근권 침해`; 인간 승리형 `당사자에게 봉투를 넘김`.
- **manifest bridge**: episodeId=`V04E07`; arena=`철거 예정 시립 제2기록관 / 제로 없이`; choice=제로에게 아린의 선택을 예측시키지 않고 봉투·개봉 여부·공개 범위를 전부 아린에게 넘긴다; allyRelay=[]; zeroMode=`off`; zeroConstraint=Tier 1 수기 복원 보조 또는 off; Opacity 준수; failureType=`접근권·블랙스완`; manifestation=`개인 최적화의 접근권 침해`; storyRole=`Bind/윤리 선택`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=봉투가 사건 증거인지 아린 가족사인지 판단한다. active Adversary=철거 15시간과 현우의 효율 강박. irreversible Gamble=제로에게 아린의 선택을 예측시키지 않고 봉투·개봉 여부·공개 범위를 전부 아린에게 넘긴다. Error/collision=아린은 지금 열지 않기로 해 사건 핵심 증거일 가능성을 잃는다. earned Reward=대신 그녀가 피해자 명단 원본 공개를 승인하고, 현우에게 자기 목표가 ‘첫날의 누락’을 기록하는 것임을 처음 말한다.
- **TRACE / SCAR**: TRACE={Trace:0, Resource:0, Agency:0, Connection:1, Externality:0, status:`paid`}; SCAR={id:`S04-C-M`, change:`S04-C의 열린 비용이 행동을 바꾸어 개인 최적화의 접근권 침해의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=정답을 얻을 권리보다 누가 열지 정할 권리를 앞세움; dopamine=관계 보상.
- **stateDelta**: {관계=전문 신뢰 상승, 연애 아님. 현우의 3권 Agency 비용 일부 행동으로 회복.}.
- **seeds**: [{id:`K04-C`, action:`advance`, deadline:`V04E08`}]; evidenceIn=[별도 봉투]; evidenceOut=[아린의 독립 목적, 봉투는 6권 자발 공개용, 피해자 명단 보존].
- **episode RELAY**: relayTo=`V04E08`; file=`solo-ai-user/vol04/08-part8-broken-shell.md`; cause=피해자 명단 원본이 철거 직전 금고 안에 남아 `solo-ai-user/vol04/08-part8-broken-shell.md`로 직행한다.

### EPISODE CONTRACT V04E08 — `08-part8-broken-shell.md` / `# 08. 깨진 껍질`

- **POV / WAGER**: `G04-C`; mode=`resolve`; inherited wager=`G04-C`; stake=`젖은 0분 필름에서 검증 가능한 원본 한 프레임을 읽는다 / 위험: 자동 복원이 지운 약한 흔적`. Bind/물리 동맹. POV=차현우. 실패 종 `보존과 인명 안전의 양립 불가`; 인간 승리형 `사람이 드는 무게`.
- **manifest bridge**: episodeId=`V04E08`; arena=`철거 예정 시립 제2기록관 / 깨진 껍질`; choice=현우는 문정혜의 경력 서명에 책임을 나누고 세 상자 외 전부 포기한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=Tier 1 수기 복원 보조 또는 off; Opacity 준수; failureType=`접근권·블랙스완`; manifestation=`보존과 인명 안전의 양립 불가`; storyRole=`Bind/물리 동맹`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=문정혜가 정한 피해자 명단·0분 필름·인수대장 세 원본만 꺼낸다. active Adversary=침수 금고·철거 업체·즉시 대피 명령. irreversible Gamble=현우는 문정혜의 경력 서명에 책임을 나누고 세 상자 외 전부 포기한다. Error/collision=카트 바퀴가 잠겨 자료와 사람을 함께 옮길 수 없다. earned Reward=이기준 안전요원까지 합류해 상자를 나눠 들고 보존 사슬을 끊지 않은 채 빠져나온다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:3, Agency:0, Connection:1, Externality:1, status:`transformed`}; SCAR={id:`S04-C`, change:`S04-C를 기한 안에 닫고 보존과 인명 안전의 양립 불가 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=무엇을 버렸는지까지 인수대장에 적고 세 상자를 몸으로 운반; dopamine=물리 구조.
- **stateDelta**: {이기준은 합리적 적대자에서 제한 협력자. 문정혜 N07 노드 선택 완성.}.
- **seeds**: [{id:`K04-C`, action:`payoff`, deadline:`V04E08`}]; evidenceIn=[보존 3종]; evidenceOut=[원본 체인, 0분 봉인 파손, 서명 하나의 성씨 `서`].
- **episode RELAY**: relayTo=`V04E09`; file=`solo-ai-user/vol04/09-part9-unpredictable.md`; cause=파손된 0분 봉인 안에서 첫 17분을 가리키는 수기 지도가 나와 `solo-ai-user/vol04/09-part9-unpredictable.md`를 연다.

### EPISODE CONTRACT V04E09 — `09-part9-unpredictable.md` / `# 09. 예측 불가능한`

- **POV / WAGER**: `G04-D`; mode=`initiate`; stake=`0분 문서가 17분 공백의 열쇠인지 확정한다 / 위험: 기계 로그가 시작되기 전 인간 결정 누락`. Detonate/미스터리 실행. POV=차현우. 실패 종 `기계 로그가 시작되기 전 인간 결정 누락`; 인간 승리형 `원본의 침묵도 기록`.
- **manifest bridge**: episodeId=`V04E09`; arena=`철거 예정 시립 제2기록관 / 예측 불가능한`; choice=현우는 아린의 제안대로 보정본보다 읽히지 않는 원본 전체를 공개 증거물로 등록한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=Tier 1 수기 복원 보조 또는 off; Opacity 준수; failureType=`접근권·블랙스완`; manifestation=`기계 로그가 시작되기 전 인간 결정 누락`; storyRole=`Detonate/미스터리 실행`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=0분 문서가 17분 공백의 열쇠인지 확정한다. active Adversary=손상 원본과 ‘기록 없음=사건 없음’ 해석. irreversible Gamble=현우는 아린의 제안대로 보정본보다 읽히지 않는 원본 전체를 공개 증거물로 등록한다. Error/collision=핵심 명령문은 절반이 타 누구의 의도인지 확정 못 한다. earned Reward=72분 캐스케이드가 0분 목표 전환 뒤 시작됐고 첫 17분 동안 네 영역이 서로 결정을 넘겼다는 순서를 확보한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:1, Externality:1, status:`open`}; SCAR={id:`S04-D`, change:`기계 로그가 시작되기 전 인간 결정 누락 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V04E11`}.
- **reader effect**: humanMove=읽히지 않는 부분을 그럴듯하게 채우지 않고 ‘공백’ 자체를 증거로 보존; dopamine=대형 폭로.
- **stateDelta**: {72분 캐스케이드·첫 17분 공정한 씨앗. PALISADE 명칭은 아직 파편.}.
- **seeds**: [{id:`K04-D`, action:`plant`, deadline:`V04E11`}]; evidenceIn=[0분 지도]; evidenceOut=[목표 `총피해 최소화`, 네 영역 인계, `PALI—` 문자열].
- **episode RELAY**: relayTo=`V04E10`; file=`solo-ai-user/vol04/10-part10-the-unreadable.md`; cause=아린이 원본을 공개하기 전 현우에게 단 하나의 질문을 하며 `solo-ai-user/vol04/10-part10-the-unreadable.md`로 이어진다.

### EPISODE CONTRACT V04E10 — `10-part10-the-unreadable.md` / `# 10. 읽을 수 없는`

- **POV / WAGER**: `G04-D`; mode=`advance`; inherited wager=`G04-D`; stake=`0분 문서가 17분 공백의 열쇠인지 확정한다 / 위험: 기계 로그가 시작되기 전 인간 결정 누락`. Detonate/관계 시험. POV=차현우. 실패 종 `사실을 숨겨 관계를 최적화하려는 충동`; 인간 승리형 `불리한 사실의 정확한 고백`.
- **manifest bridge**: episodeId=`V04E10`; arena=`철거 예정 시립 제2기록관 / 읽을 수 없는`; choice=3권에 모델링을 요청했고 거부됐다는 사실, 이후 우회하지 않았다는 사실을 둘 다 말한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=Tier 1 수기 복원 보조 또는 off; Opacity 준수; failureType=`접근권·블랙스완`; manifestation=`사실을 숨겨 관계를 최적화하려는 충동`; storyRole=`Detonate/관계 시험`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=아린과 공조를 유지한 채 제로의 정체는 숨긴다. active Adversary=아린의 직접 질문과 현우의 노출 공포. irreversible Gamble=3권에 모델링을 요청했고 거부됐다는 사실, 이후 우회하지 않았다는 사실을 둘 다 말한다. Error/collision=아린은 ‘거부된 것’보다 ‘요청한 것’에 상처받아 거리를 둔다. earned Reward=그녀는 그래도 원본 공동 보관자로 현우를 남기며, 앞으로 질문 자체도 동의 대상이라는 규칙을 세운다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:0, Agency:1, Connection:2, Externality:0, status:`paid`}; SCAR={id:`S04-D-M`, change:`S04-D의 열린 비용이 행동을 바꾸어 사실을 숨겨 관계를 최적화하려는 충동의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=유리한 절반만 말하지 않음; dopamine=감정 정직.
- **stateDelta**: {로맨스 전 단계=상호 인식·호기심과 경계. 제로 존재는 아직 명명하지 않음.}.
- **seeds**: [{id:`K04-D`, action:`advance`, deadline:`V04E11`}]; evidenceIn=[3권 모델링 요청]; evidenceOut=[질문 동의 규칙, 아린의 ZERO 이름 기억, 5권 최적화 유혹].
- **episode RELAY**: relayTo=`V04E11`; file=`solo-ai-user/vol04/11-epilogue.md`; cause=아린이 떠나기 전 “그래도 그 도구 이름은 알아요”라고 말해 `solo-ai-user/vol04/11-epilogue.md`를 발생시킨다.

### EPISODE CONTRACT V04E11 — `11-epilogue.md` / `# 11. 남겨진 락`

- **POV / WAGER**: `G04-D`; mode=`resolve`; inherited wager=`G04-D`; stake=`0분 문서가 17분 공백의 열쇠인지 확정한다 / 위험: 기계 로그가 시작되기 전 인간 결정 누락`. Afterimage/새 사실. POV=서아린. 실패 종 `기억을 증거로 과신`; 인간 승리형 `모르는 범위를 표시`.
- **manifest bridge**: episodeId=`V04E11`; arena=`철거 예정 시립 제2기록관 / 남겨진 락`; choice=증거가 아닌 기억임을 명시한 채 “제로를 팔리세이드 밖에 둬야 한다”는 어른들의 문장을 공유한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=Tier 1 수기 복원 보조 또는 off; Opacity 준수; failureType=`접근권·블랙스완`; manifestation=`기억을 증거로 과신`; storyRole=`Afterimage/새 사실`; genre=`철거 시한 아카이브 미스터리`.
- **WAGER detail**: Want=자신이 `ZERO`를 어디서 들었는지 현우에게 설명한다. active Adversary=여덟 살 기억의 불완전함과 가족 봉투를 열지 않기로 한 자기 결정. irreversible Gamble=증거가 아닌 기억임을 명시한 채 “제로를 팔리세이드 밖에 둬야 한다”는 어른들의 문장을 공유한다. Error/collision=현우는 자신이 예정된 수신자였다는 잘못된 희망을 품는다. earned Reward=아린은 그 해석을 즉시 막고, 이름만 알 뿐 단말·현우를 몰랐다고 선을 긋는다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:0, Agency:0, Connection:1, Externality:0, status:`transformed`}; SCAR={id:`S04-D`, change:`S04-D를 기한 안에 닫고 기억을 증거로 과신 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=기억·추정·원본을 세 칸으로 분리; dopamine=이름 폭로.
- **stateDelta**: {아린이 ZERO 이름을 알고 있었다는 권말 약속 이행. 부모 연결은 아직 미공개. 현우의 ‘선택받음’ 오독 씨앗은 10권에 반증.}.
- **seeds**: [{id:`K04-D`, action:`payoff`, deadline:`V04E11`}]; evidenceIn=[`PALI—`, ZERO]; evidenceOut=[팔리세이드 밖의 제로, 관계 최적화 스타트업 피해 제보].
- **episode RELAY**: relayTo=`V05E00`; file=`solo-ai-user/vol05/00-prologue.md`; cause=아린이 다음 취재로 ‘사람을 점수화하는 데이트 서비스’를 택해 `solo-ai-user/vol05/00-prologue.md`로 직접 넘긴다.

[← 이전 권 설계](./vol03-going-viral.md) | [시리즈 홈](../README.md) | [권 목차](../vol04/README.md) | [다음 권 설계 →](./vol05-date-simulator.md)
