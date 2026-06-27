let time = 0; // 0 = day, 1 = sunset

function setSunset(v) {
  time = v;
}

function drawLighting(ctx) {
  if (time === 0) return;

  ctx.fillStyle = `rgba(255, 140, 0, ${time * 0.25})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
