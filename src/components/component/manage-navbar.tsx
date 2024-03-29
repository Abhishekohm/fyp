"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export function ManageNavbar() {
  const [course, setCourse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(
          `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/details`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCourse(response.data.data);
        setLoading(false);
      } catch (e) {
        console.log("Error fetching name:", e);
      }
    };
    fetchName();
  }, []);
  return (
    <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between absolute w-screen top-0 z-40">
      <Link className="flex items-center space-x-4" href="/instructor/courses/">
        <ChevronLeftIcon className="text-white" />
        <p className="text-blue-500 hover:text-blue-400">Back to courses</p>
        <h1 className="text-xl font-semibold capitalize">
          {loading ? "Loading..." : course.name}
        </h1>
        {!loading && (
          <Badge
            variant="secondary"
            className={`mt-1 ${course.under_review && "bg-yellow-400"} ${
              course.approved && "bg-blue-400"
            } ${
              !course.under_review &&
              !course.approved &&
              "bg-gray-400 text-black"
            }
            }`}
          >
            {course.under_review && "Under Review"}
            {course.approved && "Approved"}
            {!course.under_review && !course.approved && "Draft"}
          </Badge>
        )}
      </Link>
      {/* <div className="flex items-center space-x-4">
        <span>0min of video content uploaded</span>
        <Button className="bg-gray-700 hover:bg-gray-600">
          <CogIcon className="text-white" />
        </Button>
        <Button className="bg-gray-700 hover:bg-gray-600">Save</Button>
      </div> */}
    </div>
  );
}

function ChevronLeftIcon(
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
      <path d="m15 18-6-6 6-6" />
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
