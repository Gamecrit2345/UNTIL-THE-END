let dialogueBox = {
  active: false,
  lines: [],
  index: 0
};

function startDialogue(lines) {
  dialogueBox.active = true;
  dialogueBox.lines = lines;
  dialogueBox.index = 0;
}

function updateDialogue() {
  if (!dialogueBox.active) return;

  if (keys["e"]) {
    dialogueBox.index++;

    if (dialogueBox.index >= dialogueBox.lines.length) {
      dialogueBox.active = false;
    }

    keys["e"] = false; // prevent spam
  }
}

function drawDialogue() {
  if (!dialogueBox.active) return;

  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(10, 120, 300, 50);

  ctx.fillStyle = "white";
  ctx.font = "10px monospace";

  ctx.fillText(
    dialogueBox.lines[dialogueBox.index],
    20,
    145
  );

  ctx.fillText("Press E", 250, 160);
}
