let creditsY = 180;

function startCredits() {
  SceneManager.set("credits");
}

function drawCredits() {
  if (SceneManager.current !== "credits") return;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "10px monospace";

  ctx.fillText("UNTIL THE END", 120, creditsY);
  ctx.fillText("A love story between Matt and Milca", 60, creditsY + 20);
  ctx.fillText("Made with love ❤️", 110, creditsY + 40);

  creditsY -= 0.5;
}
