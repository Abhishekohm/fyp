import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Messages() {
  return (
    // <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex">
        <main className="flex-1">
          <div className="bg-white p-6 rounded-md shadow">
            <h2 className="text-xl font-semibold mb-4">Course messages</h2>
            <p className="text-sm mb-6">
              Write messages to your students (optional) that will be sent automatically when they join or complete your
              course to encourage students to engage with course content. If you do not wish to send a welcome or
              congratulations message, leave the text box blank.
            </p>
            <div className="flex flex-col space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Welcome Message</h3>
                {/* <div className="flex items-center space-x-2 border-b pb-2">
                  <BoldIcon className="h-5 w-5 text-gray-500" />
                  <ItalicIcon className="h-5 w-5 text-gray-500" />
                  <ListIcon className="h-5 w-5 text-gray-500" />
                  <AlignLeftIcon className="h-5 w-5 text-gray-500" />
                  <LinkIcon className="h-5 w-5 text-gray-500" />
                </div> */}
                <Textarea placeholder="Type your welcome message here." />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Congratulations Message</h3>
                {/* <div className="flex items-center space-x-2 border-b pb-2">
                  <BoldIcon className="h-5 w-5 text-gray-500" />
                  <ItalicIcon className="h-5 w-5 text-gray-500" />
                  <ListIcon className="h-5 w-5 text-gray-500" />
                  <AlignLeftIcon className="h-5 w-5 text-gray-500" />
                  <LinkIcon className="h-5 w-5 text-gray-500" />
                </div> */}
                <Textarea placeholder="Type your congratulations message here." />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-black hover:bg-gray-700 text-white">Save</Button>
            </div>
          </div>
        </main>
      </div>
    // </div>
  )
}

function AlignLeftIcon(props) {
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
      <line x1="21" x2="3" y1="6" y2="6" />
      <line x1="15" x2="3" y1="12" y2="12" />
      <line x1="17" x2="3" y1="18" y2="18" />
    </svg>
  )
}


function BoldIcon(props) {
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
      <path d="M14 12a4 4 0 0 0 0-8H6v8" />
      <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
    </svg>
  )
}


function CheckCircleIcon(props) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}


function CircleIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}


function ItalicIcon(props) {
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
      <line x1="19" x2="10" y1="4" y2="4" />
      <line x1="14" x2="5" y1="20" y2="20" />
      <line x1="15" x2="9" y1="4" y2="20" />
    </svg>
  )
}


function LinkIcon(props) {
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}


function ListIcon(props) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}
