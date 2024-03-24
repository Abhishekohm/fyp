// import { ChevronDownIcon } from 'lucide-react'
import React from 'react'
import VideoCard from './videoCard'

function section(props) {
  return (
    <details className="group">
    <summary className="flex justify-between cursor-pointer">
      <span>{props.title}</span>
      <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" />
    </summary>
    <ul className="pl-4 space-y-1 mt-2">      
      <VideoCard />
    </ul>
  </details>
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

export default section