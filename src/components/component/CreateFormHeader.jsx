import React from 'react'
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const CreateCourseFormHeader = () => {
  return (
    <header className="bg-[#2c2c2c] py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            className="text-white font-bold text-2xl"
            href="/instructor/courses/"
          >
            OpenAcademy
          </Link>
          <Button className="text-white bg-transparent hover:bg-white/10 border border-white">
            <Link
              className="text-white text-lg font-semibold"
              href="/instructor/courses/"
            >
              Exit
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default CreateCourseFormHeader;