// "use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { FormEvent, useState } from 'react'

const Goals = () => {
  function submitForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault(); // Prevent default form submission behavior
    // Handle form submission
  }

  const [q1, setq1] = useState(2);
  const [q2, setq2] = useState(1);
  const [q3, setq3] = useState(1);

  function addInput1() {
    setq1(q1 + 1);
  }
  function addInput2() {
    setq2(q2 + 1);
  }
  function addInput3() {
    setq3(q3 + 1);
  }

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <div className="px-10 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Intended learners</h1>
        <p className="mt-2 text-sm text-gray-600">
          The following descriptions will be publicly visible on your Course Landing Page and will have a direct
          impact on your course performance. These descriptions will help learners decide if your course is right for
          them.
        </p>
        <form onSubmit={submitForm}>
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">What will students learn in your course?</h2>
            <p className="mt-2 text-sm text-gray-600">
              You must enter at least 2 learning objectives or outcomes that learners can expect to achieve after
              completing your course.
            </p>
            {[...Array(q1)].map((_, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Input className="flex-1 px-4 py-2 border rounded-md w-full" placeholder={`Course Outcome ${index + 1}`} type="text" />
              </div>
            ))}
            {/* <div className="q1 flex items-center space-x-3">        
              <Input className="flex-1 px-4 py-2 border rounded-md w-full" placeholder="Example: Define the roles and responsibilities of a project manager" type="text" />
            </div>
            <div className="flex items-center space-x-3">
              <Input className="flex-1 px-4 py-2 border rounded-md w-full" placeholder="Example: Estimate project timelines and budgets" type="text" />
            </div> */}
            <Button variant="outline" onClick={addInput1} className='text-white bg-black'>+ Add more to your response</Button>
          </div>
          <div className="mt-6 mb-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">What are the requirements or prerequisites for taking this course?</h2>
            <p className="mt-2 text-sm text-gray-600">
            List the required skills, experience, tools or equipment learners should have prior to taking your course.
            </p>
            {[...Array(q2)].map((_, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Input className="flex-1 px-4 py-2 border rounded-md w-full" placeholder={`Prerequisite ${index + 1}`} type="text" />
              </div>
            ))}
            <Button variant="outline" onClick={addInput2} className='text-white bg-black'>+ Add more to your response</Button>
          </div>

          <div className="mt-6 mb-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Who is this course for?</h2>
            <p className="mt-2 text-sm text-gray-600">
            Write a clear description of the intended learners for your course who will find your course content valuable.
This will help you attract the right learners to your course.
            </p>
            {[...Array(q3)].map((_, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Input className="flex-1 px-4 py-2 border rounded-md w-full" placeholder={`Intended Learner ${index + 1}`} type="text" />
              </div>
            ))}
            <Button variant="outline" onClick={addInput3} className='text-white bg-black'>+ Add more to your response</Button>
          </div>

          <Button type="submit" className='bg-black text-white'>Submit</Button>
        </form>

      </div>
    </div>
  )
}

export default Goals