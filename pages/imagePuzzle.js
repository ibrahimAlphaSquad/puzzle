import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react'
import Stopwatch from './stopWatch';
import Welcome from './welcome';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ImagePuzzle() {

  // Modal
  const [welcomeModal, setWelcomeModal] = useState(false)
  const [puzzleDifficulty, setPuzzleDifficulty] = useState(null)
  const [puzzleSource, setpuzzleSource] = useState("")

  // Timer
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    // console.log(Math.floor((time / 60000) % 60))
    return () => clearInterval(interval);
  }, [running]);

  //Image Grid
  useEffect(() => {
    const PUZZLE_HOVER_TINT = "#6ec5eb";
    const img = new Image();
    const canvas = document.querySelector("#canvas");
    const stage = canvas.getContext("2d");
    let difficulty = puzzleDifficulty;
    // let difficulty = 2;
    let pieces;
    let puzzleWidth;
    let puzzleHeight;
    let pieceWidth;
    let pieceHeight;
    let currentPiece;
    let currentDropPiece;
    let mouse;
    img.addEventListener("load", onImage, false);
    // img.src = setRandomImage();
    img.src = puzzleSource;

    function initPuzzle() {
      pieces = [];
      mouse = {
        x: 0,
        y: 0
      };
      currentPiece = null;
      currentDropPiece = null;
      stage.drawImage(
        img,
        0,
        0,
        puzzleWidth,
        puzzleHeight,
        0,
        0,
        puzzleWidth,
        puzzleHeight
      );
      // createTitle("Click to Start Puzzle");
      buildPieces();

    }

    function setCanvas() {
      canvas.width = puzzleWidth;
      canvas.height = puzzleHeight;
      // stage.drawImage(
      //   img,
      //   0,
      //   0,
      //   puzzleWidth,
      //   puzzleHeight,
      //   0,
      //   0,
      //   puzzleWidth,
      //   puzzleHeight
      // );
      initPuzzle();

    }

    function onImage() {
      pieceWidth = window.matchMedia("(max-width: 768px)").matches
        ? Math.floor(370 / difficulty)
        : Math.floor(img.width / difficulty);
      pieceHeight = Math.floor(img.height / difficulty);
      puzzleWidth = pieceWidth * difficulty;
      puzzleHeight = pieceHeight * difficulty;
      setCanvas();
      initPuzzle();
    }

    // function createTitle(msg) {
    //   stage.fillStyle = "#000000";
    //   stage.globalAlpha = 0.4;
    //   stage.fillRect(100, puzzleHeight - 40, puzzleWidth - 200, 40);
    //   stage.fillStyle = "#FFFFFF";
    //   stage.globalAlpha = 1;
    //   stage.textAlign = "center";
    //   stage.textBaseline = "middle";
    //   stage.font = "20px Arial";
    //   stage.fillText(msg, puzzleWidth / 2, puzzleHeight - 20);
    // }

    function buildPieces() {
      let i;
      let piece;
      let xPos = 0;
      let yPos = 0;
      for (i = 0; i < difficulty * difficulty; i++) {
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        pieces.push(piece);
        xPos += pieceWidth;
        if (xPos >= puzzleWidth) {
          xPos = 0;
          yPos += pieceHeight;
        }
      }

      document.getElementById("createPuzzle").onpointerdown = shufflePuzzle;
    }

    function shufflePuzzle() {
      pieces = shuffleArray(pieces);
      stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
      let xPos = 0;
      let yPos = 0;
      for (const piece of pieces) {
        piece.xPos = xPos;
        piece.yPos = yPos;
        stage.drawImage(
          img,
          piece.sx,
          piece.sy,
          pieceWidth,
          pieceHeight,
          xPos,
          yPos,
          pieceWidth,
          pieceHeight
        );
        stage.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
        xPos += pieceWidth;
        if (xPos >= puzzleWidth) {
          xPos = 0;
          yPos += pieceHeight;
        }
      }
      document.onpointerdown = onPuzzleClick;
      // setTime(0);
    }

    function checkPieceClicked() {
      for (const piece of pieces) {
        if (
          mouse.x < piece.xPos ||
          mouse.x > piece.xPos + pieceWidth ||
          mouse.y < piece.yPos ||
          mouse.y > piece.yPos + pieceHeight
        ) {
          //PIECE NOT HIT
        } else {
          return piece;
        }
      }
      return null;
    }

    function updatePuzzle(e) {
      // console.log("----", e)
      currentDropPiece = null;
      if (e.layerX || e.layerX == 0) {
        mouse.x = e.layerX - canvas.offsetLeft;
        mouse.y = e.layerY - canvas.offsetTop;
      } else if (e.offsetX || e.offsetX == 0) {
        mouse.x = e.offsetX - canvas.offsetLeft;
        mouse.y = e.offsetY - canvas.offsetTop;
      }
      stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
      for (const piece of pieces) {
        if (piece == currentPiece) {
          continue;
        }
        stage.drawImage(
          img,
          piece.sx,
          piece.sy,
          pieceWidth,
          pieceHeight,
          piece.xPos,
          piece.yPos,
          pieceWidth,
          pieceHeight
        );
        stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        if (currentDropPiece == null) {
          if (
            mouse.x < piece.xPos ||
            mouse.x > piece.xPos + pieceWidth ||
            mouse.y < piece.yPos ||
            mouse.y > piece.yPos + pieceHeight
          ) {
            //NOT OVER
          } else {
            currentDropPiece = piece;
            stage.save();
            stage.globalAlpha = 0.2;
            stage.fillStyle = PUZZLE_HOVER_TINT;
            stage.fillRect(
              currentDropPiece.xPos,
              currentDropPiece.yPos,
              pieceWidth,
              pieceHeight
            );
            stage.restore();
          }
        }
      }
      stage.save();
      stage.globalAlpha = 0.6;
      stage.drawImage(
        img,
        currentPiece.sx,
        currentPiece.sy,
        pieceWidth,
        pieceHeight,
        mouse.x - pieceWidth / 2,
        mouse.y - pieceHeight / 2,
        pieceWidth,
        pieceHeight
      );
      stage.restore();
      stage.strokeRect(
        mouse.x - pieceWidth / 2,
        mouse.y - pieceHeight / 2,
        pieceWidth,
        pieceHeight
      );
    }

    function onPuzzleClick(e) {
      if (e.layerX || e.layerX === 0) {
        mouse.x = e.layerX - canvas.offsetLeft;
        mouse.y = e.layerY - canvas.offsetTop;
      } else if (e.offsetX || e.offsetX === 0) {
        mouse.x = e.offsetX - canvas.offsetLeft;
        mouse.y = e.offsetY - canvas.offsetTop;
      }
      currentPiece = checkPieceClicked();
      if (currentPiece !== null) {
        stage.clearRect(
          currentPiece.xPos,
          currentPiece.yPos,
          pieceWidth,
          pieceHeight
        );
        stage.save();
        stage.globalAlpha = 0.9;
        stage.drawImage(
          img,
          currentPiece.sx,
          currentPiece.sy,
          pieceWidth,
          pieceHeight,
          mouse.x - pieceWidth / 2,
          mouse.y - pieceHeight / 2,
          pieceWidth,
          pieceHeight
        );
        stage.restore();
        document.onpointermove = updatePuzzle;
        document.onpointerup = pieceDropped;
        document.ontouchmove = updatePuzzle;
        document.ontouchend = pieceDropped;
      }
    }

    function gameOver() {
      // setWelcomeModal(true)
      document.onpointerdown = null;
      document.onpointermove = null;
      document.onpointerup = null;
      document.ontouchstart = null;
      document.ontouchmove = null;
      document.ontouchend = null;
      initPuzzle();
    }

    function pieceDropped(e) {
      document.onpointermove = null;
      document.onpointerup = null;
      document.ontouchstart = null;
      document.ontouchmove = null;
      if (currentDropPiece !== null) {
        let tmp = {
          xPos: currentPiece.xPos,
          yPos: currentPiece.yPos
        };
        currentPiece.xPos = currentDropPiece.xPos;
        currentPiece.yPos = currentDropPiece.yPos;
        currentDropPiece.xPos = tmp.xPos;
        currentDropPiece.yPos = tmp.yPos;
      }
      resetPuzzleAndCheckWin();
    }

    function resetPuzzleAndCheckWin() {
      stage.clearRect(0, 0, puzzleWidth, puzzleHeight);
      let gameWin = true;
      for (let piece of pieces) {
        stage.drawImage(
          img,
          piece.sx,
          piece.sy,
          pieceWidth,
          pieceHeight,
          piece.xPos,
          piece.yPos,
          pieceWidth,
          pieceHeight
        );
        stage.strokeRect(piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        if (piece.xPos != piece.sx || piece.yPos != piece.sy) {
          gameWin = false;
        }
      }
      if (gameWin) {
        setWelcomeModal(true);
        setRunning(false);
        setTimeout(gameOver, 500);
      }
    }

    function shuffleArray(o) {
      for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
      );
      return o;
    }

    function updateDifficulty(e) {
      difficulty = e.target.value;
      pieceWidth = Math.floor(img.width / difficulty);
      pieceHeight = Math.floor(img.height / difficulty);
      puzzleWidth = pieceWidth * difficulty;
      puzzleHeight = pieceHeight * difficulty;
      gameOver();
    }
    document.getElementById("puzzleLength").oninput = updateDifficulty;
  }, [puzzleDifficulty])

  function setRandomImage() {
    // 800 x 533
    // let dup = [
    //   "https://tuk-cdn.s3.amazonaws.com/can-uploader/1903-Panhard-et-Levassor_2-800x533.jpg",
    //   "https://tuk-cdn.s3.amazonaws.com/can-uploader/1957-Ferrari-500-TRC_1-800x533.jpg",
    //   "https://tuk-cdn.s3.amazonaws.com/can-uploader/arcane.jpg",
    //   "https://tuk-cdn.s3.amazonaws.com/can-uploader/image1.jpg",
    //   "https://tuk-cdn.s3.amazonaws.com/can-uploader/arcane.jpg"
    // ]

    // 600 x 400
    let dup = [
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/avatar.jpg",
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/eagle.jpg",
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/lilly.jpg",
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/lion-king.jpg",
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/Rango-riding.jpg",
      "https://tuk-cdn.s3.amazonaws.com/can-uploader/Timon-And-Pumbaa.png"
    ]

    return dup[parseInt(Math.random() * 5)]
  }

  const handleInput = (e) => {
    setPuzzleDifficulty(e.target.value);
    setpuzzleSource(setRandomImage());
    setRunning(false);
  }

  const handleCreatePuzzle = () => {
    if (running !== true) {
      setRunning(true);
    }
  }

  useEffect(() => {
    if (welcomeModal === true) {
      notify();
    }
  }, [welcomeModal]);

  // // Toaster
  const notify = () => toast("We have completed the puzzle successfully!");

  return (
    <>
      <Head>
        <title>Image Puzzle</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width "
        />
        <meta
          property="og:title"
          content="Puzzle App"
        />
      </Head>
      <div className="bg-zinc-100 w-full h-full">
        <div className=" mx-auto flex flex-col justify-center items-center w-full">
          <div className="flex justify-center flex-col mt-3 max-w-[1024px] w-full">
            <div className="border border-zinc-200 px-5 py-5 rounded-lg w-full mt-3">
              <div className="w-full">
                <label className=" text-zinc-800 text-sm font-medium pb-3">
                  Puzzle Size
                </label>
                <input
                  onChange={(e) => { handleInput(e) }}
                  name="puzzleLength"
                  id="puzzleLength"
                  className="mt-2 outline-none border border-zinc-200 rounded-md placeholder-zinc-400 text-zinc-700 w-full text-xs leading-[150%] font-normal py-[14px] px-[14px] h-[42px]"
                  type="number"
                  placeholder="Enter Puzzle Size"
                  max={20}
                  min={2}
                  required
                />
              </div>
              <div className={`${puzzleDifficulty ? "block" : "hidden"} flex justify-start items-start w-full `}>
                <div
                  className={`${running ? "block" : "hidden"} bg-zinc-800 flex justify-center items-center text-sm text-white px-2 py-2 rounded-md mt-2 font-medium w-[105px]`}>
                  <div className="flex flex-row justify-center items-center">
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                    <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                  </div>
                </div>
                <button
                  id="createPuzzle"
                  onClick={() => { handleCreatePuzzle() }}
                  className={`${running || puzzleDifficulty == null ? "hidden" : "block"} bg-zinc-800 flex justify-center items-center text-sm text-white px-2 py-2 rounded-md mt-2 font-medium w-[105px]`}>
                  Create Puzzle
                </button>
              </div>
              {
                welcomeModal
                  ?
                  <>
                    <Welcome setWelcomeModal={setWelcomeModal} time={time} />
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      data={"asdada"}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="dark" />
                    <span id="confettiReward" />
                  </>
                  :
                  null
              }
            </div>
          </div>
          <canvas id="canvas" className=''></canvas>
        </div>
      </div>
    </>
  )
}

export default ImagePuzzle