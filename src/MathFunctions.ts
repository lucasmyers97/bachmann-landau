interface Point {
    x: number;
    y: number;
}

export function drawCircle(canvasRef: React.RefObject<HTMLCanvasElement>, 
                           radius: number) {

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
  const ctr_x = width / 2;
  const ctr_y = height / 2;

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#FF00FF';
  ctx.arc(ctr_x, ctr_y, radius, 0, 2*Math.PI);
  ctx.stroke();
}



export function drawCurve(canvasRef: React.RefObject<HTMLCanvasElement>, 
                          pts: Point[]) {
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
  const ctr_x = width / 2;
  const ctr_y = height / 2;

  ctx.beginPath();
  pts.forEach((pt) => {
    ctx.lineTo(pt.x + ctr_x, pt.y + ctr_y);
  });

  ctx.lineWidth = 3;
  ctx.strokeStyle = '#0000FF';
  ctx.stroke();
  ctx.closePath();
}



export function transformFunc(pt: Point) {
  let t = Math.atan2(pt.y, pt.x);
  const r0 = Math.sqrt(pt.x*pt.x + pt.y*pt.y);
  const r = 0.1*r0*Math.cos(10*t) + r0;
  t += 2*r0;
  return ({
    x : r*Math.cos(t),
    y : r*Math.sin(t)
  });
}



export function linspace(start: number, end: number, num: number) {
  const empty_array = Array(num).fill(null);
  const dx = (end - start) / (num - 1);
  return empty_array.map( (_, idx) => {
    return start + dx*idx;
  });
}



export function returnCircle(r: number) {
  const t = linspace(0, 2*Math.PI, 200);

  return t.map((t) => {
    return ({ x: r*Math.cos(t),
              y: r*Math.sin(t) });
  });
}
