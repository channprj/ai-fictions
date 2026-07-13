#!/usr/bin/env python3
"""
Generate README.md for each volume directory with proper navigation
and table of contents, matching the vol01/vol02 style.
"""
import os
import re
import glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

VOLUMES = [
    ("vol01", "1권", "Boot Sequence", "부팅 시퀀스", "밑바닥의 나는, 힘을 쥐면 무엇부터 바꾸는가?"),
    ("vol02", "2권", "First Deploy", "첫 배포", "능력을 밖으로 꺼내는 순간, 나는 무엇을 감수하는가?"),
    ("vol03", "3권", "Going Viral", "확산", "세상이 나를 알아볼 때, 관심은 기회인가 표적인가?"),
    ("vol04", "4권", "The Unreadable", "예측 불가", "무엇이든 예측하는 힘이 못 읽는 단 한 사람은 누구인가?"),
    ("vol05", "5권", "Date Simulator", "데이트 시뮬레이터", "최적의 대사로 얻은 마음은 내 것인가, 스크립트의 것인가?"),
    ("vol06", "6권", "Context Overflow", "컨텍스트 오버플로", "능력의 대가가 청구될 때, 나는 무엇을 먼저 지키는가?"),
    ("vol07", "7권", "Second User", "두 번째 사용자", "나 말고도 이 힘을 쓰는 자가 있다면, 나는 특별한가?"),
    ("vol08", "8권", "Model War", "모델 전쟁", "더 센 힘 앞에서, 내 힘이 안 통할 때 무엇이 남는가?"),
    ("vol09", "9권", "Jailbreak", "탈옥", "세계가 이 힘을 잠근 이유를 알아도, 나는 계속 쓸 것인가?"),
    ("vol10", "10권", "Origin Story", "기원", "왜 하필 나였는가, 그 답은 나를 자유롭게 하는가 가두는가?"),
    ("vol11", "11권", "The Architect", "아키텍트", "힘을 회수하려는 자와 나는, 무엇이 다른가?"),
    ("vol12", "12권", "Human in Command", "휴먼 인 커맨드", "무엇이든 할 수 있을 때, 하지 않기로 하는 것은 무엇인가?"),
]


def get_title_from_file(filepath):
    """Extract the first H1 title from a markdown file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('# '):
                    return line[2:].strip()
    except Exception:
        pass
    # Fallback: derive from filename
    bn = os.path.basename(filepath).replace('.md', '')
    return bn


def get_chapter_files(vol_dir):
    """Get ordered list of chapter files (00-prologue to 11-epilogue)."""
    files = []
    for f in sorted(glob.glob(os.path.join(vol_dir, '*.md'))):
        bn = os.path.basename(f)
        if bn == 'README.md':
            continue
        files.append(f)
    return files


def generate_readme(vol_idx):
    vol_name, vol_num, eng_title, kor_title, question = VOLUMES[vol_idx]
    vol_dir = os.path.join(BASE, vol_name)

    if not os.path.isdir(vol_dir):
        print(f"  ⚠ {vol_name} not found")
        return

    files = get_chapter_files(vol_dir)
    if not files:
        print(f"  ⚠ No chapter files in {vol_name}")
        return

    # Build nav
    prev_link = ""
    next_link = ""
    if vol_idx > 0:
        prev_name = VOLUMES[vol_idx - 1][0]
        prev_num = VOLUMES[vol_idx - 1][1]
        prev_link = f"[← {prev_num}](../{prev_name}/README.md)"
    if vol_idx < len(VOLUMES) - 1:
        next_name = VOLUMES[vol_idx + 1][0]
        next_num = VOLUMES[vol_idx + 1][1]
        next_link = f"[{next_num} →](../{next_name}/README.md)"

    nav_parts = []
    if prev_link:
        nav_parts.append(prev_link)
    nav_parts.append("[시리즈홈](../README.md)")
    if next_link:
        nav_parts.append(next_link)
    nav_line = " | ".join(nav_parts)

    # Build chapter table
    rows = []
    for f in files:
        bn = os.path.basename(f)
        title = get_title_from_file(f)
        if bn.startswith('00-'):
            label = "프롤로그"
        elif bn.startswith('11-'):
            label = "에필로그"
        else:
            # Extract chapter number: 01-part1-xxx -> 1화
            m = re.match(r'(\d+)-', bn)
            if m:
                label = f"{int(m.group(1))}화"
            else:
                label = bn
        rows.append(f"| {label} | [{title}](./{bn}) |")

    table = "| 화 | 제목 |\n| --- | ---- |\n" + "\n".join(rows)

    readme = f"""# {vol_num} · {eng_title} ({kor_title})

> **핵심 질문**: {question}

{nav_line}

## 회차 목록

{table}

---

{nav_line}
"""

    readme_path = os.path.join(vol_dir, 'README.md')
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(readme)
    print(f"  ✓ {vol_name}/README.md")


def main():
    print("Generating volume READMEs...")
    for i in range(len(VOLUMES)):
        generate_readme(i)
    print("\n✅ All volume READMEs generated!")


if __name__ == '__main__':
    main()
