# 개발팀의 기쁨과 슬픔 배포본

프롤로그 + 10부 + 에필로그 완결 원고를 **전편 통합 압축 파일** 하나로 묶은 배포용 디렉터리다.

| 압축 파일 | 포함 범위 |
| --------- | --------- |
| [young-forty-mz-twenty.zip](./young-forty-mz-twenty.zip) | `README.md`, `00-prologue.md`~`11-epilogue.md` (전 12부) |

## 구성 기준

- `dist/`에는 이 `README.md`와 전편 통합 zip 1개만 둔다.
- zip은 작품 `README.md` 1개와 12개 원고(프롤로그·10부·에필로그)를 포함한다.
- zip 내부 원고는 현재 원본 파일과 동일하다.

## 사용법

압축을 풀면 작품 README와 12개 원고가 한 폴더에 펼쳐진다.

```sh
unzip young-forty-mz-twenty.zip
```

## 무결성 확인

```sh
shasum -a 256 young-forty-mz-twenty.zip
```

> 줄거리·등장인물·테마는 상위 [작품 홈](../README.md)을 참고한다.
