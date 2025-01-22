const canvas = document.getElementById('sierpinskiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

function drawTriangle(vertices) {
  ctx.beginPath();
  ctx.moveTo(vertices[0][0], vertices[0][1]);
  ctx.lineTo(vertices[1][0], vertices[1][1]);
  ctx.lineTo(vertices[2][0], vertices[2][1]);
  ctx.closePath();
  ctx.fillStyle = '#00ff00'; // Color of the triangle
  ctx.fill();
}

function sierpinski(vertices, depth) {
  if (depth === 0) {
    drawTriangle(vertices);
  } else {
    const midAB = [(vertices[0][0] + vertices[1][0]) / 2, (vertices[0][1] + vertices[1][1]) / 2];
    const midBC = [(vertices[1][0] + vertices[2][0]) / 2, (vertices[1][1] + vertices[2][1]) / 2];
    const midCA = [(vertices[2][0] + vertices[0][0]) / 2, (vertices[2][1] + vertices[0][1]) / 2];

    sierpinski([vertices[0], midAB, midCA], depth - 1);
    sierpinski([midAB, vertices[1], midBC], depth - 1);
    sierpinski([midCA, midBC, vertices[2]], depth - 1);
  }
}

document.getElementById('drawButton').addEventListener('click', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const depth = parseInt(document.getElementById('depth').value);
  const vertices = [[250, 50], [50, 450], [450, 450]]; // Define vertices of the main triangle
  sierpinski(vertices, depth);
});

// Initial draw
sierpinski([[250, 50], [50, 450], [450, 450]], 5);