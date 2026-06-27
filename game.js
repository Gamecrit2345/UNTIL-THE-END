const player = new Player(50, 50);
const camera = new Camera();

Save.load();

let scene = Save.data.scene;

// HOUSE MAP
const houseMap = {
  tileSize: 16,
  width: 16,
  height: 10,
  tiles: []
};

for (let y = 0; y < houseMap.height; y++) {
  for (let x = 0; x < houseMap.width; x++) {
    if (x === 0 || y === 0 || x === houseMap.width - 1 || y === houseMap.height - 1) {
      houseMap.tiles.push(1);
    } else {
      houseMap.tiles.push(0);
    }
  }
}

function tileAt(map, x, y) {
  const tx = Math.floor(x / map.tileSize);
  const ty = Math.floor(y / map.tileSize);

  if (tx < 0 || ty < 0 || tx >= map.width || ty >= map.height) return 1;

  return map.tiles[ty * map.width + tx];
}

// PHONE SYSTEM
let phoneOpen = false;
let messages = [
  { from: "Milca", text: "Uy Matt, gising ka pa?" },
  { from: "Matt", text: "Oo, bakit?" },
  { from: "Milca", text: "Wala lang... gusto ko lang mag-good night." }
];

function update() {
  let map = houseMap;

  let nextX = player.x;
  let nextY = player.y;

  if (keys["w"]) nextY -= player.speed;
  if (keys["s"]) nextY += player.speed;
  if (keys["a"]) nextX -= player.speed;
  if (keys["d"]) nextX -= player.speed;

  if (tileAt(map, nextX, player.y) === 0) player.x = nextX;
  if (tileAt(map, player.x, nextY) === 0) player.y = nextY;

  camera.follow(player);

  // open phone
  if (keys["p"]) {
    phoneOpen = !phoneOpen;
    keys["p"] = false;
  }

  Save.save();
}

function drawMap() {
  let map = houseMap;

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      let tile = map.tiles[y * map.width + x];

      ctx.fillStyle = tile === 1 ? "#3a2f2f" : "#1f1f1f";

      ctx.fillRect(
        x * map.tileSize - camera.x,
        y * map.tileSize - camera.y,
        map.tileSize,
        map.tileSize
      );
    }
  }
}

function drawPhone() {
  if (!phoneOpen) return;

  ctx.fillStyle = "rgba(0,0,0,0.85)";
  ctx.fillRect(40, 20, 240, 140);

  ctx.fillStyle = "white";
  ctx.font = "10px monospace";

  ctx.fillText("MESSAGES", 50, 35);

  let y = 55;
  for (let m of messages) {
    ctx.fillText(`${m.from}: ${m.text}`, 50, y);
    y += 15;
  }

  ctx.fillText("Press P to close", 140, 150);
}

function drawPlayer() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(
    player.x - camera.x,
    player.y - camera.y,
    player.size,
    player.size
  );
}

function draw() {
  clearScreen();

  drawMap();
  drawPlayer();
  drawPhone();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
