let dialogueBox = {
  active: false,
  lines: [],
  index: 0,
  choices: null
};

function startDialogue(lines, choices = null) {
  dialogueBox.active = true;
  dialogueBox.lines = lines;
  dialogueBox.index = 0;
  dialogueBox.choices = choices;
}

function updateDialogue() {
  if (!dialogueBox.active) return;

  if (keys["e"]) {
    dialogueBox.index++;

    if (dialogueBox.index >= dialogueBox.lines.length) {
      if (dialogueBox.choices) return;
      dialogueBox.active = false;
    }

    keys["e"] = false;
  }

  // choices
  if (dialogueBox.choices) {
    if (keys["1"]) {
      dialogueBox.active = false;
      dialogueBox.choices.onChoice(1);
      keys["1"] = false;
    }

    if (keys["2"]) {
      dialogueBox.active = false;
      dialogueBox.choices.onChoice(2);
      keys["2"] = false;
    }
  }
}

function drawDialogue() {
  if (!dialogueBox.active) return;

  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(10, 120, 300, 50);

  ctx.fillStyle = "white";
  ctx.font = "10px monospace";

  ctx.fillText(dialogueBox.lines[dialogueBox.index], 20, 140);

  if (dialogueBox.choices && dialogueBox.index === dialogueBox.lines.length - 1) {
    ctx.fillText("1. Mabait sumagot", 20, 155);
    ctx.fillText("2. Cold sumagot", 160, 155);
  } else {
    ctx.fillText("Press E", 250, 160);
  }
}
