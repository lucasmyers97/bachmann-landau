import React from 'react';
import * as MathJax from '@nteract/mathjax';
import { compile, parse } from 'mathjs';

import { returnCircle } from './MathFunctions';

import style from './App.module.css';
import Plot from './Plot';
import FunctionInput from './FunctionInput';
import Input2DFunction from './Input2DFunction';

interface Point {
    x: number;
    y: number;
}

function App() {

  const [plot_1_val, setPlot1Val] = React.useState(1);
  const [plot_2_val, setPlot2Val] = React.useState(1);

  // handle mouse events
  const [mouse_pos, setMousePos] = React.useState({x: 0, y: 0});
  const [mouse_clicked, setMouseClicked] = React.useState(false);
  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    setMousePos({x: event.pageX, y: event.pageY});
  }
  function handleMouseUp() {
    setMouseClicked(false);
  }
  function handleMouseDown() {
    setMouseClicked(true);
  }

  // handle textbox events
  const [x_textbox_value, setXTextboxValue] = React.useState("0");
  const [y_textbox_value, setYTextboxValue] = React.useState("0");
  function handleXTextboxEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    setXTextboxValue(String(event.target.value));
  }
  function handleYTextboxEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    setYTextboxValue(String(event.target.value));
  }
  function getFuncExpression(x_expr: string, y_expr: string) {

    const x_func = compile(x_expr);
    const y_func = compile(y_expr);
    const func = (pt: Point) => {
      return ({
        x: x_func.evaluate(pt),
        y: y_func.evaluate(pt)
      });
    };

    return func;
  }

  const pts = returnCircle(plot_1_val);
  const func_pts = pts.map(getFuncExpression(x_textbox_value,y_textbox_value));
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
      <div>
        <Input2DFunction
          handleXTextboxEnter={handleXTextboxEnter}
          handleYTextboxEnter={handleYTextboxEnter}
          x_textbox_value={<MathJax.Node>{parse(x_textbox_value).toTex()}</MathJax.Node>}
          y_textbox_value={<MathJax.Node>{parse(y_textbox_value).toTex()}</MathJax.Node>}
        />
      </div>
      <div
        className={style.Plots}
      >
        <Plot
          // slider_value={plot_1_val}
          onScaleChange={(scale: number) => setPlot1Val(scale)}
          paths={[pts]}
          line_props={line_props}
          mouse_clicked={mouse_clicked}
          mouse_pos={mouse_pos}
        />
        <Plot
          // slider_value={plot_2_val}
          onScaleChange={(scale: number) => setPlot2Val(scale)}
          paths={[func_pts, new_pts]}
          line_props={line_props}
          mouse_clicked={mouse_clicked}
          mouse_pos={mouse_pos}
        />
      </div>
    </div>
  );
}

export default App;
