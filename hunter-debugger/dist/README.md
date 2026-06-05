# 디버거 배포본

16부작 완결 원고를 **전편 통합 압축 파일** 하나로 묶은 배포용 디렉터리다.

| 압축 파일 | 포함 범위 |
| --------- | --------- |
| [hunter-debugger.zip](./hunter-debugger.zip) | `README.md`, `01-awakening.md`~`16-debugger.md` (전 16부) |

## 구성 기준

- `dist/`에는 이 `README.md`와 전편 통합 zip 1개만 둔다.
- zip은 작품 `README.md` 1개와 16개 회차 원고를 포함한다.
- zip 내부 원고는 현재 원본 파일과 동일하다.

## 사용법

압축을 풀면 작품 README와 16개 회차가 한 폴더에 펼쳐진다.

```sh
unzip hunter-debugger.zip
```

## 무결성 확인

```sh
shasum -a 256 hunter-debugger.zip
```

> 줄거리·등장인물·세계관은 상위 [작품 홈](../README.md)을 참고한다.
