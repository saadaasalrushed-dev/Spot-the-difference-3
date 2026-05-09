  function d(diffs, key, orig, mod) {
    for (var i = 0; i < diffs.length; i++) if (diffs[i].key === key) return mod;
    return orig;
  }

  var sceneFns = {
    kitchen: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      rect(ctx, 0, 0, W, H, '#FFF8F0');
      rect(ctx, 0, H * 0.6, W, H * 0.4, '#D4956A');
      rect(ctx, 0, 0, W, H * 0.08, '#8B6914');
      rect(ctx, 0, H * 0.55, W, H * 0.06, '#C8B89A');
      rect(ctx, W * 0.3, H * 0.1, W * 0.4, H * 0.3, '#AEE4F5', 4);
      line(ctx, W * 0.5, H * 0.1, W * 0.5, H * 0.4, '#aaa', 1.5);
      line(ctx, W * 0.3, H * 0.25, W * 0.7, H * 0.25, '#aaa', 1.5);
      rect(ctx, W * 0.28, H * 0.08, W * 0.06, H * 0.34, '#E57373', 3);
      rect(ctx, W * 0.66, H * 0.08, W * 0.06, H * 0.34, '#E57373', 3);
      var potCol = d(diffs, 'potColor', '#CC4444', '#4444CC');
      rect(ctx, W * 0.08, H * 0.38, W * 0.12, H * 0.18, potCol, 4);
      rect(ctx, W * 0.06, H * 0.36, W * 0.16, H * 0.03, potCol, 2);
      rect(ctx, W * 0.2, H * 0.41, W * 0.04, H * 0.02, potCol);
      var cupH = d(diffs, 'cupHeight', H * 0.12, H * 0.18);
      rect(ctx, W * 0.75, H * 0.55 - cupH, W * 0.08, cupH, '#5B9BD5', 4);
      rect(ctx, W * 0.83, H * 0.55 - cupH * 0.6, W * 0.025, H * 0.04, '#5B9BD5');
      rect(ctx, W * 0.42, H * 0.5, W * 0.16, H * 0.05, '#B8860B', 8);
      var apple = d(diffs, 'appleColor', '#CC2222', '#22CC22');
      circle(ctx, W * 0.47, H * 0.49, W * 0.03, apple);
      circle(ctx, W * 0.53, H * 0.49, W * 0.03, '#FFA500');
      rect(ctx, W * 0.8, H * 0.1, W * 0.12, H * 0.45, '#EFEFEF', 4);
      rect(ctx, W * 0.82, H * 0.32, W * 0.08, H * 0.01, '#ccc');
      rect(ctx, W * 0.07, H * 0.55, W * 0.2, H * 0.06, '#888', 4);
      var burnerCount = d(diffs, 'burnerCount', 2, 3);
      for (var bi = 0; bi < burnerCount; bi++) circle(ctx, W * 0.1 + bi * W * 0.07, H * 0.52, W * 0.025, '#444');
      var clockCol = d(diffs, 'clockColor', '#fff', '#FFD700');
      circle(ctx, W * 0.2, H * 0.2, W * 0.05, clockCol);
      circle(ctx, W * 0.2, H * 0.2, W * 0.005, '#333');
      line(ctx, W * 0.2, H * 0.2, W * 0.2, H * 0.16, '#333', 1.5);
      line(ctx, W * 0.2, H * 0.2, W * 0.23, H * 0.2, '#333', 1.5);
      drawMicroLayer(ctx, diffs, W, H, 'kitchen');
    },
    classroom: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      rect(ctx, 0, 0, W, H, '#F0F4FF');
      rect(ctx, 0, H * 0.7, W, H * 0.3, '#C8A87A');
      var bbCol = d(diffs, 'bbColor', '#2D5A1B', '#1B2D5A');
      rect(ctx, W * 0.08, H * 0.05, W * 0.84, H * 0.45, bbCol, 4);
      ctx.fillStyle = '#fff';
      ctx.font = Math.round(W * 0.04) + 'px Segoe UI';
      ctx.textAlign = 'left';
      ctx.fillText('2 + 2 = ?', W * 0.15, H * 0.2);
      ctx.fillText('ABC def', W * 0.15, H * 0.35);
      rect(ctx, W * 0.03, H * 0.65, W * 0.22, H * 0.08, '#8B6914', 4);
      for (var i = 0; i < 3; i++) {
        rect(ctx, W * 0.3 + i * W * 0.22, H * 0.68, W * 0.16, H * 0.06, '#B8860B', 4);
        var bookCol = d(diffs, 'book' + i + 'Color', ['#E57373', '#64B5F6', '#81C784'][i], ['#FFD54F', '#BA68C8', '#FF8A65'][i]);
        rect(ctx, W * 0.33 + i * W * 0.22, H * 0.64, W * 0.08, H * 0.04, bookCol, 2);
      }
      rect(ctx, W * 0.82, H * 0.1, W * 0.12, H * 0.22, '#AEE4F5', 4);
      line(ctx, W * 0.88, H * 0.1, W * 0.88, H * 0.32, '#aaa', 1.5);
      var globeCol = d(diffs, 'globeColor', '#4FC3F7', '#FFB74D');
      circle(ctx, W * 0.15, H * 0.6, W * 0.055, globeCol);
      line(ctx, W * 0.15, H * 0.545, W * 0.15, H * 0.655, '#5D4037', 1.5);
      rect(ctx, W * 0.11, H * 0.655, W * 0.08, H * 0.015, '#5D4037', 2);
      rect(ctx, W * 0.72, H * 0.55, W * 0.003, H * 0.16, '#5D4037');
      rect(ctx, W * 0.72, H * 0.55, W * 0.1, H * 0.06, '#E57373');
      var rulerVisible = d(diffs, 'rulerVisible', true, false);
      if (rulerVisible) rect(ctx, W * 0.55, H * 0.44, W * 0.2, H * 0.02, '#FFD700', 2);
      drawMicroLayer(ctx, diffs, W, H, 'classroom');
    },
    park: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      rect(ctx, 0, 0, W, H, '#87CEEB');
      rect(ctx, 0, H * 0.55, W, H * 0.45, '#4CAF50');
      var sunX = d(diffs, 'sunX', W * 0.85, W * 0.15);
      circle(ctx, sunX, H * 0.12, W * 0.07, '#FFD700');
      cloud(ctx, W * 0.1, H * 0.15, W * 0.08, '#fff');
      cloud(ctx, W * 0.5, H * 0.1, W * 0.1, '#fff');
      function tree(cx, cy, h, tc, ti) {
        rect(ctx, cx - W * 0.02, cy, W * 0.04, h * 0.4, '#8B6914');
        var tc2 = d(diffs, 'treePark' + ti + 'Color', tc, tc === '#2E7D32' ? '#E91E63' : tc);
        circle(ctx, cx, cy, h * 0.5, tc2);
      }
      tree(W * 0.1, H * 0.3, H * 0.3, '#2E7D32', 0);
      tree(W * 0.8, H * 0.25, H * 0.35, '#388E3C', 1);
      tree(W * 0.55, H * 0.28, H * 0.28, '#2E7D32', 2);
      rect(ctx, W * 0.35, H * 0.65, W * 0.25, H * 0.03, '#8B6914', 3);
      rect(ctx, W * 0.37, H * 0.68, W * 0.04, H * 0.06, '#8B6914', 2);
      rect(ctx, W * 0.56, H * 0.68, W * 0.04, H * 0.06, '#8B6914', 2);
      circle(ctx, W * 0.47, H * 0.6, W * 0.025, '#FFCCBC');
      rect(ctx, W * 0.44, H * 0.625, W * 0.06, H * 0.04, '#1565C0', 3);
      var pondCol = d(diffs, 'pondColor', '#29B6F6', '#26C6DA');
      rect(ctx, W * 0.15, H * 0.72, W * 0.2, H * 0.08, pondCol, 30);
      circle(ctx, W * 0.2, H * 0.72, W * 0.02, '#fff');
      circle(ctx, W * 0.22, H * 0.7, W * 0.025, '#FFEB3B');
      var fCount = d(diffs, 'flowerCount', 4, 6);
      for (var fi = 0; fi < fCount; fi++) {
        var fx = W * (0.6 + fi * 0.06),
          fy = H * 0.73;
        circle(ctx, fx, fy, W * 0.015, '#FF5722');
        circle(ctx, fx, fy - W * 0.018, W * 0.01, '#FFC107');
      }
      var kiteVisible = d(diffs, 'kiteVisible', true, false);
      if (kiteVisible) {
        ctx.beginPath();
        ctx.moveTo(W * 0.65, H * 0.12);
        ctx.lineTo(W * 0.72, H * 0.2);
        ctx.lineTo(W * 0.65, H * 0.28);
        ctx.lineTo(W * 0.58, H * 0.2);
        ctx.closePath();
        ctx.fillStyle = '#E91E63';
        ctx.fill();
        ctx.beginPath();
        for (var ki = 0; ki < 5; ki++) ctx.lineTo(W * 0.65 + Math.sin(ki * 0.5) * W * 0.03, H * 0.28 + ki * H * 0.03);
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      drawMicroLayer(ctx, diffs, W, H, 'park');
    },
    beach: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      rect(ctx, 0, 0, W, H * 0.5, '#87CEEB');
      var waterCol = d(diffs, 'waterColor', '#0288D1', '#00838F');
      rect(ctx, 0, H * 0.38, W, H * 0.25, waterCol);
      rect(ctx, 0, H * 0.55, W, H * 0.45, '#F4D03F');
      circle(ctx, W * 0.85, H * 0.12, W * 0.07, '#FFD700');
      for (var wi = 0; wi < 4; wi++) {
        ctx.beginPath();
        ctx.arc(W * 0.15 + wi * W * 0.2, H * 0.45, W * 0.08, Math.PI, 0);
        ctx.strokeStyle = 'rgba(255,255,255,.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      var umbrellaCol = d(diffs, 'umbrellaColor', '#E53935', '#7B1FA2');
      ctx.beginPath();
      ctx.arc(W * 0.2, H * 0.6, W * 0.12, -Math.PI, 0);
      ctx.fillStyle = umbrellaCol;
      ctx.fill();
      line(ctx, W * 0.2, H * 0.6, W * 0.2, H * 0.82, '#8B6914', 3);
      rect(ctx, W * 0.13, H * 0.7, W * 0.14, H * 0.03, '#FF8F00', 4);
      rect(ctx, W * 0.13, H * 0.68, W * 0.02, H * 0.1, '#FF8F00', 2);
      rect(ctx, W * 0.25, H * 0.68, W * 0.02, H * 0.1, '#FF8F00', 2);
      rect(ctx, W * 0.6, H * 0.7, W * 0.12, H * 0.1, '#E6C97A', 4);
      rect(ctx, W * 0.62, H * 0.65, W * 0.04, H * 0.05, '#E6C97A', 4);
      rect(ctx, W * 0.68, H * 0.67, W * 0.03, H * 0.03, '#E6C97A', 4);
      var bucketCol = d(diffs, 'bucketColor', '#F44336', '#2196F3');
      rect(ctx, W * 0.76, H * 0.72, W * 0.06, H * 0.08, bucketCol, 4);
      rect(ctx, W * 0.74, H * 0.72, W * 0.1, H * 0.015, bucketCol);
      var shellCount = d(diffs, 'shellCount', 3, 5);
      for (var si = 0; si < shellCount; si++) circle(ctx, W * 0.42 + si * W * 0.04, H * 0.85, W * 0.012, '#FFCCBC');
      var boatVisible = d(diffs, 'boatVisible', true, false);
      if (boatVisible) {
        ctx.beginPath();
        ctx.moveTo(W * 0.4, H * 0.35);
        ctx.lineTo(W * 0.55, H * 0.35);
        ctx.lineTo(W * 0.52, H * 0.42);
        ctx.lineTo(W * 0.43, H * 0.42);
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();
        line(ctx, W * 0.47, H * 0.35, W * 0.47, H * 0.25, '#555', 1.5);
        ctx.beginPath();
        ctx.moveTo(W * 0.47, H * 0.25);
        ctx.lineTo(W * 0.55, H * 0.33);
        ctx.lineTo(W * 0.47, H * 0.33);
        ctx.closePath();
        ctx.fillStyle = '#E53935';
        ctx.fill();
      }
      rect(ctx, W * 0.85, H * 0.58, W * 0.025, H * 0.22, '#8D6E63');
      circle(ctx, W * 0.845, H * 0.57, W * 0.07, '#388E3C');
      drawMicroLayer(ctx, diffs, W, H, 'beach');
    },
    space: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      var si;
      rect(ctx, 0, 0, W, H, '#0D1B3E');
      for (si = 0; si < 60; si++) {
        var sx = r() * W,
          sy = r() * H * 0.8;
        circle(ctx, sx, sy, r() * 0.012 * W + 0.5, '#fff');
      }
      var pCol = d(diffs, 'planetColor', '#E91E63', '#FF9800');
      circle(ctx, W * 0.15, H * 0.25, W * 0.1, pCol);
      ctx.beginPath();
      ctx.ellipse(W * 0.15, H * 0.25, W * 0.16, H * 0.04, -0.3, 0, Math.PI * 2);
      ctx.strokeStyle = pCol;
      ctx.lineWidth = 4;
      ctx.stroke();
      var rocketX = d(diffs, 'rocketX', W * 0.5, W * 0.6);
      rect(ctx, rocketX - W * 0.04, H * 0.15, W * 0.08, H * 0.35, '#ECEFF1', 6);
      tri(ctx, rocketX, H * 0.15, W * 0.08, H * 0.12, '#EF5350');
      circle(ctx, rocketX, H * 0.32, W * 0.03, '#81D4FA');
      ctx.beginPath();
      ctx.moveTo(rocketX - W * 0.04, H * 0.45);
      ctx.lineTo(rocketX - W * 0.09, H * 0.52);
      ctx.lineTo(rocketX - W * 0.04, H * 0.52);
      ctx.fillStyle = '#EF5350';
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(rocketX + W * 0.04, H * 0.45);
      ctx.lineTo(rocketX + W * 0.09, H * 0.52);
      ctx.lineTo(rocketX + W * 0.04, H * 0.52);
      ctx.fillStyle = '#EF5350';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(rocketX, H * 0.54, W * 0.03, 0, Math.PI);
      ctx.fillStyle = '#FFA000';
      ctx.fill();
      circle(ctx, rocketX, H * 0.56, W * 0.018, '#FF6F00');
      var moonCol = d(diffs, 'moonColor', '#FFF9C4', '#CFD8DC');
      circle(ctx, W * 0.82, H * 0.15, W * 0.08, moonCol);
      circle(ctx, W * 0.87, H * 0.12, W * 0.07, '#0D1B3E');
      var alienVisible = d(diffs, 'alienVisible', true, false);
      if (alienVisible) {
        circle(ctx, W * 0.72, H * 0.55, W * 0.04, '#A5D6A7');
        rect(ctx, W * 0.695, H * 0.59, W * 0.05, H * 0.08, '#A5D6A7', 4);
        circle(ctx, W * 0.705, H * 0.53, W * 0.01, '#333');
        circle(ctx, W * 0.735, H * 0.53, W * 0.01, '#333');
        line(ctx, W * 0.72, H * 0.59, W * 0.68, H * 0.65, '#A5D6A7', 2);
        line(ctx, W * 0.72, H * 0.59, W * 0.76, H * 0.65, '#A5D6A7', 2);
      }
      rect(ctx, W * 0.2, H * 0.6, W * 0.12, H * 0.06, '#90A4AE', 4);
      rect(ctx, W * 0.09, H * 0.62, W * 0.07, H * 0.025, '#FFC107', 3);
      rect(ctx, W * 0.26, H * 0.62, W * 0.07, H * 0.025, '#FFC107', 3);
      var astSize = d(diffs, 'asteroidSize', W * 0.04, W * 0.07);
      circle(ctx, W * 0.55, H * 0.7, astSize, '#795548');
      drawMicroLayer(ctx, diffs, W, H, 'space');
    },
    city: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      rect(ctx, 0, 0, W, H, '#B0C4DE');
      rect(ctx, 0, H * 0.72, W, H * 0.28, '#888');
      var bldgs = [
        { x: 0, w: 0.15, h: 0.55, col: '#546E7A' },
        { x: 0.14, w: 0.12, h: 0.7, col: '#455A64' },
        { x: 0.25, w: 0.18, h: 0.45, col: '#607D8B' },
        { x: 0.42, w: 0.14, h: 0.65, col: '#37474F' },
        { x: 0.55, w: 0.2, h: 0.5, col: '#546E7A' },
        { x: 0.74, w: 0.12, h: 0.68, col: '#455A64' },
        { x: 0.85, w: 0.15, h: 0.42, col: '#607D8B' },
      ];
      bldgs.forEach(function (b, i) {
        var bc = d(diffs, 'bldg' + i + 'Color', b.col, b.col === '#546E7A' ? '#7B1FA2' : b.col);
        rect(ctx, W * b.x, H * (1 - b.h - 0.28), W * b.w, H * b.h, bc);
        var wy, wx, wxmax = Math.floor(b.w * 8),
          hym = Math.floor(b.h * 6);
        for (wy = 0; wy < hym; wy++)
          for (wx = 0; wx < wxmax; wx++) {
            var on = r() > 0.3;
            rect(ctx, W * b.x + (wx * W * b.w) / wxmax + W * 0.01, H * (1 - b.h - 0.28) + wy * H * 0.07 + H * 0.02, W * 0.02, H * 0.04, on ? '#FFF9C4' : '#263238');
          }
      });
      var ci;
      for (ci = 0; ci < 5; ci++) rect(ctx, W * 0.1 + ci * W * 0.18, H * 0.78, W * 0.08, H * 0.025, '#FFD700');
      var carCol = d(diffs, 'carColor', '#E53935', '#1E88E5');
      rect(ctx, W * 0.3, H * 0.74, W * 0.18, H * 0.06, carCol, 6);
      rect(ctx, W * 0.34, H * 0.7, W * 0.1, H * 0.05, carCol, 4);
      circle(ctx, W * 0.33, H * 0.8, W * 0.025, '#333');
      circle(ctx, W * 0.45, H * 0.8, W * 0.025, '#333');
      rect(ctx, W * 0.68, H * 0.55, W * 0.04, H * 0.2, '#555', 3);
      rect(ctx, W * 0.66, H * 0.5, W * 0.08, H * 0.22, '#222', 4);
      var tlCol = d(diffs, 'trafficLightColor', '#F44336', '#4CAF50');
      circle(ctx, W * 0.7, H * 0.55, W * 0.02, tlCol);
      circle(ctx, W * 0.7, H * 0.62, W * 0.02, '#FFC107');
      circle(ctx, W * 0.7, H * 0.68, W * 0.02, tlCol === '#F44336' ? '#555' : '#F44336');
      circle(ctx, W * 0.85, H * 0.1, W * 0.06, '#FFD700');
      drawMicroLayer(ctx, diffs, W, H, 'city');
    },
    underwater: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      var ui, fi2;
      rect(ctx, 0, 0, W, H, '#006994');
      for (ui = 0; ui < 5; ui++) {
        ctx.beginPath();
        ctx.moveTo(W * 0.1 + ui * W * 0.2, 0);
        ctx.lineTo(W * 0.05 + ui * W * 0.2, H);
        ctx.strokeStyle = 'rgba(255,255,255,.05)';
        ctx.lineWidth = W * 0.04;
        ctx.stroke();
      }
      rect(ctx, 0, H * 0.78, W, H * 0.22, '#C2A26A');
      function coral(cx, cy, col, hh) {
        var ii;
        for (ii = -2; ii <= 2; ii++) {
          rect(ctx, cx + ii * W * 0.015, cy, W * 0.01, hh, col, 3);
          circle(ctx, cx + ii * W * 0.015, cy, W * 0.01, col);
        }
      }
      var coralCol = d(diffs, 'coralColor', '#FF7043', '#E91E63');
      coral(W * 0.15, H * 0.6, coralCol, H * 0.2);
      coral(W * 0.7, H * 0.62, '#EC407A', H * 0.18);
      for (ui = 0; ui < 4; ui++) {
        var sx = W * 0.3 + ui * W * 0.1;
        ctx.beginPath();
        ctx.moveTo(sx, H * 0.78);
        ctx.bezierCurveTo(sx + W * 0.03, H * 0.65, sx - W * 0.03, H * 0.55, sx + W * 0.02, H * 0.42);
        ctx.strokeStyle = '#388E3C';
        ctx.lineWidth = W * 0.015;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      function fish(fx, fy, fc, sz) {
        circle(ctx, fx, fy, sz, fc);
        ctx.beginPath();
        ctx.moveTo(fx - sz, fy);
        ctx.lineTo(fx - sz * 1.7, fy - sz * 0.6);
        ctx.lineTo(fx - sz * 1.7, fy + sz * 0.6);
        ctx.closePath();
        ctx.fillStyle = fc;
        ctx.fill();
        circle(ctx, fx + sz * 0.3, fy - sz * 0.2, sz * 0.15, '#fff');
        circle(ctx, fx + sz * 0.35, fy - sz * 0.2, sz * 0.08, '#333');
      }
      var fishCol = d(diffs, 'fishColor', '#FF5722', '#FFC107');
      fish(W * 0.45, H * 0.3, fishCol, W * 0.04);
      fish(W * 0.6, H * 0.5, '#FF9800', W * 0.03);
      fish(W * 0.25, H * 0.45, '#CE93D8', W * 0.035);
      var bigFishVisible = d(diffs, 'bigFishVisible', true, false);
      if (bigFishVisible) fish(W * 0.75, H * 0.25, '#29B6F6', W * 0.06);
      var jCol = d(diffs, 'jellyColor', '#F48FB1', '#80CBC4');
      ctx.beginPath();
      ctx.arc(W * 0.8, H * 0.55, W * 0.05, -Math.PI, 0);
      ctx.fillStyle = jCol;
      ctx.fill();
      for (ui = 0; ui < 4; ui++) {
        ctx.beginPath();
        ctx.moveTo(W * 0.77 + ui * W * 0.02, H * 0.6);
        ctx.bezierCurveTo(W * 0.76 + ui * W * 0.02, H * 0.7, W * 0.78 + ui * W * 0.02, H * 0.68, W * 0.77 + ui * W * 0.02, H * 0.72);
        ctx.strokeStyle = jCol;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      star(ctx, W * 0.5, H * 0.82, W * 0.04, '#FF7043');
      rect(ctx, W * 0.3, H * 0.8, W * 0.1, H * 0.07, '#8D6E63', 3);
      rect(ctx, W * 0.3, H * 0.8, W * 0.1, H * 0.03, '#5D4037', 3);
      rect(ctx, W * 0.345, H * 0.815, W * 0.03, H * 0.03, '#FFC107', 2);
      var bCount = d(diffs, 'bubbleCount', 5, 8);
      for (fi2 = 0; fi2 < bCount; fi2++) {
        var bx = r() * W * 0.8 + W * 0.1,
          by = r() * H * 0.5;
        ctx.beginPath();
        ctx.arc(bx, by, r() * W * 0.015 + W * 0.005, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      drawMicroLayer(ctx, diffs, W, H, 'underwater');
    },
    farm: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      var fi3;
      rect(ctx, 0, 0, W, H * 0.55, '#87CEEB');
      rect(ctx, 0, H * 0.55, W, H * 0.45, '#5D8A3C');
      var sunFC = d(diffs, 'farmSunColor', '#FFD700', '#FFB300');
      circle(ctx, W * 0.88, H * 0.1, W * 0.07, sunFC);
      var barnW = d(diffs, 'barnWallColor', '#CC3333', '#B71C1C');
      rect(ctx, W * 0.55, H * 0.3, W * 0.35, H * 0.35, barnW, 4);
      tri(ctx, W * 0.725, H * 0.25, W * 0.38, H * 0.15, '#8B0000');
      var doorVis = d(diffs, 'barnDoorVisible', true, false);
      if (doorVis) rect(ctx, W * 0.68, H * 0.45, W * 0.1, H * 0.2, '#8B4513', 3);
      for (fi3 = 0; fi3 < 8; fi3++) {
        rect(ctx, W * 0.05 + fi3 * W * 0.06, H * 0.6, W * 0.015, H * 0.15, '#DEB887', 3);
        if (fi3 < 7) rect(ctx, W * 0.05 + fi3 * W * 0.06, H * 0.63, W * 0.06, H * 0.02, '#DEB887');
      }
      var cowCol = d(diffs, 'cowColor', '#fff', '#F5DEB3');
      rect(ctx, W * 0.12, H * 0.65, W * 0.2, H * 0.12, cowCol, 8);
      circle(ctx, W * 0.3, H * 0.62, W * 0.06, cowCol);
      circle(ctx, W * 0.18, H * 0.68, W * 0.03, '#333');
      circle(ctx, W * 0.25, H * 0.7, W * 0.025, '#333');
      for (fi3 = 0; fi3 < 4; fi3++) rect(ctx, W * 0.13 + fi3 * W * 0.04, H * 0.77, W * 0.02, H * 0.06, '#DEB887');
      var chickenVisible = d(diffs, 'chickenVisible', true, false);
      if (chickenVisible) {
        circle(ctx, W * 0.42, H * 0.73, W * 0.03, '#fff');
        rect(ctx, W * 0.41, H * 0.76, W * 0.04, H * 0.06, '#fff', 3);
        tri(ctx, W * 0.42, H * 0.72, W * 0.02, H * 0.015, '#FFA500');
        circle(ctx, W * 0.42, H * 0.72, W * 0.01, '#F44336');
      }
      rect(ctx, W * 0.03, H * 0.3, W * 0.1, H * 0.35, '#CFB88E', 4);
      ctx.beginPath();
      ctx.arc(W * 0.08, H * 0.3, W * 0.05, -Math.PI, 0);
      ctx.fillStyle = '#A0522D';
      ctx.fill();
      var hayCol = d(diffs, 'hayColor', '#DAA520', '#F4A460');
      ctx.beginPath();
      ctx.ellipse(W * 0.43, H * 0.75, W * 0.06, H * 0.045, 0, 0, Math.PI * 2);
      ctx.fillStyle = hayCol;
      ctx.fill();
      var trCol = d(diffs, 'tractorColor', '#388E3C', '#F57C00');
      rect(ctx, W * 0.6, H * 0.75, W * 0.18, H * 0.1, trCol, 6);
      circle(ctx, W * 0.65, H * 0.85, W * 0.035, '#333');
      circle(ctx, W * 0.74, H * 0.85, W * 0.04, '#333');
      rect(ctx, W * 0.7, H * 0.72, W * 0.06, H * 0.045, '#1B5E20', 3);
      rect(ctx, W * 0.84, H * 0.4, W * 0.02, H * 0.2, '#8B6914');
      [0, 90, 180, 270].forEach(function (ang) {
        ctx.save();
        ctx.translate(W * 0.85, H * 0.4);
        ctx.rotate((ang * Math.PI) / 180);
        rect(ctx, -W * 0.005, -H * 0.12, W * 0.01, H * 0.12, '#DDD', 2);
        ctx.restore();
      });
      drawMicroLayer(ctx, diffs, W, H, 'farm');
    },
    circus: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      rect(ctx, 0, 0, W, H, '#FFF8E1');
      ctx.beginPath();
      ctx.moveTo(W * 0.1, H * 0.55);
      ctx.lineTo(W * 0.5, H * 0.05);
      ctx.lineTo(W * 0.9, H * 0.55);
      ctx.closePath();
      var grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, '#E53935');
      grad.addColorStop(0.33, '#FFF');
      grad.addColorStop(0.66, '#E53935');
      grad.addColorStop(1, '#FFF');
      ctx.fillStyle = grad;
      ctx.fill();
      line(ctx, W * 0.1, H * 0.55, W * 0.1, H * 0.85, '#5D4037', 4);
      line(ctx, W * 0.9, H * 0.55, W * 0.9, H * 0.85, '#5D4037', 4);
      line(ctx, W * 0.5, H * 0.05, W * 0.5, H * 0.85, '#5D4037', 3);
      rect(ctx, W * 0.15, H * 0.6, W * 0.7, H * 0.3, '#FFF8E1');
      var ropeCol = d(diffs, 'ringRopeColor', '#FF7043', '#42A5F5');
      ctx.beginPath();
      ctx.ellipse(W * 0.5, H * 0.85, W * 0.3, H * 0.08, 0, 0, Math.PI * 2);
      ctx.strokeStyle = ropeCol;
      ctx.lineWidth = 4;
      ctx.stroke();
      circle(ctx, W * 0.5, H * 0.65, W * 0.05, '#FFCCBC');
      circle(ctx, W * 0.5, H * 0.63, W * 0.025, '#F44336');
      rect(ctx, W * 0.46, H * 0.7, W * 0.08, H * 0.1, '#4CAF50', 4);
      rect(ctx, W * 0.46, H * 0.59, W * 0.08, H * 0.05, '#1A237E');
      rect(ctx, W * 0.44, H * 0.64, W * 0.12, H * 0.015, '#1A237E');
      line(ctx, W * 0.48, H * 0.8, W * 0.42, H * 0.88, '#FFCCBC', 6);
      line(ctx, W * 0.52, H * 0.8, W * 0.58, H * 0.88, '#FFCCBC', 6);
      var shoeCol = d(diffs, 'clownShoeColor', '#FF7043', '#29B6F6');
      rect(ctx, W * 0.37, H * 0.87, W * 0.08, H * 0.025, shoeCol, 6);
      rect(ctx, W * 0.55, H * 0.87, W * 0.08, H * 0.025, shoeCol, 6);
      var balloonCols = ['#F44336', '#9C27B0', '#2196F3', '#4CAF50'];
      var bCol = d(diffs, 'balloonColor', balloonCols[0], '#FF9800');
      [bCol, '#9C27B0', '#2196F3'].forEach(function (bc, i) {
        circle(ctx, W * 0.2 + i * W * 0.25, H * 0.35, W * 0.04, bc);
        line(ctx, W * 0.2 + i * W * 0.25, H * 0.39, W * 0.22 + i * W * 0.24, H * 0.55, '#888', 1);
      });
      var bCount = d(diffs, 'jugglingBalls', 3, 4);
      var ji;
      for (ji = 0; ji < bCount; ji++) circle(ctx, W * 0.35 + ji * W * 0.07, H * 0.55, W * 0.02, ['#FF5722', '#FFC107', '#29B6F6', '#EC407A'][ji]);
      var lionVis = d(diffs, 'lionVisible', true, false);
      if (lionVis) {
        circle(ctx, W * 0.8, H * 0.72, W * 0.05, '#FFA000');
        ctx.beginPath();
        ctx.arc(W * 0.8, H * 0.72, W * 0.07, 0, Math.PI * 2);
        ctx.strokeStyle = '#FF6F00';
        ctx.lineWidth = 6;
        ctx.stroke();
        rect(ctx, W * 0.76, H * 0.77, W * 0.08, H * 0.1, '#FFA000', 4);
        circle(ctx, W * 0.78, H * 0.7, W * 0.008, '#333');
        circle(ctx, W * 0.82, H * 0.7, W * 0.008, '#333');
      }
      drawMicroLayer(ctx, diffs, W, H, 'circus');
    },
    desert: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      var di;
      rect(ctx, 0, 0, W, H * 0.55, '#FFF8DC');
      rect(ctx, 0, H * 0.55, W, H * 0.45, '#D4A017');
      var sunCol = d(diffs, 'sunColor', '#FFD700', '#FF8C00');
      circle(ctx, W * 0.5, H * 0.12, W * 0.09, sunCol);
      for (di = 0; di < 8; di++) {
        var a = (di * Math.PI) / 4;
        line(ctx, W * 0.5 + Math.cos(a) * W * 0.1, H * 0.12 + Math.sin(a) * H * 0.09 * (W / H), W * 0.5 + Math.cos(a) * W * 0.14, H * 0.12 + Math.sin(a) * H * 0.13 * (W / H), sunCol, 2);
      }
      for (di = 0; di < 3; di++) {
        ctx.beginPath();
        ctx.arc(W * (0.2 + di * 0.3), H * 0.75, W * 0.2, Math.PI, 0);
        ctx.fillStyle = '#C8910A';
        ctx.fill();
      }
      function cactus(cx, cy, hh, cc) {
        rect(ctx, cx - W * 0.02, cy, W * 0.04, hh, cc, 4);
        rect(ctx, cx + W * 0.02, cy + hh * 0.2, W * 0.06, H * 0.04, cc, 4);
        rect(ctx, cx - W * 0.08, cy + hh * 0.35, W * 0.06, H * 0.04, cc, 4);
      }
      var cactusCol = d(diffs, 'cactusColor', '#388E3C', '#1B5E20');
      cactus(W * 0.15, H * 0.35, H * 0.25, cactusCol);
      cactus(W * 0.75, H * 0.38, H * 0.22, cactusCol);
      var pyrCol = d(diffs, 'pyramidColor', '#C8A951', '#A0785A');
      ctx.beginPath();
      ctx.moveTo(W * 0.38, H * 0.55);
      ctx.lineTo(W * 0.5, H * 0.3);
      ctx.lineTo(W * 0.62, H * 0.55);
      ctx.closePath();
      ctx.fillStyle = pyrCol;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(W * 0.3, H * 0.55);
      ctx.lineTo(W * 0.44, H * 0.25);
      ctx.lineTo(W * 0.58, H * 0.55);
      ctx.closePath();
      ctx.fillStyle = pyrCol;
      ctx.fill();
      rect(ctx, W * 0.55, H * 0.62, W * 0.18, H * 0.1, '#C8A96A', 8);
      circle(ctx, W * 0.7, H * 0.59, W * 0.05, '#C8A96A');
      ctx.beginPath();
      ctx.arc(W * 0.62, H * 0.62, W * 0.04, -Math.PI, 0);
      ctx.fillStyle = '#C8A96A';
      ctx.fill();
      var blanket = d(diffs, 'camelBlanketColor', '#B71C1C', '#3949AB');
      rect(ctx, W * 0.56, H * 0.61, W * 0.12, H * 0.045, blanket, 4);
      for (di = 0; di < 4; di++) rect(ctx, W * 0.56 + di * W * 0.04, H * 0.72, W * 0.015, H * 0.07, '#B8956A');
      var snakeVisible = d(diffs, 'snakeVisible', true, false);
      if (snakeVisible) {
        ctx.beginPath();
        ctx.moveTo(W * 0.25, H * 0.75);
        ctx.bezierCurveTo(W * 0.3, H * 0.7, W * 0.35, H * 0.78, W * 0.4, H * 0.73);
        ctx.strokeStyle = '#8D6E63';
        ctx.lineWidth = W * 0.015;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(W * 0.25, H * 0.75);
        ctx.lineTo(W * 0.22, H * 0.72);
        ctx.lineTo(W * 0.22, H * 0.74);
        ctx.strokeStyle = '#EF5350';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      var mirageBird = d(diffs, 'mirageBirdVisible', true, false);
      if (mirageBird) {
        circle(ctx, W * 0.85, H * 0.2, W * 0.025, '#555');
        ctx.beginPath();
        ctx.moveTo(W * 0.82, H * 0.22);
        ctx.lineTo(W * 0.78, H * 0.25);
        ctx.moveTo(W * 0.88, H * 0.22);
        ctx.lineTo(W * 0.92, H * 0.25);
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      drawMicroLayer(ctx, diffs, W, H, 'desert');
    },
    forest: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      rect(ctx, 0, 0, W, H * 0.7, '#B2EBF2');
      rect(ctx, 0, H * 0.7, W, H * 0.3, '#3E2723');
      function fTree(cx, h, tc, tc2) {
        rect(ctx, cx - W * 0.025, H * 0.45, W * 0.05, h * 0.55, '#5D4037');
        circle(ctx, cx, H * 0.45, h * 0.35, tc);
        circle(ctx, cx - h * 0.15, H * 0.4, h * 0.25, tc2);
        circle(ctx, cx + h * 0.1, H * 0.38, h * 0.28, tc2);
      }
      var tCol = d(diffs, 'treeColor', '#2E7D32', '#1B5E20');
      fTree(W * 0.1, H * 0.5, '#388E3C', tCol);
      fTree(W * 0.35, H * 0.55, tCol, '#2E7D32');
      fTree(W * 0.65, H * 0.5, '#388E3C', tCol);
      fTree(W * 0.88, H * 0.52, tCol, '#388E3C');
      function mush(mx, my, mc) {
        rect(ctx, mx - W * 0.01, my, W * 0.02, H * 0.06, '#ECEFF1', 3);
        ctx.beginPath();
        ctx.arc(mx, my, W * 0.035, -Math.PI, 0);
        ctx.fillStyle = mc;
        ctx.fill();
        [0, 1, 2].forEach(function (i) {
          circle(ctx, mx - W * 0.02 + i * W * 0.02, my - W * 0.01, W * 0.006, '#fff');
        });
      }
      var mushCol = d(diffs, 'mushColor', '#F44336', '#FF9800');
      mush(W * 0.22, H * 0.73, mushCol);
      mush(W * 0.5, H * 0.75, '#F44336');
      mush(W * 0.76, H * 0.72, mushCol);
      rect(ctx, W * 0.47, H * 0.65, W * 0.08, H * 0.1, '#8D6E63', 6);
      circle(ctx, W * 0.5, H * 0.62, W * 0.04, '#8D6E63');
      line(ctx, W * 0.49, H * 0.6, W * 0.46, H * 0.55, '#5D4037', 2);
      line(ctx, W * 0.46, H * 0.55, W * 0.44, H * 0.53, '#5D4037', 2);
      line(ctx, W * 0.46, H * 0.55, W * 0.47, H * 0.52, '#5D4037', 2);
      line(ctx, W * 0.51, H * 0.6, W * 0.54, H * 0.55, '#5D4037', 2);
      line(ctx, W * 0.54, H * 0.55, W * 0.56, H * 0.52, '#5D4037', 2);
      var bowVis = d(diffs, 'deerBowVisible', true, false);
      if (bowVis) circle(ctx, W * 0.52, H * 0.63, W * 0.015, '#F44336');
      var qi;
      for (qi = 0; qi < 4; qi++) rect(ctx, W * 0.47 + qi * W * 0.02, H * 0.75, W * 0.013, H * 0.08, '#8D6E63');
      var owlVisible = d(diffs, 'owlVisible', true, false);
      if (owlVisible) {
        circle(ctx, W * 0.78, H * 0.45, W * 0.03, '#795548');
        circle(ctx, W * 0.78, H * 0.48, W * 0.025, '#795548');
        circle(ctx, W * 0.775, H * 0.44, W * 0.01, '#FFF9C4');
        circle(ctx, W * 0.785, H * 0.44, W * 0.01, '#FFF9C4');
        circle(ctx, W * 0.775, H * 0.44, W * 0.005, '#333');
        circle(ctx, W * 0.785, H * 0.44, W * 0.005, '#333');
      }
      ctx.beginPath();
      ctx.moveTo(0, H * 0.85);
      ctx.bezierCurveTo(W * 0.2, H * 0.8, W * 0.4, H * 0.9, W * 0.6, H * 0.82);
      ctx.bezierCurveTo(W * 0.8, H * 0.75, W * 0.9, H * 0.88, W, H * 0.83);
      ctx.strokeStyle = '#29B6F6';
      ctx.lineWidth = H * 0.06;
      ctx.stroke();
      var bflyCol = d(diffs, 'butterflyColor', '#FF5722', '#9C27B0');
      circle(ctx, W * 0.3, H * 0.4, W * 0.025, bflyCol);
      circle(ctx, W * 0.28, H * 0.38, W * 0.02, bflyCol);
      circle(ctx, W * 0.32, H * 0.38, W * 0.02, bflyCol);
      drawMicroLayer(ctx, diffs, W, H, 'forest');
    },
    birthday: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      var bi;
      rect(ctx, 0, 0, W, H, '#FFF0F5');
      var bannerCols = ['#F44336', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0'];
      for (bi = 0; bi < 6; bi++) {
        tri(ctx, W * (0.1 + bi * 0.14), H * 0.12, W * 0.1, H * 0.1, bannerCols[bi]);
        line(ctx, W * 0.08 + bi * W * 0.14, H * 0.07, W * 0.16 + bi * W * 0.14, H * 0.07, '#888', 1);
      }
      var tableCol = d(diffs, 'partyTableColor', '#8D6E63', '#6D4C41');
      rect(ctx, W * 0.1, H * 0.65, W * 0.8, H * 0.05, tableCol, 4);
      rect(ctx, W * 0.15, H * 0.7, W * 0.06, H * 0.15, '#8D6E63', 3);
      rect(ctx, W * 0.79, H * 0.7, W * 0.06, H * 0.15, '#8D6E63', 3);
      rect(ctx, W * 0.35, H * 0.55, W * 0.3, H * 0.12, '#F8BBD0', 6);
      rect(ctx, W * 0.32, H * 0.46, W * 0.36, H * 0.1, '#CE93D8', 6);
      rect(ctx, W * 0.35, H * 0.39, W * 0.3, H * 0.08, '#81D4FA', 6);
      [0.37, 0.43, 0.49, 0.55, 0.61].forEach(function (fx) {
        ctx.beginPath();
        ctx.arc(W * fx, H * 0.39, W * 0.025, Math.PI, 0);
        ctx.fillStyle = '#fff';
        ctx.fill();
      });
      var candleCount = d(diffs, 'candleCount', 3, 5);
      var candleCols = ['#F44336', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3'];
      for (bi = 0; bi < candleCount; bi++) {
        var cx = W * 0.4 + bi * W * 0.045;
        rect(ctx, cx, H * 0.3, W * 0.015, H * 0.1, candleCols[bi % 5], 3);
        circle(ctx, cx + W * 0.0075, H * 0.3, W * 0.01, '#FFA000');
      }
      var giftCol = d(diffs, 'giftColor', '#E53935', '#8E24AA');
      rect(ctx, W * 0.12, H * 0.5, W * 0.14, H * 0.16, giftCol, 4);
      rect(ctx, W * 0.12, H * 0.49, W * 0.14, H * 0.02, giftCol);
      line(ctx, W * 0.19, H * 0.49, W * 0.19, H * 0.66, '#FFD700', 2);
      var giftR = d(diffs, 'giftRightColor', '#1E88E5', '#00897B');
      rect(ctx, W * 0.74, H * 0.52, W * 0.13, H * 0.14, giftR, 4);
      rect(ctx, W * 0.74, H * 0.51, W * 0.13, H * 0.02, giftR);
      line(ctx, W * 0.805, H * 0.51, W * 0.805, H * 0.66, '#FFF', 2);
      var bColors = ['#F44336', '#FF9800', '#9C27B0'];
      bColors.forEach(function (bc, i) {
        var bx = W * (0.15 + i * 0.3),
          by = H * 0.28;
        circle(ctx, bx, by, W * 0.04, bc);
        line(ctx, bx, by + W * 0.04, bx + W * 0.02 * (i % 2 ? 1 : -1), H * 0.5, '#888', 1);
      });
      var extraBalloon = d(diffs, 'extraBalloon', false, true);
      if (extraBalloon) {
        circle(ctx, W * 0.85, H * 0.25, W * 0.04, '#4CAF50');
        line(ctx, W * 0.85, H * 0.29, W * 0.83, H * 0.5, '#888', 1);
      }
      var cColors = ['#F44336', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3'];
      for (bi = 0; bi < 20; bi++) rect(ctx, r() * W, r() * H * 0.6, W * 0.015, H * 0.02, cColors[Math.floor(r() * 5)], 2);
      drawMicroLayer(ctx, diffs, W, H, 'birthday');
    },
    sports: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      var gi;
      rect(ctx, 0, 0, W, H, '#81C784');
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(W * 0.05, H * 0.1, W * 0.9, H * 0.8);
      line(ctx, W * 0.5, H * 0.1, W * 0.5, H * 0.9, '#fff', 2);
      ctx.beginPath();
      ctx.arc(W * 0.5, H * 0.5, W * 0.12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeRect(W * 0.05, H * 0.3, W * 0.15, H * 0.4);
      ctx.strokeRect(W * 0.8, H * 0.3, W * 0.15, H * 0.4);
      rect(ctx, W * 0.02, H * 0.37, W * 0.03, H * 0.26, '#ccc', 3);
      rect(ctx, W * 0.95, H * 0.37, W * 0.03, H * 0.26, '#ccc', 3);
      var netVis = d(diffs, 'goalNetVisible', true, false);
      if (netVis)
        for (gi = 0; gi < 5; gi++) {
          line(ctx, W * 0.02, H * 0.37 + gi * H * 0.055, W * 0.05, H * 0.37 + gi * H * 0.055, '#eee', 1);
          line(ctx, W * 0.95, H * 0.37 + gi * H * 0.055, W * 0.98, H * 0.37 + gi * H * 0.055, '#eee', 1);
        }
      var ballX = d(diffs, 'ballX', W * 0.5, W * 0.6);
      circle(ctx, ballX, H * 0.5, W * 0.03, '#fff');
      ctx.beginPath();
      ctx.arc(ballX, H * 0.5, W * 0.03, 0, Math.PI * 2);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.stroke();
      var teamCols = ['#E53935', '#1E88E5'];
      [[0.2, 0.4], [0.2, 0.6], [0.35, 0.3], [0.35, 0.7]].forEach(function (p, i) {
        var tc = teamCols[i % 2];
        circle(ctx, W * p[0], H * p[1], W * 0.03, '#FFCCBC');
        rect(ctx, W * p[0] - W * 0.025, H * p[1] + H * 0.03, W * 0.05, H * 0.09, tc, 4);
      });
      [[0.65, 0.35], [0.65, 0.65], [0.75, 0.45], [0.75, 0.55]].forEach(function (p, i) {
        var tc = teamCols[(i + 1) % 2];
        circle(ctx, W * p[0], H * p[1], W * 0.03, '#FFCCBC');
        rect(ctx, W * p[0] - W * 0.025, H * p[1] + H * 0.03, W * 0.05, H * 0.09, tc, 4);
      });
      var refCol = d(diffs, 'refColor', '#000', '#FF9800');
      circle(ctx, W * 0.5, H * 0.3, W * 0.03, '#FFCCBC');
      rect(ctx, W * 0.475, H * 0.33, W * 0.05, H * 0.09, refCol, 4);
      rect(ctx, W * 0.35, H * 0.02, W * 0.3, H * 0.07, '#333', 6);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold ' + Math.round(W * 0.03) + 'px monospace';
      ctx.textAlign = 'center';
      var sA = d(diffs, 'scoreA', 2, 3),
        sB = 1;
      ctx.fillText(sA + ' - ' + sB, W * 0.5, H * 0.075);
      var flagCol = d(diffs, 'cornerFlagColor', '#F44336', '#FFD700');
      line(ctx, W * 0.05, H * 0.1, W * 0.05, H * 0.05, '#555', 2);
      rect(ctx, W * 0.05, H * 0.05, W * 0.05, H * 0.03, flagCol, 2);
      drawMicroLayer(ctx, diffs, W, H, 'sports');
    },
    toyroom: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      var ti;
      rect(ctx, 0, 0, W, H, '#FFF9C4');
      rect(ctx, 0, H * 0.8, W, H * 0.2, '#BCAAA4');
      rect(ctx, 0, 0, W * 0.015, H, '#F9A825');
      rect(ctx, W * 0.985, 0, W * 0.015, H, '#F9A825');
      rect(ctx, W * 0.05, H * 0.2, W * 0.4, H * 0.02, '#8D6E63', 3);
      rect(ctx, W * 0.55, H * 0.25, W * 0.4, H * 0.02, '#8D6E63', 3);
      rect(ctx, W * 0.05, H * 0.45, W * 0.9, H * 0.02, '#8D6E63', 3);
      var teddyCol = d(diffs, 'teddyColor', '#D7CCC8', '#FFCC80');
      circle(ctx, W * 0.12, H * 0.17, W * 0.04, teddyCol);
      rect(ctx, W * 0.09, H * 0.21, W * 0.06, H * 0.06, teddyCol, 4);
      circle(ctx, W * 0.09, H * 0.16, W * 0.02, teddyCol);
      circle(ctx, W * 0.15, H * 0.16, W * 0.02, teddyCol);
      rect(ctx, W * 0.22, H * 0.12, W * 0.06, H * 0.07, '#90A4AE', 4);
      rect(ctx, W * 0.2, H * 0.19, W * 0.1, H * 0.06, '#78909C', 4);
      var eyeGlow = d(diffs, 'robotEyeGlow', '#FFD700', '#76FF03');
      circle(ctx, W * 0.24, H * 0.15, W * 0.01, eyeGlow);
      circle(ctx, W * 0.28, H * 0.15, W * 0.01, eyeGlow);
      var toyCar = d(diffs, 'toyCarColor', '#F44336', '#4CAF50');
      rect(ctx, W * 0.6, H * 0.2, W * 0.12, H * 0.04, toyCar, 4);
      rect(ctx, W * 0.63, H * 0.17, W * 0.06, H * 0.03, toyCar, 3);
      circle(ctx, W * 0.63, H * 0.24, W * 0.015, '#333');
      circle(ctx, W * 0.69, H * 0.24, W * 0.015, '#333');
      var blockCols = ['#F44336', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3'];
      var blockCount = d(diffs, 'blockCount', 4, 5);
      for (ti = 0; ti < blockCount; ti++) {
        rect(ctx, W * 0.08 + ti * W * 0.06, H * 0.73, W * 0.05, H * 0.05, blockCols[ti % 5], 3);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold ' + Math.round(W * 0.025) + 'px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('ABCDE'[ti], W * 0.105 + ti * W * 0.06, H * 0.77);
      }
      circle(ctx, W * 0.75, H * 0.72, W * 0.035, '#FFCCBC');
      rect(ctx, W * 0.72, H * 0.755, W * 0.06, H * 0.1, '#E91E63', 4);
      rect(ctx, W * 0.3, H * 0.77, W * 0.2, H * 0.06, '#E53935', 6);
      rect(ctx, W * 0.35, H * 0.73, W * 0.07, H * 0.04, '#E53935', 4);
      for (ti = 0; ti < 3; ti++) circle(ctx, W * 0.32 + ti * W * 0.07, H * 0.83, W * 0.02, '#333');
      rect(ctx, W * 0.3, H * 0.77, W * 0.025, H * 0.06, '#FF6F00');
      var winSky = d(diffs, 'toyWindowSky', '#AEE4F5', '#B3E5FC');
      rect(ctx, W * 0.7, H * 0.05, W * 0.2, H * 0.15, winSky, 4);
      line(ctx, W * 0.8, H * 0.05, W * 0.8, H * 0.2, '#aaa', 1.5);
      line(ctx, W * 0.7, H * 0.125, W * 0.9, H * 0.125, '#aaa', 1.5);
      drawMicroLayer(ctx, diffs, W, H, 'toyroom');
    },
    jungle: function (ctx, r, diffs) {
      var W = window.__ARAS_WH.W,
        H = window.__ARAS_WH.H;
      var ji, jj, lx, ly;
      rect(ctx, 0, 0, W, H, '#1B5E20');
      for (ji = 0; ji < 12; ji++) {
        lx = r() * W;
        ly = r() * H * 0.8;
        circle(ctx, lx, ly, r() * W * 0.06 + W * 0.04, '#2E7D32');
      }
      rect(ctx, W * 0.25, H * 0.05, W * 0.5, H * 0.2, '#B2EBF2');
      rect(ctx, 0, H * 0.75, W, H * 0.25, '#4E342E');
      for (ji = 0; ji < 6; ji++) {
        lx = r() * W;
        ly = H * 0.3 + r() * H * 0.4;
        ctx.beginPath();
        ctx.ellipse(lx, ly, W * 0.06 + r() * W * 0.04, H * 0.04 + r() * H * 0.02, r() * Math.PI, 0, Math.PI * 2);
        ctx.fillStyle = '#388E3C';
        ctx.fill();
        line(ctx, lx - W * 0.06, ly, lx + W * 0.06, ly, '#2E7D32', 1);
      }
      circle(ctx, W * 0.3, H * 0.35, W * 0.05, '#8D6E63');
      circle(ctx, W * 0.3, H * 0.4, W * 0.04, '#8D6E63');
      circle(ctx, W * 0.285, H * 0.34, W * 0.015, '#BCAAA4');
      circle(ctx, W * 0.315, H * 0.34, W * 0.015, '#BCAAA4');
      circle(ctx, W * 0.3, H * 0.37, W * 0.012, '#BCAAA4');
      var bananaVis = d(diffs, 'monkeyBananaVisible', true, false);
      if (bananaVis) circle(ctx, W * 0.34, H * 0.41, W * 0.018, '#FFEB3B');
      ctx.beginPath();
      ctx.moveTo(W * 0.3, H * 0.44);
      ctx.bezierCurveTo(W * 0.35, H * 0.5, W * 0.38, H * 0.4, W * 0.42, H * 0.38);
      ctx.strokeStyle = '#8D6E63';
      ctx.lineWidth = W * 0.015;
      ctx.lineCap = 'round';
      ctx.stroke();
      var parrotCol = d(diffs, 'parrotColor', '#F44336', '#4CAF50');
      circle(ctx, W * 0.75, H * 0.28, W * 0.035, parrotCol);
      rect(ctx, W * 0.72, H * 0.315, W * 0.06, H * 0.07, parrotCol, 4);
      circle(ctx, W * 0.75, H * 0.265, W * 0.015, '#FFD700');
      var vineAccent = d(diffs, 'vineAccentColor', '#388E3C', '#1B5E20');
      for (ji = 0; ji < 3; ji++) {
        ctx.beginPath();
        ctx.moveTo(W * (0.2 + ji * 0.25), 0);
        ctx.bezierCurveTo(W * (0.25 + ji * 0.25), H * 0.3, W * (0.15 + ji * 0.25), H * 0.6, W * (0.2 + ji * 0.25), H * 0.75);
        ctx.strokeStyle = vineAccent;
        ctx.lineWidth = W * 0.015;
        ctx.stroke();
        for (jj = 0; jj < 3; jj++) {
          var vy = H * 0.15 + jj * H * 0.2;
          ctx.beginPath();
          ctx.ellipse(W * (0.2 + ji * 0.25) + W * 0.04, vy, W * 0.04, H * 0.02, -0.3, 0, Math.PI * 2);
          ctx.fillStyle = '#4CAF50';
          ctx.fill();
        }
      }
      ctx.beginPath();
      ctx.moveTo(0, H * 0.85);
      ctx.bezierCurveTo(W * 0.3, H * 0.78, W * 0.6, H * 0.92, W, H * 0.8);
      ctx.strokeStyle = '#0288D1';
      ctx.lineWidth = H * 0.08;
      ctx.stroke();
      var flowerCol = d(diffs, 'flowerColor', '#FF5722', '#FF9800');
      circle(ctx, W * 0.55, H * 0.6, W * 0.025, '#FFEB3B');
      for (ji = 0; ji < 6; ji++) {
        var fa = (ji * Math.PI) / 3;
        circle(ctx, W * 0.55 + Math.cos(fa) * W * 0.03, H * 0.6 + Math.sin(fa) * H * 0.03, W * 0.018, flowerCol);
      }
      var snakeCol = d(diffs, 'snakeColor', '#8BC34A', '#CDDC39');
      ctx.beginPath();
      ctx.moveTo(W * 0.08, H * 0.6);
      ctx.bezierCurveTo(W * 0.15, H * 0.55, W * 0.18, H * 0.65, W * 0.25, H * 0.6);
      ctx.strokeStyle = snakeCol;
      ctx.lineWidth = W * 0.015;
      ctx.lineCap = 'round';
      ctx.stroke();
      drawMicroLayer(ctx, diffs, W, H, 'jungle');
    },
  };
