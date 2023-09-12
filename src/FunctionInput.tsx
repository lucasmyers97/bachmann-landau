import React from 'react';

interface FunctionInputProps {
    onValueChange(new_value: string) : void;
}

function FunctionInput({ onValueChange } : FunctionInputProps) {

  function getInputKeyboard(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onValueChange(String(event.target.value));
    }
  }

  function getInputBlur(event: React.FocusEvent<HTMLInputElement>) {
      onValueChange(String(event.target.value));
  }

  return (
    <div>
      <input
        type="text"
        onKeyDown={getInputKeyboard}
        onBlur={getInputBlur}
      />
    </div>
  );
}

export default FunctionInput;
