"use client";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

import { Button } from "@/components/ui/button";
import { useState, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, JSX, SVGProps } from "react";
import ReactPlayer from "react-player";
import { Tabs } from "@/components/ui/tabs";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

import {
  Overview,
  Learning,
  Reviews,
  Announcements,
  Notes,
  QA,
  CurriculumLoader,
  VideoLoader,
} from "../../../../course/[courseId]/components";
import Action from "../../components/action";

export default function Course({ params }) {

  const { toast } = useToast();

  const [tab, setTab] = useState("Announcements");
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [error, setError] = useState("none");

  function tabClick(e: { target: { value: SetStateAction<string>; }; }) {
    setTab(e.target.value);
  }

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  function videoEnded() {
    // const nextCurriculumId = selectedCurriculum.next_curriculum_id;

    const currentSectionIndex = curriculum.data.findIndex((section: { curriculum_item: any[]; }) =>
      section.curriculum_item.some((item: { id: any; }) => item.id === selectedCurriculum.id)
    );

    if (currentSectionIndex !== -1) {
      const currentSection = curriculum.data[currentSectionIndex];

      const currentCurriculumItemIndex =
        currentSection.curriculum_item.findIndex(
          (item: { id: any; }) => item.id === selectedCurriculum.id
        );

      if (selectedCurriculum.next_curriculum_id !== null) {
        const nextCurriculumItem =
          currentSection.curriculum_item[currentCurriculumItemIndex + 1];
        setSelectedCurriculum(nextCurriculumItem);
      } else {
        const nextSectionIndex = currentSectionIndex + 1;
        if (nextSectionIndex < curriculum.data.length) {
          const nextSection = curriculum.data[nextSectionIndex];
          if (nextSection.curriculum_item.length > 0) {
            const nextCurriculumItem = nextSection.curriculum_item[0];
            setSelectedCurriculum(nextCurriculumItem);
          } else {
            console.log("Next section khali hai!!");
          }
        } else {
          console.log("End of course, Congratulations!!");
          toast({
            title: "Congratulations,",
            description: "Course completed. Hats-off to your hardwork.",
          });
        }
      }
    } else {
      console.log("Current curriculum item not found in the current section");
      // Handle error: Current curriculum item not found in the current section
    }
  }

  async function fetchFromAPI(endpoint: string) {
    // setLoading(true);
    try {
      const token = getAccessToken();
      const response = await fetch(
        `https://fypbackend-production-d00d.up.railway.app/api/course/${params.id}/${endpoint}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        setError("none");
        console.log("Course details fetched!");
        const res = await response.json();
        // endpoint!=="details" && setLoading(false);
        return res;
      } else {
        let msg = await response.text();
        console.log("Failed to fetch data:", msg);
        setError(msg);
        // setLoading(false);
        return null;
      }
    } catch (error) {
      console.log("Error:", error);
      // setLoading(false);
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const curriculumData = await fetchFromAPI("curriculum");
      if (curriculumData) {
        setCurriculum(curriculumData);
        console.log(curriculumData);
        setSelectedCurriculum(curriculumData?.data[0]?.curriculum_item[0]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (error !== "none") {
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="w-full text-red-600 bg-red-100 py-2 px-4">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-gray-800 text-white py-2 px-4" style={{height:"7vh"}}>
        <h1 className="text-xl font-bold">
          <Link href="/dash" className="mr-3">
            OpenAcademy
          </Link>{" "}
          |<span className="ml-3">{curriculum?.course.name}</span>
        </h1>
      </header>
      <div className="flex h-full text-black" style={{height:"93vh"}}>
        <nav className="nav-container w-64 bg-white p-4 border-r overflow-y-scroll">
          <h2 className="text-xl font-semibold pb-4">Course Content</h2>
          <hr className="mb-4" />
          <div className="space-y-2">
            {loading && <CurriculumLoader />}
            {curriculum?.data.length == 0 && !loading && <>No content to show!!</>}
            {error!=="none"?<>{error}</>:curriculum && curriculum.data &&
              curriculum.data.map((section: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; curriculum_item: any[]; }) => (
                <details key={section.id} className="group">
                  <summary className="flex justify-between cursor-pointer">
                    <span>{section.name}</span>
                    <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <ul className="pl-0 space-y-1 mt-2">
                    {section.curriculum_item.map((item: SetStateAction<null>, i) => (
                      <li
                        key={i}
                        onClick={() => setSelectedCurriculum(item)}
                        className={
                          selectedCurriculum === item
                            ? "bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-200 rounded py-1 px-2"
                            : "text-gray-700 bg-gray-150 cursor-pointer hover:bg-gray-100 rounded py-1 px-2"
                        }
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                  <hr className="my-2" />
                </details>
              ))}
          </div>
        </nav>

        <main className="bg-gray-100 flex-1 p-4 overflow-y-scroll">
          <div className="mb-4">
            {loading && <VideoLoader />}
            {!selectedCurriculum && !loading && <>Nothing here!</>}
            {selectedCurriculum !== null && selectedCurriculum?.type !== "material" ? (
              <ReactPlayer
                width="100%"
                height="500px"
                onEnded={videoEnded}
                // playIcon={<button>Play</button>}
                // light={true}
                url={selectedCurriculum?.content}
                controls={true}
                pip={true}
              />)
              :
              (!loading && <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                <div style={{ height: '500px', border: '1px solid rgba(0, 0, 0, 0.3)', }}>
                  <Viewer
                    fileUrl={selectedCurriculum?.content || ""}
                    plugins={[defaultLayoutPluginInstance]}
                    theme="dark"
                  />
                </div>
              </Worker>
              )
            }
          </div>
          <div className="mb-4">
            {/* <Tabs>
              <div className="flex space-x-2">
                <Button
                  variant={tab === "Overview" ? "secondary" : "ghost"}
                  value={"Overview"}
                  onClick={tabClick}
                >
                  Overview
                </Button>
                <Button
                  variant={tab === "Q&A" ? "outline" : "ghost"}
                  value={"Q&A"}
                  onClick={tabClick}
                >
                  Q&A
                </Button>
                <Button
                  variant={tab === "Notes" ? "secondary" : "ghost"}
                  value={"Notes"}
                  onClick={tabClick}
                >
                  Notes
                </Button>
                <Button
                  variant={tab === "Announcements" ? "secondary" : "ghost"}
                  value={"Announcements"}
                  onClick={tabClick}
                >
                  Announcements
                </Button>
                <Button
                  variant={tab === "Reviews" ? "secondary" : "ghost"}
                  value={"Reviews"}
                  onClick={tabClick}
                >
                  Reviews
                </Button>
                <Button
                  variant={tab === "Learning" ? "secondary" : "ghost"}
                  value={"Learning"}
                  onClick={tabClick}
                >
                  Learning Tools
                </Button>
              </div>
            </Tabs> */}
          </div>
          <div>
            <Action course={curriculum?.course}/>
          </div>
        </main>
      </div>
    </div>
  );
}

function ChevronDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
  );
}