import React from 'react';
import style from './ClickDrag.module.css';

function ClickDrag(props) {

  function handleMouseDown(event) {
    props.onMouseDown(event)
  }

  return (
    <div
      className={style.ClickDrag}
      onMouseDown={(event) => handleMouseDown(event)}
    >
        {props.value}
    </div>
  );
}

export default ClickDrag;
