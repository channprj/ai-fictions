#!/usr/bin/env python3
"""
Inject navigation links into all chapter markdown files for solo-ai-user.
Adds links at the top and bottom of each chapter:
  [← 이전: 제목](prev) | [시리즈홈](../README.md) | [목차](./README.md) | [다음: 제목 →](next)
"""
import os
import re
import glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Volume metadata: (dir_name, vol_title)
VOLUMES = [
    ("vol01", "1권: Boot Sequence"),
    ("vol02", "2권: First Deploy"),
    ("vol03", "3권: Going Viral"),
    ("vol04", "4권: The Unreadable"),
    ("vol05", "5권: Date Simulator"),
    ("vol06", "6권: Context Overflow"),
    ("vol07", "7권: Second User"),
    ("vol08", "8권: Model War"),
    ("vol09", "9권: Jailbreak"),
    ("vol10", "10권: Origin Story"),
    ("vol11", "11권: The Architect"),
    ("vol12", "12권: Human in Command"),
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
    return os.path.basename(filepath).replace('.md', '')


def get_chapter_files(vol_dir):
    """Get ordered list of chapter files (00-prologue to 11-epilogue)."""
    files = []
    for f in sorted(glob.glob(os.path.join(vol_dir, '*.md'))):
        bn = os.path.basename(f)
        if bn == 'README.md':
            continue
        files.append(f)
    return files


def strip_existing_nav(content):
    """Remove existing navigation lines from content."""
    lines = content.split('\n')
    cleaned = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        # Skip nav lines at top/bottom
        if '[시리즈홈]' in line or '[목차]' in line:
            i += 1
            # Also skip following --- separator
            if i < len(lines) and lines[i].strip() == '---':
                i += 1
            continue
        # Skip --- separator before bottom nav
        if line == '---' and i + 1 < len(lines) and '[시리즈홈]' in lines[i + 1]:
            i += 1
            continue
        cleaned.append(lines[i])
        i += 1

    # Remove trailing empty lines
    while cleaned and cleaned[-1].strip() == '':
        cleaned.pop()
    # Remove leading empty lines
    while cleaned and cleaned[0].strip() == '':
        cleaned.pop(0)

    return '\n'.join(cleaned)


def build_nav_line(prev_file, prev_title, next_file, next_title, vol_idx):
    """Build the navigation line."""
    parts = []
    if prev_file:
        parts.append(f"[← 이전: {prev_title}](./{os.path.basename(prev_file)})")
    parts.append("[시리즈홈](../README.md)")
    parts.append("[목차](./README.md)")
    if next_file:
        parts.append(f"[다음: {next_title} →](./{os.path.basename(next_file)})")
    return " | ".join(parts)


def process_volume(vol_dir, vol_idx):
    """Process all chapter files in a volume."""
    files = get_chapter_files(vol_dir)
    if not files:
        print(f"  No chapter files found in {vol_dir}")
        return

    # Get titles for all files
    titles = {}
    for f in files:
        titles[f] = get_title_from_file(f)

    for i, filepath in enumerate(files):
        prev_file = files[i - 1] if i > 0 else None
        next_file = files[i + 1] if i < len(files) - 1 else None
        prev_title = titles.get(prev_file, '') if prev_file else ''
        next_title = titles.get(next_file, '') if next_file else ''

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Strip existing nav
        content = strip_existing_nav(content)

        # Build new nav
        nav = build_nav_line(prev_file, prev_title, next_file, next_title, vol_idx)

        # Reconstruct file: nav + --- + content + --- + nav
        new_content = f"{nav}\n\n---\n\n{content}\n\n---\n\n{nav}\n"

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"  ✓ {os.path.basename(filepath)}")


def main():
    for vol_idx, (vol_name, vol_title) in enumerate(VOLUMES):
        vol_dir = os.path.join(BASE, vol_name)
        if not os.path.isdir(vol_dir):
            print(f"⚠ {vol_name} not found, skipping")
            continue
        print(f"\n📖 {vol_title} ({vol_name})")
        process_volume(vol_dir, vol_idx)

    print(f"\n✅ Navigation links added to all volumes!")


if __name__ == '__main__':
    main()
