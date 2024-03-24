"use client";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
// import React from "react";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import Overview from "./components/overview";
import Learning from "./components/learning";
import Reviews from "./components/reviews";
import Announcements from "./components/announcements";
import Notes from "./components/notes";
import QA from "./components/qa";
import Section from "./components/section";

export default function course({ params }) {

  const [tab, setTab] = useState("Announcements");
  const [courseData, setCourseData] = useState();
  const [curriculum, setCurriculum] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState();
  const [error, setError] = useState("none");
  let res = null;

  function tabClick(e) {
    setTab(e.target.value);
  }

  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  async function fetchFromAPI(endpoint: string) {
    setLoading(true);
    try {
      const token = getAccessToken();
      const response = await fetch(`https://fypbackend-production-d00d.up.railway.app/api/course/${params.courseId}/${endpoint}`, {
        method: 'GET'
      });
      if (response.ok) {
        setError("none");
        console.log('Course details fetched!');
        const res = await response.json(); // Parse the response to JSON
        // console.log(res); // Log the data received from the API
    setLoading(false);
        return res; // Return the parsed data
      }
      else {
        let msg = await response.text();
        console.log('Failed to create course!!:', msg);
        setError(msg);
    setLoading(false);
        return null;
      }
    }
    catch (error) {
      console.log('Error during create course:', error);
    setLoading(false);
      return null;
    }
  }

  useEffect(() => {
    async function fetchDetails() {
      const data = await fetchFromAPI("details");
      console.log(data);
      setCourseData(data);
    }
    fetchDetails();

    async function fetchCurriculum() {
      const curriculum = await fetchFromAPI("curriculum");
      console.log(curriculum);
      setCurriculum(curriculum);
    }
    fetchCurriculum();
  }, []);


  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="text-lg font-bold">MitraBot</div>
        <h1 className="text-2xl font-bold">Course | {courseData?.data.name} </h1>
      </header>
      <div className="flex h-screen">
        <nav className="w-64 bg-gray-800 pt-1 pb-1 pl-4 pr-4 text-white">
          <h2 className="text-xl font-semibold pb-1500">Course content</h2>
          <hr className="pb-4 mt-2" />
          <div className="space-y-2">
            { 
            // (loading)?(<span>Loading...</span>):
              curriculum && curriculum.data.map(section => (
              <details key={section.id} className="group">
                <summary className="flex justify-between cursor-pointer">
                  <span>{section.name}</span>
                  <ChevronDownIcon className="text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <ul className="pl-4 space-y-1 mt-2">
                  {
                    section.curriculum_item.map(item => (
                    <li key={item.id} onClick={()=>{setSelectedCurriculum(item)}} className="bg-gray-700">{item.name} 
                    {/* <span className="text-gray-400">2min</span> */}
                    </li>
                    ))
                  }
                </ul>
              </details>
              ))
            }
          </div>
        </nav>


        <main className="flex-1">
          <div className="p-4">
            <div className="mb-4">
              <h2>{selectedCurriculum?.name}</h2>
              <ReactPlayer
                width="100%"
                height="600px"
                url={selectedCurriculum ? selectedCurriculum.content :`https://ucebb50422997904805dc32d31e4.dl.dropboxusercontent.com/cd/0/get/CPoC97XjeZgTRcpqsN9ifWT7ti_1w0N9REVKpXfMZSxNGn6wvnWOI__tYmIJ-LWZqFhaNTh1fi3uUxhgPhcjxuzliTVik_pOBg2bb_hrrkJId--LdZ1DiKzkEIISRuWg-NdOt3TtXaLBajDRILWzgVafq4I2YDtzxS0v-pW0qsAJZw/file`}
                controls={true}
                // light is usefull incase of dark mode
                light={false}
                // picture in picture
                pip={true}
              />


              {/* <video width="320" height="240" controls preload="none">
              <source src="/path/to/video.mp4" type="video/mp4" />
              <track
                src="/path/to/captions.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
                Your browser does not support the video tag.
              </video> */}
              <span className="w-full rounded-md bg-muted" />
            </div>
            <div className="mb-4">
              <Tabs>
                <div className="flex space-x-2">
                  <Button variant={tab === "Overview" ? "secondary" : "ghost"} value={"Overview"} onClick={tabClick}>Overview</Button>
                  <Button variant={tab === "Q&A" ? "secondary" : "ghost"} value={"Q&A"} onClick={tabClick}>Q&A</Button>
                  <Button variant={tab === "Notes" ? "secondary" : "ghost"} value={"Notes"} onClick={tabClick}>Notes</Button>
                  <Button variant={tab === "Announcements" ? "secondary" : "ghost"} value={"Announcements"} onClick={tabClick}>Announcements</Button>
                  <Button variant={tab === "Reviews" ? "secondary" : "ghost"} value={"Reviews"} onClick={tabClick}>Reviews</Button>
                  <Button variant={tab === "Learning" ? "secondary" : "ghost"} value={"Learning"} onClick={tabClick}>Learning tools</Button>
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
          </div>
        </main>
        <div className="p-4">
          <span className="w-full rounded-md bg-muted" />
        </div>
      </div>
    </div>
  )
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
  )
}