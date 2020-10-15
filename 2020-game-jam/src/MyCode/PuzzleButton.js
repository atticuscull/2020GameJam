import React, { useState } from "react";

function PuzzleButton(props) {
  const [currentColor, setCurrentColor] = useState(0);

  if (props.static) {
    return (
      <button
        className="puzzle-button"
        style={{
          background: props.colorList[props.staticColor]
        }}
        onClick={()=>{}}
      />
    )
  } else {

    return (
      <button
        className="puzzle-button"
        style={{
          background: props.colorList[currentColor]
        }}
        onClick={
          () => {
            let newC = (currentColor + 1) % props.colorList.length
            setCurrentColor(newC);
            props.onClick(newC);
          }
        }
      > </button>
    )
  }
  
}
export default PuzzleButton;