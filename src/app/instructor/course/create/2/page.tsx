"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import CreateCourseFormHeader from "../../../../../components/component/CreateFormHeader";

export default function Component() {
  const [category, setCategory] = useState(localStorage.getItem("category") || "");
  const router = useRouter();

  function handleContinue() {
    localStorage.setItem("category", category);
    // console.log("Click 2");
    router.push("/instructor/course/create/3");
  }

  function inputCategory(e: SetStateAction<string>) {
    console.log(e);
    setCategory(e);
  }

  return (
    <div key="1" className="bg-white min-h-screen">
      <CreateCourseFormHeader />
      <main className="max-w-4xl mx-auto p-8">
        <div className="flex flex-col justify-centter items-center space-y-6">
          <h1 className="text-4xl font-bold text-center text-black">
            What category best fits for your course?
          </h1>
          <p className="text-lg text-center text-black">
            Choose a category for your course.
          </p>
          <Select value={category} onValueChange={inputCategory}>
            <SelectTrigger id="section1" className="bg-black text-white w-3/4">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white" position="popper">
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="web development">Web Development</SelectItem>
              <SelectItem value="it & software">IT & Software</SelectItem>
              <SelectItem value="test prep">Test Preparation</SelectItem>
              <SelectItem value="game development">Game Development</SelectItem>
              <SelectItem value="office productivity">
                Office Productivity
              </SelectItem>
              <SelectItem value="data Science">Data Science</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="computer science">Computer Science</SelectItem>
              <SelectItem value="math & science">Math & Science</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex w-full justify-between text-black">
            <Button variant="outline">
              <Link href="/instructor/course/create/1">Previous</Link>
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
