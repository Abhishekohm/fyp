"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CreateCourseFormHeader from "../../../../../components/component/CreateFormHeader";

export default function Component() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  // const router = useRouter();

  function handleContinue() {
    localStorage.setItem("title", title);
    console.log("Click 1");
    router.push("/instructor/course/create/2");
  }

  function inputTitle(e: { target: { value: SetStateAction<string> } }) {
    setTitle(e.target.value);
  }

  return (
    <div key="1" className="bg-white min-h-screen">
      <CreateCourseFormHeader />
      <main className="max-w-4xl mx-auto p-8">
        <div className="flex flex-col justify-centter items-center space-y-6">
          <h1 className="text-4xl font-bold text-center text-black">
            How about a working title?
          </h1>
          <p className="text-lg text-center text-black">
            You need a unique title that describes your course.
          </p>
          <Input
            className="w-full"
            placeholder="e.g., Learn Photoshop CS6 from Scratch"
            type="text"
            onChange={inputTitle}
          />
          <div className="flex w-full justify-between text-black">
            <Button variant="outline" className="cursor-not-allowed">
              Previous
            </Button>
            <Button
              className="text-white bg-purple-600"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
