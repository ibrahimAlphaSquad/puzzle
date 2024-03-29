import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import ImagePuzzle from "./imagePuzzle";
import Puzzle from "./puzzle";
import Welcome from "./welcome";

export default function Home() {

  return (
    <>
      <div className="flex justify-start items-center flex-col bg-zinc-100  h-screen pt-2">
        <h1 className="text-3xl font-bold text-center text-zinc-900">
          Puzzle App
        </h1>
        {/* Round 1 Simple Puzzle*/}
        <Puzzle />

        {/* Round 2 Image Puzzle*/}
        {/* <ImagePuzzle /> */}
      </div>
    </>
  )
}