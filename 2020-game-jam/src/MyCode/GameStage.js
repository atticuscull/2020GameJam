import React, { useRef, useEffect, useState } from "react";

function findDirection(keyState) {
  let retdir = "";
  if (keyState.mainKey === 87){
    retdir += "up"
  }
  if (keyState.mainKey === 83) {
    retdir += "down"
  }
  if (keyState.secondaryKey === 87) {
    retdir += "up"
  }
  if (keyState.secondaryKey === 83) {
    retdir += "down"
  }
  if (keyState.mainKey === 65) {
    retdir += "left"
  }
  if (keyState.mainKey === 68) {
    retdir += "right"
  }
  if (keyState.secondaryKey === 65) {
    retdir += "left"
  }
  if (keyState.secondaryKey === 68) {
    retdir += "right"
  }
  if(retdir === ""){
    retdir = "center";
  }
  return retdir;
}

function GameStage(props) {
  const canvasRef = useRef(null);
  const [keyState, setKeyState] = useState({ keysDown: 0, mainKey: "", secondaryKey: "" });
  const [changeState, setChangeState ] = useState("");

  const handleKeyDown = e => {
    if (!e.repeat) {
      setChangeState(e.keyCode.toString() + ",down");
    }
  }

  const handleKeyUp = e => {
    setChangeState(e.keyCode.toString() + ",up");
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  }, []);

  useEffect(() => {
    const { width, height } = props;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawCharacter = (ctx, direction) => {
      ctx.fillStyle = '#000000';
      ctx.translate(width / 2, height / 2);
      if(direction === "center") {
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(10, 0);
        ctx.lineTo(0, 10);
        ctx.lineTo(-10, 0);
        ctx.lineTo(0, -10);
        ctx.fill();
      } else {
        const QPI = Math.PI / 4;
        let angle = 0;
        switch (direction) {
          case "up":
            angle = 0;
            break;
          case "updown":
            angle = 0;
            break;
          case "upleft":
            angle = -QPI;
            break;
          case "left":
            angle = -2 * QPI;
            break;
          case "leftright":
            angle = -2 * QPI
            break;
          case "downleft":
            angle = -3 * QPI;
            break;
          case "down":
            angle = 4 * QPI;
            break;
          case "downup":
            angle = 4 * QPI;
            break;
          case "downright":
            angle = 3 * QPI;
            break;
          case "right":
            angle = 2 * QPI;
            break;
          case "rightleft":
            angle = 2 * QPI;
            break;
          case "upright":
            angle = QPI;
            break;
          
          default:
            angle = 0
        }

        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-5, 10);
        ctx.lineTo(0, -20);
        ctx.lineTo(5, 10);
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.rotate(-angle);
        
      }
      ctx.translate(-width / 2, -height / 2);
      
    }

    const draw = ctx => {
      ctx.fillStyle = '#ff00ff';
      ctx.fillRect(0, 0, width, height);
      drawCharacter(ctx, findDirection(keyState));
    }

    draw(context);
  }, [keyState, props]);

  useEffect(()=>{
    if(changeState !== "") {
      let change = changeState.split(",");
      let code = parseInt(change[0]);
      let NKS = {};
      if(change[1] === "up"){
        if (code === keyState.mainKey) {
          NKS.keysDown = keyState.keysDown - 1;
          NKS.mainKey = keyState.secondaryKey;
          NKS.secondaryKey = "";
          setKeyState(NKS);
        } else if (code === keyState.secondaryKey) {
          NKS.keysDown = keyState.keysDown - 1;
          NKS.mainKey = keyState.mainKey;
          NKS.secondaryKey = "";
          setKeyState(NKS);
        }
      }
      if (change[1] === "down" && keyState.keysDown < 2) {
        NKS.secondaryKey = keyState.mainKey;
        NKS.mainKey = code;
        NKS.keysDown = keyState.keysDown + 1;
        setKeyState(NKS);
      
      }
      setChangeState("");
    }

  }, [changeState, setChangeState, setKeyState, keyState])

  return(
    <div>
      <canvas ref={canvasRef} width={props.width} height={props.height}/>
    </div>
  )
}


export default GameStage;