import Head from "next/head";
import { useState } from "react";

// React Drag and Drop
// import { useDrag } from 'react-dnd'
// import { ItemTypes } from './Constants'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Home({ isDragging, text }) {
  // Puzzle size input state
  const [puzzleSizeInput, setPuzzleSizeInput] = useState("")

  // Puzzle size
  const [puzzleSize, setPuzzleSize] = useState("")

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

    setPuzzleSize(shuffledDup)
  }

  //Drag And drop
  // const [{ opacity }, dragRef] = useDrag(
  //   () => ({
  //     type: ItemTypes.CARD,
  //     item: { text },
  //     collect: (monitor) => ({
  //       opacity: monitor.isDragging() ? 0.5 : 1
  //     })
  //   }),
  //   []
  // )

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
      <DndProvider backend={HTML5Backend}>
        <div className="bg-zinc-100 w-screen h-screen">
          <h1 className="text-3xl font-bold text-center text-zinc-600">
            Puzzle App
          </h1>
          <div className="container mx-auto flex flex-col justify-center items-center">
            {/* Get Puzzle Size */}
            <div className="flex justify-center flex-col mt-3">
              <p className="font-extrabold text-lg text-zinc-800 leading-[100%]">
                Please Enter the grid size you Want to create
              </p>
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
                    }}
                    className={`mt-2 outline-none border border-zinc-200 rounded-md placeholder-zinc-400 text-zinc-700 w-full text-xs leading-[150%] font-normal py-[14px] px-[14px] h-[42px]`}
                    type="number"
                    placeholder=" Puzzle Size"
                    min={0}
                    required
                  />
                </div>
                <button className="flex items-center text-sm text-white bg-zinc-800 px-2 py-2 rounded-md mt-2 font-medium">
                  Create Puzzle
                </button>
              </form>
            </div>
            {/* Puzzle */}
            <div>
              {
                puzzleSize
                  ?
                  <div className={`w-[${puzzleSize.length}px] h-[${puzzleSize.length}px] bg-slate-100 border border-zinc-300 grid grid-row-[${puzzleSize.length / 2}] gap-2 mt-3 px-1 py-1`}>
                    {
                      puzzleSize.map((_number, idx) => {
                        return (
                          // <div ref={dragRef} style={{ opacity }} key={idx * 1000 * Math.random()}>
                          <div key={idx * 1000 * Math.random()}>
                            <div className="px-1 py-1 bg-green-600">
                              <p>{_number}</p>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  :
                  null
              }
            </div>
          </div>
        </div>
      </DndProvider>
    </>
  )
}