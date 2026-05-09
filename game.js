(function () {
  'use strict';

  /** @typedef {{x:number,y:number,w:number,h:number,found:boolean}} DiffBox */

  var PUZZLES = [];
  var puzzleIndex = 0;
  var round = 1;
  var score = 0;
  var found = 0;
  /** @type {DiffBox[]} */
  var differences = [];
  var difficulty = 'medium';
  var timerSec = 0;
  var timerInt = null;
  var gameOver = false;
  var shuffleSeed = Date.now();
  var assetGeneration = 0;

  var imgLeft = document.getElementById('imgLeft');
  var imgRight = document.getElementById('imgRight');
  var stageLeft = document.getElementById('stageLeft');
  var stageRight = document.getElementById('stageRight');
  var markerLeft = document.getElementById('markerLeft');
  var markerRight = document.getElementById('markerRight');
  var puzzleSel = document.getElementById('puzzleSel');

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function padBox(box, factor) {
    var cx = box.x + box.w / 2;
    var cy = box.y + box.h / 2;
    var nw = Math.min(1, box.w * factor);
    var nh = Math.min(1, box.h * factor);
    return {
      x: Math.max(0, cx - nw / 2),
      y: Math.max(0, cy - nh / 2),
      w: Math.min(1, nw),
      h: Math.min(1, nh),
    };
  }

  function hitBoxFor(df) {
    var b = { x: df.x, y: df.y, w: df.w, h: df.h };
    if (difficulty === 'easy') return padBox(b, 1.35);
    if (difficulty === 'hard') return padBox(b, 0.72);
    return padBox(b, 1.08);
  }

  /**
   * Map pointer to normalized coords inside displayed image (object-fit: contain).
   */
  function normFromEvent(img, clientX, clientY) {
    var rect = img.getBoundingClientRect();
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    if (!nw || !nh) return { nx: -1, ny: -1, ok: false };
    var rw = rect.width;
    var rh = rect.height;
    var scale = Math.min(rw / nw, rh / nh);
    var dw = nw * scale;
    var dh = nh * scale;
    var ox = rect.left + (rw - dw) / 2;
    var oy = rect.top + (rh - dh) / 2;
    var x = clientX - ox;
    var y = clientY - oy;
    return {
      nx: x / dw,
      ny: y / dh,
      ok: x >= 0 && y >= 0 && x <= dw && y <= dh,
    };
  }

  function pointInBox(nx, ny, box) {
    return nx >= box.x && nx <= box.x + box.w && ny >= box.y && ny <= box.y + box.h;
  }

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
    var o = ac.createOscillator();
    var g = ac.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol || 0.3, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
    o.connect(g);
    g.connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + dur);
  }
  function playCorrect() {
    [523, 659, 784].forEach(function (f, i) {
      setTimeout(function () {
        playTone(f, 0.18, 'sine', 0.35);
      }, i * 90);
    });
  }
  function playWrong() {
    playTone(180, 0.3, 'sawtooth', 0.2);
  }
  function playWin() {
    [523, 659, 784, 1047].forEach(function (f, i) {
      setTimeout(function () {
        playTone(f, 0.25, 'sine', 0.4);
      }, i * 100);
    });
  }

  function showToast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function () {
      t.classList.remove('show');
    }, 1800);
  }

  function buildTracker() {
    var wrap = document.getElementById('diffTracker');
    wrap.innerHTML = '';
    for (var i = 0; i < 5; i++) {
      var dot = document.createElement('div');
      dot.className = 'diff-dot';
      dot.id = 'dot' + i;
      dot.textContent = '?';
      wrap.appendChild(dot);
    }
  }

  function syncMarkerCanvasSize(canvas, img) {
    var rect = img.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, dw: rect.width, dh: rect.height };
  }

  function drawMarkers() {
    var imgs = [imgLeft, imgRight];
    var canvases = [markerLeft, markerRight];
    for (var p = 0; p < 2; p++) {
      var img = imgs[p];
      var canvas = canvases[p];
      if (!img.naturalWidth) continue;
      var pack = syncMarkerCanvasSize(canvas, img);
      var ctx = pack.ctx;
      var dw = pack.dw;
      var dh = pack.dh;
      ctx.clearRect(0, 0, dw, dh);
      differences.forEach(function (df) {
        if (!df.found) return;
        var box = { x: df.x, y: df.y, w: df.w, h: df.h };
        var cx = (box.x + box.w / 2) * dw;
        var cy = (box.y + box.h / 2) * dh;
        var rad = Math.max(box.w * dw, box.h * dh) * 0.55;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(34,197,94,.18)';
        ctx.fill();
      });
    }
  }

  function handleStagePointer(stage, img, evt) {
    evt.preventDefault();
    ensureAudio();
    if (gameOver) return;
    var pos = normFromEvent(img, evt.clientX, evt.clientY);
    if (!pos.ok) return;

    var nx = pos.nx;
    var ny = pos.ny;
    var hitIdx = -1;
    differences.forEach(function (df, i) {
      if (df.found) return;
      var box = hitBoxFor(df);
      if (pointInBox(nx, ny, box)) hitIdx = i;
    });

    if (hitIdx >= 0) {
      differences[hitIdx].found = true;
      found++;
      document.getElementById('foundNum').textContent = String(found);
      document.getElementById('dot' + hitIdx).classList.add('found');
      document.getElementById('dot' + hitIdx).textContent = '✓';
      playCorrect();
      showToast('✅ Correct! +10 points');
      score += 10;
      document.getElementById('scoreNum').textContent = String(score);
      drawMarkers();
      if (found === 5) setTimeout(celebrate, 400);
    } else {
      stage.classList.add('shake');
      setTimeout(function () {
        stage.classList.remove('shake');
      }, 350);
      playWrong();
      showToast('❌ Try again!');
      score = Math.max(0, score - 2);
      document.getElementById('scoreNum').textContent = String(score);
    }
  }

  function attachStage(stage, img) {
    stage.addEventListener(
      'pointerdown',
      function (e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        handleStagePointer(stage, img, e);
      },
      { passive: false }
    );
  }

  attachStage(stageLeft, imgLeft);
  attachStage(stageRight, imgRight);

  function pickRandomPuzzleIndex() {
    if (!PUZZLES.length) return 0;
    var rng = mulberry32(shuffleSeed ^ round * 9973);
    return Math.floor(rng() * PUZZLES.length);
  }

  function applyPuzzleMeta(p) {
    differences = p.differences.map(function (d) {
      return { x: d.x, y: d.y, w: d.w, h: d.h, found: false };
    });
    imgLeft.alt = p.title + ' — original';
    imgRight.alt = p.title + ' — find differences';
  }

  function whenImgReady(gen, img, cb) {
    img.onload = function () {
      if (gen !== assetGeneration) return;
      cb();
    };
    img.onerror = function () {
      if (gen !== assetGeneration) return;
      showToast('Image failed to load — check paths in puzzles.json');
      cb();
    };
  }

  function newGame() {
    ensureAudio();
    document.getElementById('cel').classList.remove('show');
    document.getElementById('celApi').hidden = true;
    document.getElementById('nextBtn').hidden = true;
    clearInterval(timerInt);
    timerSec = 0;
    gameOver = false;
    found = 0;
    document.getElementById('foundNum').textContent = '0';
    document.getElementById('timerNum').textContent = '0';

    difficulty = document.getElementById('diffSel').value;

    var sel = puzzleSel.value;
    if (sel === 'random') puzzleIndex = pickRandomPuzzleIndex();
    else {
      for (var i = 0; i < PUZZLES.length; i++) {
        if (PUZZLES[i].id === sel) {
          puzzleIndex = i;
          break;
        }
      }
    }

    var p = PUZZLES[puzzleIndex];
    if (!p) return;
    applyPuzzleMeta(p);
    assetGeneration++;
    var gen = assetGeneration;
    buildTracker();

    var pending = 2;
    function afterBoth() {
      if (gen !== assetGeneration) return;
      pending--;
      if (pending === 0) drawMarkers();
    }
    whenImgReady(gen, imgLeft, afterBoth);
    whenImgReady(gen, imgRight, afterBoth);
    imgLeft.src = p.left;
    imgRight.src = p.right;

    timerInt = setInterval(function () {
      if (!gameOver) {
        timerSec++;
        document.getElementById('timerNum').textContent = String(timerSec);
      }
    }, 1000);

    document.getElementById('roundNum').textContent = String(round);
  }

  function rebuildSelectors() {
    puzzleSel.innerHTML = '';
    var optR = document.createElement('option');
    optR.value = 'random';
    optR.textContent = '🎲 Random';
    puzzleSel.appendChild(optR);
    PUZZLES.forEach(function (p) {
      var o = document.createElement('option');
      o.value = p.id;
      o.textContent = p.title;
      puzzleSel.appendChild(o);
    });
  }

  function celebrate() {
    gameOver = true;
    clearInterval(timerInt);
    playWin();
    document.getElementById('celMsg').textContent =
      'You found all 5 in ' + timerSec + ' seconds! +50 bonus!';
    score += 50;
    document.getElementById('scoreNum').textContent = String(score);
    buildConfetti();
    document.getElementById('cel').classList.add('show');
    document.getElementById('nextBtn').hidden = false;
    round++;

    var celApi = document.getElementById('celApi');
    fetchSafeJoke().then(function (joke) {
      if (joke) {
        celApi.textContent = '😄 ' + joke;
        celApi.hidden = false;
      }
    });
  }

  function buildConfetti() {
    var wrap = document.getElementById('confettiWrap');
    wrap.innerHTML = '';
    var cc = ['#F44336', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0', '#E91E63'];
    for (var i = 0; i < 16; i++) {
      var d = document.createElement('div');
      d.className = 'conf';
      d.style.left = Math.random() * 100 + '%';
      d.style.background = cc[Math.floor(Math.random() * cc.length)];
      d.style.animationDelay = Math.random() * 0.8 + 's';
      d.style.animationDuration = 0.6 + Math.random() * 0.6 + 's';
      d.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      wrap.appendChild(d);
    }
  }

  function giveHint() {
    ensureAudio();
    var unfound = differences.filter(function (df) {
      return !df.found;
    });
    if (unfound.length === 0) return;
    var df = unfound[Math.floor(Math.random() * unfound.length)];
    var i = differences.indexOf(df);
    var dot = document.getElementById('dot' + i);
    dot.classList.add('hint-flash');
    setTimeout(function () {
      dot.classList.remove('hint-flash');
    }, 2000);

    var box = { x: df.x, y: df.y, w: df.w, h: df.h };
    var fl = 0;
    var iv = setInterval(function () {
      if (fl > 5) {
        clearInterval(iv);
        drawMarkers();
        return;
      }
      drawMarkers();
      if (fl % 2 === 0) {
        [markerLeft, markerRight].forEach(function (cv) {
          var rect = cv.getBoundingClientRect();
          var ctx = cv.getContext('2d');
          var dpr = window.devicePixelRatio || 1;
          ctx.save();
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.globalAlpha = 0.45;
          ctx.fillStyle = '#FFA000';
          ctx.fillRect(box.x * rect.width, box.y * rect.height, box.w * rect.width, box.h * rect.height);
          ctx.restore();
        });
      }
      fl++;
    }, 200);

    score = Math.max(0, score - 5);
    document.getElementById('scoreNum').textContent = String(score);
    showToast('💡 Hint used! −5 points');
  }

  function loadSharjahWeather() {
    var el = document.getElementById('wxLine');
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=25.346249&longitude=55.420929&current=temperature_2m,weather_code'
    )
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        var t = j.current && j.current.temperature_2m;
        el.textContent = Math.round(t) + '°C in Sharjah · Open-Meteo (free, no key)';
      })
      .catch(function () {
        el.textContent = 'Weather unavailable (offline/CORS) · Open-Meteo';
      });
  }

  function loadAdvice() {
    var el = document.getElementById('tipLine');
    fetch('https://api.adviceslip.com/advice')
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        el.textContent = j.slip.advice;
      })
      .catch(function () {
        el.textContent = 'Look closely at colours, missing objects, and tiny shapes!';
      });
  }

  function fetchSafeJoke() {
    return fetch('https://v2.jokeapi.dev/joke/Any?safe-mode&type=single')
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        if (j.type === 'single' && j.joke) return j.joke;
        return '';
      })
      .catch(function () {
        return '';
      });
  }

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      drawMarkers();
    }, 150);
  });

  document.getElementById('newGameBtn').addEventListener('click', function () {
    shuffleSeed = Date.now();
    newGame();
  });
  document.getElementById('hintBtn').addEventListener('click', giveHint);
  document.getElementById('nextBtn').addEventListener('click', function () {
    newGame();
  });
  document.getElementById('celNextBtn').addEventListener('click', function () {
    document.getElementById('cel').classList.remove('show');
    newGame();
  });
  document.getElementById('refreshApisBtn').addEventListener('click', function () {
    loadSharjahWeather();
    loadAdvice();
  });

  puzzleSel.addEventListener('change', function () {
    if (puzzleSel.value !== 'random' && PUZZLES.length) newGame();
  });

  function boot(data) {
    PUZZLES = (data && data.puzzles) || [];
    rebuildSelectors();
    puzzleSel.value = 'random';
    loadSharjahWeather();
    loadAdvice();
    newGame();
  }

  if (window.__PUZZLES_MANIFEST && window.__PUZZLES_MANIFEST.puzzles) {
    boot(window.__PUZZLES_MANIFEST);
  } else {
    fetch('puzzles.json')
      .then(function (r) {
        if (!r.ok) throw new Error('missing');
        return r.json();
      })
      .then(boot)
      .catch(function () {
        PUZZLES = [];
        rebuildSelectors();
        document.getElementById('tipLine').textContent =
          'Run python generate_assets.py, include puzzles-data.js, then refresh.';
        showToast('Missing puzzle list — generate assets first.');
      });
  }
})();
