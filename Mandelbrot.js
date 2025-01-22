// Constants
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

const offscreenCanvas = document.createElement('canvas');
const offscreenCtx = offscreenCanvas.getContext('2d');
offscreenCanvas.width = width;
offscreenCanvas.height = height;

// Draw a single pixel based on the iterations
function drawPixel(x, y, iterations) {
  const color = iterations === maxIterations ? 0 : (iterations / maxIterations) * 255;
  offscreenCtx.fillStyle = iterations === maxIterations ? "black" : `rgb(${color}, 0, ${255 - color})`;
  offscreenCtx.fillRect(x, y, 1, 1);
}

// Calculate the number of iterations for a given point
function calculateMandelbrot(real, imaginary) {
  let z = { real: 0, imaginary: 0 };
  let iterations = 0;

  while (iterations < maxIterations) {
    const tempReal = z.real * z.real - z.imaginary * z.imaginary + real;
    const tempImaginary = 2 * z.real * z.imaginary + imaginary;

    z.real = tempReal;
    z.imaginary = tempImaginary;

    if (z.real * z.real + z.imaginary * z.imaginary > 4) {
      break;
    }
    iterations++;
  }
  
  return iterations;
}

// Draw the Mandelbrot fractal
function drawFractal() {
  offscreenCtx.clearRect(0, 0, width, height);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const real = (x - offsetX) / zoom;
      const imaginary = (y - offsetY) / zoom;
      const iterations = calculateMandelbrot(real, imaginary);
      drawPixel(x, y, iterations);
    }
  }

  ctx.drawImage(offscreenCanvas, 0, 0);
}

// Add event listeners for controls
document.getElementById('zoomIn').addEventListener('click', () => {
  zoom /= 1.5;
  drawFractal();
});

document.getElementById('zoomOut').addEventListener('click', () => {
  zoom *= 1.5;
  drawFractal();
});

document.getElementById('reset').addEventListener('click', () => {
  zoom = 200;
  offsetX = width / 2;
  offsetY = height / 2;
  drawFractal();
});

// Handle mouse drag interactions
canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - offsetX;
  startY = e.clientY - offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    drawFractal();
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});
canvas.addEventListener('mouseleave', () => {
  isDragging = false;
});

// Handle touch interactions
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (e.touches.length === 1) {
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX - offsetX;
    startY = touch.clientY - offsetY;
  }
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if (isDragging && e.touches.length === 1) {
    const touch = e.touches[0];
    offsetX = touch.clientX - startX;
    offsetY = touch.clientY - startY;
    drawFractal();
  }
});

canvas.addEventListener('touchend', () => {
  isDragging = false;
});

// Initial draw
drawFractal();