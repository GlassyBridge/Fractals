# README

## Project Name: Mandelbrot set

## Description
This project allows users to visualize fractals by rendering the Mandelbrot set on an HTML5 canvas. Users can zoom in and out, as well as drag the canvas to navigate through the fractal. The rendering is done using an offscreen canvas to improve performance, making use of basic JavaScript and HTML5 features.

## Features
- Interactive zooming in and out of the fractal
- Dragging and panning the view of the fractal
- Offscreen rendering for better performance
- Adaptive color mapping based on the number of iterations

## Requirements
- A modern web browser that supports HTML5 and JavaScript

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone [repository URL]
    ```
2. Open the `index.html` file in your web browser.

## Usage

1. Use the buttons to zoom in, zoom out, or reset the view:
   - **Zoom In**: Click the "Zoom In" button to zoom closer into the fractal.
   - **Zoom Out**: Click the "Zoom Out" button to zoom out from the fractal.
   - **Reset**: Click the "Reset" button to return to the original view.

2. Click and drag the mouse (or touch and drag on touch devices) to pan the view around the fractal.

## Controls
- **Mouse Controls**:
  - **Left Mouse Button**: Click and drag to pan the view.
  
- **Touch Controls**:
  - **Single Touch**: Tap and drag to pan the view.
  - **Two-finger Pinch**: Use pinch gestures to zoom in and out.

## Performance Note
> **WARNING: This project needs performance improvements, and any suggestions would be appreciated.**

While this current implementation works, the rendering can be optimized further for larger zoom levels and higher iterations for better performance.

## Authors

- GlassyBridge