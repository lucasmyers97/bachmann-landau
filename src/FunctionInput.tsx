import React from 'react';

interface FunctionInputProps {
    onValueChange(new_value: string) : void;
}

function FunctionInput({ onValueChange } : FunctionInputProps) {

  function getInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onValueChange(String(event.target.value));
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
