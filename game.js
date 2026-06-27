const player = new Player(50, 50);
const camera = new Camera();

let scene = "school";
let gameEnded = false;

function update() {
  if (gameEnded) return;

  if (SceneManager.current === "school") schoolUpdate();

  updateDialogue();
  updateEffects();
}

// SCHOOL (simplified final version)
function schoolUpdate() {
  let map = schoolMap;

  let nextX = player.x;
  let nextY = player.y;

  if (keys["w"]) nextY -= player.speed;
  if (keys["s"]) nextY += player.speed;
  if (keys["a"]) nextX -= player.speed;
  if (keys["d"]) nextX += player.speed;

  if (tileAt(map, nextX, player.y) === 0) player.x = nextX;
  if (tileAt(map, player.x, nextY) === 0) player.y = nextY;

  camera.follow(player);

  checkMilca();
  checkJollibee();

  // HAPPY END TRIGGER
  if (Relationship.affection >= 10 && !gameEnded) {
    gameEnded = true;
    triggerHappyEnding();
  }
}

// DRAW
function drawSchool() {
  drawMap();

  ctx.fillStyle = "pink";
  ctx.fillRect(120 - camera.x, 80 - camera.y, 8, 8);

  ctx.fillStyle = "yellow";
  ctx.fillRect(player.x - camera.x, player.y - camera.y, 8, 8);
}

function drawBeach() {
  ctx.fillStyle = "#87ceeb";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f4d03f";
  ctx.fillRect(0, 120, canvas.width, 60);

  ctx.fillStyle = "orange";
  ctx.fillText("🌅 Sunset Wedding Scene", 90, 60);

  ctx.fillStyle = "white";
  ctx.fillText("Matt ♥ Milca", 120, 100);
}

function draw() {
  clearScreen();

  if (SceneManager.current === "school") drawSchool();
  if (SceneManager.current === "beach") drawBeach();

  drawDialogue();
  drawLighting(ctx);
  drawRain(ctx);
}

// LOOP
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
