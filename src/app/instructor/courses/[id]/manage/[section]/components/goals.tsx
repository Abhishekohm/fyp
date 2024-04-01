// "use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NoClick from "@/components/component/NoClick";
import React, { FormEvent, useState, useRef, useEffect } from "react";
import Spinner from "@/components/component/spinner";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast, Bounce } from "react-toastify";
import { useAuthContext } from "@/hooks/authhooks";

const Goals = () => {
  const outcomeRef = useRef<HTMLDivElement>(null);
  const prerequisitesRef = useRef<HTMLDivElement>(null);
  const targetAudieneRef = useRef<HTMLDivElement>(null);
  const [outcomes, setOutcomes] = useState<any[]>([]);
  const [prerequisites, setPrerequisites] = useState<any[]>([]);
  const [targetAudiene, setTargetAudiene] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const { auth } = useAuthContext();

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission behavior
    setSubmitting(true);
    const outcomes: String[] = [];
    const prerequisites: String[] = [];
    const targetAudiene: String[] = [];
    outcomeRef &&
      outcomeRef?.current &&
      outcomeRef?.current.childNodes.forEach((node: any) => {
        if (node.lastChild && node.lastChild.value) {
          outcomes.push(node.lastChild.value as String);
        }
      });

    prerequisitesRef &&
      prerequisitesRef.current &&
      prerequisitesRef?.current.childNodes.forEach((node: any) => {
        if (node.lastChild && node.lastChild.value) {
          prerequisites.push(node.lastChild.value as String);
        }
      });

    targetAudieneRef &&
      targetAudieneRef.current &&
      targetAudieneRef?.current.childNodes.forEach((node: any) => {
        if (node.lastChild && node.lastChild.value) {
          targetAudiene.push(node.lastChild.value as String);
        }
      });

    console.log(outcomes);
    console.log(prerequisites);
    console.log(targetAudiene);

    try {
      const response = await axios.patch(
        `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/update/`,
        {
          course_outcome: outcomes,
          target_audience: targetAudiene,
          prerequisites: prerequisites,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log(response.data);
      toast.success(`Course updated successfully.`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setSubmitting(false);
    } catch (e: any) {
      console.log("Error updating the couse:", e);
      toast.error(`${e.response.data.message}.`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setSubmitting(false);
    }
  }

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/details`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setPrerequisites([
          ...(JSON.parse(response.data.data.prerequisites) as Array<any>),
          { val: "" },
        ]);
        setTargetAudiene([
          ...(JSON.parse(response.data.data.target_audience) as Array<any>),
          { val: "" },
        ]);
        setOutcomes([
          ...(JSON.parse(response.data.data.course_outcome) as Array<any>),
          { val: "" },
        ]);
        setLoading(false);
      } catch (e) {
        console.log("Error Fetching Details:", e);
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, []);

  function addInput1() {
    setOutcomes([...outcomes, { val: "" }]);
  }
  function addInput2() {
    setPrerequisites([...prerequisites, { val: "" }]);
  }
  function addInput3() {
    setTargetAudiene([...targetAudiene, { val: "" }]);
  }

  return (
    <>
      {submitting && <NoClick />}
      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <Spinner h={12} w={12} />
        </div>
      ) : (
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="px-10 py-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Intended learners
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              The following descriptions will be publicly visible on your Course
              Landing Page and will have a direct impact on your course
              performance. These descriptions will help learners decide if your
              course is right for them.
            </p>
            <form onSubmit={submitForm}>
              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  What will students learn in your course?
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Add learning objectives or outcomes that learners can expect
                  to achieve after completing your course.
                </p>
                <div ref={outcomeRef}>
                  {outcomes.map((outcome, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 my-2"
                    >
                      <Input
                        className="flex-1 px-4 py-2 border rounded-md w-full"
                        placeholder={`Course Outcome ${index + 1}`}
                        type="text"
                        defaultValue={
                          index >= outcomes.length
                            ? ("" as string)
                            : (outcome.val as string)
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={addInput1}
                  className="text-white bg-black"
                >
                  + Add more to your response
                </Button>
              </div>
              <div className="mt-6 mb-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  What are the requirements or prerequisites for taking this
                  course?
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  List the required skills, experience, tools or equipment
                  learners should have prior to taking your course.
                </p>
                <div ref={prerequisitesRef}>
                  {prerequisites.map((prerequisite, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 my-2"
                    >
                      <Input
                        className="flex-1 px-4 py-2 border rounded-md w-full"
                        placeholder={`Prerequisite ${index + 1}`}
                        type="text"
                        defaultValue={
                          index >= prerequisites.length
                            ? ("" as string)
                            : (prerequisite.val as string)
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={addInput2}
                  className="text-white bg-black"
                >
                  + Add more to your response
                </Button>
              </div>

              <div className="mt-6 mb-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Who is this course for?
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Write a clear description of the intended learners for your
                  course who will find your course content valuable. This will
                  help you attract the right learners to your course.
                </p>
                <div ref={targetAudieneRef}>
                  {targetAudiene.map((ta, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 my-2"
                    >
                      <Input
                        className="flex-1 px-4 py-2 border rounded-md w-full"
                        placeholder={`Intended Learner ${index + 1}`}
                        type="text"
                        defaultValue={
                          index >= targetAudiene.length
                            ? ("" as string)
                            : (ta.val as string)
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={addInput3}
                  className="text-white bg-black"
                >
                  + Add more to your response
                </Button>
              </div>

              <Button type="submit" className="bg-purple-600 text-white">
                {submitting ? "Updating" : "Update"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Goals;
