interface Point {
    x: number;
    y: number;
}


interface LineProp{
    strokeStyle: string;
    lineWidth: number
}



function clearScreen(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const current = canvasRef.current;
  if (current == null) {
    console.log("current is null");
    return;
  }

  const ctx = current.getContext("2d");
  if (ctx == null) {
      console.log("ctx is null");
      return;
  }

  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.closePath();
}



function zoomPath(path: Point[], zoom: number) {
  return ( path.map((pt) => {
    return ({ x : pt.x * zoom,
              y : pt.y * zoom });
  }));
}



function pointToCanvasPoint(point: Point, 
                            canvas_unit_per_unit: number, 
                            width: number, 
                            height: number) {

  return ({
    x : (point.x * canvas_unit_per_unit) + (width / 2),
    y : -(point.y * canvas_unit_per_unit) + (height / 2)
  });
}



function pathToCanvasPath(canvasRef: React.RefObject<HTMLCanvasElement>, 
                          path: Point[]) {

  const current = canvasRef.current;
  if (current == null) {
    console.log("current is null");
    return [{x: 0, y: 0}];
  }

  const ctx = current.getContext("2d");
  if (ctx == null) {
      console.log("ctx is null");
      return [{x: 0, y: 0}];
  }

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



function drawCanvasPath(canvasRef: React.RefObject<HTMLCanvasElement>, 
                        canvas_path: Point[], 
                        line_props: LineProp)
{
  const current = canvasRef.current;
  if (current == null) {
    console.log("current is null");
    return;
  }

  const ctx: any = current.getContext("2d");
  if (ctx == null) {
      console.log("ctx is null");
      return;
  }

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



function drawPath(canvasRef: React.RefObject<HTMLCanvasElement>, 
                  path: Point[], 
                  zoom: number, 
                  line_prop: LineProp) {

  const zoomed_path = zoomPath(path, zoom);
  const canvas_path = pathToCanvasPath(canvasRef, zoomed_path);
  drawCanvasPath(canvasRef, canvas_path, line_prop);
}



export function renderCanvas(canvasRef: React.RefObject<HTMLCanvasElement>, 
                             paths: Point[][], 
                             zoom: number, 
                             line_props: LineProp[]) {

  clearScreen(canvasRef);
  paths.forEach((path, i) => { drawPath(canvasRef, path, zoom, line_props[i]); });
}
