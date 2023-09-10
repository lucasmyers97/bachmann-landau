import { linspace } from './MathFunctions';
import { renderCanvas, LineProp } from './Render';

interface GridlineTicks {
    small_gridlines: {x: number, y: number}[][];
    large_gridlines: {x: number, y: number}[][];
    small_alpha: number;
    large_alpha: number;
}

function calcGridlineTicks(n_spaces_per_view: number, viewport_width: number) {
/**
  * Explanation: Call n `n_spaces_per_view` and w `viewport_width`.
  * Then, supposing that when we zoom in so far that the innermost spaces
  * become the new width, and we want there to be n spaces in there,
  * So then from the original reference, there would be n^2 total spaces.
  * Taking this generally gives n^p spaces, with 2 / n^p being the space width
  * (since our original interval is [-1, 1]).
  *
  * The number of spaces visible in a view width is then:
  * v = w / (2 / n^p) = n^p w / 2
  * If we want n spaces visible then we may solve for p as:
  * p = log_n(2 n / w) = 1 - log(w / 2) / log(n)
  * This will obviously not necessarily be an integer.
  * The width corresponding to a given p is:
  * w = n * 2 / n^p = 2 / n^{p - 1}
  * so we should take the floor of this to get the larger viewport, and the
  * ceil to get the smaller viewport.
  */

    const viewport_exponent = 1 - Math.log(viewport_width / 2) / Math.log(n_spaces_per_view);
    const large_viewport_exponent = Math.floor(viewport_exponent);
    const small_viewport_exponent = Math.ceil(viewport_exponent);

    // 1 when they are the same, zero when they are 1 off
    const small_alpha = 1 - (small_viewport_exponent - viewport_exponent);
    const large_alpha = 1 - (viewport_exponent - large_viewport_exponent);

    const larger_viewport_width = 2 / n_spaces_per_view**(large_viewport_exponent - 1);

    // +1 to get ticks instead of spaces
    const large_ticks = linspace(-larger_viewport_width / 2, larger_viewport_width / 2, n_spaces_per_view + 1);
    const small_ticks = linspace(-larger_viewport_width / 2, larger_viewport_width / 2, n_spaces_per_view*n_spaces_per_view + 1);

    const large_gridlines = createGridlinePaths(large_ticks);
    const small_gridlines = createGridlinePaths(small_ticks);

    return {
        large_gridlines: large_gridlines,
        small_gridlines: small_gridlines,
        large_alpha: large_alpha,
        small_alpha: small_alpha
    };
}



/**
 * Creates the paths (sets of points) for each gridline given the grid
 * spacing and zoom
 */
function createGridlinePaths(ticks: number[]) {

  const end = ticks.length - 1;
  const x_paths = ticks.map((x_val) => {
    return [{x: x_val, y: ticks[0]}, {x: x_val, y: ticks[end]}];
  });
  const y_paths = ticks.map((y_val) => {
    return [{x: ticks[0], y: y_val}, {x: ticks[end], y: y_val}];
  });

  return x_paths.concat(y_paths);
}



/**
 * Renders grid to canvas given canvasRef, zoom, and line properties for the gridlines
 */
export function drawGrid(canvasRef: React.RefObject<HTMLCanvasElement>, 
                         zoom: number, 
                         gridline_prop: LineProp) {

    const {large_gridlines, small_gridlines, large_alpha, small_alpha} = calcGridlineTicks(4, 2 * 1 / zoom);

    const large_gridline_prop = structuredClone(gridline_prop);
    large_gridline_prop.globalAlpha = large_alpha;
    const num_large_paths = large_gridlines.length;
    let large_gridline_props = Array(num_large_paths);
    large_gridline_props.fill(large_gridline_prop);

    const small_gridline_prop = structuredClone(gridline_prop);
    small_gridline_prop.globalAlpha = small_alpha;
    const num_small_paths = small_gridlines.length;
    let small_gridline_props = Array(num_small_paths);
    small_gridline_props.fill(small_gridline_prop);

    const gridlines = large_gridlines.concat(small_gridlines);
    const gridline_props = large_gridline_props.concat(small_gridline_props);

    renderCanvas(canvasRef, gridlines, zoom, gridline_props);
}
