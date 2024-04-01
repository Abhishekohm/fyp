"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select,
} from "@/components/ui/select";
import { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
    BarChartIcon,
    BookIcon,
    CircleIcon,
    GroupIcon,
    HomeIcon,
    LogoutIcon,
} from "../../instructor/utils/icons";

import CourseCard from "./components/CourseCard";
import Spinner from "@/components/component/spinner";
import { useAuthContext } from "@/hooks/authhooks";

export default function Courses() {
    const [hover, setHover] = useState(false);
    const [filter, setFilter] = useState("started");
    const [loading, setLoading] = useState(true);
    const [started, setStarted] = useState<any[]>([]);
    const [notStarted, setNotStarted] = useState<any[]>([]);
    const { auth, logout } = useAuthContext();

    function selectFilter(e: SetStateAction<string>) {
        setFilter(e);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://fypbackend-production-d00d.up.railway.app/api/reviewer/courses/",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );
                // console.log(localStorage.getItem("accessToken"));
                console.log(response);
                setStarted(response.data.started); /// isko started karna hai
                setNotStarted(response.data.not_started);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching courses:", error);
                console.dir(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="flex flex-col">
                <div
                    className="fixed top-0 left-0 h-full w-16 flex flex-col bg-[#2c2c2c] shadow-lg transition-all duration-300 hover:w-60"
                    onMouseEnter={() => {
                        setHover(true);
                    }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                >
                    <div className="h-5/6 flex flex-col justify-start items-center">
                        <div className="flex my-4 mx-auto text-white cursor-pointer">
                            <HomeIcon />
                            <span
                                className={`${hover ? "block" : "hidden"
                                    } mx-2 transition-all duration-300`}
                            >
                                Home
                            </span>
                        </div>
                        <div className="flex my-4 mx-auto text-white cursor-pointer">
                            <BookIcon />
                            <span
                                className={`${hover ? "block" : "hidden"
                                    } mx-2 transition-all duration-300`}
                            >
                                Courses
                            </span>
                        </div>
                        <div className="flex my-4 mx-auto text-white cursor-pointer">
                            <GroupIcon />
                            <span
                                className={`${hover ? "block" : "hidden"
                                    } mx-2 transition-all duration-300`}
                            >
                                Home
                            </span>
                        </div>
                        <div className="flex my-4 mx-auto text-white cursor-pointer">
                            <BarChartIcon />
                            <span
                                className={`${hover ? "block" : "hidden"
                                    } mx-2 transition-all duration-300`}
                            >
                                Home
                            </span>
                        </div>
                        <div className="flex my-4 mx-auto text-white cursor-pointer">
                            <CircleIcon />
                            <span
                                className={`${hover ? "block" : "hidden"
                                    } mx-2 transition-all duration-300`}
                            >
                                Home
                            </span>
                        </div>
                    </div>
                    <div className="h-1/6 flex flex-col justify-end items-center">
                        <div
                            className="flex my-4 mx-auto text-white cursor-pointer"
                            onClick={() => {
                                logout && logout();
                            }}
                        >
                            <LogoutIcon />
                            <span
                                className={`${hover ? "block" : "hidden"
                                    } mx-2 transition-all duration-300`}
                            >
                                Logout
                            </span>
                        </div>
                    </div>
                </div>
                <div className="ml-16 p-8">
                    <header className="flex justify-between items-center">
                        <h1 className="text-4xl font-bold">Courses</h1>
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage alt="Student" src="./../../assets/course.png" />
                                <AvatarFallback>MK</AvatarFallback>
                            </Avatar>
                            {/* <Button className="bg-[#6e44ff] text-white">
                                <Link href="/instructor/course/create/1">New course</Link>
                            </Button> */}
                        </div>
                    </header>
                    <div className="mt-6 flex space-x-4">
                        <Input placeholder="Search your courses" />
                        <Select onValueChange={selectFilter}>
                            <SelectTrigger id="sort">
                                <SelectValue placeholder="Under review" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="started">Under Review</SelectItem>
                                <SelectItem value="notStarted">New Courses</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-6">

                        {!loading ? (
                            <div>
                                {(filter === "started" && started.length) || (filter === "notStarted" && notStarted.length) ? (
                                    <div className="m-1">
                                        {filter === "started" ? (
                                            started.map((course: any, id: any) => (
                                                <CourseCard started={filter} course={course} key={id} />
                                            ))
                                        ) : (
                                            notStarted.map((course: any, id: any) => (
                                                <CourseCard started={filter} course={course} key={id} />
                                            ))
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-xl font-bold">
                                        Wohoo! There are no courses up for review here.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="h-[200px] w-full flex justify-center items-center">
                                <Spinner h={12} w={12} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
