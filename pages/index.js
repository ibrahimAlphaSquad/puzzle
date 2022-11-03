import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import ImagePuzzle from "./imagePuzzle";
import Puzzle from "./puzzle";
import Welcome from "./welcome";

export default function Home() {

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
        {/* Round 1 Simple Puzzle*/}
        {/* <Puzzle /> */}
        {/* Round 2 Image Puzzle*/}
        <ImagePuzzle />
      </div>
    </>
  )
}