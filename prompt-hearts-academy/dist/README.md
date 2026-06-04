# 프롬프트 하트 아카데미 배포본

본편 초고 완결 상태를 권별 압축 파일로 묶은 배포용 디렉터리다.

| 권 | 압축 파일 | 포함 범위 |
| -- | --------- | --------- |
| 1권 | [prompt-hearts-academy-vol01.zip](./prompt-hearts-academy-vol01.zip) | `vol01/README.md`, `vol01/ep001.md`~`vol01/ep030.md` |
| 2권 | [prompt-hearts-academy-vol02.zip](./prompt-hearts-academy-vol02.zip) | `vol02/README.md`, `vol02/ep031.md`~`vol02/ep060.md` |
| 3권 | [prompt-hearts-academy-vol03.zip](./prompt-hearts-academy-vol03.zip) | `vol03/README.md`, `vol03/ep061.md`~`vol03/ep090.md` |
| 4권 | [prompt-hearts-academy-vol04.zip](./prompt-hearts-academy-vol04.zip) | `vol04/README.md`, `vol04/ep091.md`~`vol04/ep120.md` |
| 5권 | [prompt-hearts-academy-vol05.zip](./prompt-hearts-academy-vol05.zip) | `vol05/README.md`, `vol05/ep121.md`~`vol05/ep150.md` |
| 6권 | [prompt-hearts-academy-vol06.zip](./prompt-hearts-academy-vol06.zip) | `vol06/README.md`, `vol06/ep151.md`~`vol06/ep180.md` |
| 7권 | [prompt-hearts-academy-vol07.zip](./prompt-hearts-academy-vol07.zip) | `vol07/README.md`, `vol07/ep181.md`~`vol07/ep210.md` |

## 검증 기준

- 각 zip은 해당 권 디렉터리를 보존한다.
- 각 zip은 권별 `README.md` 1개와 회차 원고 30개를 포함한다.
- 본편 이후 신규 회차 파일은 포함하지 않는다.

## 무결성 검증

권별 압축 파일의 SHA-256 체크섬은 [SHA256SUMS](./SHA256SUMS)에 기록되어 있다.
배포본을 받은 뒤 다음 명령으로 7개 압축 파일이 이 매니페스트와 일치하는지 확인한다.

```sh
cd prompt-hearts-academy/dist
shasum -a 256 -c SHA256SUMS
```

## 배포본 재생성

원고나 권별 README를 개정한 뒤 배포 zip과 체크섬을 다시 만들려면 저장소 루트에서 다음 명령을 실행한다.

```sh
node prompt-hearts-academy/scripts/build-dist.js
```

이 스크립트는 권별 `README.md` 1개와 회차 원고 30개만 `zip -X`로 묶고, `SHA256SUMS`를 갱신한 뒤 완결 검산 스크립트를 실행한다.
