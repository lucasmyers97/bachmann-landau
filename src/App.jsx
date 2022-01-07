import React from 'react';
import style from './App.module.css';
import Plot from './Plot';
import { returnCircle, transformFunc } from './MathFunctions';

function App() {

  const [plot_1_val, setPlot1Val] = React.useState(0.5);
  const [plot_2_val, setPlot2Val] = React.useState(0.5);

  const pts = returnCircle(plot_1_val);
  const func_pts = pts.map(transformFunc);
  const new_pts = returnCircle(plot_1_val*plot_2_val);

  return (
    <div className={style.App}>
      <Plot
        slider_value={plot_1_val}
        onSliderChange={(e) => setPlot1Val(e.target.value)}
        paths={[pts]}
      />
      <Plot
        slider_value={plot_2_val}
        onSliderChange={(e) => setPlot2Val(e.target.value)}
        paths={[func_pts, new_pts]}
      />
    </div>
  );
}

export default App;
