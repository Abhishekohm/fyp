"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SetStateAction, useState } from "react"
import { useRouter } from 'next/router'

export default function Component() {

  const [title,setTitle] = useState("");
  // const router = useRouter();

  function handleContinue() {
    localStorage.setItem("title", title);
    window.location.href = `/instructor/course/create/2`;
  }

  function inputTitle(e: { target: { value: SetStateAction<string>; }; })
  {
    setTitle(e.target.value);
  }

  return (
    <div key="1" className="bg-white min-h-screen">
      <header className="bg-[#333] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <a className="text-white text-lg font-semibold" href="#">
              MitraBot
            </a>
            <Button className="text-white bg-transparent hover:bg-white/10 border border-white"><a href="/instructor/courses">Exit</a></Button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-8">
        <div className="flex flex-col justify-centter items-center space-y-6">
          <h1 className="text-4xl font-bold text-center text-black">How about a working title?</h1>
          <p className="text-lg text-center text-black">
            You need a unique title that describes your course.
          </p>
          <Input className="w-full" placeholder="e.g., Learn Photoshop CS6 from Scratch" type="text" onChange={inputTitle} />
          <div className="flex w-full justify-between text-black">
            <Button variant="outline">Previous</Button>
            <Button className="text-white bg-black" onClick={handleContinue}> Continue</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

