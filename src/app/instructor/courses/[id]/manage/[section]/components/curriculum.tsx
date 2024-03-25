import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { NewSectionForm } from "@/components/component/new-section-form";
import { NewLectureForm } from "@/components/component/new-lecture-form";
import { Section } from "@/components/component/section";

const SampleSections = [
  {
    name: "Section 1",
    lectures: [
      {
        name: "Curriculum 1",
      },
      {
        name: "Curriculum 2",
      },
    ],
  },
];

const Curriculum = () => {
  const [showForm, setShowForm] = useState(false);
  const showNewSectionForm = (e: any) => {
    console.log("Showing new Section");
    setShowForm(true);
  };
  return (
    <div>
      {/* <NewSectionForm /> */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-3 p-6 bg-white rounded-md shadow">
          <h2 className="text-lg font-semibold">Curriculum</h2>
          <p className="mt-2 text-sm text-gray-600">
            Start putting together your course by creating sections, lectures
            and practice (quizzes, coding exercises and assignments). Use your
            course outline to structure your content and label your sections and
            lectures clearly. If you’re intending to offer your course for free,
            the total length of video content must be less than 2 hours.
          </p>
          <div className="mt-4">
            {
              SampleSections.map((section,i) => {
                return <Section section={section} key={i} index={i} />
              })
            }

            {showForm && <NewSectionForm setShowForm={setShowForm} />}

            {!showForm && (
              <Button
                className="ml-2 border-2 border-black hover:bg-gray-300"
                type="button"
                onClick={showNewSectionForm}
              >
                + Section
              </Button>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
