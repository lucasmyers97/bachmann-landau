import React from 'react';

function Canvas(props) {

  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    props.draw(canvasRef);
  });

  return (
    <canvas
      ref={canvasRef}
    />
  );
}

export default Canvas
