import React from 'react';

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
    <div>
      <input
        type="text"
        onKeyDown={getInput}
      />
    </div>
  );
}

export default FunctionInput;
