class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  follow(player) {
    this.x = player.x - 160;
    this.y = player.y - 90;
  }
}
