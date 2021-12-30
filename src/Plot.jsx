import React from 'react';
import Canvas from './Canvas';

function Plot(props) {

  return (
    <div className="Plot">
      <h1>
        Circle Size: {props.slider_value}
      </h1>
      <h1>
        Zoom Value: {props.zoom_value}
      </h1>
      <input
        type="range"
        min="1"
        max="100"
        onInput={props.onZoomChange}
      />
      <Canvas
        draw={props.draw}
      />
      <input
        type="range"
        min="1"
        max="100"
        onInput={props.onSliderChange}
      />
    </div>
  );
}


export default Plot;
