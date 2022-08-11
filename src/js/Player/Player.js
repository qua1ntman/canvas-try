const gravity = 1

export class Player {
  constructor(context) {
    this.context = context
    this.position = {
      x: 100,
      y: 500
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 30
    this.height = 30
  }

  draw() {
    this.context.fillStyle='red';
    // context.rotate(Math.PI / 180 * 90);
    this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity
    }
  }

}