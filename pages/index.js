import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Welcome from "./welcome";

export default function Home() {
  // Puzzle size input state
  const [puzzleSizeInput, setPuzzleSizeInput] = useState("")
  const [puzzleGridSize, setPuzzleGridSize] = useState("")

  // Puzzle Array
  const [puzzleSize, setPuzzleSize] = useState("")

  // Drag 
  const dragItem = useRef();
  const dragOverItem = useRef();

  // Modal
  const [welcomeModal, setWelcomeModal] = useState(false)

  // Drag start
  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  // Drag end
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  // Arranging Values
  const drop = () => {
    const copyListItems = [...puzzleSize];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setPuzzleSize(copyListItems);
    setTimeout(() => {
      let dup = copyListItems.filter((item, index) => {
        if (item !== index + 1) {
          return
        } else {
          return item
        }
      })
      if (dup.length == copyListItems.length) {
        setWelcomeModal(true)
      }
    }, 500)
  };

  // Create puzzle
  const createPuzzleHandler = (e) => {
    e.preventDefault();
    let dup = [];
    for (let index = 0; index < puzzleSizeInput * puzzleSizeInput; index++) {
      dup.push(index + 1)
    }

    let shuffledDup = dup.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    setPuzzleSizeInput("")
    setPuzzleSize(shuffledDup)
  }

  // Checking data 
  const validate = () => {
    if (puzzleSizeInput !== "") {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    validate()
  }, [puzzleSizeInput])

  return (
    <>
      <Head>
        <title>Puzzle App</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width "
        />
        <meta
          property="og:title"
          content="Puzzle App"
        />
      </Head>
      <div className="bg-zinc-100 w-screen h-screen">
        <h1 className="text-3xl font-bold text-center text-zinc-900">
          Puzzle App
        </h1>
        {
          welcomeModal
            ?
            <Welcome setWelcomeModal={setWelcomeModal} setPuzzleSize={setPuzzleSize} />
            :
            null
        }
        <div className="container mx-auto flex flex-col justify-center items-center max-w-[900px] w-full">
          {/* Get Puzzle Size */}
          <div className="flex justify-center flex-col mt-3 max-w-[900px] w-full">
            <form onSubmit={(e) => { createPuzzleHandler(e) }} className="border border-zinc-200 px-5 py-5 rounded-lg w-full mt-3">
              <div className="w-full">
                <label className=" text-zinc-800 text-sm font-medium pb-3">
                  Puzzle Size
                </label>
                <input
                  value={puzzleSizeInput}
                  onChange={(e) => {
                    setPuzzleSizeInput(
                      e.target.value
                    )
                    setPuzzleGridSize(
                      e.target.value
                    )
                  }}
                  className="mt-2 outline-none border border-zinc-200 rounded-md placeholder-zinc-400 text-zinc-700 w-full text-xs leading-[150%] font-normal py-[14px] px-[14px] h-[42px]"
                  type="number"
                  placeholder="Enter Puzzle Size"
                  min={2}
                  required
                />
              </div>
              <div className="flex justify-between items-center ">
                <button
                  type="submit"
                  isabled={validate()}
                  className={`${validate() ? "bg-zinc-500" : "bg-zinc-800"} flex items-center text-sm text-white px-2 py-2 rounded-md mt-2 font-medium`}>
                  Create Puzzle
                </button>
                <button
                  onClick={() => { setPuzzleSize("") }}
                  type="button"
                  disabled={validate() && puzzleSize.length !== 0 ? false : true}
                  className={`${validate() && puzzleSize.length !== 0 ? "bg-zinc-800" : "bg-zinc-500"} flex items-center text-sm text-white px-2 py-2 rounded-md mt-2 font-medium`}>
                  Clear Grid
                </button>
              </div>
            </form>
          </div>
          {/* Puzzle */}
          <div>
            {
              puzzleSize.length
                ?
                <div style={{ gridTemplateColumns: `repeat(${puzzleGridSize}, 1fr)` }} className={`w-[${puzzleSize.length * 2}px] h-[${puzzleSize.length * 2}px] bg-slate-100 border border-zinc-300 grid grid-rows-${puzzleGridSize} grid-cols-${puzzleSizeInput} gap-2 mt-3 px-1 py-1`}>
                  {
                    puzzleSize.map((_number, idx) => {
                      return (
                        <div
                          className="px-2 py-1 bg-zinc-900 text-white text-center"
                          key={idx * 1000 * Math.random()}
                          onDragStart={(e) => dragStart(e, idx)}
                          onDragEnter={(e) => dragEnter(e, idx)}
                          onDragEnd={drop}
                          draggable
                        >
                          <p>{_number}</p>
                        </div>
                      )
                    })
                  }
                </div>
                :
                <div>
                  <p className="text-xs font-normal text-zinc-800 mt-5">To Participate Please Enter Puzzle Size Above</p>
                </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}