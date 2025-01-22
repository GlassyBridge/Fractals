const canvas = document.getElementById('kochCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = '#00ffff'; // Color of the snowflake
  ctx.lineWidth = 1;
  ctx.stroke();
}

function kochCurve(x1, y1, x2, y2, depth) {
  if (depth === 0) {
    drawLine(x1, y1, x2, y2);
  } else {
    const dx = x2 - x1;
    const dy = y2 - y1;

    const xA = x1 + dx / 3;
    const yA = y1 + dy / 3;

    const xB = x2 - dx / 3;
    const yB = y2 - dy / 3;

    const xC = x1 + dx / 2 - (Math.sqrt(3) * dy) / 6;
    const yC = y1 + dy / 2 + (Math.sqrt(3) * dx) / 6;

    kochCurve(x1, y1, xA, yA, depth - 1);
    kochCurve(xA, yA, xC, yC, depth - 1);
    kochCurve(xC, yC, xB, yB, depth - 1);
    kochCurve(xB, yB, x2, y2, depth - 1);
}}

function drawSnowflake(depth) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Length of each side of the triangle
  const length = 400;  
  const height = (Math.sqrt(3) / 2) * length; // Height of the equilateral triangle

  // Calculate vertices for centering the triangle
  const x1 = (canvas.width - length) / 2;  // X-coordinate of left bottom vertex
  const y1 = canvas.height - (canvas.height - height) / 2 - 50; // Adjusted Y-coordinate for centering
  const x2 = x1 + length; // X-coordinate of right bottom vertex
  const y2 = y1;          // Y-coordinate of right bottom vertex
  const x3 = x1 + length / 2 ; // X-coordinate of top vertex
  const y3 = y1 - height; // Y-coordinate of top vertex

  // Draw the Koch curves forming the snowflake
  kochCurve(x1, y1, x2, y2, depth);
  kochCurve(x2, y2, x3, y3, depth);
  kochCurve(x3, y3, x1, y1, depth);
}

document.getElementById('drawButton').addEventListener('click', function() {
  const depth = parseInt(document.getElementById('depth').value);
  drawSnowflake(depth);
});

// Initial draw
drawSnowflake(3);