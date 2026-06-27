const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 320;
canvas.height = 180;

const SCALE = 3;

function resize() {
  canvas.style.width = canvas.width * SCALE + "px";
  canvas.style.height = canvas.height * SCALE + "px";
}
resize();

function clearScreen() {
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
