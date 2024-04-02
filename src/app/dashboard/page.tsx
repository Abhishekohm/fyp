"use client";
import RequireLogin from "@/components/component/RequireLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card"
import { Key, useEffect, useState } from "react";
import axios from "axios";
import banner from "./components/banner.jpeg"
import CourseCard from "./components/courseCard";
import res from "./components/course.json";

export default function dash() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("none");
  const [enrolled, setEnrolled] = useState<any>();

  //data.user.course_history
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get("https://fypbackend-production-d00d.up.railway.app/api/learner/courses/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        });
      if (response.data.status) {
        setError("none");
        setEnrolled(response.data.data);
        // console.log(response.data.data);
        // console.log(typeof response.data.user.course_history);
        // setEnrolled(curriculumData?.data[0]?.curriculum_item[0]);
      } else {
        let msg = response;
        console.log("Failed to fetch data:", msg);
        setError(msg.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

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
    // <RequireLogin>
    <div className="flex flex-col min-h-screen">
      <header className="text-white bg-gray-800 flex items-center h-[60px] gap-4 px-4 border-b lg:gap-6 dark:border-gray-800">
        <img
          src="/logo-small.png"
          height={"50px"}
          width={"50px"}
        />
        <div className="hidden md:flex lg:hidden xl:flex items-center gap-2 text-2xl font-semibold">
          {/* <TriangleIcon className="w-4 h-4 text-blue-500" /> */}
          OpenAcademy
        </div>
        <div className="flex-1">
          <form className="w-full">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="text-black w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                placeholder="Search for anything"
                type="search"
              />
            </div>
          </form>
        </div>
        <Button className="rounded-full w-8 h-8 border-gray-200 dark:border-gray-800" size="icon" variant="outline">
          <img
            alt="Avatar"
            className="rounded-full"
            height="32"
            src="/logo-small.png"
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
            }}
            width="32"
          />
          {/* <span className="sr-only text-black">Toggle user menu</span> */}
        </Button>
      </header>
      <main className="flex-1 grid gap-4 p-4 md:gap-8 md:p-6">
        {/* <div className="grid gap-4">
          <div className="grid items-start gap-2">
            <img
              src="url('https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg')"
              alt="Banner image"
              className="aspect-video overflow-hidden rounded-lg object-contain object-center"
              height="300px"
              width="100%"
            />
          </div>
        </div> */}
        <div className="grid gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tighter sm:text-3xl md:text-4xl">Continue Learning</h1>
            <p className="text-gray-500 dark:text-gray-400">Keep going with courses you've started</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {loading && <>Loading...</>}
            {enrolled && Array.isArray(enrolled) && enrolled.map((course, index: Key,) => (
              <CourseCard learning={true} key={index} course={course} />
            ))}

          </div>
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tighter sm:text-3xl md:text-4xl">Recommended for you</h1>
            <p className="text-gray-500 dark:text-gray-400">Course recommendations tailored specifically for you</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {res && Array.isArray(res.data) && res.data.map((course, index: Key,) => (
              <CourseCard learning={false} key={index} course={course} />
            ))}
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center h-14 gap-2 border-t px-4 text-sm dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 OpenAcademy. All rights reserved.</p>
      </footer>
    </div>
    // </RequireLogin>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function TriangleIcon(props) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    </svg>
  )
}