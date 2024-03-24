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
import { CardContent, Card } from "@/components/ui/card";
import { JSX, SVGProps } from "react";
import { useState } from "react";
import Link from "next/link";

export default function Courses() {
  const [hover, setHover] = useState(false);

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
          <div className="flex my-4 mx-auto text-white ">
            <HomeIcon />
            <span
              className={`${
                hover ? "block" : "hidden"
              } mx-2 transition-all duration-300`}
            >
              Home
            </span>
          </div>
          <div className="flex my-4 mx-auto text-white">
            <BookIcon />
            <span
              className={`${
                hover ? "block" : "hidden"
              } mx-2 transition-all duration-300`}
            >
              Courses
            </span>
          </div>
          <div className="flex my-4 mx-auto text-white">
            <GroupIcon />
            <span
              className={`${
                hover ? "block" : "hidden"
              } mx-2 transition-all duration-300`}
            >
              Home
            </span>
          </div>
          <div className="flex my-4 mx-auto text-white">
            <BarChartIcon />
            <span
              className={`${
                hover ? "block" : "hidden"
              } mx-2 transition-all duration-300`}
            >
              Home
            </span>
          </div>
          <div className="flex my-4 mx-auto text-white">
            <CircleIcon />
            <span
              className={`${
                hover ? "block" : "hidden"
              } mx-2 transition-all duration-300`}
            >
              Home
            </span>
          </div>
          {/* <BookIcon className="my-4 mx-auto text-white" />
          <GroupIcon className="my-4 mx-auto text-white" />
          <BarChartIcon className="my-4 mx-auto text-white" />
          <CogIcon className="my-4 mx-auto text-white" />
          <CircleIcon className="mt-auto mb-4 mx-auto text-white" /> */}
        </div>
        <div className="ml-16 p-8">
          <header className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Courses</h1>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage alt="Student" src="./../../assets/course.png" />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
              <Button className="bg-[#6e44ff] text-white"><a href="/instructor/course/create/1">New course</a></Button>
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
            <Card className="w-full">
              <CardContent>
                <div className="flex items-center">
                  <img
                    alt="Sample Course"
                    className="mr-4"
                    height="60"
                    src="https://cdn-icons-png.freepik.com/512/3482/3482504.png"
                    style={{
                      aspectRatio: "60/60",
                      objectFit: "cover",
                    }}
                    width="60"
                  />
                  <div className="flex-1">
                    <Link
                      href="/instructor/courses/2323/manage/goals"
                      className="text-xl font-semibold"
                    >
                      Sample
                    </Link>
                    <div className="text-sm text-gray-500">DRAFT Public</div>
                    {/* <Progress className="w-full mt-2" value={50} /> */}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent>
                <div className="flex items-center">
                  <img
                    alt="Teaching Blockchain"
                    className="mr-4"
                    height="60"
                    src="https://cdn-icons-png.freepik.com/512/3482/3482504.png"
                    style={{
                      aspectRatio: "60/60",
                      objectFit: "cover",
                    }}
                    width="60"
                  />
                  <div className="flex-1">
                    <Link
                      href="/instructor/courses/2323/manage/goals"
                      className="text-xl font-semibold"
                    >
                      Teaching Blockchain
                    </Link>
                    <div className="text-sm text-gray-500">DRAFT Public</div>
                    {/* <Progress className="w-full mt-2" value={75} /> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <p className="text-sm text-gray-600">
              Based on your experience, we think these resources will be
              helpful.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function BookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function GroupIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  );
}

function BarChartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function CogIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  );
}

function CircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
