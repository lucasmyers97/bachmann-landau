import React from 'react';

function FunctionInput({ onEnter, value }) {

  function getInput(event) {
    if (event.keyCode === 13) {
      onEnter(event);
    }
  }

  return (
    <div>
      <input
        type="text"
        onKeyDown={getInput}
      />
      <p>
        {value}
      </p>
    </div>
  );
}

export default FunctionInput;
