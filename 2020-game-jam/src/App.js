import React from 'react';
import './App.css';
import PuzzleOverlay from './MyCode/PuzzleOverlay';

function App() {
  return (
    <div className="App">
      <PuzzleOverlay showModal={true}></PuzzleOverlay>
    </div>
  );
}

export default App;
