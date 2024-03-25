"use client";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Tabs } from "@/components/ui/tabs";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

import { Overview, Learning, Reviews, Announcements, Notes, QA, CurriculumLoader, VideoLoader } from './components';

export default function Course({ params }) 
{
  const { toast } = useToast()

  const [tab, setTab] = useState("Announcements");
  const [courseData, setCourseData] = useState(null);
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [error, setError] = useState("none");

  function tabClick(e) {
    setTab(e.target.value);
  }

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  function videoEnded() {

    const nextCurriculumId = selectedCurriculum.next_curriculum_id;

    const currentSectionIndex = curriculum.data.findIndex(section =>
      section.curriculum_item.some(item => item.id === selectedCurriculum.id)
    );

    if (currentSectionIndex !== -1) {
      const currentSection = curriculum.data[currentSectionIndex];

      const currentCurriculumItemIndex = currentSection.curriculum_item.findIndex(item => item.id === selectedCurriculum.id);

      if (selectedCurriculum.next_curriculum_id !== null) {
        const nextCurriculumItem = currentSection.curriculum_item[currentCurriculumItemIndex + 1];
        setSelectedCurriculum(nextCurriculumItem);
      }
      else {
        const nextSectionIndex = currentSectionIndex + 1;
        if (nextSectionIndex < curriculum.data.length) {
          const nextSection = curriculum.data[nextSectionIndex];
          if (nextSection.curriculum_item.length > 0) {
            const nextCurriculumItem = nextSection.curriculum_item[0];
            setSelectedCurriculum(nextCurriculumItem);
          }
          else {
            console.log("Next section khali hai!!");
          }
        }
        else {
          console.log("End of course, Congratulations!!");
          toast({
            title: "Congratulations,",
            description: "Course completed. Hats-off to your hardwork.",
          })
        }
      }
    }
    else {
      console.log("Current curriculum item not found in the current section");
      // Handle error: Current curriculum item not found in the current section
    }


  }


  async function fetchFromAPI(endpoint) {
    setLoading(true);
    try {
      const token = getAccessToken();
      const response = await fetch(
        `https://fypbackend-production-d00d.up.railway.app/api/course/${params.courseId}/${endpoint}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        setError("none");
        console.log("Course details fetched!");
        const res = await response.json();
        setLoading(false);
        return res;
      } else {
        let msg = await response.text();
        console.log("Failed to fetch data:", msg);
        setError(msg);
        setLoading(false);
        return null;
      }
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchFromAPI("details");
      if (data) setCourseData(data);

      const curriculumData = await fetchFromAPI("curriculum");
      if (curriculumData) {
        setCurriculum(curriculumData);
        setSelectedCurriculum(curriculumData?.data[0].curriculum_item[0]);
      }
    }

    fetchData();
  }, []);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-2 px-4">
        {/* <div className="text-lg font-bold">MitraBot</div> */}
        <h1 className="text-xl font-bold"><Link href="/dash" className="mr-3">OpenAcademy</Link> |<span className="ml-3">{courseData?.data.name}</span></h1>
      </header>
      <div className="flex h-full">
        <nav className="w-64 bg-white-800 p-4 text-black border-r">
          <h2 className="text-xl font-semibold pb-4">Course Content</h2>
          <hr className="mb-4" />
          <div className="space-y-2">
            {loading && <CurriculumLoader />}
            {curriculum &&
              curriculum.data.map((section) => (
                <details key={section.id} className="group">
                  <summary className="flex justify-between cursor-pointer">
                    <span>{section.name}</span>
                    <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <ul className="pl-0 space-y-1 mt-2">
                    {section.curriculum_item.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => setSelectedCurriculum(item)}
                        className={selectedCurriculum === item ? "bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-200 rounded py-1 px-2" : "text-gray-700 bg-gray-150 cursor-pointer hover:bg-gray-100 rounded py-1 px-2"}
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

        <main className="bg-gray-100 flex-1 p-4">
          <div className="mb-4">

            {loading && <VideoLoader />}
            {selectedCurriculum && 
            (selectedCurriculum.type === "video")?
              (<ReactPlayer
                width="100%"
                height="500px"
                onEnded={videoEnded}
                // playIcon={<button>Play</button>}
                // light={true}
                url={selectedCurriculum.content}
                controls={true}
                pip={true}
              /> )
              : !loading && (<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
              <div style={{ height: '500px',border: '1px solid rgba(0, 0, 0, 0.3)', }}>
                  <Viewer
                      fileUrl={"https://uca08c9c2cfdb111a95d4e90360f.dl.dropboxusercontent.com/cd/0/get/CPw6nYGHv2g_7AD2sYxuO0bYBMXWvNnXJUrWphyrMkqIJpD09GQU8e-7lHDm01BGIrP-necnzXwmQDZ2mDUqOG6kO0MSTLXDjh9cgwEIivQwbFcB8pAddiFU_fzfJG2BYZgHnQ2KKRY19Nj3YzswbE9QFop_Gjzu-Q34LVXrS4dPmQ/file"}
                      plugins={[
                        defaultLayoutPluginInstance,
                      ]}
                      theme='dark'
                  />
              </div>
          </Worker>)
            }
          </div>
          <div className="mb-4">
            <Tabs>
              <div className="flex space-x-2">
                <Button
                  variant={tab === "Overview" ? "secondary" : "ghost"}
                  value={"Overview"}
                  onClick={tabClick}
                >
                  Overview
                </Button>
                <Button
                  variant={tab === "Q&A" ? "secondary" : "ghost"}
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
            </Tabs>
          </div>
          <div>
            {tab === "Overview" && <Overview />}
            {tab === "Q&A" && <QA />}
            {tab === "Notes" && <Notes />}
            {tab === "Announcements" && <Announcements />}
            {tab === "Reviews" && <Reviews />}
            {tab === "Learning" && <Learning />}
          </div>
        </main>
      </div>
    </div>
  );
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
  );
}
