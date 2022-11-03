import axios from "axios";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import ImagePuzzle from "./imagePuzzle";
import Puzzle from "./puzzle";
import Welcome from "./welcome";

export default function Home() {
  const handleDiagnosticData = async () => {
    const data = await axios.get(
      `https://fec1-101-50-109-64.ap.ngrok.io/user`,
      {
        headers: { Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0MywidXNlck5hbWUiOiJqb2huZG9lIiwiZmlyc3ROYW1lIjoiam9obiIsImxhc3ROYW1lIjoiZG9lIiwidXNlckVtYWlsIjoiam9obkBkb2UudGVjaCIsInBhc3N3b3JkIjoiJDJiJDA4JGVpa2ZtVkprSElFblVzUnYzZS5vRi5QT0VHcWtUaGs3c3BxRlFlTXA5RlBHOTUvYnNLOEtlIiwidG9rZW4iOm51bGwsImRlc2lnbmF0aW9uIjpudWxsLCJlbXBsb3ltZW50VHlwZSI6IkZ1bGwgVGltZSIsInJvbGUiOlsiT1dORVIiLCJBRE1JTiJdLCJkZXBhcnRtZW50SWQiOm51bGwsImpvaW5pbmdEYXRlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTEwLTE3VDA5OjI2OjA4Ljc0M1oiLCJ1cGRhdGVkQXQiOiIyMDIyLTEwLTE3VDA5OjI2OjA4Ljc0M1oifSwiaWF0IjoxNjY3NDk1MTYzLCJleHAiOjE2NzEwOTUxNjN9.mwbKyfitUE7-eATm8xApKnKCn-_C5PbvV6zn6FYQ4j0`}` }
      }
    )
    console.log("ngrok res ", data)

  }

  useEffect(() => {
    handleDiagnosticData()
  }, [])


  return (
    <>
      <div className="flex justify-center items-center flex-col bg-zinc-100 w-screen h-screen pt-2">
        <h1 className="text-3xl font-bold text-center text-zinc-900">
          Puzzle App
        </h1>
        {/* Round 1 Simple Puzzle*/}
        {/* <Puzzle /> */}

        {/* Round 2 Image Puzzle*/}
        {/* <ImagePuzzle /> */}
      </div>
    </>
  )
}