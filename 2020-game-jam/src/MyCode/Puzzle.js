import React, { useState, useEffect } from "react";
import PuzzleButton from "./PuzzleButton";

function initialArray(props) {
  let puzzleArray = []
  for (let i = 0; i < props.rows; i++) {
    let temp = []
    for (let j = 0; j < props.cols; j++) {
      temp.push(0);
    }
    puzzleArray.push(temp);
  }

  for (let i = 0; i < props.staticSquares.length; i++) {
    let S = props.staticSquares[i]
    puzzleArray[S[0]][S[1]] = S[2];
  }

  return puzzleArray
}



function Puzzle(props) {
  const [squareValues, setSquareValues] = useState(initialArray(props));
  const onSolvePuzzle = props.onSolvePuzzle;
  const solution = props.solution;
  function renderSquare(r, c) {
    let value = squareValues[r][c];
    return (<PuzzleButton
      static={value < 0}
      staticColor={-value}
      colorList={props.colorList}
      onClick={(newC) => {
        let newSquareValues = [].concat(squareValues);
        newSquareValues[r][c] = newC;
        setSquareValues(newSquareValues);

      }}
    />);
  }

  useEffect(()=>{
    if (Object.keys(squareValues).reduce((a, e) => a && Object.keys(squareValues[e]).reduce((b, f) => b && (squareValues[e][f] === solution[e][f]), true), true)){
      onSolvePuzzle()
    }
  }, [onSolvePuzzle, squareValues, solution])

  return(
    <table className="puzzle" cellSpacing="0" cellPadding="0">
      <thead>
        <tr>
          {Object.keys(squareValues[0]).map(c=><th key={c}/>)}
        </tr>
      </thead>
      <tbody>
        {Object.keys(squareValues).map(e => <tr key={e}>{Object.keys(squareValues[e]).map(f => <td className="puzzle-td" key={f}>{renderSquare(e,f)}</td>)}</tr>)}
      </tbody>
    </table>
  )
}

export default Puzzle;