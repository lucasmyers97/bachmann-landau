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

  function handleScroll(e: React.WheelEvent<HTMLInputElement>) {
    const new_zoom = zoom * (1 - e.deltaY * 0.001);
    setZoom(new_zoom > 0.001 ? new_zoom : 0.001);
  }

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

  // Handle pinch zoom
  const [touch_cache, setTouchCache] = React.useState<React.PointerEvent<HTMLInputElement>[]>([]);
  const [pointer_distance, setPointerDistance] = React.useState(0);

  function dist(x1: number, x2: number, y1: number, y2: number) {
      return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
  }

  function pointerDownHandler(e: React.PointerEvent<HTMLInputElement>) {
      const new_touch_cache = touch_cache.concat(e);
      setTouchCache(new_touch_cache);
      if (new_touch_cache.length === 2) {
          setPointerDistance( dist(new_touch_cache[0].clientX,
                                   new_touch_cache[1].clientX,
                                   new_touch_cache[0].clientY,
                                   new_touch_cache[1].clientY) );
      }
  }

  function pointerMoveHandler(e: React.PointerEvent<HTMLInputElement>) {
    const new_touch_cache = touch_cache.map(v => {
            if (v.pointerId === e.pointerId) {
                return e;
            } else {
                return v;
            }
        });
    setTouchCache(new_touch_cache);

    // If two pointers are down, check for pinch gestures
    if (touch_cache.length === 2) {
      // Calculate the distance between the two pointers
      const new_pointer_distance = dist(touch_cache[0].clientX,
                                        touch_cache[1].clientX,
                                        touch_cache[0].clientY,
                                        touch_cache[1].clientY) 

      setZoom( updateZoom(zoom, new_pointer_distance - pointer_distance) );

      setPointerDistance(new_pointer_distance);
    }
  }

  function pointerUpHandler(e: React.PointerEvent<HTMLInputElement>) {
    const new_touch_cache = touch_cache.filter(v => v.pointerId !== e.pointerId);
    setTouchCache(new_touch_cache);
  }

  // Actual component
  return (
    <div 
      className={styles.InteractivePlot}
      onWheelCapture={handleScroll}
      onPointerUp={pointerUpHandler}
      onPointerCancel={pointerUpHandler}
      onPointerLeave={pointerUpHandler}
      onPointerOut={pointerUpHandler}
      onPointerDown={pointerDownHandler}
      onPointerMove={pointerMoveHandler}>
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
