import React from 'react';
import styles from './Plot.module.css';
import Canvas from './Canvas';
import ClickDrag from './ClickDrag';
import { renderCanvas, createGridlinePaths } from './Render';

function Plot(props) {

  const min_zoom = 0.01;
  const min_scale = 0;

  function drawGrid(canvasRef, zoom) {
    const grid_paths = createGridlinePaths(canvasRef, 0.2, zoom);
    const num_paths = grid_paths.length;
    let line_props = Array(num_paths);
    line_props.fill( [{strokeStyle: "#000000", lineWidth: 3}] );
    renderCanvas(canvasRef, grid_paths, zoom, line_props);
  }

  const [last_zoom, setLastZoom] = React.useState(1);
  const [zoom, setZoom] = React.useState(1);
  const [zoom_clicked, setZoomClicked] = React.useState(false);
  const [zoom_initial_point, setZoomInitialPoint] = React.useState({x: 0, y: 0});

  const [last_scale, setLastScale] = React.useState(1);
  const [scale, setScale] = React.useState(1);
  const [scale_clicked, setScaleClicked] = React.useState(false);
  const [scale_initial_point, setScaleInitialPoint] = React.useState({x: 0, y: 0});

  function handleMouseUnclick() {
    if (props.mouse_clicked) {
      return;
    }
    setZoomClicked(false);
    setScaleClicked(false);
  }

  function handleMousePosChange() {

    if (zoom_clicked) {
      const new_zoom = last_zoom
            + (props.mouse_pos.x - zoom_initial_point.x) / 100;
      if (new_zoom > min_zoom) {
        setZoom(new_zoom);
      }
    }

    if (scale_clicked) {
      const new_scale = last_scale
            + (props.mouse_pos.x - scale_initial_point.x) / 100;
      if (new_scale > min_scale) {
        setScale(new_scale);
        props.onScaleChange(scale);
      }
    }
  }

  function handleZoomMouseDown(event) {
    setZoomClicked(true);
    setZoomInitialPoint(props.mouse_pos);
    setLastZoom(zoom);
  }

  function handleScaleMouseDown(event) {
    setScaleClicked(true);
    setScaleInitialPoint(props.mouse_pos);
    setLastScale(scale);
  }

  React.useEffect(handleMousePosChange, [props.mouse_pos]);
  React.useEffect(handleMouseUnclick, [props.mouse_clicked]);

  return (
    <div className={styles.Plot}>
      <div className={styles.Buttons}>
        <ClickDrag
          onMouseDown={handleZoomMouseDown}
          value={`Zoom: ${Number(zoom*100).toFixed(0)}%`}
        />
        <ClickDrag
          onMouseDown={handleScaleMouseDown}
          value={`Scale: ${Number(scale).toExponential(2)}`}
        />
      </div>
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
