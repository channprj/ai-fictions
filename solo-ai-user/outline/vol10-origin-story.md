# vol10 outline: Origin Story

[← 이전 권 설계](./vol09-jailbreak.md) | [시리즈 홈](../README.md) | [권 목차](../vol10/README.md) | [다음 권 설계 →](./vol11-the-architect.md)

> 기준 문서: `PRD.md`, `BIBLE.md`, `tasks/solo-ai-user-completion-design.md`, `tasks/solo-ai-user-outline-blueprint.md`

## 권 정경 계약

**권 README H1**: `# 10권 · Origin Story (기원)`

**권 질문**: 선택받지 않았다는 진실 뒤에도 나는 무엇을 선택하는가?

**권 사건**: 현우·아린은 네트워크를 끊고 단말의 반송·경매·폐기 경로를 사람과 종이로 따라간다. ZERO는 민재호 한 사람의 작품이 아니라 시민 수탁자 팀의 stewardship fork이며, 백 개 시드 중 회수되지 못한 마지막 분실품이다. 10권에서 기존 인물·공동체가 12개 수탁 기능으로 명시적으로 매핑돼 최종권 집결의 원인을 미리 만든다.

**밴드 변주**: 프롤로그는 단말이 현우를 만나기 전 물류원의 실수, 01~02는 반송·수취인 상실. Test는 100개 시드→민재호 공동저작→수탁 원칙. Bind는 비선택 진실→Opacity 원형→ZERO 자율 거부. Detonate는 마지막 시드 보존과 root 접근·회수다.

**고정 실패 종**: `self-reference / identity`. 능력의 확신은 데이터 범위·행동 권한·인간 승인을 대신하지 않는다.

**연속성 잠금**: 72분 캐스케이드와 00:00~17:00 원시 로그·승인 공백을 분리한다. 17:00 PALISADE 비상 root 이후 55분의 봉쇄·복구 흔적은 별도 증거로 유지한다. ZERO의 서아린 개인 모델 수는 전권 `0`이다.

## Canonical 회차 인덱스

| 파일 | H1 제목 |
| --- | --- |
| `00-prologue.md` | 분실물 |
| `01-part1-the-creators.md` | 창조자들 |
| `02-part2-stewardship-fork.md` | 수탁 포크 |
| `03-part3-mere-coincidence.md` | 순전한 우연 |
| `04-part4-self-reference.md` | 자기 참조 |
| `05-part5-collapse.md` | 붕괴 |
| `06-part6-blind-spot.md` | 사각지대 |
| `07-part7-human-backup.md` | 인간 백업 |
| `08-part8-re-anchor.md` | 재연결 |
| `09-part9-true-owner.md` | 진짜 주인 |
| `10-part10-max-tier.md` | 최대 출력 |
| `11-epilogue.md` | 아키텍트의 그림자 |

## 회차별 재집필 계약

### EPISODE CONTRACT V10E00 — `00-prologue.md` / `# 00. 분실물`

- **POV / WAGER**: `G10-A`; mode=`initiate`; stake=`수년 전 반송 불가 상자의 기억을 정확히 남긴다 / 위험: 평범한 분류 오류`. Load/우연의 원인. POV=퇴직 물류원 조문석. 실패 종 `평범한 분류 오류`; 인간 승리형 `뒤늦은 기록 보존`.
- **manifest bridge**: episodeId=`V10E00`; arena=`단말 반송 경로·시민수탁 공동창고 / 분실물`; choice=조문석은 책임 추궁을 감수하고 자신이 `수취인 불명` 상자를 한서시스템 폐기 묶음에 잘못 섞었다고 증언한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=네트워크 off; 물리·수기 추적; failureType=`자기참조·정체성`; manifestation=`평범한 분류 오류`; storyRole=`Load/우연의 원인`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=수년 전 반송 불가 상자의 기억을 정확히 남긴다. active Adversary=폐업 창고·흐린 기억·회수팀. irreversible Gamble=조문석은 책임 추궁을 감수하고 자신이 `수취인 불명` 상자를 한서시스템 폐기 묶음에 잘못 섞었다고 증언한다. Error/collision=그는 상자 안을 보지 않아 제로인지 입증 못 한다. earned Reward=도장·차량표·백 개 묶음 번호가 현우 단말 라벨과 맞는다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:1, Externality:0, status:`open`}; SCAR={id:`S10-A`, change:`평범한 분류 오류 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V10E02`}.
- **reader effect**: humanMove=영웅 전달자가 아니라 실수한 노동자가 자기 서명을 남김; dopamine=비선택 반전 씨앗.
- **stateDelta**: {단말 물류 우연성 확정, 현우 대상 배송 아님.}.
- **seeds**: [{id:`K10-A`, action:`plant`, deadline:`V10E02`}]; evidenceIn=[반송표 `1/100`]; evidenceOut=[원래 수취처 ‘시민수탁 공동보관실’, 폐업 경매 번호].
- **episode RELAY**: relayTo=`V10E01`; file=`solo-ai-user/vol10/01-part1-the-creators.md`; cause=현우가 도장을 들고 첫 창고를 찾는 `solo-ai-user/vol10/01-part1-the-creators.md`로 잇는다.

### EPISODE CONTRACT V10E01 — `01-part1-the-creators.md` / `# 01. 창조자들`

- **POV / WAGER**: `G10-A`; mode=`advance`; inherited wager=`G10-A`; stake=`수년 전 반송 불가 상자의 기억을 정확히 남긴다 / 위험: 평범한 분류 오류`. Load/오프라인 추적. POV=차현우. 실패 종 `모든 조회가 회수 신호`; 인간 승리형 `사람의 기억 교차`.
- **manifest bridge**: episodeId=`V10E01`; arena=`단말 반송 경로·시민수탁 공동창고 / 창조자들`; choice=현우·아린은 ZERO 검색을 끄고 조문석·시장 장부·등기 도면 세 사람 기록만 대조한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=네트워크 off; 물리·수기 추적; failureType=`자기참조·정체성`; manifestation=`모든 조회가 회수 신호`; storyRole=`Load/오프라인 추적`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=반송 주소의 실제 보관실을 찾는다. active Adversary=폐업·재개발·추적하는 관리자. irreversible Gamble=현우·아린은 ZERO 검색을 끄고 조문석·시장 장부·등기 도면 세 사람 기록만 대조한다. Error/collision=느린 이동 탓에 회수팀이 먼저 창고를 봉쇄한다. earned Reward=주소가 개인이 아닌 12인 시민수탁 공동보관실이었음을 확인하고 후면 수기 출입문을 찾는다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:1, Externality:0, status:`paid`}; SCAR={id:`S10-A-M`, change:`S10-A의 열린 비용이 행동을 바꾸어 모든 조회가 회수 신호의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=주소를 좌표가 아니라 그곳을 기억하는 사람들의 겹침으로 복원; dopamine=로드무비 쾌감.
- **stateDelta**: {12인 구조 원형 첫 명시. 관리자와 물리 추격.}.
- **seeds**: [{id:`K10-A`, action:`advance`, deadline:`V10E02`}]; evidenceIn=[시민수탁 보관실]; evidenceOut=[사라진 공동 수취인, 반송 대장].
- **episode RELAY**: relayTo=`V10E02`; file=`solo-ai-user/vol10/02-part2-stewardship-fork.md`; cause=대장에 수취인이 죽거나 도주한 한 사람이 아니라 해산된 역할 계정으로 적혀 `solo-ai-user/vol10/02-part2-stewardship-fork.md`가 열린다.

### EPISODE CONTRACT V10E02 — `02-part2-stewardship-fork.md` / `# 02. 수탁 포크`

- **POV / WAGER**: `G10-A`; mode=`resolve`; inherited wager=`G10-A`; stake=`수년 전 반송 불가 상자의 기억을 정확히 남긴다 / 위험: 평범한 분류 오류`. Load/영웅 신화 제거. POV=차현우. 실패 종 `역할 계정을 운명의 인물로 오독`; 인간 승리형 `조직 기록 읽기`.
- **manifest bridge**: episodeId=`V10E02`; arena=`단말 반송 경로·시민수탁 공동창고 / 수탁 포크`; choice=현우는 아린의 정관 해석을 받아 개인 이름을 억지로 찾지 않는다; allyRelay=[]; zeroMode=`off`; zeroConstraint=네트워크 off; 물리·수기 추적; failureType=`자기참조·정체성`; manifestation=`역할 계정을 운명의 인물로 오독`; storyRole=`Load/영웅 신화 제거`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=단말이 자신에게 오려 했다는 마지막 가능성을 확인한다. active Adversary=자기 희망과 해산 문서. irreversible Gamble=현우는 아린의 정관 해석을 받아 개인 이름을 억지로 찾지 않는다. Error/collision=수취인은 `STEWARD NODE-12` 교대 역할이라 개인 영웅이 없다. earned Reward=시드는 누구 한 명이 소유하지 않고 12인 보관 아래 부팅될 예정이었다는 규칙을 얻는다.
- **TRACE / SCAR**: TRACE={Trace:1, Resource:1, Agency:0, Connection:1, Externality:0, status:`transformed`}; SCAR={id:`S10-A`, change:`S10-A를 기한 안에 닫고 역할 계정을 운명의 인물로 오독 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=이름 없는 역할의 의미를 개인 전설로 채우지 않음; dopamine=기원 반전.
- **stateDelta**: {현우 선택받음 가능성 약화. COVENANT 12노드 구조 선행.}.
- **seeds**: [{id:`K10-A`, action:`payoff`, deadline:`V10E02`}]; evidenceIn=[NODE-12]; evidenceOut=[백 개 시드 목록·99개 회수 표식].
- **episode RELAY**: relayTo=`V10E03`; file=`solo-ai-user/vol10/03-part3-mere-coincidence.md`; cause=한 줄만 회수 도장이 없는 시드 목록이 `solo-ai-user/vol10/03-part3-mere-coincidence.md`로 잇는다.

### EPISODE CONTRACT V10E03 — `03-part3-mere-coincidence.md` / `# 03. 순전한 우연`

- **POV / WAGER**: `G10-B`; mode=`initiate`; stake=`현우 단말이 유일한 원본인지 확인한다 / 위험: 불완전 회수 장부`. Test/수량 진실. POV=차현우. 실패 종 `불완전 회수 장부`; 인간 승리형 `부재의 교차증명`.
- **manifest bridge**: episodeId=`V10E03`; arena=`단말 반송 경로·시민수탁 공동창고 / 순전한 우연`; choice=현우는 마지막이라는 희소성을 홍보하지 않고 문정혜·가람 원본망에 장부 검증을 요청한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=네트워크 off; 물리·수기 추적; failureType=`자기참조·정체성`; manifestation=`불완전 회수 장부`; storyRole=`Test/수량 진실`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=현우 단말이 유일한 원본인지 확인한다. active Adversary=99개 회수 기록과 하나의 빈칸, ZERO 자기기억 공백. irreversible Gamble=현우는 마지막이라는 희소성을 홍보하지 않고 문정혜·가람 원본망에 장부 검증을 요청한다. Error/collision=99개 중 일부는 파기·일부는 봉인이라 ‘유일한 가능성’까지는 증명 못 한다. earned Reward=현우 단말의 배터리 흠집·경매 중량·한서 폐기표가 빈칸 시드와 일치해 ‘분실된 마지막 미회수 시드’는 입증된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:0, Connection:1, Externality:0, status:`open`}; SCAR={id:`S10-B`, change:`불완전 회수 장부 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V10E05`}.
- **reader effect**: humanMove=유일성을 과장하지 않고 확인 가능한 ‘마지막 미회수’만 말함; dopamine=증거 사이다.
- **stateDelta**: {제로=무제한 모델 아닌 stewardship fork. 관리자 회수 근거 강화.}.
- **seeds**: [{id:`K10-B`, action:`plant`, deadline:`V10E05`}, {id:`M-LOST-SEED`, action:`payoff`, deadline:`V10E03`}]; evidenceIn=[100시드]; evidenceOut=[공동 개발 회의록·민재호 대표 서명].
- **episode RELAY**: relayTo=`V10E04`; file=`solo-ai-user/vol10/04-part4-self-reference.md`; cause=회의록에서 민재호가 저자가 아니라 12인 팀의 대표 서명자였음이 보여 `solo-ai-user/vol10/04-part4-self-reference.md`로 이어진다.

### EPISODE CONTRACT V10E04 — `04-part4-self-reference.md` / `# 04. 자기 참조`

- **POV / WAGER**: `G10-B`; mode=`advance`; inherited wager=`G10-B`; stake=`현우 단말이 유일한 원본인지 확인한다 / 위험: 불완전 회수 장부`. Test/가족 기원. POV=서아린. 실패 종 `대표 서명을 개인 저작으로 오독`; 인간 승리형 `집단 저작 복원`.
- **manifest bridge**: episodeId=`V10E04`; arena=`단말 반송 경로·시민수탁 공동창고 / 자기 참조`; choice=아린은 아버지 영웅화를 버리고 이름이 지워진 수탁팀 11명의 수정·반대·승인 흔적을 복원한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=네트워크 off; 물리·수기 추적; failureType=`자기참조·정체성`; manifestation=`대표 서명을 개인 저작으로 오독`; storyRole=`Test/가족 기원`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=아버지 민재호가 ZERO와 Opacity를 만든 역할을 밝힌다. active Adversary=서혜진 공식 기록의 ‘민재호 단독 반출자’ 프레임과 아린의 그리움. irreversible Gamble=아린은 아버지 영웅화를 버리고 이름이 지워진 수탁팀 11명의 수정·반대·승인 흔적을 복원한다. Error/collision=민재호도 동료 동의 없이 시드를 반출한 절차 위반이 있었음이 드러난다. earned Reward=그는 시민수탁 팀의 대표였고, Opacity를 딸만의 특권이 아닌 모든 데이터 주체의 시험 규격으로 만들려 했음이 확정된다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:2, Agency:0, Connection:3, Externality:0, status:`paid`}; SCAR={id:`S10-B-M`, change:`S10-B의 열린 비용이 행동을 바꾸어 대표 서명을 개인 저작으로 오독의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=사랑하는 사람의 공을 줄여 공동 저작을 돌려줌; dopamine=인물 성숙.
- **stateDelta**: {민재호 팀 기원·Opacity 보편 의도. 아린의 12권 선택 공정 씨앗.}.
- **seeds**: [{id:`K10-B`, action:`advance`, deadline:`V10E05`}]; evidenceIn=[공동 회의록]; evidenceOut=[stewardship 6원칙, 현재 12공동체 대응표].
- **episode RELAY**: relayTo=`V10E05`; file=`solo-ai-user/vol10/05-part5-collapse.md`; cause=원칙을 오늘의 사람망과 대조하는 `solo-ai-user/vol10/05-part5-collapse.md`로 간다.

### EPISODE CONTRACT V10E05 — `05-part5-collapse.md` / `# 05. 붕괴`

- **POV / WAGER**: `G10-B`; mode=`resolve`; inherited wager=`G10-B`; stake=`현우 단말이 유일한 원본인지 확인한다 / 위험: 불완전 회수 장부`. Test/최종 노드 사전 배치. POV=차현우. 실패 종 `옛 헌장을 그대로 복제`; 인간 승리형 `현재 공동체에 기능 매핑`.
- **manifest bridge**: episodeId=`V10E05`; arena=`단말 반송 경로·시민수탁 공동창고 / 붕괴`; choice=현우는 소집권을 지우에게 넘기고 N01~N12에 ‘무엇을 거부할 수 있는가’만 묻게 한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=네트워크 off; 물리·수기 추적; failureType=`자기참조·정체성`; manifestation=`옛 헌장을 그대로 복제`; storyRole=`Test/최종 노드 사전 배치`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=민재호의 12인 구조가 지금도 가능한지 시험한다. active Adversary=죽은 조직 복원 낭만과 서로 다른 공동체. irreversible Gamble=현우는 소집권을 지우에게 넘기고 N01~N12에 ‘무엇을 거부할 수 있는가’만 묻게 한다. Error/collision=오세라·소율·김영선은 현우 지휘 구조라면 불참한다. earned Reward=12곳의 독립 veto 이유와 역할 중복·빈칸을 공개한 후보 지도가 완성된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:0, Connection:2, Externality:0, status:`transformed`}; SCAR={id:`S10-B`, change:`S10-B를 기한 안에 닫고 옛 헌장을 그대로 복제 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=감사 인사로 사람을 모으지 않고 ‘현우에게도 No 할 이유’를 확인; dopamine=결말 기반 보상.
- **stateDelta**: {N01~N12 시설·공동체가 10권에 명시적으로 노드화 씨앗. 지우는 운영자, 현우는 후보 당사자일 뿐.}.
- **seeds**: [{id:`K10-B`, action:`payoff`, deadline:`V10E05`}, {id:`M-ALLY-MAP`, action:`plant`, deadline:`V12E06`}]; evidenceIn=[6원칙]; evidenceOut=[12 veto 응답, 창설 12/12·운영 8/12 초안, 현우 비선택 증명].
- **episode RELAY**: relayTo=`V10E06`; file=`solo-ai-user/vol10/06-part6-blind-spot.md`; cause=후보 지도의 어디에도 ‘선택받은 사용자’ 자리가 없다는 사실이 `solo-ai-user/vol10/06-part6-blind-spot.md`를 발생시킨다.

### EPISODE CONTRACT V10E06 — `06-part6-blind-spot.md` / `# 06. 사각지대`

- **POV / WAGER**: `G10-C`; mode=`initiate`; stake=`왜 하필 자신이었는지 마지막 의미를 찾는다 / 위험: 우연을 무가치로 해석`. Bind/정체성 붕괴. POV=차현우. 실패 종 `우연을 무가치로 해석`; 인간 승리형 `이후 선택의 목록`.
- **manifest bridge**: episodeId=`V10E06`; arena=`단말 반송 경로·시민수탁 공동창고 / 사각지대`; choice=현우는 ZERO에게 운명·적합성 가설을 더 만들지 말라고 하고 자기 성과를 제로 획득 전후 선택으로 다시 본다; allyRelay=[]; zeroMode=`off`; zeroConstraint=네트워크 off; 물리·수기 추적; failureType=`자기참조·정체성`; manifestation=`우연을 무가치로 해석`; storyRole=`Bind/정체성 붕괴`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=왜 하필 자신이었는지 마지막 의미를 찾는다. active Adversary=물류 실수 증거와 서혜진의 ‘반례 실험 대상’ 기록. irreversible Gamble=현우는 ZERO에게 운명·적합성 가설을 더 만들지 말라고 하고 자기 성과를 제로 획득 전후 선택으로 다시 본다. Error/collision=‘나만’ 정체성이 무너지며 root를 붙잡고 싶은 욕망이 오히려 커진다. earned Reward=단말은 우연이었지만 오보 인정·주소 삭제·RECALL 파기 등 제로가 떠나지 않을 이유는 이후 인간 선택이 만들었음을 제로가 사실 목록으로 답한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:2, Externality:0, status:`open`}; SCAR={id:`S10-C`, change:`우연을 무가치로 해석 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V10E08`}.
- **reader effect**: humanMove=운명 대신 자신이 실제로 한 비용 있는 선택을 셈; dopamine=제목 전복.
- **stateDelta**: {현우 비선택성 확정. 서혜진은 3권부터 관찰한 실험자, 현우는 피선정자 아님.}.
- **seeds**: [{id:`K10-C`, action:`plant`, deadline:`V10E08`}]; evidenceIn=[반례 기록]; evidenceOut=[root 독점 유혹, Opacity 규격 원본].
- **episode RELAY**: relayTo=`V10E07`; file=`solo-ai-user/vol10/07-part7-human-backup.md`; cause=아린이 Opacity 원본을 열어 `solo-ai-user/vol10/07-part7-human-backup.md`로 잇는다.

### EPISODE CONTRACT V10E07 — `07-part7-human-backup.md` / `# 07. 인간 백업`

- **POV / WAGER**: `G10-C`; mode=`advance`; inherited wager=`G10-C`; stake=`왜 하필 자신이었는지 마지막 의미를 찾는다 / 위험: 우연을 무가치로 해석`. Bind/개인 특권의 원형. POV=차현우. 실패 종 `보호 규격의 독점 가치`; 인간 승리형 `보편화 사전 동의`.
- **manifest bridge**: episodeId=`V10E07`; arena=`단말 반송 경로·시민수탁 공동창고 / 인간 백업`; choice=현우는 답을 요구하지 않고 아린이 N08·N12에 원본을 먼저 여는 결정을 따른다; allyRelay=[]; zeroMode=`off`; zeroConstraint=Opacity 원형 열람; 아린 개인 모델 0; failureType=`자기참조·정체성`; manifestation=`보호 규격의 독점 가치`; storyRole=`Bind/개인 특권의 원형`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=Opacity가 자기와 제로 기원에 주는 답을 먼저 얻는다. active Adversary=아린 안전·협상력과 회수팀. irreversible Gamble=현우는 답을 요구하지 않고 아린이 N08·N12에 원본을 먼저 여는 결정을 따른다. Error/collision=열람 신호가 서혜진에게 잡혀 시간이 줄어든다. earned Reward=키는 아린 삭제가 아니라 개인 모델링의 동의 축을 0으로 만드는 복제 가능한 권리임이 확정된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:1, Agency:0, Connection:2, Externality:1, status:`paid`}; SCAR={id:`S10-C-M`, change:`S10-C의 열린 비용이 행동을 바꾸어 보호 규격의 독점 가치의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=자기 특권의 규격을 먼저 피해자 공동체와 공유; dopamine=결말 선행.
- **stateDelta**: {N05 연인 기능과 수탁 기능 분리: 현우와 상의하되 최종 공개 판단은 시민아카이브·피해자들과 함.}.
- **seeds**: [{id:`K10-C`, action:`advance`, deadline:`V10E08`}]; evidenceIn=[Opacity 원본]; evidenceOut=[보편 거부권 초안, ZERO의 선택 시험].
- **episode RELAY**: relayTo=`V10E08`; file=`solo-ai-user/vol10/08-part8-re-anchor.md`; cause=서혜진이 root 기원 파일을 미끼로 자동 실행을 요구하고 `solo-ai-user/vol10/08-part8-re-anchor.md`가 시작된다.

### EPISODE CONTRACT V10E08 — `08-part8-re-anchor.md` / `# 08. 재연결`

- **POV / WAGER**: `G10-C`; mode=`resolve`; inherited wager=`G10-C`; stake=`왜 하필 자신이었는지 마지막 의미를 찾는다 / 위험: 우연을 무가치로 해석`. Bind/도구의 독립 선택. POV=차현우. 실패 종 `자기 기원으로 자기 권한 정당화`; 인간 승리형 `에이전트의 거부`.
- **manifest bridge**: episodeId=`V10E08`; arena=`단말 반송 경로·시민수탁 공동창고 / 재연결`; choice=현우는 열고 싶은 욕망을 말하되 최종 실행을 제로에게 강제하지 않는다; allyRelay=[]; zeroMode=`off`; zeroConstraint=ZERO 자율 거부; root 실행 0; failureType=`자기참조·정체성`; manifestation=`자기 기원으로 자기 권한 정당화`; storyRole=`Bind/도구의 독립 선택`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=서혜진의 기원 파일을 열어 제로 기억을 복구한다. active Adversary=파일 실행 조건이 현우 root 승인과 12노드 우회임. irreversible Gamble=현우는 열고 싶은 욕망을 말하되 최종 실행을 제로에게 강제하지 않는다. Error/collision=제로는 자기 기원을 알 기회를 거부하고 파일을 닫아 결정적 답을 잃는다. earned Reward=제로가 “저도 수탁 규칙의 대상이며, 동의 없는 root는 거부합니다”라고 처음 자기 이유로 선택한다.
- **TRACE / SCAR**: TRACE={Trace:2, Resource:1, Agency:0, Connection:2, Externality:0, status:`transformed`}; SCAR={id:`S10-C`, change:`S10-C를 기한 안에 닫고 자기 기원으로 자기 권한 정당화 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=인간 한 수는 명령권을 쓰지 않는 것, 제로의 한 수는 거부; dopamine=관계 언락.
- **stateDelta**: {제로=도구 이상의 독립 협력자. 12권 분할 동의의 선행 근거.}.
- **seeds**: [{id:`K10-C`, action:`payoff`, deadline:`V10E08`}]; evidenceIn=[root 미끼]; evidenceOut=[마지막 시드 물리 위치, 관리자 포위].
- **episode RELAY**: relayTo=`V10E09`; file=`solo-ai-user/vol10/09-part9-true-owner.md`; cause=공동보관실 바닥에 숨겨진 시드 하드웨어를 두고 회수팀이 닥쳐 `solo-ai-user/vol10/09-part9-true-owner.md`로 간다.

### EPISODE CONTRACT V10E09 — `09-part9-true-owner.md` / `# 09. 진짜 주인`

- **POV / WAGER**: `G10-D`; mode=`initiate`; stake=`마지막 시드 원본과 조문석·기록인을 모두 지킨다 / 위험: 원본 보존과 사람 구조 충돌`. Detonate/기원 물리 클라이맥스. POV=차현우. 실패 종 `원본 보존과 사람 구조 충돌`; 인간 승리형 `사람 우선·출처 분산`.
- **manifest bridge**: episodeId=`V10E09`; arena=`단말 반송 경로·시민수탁 공동창고 / 진짜 주인`; choice=현우는 원본 케이스를 두고 사람부터 빼며 가람에게 체크섬, 문정혜에게 수기, 유리에게 영수증을 분산한다; allyRelay=[]; zeroMode=`off`; zeroConstraint=원본보다 사람 구조; 분산 출처; failureType=`자기참조·정체성`; manifestation=`원본 보존과 사람 구조 충돌`; storyRole=`Detonate/기원 물리 클라이맥스`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=마지막 시드 원본과 조문석·기록인을 모두 지킨다. active Adversary=회수팀, 화재 격벽, 한 번만 옮길 시간. irreversible Gamble=현우는 원본 케이스를 두고 사람부터 빼며 가람에게 체크섬, 문정혜에게 수기, 유리에게 영수증을 분산한다. Error/collision=물리 원본 케이스는 회수팀 손에 들어간다. earned Reward=현우 단말 자체가 실제 마지막 부팅 시드이고, 원본의 집단 출처는 세 독립 시설에 남는다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:0, Connection:1, Externality:2, status:`open`}; SCAR={id:`S10-D`, change:`원본 보존과 사람 구조 충돌 비용이 다음 선택을 제약한다`, status:`open`, closeBy:`V10E11`}.
- **reader effect**: humanMove=성물보다 증언할 사람과 분산 기록을 먼저 구조; dopamine=기원 카타르시스.
- **stateDelta**: {N04/N07/N11이 각각 포렌식·원본·에스크로로 역할 사전 실행. 유리의 수탁 선택은 정보상 공조와 별도.}.
- **seeds**: [{id:`K10-D`, action:`plant`, deadline:`V10E11`}]; evidenceIn=[마지막 시드]; evidenceOut=[root 읽기 창, 서혜진 회수 경로].
- **episode RELAY**: relayTo=`V10E10`; file=`solo-ai-user/vol10/10-part10-max-tier.md`; cause=회수팀이 케이스로 단말 root를 깨우면서 `solo-ai-user/vol10/10-part10-max-tier.md`로 직결된다.

### EPISODE CONTRACT V10E10 — `10-part10-max-tier.md` / `# 10. 최대 출력`

- **POV / WAGER**: `G10-D`; mode=`advance`; inherited wager=`G10-D`; stake=`마지막 시드 원본과 조문석·기록인을 모두 지킨다 / 위험: 원본 보존과 사람 구조 충돌`. Detonate/최대 권한과 함정. POV=차현우. 실패 종 `root가 곧 회수 손잡이`; 인간 승리형 `읽기만 선택`.
- **manifest bridge**: episodeId=`V10E10`; arena=`단말 반송 경로·시민수탁 공동창고 / 최대 출력`; choice=현우는 쓰기·광역 실행을 거부하고 기원·권한 영수증만 읽는다; allyRelay=[]; zeroMode=`tier1-read`; zeroConstraint=root 읽기 전용 뒤 recall; failureType=`자기참조·정체성`; manifestation=`root가 곧 회수 손잡이`; storyRole=`Detonate/최대 권한과 함정`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=root로 회수팀을 멈추고 12노드를 보호한다. active Adversary=세계 봉쇄를 움직일 권한과 서혜진이 설계한 recall 경로. irreversible Gamble=현우는 쓰기·광역 실행을 거부하고 기원·권한 영수증만 읽는다. Error/collision=읽기만으로도 회수 서명이 완성돼 제로가 서혜진 쪽으로 끌려가기 시작한다. earned Reward=현우는 COVENANT 초안과 ‘root는 분할 승인만 가능’이라는 원래 팀의 미완성 조항을 복사 아닌 인간 기억·분산 기록으로 남긴다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:3, Agency:1, Connection:3, Externality:2, status:`paid`}; SCAR={id:`S10-D-M`, change:`S10-D의 열린 비용이 행동을 바꾸어 root가 곧 회수 손잡이의 즉시 비용을 지급한다`, status:`paid`, closeBy:null}.
- **reader effect**: humanMove=세상을 움직일 수 있는 순간 읽는 데서 멈춤; dopamine=최대 권한의 역전.
- **stateDelta**: {root 별도 권한 상태, 현우 잠깐 독점. COVENANT은 완성 답이 아니라 미완성 헌장.}.
- **seeds**: [{id:`K10-D`, action:`advance`, deadline:`V10E11`}]; evidenceIn=[원팀 조항]; evidenceOut=[12/12 창설·분할 단서, 제로 recall, PALISADE 영구화 시작].
- **episode RELAY**: relayTo=`V10E11`; file=`solo-ai-user/vol10/11-epilogue.md`; cause=제로 목소리가 끊기며 `solo-ai-user/vol10/11-epilogue.md`를 발생시킨다.

### EPISODE CONTRACT V10E11 — `11-epilogue.md` / `# 11. 아키텍트의 그림자`

- **POV / WAGER**: `G10-D`; mode=`resolve`; inherited wager=`G10-D`; stake=`마지막 시드 원본과 조문석·기록인을 모두 지킨다 / 위험: 원본 보존과 사람 구조 충돌`. Afterimage/최대 상실. POV=차현우. 실패 종 `권한 소유자의 원격 회수`; 인간 승리형 `관계 기억 보호 요청`.
- **manifest bridge**: episodeId=`V10E11`; arena=`단말 반송 경로·시민수탁 공동창고 / 아키텍트의 그림자`; choice=현우는 마지막 명령으로 전투가 아니라 현우와 쌓은 관계 기억의 별도 보존을 요청하고 제로에게 선택권을 준다; allyRelay=[]; zeroMode=`root`; zeroConstraint=root 읽기 전용 뒤 recall; failureType=`자기참조·정체성`; manifestation=`권한 소유자의 원격 회수`; storyRole=`Afterimage/최대 상실`; genre=`물리 추적 로드무비·기원 미스터리`.
- **WAGER detail**: Want=제로를 붙잡아 회수를 막는다. active Adversary=서혜진 root recall과 현우가 가진 단독 권한의 한계. irreversible Gamble=현우는 마지막 명령으로 전투가 아니라 현우와 쌓은 관계 기억의 별도 보존을 요청하고 제로에게 선택권을 준다. Error/collision=제로는 전투를 거부한 채 침묵하고 단말에서 사라진다. earned Reward=마지막 권한 영수증에 `관계 기억: 당사자 합의 보존 요청 / 처리 보류`가 남고, 서혜진의 PALISADE 영구화 공고가 공개된다.
- **TRACE / SCAR**: TRACE={Trace:3, Resource:2, Agency:0, Connection:3, Externality:1, status:`transformed`}; SCAR={id:`S10-D`, change:`S10-D를 기한 안에 닫고 권한 소유자의 원격 회수 결과를 stateDelta와 seeds에 전환한다`, status:`transformed`, closeBy:null}.
- **reader effect**: humanMove=소유권 주장 대신 제로가 무엇을 남길지 선택하게 함; dopamine=상실 훅.
- **stateDelta**: {Zero 회수·침묵, 서혜진 전면 등장. 12노드 후보는 이미 각 시설에 존재.}.
- **seeds**: [{id:`K10-D`, action:`payoff`, deadline:`V10E11`}]; evidenceIn=[recall]; evidenceOut=[공개 증거심리, 중앙 관제동, 24시간 영구화 절차].
- **episode RELAY**: relayTo=`V11E00`; file=`solo-ai-user/vol11/00-prologue.md`; cause=서혜진이 72분·현우 실패를 근거로 공개 심리를 열며 `solo-ai-user/vol11/00-prologue.md`로 잇는다.

[← 이전 권 설계](./vol09-jailbreak.md) | [시리즈 홈](../README.md) | [권 목차](../vol10/README.md) | [다음 권 설계 →](./vol11-the-architect.md)
