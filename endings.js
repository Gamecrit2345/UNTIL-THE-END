let ending = null;

function triggerHappyEnding() {
  ending = "happy";

  SceneManager.set("beach");
  setSunset(1);
  setRain(false);

  startDialogue([
    "Matt: Sa wakas... nandito na tayo.",
    "Milca: Ang tagal ng araw na ito... pero sulit.",
    "Matt: Hindi na kita bibitawan."
  ]);

  setTimeout(() => {
    startCredits();
  }, 8000);
}
