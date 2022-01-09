import { linspace } from './MathFunctions.js';
import { renderCanvas } from './Render.js';



function calcNTicksPerHalf(grid_spacing, zoom) {

  const n_ticks_per_unit = 1 / grid_spacing;
  const n_units_per_half = 1 / zoom; // screen goes from (-1, 1) by default
  const n_ticks_per_half = Math.ceil( n_ticks_per_unit * n_units_per_half );

  return n_ticks_per_half;
}



function calcTicks(grid_spacing, zoom) {

  const n_ticks_per_half = calcNTicksPerHalf(grid_spacing, zoom);
  const unscaled_ticks = linspace(-n_ticks_per_half,
                                  n_ticks_per_half,
                                  2*n_ticks_per_half + 1); // +1 for axis line
  const tick_scale = grid_spacing;
  const scaled_ticks = unscaled_ticks.map((tick) => tick*tick_scale);

  return scaled_ticks;
}



function createGridlinePaths(grid_spacing, zoom) {

  const ticks = calcTicks(grid_spacing, zoom);

  const end = ticks.length - 1;
  const x_paths = ticks.map((x_val) => {
    return [{x: x_val, y: ticks[0]}, {x: x_val, y: ticks[end]}];
  });
  const y_paths = ticks.map((y_val) => {
    return [{x: ticks[0], y: y_val}, {x: ticks[end], y: y_val}];
  });

  return x_paths.concat(y_paths);
}



export function drawGrid(canvasRef, zoom, gridline_prop) {

  const grid_paths = createGridlinePaths(0.2, zoom);

  const num_paths = grid_paths.length;
  let gridline_props = Array(num_paths);
  gridline_props.fill(gridline_prop);

  renderCanvas(canvasRef, grid_paths, zoom, gridline_props);
}
