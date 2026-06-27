let shake = 0;
let rain = false;

function triggerShake(power = 10) {
  shake = power;
}

function updateEffects() {
  if (shake > 0) shake -= 0.5;
}

function applyShake(ctx) {
  if (shake <= 0) return;

  const x = (Math.random() - 0.5) * shake;
  const y = (Math.random() - 0.5) * shake;

  ctx.translate(x, y);
}

function setRain(v) {
  rain = v;
}

function drawRain(ctx) {
  if (!rain) return;

  ctx.strokeStyle = "rgba(200,200,255,0.4)";
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 320, Math.random() * 180);
    ctx.lineTo(Math.random() * 320, Math.random() * 180 + 10);
    ctx.stroke();
  }
}
