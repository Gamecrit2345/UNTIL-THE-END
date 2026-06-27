const player = new Player(50, 50);
const camera = new Camera();

const map = {
  tileSize: 16,
  width: 20,
  height: 12,
  tiles: []
};

// build simple classroom (0 = floor, 1 = wall)
for (let y = 0; y < map.height; y++) {
  for (let x = 0; x < map.width; x++) {
    if (x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1) {
      map.tiles.push(1);
    } else {
      map.tiles.push(0);
    }
  }
}

// Milca NPC
const milca = {
  x: 120,
  y: 80,
  size: 8,
  met: false
};

function tileAt(x, y) {
  const tx = Math.floor(x / map.tileSize);
  const ty = Math.floor(y / map.tileSize);

  if (tx < 0 || ty < 0 || tx >= map.width || ty >= map.height) return 1;

  return map.tiles[ty * map.width + tx];
}

function update() {
  let nextX = player.x;
  let nextY = player.y;

  if (keys["w"]) nextY -= player.speed;
  if (keys["s"]) nextY += player.speed;
  if (keys["a"]) nextX -= player.speed;
  if (keys["d"]) nextX += player.speed;

  // collision
  if (tileAt(nextX, player.y) === 0) player.x = nextX;
  if (tileAt(player.x, nextY) === 0) player.y = nextY;

  camera.follow(player);

  // interaction with Milca
  const dx = player.x - milca.x;
  const dy = player.y - milca.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 12 && !milca.met) {
    milca.met = true;
    startDialogue([
      "???: Uy... bago ka dito noh?",
      "Matt: Ah... oo. Kakatransfer ko lang.",
      "???: Ako si Milca."
    ]);
  }

  updateDialogue();
}

function drawMap() {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const tile = map.tiles[y * map.width + x];

      if (tile === 1) {
        ctx.fillStyle = "#444";
      } else {
        ctx.fillStyle = "#2a2a2a";
      }

      ctx.fillRect(
        x * map.tileSize - camera.x,
        y * map.tileSize - camera.y,
        map.tileSize,
        map.tileSize
      );
    }
  }
}

function draw() {
  clearScreen();

  drawMap();

  // draw Milca
  ctx.fillStyle = "pink";
  ctx.fillRect(
    milca.x - camera.x,
    milca.y - camera.y,
    milca.size,
    milca.size
  );

  player.draw(ctx, camera);

  drawDialogue();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
