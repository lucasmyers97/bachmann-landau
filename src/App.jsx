import React from 'react';
import style from './App.module.css';
import Plot from './Plot';
import ClickDrag from './ClickDrag';
import { returnCircle, transformFunc } from './MathFunctions';

function App() {

  const [plot_1_val, setPlot1Val] = React.useState(0.5);
  const [plot_2_val, setPlot2Val] = React.useState(0.5);

  // handle mouse events
  const [mouse_pos, setMousePos] = React.useState({x: 0, y: 0});
  const [mouse_clicked, setMouseClicked] = React.useState(false);
  function handleMouseMove(event) {
    setMousePos({x: event.pageX, y: event.pageY});
  }
  function handleMouseUp(event) {
    setMouseClicked(false);
  }
  function handleMouseDown(event) {
    setMouseClicked(true);
  }

  const pts = returnCircle(plot_1_val);
  const func_pts = pts.map(transformFunc);
  const new_pts = returnCircle(plot_1_val*plot_2_val);
  const line_props = [{strokeStyle: "#0000FF", lineWidth: 6},
                      {strokeStyle: "#FF0000", lineWidth: 6}];

  return (
    <div
      className={style.App}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Plot
        slider_value={plot_1_val}
        onScaleChange={(scale) => setPlot1Val(scale)}
        paths={[pts]}
        line_props={line_props}
        mouse_clicked={mouse_clicked}
        mouse_pos={mouse_pos}
      />
      <Plot
        slider_value={plot_2_val}
        onScaleChange={(scale) => setPlot2Val(scale)}
        paths={[func_pts, new_pts]}
        line_props={line_props}
        mouse_clicked={mouse_clicked}
        mouse_pos={mouse_pos}
      />
    </div>
  );
}

export default App;
