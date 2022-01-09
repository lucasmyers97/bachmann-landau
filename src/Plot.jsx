import React from 'react';
import styles from './Plot.module.css';
import Canvas from './Canvas';
import { renderCanvas, createGridlinePaths } from './Render';

function Plot(props) {

  function drawGrid(canvasRef, zoom) {
    const grid_paths = createGridlinePaths(canvasRef, 0.2, zoom);
    const num_paths = grid_paths.length;
    let line_props = Array(num_paths);
    line_props.fill( [{strokeStyle: "#000000", lineWidth: 3}] );
    renderCanvas(canvasRef, grid_paths, zoom, line_props);
  }

  const [zoom, setZoom] = React.useState(1);

  return (
    <div className={styles.Plot}>
      <label
        className={styles.ZoomLabel}
        htmlFor="zoomInput"
      >
        {Number(zoom*100).toFixed(0)}%
      </label>
      <input
        id="zoomInput"
        className={styles.ZoomSlider}
        type="range"
        min="0.1"
        max="2"
        step="0.01"
        onInput={(event) => setZoom(event.target.value)}
      />
      <label
        className={styles.NormLabel}
        htmlFor="circleSize">
        {Number(props.slider_value*100).toExponential(2)}
      </label>
      <input
        id="circleSize"
        className={styles.NormSlider}
        type="range"
        min="0"
        max="1"
        step="0.01"
        onInput={props.onSliderChange}
      />
      <div className={styles.Canvas}>
        <Canvas
          draw={(canvasRef) => renderCanvas(canvasRef, props.paths, zoom, props.line_props)}
        />
      </div>
      <div className={styles.BackgroundCanvas}>
        <Canvas
          draw={(canvasRef) => {drawGrid(canvasRef, zoom);}}
        />
      </div>
    </div>
  );
}

export default Plot;
