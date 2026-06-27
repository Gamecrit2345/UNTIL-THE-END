const player = new Player(50, 50);
const camera = new Camera();

let scene = "school";
let endingTriggered = false;

// TRUCK EVENT OBJECT
const truckEvent = {
  x: 200,
  y: 90,
  active: false,
  triggered: false
};

function triggerSadEnding() {
  if (endingTriggered) return;

  endingTriggered = true;

  setRain(true);
  triggerShake(15);

  startDialogue([
    "Milca: Matt... hintayin mo ako!",
    "Matt: MILCA!!",
    "System: Isang malakas na busina ang narinig..."
  ]);

  setTimeout(() => {
    startDialogue([
      "....",
      "Walang gumalaw.",
      "Ang lahat ay natahimik."
    ]);
  }, 4000);
}

// CHECK TRUCK COLLISION
function checkTruck() {
  if (route !== "bad") return;

  const dx = player.x - truckEvent.x;
  const dy = player.y - truckEvent.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 15 && !truckEvent.triggered) {
    truckEvent.triggered = true;
    triggerSadEnding();
  }
}

// SCHOOL UPDATE
function update() {
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
  checkTruck();

  updateDialogue();
  updateEffects();
}

// DRAW MAP
function drawMap() {
  let map = schoolMap;

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      ctx.fillStyle =
        (x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1)
          ? "#444"
          : "#2b2b2b";

      ctx.fillRect(
        x * map.tileSize - camera.x,
        y * map.tileSize - camera.y,
        map.tileSize,
        map.tileSize
      );
    }
  }
}

// DRAW WORLD
function draw() {
  ctx.save();
  clearScreen();

  applyShake(ctx);

  drawMap();

  // truck (hidden until bad route)
  if (route === "bad") {
    ctx.fillStyle = "red";
    ctx.fillRect(truckEvent.x - camera.x, truckEvent.y - camera.y, 16, 10);
  }

  // Milca
  ctx.fillStyle = "pink";
  ctx.fillRect(120 - camera.x, 80 - camera.y, 8, 8);

  // player
  ctx.fillStyle = "yellow";
  ctx.fillRect(player.x - camera.x, player.y - camera.y, 8, 8);

  drawDialogue();
  drawRain(ctx);

  ctx.restore();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
