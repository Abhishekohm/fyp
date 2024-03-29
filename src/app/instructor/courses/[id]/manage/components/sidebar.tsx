"use client";
import React, { useState } from "react";
import { CheckCircleIcon, CircleIcon, SettingsIcon } from "../utils/utilities";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sections } from "./data";
import { useParams } from "next/navigation";
import NoClick from "@/components/component/NoClick";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { section: selectedSection, id: courseid } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const handleClick = async () => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/submit/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast.success(`Course submitted for review.`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push("/instructor/courses/");
      setSubmitting(false);
    } catch (e: any) {
      console.log("Error updating the couse:", e);
      toast.error(`${e?.response?.data?.message || e.message}.`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setSubmitting(false);
    }
  }

  return (
    <>
      {submitting && <NoClick />}
      <aside className="w-64 px-4 py-8 bg-white border-r mt-10">
        <nav className="space-y-1">
          {sections.map((section, id) => {
            return (
              <div key={id}>
                <p className="mt-4 text-xs font-semibold text-gray-500 uppercase">
                  {section.title}
                </p>
                {section.links.map((link, id) => {
                  return (
                    <Link
                      className={`flex items-center px-2 py-1 text-gray-600 my-2 ${
                        selectedSection === link.link
                          ? "border-l-8 border-black"
                          : ""
                      }`}
                      href={`/instructor/courses/${courseid}/manage/${link.link}`}
                      key={id}
                    >
                      {/* <link.icon className="w-4 h-4 mr-2 text-gray-400" /> */}
                      {link.text}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>
        <Button className="w-full mt-6 bg-purple-600 text-white" onClick={handleClick}>
          {submitting ? "Submitting..." : "Submit for Review"}
        </Button>
      </aside>
    </>
  );
};

export default Sidebar;
