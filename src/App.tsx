import React from 'react';
import * as MathJax from '@nteract/mathjax';
import { compile, parse } from 'mathjs';

import { returnCircle } from './MathFunctions';

import style from './App.module.css';
import Input2DFunction from './Input2DFunction';
import InteractivePlot from './InteractivePlot';

interface Point {
    x: number;
    y: number;
}

function App() {

  const [input_circle_radius, setInputCircleRadius] = React.useState(1.0);

  // handle textbox events
  const [x_textbox_value, setXTextboxValue] = React.useState("0");
  const [y_textbox_value, setYTextboxValue] = React.useState("0");

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

  function textTo2DTex(x_textbox_value: string, y_textbox_value: string) {
      const x_tex = parse(x_textbox_value).toTex();
      const y_tex = parse(y_textbox_value).toTex();

      return `f(x) = \\begin{bmatrix} ${x_tex} \\\\ ${y_tex} \\end{bmatrix}`;
  }

  const input_circle = returnCircle(input_circle_radius);
  const func_pts = input_circle.map(getFuncExpression(x_textbox_value, y_textbox_value));
  const line_props = [{strokeStyle: "#0000FF", lineWidth: 6},
                      {strokeStyle: "#FF0000", lineWidth: 6}];


  return (
    <div
      className={style.App}
    >
      <Input2DFunction
        onXValueChange={setXTextboxValue}
        onYValueChange={setYTextboxValue}
        display_value={<MathJax.Node>{textTo2DTex(x_textbox_value, y_textbox_value)}</MathJax.Node>}
      />
      <div
        className={style.Plots}
      >
        <InteractivePlot
          onScaleChange={(scale: number) => setInputCircleRadius(scale)}
          paths={[func_pts, input_circle]}
          line_props={line_props}
        />
      </div>
    </div>
  );
}

export default App;
