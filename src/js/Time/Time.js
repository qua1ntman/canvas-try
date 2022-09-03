export class Time {
  constructor(context, date, font) {
    this.context = context
    this.font = font || "30px serif"
    this.time = date
  }

  draw() {
    this.context.font = this.font;
    this.context.fillStyle='blue';
    this.context.fillText(`${Math.floor((Date.now() - this.time) / 1000)}s`, 300, 50, 100);
  }
}