import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Puzzle from "./Puzzle";

function PuzzleOverlay(props) {
  const [showModal, setShowModal] = useState(props.showModal);

  function afterOpenModal() {
    
  }

  function closeModal() {
    setShowModal(false);
  }

  useEffect(()=>{
    setShowModal(props.showModal);
  }, [props, setShowModal]);


  return(
    <Modal
      isOpen={showModal}
      onAfterOpen={afterOpenModal}
      style={{overlay: {backgroundColor: "#ffffff3f"}}}
      contentLabel="Example Modal"
      className="puzzle-modal"
    >
      <div className="puzzle-container">
        <Puzzle
          staticSquares={[[0,0,-2]]}
          colorList={["black", "white", "red"]}
          rows="4"
          cols="4"
          onSolvePuzzle={closeModal}
          solution={[[-2, 0, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]}
        />
        <button className="close-puzzle-button" onClick={closeModal}>
          Close Modal
        </button>
      </div>
      
    </Modal>
  )
}

export default PuzzleOverlay;