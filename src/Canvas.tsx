import React from 'react';
import styles from './Canvas.module.css';

/**
 * Takes a function `draw` which draws something on the canvas by using it
 * as a plain DOM element.
 */
interface CanvasProp {
    draw(canvasRef: React.RefObject<HTMLCanvasElement>) : void;
}

function Canvas(props: CanvasProp) {

  /* useRef gives a reference to the DOM element, literally identical to document.getElementByID */
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  /* runs props.draw every time props.draw changes */
  React.useEffect(() => {props.draw(canvasRef);}, [props.draw]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="1000"
        height="1000"
        className={styles.canvas}
      />
    </div>
  );
}

export default Canvas
