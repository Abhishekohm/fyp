"use client";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/hooks/authhooks";
import CreateCourseFormHeader from "../../../../../components/component/CreateFormHeader";
import NoClick from "@/components/component/NoClick";
import { toast, Bounce } from "react-toastify";

export default function Component() {
  const router = useRouter();
  const [desc, setDesc] = useState(localStorage.getItem("desc") || "none");
  const { auth } = useAuthContext();
  const [loading, setLoading] = useState(false);

  function inputDesc(e: { target: { value: SetStateAction<string> } }) {
    setDesc(e.target.value);
  }

  const createCourse = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    let title: any = localStorage.getItem("title");
    let cat: any = localStorage.getItem("category");
    title = title?.toLowerCase();
    cat = cat?.toLowerCase();
    const token = auth.accessToken;
    console.log(token);
    try {
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
        console.log("Course created successfully!");
        localStorage.removeItem("title");
        localStorage.removeItem("desc");
        localStorage.removeItem("category");
        const res = await response.json();
        toast.success(`Course created sucessfully. Redirecting...`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          setLoading(false);
          router.push(`/instructor/courses/${res.data.id}/manage/goals`);
        }, 2000)
      }
      else {
        let msg = await response.json();
        console.log("Failed to create course!!:", msg);
        toast.error(`${msg?.message}.`, {
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
    } catch (error) {
      setLoading(false);
      console.log("Error during create course:", error);
    }
  };

  function previousPage(): void {
    localStorage.setItem("desc", desc);
  }

  return (
    <>
      {loading && <NoClick />}
      <div key="1" className="bg-white min-h-screen">
        <CreateCourseFormHeader />
        <main className="max-w-4xl mx-auto p-8">
          <div className="flex flex-col justify-centter items-center space-y-6">
            <h1 className="text-4xl font-bold text-center text-black">
              Give a brief description about the course!
            </h1>
            <p className="text-lg text-center text-black">Keep it simple.</p>
            <Textarea
            value={desc}
              onChange={inputDesc}
              className="min-h-[250px] w-full bg-black text-white"
              placeholder="Description"
            />
            <div className="flex w-full justify-between text-black">
              <Button onClick={previousPage} variant="outline">
                <Link href="/instructor/course/create/2">Previous</Link>
              </Button>
              <Button
                className="text-white bg-purple-600"
                onClick={createCourse}
              >
                {loading ? "Creating course..." : "Create course"}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
