"""
Generate raster PNG puzzle pairs (left = reference, right = edited) plus puzzles.json.
Run from Spot-the-difference-2 folder: python generate_assets.py
Dependencies: Pillow
"""
from __future__ import annotations

import json
import math
import os
import random
from typing import Callable, List, Tuple

from PIL import Image, ImageDraw, ImageFilter

OUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "puzzles")
W, H = 800, 600

Rect = Tuple[float, float, float, float]  # nx, ny, nw, nh normalized


def vertical_gradient(img: Image.Image, top: Tuple[int, int, int], bot: Tuple[int, int, int]) -> None:
    px = img.load()
    for y in range(H):
        t = y / (H - 1)
        r = int(top[0] * (1 - t) + bot[0] * t)
        g = int(top[1] * (1 - t) + bot[1] * t)
        b = int(top[2] * (1 - t) + bot[2] * t)
        for x in range(W):
            px[x, y] = (r, g, b)


def add_noise(img: Image.Image, amount: int = 12) -> Image.Image:
    # Pillow-only noise
    g = Image.effect_noise((W, H), amount).convert("RGB")
    return Image.blend(img, g, 0.08)


def soft_ellipse(draw: ImageDraw.ImageDraw, bbox, fill, outline=None, width=1):
    draw.ellipse(bbox, fill=fill, outline=outline, width=width)


def draw_park(rand: random.Random) -> Tuple[Image.Image, Image.Image, List[Rect]]:
    """Sunny park: photo-like blobs + grass texture."""
    left = Image.new("RGB", (W, H))
    vertical_gradient(left, (135, 206, 235), (176, 226, 255))
    right = left.copy()

    dl = ImageDraw.Draw(left)
    dr = ImageDraw.Draw(right)

    # distant hills
    hill_col = (95, 160, 90)
    dl.polygon([(0, 420), (220, 310), (420, 380), (W, 320), (W, H), (0, H)], fill=hill_col)
    dr.polygon([(0, 420), (220, 310), (420, 380), (W, 320), (W, H), (0, H)], fill=hill_col)

    # grass field
    grass = (76, 153, 76)
    dl.rectangle([0, 400, W, H], fill=grass)
    dr.rectangle([0, 400, W, H], fill=grass)

    # sun position
    sx, sy, sr = 620, 95, 52
    soft_ellipse(dl, [sx - sr, sy - sr, sx + sr, sy + sr], (255, 230, 120))
    # diff 1: sun hue shift on right
    soft_ellipse(dr, [sx - sr, sy - sr, sx + sr, sy + sr], (255, 200, 80))
    r1: Rect = ((sx - sr) / W, (sy - sr) / H, (2 * sr) / W, (2 * sr) / H)

    # clouds
    for cx, cy in [(160, 70), (340, 110)]:
        for dx, rad in [(0, 38), (35, 46), (70, 38)]:
            soft_ellipse(dl, [cx + dx - rad, cy - rad // 2, cx + dx + rad, cy + rad], (245, 250, 255))
            soft_ellipse(dr, [cx + dx - rad, cy - rad // 2, cx + dx + rad, cy + rad], (245, 250, 255))

    # diff 2: extra cloud puff on right only
    cx2, cy2 = 480, 85
    rad = 40
    soft_ellipse(dr, [cx2 - rad, cy2 - 18, cx2 + rad, cy2 + 28], (252, 254, 255))
    r2: Rect = ((cx2 - rad) / W, (cy2 - 28) / H, (2 * rad) / W, 56 / H)

    # trees
    def tree(draw: ImageDraw.ImageDraw, tx: int, ty: int, crown_r: int, trunk_w: int):
        draw.rectangle([tx - trunk_w // 2, ty, tx + trunk_w // 2, ty + 110], fill=(120, 82, 42))
        soft_ellipse(draw, [tx - crown_r, ty - crown_r - 20, tx + crown_r, ty + crown_r // 2], (34, 100, 34))

    tree(dl, 140, 340, 95, 26)
    tree(dr, 140, 340, 95, 26)
    tree(dl, 420, 360, 85, 22)
    tree(dr, 420, 360, 85, 22)

    # diff 3: middle tree crown tint
    tx, ty = 420, 360
    crown_r = 85
    soft_ellipse(dr, [tx - crown_r, ty - crown_r - 20, tx + crown_r, ty + crown_r // 2], (50, 140, 60))
    r3: Rect = ((tx - crown_r) / W, (ty - crown_r - 20) / H, (2 * crown_r) / W, (crown_r + crown_r // 2 + 20) / H)

    # bench
    bx, by = 520, 430
    dl.rectangle([bx - 90, by, bx + 90, by + 12], fill=(160, 110, 70))
    dl.rectangle([bx - 85, by - 35, bx + 85, by], fill=(190, 140, 90))
    dr.rectangle([bx - 90, by, bx + 90, by + 12], fill=(160, 110, 70))
    dr.rectangle([bx - 85, by - 35, bx + 85, by], fill=(190, 140, 90))

    # diff 4: missing bench leg shadow stripe on right (erase dark patch)
    dl.rectangle([bx - 92, by + 12, bx - 78, by + 44], fill=(40, 70, 40))
    # right: shorter shadow (difference)
    dr.rectangle([bx - 92, by + 12, bx - 78, by + 44], fill=(76, 153, 76))
    r4: Rect = ((bx - 92) / W, (by + 12) / H, 14 / W, 32 / H)

    # kite in sky — left only; diff 5 missing on right
    kx, ky = 300, 220
    dl.polygon([(kx, ky), (kx + 40, ky + 55), (kx - 40, ky + 55)], fill=(230, 60, 60))
    dl.line([(kx, ky + 55), (kx, ky + 120)], fill=(90, 90, 90), width=3)
    r5: Rect = ((kx - 45) / W, (ky - 10) / H, 90 / W, 135 / H)

    left = left.filter(ImageFilter.GaussianBlur(radius=0.6))
    right = right.filter(ImageFilter.GaussianBlur(radius=0.6))
    return left, right, [r1, r2, r3, r4, r5]


def draw_kitchen(rand: random.Random) -> Tuple[Image.Image, Image.Image, List[Rect]]:
    left = Image.new("RGB", (W, H))
    vertical_gradient(left, (245, 242, 235), (220, 215, 205))
    right = left.copy()
    dl = ImageDraw.Draw(left)
    dr = ImageDraw.Draw(right)

    # counter
    dl.rectangle([0, 380, W, H], fill=(190, 175, 155))
    dr.rectangle([0, 380, W, H], fill=(190, 175, 155))

    # window
    dl.rectangle([80, 60, 340, 260], outline=(120, 120, 110), width=6)
    dl.rectangle([90, 70, 330, 250], fill=(200, 230, 255))
    dr.rectangle([80, 60, 340, 260], outline=(120, 120, 110), width=6)
    dr.rectangle([90, 70, 330, 250], fill=(200, 230, 255))

    # diff 1: curtain panel colour
    dl.rectangle([90, 70, 160, 250], fill=(255, 248, 230))
    dr.rectangle([90, 70, 160, 250], fill=(255, 236, 210))
    r1: Rect = (90 / W, 70 / H, 70 / W, 180 / H)

    # fridge
    dl.rounded_rectangle([560, 120, 720, 420], radius=16, fill=(235, 235, 240), outline=(140, 140, 150), width=3)
    dr.rounded_rectangle([560, 120, 720, 420], radius=16, fill=(235, 235, 240), outline=(140, 140, 150), width=3)
    dl.line([(630, 130), (630, 410)], fill=(180, 180, 190), width=2)

    # diff 2: handle side / accent (right fridge tint)
    dr.rounded_rectangle([560, 120, 720, 420], radius=16, fill=(228, 230, 242))
    r2: Rect = (560 / W, 120 / H, 160 / W, 300 / H)

    # fruit bowl
    bx, by = 380, 340
    soft_ellipse(dl, [bx - 70, by, bx + 70, by + 35], (210, 190, 160))
    soft_ellipse(dr, [bx - 70, by, bx + 70, by + 35], (210, 190, 160))
    for i, col in enumerate([(255, 80, 80), (255, 220, 60), (120, 200, 90)]):
        soft_ellipse(dl, [bx - 40 + i * 35, by - 38, bx - 10 + i * 35, by - 8], col)
        soft_ellipse(dr, [bx - 40 + i * 35, by - 38, bx - 10 + i * 35, by - 8], col)

    # diff 3: remove one apple on right (paint bowl interior)
    soft_ellipse(dr, [bx + 5, by - 38, bx + 35, by - 8], (210, 190, 160))
    r3: Rect = ((bx + 5) / W, (by - 42) / H, 35 / W, 38 / H)

    # mug
    mx, my = 460, 305
    dl.rounded_rectangle([mx, my, mx + 55, my + 62], radius=10, fill=(240, 240, 250), outline=(130, 130, 150), width=2)
    dr.rounded_rectangle([mx, my, mx + 55, my + 62], radius=10, fill=(240, 240, 250), outline=(130, 130, 150), width=2)

    # diff 4: mug stripe on right
    dr.rectangle([mx + 38, my + 8, mx + 46, my + 54], fill=(80, 140, 220))
    r4: Rect = ((mx + 34) / W, (my + 4) / H, 18 / W, 58 / H)

    # wall clock
    cx, cy, cr = 470, 140, 42
    dl.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], fill=(250, 250, 250), outline=(60, 60, 60), width=4)
    dl.line([(cx, cy), (cx, cy - 22)], fill=(30, 30, 30), width=3)
    dl.line([(cx, cy), (cx + 18, cy)], fill=(30, 30, 30), width=2)
    dr.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], fill=(250, 250, 250), outline=(60, 60, 60), width=4)
    dr.line([(cx, cy), (cx, cy - 22)], fill=(30, 30, 30), width=3)
    dr.line([(cx, cy), (cx + 18, cy)], fill=(30, 30, 30), width=2)

    # diff 5: clock rim colour on right
    dr.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], outline=(180, 110, 60), width=5)
    r5: Rect = ((cx - cr - 4) / W, (cy - cr - 4) / H, (2 * cr + 8) / W, (2 * cr + 8) / H)

    left = left.filter(ImageFilter.GaussianBlur(radius=0.45))
    right = right.filter(ImageFilter.GaussianBlur(radius=0.45))
    return left, right, [r1, r2, r3, r4, r5]


def draw_birthday(rand: random.Random) -> Tuple[Image.Image, Image.Image, List[Rect]]:
    left = Image.new("RGB", (W, H), (255, 248, 252))
    right = left.copy()
    dl = ImageDraw.Draw(left)
    dr = ImageDraw.Draw(right)

    dl.rectangle([60, 380, W - 60, 460], fill=(230, 200, 170))
    dr.rectangle([60, 380, W - 60, 460], fill=(230, 200, 170))

    # cake
    cx, cy = 400, 330
    dl.rounded_rectangle([cx - 120, cy - 40, cx + 120, cy + 80], radius=22, fill=(255, 228, 196), outline=(160, 110, 70), width=3)
    dr.rounded_rectangle([cx - 120, cy - 40, cx + 120, cy + 80], radius=22, fill=(255, 228, 196), outline=(160, 110, 70), width=3)

    # candles
    for i in range(5):
        x = cx - 80 + i * 40
        dl.rectangle([x - 4, cy - 110, x + 4, cy - 40], fill=(245, 245, 250))
        soft_ellipse(dl, [x - 10, cy - 125, x + 10, cy - 105], (255, 200, 80))

    for i in range(5):
        x = cx - 80 + i * 40
        dr.rectangle([x - 4, cy - 110, x + 4, cy - 40], fill=(245, 245, 250))
        soft_ellipse(dr, [x - 10, cy - 125, x + 10, cy - 105], (255, 200, 80))

    # diff 1: one flame missing on right (middle candle)
    xm = cx
    soft_ellipse(dr, [xm - 10, cy - 125, xm + 10, cy - 105], (255, 248, 252))
    dr.rectangle([xm - 5, cy - 118, xm + 5, cy - 100], fill=(255, 248, 252))
    r1: Rect = ((xm - 14) / W, (cy - 130) / H, 28 / W, 32 / H)

    # balloons
    cols = [(255, 80, 120), (120, 190, 255), (120, 220, 140)]
    positions = [(180, 160), (620, 140), (520, 220)]
    for (px, py), col in zip(positions, cols):
        soft_ellipse(dl, [px - 42, py - 62, px + 42, py + 52], col)
        dl.line([(px, py + 52), (px + 20, py + 160)], fill=(90, 90, 90), width=2)
        soft_ellipse(dr, [px - 42, py - 62, px + 42, py + 52], col)
        dr.line([(px, py + 52), (px + 20, py + 160)], fill=(90, 90, 90), width=2)

    # diff 2: extra balloon on right
    px, py = 280, 200
    soft_ellipse(dr, [px - 38, py - 56, px + 38, py + 48], (255, 210, 90))
    dr.line([(px, py + 48), (px - 10, py + 170)], fill=(90, 90, 90), width=2)
    r2: Rect = ((px - 40) / W, (py - 58) / H, 82 / W, 120 / H)

    # gifts
    dl.rectangle([120, 420, 210, 510], fill=(180, 120, 220), outline=(80, 40, 100), width=2)
    dl.rectangle([230, 430, 330, 520], fill=(100, 170, 240), outline=(40, 80, 130), width=2)
    dr.rectangle([120, 420, 210, 510], fill=(180, 120, 220), outline=(80, 40, 100), width=2)
    dr.rectangle([230, 430, 330, 520], fill=(100, 170, 240), outline=(40, 80, 130), width=2)

    # diff 3: ribbon hue on purple gift
    dr.rectangle([120, 420, 210, 510], fill=(200, 130, 210))
    r3: Rect = (120 / W, 420 / H, 90 / W, 90 / H)

    # bunting flags across top
    for i in range(10):
        x0 = 70 + i * 76
        dl.polygon([(x0, 70), (x0 + 38, 70), (x0 + 19, 118)], fill=(255, 180 + i * 5, 120))
        dr.polygon([(x0, 70), (x0 + 38, 70), (x0 + 19, 118)], fill=(255, 180 + i * 5, 120))

    # diff 4: one flag colour flip (index 4)
    i = 4
    x0 = 70 + i * 76
    dr.polygon([(x0, 70), (x0 + 38, 70), (x0 + 19, 118)], fill=(120, 210, 255))
    r4: Rect = ((x0 - 2) / W, 68 / H, 42 / W, 54 / H)

    # wall banner text hint — diff 5 star sticker right side only
    dl.rectangle([630, 320, 740, 370], fill=(255, 255, 255), outline=(240, 200, 220), width=2)
    dr.rectangle([630, 320, 740, 370], fill=(255, 255, 255), outline=(240, 200, 220), width=2)
    sx, sy = 685, 332
    def star(d: ImageDraw.ImageDraw, fill):
        pts = []
        for k in range(5):
            ang = -math.pi / 2 + k * 2 * math.pi / 5
            pts.append((sx + 22 * math.cos(ang), sy + 22 * math.sin(ang)))
            ang2 = ang + math.pi / 5
            pts.append((sx + 9 * math.cos(ang2), sy + 9 * math.sin(ang2)))
        d.polygon(pts, fill=fill)

    star(dr, (255, 215, 0))
    r5: Rect = ((sx - 26) / W, (sy - 26) / H, 54 / W, 54 / H)

    left = left.filter(ImageFilter.GaussianBlur(radius=0.35))
    right = right.filter(ImageFilter.GaussianBlur(radius=0.35))
    return left, right, [r1, r2, r3, r4, r5]


BUILDERS: List[Tuple[str, str, Callable[[random.Random], Tuple[Image.Image, Image.Image, List[Rect]]]]] = [
    ("park", "🌳 Park Picnic", draw_park),
    ("kitchen", "🍳 Kitchen Morning", draw_kitchen),
    ("birthday", "🎂 Birthday Party", draw_birthday),
]


def clamp_rect(r: Rect) -> Rect:
    x, y, w, h = r
    x = max(0.0, min(1.0, x))
    y = max(0.0, min(1.0, y))
    w = max(0.02, min(1.0 - x, w))
    h = max(0.02, min(1.0 - y, h))
    return (round(x, 5), round(y, 5), round(w, 5), round(h, 5))


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    puzzles = []
    for pid, title, fn in BUILDERS:
        rnd = random.Random(42)
        L, R, rects = fn(rnd)
        L = add_noise(L)
        R = add_noise(R)
        lp = os.path.join("assets", "puzzles", f"{pid}_left.png")
        rp = os.path.join("assets", "puzzles", f"{pid}_right.png")
        L.save(os.path.join(os.path.dirname(__file__), lp))
        R.save(os.path.join(os.path.dirname(__file__), rp))
        diffs = []
        for r in rects:
            cx, cy, cw, ch = clamp_rect(r)
            diffs.append({"x": cx, "y": cy, "w": cw, "h": ch})
        puzzles.append(
            {
                "id": pid,
                "title": title,
                "left": lp.replace("\\", "/"),
                "right": rp.replace("\\", "/"),
                "differences": diffs,
            }
        )

    manifest = {"puzzles": puzzles}
    base = os.path.dirname(__file__)
    with open(os.path.join(base, "puzzles.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    js_path = os.path.join(base, "puzzles-data.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("window.__PUZZLES_MANIFEST = ")
        json.dump(manifest, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")

    print("Wrote", len(puzzles), "puzzle pairs to", OUT_DIR)
    print("Wrote puzzles.json and puzzles-data.js")


if __name__ == "__main__":
    main()
