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



function pointToCanvasPoint(point, canvas_unit_per_unit, width, height) {

  return ({
    x : (point.x * canvas_unit_per_unit) + (width / 2),
    y : -(point.y * canvas_unit_per_unit) + (height / 2)
  });
}



function pathToCanvasPath(canvasRef, path) {

  const ctx = canvasRef.current.getContext("2d");
  const canvas_width = ctx.canvas.width;
  const canvas_height = ctx.canvas.height;
  // divided by 2 because a unit is *half* the screen width
  const canvas_unit_per_unit = Math.min(canvas_width, canvas_height) / 2;

  const canvas_path = path.map((point) => {
    return ( pointToCanvasPoint(point,
                                canvas_unit_per_unit,
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
