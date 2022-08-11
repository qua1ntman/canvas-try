export class Platform {
  constructor(width, x, y, context, image) {
    this.context = context
    this.image = image
    this.width = width
    this.height = 50
    this.position = {
      x: x,
      y: y
    }
  }

  draw() {
    this.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}