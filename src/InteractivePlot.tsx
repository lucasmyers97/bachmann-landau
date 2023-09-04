import React from 'react';
import Plot from './Plot';
import ClickDrag from './ClickDrag';

import styles from './InteractivePlot.module.css';

/**
 * Takes an array of sets of points in real space, a set of line properties,
 * and a scale, and then plots them.
 */
interface InteractivePlotProps {
    onScaleChange(new_scale: number): void;
    paths: {x: number, y: number}[][];
    line_props: {strokeStyle: string, lineWidth: number}[];
}

function InteractivePlot(props: InteractivePlotProps) {

  const min_zoom = 0.01;
  const min_scale = 0;

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
    <div className={styles.InteractivePlot}>
      <Plot 
        zoom={zoom}
        paths={props.paths}
        line_props={props.line_props}
      />
      <div className={styles.ClickDrags}>
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
    </div>
  );
}

export default InteractivePlot;
