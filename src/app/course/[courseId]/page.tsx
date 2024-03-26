"use client";
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Overview from "./components/overview";
import Learning from "./components/learning";
import Reviews from "./components/reviews";
import Announcements from "./components/announcements";
import Notes from "./components/notes";
import QA from "./components/qa";
import Section from "./components/section";
import Loader from "./components/loader"; // Assuming you have a Loader component for loading state
// import { ChevronDownIcon } from "./components/icons"; // Assuming you have a ChevronDownIcon component
import { Tabs } from "@/components/ui/tabs";

export default function Course({ params }:{params:any}) {
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

  async function fetchFromAPI(endpoint:any) {
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
      if (curriculumData) setCurriculum(curriculumData);
    }
    fetchData();
  }, []);

  return (
      <div className="flex flex-col h-screen">
        <header className="bg-gray-800 text-white p-4">
          <div className="text-lg font-bold">MitraBot</div>
          <h1 className="text-2xl font-bold">
            Course | {courseData?.data.name}
          </h1>
        </header>
        <div className="flex h-full">
          <nav className="w-64 bg-gray-800 p-4 text-white">
            <h2 className="text-xl font-semibold pb-4">Course Content</h2>
            <hr className="mb-4" />
            <div className="space-y-2">
              {loading && <Loader />}
              {curriculum &&
                curriculum.data.map((section) => (
                  <details key={section.id} className="group">
                    <summary className="flex justify-between cursor-pointer">
                      <span>{section.name}</span>
                      <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <ul className="pl-4 space-y-1 mt-2">
                      {section.curriculum_item.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => setSelectedCurriculum(item)}
                          className={
                            selectedCurriculum === item
                              ? "bg-gray-500 cursor-pointer hover:bg-gray-600 rounded py-1 px-2"
                              : "bg-gray-700 cursor-pointer hover:bg-gray-600 rounded py-1 px-2"
                          }
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
            </div>
          </nav>

          <main className="flex-1 p-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                {selectedCurriculum?.name}
              </h2>
              {selectedCurriculum ? (
                <ReactPlayer
                  width="100%"
                  height="600px"
                  url={selectedCurriculum.content}
                  controls={true}
                  light={false}
                  pip={true}
                />
              ) : (
                <p className="text-gray-500">Select a curriculum item</p>
              )}
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
