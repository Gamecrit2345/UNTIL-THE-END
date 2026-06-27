const player = new Player(50, 50);
const camera = new Camera();

function update() {
  player.update();
  camera.follow(player);
}

function draw() {
  clearScreen();

  // ground
  ctx.fillStyle = "#2d2d2d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx, camera);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
