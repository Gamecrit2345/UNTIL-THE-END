const player = new Player(50, 50);
const camera = new Camera();

let scene = "school";
let route = "neutral"; // good / bad / neutral

// JOLLIBEE DATE AREA
const jollibee = {
  x: 140,
  y: 90,
  size: 10,
  active: false
};

function startJollibeeDate() {
  SceneManager.set("jollibee");

  setSunset(1);

  startDialogue([
    "Milca: Ang ganda ng lugar no?",
    "Matt: Oo... mas maganda pag kasama ka."
  ]);
}

// TRIGGER JOLLIBEE
function checkJollibee() {
  const dx = player.x - jollibee.x;
  const dy = player.y - jollibee.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 12 && Relationship.affection >= 5) {
    startJollibeeDate();
  }
}

// SIMPLE MAP SWITCH
function updateScene() {
  if (SceneManager.current === "school") {
    schoolUpdate();
  }

  if (SceneManager.current === "jollibee") {
    jollibeeUpdate();
  }
}

// SCHOOL LOGIC
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

  updateDialogue();
}

// JOLLIBEE LOGIC
function jollibeeUpdate() {
  if (keys["e"]) {
    Relationship.add(1);
    keys["e"] = false;
  }

  updateDialogue();
}

// DRAW
function drawSchool() {
  drawMap();

  ctx.fillStyle = "pink";
  ctx.fillRect(120 - camera.x, 80 - camera.y, 8, 8);

  ctx.fillStyle = "yellow";
  ctx.fillRect(player.x - camera.x, player.y - camera.y, 8, 8);
}

function drawJollibee() {
  ctx.fillStyle = "#1f1f1f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "orange";
  ctx.fillRect(100, 60, 60, 40);

  ctx.fillStyle = "pink";
  ctx.fillText("Milca is smiling...", 90, 120);

  ctx.fillStyle = "yellow";
  ctx.fillRect(player.x, player.y, 8, 8);
}

function draw() {
  clearScreen();

  if (SceneManager.current === "school") drawSchool();
  if (SceneManager.current === "jollibee") drawJollibee();

  drawDialogue();
  drawLighting(ctx);
}

function loop() {
  updateScene();
  draw();
  requestAnimationFrame(loop);
}

loop();
