import React from 'react';
import styles from './Plot.module.css';
import Canvas from './Canvas';
import ClickDrag from './ClickDrag';
import { renderCanvas } from './Render';
import { drawGrid } from './MakeGrid';

interface PlotProps {
    mouse_clicked: boolean;
    mouse_pos: {x: number, y: number};
    onScaleChange(scale: number): void;
    paths: {x: number, y: number}[][];
    line_props: {strokeStyle: string, lineWidth: number}[];
}

function Plot(props: PlotProps) {

  const min_zoom = 0.01;
  const min_scale = 0;

  const gridline_prop = {strokeStyle: "#000000", lineWidth: 1};

  // Handle ClickDrags
  const [zoom, setZoom] = React.useState(1);
  const [scale, setScale] = React.useState(1);

  function updateZoom(last_zoom: number, delta_x: number) {
      const d_zoom = delta_x / 100;
      const new_zoom = last_zoom*(1 + d_zoom);
      if (new_zoom > min_zoom) {
        return new_zoom;
      }
      return last_zoom;
  }

  function formatZoom(zoom: number) {
    return `Zoom: ${Number(zoom*100).toFixed(0)}%`;
  }

  function updateScale(last_scale: number, delta_x: number) {
      const d_scale = delta_x / 100;
      const new_scale = last_scale*(1 + d_scale);
      if (new_scale > min_scale) {
        return new_scale;
      }
      return last_scale;
  }

  function formatScale(scale: number) {
    return `Scale: ${Number(scale).toExponential(2)}`;
  }


  // Actual component
  return (
    <div className={styles.Plot}>
      <div className={styles.Buttons}>
        <ClickDrag
          onValueChange={setZoom}
          updateValue={updateZoom}
          formatter={formatZoom}
          value={zoom}
        />
        <ClickDrag
          onValueChange={(new_scale) => { 
            setScale(new_scale);
            props.onScaleChange(new_scale);}}
          updateValue={updateScale}
          formatter={formatScale}
          value={scale}
        />
      </div>
      <div className={styles.Canvas}>
        <Canvas
          draw={(canvasRef) => renderCanvas(canvasRef, props.paths, zoom, props.line_props)}
        />
      </div>
      <div className={styles.BackgroundCanvas}>
        <Canvas
          draw={(canvasRef) => {drawGrid(canvasRef, zoom, gridline_prop);}}
        />
      </div>
    </div>
  );
}

export default Plot;
