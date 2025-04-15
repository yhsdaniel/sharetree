'use client'

import { Roboto } from "next/font/google";
import HomePage from "./homepage/page";

const roboto = Roboto({
  weight: '400',
  subsets: ["latin"]
})

export default function Home() {
  return (
    <>
      <style jsx global>
        {`
          html{
            font-family: ${roboto.style.fontFamily}
          }
        `}
      </style>
      <main className="size-full">
        <HomePage />
      </main>
    </>
  );
}
