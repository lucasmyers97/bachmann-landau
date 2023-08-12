import React from 'react';
import MathJax from '@nteract/mathjax';
import FunctionInput from './FunctionInput';

interface Input2DFunctionProps {
    handleXTextboxEnter(event: React.KeyboardEvent<HTMLInputElement>) : void;
    handleYTextboxEnter(event: React.KeyboardEvent<HTMLInputElement>) : void;
    x_textbox_value : React.ReactElement<any, any>;
    y_textbox_value : React.ReactElement<any, any>;
}

function Input2DFunction({ handleXTextboxEnter,
                           handleYTextboxEnter,
                           x_textbox_value,
                           y_textbox_value } : Input2DFunctionProps) {

  return (
    <div>
      <FunctionInput
        onEnter={handleXTextboxEnter}
        value={x_textbox_value}
      />
      <FunctionInput
        onEnter={handleYTextboxEnter}
        value={y_textbox_value}
      />
    </div>
  );
}

export default Input2DFunction;
