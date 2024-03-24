"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";

export default function Component() {

    const [category,setCategory] = useState("");
  // const router = useRouter();

    function handleContinue() {
        localStorage.setItem("category", category);
        // console.log(localStorage.getItem("category"));
        window.location.href = `/instructor/course/create/3`;
    }

    function inputCategory(e)
    {
        setCategory(e);
    }


    return (
        <div key="1" className="bg-white min-h-screen">
            <header className="bg-[#333] py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <a className="text-white text-lg font-semibold" href="/dash">
                            MitraBot
                        </a>
                        <Button className="text-white bg-transparent hover:bg-white/10 border border-white"><a href="/instructor/courses">Exit</a></Button>
                    </div>
                </div>
            </header>
            <main className="max-w-4xl mx-auto p-8">
                <div className="flex flex-col justify-centter items-center space-y-6">
                    <h1 className="text-4xl font-bold text-center text-black">What category best fits for your course?</h1>
                    <p className="text-lg text-center text-black">
                        Choose a category for your course.
                    </p>
                    <Select onValueChange={inputCategory}>
                        <SelectTrigger  id="section1" className="bg-black text-white w-3/4">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white" position="popper">
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="it">IT & Development</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="development">Development</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex w-full justify-between text-black">
                        <Button variant="outline"><a href="/instructor/course/create/1">Previous</a></Button>
                        <Button className="text-white bg-black" onClick={handleContinue}>Continue</Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

