/* Embedded before sceneFns in standalone HTML build */
'use strict';

var SCENES = ['kitchen', 'classroom', 'park', 'beach', 'farm', 'space', 'city', 'underwater', 'circus', 'desert', 'forest', 'birthday', 'sports', 'toyroom', 'jungle'];

var BASE_POOL = {
  kitchen: ['potColor', 'cupHeight', 'appleColor', 'burnerCount', 'clockColor'],
  classroom: ['bbColor', 'book0Color', 'book1Color', 'book2Color', 'globeColor', 'rulerVisible'],
  park: ['sunX', 'pondColor', 'flowerCount', 'kiteVisible', 'treePark0Color', 'treePark1Color', 'treePark2Color'],
  beach: ['waterColor', 'umbrellaColor', 'bucketColor', 'shellCount', 'boatVisible'],
  space: ['planetColor', 'rocketX', 'moonColor', 'alienVisible', 'asteroidSize'],
  city: ['bldg0Color', 'bldg1Color', 'bldg2Color', 'bldg3Color', 'bldg4Color', 'bldg5Color', 'bldg6Color', 'carColor', 'trafficLightColor'],
  underwater: ['coralColor', 'fishColor', 'bigFishVisible', 'jellyColor', 'bubbleCount'],
  farm: ['cowColor', 'chickenVisible', 'hayColor', 'farmSunColor', 'tractorColor', 'barnWallColor', 'barnDoorVisible'],
  circus: ['balloonColor', 'jugglingBalls', 'clownShoeColor', 'lionVisible', 'ringRopeColor'],
  desert: ['sunColor', 'pyramidColor', 'snakeVisible', 'camelBlanketColor', 'mirageBirdVisible', 'cactusColor'],
  forest: ['treeColor', 'mushColor', 'owlVisible', 'butterflyColor', 'deerBowVisible'],
  birthday: ['candleCount', 'giftColor', 'extraBalloon', 'giftRightColor', 'partyTableColor'],
  sports: ['ballX', 'scoreA', 'refColor', 'cornerFlagColor', 'goalNetVisible'],
  toyroom: ['teddyColor', 'toyCarColor', 'blockCount', 'toyWindowSky', 'robotEyeGlow'],
  jungle: ['parrotColor', 'flowerColor', 'snakeColor', 'monkeyBananaVisible', 'vineAccentColor'],
};

var MICRO_PER_SCENE = 16;

function microPtsForScene(scene) {
  var si = SCENES.indexOf(scene);
  if (si < 0) si = 0;
  var pts = [];
  var i, row, col;
  for (i = 0; i < MICRO_PER_SCENE; i++) {
    row = i % 4;
    col = Math.floor(i / 4);
    pts.push([0.03 + col * 0.22 + (si % 5) * 0.012, 0.62 + row * 0.09 + (si % 3) * 0.01]);
  }
  return pts;
}

function buildScenePools() {
  var o = {},
    i,
    sc,
    arr;
  for (i = 0; i < SCENES.length; i++) {
    sc = SCENES[i];
    arr = BASE_POOL[sc].slice();
    for (var j = 0; j < MICRO_PER_SCENE; j++) arr.push(sc + '_micro' + j);
    o[sc] = arr;
  }
  return o;
}

var SCENE_POOL = buildScenePools();

var DIFF_BOXES = {
  potColor: { x: 0.04, y: 0.34, w: 0.2, h: 0.22 },
  cupHeight: { x: 0.7, y: 0.38, w: 0.16, h: 0.22 },
  appleColor: { x: 0.41, y: 0.44, w: 0.14, h: 0.1 },
  burnerCount: { x: 0.05, y: 0.48, w: 0.22, h: 0.1 },
  clockColor: { x: 0.13, y: 0.13, w: 0.14, h: 0.14 },
  bbColor: { x: 0.06, y: 0.04, w: 0.88, h: 0.48 },
  book0Color: { x: 0.28, y: 0.6, w: 0.18, h: 0.1 },
  book1Color: { x: 0.5, y: 0.6, w: 0.18, h: 0.1 },
  book2Color: { x: 0.72, y: 0.6, w: 0.18, h: 0.1 },
  globeColor: { x: 0.08, y: 0.53, w: 0.14, h: 0.14 },
  rulerVisible: { x: 0.5, y: 0.42, w: 0.25, h: 0.05 },
  sunX: { x: 0.05, y: 0.05, w: 0.9, h: 0.2 },
  treePark0Color: { x: 0.02, y: 0.18, w: 0.18, h: 0.28 },
  treePark1Color: { x: 0.68, y: 0.14, w: 0.22, h: 0.32 },
  treePark2Color: { x: 0.42, y: 0.16, w: 0.22, h: 0.26 },
  pondColor: { x: 0.1, y: 0.68, w: 0.25, h: 0.14 },
  flowerCount: { x: 0.55, y: 0.68, w: 0.35, h: 0.1 },
  kiteVisible: { x: 0.5, y: 0.08, w: 0.22, h: 0.24 },
  waterColor: { x: 0, y: 0.35, w: 1, h: 0.25 },
  umbrellaColor: { x: 0.07, y: 0.55, w: 0.26, h: 0.2 },
  bucketColor: { x: 0.72, y: 0.68, w: 0.12, h: 0.14 },
  shellCount: { x: 0.38, y: 0.8, w: 0.25, h: 0.1 },
  boatVisible: { x: 0.35, y: 0.25, w: 0.25, h: 0.22 },
  planetColor: { x: 0.06, y: 0.14, w: 0.22, h: 0.25 },
  rocketX: { x: 0.35, y: 0.1, w: 0.35, h: 0.5 },
  moonColor: { x: 0.72, y: 0.07, w: 0.2, h: 0.18 },
  alienVisible: { x: 0.62, y: 0.48, w: 0.18, h: 0.2 },
  asteroidSize: { x: 0.47, y: 0.63, w: 0.18, h: 0.15 },
  carColor: { x: 0.25, y: 0.7, w: 0.22, h: 0.14 },
  trafficLightColor: { x: 0.62, y: 0.46, w: 0.12, h: 0.32 },
  coralColor: { x: 0.07, y: 0.55, w: 0.2, h: 0.35 },
  fishColor: { x: 0.38, y: 0.24, w: 0.14, h: 0.14 },
  bigFishVisible: { x: 0.67, y: 0.18, w: 0.18, h: 0.15 },
  jellyColor: { x: 0.72, y: 0.48, w: 0.14, h: 0.18 },
  bubbleCount: { x: 0, y: 0, w: 1, h: 0.6 },
  cowColor: { x: 0.08, y: 0.6, w: 0.28, h: 0.22 },
  chickenVisible: { x: 0.36, y: 0.67, w: 0.12, h: 0.12 },
  hayColor: { x: 0.37, y: 0.7, w: 0.15, h: 0.1 },
  farmSunColor: { x: 0.8, y: 0.03, w: 0.18, h: 0.14 },
  barnWallColor: { x: 0.52, y: 0.22, w: 0.42, h: 0.42 },
  barnDoorVisible: { x: 0.64, y: 0.38, w: 0.16, h: 0.28 },
  tractorColor: { x: 0.56, y: 0.68, w: 0.26, h: 0.2 },
  balloonColor: { x: 0.05, y: 0.2, w: 0.2, h: 0.2 },
  jugglingBalls: { x: 0.28, y: 0.48, w: 0.32, h: 0.12 },
  clownShoeColor: { x: 0.32, y: 0.82, w: 0.38, h: 0.1 },
  lionVisible: { x: 0.7, y: 0.62, w: 0.22, h: 0.22 },
  ringRopeColor: { x: 0.35, y: 0.76, w: 0.32, h: 0.14 },
  sunColor: { x: 0.38, y: 0.05, w: 0.24, h: 0.2 },
  pyramidColor: { x: 0.27, y: 0.24, w: 0.38, h: 0.32 },
  snakeVisible: { x: 0.2, y: 0.68, w: 0.22, h: 0.12 },
  camelBlanketColor: { x: 0.52, y: 0.58, w: 0.22, h: 0.12 },
  mirageBirdVisible: { x: 0.74, y: 0.12, w: 0.22, h: 0.18 },
  cactusColor: { x: 0.08, y: 0.28, w: 0.84, h: 0.35 },
  treeColor: { x: 0, y: 0.2, w: 0.5, h: 0.6 },
  mushColor: { x: 0.15, y: 0.68, w: 0.65, h: 0.14 },
  owlVisible: { x: 0.7, y: 0.38, w: 0.12, h: 0.14 },
  butterflyColor: { x: 0.22, y: 0.34, w: 0.12, h: 0.12 },
  deerBowVisible: { x: 0.44, y: 0.56, w: 0.14, h: 0.14 },
  candleCount: { x: 0.35, y: 0.25, w: 0.3, h: 0.15 },
  giftColor: { x: 0.08, y: 0.45, w: 0.2, h: 0.22 },
  extraBalloon: { x: 0.75, y: 0.15, w: 0.2, h: 0.2 },
  giftRightColor: { x: 0.7, y: 0.48, w: 0.22, h: 0.22 },
  partyTableColor: { x: 0.08, y: 0.62, w: 0.84, h: 0.12 },
  ballX: { x: 0.35, y: 0.42, w: 0.3, h: 0.16 },
  scoreA: { x: 0.3, y: 0, w: 0.4, h: 0.1 },
  refColor: { x: 0.42, y: 0.26, w: 0.16, h: 0.14 },
  cornerFlagColor: { x: 0, y: 0.02, w: 0.1, h: 0.08 },
  goalNetVisible: { x: 0, y: 0.32, w: 0.1, h: 0.42 },
  teddyColor: { x: 0.06, y: 0.1, w: 0.12, h: 0.14 },
  toyCarColor: { x: 0.56, y: 0.14, w: 0.2, h: 0.12 },
  blockCount: { x: 0.04, y: 0.68, w: 0.45, h: 0.14 },
  toyWindowSky: { x: 0.66, y: 0.03, w: 0.3, h: 0.2 },
  robotEyeGlow: { x: 0.18, y: 0.08, w: 0.14, h: 0.14 },
  parrotColor: { x: 0.68, y: 0.22, w: 0.14, h: 0.14 },
  flowerColor: { x: 0.48, y: 0.55, w: 0.14, h: 0.12 },
  snakeColor: { x: 0.04, y: 0.54, w: 0.22, h: 0.1 },
  monkeyBananaVisible: { x: 0.26, y: 0.32, w: 0.18, h: 0.16 },
  vineAccentColor: { x: 0.1, y: 0, w: 0.8, h: 0.55 },
};

var CITY_BLDS = [
  { x: 0, w: 0.15, h: 0.55 },
  { x: 0.14, w: 0.12, h: 0.7 },
  { x: 0.25, w: 0.18, h: 0.45 },
  { x: 0.42, w: 0.14, h: 0.65 },
  { x: 0.55, w: 0.2, h: 0.5 },
  { x: 0.74, w: 0.12, h: 0.68 },
  { x: 0.85, w: 0.15, h: 0.42 },
];
(function registerCityBoxes() {
  var i, b;
  for (i = 0; i < CITY_BLDS.length; i++) {
    b = CITY_BLDS[i];
    DIFF_BOXES['bldg' + i + 'Color'] = { x: b.x, y: 1 - b.h - 0.28, w: b.w, h: b.h };
  }
})();

(function registerMicroBoxes() {
  var si, sc, pts, j, p;
  for (si = 0; si < SCENES.length; si++) {
    sc = SCENES[si];
    pts = microPtsForScene(sc);
    for (j = 0; j < MICRO_PER_SCENE; j++) {
      p = pts[j];
      DIFF_BOXES[sc + '_micro' + j] = { x: Math.max(0, p[0] - 0.06), y: Math.max(0, p[1] - 0.06), w: 0.13, h: 0.13 };
    }
  }
})();

/* ===GAME_RUNTIME=== */
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function genDifferences(scene, rng2) {
  var pool = SCENE_POOL[scene];
  if (!pool || pool.length === 0) pool = SCENE_POOL.kitchen;
  var chosen = [],
    tries = 0,
    k,
    i,
    dup;
  while (chosen.length < 5 && tries < 800) {
    tries++;
    k = pool[Math.floor(rng2() * pool.length)];
    dup = false;
    for (i = 0; i < chosen.length; i++) if (chosen[i].key === k) dup = true;
    if (!dup) chosen.push({ key: k, found: false });
  }
  return chosen;
}

function padBox(box, factor) {
  var cx = box.x + box.w / 2,
    cy = box.y + box.h / 2,
    nw = Math.min(1, box.w * factor),
    nh = Math.min(1, box.h * factor);
  return { x: Math.max(0, cx - nw / 2), y: Math.max(0, cy - nh / 2), w: Math.min(1, nw), h: Math.min(1, nh) };
}

function hitBoxFor(df) {
  var b = DIFF_BOXES[df.key] || { x: 0, y: 0, w: 1, h: 1 };
  if (difficulty === 'easy') return padBox(b, 1.18);
  if (difficulty === 'hard') return padBox(b, 0.82);
  return b;
}

var rng,
  seed,
  roundNum = 1,
  score = 0,
  found = 0,
  differences = [],
  difficulty = 'medium',
  sceneType = 'kitchen';
var timerSec = 0,
  timerInt = null,
  gameOver = false;
var W = 500,
  H = 370;

var cvL = document.getElementById('cvLeft');
var cvR = document.getElementById('cvRight');
var ctxL = cvL.getContext('2d');
var ctxR = cvR.getContext('2d');

var AC = null;
function getAudio() {
  if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
  return AC;
}
function ensureAudio() {
  var ac = getAudio();
  if (ac.state === 'suspended') ac.resume().catch(function () {});
}
function playTone(freq, dur, type, vol) {
  var ac = getAudio();
  var o = ac.createOscillator(),
    g = ac.createGain();
  o.type = type || 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(vol || 0.28, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
  o.connect(g);
  g.connect(ac.destination);
  o.start();
  o.stop(ac.currentTime + dur);
}
function playCorrect() {
  [523, 659, 784].forEach(function (f, i) {
    setTimeout(function () {
      playTone(f, 0.17, 'sine', 0.34);
    }, i * 88);
  });
}
function playWrong() {
  playTone(175, 0.28, 'sawtooth', 0.19);
}
function playWin() {
  [523, 659, 784, 1047].forEach(function (f, i) {
    setTimeout(function () {
      playTone(f, 0.24, 'sine', 0.38);
    }, i * 98);
  });
}

function setupCanvas() {
  W = Math.min(520, window.innerWidth * 0.92 - 24);
  H = Math.round(W * 0.74);
  window.__ARAS_WH = { W: W, H: H };
  cvL.width = W;
  cvL.height = H;
  cvR.width = W;
  cvR.height = H;
}

function paintBoth() {
  var rL = mulberry32(seed);
  ctxL.clearRect(0, 0, W, H);
  if (sceneFns[sceneType]) sceneFns[sceneType](ctxL, rL, []);
  var rR = mulberry32(seed);
  ctxR.clearRect(0, 0, W, H);
  if (sceneFns[sceneType]) sceneFns[sceneType](ctxR, rR, differences);
}

function newGame() {
  ensureAudio();
  setupCanvas();
  document.getElementById('cel').classList.remove('show');
  document.getElementById('nextBtn').hidden = true;
  clearInterval(timerInt);
  timerSec = 0;
  gameOver = false;
  found = 0;
  document.getElementById('foundNum').textContent = '0';
  document.getElementById('timerNum').textContent = '0';

  seed = (Math.floor(Math.random() * 0x7fffffff) ^ Date.now()) >>> 0;
  rng = mulberry32(seed);

  var scat = document.getElementById('sceneSel').value;
  if (scat === 'random') scat = SCENES[Math.floor(Math.random() * SCENES.length)];
  sceneType = scat;

  difficulty = document.getElementById('diffSel').value;
  var rng2 = mulberry32(seed ^ 0x9e3779b9);
  differences = genDifferences(sceneType, rng2);

  paintBoth();
  buildTracker();

  timerInt = setInterval(function () {
    if (!gameOver) {
      timerSec++;
      document.getElementById('timerNum').textContent = timerSec;
    }
  }, 1000);
  document.getElementById('roundNum').textContent = roundNum;
}

function redrawPreserve() {
  setupCanvas();
  paintBoth();
  drawFoundMarkers();
}

var resizeTimer = null;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(redrawPreserve, 260);
});

function buildTracker() {
  var wrap = document.getElementById('diffTracker');
  wrap.innerHTML = '';
  var i, dot;
  for (i = 0; i < 5; i++) {
    dot = document.createElement('div');
    dot.className = 'dot';
    dot.id = 'dot' + i;
    dot.textContent = '?';
    wrap.appendChild(dot);
  }
}

function getCanvasPos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  var scaleX = W / rect.width,
    scaleY = H / rect.height;
  return { x: (evt.clientX - rect.left) * scaleX, y: (evt.clientY - rect.top) * scaleY };
}

function handleClick(canvas, evt) {
  evt.preventDefault();
  ensureAudio();
  if (gameOver) return;
  var pos = getCanvasPos(canvas, evt);
  var nx = pos.x / W,
    ny = pos.y / H;

  var hitIdx = -1;
  differences.forEach(function (df, i) {
    if (df.found) return;
    var box = hitBoxFor(df);
    if (nx >= box.x && nx <= box.x + box.w && ny >= box.y && ny <= box.y + box.h) hitIdx = i;
  });

  if (hitIdx >= 0) {
    differences[hitIdx].found = true;
    found++;
    document.getElementById('foundNum').textContent = found;
    document.getElementById('dot' + hitIdx).classList.add('ok');
    document.getElementById('dot' + hitIdx).textContent = '✓';
    playCorrect();
    showToast('✅ Correct! +10');
    score += 10;
    document.getElementById('scoreNum').textContent = score;
    drawFoundMarkers();
    if (found === 5) setTimeout(celebrate, 380);
  } else {
    canvas.classList.add('shake');
    setTimeout(function () {
      canvas.classList.remove('shake');
    }, 330);
    playWrong();
    showToast('❌ Try again!');
    score = Math.max(0, score - 2);
    document.getElementById('scoreNum').textContent = score;
  }
}

function drawFoundMarkers() {
  paintBoth();
  [ctxL, ctxR].forEach(function (ctx) {
    differences.forEach(function (df) {
      if (!df.found) return;
      var box = DIFF_BOXES[df.key] || { x: 0.08, y: 0.08, w: 0.15, h: 0.15 };
      var cx = (box.x + box.w / 2) * W,
        cy = (box.y + box.h / 2) * H,
        rad = Math.min(box.w, box.h) * W * 0.55;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(34,197,94,.14)';
      ctx.fill();
    });
  });
}

function celebrate() {
  gameOver = true;
  clearInterval(timerInt);
  playWin();
  document.getElementById('celMsg').textContent =
    'You found all 5 differences in ' + timerSec + ' seconds! +50 bonus!';
  score += 50;
  document.getElementById('scoreNum').textContent = score;
  buildConfetti();
  document.getElementById('cel').classList.add('show');
  document.getElementById('nextBtn').hidden = false;
  roundNum++;
}

function buildConfetti() {
  var wrap = document.getElementById('confettiWrap');
  wrap.innerHTML = '';
  var cc = ['#e53935', '#fbc02d', '#43a047', '#1e88e5', '#8e24aa', '#00897b'];
  var i, d;
  for (i = 0; i < 20; i++) {
    d = document.createElement('i');
    d.style.left = Math.random() * 100 + '%';
    d.style.background = cc[Math.floor(Math.random() * cc.length)];
    d.style.animationDelay = Math.random() * 0.75 + 's';
    d.style.animationDuration = 0.55 + Math.random() * 0.55 + 's';
    wrap.appendChild(d);
  }
}

function giveHint() {
  ensureAudio();
  var unfound = differences.filter(function (df) {
    return !df.found;
  });
  if (!unfound.length) return;
  var df = unfound[Math.floor(Math.random() * unfound.length)];
  var i = differences.indexOf(df);
  document.getElementById('dot' + i).classList.add('hint');
  setTimeout(function () {
    document.getElementById('dot' + i).classList.remove('hint');
  }, 1800);

  var box = DIFF_BOXES[df.key] || { x: 0.1, y: 0.1, w: 0.18, h: 0.18 };
  var fl = 0;
  var iv = setInterval(function () {
    if (fl > 5) {
      clearInterval(iv);
      redrawPreserve();
      return;
    }
    drawFoundMarkers();
    if (fl % 2 === 0) {
      [ctxL, ctxR].forEach(function (ctx) {
        ctx.save();
        ctx.globalAlpha = 0.45;
        ctx.fillStyle = '#fb923c';
        ctx.fillRect(box.x * W, box.y * H, box.w * W, box.h * H);
        ctx.restore();
      });
    }
    fl++;
  }, 190);

  score = Math.max(0, score - 5);
  document.getElementById('scoreNum').textContent = score;
  showToast('💡 Hint −5');
}

function showToast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function () {
    t.classList.remove('show');
  }, 1700);
}

function attachPointer(canvas) {
  canvas.addEventListener(
    'pointerdown',
    function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      handleClick(canvas, e);
    },
    { passive: false }
  );
}
attachPointer(cvL);
attachPointer(cvR);

document.getElementById('newGameBtn').addEventListener('click', newGame);
document.getElementById('hintBtn').addEventListener('click', giveHint);
document.getElementById('nextBtn').addEventListener('click', newGame);
document.getElementById('celNextBtn').addEventListener('click', function () {
  document.getElementById('cel').classList.remove('show');
  newGame();
});

newGame();
