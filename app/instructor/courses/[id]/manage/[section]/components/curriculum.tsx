import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react'
import SectionCard from './sectionCard';

const Curriculum = () => {
  return (
    <div>
      {/* <SectionCard/> */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-3 p-6 bg-white rounded-md shadow text-black">
          <h2 className="text-lg font-semibold">Curriculum</h2>
          <p className="mt-2 text-sm text-gray-600">
            Start putting together your course by creating sections, lectures
            and practice (quizzes, coding exercises and assignments). Use your
            course outline to structure your content and label your sections and
            lectures clearly. If you’re intending to offer your course for free,
            the total length of video content must be less than 2 hours.
          </p>
          <div className="mt-4">
            <div className='box'>
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
                <span className="text-sm font-medium">
                  Section 1: Introduction
                </span>
                <Select>
                  <SelectTrigger className='text-white' id="section1">
                    <SelectValue placeholder="Content" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="lecture">Lecture</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="ml-2">+ Section</Button>
              </div>
              <div className="flex items-center justify-between px-4 py-2 mt-2 bg-white rounded-md border">
                <span className="text-sm text-black font-medium ml-8">
                  Lecture 1: Introduction
                </span>
                <Select>
                  <SelectTrigger className='text-white' id="lecture1">
                    <SelectValue placeholder="Content" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="ml-2">+ Curriculum item</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Curriculum