// When "isDrawing" is true, it status that The Left Button of the Mouse is clicked and is now being Dragged.
let isDrawing = false;

// (x1,y1) are the Co-ordinates of the point in the plane, where recently the Mouse is clicked down.
// And (x2,y2) are the Coordinates of the point in the plane, where recently the Mouse is left down after being clicked.
let x1 = 0,
  x2 = 0;
let y1 = 0,
  y2 = 0;

// Point (a,b) is the Starting point of the Polygon.
let a = 0,
  b = 0;

// Points is the array of the vertices of the Polygon.
let points = [];

let Polygon = document.getElementById("Polygon");
let context = Polygon.getContext("2d");
let Complete = document
  .getElementById("Complete")
  .addEventListener("click", CompletePolygon);
let Reset = document
  .getElementById("Reset")
  .addEventListener("click", ResetToPlane);
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
context.canvas.width -= 3;
context.canvas.height -= 30;

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
Polygon.addEventListener("mousedown", (e) => {
  if (x1 == 0 && y1 == 0) {
    x1 = e.offsetX;
    y1 = e.offsetY;
    a = x1;
    b = y1;
    points.push({ x: x1, y: y1 });
  }
  isDrawing = true;
});

window.addEventListener("mouseup", (e) => {
  if (isDrawing === true) {
    x2 = e.offsetX;
    y2 = e.offsetY;
    drawLine(context, x1, y1, x2, y2);
    x1 = x2;
    y1 = y2;
    points.push({ x: x1, y: y1 });
    isDrawing = false;
  }
});

/*
Polygon.addEventListener("mousemove", (e) => {
  if (isDrawing === true) {
    //drawLine(context, x1, y1, e.offsetX, e.offsetY);
    //drawLine(context, x1, x2, e.offsetX, e.offsetY, "white", 2);
    //x2 = e.offsetX;
    //y2 = e.offsetY;
  }
});*/

// Function to complete the Polygon.
function CompletePolygon() {
  drawLine(context, x1, y1, a, b);
  fillPolygon(points, "red");
}

// Function to Reset the Plane.
function ResetToPlane() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  points = [];
  x1 = 0;
  y1 = 0;
}

// Function to Draw the edges of the Polygon.
function drawLine(ctx, x1, y1, x2, y2, stroke = "green", width = 3) {
  if (stroke) {
    ctx.strokeStyle = stroke;
  }
  if (width) {
    ctx.lineWidth = width;
  }
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Function to Fill the Polygon with a color.
function fillPolygon(points, color) {
  if (points.length > 0) {
    context.fillStyle = color;
    var point = points[0];
    context.beginPath();
    context.moveTo(point.x, point.y);
    for (var i = 1; i < points.length; ++i) {
      point = points[i];
      context.lineTo(point.x, point.y);
    }
    context.closePath();
    context.fill();
  }
}
