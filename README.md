# AI Fictions

![Made with Claude Code](https://img.shields.io/badge/Made%20with-Claude%20Code-blueviolet?logo=anthropic)
![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)

---

## 소개

다른 배경, 같은 주제. 일터에서 살아남는 법.

X세대와 MZ세대가 충돌하고, 번아웃과 워라밸 사이에서 균형을 찾으며, 결국 서로를 이해하게 되는 이야기들. 시니컬하면서도 따뜻한 블랙코미디 시리즈.

---

## 작품 목록

| 작품                                                              | 배경            | 주인공                   | 상태 |
| :---------------------------------------------------------------- | :-------------- | :----------------------- | :--: |
| [개발팀의 기쁨과 슬픔](./young-forty-mz-twenty/README.md)         | 스타트업 개발팀 | MZ 주니어 vs 영포티 실장 | 완결 |
| [마취과 간호사의 기쁨과 슬픔](./nurse-thirty-something/README.md) | 대학병원 수술실 | 32세 중간 세대 간호사    | 완결 |

---

## 프로젝트 구조

```
ai-fictions/
├── young-forty-mz-twenty/        # 개발팀의 기쁨과 슬픔
│   ├── 00-prologue.md
│   ├── 01~10-part*.md
│   ├── 11-epilogue.md
│   └── dist/
│
├── nurse-thirty-something/       # 마취과 간호사의 기쁨과 슬픔
│   ├── 00-prologue.md
│   ├── 01~10-part*.md
│   ├── 11-epilogue.md
│   └── dist/
│
├── README.md
└── AGENTS.md                     # 작가 페르소나 & 집필 가이드
```

### 파일 명명 규칙

- `00-prologue.md` — 프롤로그
- `01-partN-{slug}.md` — 본편 (N: 1~10, slug: 영문 키워드)
- `11-epilogue.md` — 에필로그

---

## 작성 도구

이 소설들은 [Claude Code](https://claude.ai/code)를 활용하여 작성되었습니다.

- **Model**: Claude (Anthropic)
- **Tool**: Claude Code CLI
- **Process**: 플롯 설계 → 챕터별 집필 → 퇴고

---

## 라이선스

이 저작물은 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ko) 라이선스를 따릅니다.

- **저작자 표시** — 원저작자를 표시해야 합니다
- **비영리** — 영리 목적으로 사용할 수 없습니다
- **동일조건변경허락** — 변경 시 동일한 라이선스를 적용해야 합니다

---

## Disclaimer

이 작품들은 픽션입니다. 등장하는 인물, 회사, 사건은 모두 허구이며 실제와 무관합니다.
