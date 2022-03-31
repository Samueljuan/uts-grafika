var canvas = document.getElementById('canvas')

canvas.width = '400';
canvas.height = '400';

var isDrawing = false;
var x = 0;
var y = 0;
var start = { x: 0, y: 0 }

var ctx = canvas.getContext("2d");
var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);


canvas.addEventListener('click', e => {
  start.x = e.offsetX;
  start.y = e.offsetY
  console.log(start)
}, { once: true });

canvas.addEventListener('click', e => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});


canvas.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(ctx, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    // console.log(x, y)
    isDrawing = false;
  }
});

canvas.addEventListener('contextmenu', e => {
  if (isDrawing === false) {
    drawLine(ctx, start.x, start.y, e.offsetX, e.offsetY);
  }
  // console.log(start)
});


function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 2;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

// -------------- //

canvas2.height = '400';
canvas2.width = '400'

var ctx2 = canvas2.getContext("2d");


copy.addEventListener('click', e => {
  drawLine(ctx2, 0, 0, e.offsetX, e.offsetY)
})