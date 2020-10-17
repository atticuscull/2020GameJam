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
          staticSquares={props.staticSquares}
          colorList={props.colorList}
          rows={props.rows}
          cols={props.cols}
          onSolvePuzzle={closeModal}
          solution={props.solution}
        />
        <button className="close-puzzle-button" onClick={closeModal}>
          Close Modal
        </button>
      </div>
      
    </Modal>
  )
}

export default PuzzleOverlay;