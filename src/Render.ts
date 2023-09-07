interface Point {
    x: number;
    y: number;
}


interface LineProp{
    strokeStyle: string;
    lineWidth: number
}



/**
  * Clears the entire canvas screen.
  */
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



/**
 * Takes a path and returns a path which is scaled by `zoom`
 * 
 * @param path: list of Points
 * List of points comprising the path
 *
 * @param zoom: number
 * Factor by which to scale the points
 * 
 * @return zoomed_path: list of Points
 * rescaled points
 */
function zoomPath(path: Point[], zoom: number) {
  return ( path.map((pt) => {
    return ({ x : pt.x * zoom,
              y : pt.y * zoom });
  }));
}



/**
  * Maps point in space to point on canvas.
  * Note that canvas points invert the y-axis.
  *
  * @param point: Point
  * Point to map to canvas
  *
  * @param canvas_unit_per_unit: number
  * Number of canvas units per plot unit
  *
  * @param canvas_width: number
  * Width of the canvas in units of the canvas
  *
  * @param canvas_height: number
  * Height of the canvas in units of the canvas
  *
  * @return  canvas_point: Point
  * Point mapped to the canvas
  */
function pointToCanvasPoint(point: Point, 
                            canvas_unit_per_unit: number, 
                            canvas_width: number, 
                            canvas_height: number) {

  return ({
    x : (point.x * canvas_unit_per_unit) + (canvas_width / 2),
    y : -(point.y * canvas_unit_per_unit) + (canvas_height / 2)
  });
}



/**
 * Translates plot paths into canvas paths.
 * Just does a rescaling based on canvas width, and also takes y -> -y
 * because of how the canvas axes are set up.
 */
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



/**
    * Draw path to canvas given styling by `line_props`.
    * `canvas_path` points must be given in canvas coordinates
    */
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



/**
 * Draws single path to canvas based on scaling constant `zoom` and 
 * `line_prop` object which describes path styling.
 */
function drawPath(canvasRef: React.RefObject<HTMLCanvasElement>, 
                  path: Point[], 
                  zoom: number, 
                  line_prop: LineProp) {

  const zoomed_path = zoomPath(path, zoom);
  const canvas_path = pathToCanvasPath(canvasRef, zoomed_path);
  drawCanvasPath(canvasRef, canvas_path, line_prop);
}



/**
 * Takes an array of paths (which are themselves arrays of Points), and then
 * draws them to the canvas based on a scaling coefficient `zoom` and 
 * `line_props` which describes the style of stroke
 */
export function renderCanvas(canvasRef: React.RefObject<HTMLCanvasElement>, 
                             paths: Point[][], 
                             zoom: number, 
                             line_props: LineProp[]) {

  clearScreen(canvasRef);
  paths.forEach((path, i) => { drawPath(canvasRef, path, zoom, line_props[i]); });
}
