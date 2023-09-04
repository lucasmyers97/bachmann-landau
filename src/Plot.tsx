import React from 'react';
import Canvas from './Canvas';
import { renderCanvas } from './Render';
import { drawGrid } from './MakeGrid';

/**
 * Takes an array of sets of points in real space, a set of line properties,
 * and a scale, and then plots them.
 */
interface PlotProps {
    zoom: number;
    paths: {x: number, y: number}[][];
    line_props: {strokeStyle: string, lineWidth: number}[];
}

function Plot(props: PlotProps) {

  const gridline_prop = {strokeStyle: "#000000", lineWidth: 1};

  // Actual component
  return (
    <div>
      <div>
        <Canvas
          draw={(canvasRef) => {drawGrid(canvasRef, props.zoom, gridline_prop);}}
        />
      </div>
      <div>
        <Canvas
          draw={(canvasRef) => renderCanvas(canvasRef, props.paths, props.zoom, props.line_props)}
        />
      </div>
    </div>
  );
}

export default Plot;
