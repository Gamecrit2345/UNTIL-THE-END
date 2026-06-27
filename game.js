const player = new Player(50, 50);
const camera = new Camera();

let scene = "school";

// SCHOOL MAP
const schoolMap = {
  tileSize: 16,
  width: 20,
  height: 12,
  tiles: []
};

for (let y = 0; y < schoolMap.height; y++) {
  for (let x = 0; x < schoolMap.width; x++) {
    if (x === 0 || y === 0 || x === schoolMap.width - 1 || y === schoolMap.height - 1) {
      schoolMap.tiles.push(1);
    } else {
      schoolMap.tiles.push(0);
    }
  }
};

// Milca
const milca = { x: 120, y: 80, size: 8, met: false };

// interaction trigger
function checkMilca() {
  const dx = player.x - milca.x;
  const dy = player.y - milca.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 12 && !milca.met) {
    milca.met = true;

    startDialogue(
      [
        "Milca: Uy, bago ka dito noh?",
        "Matt: Oo... kakalipat ko lang.",
        "Milca: Ako si Milca."
      ],
      {
        onChoice: (c) => {
          if (c === 1) Relationship.add(2);
          if (c === 2) Relationship.add(-1);

          Save.data.milcaMet = true;
        }
      }
    );
  }
}

function tileAt(map, x, y) {
  const tx = Math.floor(x / map.tileSize);
  const ty = Math.floor(y / map.tileSize);

  if (tx < 0 || ty < 0 || tx >= map.width || ty >= map.height) return 1;

  return map.tiles[ty * map.width + tx];
}

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

  updateDialogue();
}

function drawMap() {
  let map = schoolMap;

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      ctx.fillStyle = (x === 0 || y === 0 || x === map.width-1 || y === map.height-1)
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

function draw() {
  clearScreen();

  drawMap();

  // Milca
  ctx.fillStyle = "pink";
  ctx.fillRect(milca.x - camera.x, milca.y - camera.y, milca.size, milca.size);

  // player
  ctx.fillStyle = "yellow";
  ctx.fillRect(player.x - camera.x, player.y - camera.y, player.size, player.size);

  drawDialogue();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
