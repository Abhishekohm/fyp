"use client";
import { Button } from "@/components/ui/button";
import { Lecture } from "./lecture";
import { useState } from "react";
import { NewLectureForm } from "./new-lecture-form";
import { Trash } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast, Bounce } from "react-toastify";
import NoClick from "./NoClick";

export function Section(props: any) {
  const [showNewLectureForm, setShowNewLectureForm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams();

  const deleteSection = async () => {
    setDeleting(true);
    try {
      const response = await axios.delete(
        `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/section/${props.section.id}/delete`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      props.setSections(response.data.data);
      toast.success(`Section deleted successdully.`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setDeleting(false);
    } catch (e: any) {
      toast.error(`${e?.response?.data?.message || e.message}.`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setDeleting(false);
    }
  };

  return (
    <>
      {deleting && <NoClick />}
      <div className="max-w-4xl mx-auto my-8 p-6 border border-gray-200 rounded-md dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Section {props.index + 1}: {props?.section?.name}
          </h2>
          <Button type="button" onClick={deleteSection}>
            <Trash />
          </Button>
        </div>
        <div className="border-t pt-4">
          <div>
            {props?.section?.curriculum_item?.map((lecture: any, i: any) => {
              return <Lecture lecture={lecture} key={i} index={i} section_id={props.section.id} setSections={ props.setSections} />;
            })}
          </div>
        </div>
        {!showNewLectureForm && (
          <Button
            className="border-2 border-black hover:bg-gray-300"
            onClick={() => {
              setShowNewLectureForm(true);
            }}
          >
            + Curriculum item
          </Button>
        )}
        {showNewLectureForm && (
          <NewLectureForm
            setShowNewLectureForm={setShowNewLectureForm}
            showNewLectureForm={showNewLectureForm}
            section_id={props.section.id}
            setSections={props.setSections}
          />
        )}
      </div>
    </>
  );
}
