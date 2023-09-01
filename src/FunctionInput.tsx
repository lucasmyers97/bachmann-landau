import React from 'react';
import style from './FunctionInput.module.css';

interface FunctionInputProps {
    onEnter(event: React.KeyboardEvent<HTMLInputElement>) : void;
}

function FunctionInput({ onEnter } : FunctionInputProps) {

  function getInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onEnter(event);
    }
  }

  return (
    <div className={style.FunctionInput}>
      <input
        type="text"
        onKeyDown={getInput}
      />
    </div>
  );
}

export default FunctionInput;
