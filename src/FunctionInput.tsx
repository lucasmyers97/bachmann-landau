import React from 'react';
import style from './FunctionInput.module.css';


interface FunctionInputProps {
    onEnter(event: React.KeyboardEvent<HTMLInputElement>) : void;
    value: React.ReactElement<any, any>;
}

function FunctionInput({ onEnter, value } : FunctionInputProps) {

  function getInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onEnter(event);
    }
  }

  return (
    <div
      className={style.FunctionInput}
    >
      <input
        type="text"
        onKeyDown={getInput}
      />
      <p
        className={style.Equation}
      >
        {value}
      </p>
    </div>
  );
}

export default FunctionInput;
