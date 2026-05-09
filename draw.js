(function () {
  'use strict';
  function rect(ctx, x, y, w, h, col, r) {
    ctx.beginPath();
    if (r) ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
    ctx.fillStyle = col;
    ctx.fill();
  }
  function circle(ctx, x, y, rad, col) {
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();
  }
  function line(ctx, x1, y1, x2, y2, col, w) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = col;
    ctx.lineWidth = w || 2;
    ctx.stroke();
  }
  function text(ctx, t, x, y, col, sz, align) {
    ctx.font = `${sz || 14}px Segoe UI`;
    ctx.fillStyle = col || '#333';
    ctx.textAlign = align || 'center';
    ctx.fillText(t, x, y);
  }
  function tri(ctx, x, y, w, h, col) {
    ctx.beginPath();
    ctx.moveTo(x, y - h / 2);
    ctx.lineTo(x - w / 2, y + h / 2);
    ctx.lineTo(x + w / 2, y + h / 2);
    ctx.closePath();
    ctx.fillStyle = col;
    ctx.fill();
  }
  function cloud(ctx, x, y, s, col) {
    ctx.fillStyle = col;
    [0, s * 0.6, s * 1.2].forEach(function (dx, i) {
      circle(ctx, x + dx, y, [s * 0.55, s * 0.7, s * 0.55][i], col);
    });
  }
  function star(ctx, cx, cy, r, col) {
    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
      var a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      var b = a + Math.PI / 5;
      ctx.lineTo(cx + Math.cos(b) * r * 0.4, cy + Math.sin(b) * r * 0.4);
    }
    ctx.closePath();
    ctx.fillStyle = col;
    ctx.fill();
  }
  window.GameDraw = { rect: rect, circle: circle, line: line, text: text, tri: tri, cloud: cloud, star: star };
})();
