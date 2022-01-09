import React from 'react';
import FunctionInput from './FunctionInput';

function Input2DFunction({ handleXTextboxEnter,
                           handleYTextboxEnter,
                           x_textbox_value,
                           y_textbox_value }) {

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
