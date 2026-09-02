#!/usr/bin/env python3
"""Synchronize local JSON and page HTML resources into offline-preloader.js."""

from __future__ import annotations

import json
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
PRELOADER = ROOT / "assets" / "offline-preloader.js"
START = "  var INLINE = "
END = ";\n  var BASE_DIR = "


def main() -> None:
    source = PRELOADER.read_text()
    start = source.index(START) + len(START)
    end = source.index(END, start)
    inline = json.loads(source[start:end])

    # Add every spine page, including any pages inserted after the initial
    # offline bundle was generated.
    pages_path = ROOT / "content" / "pages.json"
    for page in json.loads(pages_path.read_text()):
        href = page.get("href")
        if not isinstance(href, str):
            continue
        path = (ROOT / href).resolve()
        if ROOT in path.parents and path.suffix == ".html" and path.is_file():
            inline.setdefault(f"./{href}", path.read_text())

    updated = []
    for key in inline:
        if not key.startswith("./"):
            continue
        path = (ROOT / key.removeprefix("./")).resolve()
        if ROOT not in path.parents or not path.is_file():
            continue
        if path.suffix == ".json":
            inline[key] = json.loads(path.read_text())
        elif path.suffix == ".html":
            inline[key] = path.read_text()
        else:
            continue
        updated.append(key)

    serialized = json.dumps(inline, ensure_ascii=False, separators=(",", ":"))
    tail = source[end:]

    # This offline reader also has a small runtime override for configuration.
    # Keep it in lockstep with the same config embedded above.
    current_config = json.dumps(
        json.loads((ROOT / "assets" / "config.json").read_text()),
        ensure_ascii=False,
        separators=(",", ":"),
    )
    tail, replacements = re.subn(
        r"var CURRENT_CONFIG = .*?;",
        f"var CURRENT_CONFIG = {current_config};",
        tail,
        count=1,
    )
    if replacements != 1:
        raise RuntimeError("Could not update CURRENT_CONFIG in offline-preloader.js")

    # The video lookup keys follow the 1-based position in pages.json. Keep the
    # runtime override synchronized as well, especially when covers are added
    # and every existing page moves to a new spine position.
    current_videos = json.dumps(
        json.loads((ROOT / "content" / "i18n" / "en-GB" / "videos.json").read_text()),
        ensure_ascii=False,
        separators=(",", ":"),
    )
    tail, replacements = re.subn(
        r"var CURRENT_VIDEOS = .*?;",
        f"var CURRENT_VIDEOS = {current_videos};",
        tail,
        count=1,
    )
    if replacements != 1:
        raise RuntimeError("Could not update CURRENT_VIDEOS in offline-preloader.js")

    PRELOADER.write_text(source[:start] + serialized + tail)
    print(f"Synchronized {len(updated)} local JSON/HTML resources for offline use.")


if __name__ == "__main__":
    main()
