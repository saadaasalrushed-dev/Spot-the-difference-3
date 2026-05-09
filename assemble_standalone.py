# Builds single self-contained index.html (procedural canvas game only)
from pathlib import Path

BASE = Path(__file__).resolve().parent

draw_js = (BASE / "_generated_draw.js").read_text(encoding="utf-8")
full_logic = (BASE / "standalone-game-logic.js").read_text(encoding="utf-8")
pre_rt, _, rt = full_logic.partition("/* ===GAME_RUNTIME=== */")
pre_rt = pre_rt.replace("'use strict';", "").strip()
if pre_rt.startswith("/* Embedded"):
    pre_rt = pre_rt.split("\n", 1)[1].lstrip()

scenes_body = (BASE / "_generated_scenes_body.js").read_text(encoding="utf-8")

draw_micro = """
function drawMicroLayer(ctx, diffs, W, H, scene) {
  var pts = microPtsForScene(scene);
  var colsO = ['#BDBDBD', '#90A4AE', '#A1887F'];
  var colsM = ['#FF7043', '#29B6F6', '#FFEE58', '#AB47BC', '#66BB6A', '#EC407A'];
  var i, x, y, key;
  for (i = 0; i < MICRO_PER_SCENE; i++) {
    key = scene + '_micro' + i;
    x = pts[i][0] * W;
    y = pts[i][1] * H;
    if (d(diffs, key, false, true)) star(ctx, x, y, W * 0.02, colsM[i % colsM.length]);
    else circle(ctx, x, y, W * 0.01, colsO[i % colsO.length]);
  }
}
"""

script = "\n".join(
    [
        "'use strict';",
        draw_js,
        pre_rt,
        scenes_body.strip(),
        draw_micro.strip(),
        rt.strip(),
    ]
)

html_head = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Spot the Difference — Canvas Puzzle</title>
<style>
  :root {
    --ink:#1a1a2e; --paper:#fffef7; --accent:#e63946; --band:#457b9d;
    --ok:#2a9d8f; --muted:#6c757d;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: repeating-linear-gradient(180deg, #f8f9fa 0px, #f8f9fa 24px, #eceff1 24px, #eceff1 25px);
    color: var(--ink);
    min-height: 100vh;
  }
  .masthead {
    background: var(--band);
    color: #fff;
    padding: 10px 14px;
    border-bottom: 6px double #fff;
    box-shadow: 0 2px 0 var(--ink);
  }
  .masthead-inner { max-width: 1100px; margin: 0 auto; text-align: center; }
  .masthead h1 {
    font-size: clamp(1rem, 3vw, 1.35rem);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .masthead p { font-size: 11px; opacity: 0.92; margin-top: 4px; line-height: 1.35; }
  .rules-banner {
    max-width: 1100px; margin: 12px auto 0; padding: 8px 12px;
    background: var(--paper); border: 3px solid var(--ink);
    box-shadow: 4px 4px 0 var(--ink);
    font-size: 13px; font-weight: 700;
  }
  .controls {
    max-width: 1100px; margin: 12px auto 0; padding: 0 10px;
    display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center;
  }
  .ctrl {
    background: var(--paper); border: 2px solid var(--ink); padding: 6px 10px;
    border-radius: 6px; box-shadow: 3px 3px 0 var(--ink);
    display: flex; align-items: center; gap: 6px;
  }
  label { font-size: 12px; font-weight: 700; }
  select, button {
    font-family: inherit; font-size: 13px; cursor: pointer;
    border: 2px solid var(--ink); border-radius: 4px; padding: 5px 10px;
    background: #fff;
  }
  button.primary { background: var(--accent); color: #fff; font-weight: 800; }
  button.hint { background: #ffb703; font-weight: 800; }
  button.next { background: var(--band); color: #fff; font-weight: 800; }
  .stats {
    display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
    margin-top: 10px;
  }
  .pill {
    background: var(--paper); border: 2px dashed var(--ink); padding: 4px 12px;
    font-weight: 700; font-size: 13px;
  }
  .pill span { font-weight: 500; color: var(--muted); }
  .game-area { max-width: 1100px; margin: 14px auto; padding: 0 10px; }
  .hint-text { text-align: center; font-size: 13px; color: var(--muted); margin-bottom: 8px; }
  .pair {
    display: flex; gap: 12px; justify-content: center; align-items: flex-start; flex-wrap: wrap;
  }
  .panel {
    flex: 1; min-width: 280px; max-width: 520px;
    background: var(--paper); border: 4px solid var(--ink);
    padding: 8px; box-shadow: 6px 6px 0 rgba(0,0,0,.12);
  }
  .panel h3 {
    text-align: center; font-size: 12px; letter-spacing: .08em;
    text-transform: uppercase; margin-bottom: 6px;
  }
  canvas {
    width: 100%; height: auto; display: block;
    border: 2px solid var(--ink); border-radius: 4px;
    cursor: crosshair; touch-action: none; background: #fff;
  }
  .tracker {
    max-width: 1100px; margin: 12px auto; padding: 0 10px;
    display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;
  }
  .dot {
    width: 36px; height: 36px; border-radius: 50%; border: 3px solid var(--ink);
    background: #fff; display: flex; align-items: center; justify-content: center;
    font-size: 17px; font-weight: 800;
  }
  .dot.ok { background: var(--ok); border-color: var(--ok); color: #fff; }
  .dot.hint { animation: pulse 0.45s ease 3; background: #ffb703; border-color: var(--ink); }
  @keyframes pulse { 50% { opacity: 0.45; } }
  .modal {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,.55);
    z-index: 50; align-items: center; justify-content: center;
  }
  .modal.show { display: flex; }
  .modal-card {
    background: var(--paper); border: 4px solid var(--ink); padding: 28px 32px;
    max-width: 380px; width: 92%; text-align: center; box-shadow: 10px 10px 0 var(--ink);
  }
  .modal-card h2 { color: var(--accent); margin-bottom: 8px; }
  .confetti { height: 52px; position: relative; overflow: hidden; margin-bottom: 10px; }
  .confetti i {
    position: absolute; width: 9px; height: 9px; border-radius: 1px;
    animation: fall 1s linear infinite;
  }
  @keyframes fall { to { transform: translateY(56px) rotate(260deg); opacity: 0; } }
  .toast {
    position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%);
    background: var(--ink); color: #fff; padding: 9px 22px; border-radius: 999px;
    font-weight: 700; font-size: 14px; opacity: 0; transition: opacity .25s; z-index: 60;
    pointer-events: none;
  }
  .toast.show { opacity: 1; }
  .shake { animation: shake 0.28s ease; }
  @keyframes shake {
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  footer {
    text-align: center; padding: 16px; font-size: 11px; color: var(--muted);
  }
  @media (max-width: 600px) {
    .pair { gap: 8px; }
    .panel { min-width: 100%; max-width: 100%; }
  }
</style>
</head>
<body>
  <header class="masthead">
    <div class="masthead-inner">
      <h1>Spot the Difference</h1>
      <p>Hand-drawn style scenes · 100% offline · Canvas only · Seeded random layouts · Find all 5!</p>
    </div>
  </header>
  <div class="rules-banner">Two panels: the right picture hides five tiny changes. Tap either panel where you see a difference.</div>
  <div class="controls">
    <div class="ctrl"><label for="diffSel">Difficulty</label>
      <select id="diffSel">
        <option value="easy">Easy</option>
        <option value="medium" selected>Medium</option>
        <option value="hard">Hard</option>
      </select></div>
    <div class="ctrl"><label for="sceneSel">Scene</label>
      <select id="sceneSel">
        <option value="random">Random</option>
        <option value="kitchen">Kitchen</option>
        <option value="classroom">Classroom</option>
        <option value="park">Park</option>
        <option value="beach">Beach</option>
        <option value="farm">Farm</option>
        <option value="space">Space</option>
        <option value="city">City street</option>
        <option value="underwater">Underwater</option>
        <option value="circus">Circus</option>
        <option value="desert">Desert</option>
        <option value="forest">Forest</option>
        <option value="birthday">Birthday party</option>
        <option value="sports">Sports field</option>
        <option value="toyroom">Toy room</option>
        <option value="jungle">Jungle</option>
      </select></div>
    <button type="button" class="primary" id="newGameBtn">New Game</button>
    <button type="button" class="hint" id="hintBtn">Hint</button>
    <button type="button" class="next" id="nextBtn" hidden>Next Scene</button>
  </div>
  <div class="stats">
    <div class="pill">Round <span id="roundNum">1</span></div>
    <div class="pill">Found <span id="foundNum">0</span>/5</div>
    <div class="pill">Score <span id="scoreNum">0</span></div>
    <div class="pill">Time <span id="timerNum">0</span>s</div>
  </div>
  <div class="game-area">
    <p class="hint-text">Tip: look for colour swaps, missing shapes, extra dots, counts, and positions.</p>
    <div class="pair">
      <div class="panel"><h3>Picture A</h3><canvas id="cvLeft" width="500" height="370"></canvas></div>
      <div class="panel"><h3>Picture B</h3><canvas id="cvRight" width="500" height="370"></canvas></div>
    </div>
  </div>
  <div class="tracker" id="diffTracker"></div>
  <div class="modal" id="cel">
    <div class="modal-card">
      <div class="confetti" id="confettiWrap"></div>
      <h2>You did it!</h2>
      <p id="celMsg">All 5 differences found.</p>
      <button type="button" class="primary" id="celNextBtn" style="width:100%;margin-top:12px;padding:10px;">Next Scene</button>
    </div>
  </div>
  <div class="toast" id="toast"></div>
  <footer>Self-contained file · No images · No APIs · ~21 difference slots per scene (16 micro-markers + macro props) · mulberry32 seed</footer>
  <script>
"""

html_foot = """
  </script>
</body>
</html>
"""

out = html_head + script + html_foot
(BASE / "index.html").write_text(out, encoding="utf-8")
print("Wrote index.html", len(out), "chars")
