const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

function drawBranch(x, y, length, angle, depth) {
    if (depth === 0) return;

    // Calculate the new branch's ending coordinates
    const xEnd = x + length * Math.cos(angle);
    const yEnd = y - length * Math.sin(angle); // Subtract to create upward growth

    // Draw the branch
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xEnd, yEnd);
    ctx.lineWidth = depth; // Thicker branches for lower depth
    ctx.strokeStyle = '#f0f0ff'; 
    ctx.stroke();

    // Create new branches
    drawBranch(xEnd, yEnd, length * 0.7, angle - Math.PI / 6, depth - 1); // Right branch
    drawBranch(xEnd, yEnd, length * 0.7, angle + Math.PI / 6, depth - 1); // Left branch
}

function drawFractalTree(depth) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Set the starting point for the trunk
    const xStart = canvas.width / 2;
    const yStart = canvas.height;

    // Draw the trunk
    ctx.translate(xStart, yStart); // Move the origin to the bottom center of the canvas
    ctx.rotate(-Math.PI / 2); // Rotate to point upwards
    drawBranch(0, 0, 100, 0, depth); // Start drawing branches

    ctx.restore();
}

document.getElementById('drawButton').addEventListener('click', function () {
    const depth = parseInt(document.getElementById('depth').value);
    drawFractalTree(depth);
});

// Initial draw
drawFractalTree(5);