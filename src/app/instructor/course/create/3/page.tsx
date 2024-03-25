"use client";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Component() {
  const router = useRouter();
  const [error, setError] = useState("none");
  const [desc, setDesc] = useState("none");

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  function inputDesc(e: { target: { value: SetStateAction<string> } }) {
    setDesc(e.target.value);
    // console.log(e.target.value);
    // console.log(document.getElementById("textarea"));
  }

  const createCourse = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let title:any = localStorage.getItem("title");
    let cat:any = localStorage.getItem("category");
    title = title?.toLowerCase();
    cat = cat?.toLowerCase()
    try {
      const token = getAccessToken();
      console.log(token);
      const response = await fetch(
        `https://fypbackend-production-d00d.up.railway.app/api/course/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the bearer token in the Authorization header
          },
          body: JSON.stringify({
            name: title,
            description: desc,
            category: cat,
          }),
        }
      );
      if (response.ok) {
        setError("none");
        console.log("Course created successfully!");
        localStorage.removeItem("title");
        localStorage.removeItem("category");
        console.log(response)
        router.push(`/instructor/courses/${12}/manage`);
      } else {
        let msg = await response.text();
        console.log("Failed to create course!!:", msg);
        setError(msg);
      }
    } catch (error) {
      console.log("Error during create course:", error);
    }
  };

  return (
    <div key="1" className="bg-white min-h-screen">
      <header className="bg-[#2c2c2c] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link
              className="text-white text-lg font-semibold"
              href="/instructor/courses/"
            >
              MitraBot
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
      <main className="max-w-4xl mx-auto p-8">
        <div className="flex flex-col justify-centter items-center space-y-6">
          <h1 className="text-4xl font-bold text-center text-black">
            Give a brief description about the course!
          </h1>
          <p className="text-lg text-center text-black">Keep it simple.</p>
          <Textarea
            onChange={inputDesc}
            className="min-h-[250px] w-full bg-black text-white"
            placeholder="Description"
          />
          <div className="flex w-full justify-between text-black">
            <Button variant="outline">
              <Link href="/instructor/course/create/2">Previous</Link>
            </Button>
            <Button className="text-white bg-black" onClick={createCourse}>
              Create course
            </Button>
          </div>
          {error !== "none" && <span>Error: {error}</span>}
        </div>
      </main>
    </div>
  );
}
