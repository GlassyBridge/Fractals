//alert('WARNING: This project needs performance improvements, and any suggestions would be appreciated.')
const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');

const width = 800;
const height = 600;
canvas.width = width;
canvas.height = height;

let maxIterations = 1000;   
let zoom = 200;             
let offsetX = width / 2;    
let offsetY = height / 2;

let isDragging = false;
let startX, startY;

let lastTouchDistance = null;
let lastTouchStartX, lastTouchStartY;

const offscreenCanvas = document.createElement('canvas');
const offscreenCtx = offscreenCanvas.getContext('2d');
offscreenCanvas.width = width;
offscreenCanvas.height = height;

function drawFractal() {
  offscreenCtx.clearRect(0, 0, width, height);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let real = (x - offsetX) / zoom;
      let imaginary = (y - offsetY) / zoom;

      let c = { real, imaginary };
      let z = { real: 0, imaginary: 0 };
      let iterations = 0;

      while (iterations < maxIterations) {
        let tempReal = z.real * z.real - z.imaginary * z.imaginary + c.real;
        let tempImaginary = 2 * z.real * z.imaginary + c.imaginary;

        z.real = tempReal;
        z.imaginary = tempImaginary;

        if (z.real * z.real + z.imaginary * z.imaginary > 4) {
          break;
        }

        iterations++;
      }

      let color = iterations === maxIterations ? 0 : (iterations / maxIterations) * 255;
      offscreenCtx.fillStyle = iterations === maxIterations ? "black" : `rgb(${color}, 0, ${255 - color})`;
      offscreenCtx.fillRect(x, y, 1, 1);
    }
  }

  ctx.drawImage(offscreenCanvas, 0, 0);
}

document.getElementById('zoomIn').addEventListener('click', () => {
  zoom *= 1.5;
  drawFractal();
});

document.getElementById('zoomOut').addEventListener('click', () => {
  zoom /= 1.5;
  drawFractal();
});

document.getElementById('reset').addEventListener('click', () => {
  zoom = 200;
  offsetX = width / 2;
  offsetY = height / 2;
  drawFractal();
});

canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - offsetX;
  startY = e.clientY - offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    let moveX = e.clientX - startX;
    let moveY = e.clientY - startY;

    offsetX = moveX;
    offsetY = moveY;

    drawFractal();
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
  isDragging = false;
});

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (e.touches.length === 1) {
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX - offsetX;
    startY = touch.clientY - offsetY;
  } else if (e.touches.length === 2) {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    lastTouchDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    lastTouchStartX = (touch1.clientX + touch2.clientX) / 2;
    lastTouchStartY = (touch1.clientY + touch2.clientY) / 2;
  }
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if (isDragging && e.touches.length === 1) {
    const touch = e.touches[0];
    let moveX = touch.clientX - startX;
    let moveY = touch.clientY - startY;

    offsetX = moveX;
    offsetY = moveY;

    drawFractal();
  } else if (e.touches.length === 2) {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
    const distanceDelta = currentDistance - lastTouchDistance;

    if (Math.abs(distanceDelta) > 10) {
      zoom *= 1 + distanceDelta / 500;
      zoom = Math.max(50, Math.min(zoom, 1000));

      lastTouchDistance = currentDistance;
      offsetX += (touch1.clientX + touch2.clientX) / 2 - lastTouchStartX;
      offsetY += (touch1.clientY + touch2.clientY) / 2 - lastTouchStartY;

      lastTouchStartX = (touch1.clientX + touch2.clientX) / 2;
      lastTouchStartY = (touch1.clientY + touch2.clientY) / 2;

      drawFractal();
    }
  }
});

canvas.addEventListener('touchend', (e) => {
  if (e.touches.length < 2) {
    isDragging = false;
  }
});

canvas.addEventListener('touchcancel', () => {
  isDragging = false;
});

drawFractal();