# 너드 개발자 배포본

전 10권 250화 완결 원고를 **권별 압축 파일**로 묶은 배포용 디렉터리다. 각 zip은 해당 권 디렉터리(`volNN/`)를 그대로 보존하며, 권별 `README.md` 1개와 회차 원고 25개를 포함한다.

| 권 | 부제 | 압축 파일 | 포함 범위 |
| :--: | ---- | --------- | --------- |
| 1권 | 튜토리얼 및 권한 획득 | [nerd-sysadmin-vol01.zip](./nerd-sysadmin-vol01.zip) | `vol01/README.md`, `vol01/ep001.md`~`vol01/ep025.md` |
| 2권 | 아카데미 스파게티 코드 디버깅 | [nerd-sysadmin-vol02.zip](./nerd-sysadmin-vol02.zip) | `vol02/README.md`, `vol02/ep026.md`~`vol02/ep050.md` |
| 3권 | 매크로 영지전과 빌드 자동화 | [nerd-sysadmin-vol03.zip](./nerd-sysadmin-vol03.zip) | `vol03/README.md`, `vol03/ep051.md`~`vol03/ep075.md` |
| 4권 | 왕국 시스템 아키텍처 재설계 | [nerd-sysadmin-vol04.zip](./nerd-sysadmin-vol04.zip) | `vol04/README.md`, `vol04/ep076.md`~`vol04/ep100.md` |
| 5권 | 제국 네트워크 병합 및 분산 처리 | [nerd-sysadmin-vol05.zip](./nerd-sysadmin-vol05.zip) | `vol05/README.md`, `vol05/ep101.md`~`vol05/ep125.md` |
| 6권 | 오픈소스와 마법 생물 패치 | [nerd-sysadmin-vol06.zip](./nerd-sysadmin-vol06.zip) | `vol06/README.md`, `vol06/ep126.md`~`vol06/ep150.md` |
| 7권 | 다크웹(암흑 마법사) 방어전 | [nerd-sysadmin-vol07.zip](./nerd-sysadmin-vol07.zip) | `vol07/README.md`, `vol07/ep151.md`~`vol07/ep175.md` |
| 8권 | 마계의 악성 코드와 레거시 시스템 | [nerd-sysadmin-vol08.zip](./nerd-sysadmin-vol08.zip) | `vol08/README.md`, `vol08/ep176.md`~`vol08/ep200.md` |
| 9권 | 창조신의 코어 서버 접근 | [nerd-sysadmin-vol09.zip](./nerd-sysadmin-vol09.zip) | `vol09/README.md`, `vol09/ep201.md`~`vol09/ep225.md` |
| 10권 | 월드 리부트 v2.0 | [nerd-sysadmin-vol10.zip](./nerd-sysadmin-vol10.zip) | `vol10/README.md`, `vol10/ep226.md`~`vol10/ep250.md` |

## 구성 기준

- `dist/`에는 이 `README.md`와 권별 zip 10개만 둔다.
- 각 zip은 해당 권 디렉터리(`volNN/`)를 보존하며, 권별 `README.md` 1개와 회차 원고 25개를 포함한다.
- zip 내부의 권별 `README.md`와 회차 원고는 현재 원본 파일과 동일하다.

## 사용법

원하는 권을 받아 압축을 풀면 `volNN/` 디렉터리에 권별 README와 25개 회차가 펼쳐진다.

```sh
unzip nerd-sysadmin-vol01.zip
```

## 무결성 확인

내려받은 파일이 손상되지 않았는지 확인하려면 SHA-256 체크섬을 직접 비교한다.

```sh
shasum -a 256 nerd-sysadmin-vol01.zip
```

> 작품 본편과 설정은 상위 [작품 홈](../README.md)과 [BIBLE.md](../BIBLE.md)을 참고한다.
