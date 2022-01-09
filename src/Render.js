import { linspace } from './MathFunctions.js';

function clearScreen(canvasRef) {
  const ctx = canvasRef.current.getContext("2d");

  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.closePath();
}



function zoomPath(path, zoom) {
  return ( path.map((pt) => {
    return ({ x : pt.x * zoom,
              y : pt.y * zoom });
  }));
}



function pointToCanvasPoint(point, dim, width, height) {

  return ({
    x : -(point.y * dim / 2) + (width / 2),
    y : (point.x * dim / 2) + (height / 2)
  });
}



function pathToCanvasPath(canvasRef, path) {

  const ctx = canvasRef.current.getContext("2d");
  const canvas_width = ctx.canvas.width;
  const canvas_height = ctx.canvas.height;
  const canvas_dim = Math.min(canvas_width, canvas_height);

  const canvas_path = path.map((point) => {
    return ( pointToCanvasPoint(point,
                                canvas_dim,
                                canvas_width,
                                canvas_height) );
  });

  return canvas_path;
}



function drawCanvasPath(canvasRef, canvas_path, line_props) {

  const ctx = canvasRef.current.getContext("2d");
  ctx.beginPath();
  canvas_path.forEach((pt) => {
    ctx.lineTo(pt.x, pt.y);
  });

  for (let [key, value] of Object.entries(line_props)) {
    ctx[key] = value;
  }
  ctx.stroke();
  ctx.closePath();
}



function drawPath(canvasRef, path, zoom, line_prop) {

  const zoomed_path = zoomPath(path, zoom);
  const canvas_path = pathToCanvasPath(canvasRef, zoomed_path);
  drawCanvasPath(canvasRef, canvas_path, line_prop);
}



export function renderCanvas(canvasRef, paths, zoom, line_props) {

  clearScreen(canvasRef);
  paths.forEach((path, i) => { drawPath(canvasRef, path, zoom, line_props[i]); });
}



export function createGridlinePaths(canvasRef, grid_spacing, zoom) {

  let n_lines = Math.ceil(1 / (zoom * grid_spacing));
  n_lines = n_lines % 2 === 0 ? n_lines : (n_lines + 1);
  n_lines = n_lines * 2;
  const unscaled_lines = linspace(-n_lines/2, n_lines/2, n_lines);
  const line_scale = grid_spacing;
  const scaled_lines = unscaled_lines.map((line) => line*line_scale);

  const end = scaled_lines.length - 1;
  const x_paths = scaled_lines.map((x_val) => {
    return [{x: x_val, y: scaled_lines[0]}, {x: x_val, y: scaled_lines[end]}];
  });
  const y_paths = scaled_lines.map((y_val) => {
    return [{x: scaled_lines[0], y: y_val}, {x: scaled_lines[end], y: y_val}];
  });

  return x_paths.concat(y_paths);
}
