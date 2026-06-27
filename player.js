class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 8;
    this.speed = 1.2;
  }

  update() {
    if (keys["w"]) this.y -= this.speed;
    if (keys["s"]) this.y += this.speed;
    if (keys["a"]) this.x -= this.speed;
    if (keys["d"]) this.x += this.speed;
  }

  draw(ctx, camera) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      this.x - camera.x,
      this.y - camera.y,
      this.size,
      this.size
    );
  }
}
