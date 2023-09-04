import React from 'react';
import style from './ClickDrag.module.css';

/**
 * User clicks and drags on the element to change the numerical value therein.
 * Parent specifies how to update and format the value.
 *
 * @param onValueChange: 
 * Called whenever `value` is changed
 *
 * @param updateValue: 
 * Takes last value before click, and change in x-coordinate since click, and
 * determines how to update the value
 *
 * @param formatter:
 * Takes value as a number and returns a formatted string
 *
 * @param value:
 * Numerical value of the `ClickDrag` component.
 */
interface ClickDragProps {
    onValueChange(new_value: number) : void;
    updateValue(last_value: number, delta_x: number) : number;
    formatter(print_value: number) : string;
    value : number;
}

function ClickDrag(props: ClickDragProps) {

  const [last_value, setLastValue] = React.useState(props.value);
  const [clicked, setClicked] = React.useState(false);
  const [click_initial_point, setClickInitialPoint] = React.useState({x: 0, y: 0});

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    (event.target as HTMLDivElement).setPointerCapture(event.pointerId);
    setClicked(true);
    setClickInitialPoint({x: event.pageX, y: event.pageY});
    setLastValue(props.value);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!clicked) {
        return;
    }

    const current_point = {x: event.pageX, y: event.pageY}; 
    const delta_x = current_point.x - click_initial_point.x;
    props.onValueChange( props.updateValue(last_value, delta_x) );
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    (event.target as HTMLDivElement).releasePointerCapture(event.pointerId);
    setClicked(false);
    setLastValue(props.value);
  }

  return (
    <div
      className={style.ClickDrag}
      onChange={(e) => props.onValueChange( parseFloat((e.target as HTMLInputElement).value) )}
      onPointerDown={(e) => handlePointerDown(e)}
      onPointerMove={(e) => handlePointerMove(e)}
      onPointerUp={(e) => handlePointerUp(e)}
    >
        {props.formatter(props.value)}
    </div>
  );
}

export default ClickDrag;
