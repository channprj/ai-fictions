[작품 홈](../README.md) | [처음 읽기 →](../00-prologue.md) | [통합 zip 내려받기](./agent-murim.zip)

---

# 에이전트 무림 배포본

프롤로그 + 10화 + 에필로그 완결 원고를 **전편 통합 압축 파일** 하나로 묶은 배포용 디렉터리다.

| 압축 파일 | 포함 범위 | 무결성 |
| --------- | --------- | ------ |
| [agent-murim.zip](./agent-murim.zip) | `README.md`, `00-prologue.md`~`11-epilogue.md` (프롤로그 + 10화 + 에필로그) | [SHA256SUMS](./SHA256SUMS) |

## 구성 기준

- `dist/`에는 이 `README.md`, `SHA256SUMS`, 전편 통합 zip 1개만 둔다.
- zip은 작품 `README.md` 1개와 12개 원고(프롤로그·10화·에필로그)를 포함한다.
- zip 내부 원고는 현재 원본 파일과 동일하며, 편집용 규칙 문서인 `LAYOUT.md`는 포함하지 않는다.
- `SHA256SUMS`는 `agent-murim.zip`에 대한 행 1개만 포함하고 마지막 개행으로 끝난다.

## 사용법

압축을 풀면 작품 README와 12개 원고가 한 폴더에 펼쳐진다.

```sh
unzip agent-murim.zip
```

## 무결성 확인

압축 파일의 SHA-256 체크섬은 [SHA256SUMS](./SHA256SUMS)에 기록되어 있다.

```sh
cd agent-murim/dist
shasum -a 256 -c SHA256SUMS
```

> 줄거리·등장인물·세계관은 상위 [작품 홈](../README.md)을 참고한다.

---

[작품 홈](../README.md) | [처음 읽기 →](../00-prologue.md) | [통합 zip 내려받기](./agent-murim.zip)
