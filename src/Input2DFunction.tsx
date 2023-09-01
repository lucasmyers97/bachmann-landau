import React from 'react';
import MathJax from '@nteract/mathjax';
import FunctionInput from './FunctionInput';
import style from './Input2DFunction.module.css';

interface Input2DFunctionProps {
    handleXTextboxEnter(event: React.KeyboardEvent<HTMLInputElement>) : void;
    handleYTextboxEnter(event: React.KeyboardEvent<HTMLInputElement>) : void;
    display_value : React.ReactElement<any, any>;
}

function Input2DFunction({ handleXTextboxEnter,
                           handleYTextboxEnter,
                           display_value } : Input2DFunctionProps) {

  return (
    <div className={style.Input2DFunction}>
      <div className={style.FunctionInputs}>
        <FunctionInput onEnter={handleXTextboxEnter}/>
        <FunctionInput onEnter={handleYTextboxEnter}/>
      </div>
      <p className={style.FunctionDisplay}>
        {display_value}
      </p>
    </div>
  );
}

export default Input2DFunction;
