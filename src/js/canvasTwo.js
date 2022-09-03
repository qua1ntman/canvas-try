const canvas2 = document.getElementById('canvas2')
const context = canvas2.getContext('2d')

canvas2.width = 1000
canvas2.height = 600

export class CanvasTwo {
  drawLine() {
    context.strokeStyle = 'black';
    context.lineWidth = 5;
  
    context.beginPath();
    context.moveTo(100, 200);
    context.lineTo(300, 200);
    context.stroke();
  }

  brawRect() {
    context.strokeStyle = 'blue';
    context.lineWidth = 10;
    context.beginPath();
    context.rect(400, 150, 150, 100);
    context.stroke();
  }

  drawCircle() {
    context.lineWidth = 2;
    context.strokeStyle = 'red';
    context.beginPath();
    context.arc(700, 200, 50, 0, 2 * Math.PI);
    
    context.fillStyle='green';
    context.fill();
    
    context.stroke();
  }
} 


