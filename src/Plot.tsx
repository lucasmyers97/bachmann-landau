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
      const d_zoom = (props.mouse_pos.x - zoom_initial_point.x) / 100;
      const new_zoom = last_zoom*(1 + d_zoom);
      if (new_zoom > min_zoom) {
        setZoom(new_zoom);
      }
    }

    if (scale_clicked) {
      const d_scale = (props.mouse_pos.x - scale_initial_point.x) / 100;
      const new_scale = last_scale*(1 + d_scale);
      if (new_scale > min_scale) {
        setScale(new_scale);
        props.onScaleChange(scale);
      }
    }
  }

  function handleZoomMouseDown() {
    setZoomClicked(true);
    setZoomInitialPoint(props.mouse_pos);
    setLastZoom(zoom);
  }

  function handleScaleMouseDown() {
    setScaleClicked(true);
    setScaleInitialPoint(props.mouse_pos);
    setLastScale(scale);
  }

  React.useEffect(handleMousePosChange, [props.mouse_pos]);
  React.useEffect(handleMouseUnclick, [props.mouse_clicked]);


  // Actual component
  return (
    <div className={styles.Plot}>
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
