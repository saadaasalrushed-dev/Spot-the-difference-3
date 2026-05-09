import re
from pathlib import Path

base = Path(__file__).resolve().parent
lines = (base / "scenes.js").read_text(encoding="utf-8").splitlines()
start = next(i for i, l in enumerate(lines) if "function d(diffs" in l)
end = next(i for i, l in enumerate(lines) if "window.GameSceneD" in l)
body_lines = lines[start:end]
body = "\n".join(body_lines)
body = body.replace("window.GameScenes =", "var sceneFns =", 1)

pat = r"(    (kitchen|classroom|park|beach|space|city|underwater|farm|circus|desert|forest|birthday|sports|toyroom|jungle): function \(ctx, r, diffs\) \{[\s\S]*?)(\n    \},)(?=\n    (?:kitchen|classroom|park|beach|space|city|underwater|farm|circus|desert|forest|birthday|sports|toyroom|jungle): |\n  \};)"

def add_micro(m):
    inner = m.group(1)
    if "drawMicroLayer" in inner:
        return m.group(0)
    return inner + "\n      drawMicroLayer(ctx, diffs, W, H, '" + m.group(2) + "');" + m.group(3)

body2, n = re.subn(pat, add_micro, body)
print("micro injections:", n)
(base / "_generated_scenes_body.js").write_text(body2, encoding="utf-8")

draw_txt = (base / "draw.js").read_text(encoding="utf-8")
draw_txt = re.sub(r"\(function \(\) \{\s*", "", draw_txt)
draw_txt = re.sub(r"\s*window\.GameDraw = \{[\s\S]*\};\s*\}\)\(\);\s*", "", draw_txt)

(base / "_generated_draw.js").write_text(draw_txt.strip() + "\n", encoding="utf-8")
print("done")
