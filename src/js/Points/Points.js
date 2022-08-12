export class Points {
  constructor(context, font) {
    this.context = context
    this.font = font || "48px serif"
    this.points = 0
  }

  draw() {
    this.context.font = this.font;
    this.context.fillStyle='black';
    this.context.fillText(`${Math.round(this.points / 10)}`, 30, 50, 100);
  }
}