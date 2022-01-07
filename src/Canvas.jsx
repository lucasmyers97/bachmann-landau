import React from 'react';
import styles from './Canvas.module.css';

function Canvas(props) {

  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    props.draw(canvasRef);
  });

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
