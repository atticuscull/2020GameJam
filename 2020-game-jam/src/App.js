import React, { useEffect, useState } from 'react';
import './App.css';
import GameStage from './MyCode/GameStage';
import PuzzleOverlay from './MyCode/PuzzleOverlay';

function App() {
  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
  const [ windowHeight, setWindowHeight ] = useState(window.innerHeight);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }

  useEffect(()=>{
    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="App">
      <GameStage width={windowWidth-1} height={windowHeight-3}/>
      <PuzzleOverlay
        showModal={true}
        solution={[[-2, 0, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]}
        staticSquares={[[0, 0, -2]]}
        colorList={["black", "white", "red"]}
        rows="4"
        cols="4"
      ></PuzzleOverlay>
    </div>
  );
}

export default App;
