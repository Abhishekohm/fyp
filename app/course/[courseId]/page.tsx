"use client";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
// import React from "react";
import ReactPlayer from "react-player";

export default function course({params}) {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
      <div className="text-lg font-bold">MitraBot</div>
        <h1 className="text-2xl font-bold">Course | {params.courseId} </h1>
      </header>
      <div className="flex">
        <nav className="w-64 bg-gray-800 pt-1 pb-1 pl-4 pr-4 text-white">
        <h2 className="text-xl font-semibold pb-1500">Course content</h2>
        <hr className="pb-4 mt-2"/>
        <div className="space-y-2">
          
          <details className="group" open>
            <summary className="flex justify-between cursor-pointer">
              <span>Section 1: Introduction and First Steps</span>
              <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <ul className="pl-4 space-y-1 mt-2">
              <li className="bg-gray-700">
                1.Plan of attack <span className="text-gray-400">2min</span>
              </li>
              <li className="bg-gray-700">
                2.Being an Ethical Hacker <span className="text-gray-400">2min</span>
              </li>              
            </ul>
          </details>
          <details className="group">
            <summary className="flex justify-between cursor-pointer">
              <span>Section 2: Operating System</span>
              <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <ul className="pl-4 space-y-1 mt-2">
            <li className="bg-gray-700">
                3. Being an Ethical Hacker <span className="text-gray-400">2min</span>
              </li>
            </ul>
          </details>
          <details className="group">
            <summary className="flex justify-between cursor-pointer">
              <span>Section 3: Creating our ethical hacking lab</span>
              <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <ul className="pl-4 space-y-1 mt-2">
            <li className="bg-gray-700">
                4. Being an Ethical Hacker <span className="text-gray-400">2min</span>
              </li>
            </ul>
          </details>
          <details className="group">
            <summary className="flex justify-between cursor-pointer">
              <span>Section 4: Introduction to Networking</span>
              <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <ul className="pl-4 space-y-1 mt-2">
            <li className="bg-gray-700">
                5. Being an Ethical Hacker <span className="text-gray-400">2min</span>
              </li>
            </ul>
          </details>
          <details className="group">
            <summary className="flex justify-between cursor-pointer">
              <span>Section 5: Bypassing Network Access Control</span>
              <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <ul className="pl-4 space-y-1 mt-2">
            <li className="bg-gray-700">
                6. Being an Ethical Hacker <span className="text-gray-400">2min</span>
              </li>
            </ul>
          </details>
          <details className="group">
            <summary className="flex justify-between cursor-pointer">
              <span>Section 6: Cybersecurity - Beginning</span>
              <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <ul className="pl-4 space-y-1 mt-2">
            <li className="bg-gray-700">
                7. Being an Ethical Hacker <span className="text-gray-400">2min</span>
              </li>
            </ul>
          </details>
        </div>


          {/* <div className="mb-4">
            <h2 className="text-xl font-semibold">Course content</h2>
            <button className="mt-2 p-2 text-left text-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              <ChevronDownIcon className="inline-block w-4 h-4 mr-2" />
              Section 1: Introduction and First Steps{"\n                      "}
            </button>
            <ul className="pl-4">
              <li className="mb-2">
                <Checkbox id="section1-video1" />
                <label className="ml-2 text-sm" htmlFor="section1-video1">
                  1. Being an Ethical Hacker
                </label>
              </li>
            </ul>
          </div>
          <div>
            <button className="mt-2 p-2 text-left text-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              <ChevronDownIcon className="inline-block w-4 h-4 mr-2" />
              Section 2: Operating System{"\n                      "}
            </button>
          </div> */}
        </nav>
        <main className="flex-1">
          <div className="p-4">
            <div className="mb-4">
              

            <ReactPlayer
        width="100%"
        height="450px"
        url={`https://www.youtube.com/watch?v=XLvPpirlmEs&ab_channel=Simplilearn`}
        controls={true}
        // light is usefull incase of dark mode
        light={false}
        // picture in picture
        pip={true}
      />

              
              {/* <video width="320" height="240" controls preload="none">
              <source src="/path/to/video.mp4" type="video/mp4" />
              <track
                src="/path/to/captions.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
                Your browser does not support the video tag.
              </video> */}
              <span className="w-full rounded-md bg-muted" />
            </div>
            <div className="mb-4">
              <Tabs>
                <div className="flex space-x-2">
                  <Button variant="ghost">Overview</Button>
                  <Button variant="ghost">Q&A</Button>
                  <Button variant="ghost">Notes</Button>
                  <Button variant="ghost">Announcements</Button>
                  <Button variant="ghost">Reviews</Button>
                  <Button variant="ghost">Learning tools</Button>
                </div>
              </Tabs>
            </div>
            <div className="bg-gray-100 p-4">
              <Link className="text-blue-600 hover:underline" href="#">
                Back to all announcements
              </Link>
              <div className="mt-4">
                <Avatar>
                  <AvatarImage alt="OCSALY" src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>O</AvatarFallback>
                </Avatar>
                <div className="inline-block align-middle ml-2">
                  <p>OCSALY</p>
                  <p className="text-sm text-gray-600">posted an announcement · 24 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="p-4">
          <span className="w-full rounded-md bg-muted" />
        </div>
      </div>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}








// export default function course({params}) {
//     return (
//       <>
      
//       </>   
//     );
//   }
  