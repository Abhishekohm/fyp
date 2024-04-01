import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { NewSectionForm } from "@/components/component/new-section-form";
import { Section } from "@/components/component/section";
import Spinner from "@/components/component/spinner";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast, Bounce } from "react-toastify";


const Curriculum = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sections, setSections] = useState<any[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(
          `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/curriculum/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.data);
        setSections(response.data.data);
        setLoading(false);
      } catch (e:any) {
        console.log("Error while fetching sections.");
        toast.error(`${e.message}.`, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setLoading(false);
      }
    }
    fetchSections();
  },[]) 

  const showNewSectionForm = (e: any) => {
    console.log("Showing new Section");
    setShowForm(true);
  };

  const appendNewSection = (section:any) => {
    setSections([...sections, section]);
  }

  

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <Spinner h={12} w={12} />
        </div>
      ) : (
        <div>
          {/* <NewSectionForm /> */}
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-3 p-6 bg-white rounded-md shadow">
              <h2 className="text-lg font-semibold">Curriculum</h2>
              <p className="mt-2 text-sm text-gray-600">
                Start putting together your course by creating sections,
                lectures and practice (quizzes, coding exercises and
                assignments). Use your course outline to structure your content
                and label your sections and lectures clearly. If you’re
                intending to offer your course for free, the total length of
                video content must be less than 2 hours.
              </p>
              <div className="mt-4">
                {sections?.map((section, i) => {
                  return <Section section={section} key={i} index={i} setSections={setSections} />;
                })}

                {showForm && <NewSectionForm setShowForm={setShowForm} appendNewSection={appendNewSection} />}

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
      )}
    </>
  );
};

export default Curriculum;
