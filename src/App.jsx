import React from 'react';
import Plot from './Plot';
import { clearScreen, returnCircle, transformFunc, drawCurve, drawCircle } from './MathFunctions';


function App() {

  const [plot_1_val, setPlot1Val] = React.useState(50);
  const [plot_1_zoom, setPlot1Zoom] = React.useState(50);
  const [plot_2_val, setPlot2Val] = React.useState(50);
  const [plot_2_zoom, setPlot2Zoom] = React.useState(50);

  const pts = returnCircle(plot_1_val);
  const func_pts = pts.map(transformFunc);

  return (
    <div className="App">
      <Plot
        slider_value={plot_1_val}
        onSliderChange={(e) => setPlot1Val(e.target.value)}
        zoom_value={plot_1_zoom}
        onZoomChange={(e) => setPlot1Zoom(e.target.value)}
        draw={(canvasRef) => {
          clearScreen(canvasRef);
          drawCircle(canvasRef, plot_1_val);}
             }
      />
      <Plot
        slider_value={plot_2_val}
        onSliderChange={(e) => setPlot2Val(e.target.value)}
        zoom_value={plot_2_zoom}
        onZoomChange={(e) => setPlot2Zoom(e.target.value)}
        draw={(canvasRef) => {
          clearScreen(canvasRef);
          drawCurve(canvasRef, func_pts);
          drawCircle(canvasRef, plot_1_val*plot_2_val);}
             }
      />
    </div>
  );
}

export default App;
