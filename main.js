(function () {
  'use strict';

  var PUZZLES = window.ARAS_PUZZLES || [];

  var cvL = document.getElementById('cvLeft');
  var cvR = document.getElementById('cvRight');
  var ctxL = cvL.getContext('2d');
  var ctxR = cvR.getContext('2d');

  var round = 1,
    score = 0,
    found = 0,
    differences = [],
    difficulty = 'medium',
    timerSec = 0,
    timerInt = null,
    gameOver = false;
  var W = 280,
    H = 300;
  var loadedImg = null;
  var currentPuzzle = null;

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
    g.gain.setValueAtTime(vol || 0.25, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
    o.connect(g);
    g.connect(ac.destination);
    o.start();
    o.stop(ac.currentTime + dur);
  }
  function playCorrect() {
    [523, 659, 784].forEach(function (f, i) {
      setTimeout(function () {
        playTone(f, 0.16, 'sine', 0.32);
      }, i * 85);
    });
  }
  function playWrong() {
    playTone(165, 0.28, 'sawtooth', 0.18);
  }
  function playWin() {
    [523, 659, 784, 1047].forEach(function (f, i) {
      setTimeout(function () {
        playTone(f, 0.22, 'sine', 0.38);
      }, i * 95);
    });
  }

  function padBox(box, factor) {
    var cx = box.x + box.w / 2,
      cy = box.y + box.h / 2,
      nw = Math.min(1, box.w * factor),
      nh = Math.min(1, box.h * factor);
    return {
      x: Math.max(0, cx - nw / 2),
      y: Math.max(0, cy - nh / 2),
      w: Math.min(1, nw),
      h: Math.min(1, nh),
    };
  }

  function hitBoxFor(df) {
    var b = df.box;
    if (difficulty === 'easy') return padBox(b, 1.22);
    if (difficulty === 'hard') return padBox(b, 0.78);
    return b;
  }

  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var im = new Image();
      im.onload = function () {
        resolve(im);
      };
      im.onerror = function () {
        reject(new Error('img'));
      };
      im.src = src;
    });
  }

  function pickPuzzle() {
    var sel = document.getElementById('sceneSel').value;
    if (sel === 'random') return PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
    var i,
      p = null;
    for (i = 0; i < PUZZLES.length; i++) if (PUZZLES[i].id === sel) p = PUZZLES[i];
    return p || PUZZLES[0];
  }

  function computePanelDrawArgs() {
    var pz = currentPuzzle;
    var iw = loadedImg.naturalWidth,
      ih = loadedImg.naturalHeight;
    var sy = ih * pz.top;
    var sh = ih * (pz.bottom - pz.top);
    var gm = pz.gutterMid != null ? pz.gutterMid : 0.02;
    var gs = pz.gutterSide != null ? pz.gutterSide : 0;
    var sp = pz.split != null ? pz.split : 0.5;
    var sxL = iw * gs;
    var swL = iw * (sp - gs - gm / 2);
    var sxR = iw * (sp + gm / 2);
    var swR = iw * (1 - gs - (sp + gm / 2));
    return { sy: sy, sh: sh, sxL: sxL, swL: swL, sxR: sxR, swR: swR };
  }

  function resizeCanvasToPanel() {
    var d = computePanelDrawArgs();
    var aspect = d.sh / d.swL;
    var maxW = Math.min(540, Math.floor(window.innerWidth * 0.46));
    W = Math.max(220, maxW);
    H = Math.round(W * aspect);
    cvL.width = W;
    cvL.height = H;
    cvR.width = W;
    cvR.height = H;
  }

  function drawPanels() {
    if (!loadedImg || !currentPuzzle) return;
    var d = computePanelDrawArgs();
    ctxL.imageSmoothingEnabled = true;
    ctxL.imageSmoothingQuality = 'high';
    ctxR.imageSmoothingEnabled = true;
    ctxR.imageSmoothingQuality = 'high';
    ctxL.clearRect(0, 0, W, H);
    ctxR.clearRect(0, 0, W, H);
    ctxL.drawImage(loadedImg, d.sxL, d.sy, d.swL, d.sh, 0, 0, W, H);
    ctxR.drawImage(loadedImg, d.sxR, d.sy, d.swR, d.sh, 0, 0, W, H);
  }

  function drawFoundMarkers() {
    drawPanels();
    [ctxL, ctxR].forEach(function (ctx) {
      differences.forEach(function (df) {
        if (!df.found) return;
        var b = df.box;
        var cx = (b.x + b.w / 2) * W,
          cy = (b.y + b.h / 2) * H,
          rad = Math.min(b.w, b.h) * W * 0.55;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(34,197,94,.12)';
        ctx.fill();
      });
    });
  }

  function redrawPreserve() {
    if (!loadedImg || !currentPuzzle) return;
    resizeCanvasToPanel();
    drawFoundMarkers();
  }

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(redrawPreserve, 280);
  });

  function buildTracker() {
    var wrap = document.getElementById('diffTracker');
    wrap.innerHTML = '';
    var i,
      dot;
    for (i = 0; i < 5; i++) {
      dot = document.createElement('div');
      dot.className = 'diff-dot';
      dot.id = 'dot' + i;
      dot.textContent = '?';
      wrap.appendChild(dot);
    }
  }

  async function newGame() {
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

    if (!PUZZLES.length) {
      document.getElementById('puzzleMeta').textContent = 'No puzzles defined.';
      return;
    }

    difficulty = document.getElementById('diffSel').value;
    currentPuzzle = pickPuzzle();
    document.getElementById('puzzleMeta').textContent = 'Loading “' + currentPuzzle.title + '”…';

    try {
      loadedImg = await loadImage(currentPuzzle.file);
    } catch (e) {
      document.getElementById('puzzleMeta').textContent =
        'Could not load image: ' + currentPuzzle.file + ' — copy puzzle PNGs into assets/.';
      return;
    }

    differences = currentPuzzle.hits.map(function (arr) {
      return { found: false, box: { x: arr[0], y: arr[1], w: arr[2], h: arr[3] } };
    });

    resizeCanvasToPanel();
    drawPanels();
    buildTracker();

    document.getElementById('puzzleMeta').textContent =
      currentPuzzle.title + ' · ' + (currentPuzzle.theme || 'Illustrated spot-the-difference');

    timerInt = setInterval(function () {
      if (!gameOver) {
        timerSec++;
        document.getElementById('timerNum').textContent = timerSec;
      }
    }, 1000);
    document.getElementById('roundNum').textContent = round;
  }

  function getCanvasPos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = W / rect.width,
      scaleY = H / rect.height;
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY,
    };
  }

  function handleClick(canvas, evt) {
    evt.preventDefault();
    ensureAudio();
    if (gameOver || !differences.length) return;
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
      document.getElementById('dot' + hitIdx).classList.add('found');
      document.getElementById('dot' + hitIdx).textContent = '✓';
      playCorrect();
      showToast('✅ Correct! +10');
      score += 10;
      document.getElementById('scoreNum').textContent = score;
      drawFoundMarkers();
      if (found === 5) setTimeout(celebrate, 350);
    } else {
      canvas.classList.add('shake');
      setTimeout(function () {
        canvas.classList.remove('shake');
      }, 320);
      playWrong();
      showToast('❌ Try again!');
      score = Math.max(0, score - 2);
      document.getElementById('scoreNum').textContent = score;
    }
  }

  function celebrate() {
    gameOver = true;
    clearInterval(timerInt);
    playWin();
    document.getElementById('celMsg').textContent =
      'You spotted all 5 differences in ' + timerSec + ' seconds! +50 bonus!';
    score += 50;
    document.getElementById('scoreNum').textContent = score;
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
    var i,
      d;
    for (i = 0; i < 18; i++) {
      d = document.createElement('div');
      d.className = 'conf';
      d.style.left = Math.random() * 100 + '%';
      d.style.background = cc[Math.floor(Math.random() * cc.length)];
      d.style.animationDelay = Math.random() * 0.8 + 's';
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
    var dot = document.getElementById('dot' + i);
    dot.classList.add('hint-flash');
    setTimeout(function () {
      dot.classList.remove('hint-flash');
    }, 2000);

    var box = df.box;
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
          ctx.globalAlpha = 0.42;
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(box.x * W, box.y * H, box.w * W, box.h * H);
          ctx.restore();
        });
      }
      fl++;
    }, 200);

    score = Math.max(0, score - 5);
    document.getElementById('scoreNum').textContent = score;
    showToast('💡 Hint −5 points');
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

  document.getElementById('newGameBtn').addEventListener('click', function () {
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

  function fetchSafeJoke() {
    return fetch('https://v2.jokeapi.dev/joke/Any?safe-mode&type=single')
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        return j.type === 'single' && j.joke ? j.joke : '';
      })
      .catch(function () {
        return '';
      });
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
        el.textContent = Math.round(t) + '°C · Open-Meteo';
      })
      .catch(function () {
        el.textContent = 'Unavailable · Open-Meteo';
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
        el.textContent = 'Look along edges and repeated shapes!';
      });
  }

  function loadQuotable() {
    var el = document.getElementById('quoteLine');
    fetch('https://api.quotable.io/random')
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        el.textContent = '"' + j.content + '" — ' + j.author;
      })
      .catch(function () {
        return fetch('https://dummyjson.com/quotes/random')
          .then(function (r) {
            return r.json();
          })
          .then(function (j) {
            el.textContent = '"' + j.quote + '" — ' + j.author;
          });
      })
      .catch(function () {
        el.textContent = 'Notice shapes, colours, and tiny extras!';
      });
  }

  function loadZen() {
    var el = document.getElementById('zenLine');
    fetch('https://zenquotes.io/api/random')
      .then(function (r) {
        return r.json();
      })
      .then(function (arr) {
        var q = arr[0];
        el.textContent = q.q + ' — ' + q.a;
      })
      .catch(function () {
        el.textContent = 'Stay curious!';
      });
  }

  function loadCatFact() {
    var el = document.getElementById('catLine');
    fetch('https://catfact.ninja/fact')
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        el.textContent = j.fact;
      })
      .catch(function () {
        el.textContent = 'Cats are great observers—like you!';
      });
  }

  function loadUAEInfo() {
    var el = document.getElementById('uaeLine');
    fetch('https://restcountries.com/v3.1/name/united%20arab%20emirates?fields=name,capital,population')
      .then(function (r) {
        return r.json();
      })
      .then(function (arr) {
        var c = arr[0];
        el.textContent =
          'Capital: ' + (c.capital && c.capital[0] ? c.capital[0] : '—') + ' · pop ~' + c.population.toLocaleString();
      })
      .catch(function () {
        el.textContent = 'REST Countries';
      });
  }

  function loadBoredActivity() {
    var el = document.getElementById('boredLine');
    fetch('https://www.boredapi.com/api/activity')
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        el.textContent = j.activity || '—';
      })
      .catch(function () {
        el.textContent = 'Take a short stretch between puzzles!';
      });
  }

  function refreshApis() {
    loadSharjahWeather();
    loadAdvice();
    loadQuotable();
    loadZen();
    loadCatFact();
    loadUAEInfo();
    loadBoredActivity();
  }

  document.getElementById('refreshApisBtn').addEventListener('click', refreshApis);

  refreshApis();
  newGame();
})();
