import React from 'react';
import { Provider, Node } from '@nteract/mathjax';
import { compile, parse } from 'mathjs';

import { returnCircle } from './MathFunctions';

import style from './App.module.css';
import Plot from './Plot';
import FunctionInput from './FunctionInput';
import Input2DFunction from './Input2DFunction';

function App() {

  const [plot_1_val, setPlot1Val] = React.useState(1);
  const [plot_2_val, setPlot2Val] = React.useState(1);

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

  // handle textbox events
  const [x_textbox_value, setXTextboxValue] = React.useState(0);
  const [y_textbox_value, setYTextboxValue] = React.useState(0);
  function handleXTextboxEnter(event) {
    setXTextboxValue(event.target.value);
  }
  function handleYTextboxEnter(event) {
    setYTextboxValue(event.target.value);
  }
  function getFuncExpression(x_expr, y_expr) {

    const x_func = compile(x_expr);
    const y_func = compile(y_expr);
    const func = (pt) => {
      return ({
        x: x_func.evaluate(pt),
        y: y_func.evaluate(pt)
      });
    };

    return func;
  }

  const pts = returnCircle(plot_1_val);
  const func_pts = pts.map(getFuncExpression(x_textbox_value, y_textbox_value));
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
      <Input2DFunction
        handleXTextboxEnter={handleXTextboxEnter}
        handleYTextboxEnter={handleYTextboxEnter}
        x_textbox_value={<Node>{parse(x_textbox_value).toTex()}</Node>}
        y_textbox_value={<Node>{parse(y_textbox_value).toTex()}</Node>}
      />
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
