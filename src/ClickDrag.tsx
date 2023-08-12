import React from 'react';
import style from './ClickDrag.module.css';

interface ClickDragProps {
    onMouseDown(event: React.MouseEvent<HTMLDivElement>) : void;
    value : string;
}

function ClickDrag(props: ClickDragProps) {

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
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
