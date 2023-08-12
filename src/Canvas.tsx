import React from 'react';
import styles from './Canvas.module.css';

interface CanvasProp {
    draw(canvasRef: React.RefObject<HTMLCanvasElement>) : void;
}

function Canvas(props: CanvasProp) {

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    props.draw(canvasRef);
  }, [props.draw]);

  return (
    <div className={styles.Canvas}>
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
