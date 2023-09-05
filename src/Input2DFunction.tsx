import React from 'react';
import MathJax from '@nteract/mathjax';
import FunctionInput from './FunctionInput';
import style from './Input2DFunction.module.css';

interface Input2DFunctionProps {
    display_value : React.ReactElement<any, any>;
    onXValueChange(new_value: string): void;
    onYValueChange(new_value: string): void;
}

function Input2DFunction({ display_value,
                           onXValueChange,
                           onYValueChange} : Input2DFunctionProps) {

  return (
    <div className={style.Input2DFunction}>
      <div className={style.FunctionInputs}>
        <FunctionInput onValueChange={onXValueChange}/>
        <FunctionInput onValueChange={onYValueChange}/>
      </div>
      <p className={style.FunctionDisplay}>
        {display_value}
      </p>
    </div>
  );
}

export default Input2DFunction;
