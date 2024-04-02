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
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  BarChartIcon,
  BookIcon,
  CircleIcon,
  GroupIcon,
  HomeIcon,
  LogoutIcon,
} from "../utils/icons";

import CourseCard from "../components/CourseCard";
import Spinner from "@/components/component/spinner";
import { useAuthContext } from "@/hooks/authhooks";

export default function Courses() {
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const { auth, logout } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://fypbackend-production-d00d.up.railway.app/api/educator/courses/",
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        console.log(response);
        setCourses(response.data.data);
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
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
              <Button className="bg-[#6e44ff] text-white">
                <Link href="/instructor/course/create/1">New course</Link>
              </Button>
            </div>
          </header>
          <div className="mt-6 flex space-x-4">
            <Input placeholder="Search your courses" />
            <Select>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Newest" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6">
            {!loading ? (
              <div>
                {courses.length ? (
                  <div>
                    {courses.map((course: any, id: any) => {
                      return <CourseCard course={course} key={id} />;
                    })}
                  </div>
                ) : (
                  <div className="text-xl font-bold">
                    Looks like you haven't created any courses yet. Get started
                    by creating your first course now!
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
    </div>
  );
}
