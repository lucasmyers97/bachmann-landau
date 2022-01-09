import React from 'react';
import style from './App.module.css';
import Plot from './Plot';
import ClickDrag from './ClickDrag';
import { returnCircle, transformFunc } from './MathFunctions';

function App() {

  const [plot_1_val, setPlot1Val] = React.useState(0.5);
  const [plot_2_val, setPlot2Val] = React.useState(0.5);

  const [current_click_pos, setCurrentClickPos] = React.useState({x: 0, y: 0});
  const [button_clicked, setButtonClicked] = React.useState(false);
  const [button_value, setButtonValue] = React.useState(0);

  function handleMouseMove(event) {
    setCurrentClickPos({x: event.pageX, y: event.pageY});
    if (button_clicked) {
      setButtonValue(current_click_pos.x);
    }
  }

  function handleMouseUp(event) {
    setButtonClicked(false);
  }

  const pts = returnCircle(plot_1_val);
  const func_pts = pts.map(transformFunc);
  const new_pts = returnCircle(plot_1_val*plot_2_val);
  const line_props = [{strokeStyle: "#0000FF", lineWidth: 6},
                      {strokeStyle: "#FF0000", lineWidth: 6}];

  return (
    <div
      className={style.App}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Plot
        slider_value={plot_1_val}
        onSliderChange={(e) => setPlot1Val(e.target.value)}
        paths={[pts]}
        line_props={line_props}
      />
      <Plot
        slider_value={plot_2_val}
        onSliderChange={(e) => setPlot2Val(e.target.value)}
        paths={[func_pts, new_pts]}
        line_props={line_props}
      />
      <ClickDrag
        onMouseDown={() => setButtonClicked(true)}
        value={button_value}
      />
    </div>
  );
}

export default App;
