"use client"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";

export default function Component() {

  const [error, setError] = useState("none");
  const [desc, setDesc] = useState("none");

  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  function inputDesc(e)
  {
    setDesc(e.target.value);
    // console.log(e.target.value);
    // console.log(document.getElementById("textarea"));
  }

  const createCourse = async (e) => {
    e.preventDefault();
    let title = localStorage.getItem("title");
    let cat = localStorage.getItem("category");
    try {
      const token = getAccessToken();
      console.log(token);
      const response = await fetch(`https://fypbackend-production-d00d.up.railway.app/api/course/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the bearer token in the Authorization header
        },
        body: JSON.stringify({
          name: title,
          description: desc,
          category: cat,
        }),
      });
      if (response.ok) {
        setError("none");
        console.log('Course created successfully!');
        localStorage.removeItem("title");
        localStorage.removeItem("category");
        window.location.href = '/instructor/courses/2203/manage/goals';

      }
      else {
        let msg = await response.text();
        console.log('Failed to create course!!:', msg);
        setError(msg);
      }
    }
    catch (error) {
      console.log('Error during create course:', error);
    }
  };


  return (
    <div key="1" className="bg-white min-h-screen">
      <header className="bg-[#333] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <a className="text-white text-lg font-semibold" href="#">
              MitraBot
            </a>
            <Button className="text-white bg-transparent hover:bg-white/10 border border-white"><a href="/instructor/courses">Exit</a></Button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-8">
        <div className="flex flex-col justify-centter items-center space-y-6">
          <h1 className="text-4xl font-bold text-center text-black">Give a brief description about the course!</h1>
          <p className="text-lg text-center text-black">
            Keep it simple.
          </p>
          <Textarea onChange={inputDesc} className="min-h-[250px] w-full bg-black text-white" placeholder="Description" />
          <div className="flex w-full justify-between text-black">
            <Button variant="outline"><a href="/instructor/course/create/2">Previous</a></Button>
            <Button className="text-white bg-black" onClick={createCourse}>Create course</Button>
          </div>
          {error !== "none" && <span>Error: {error}</span>}
        </div>
      </main>
    </div>
  )
}

