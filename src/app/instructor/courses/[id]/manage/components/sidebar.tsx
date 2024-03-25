"use client";
import React from "react";
import { CheckCircleIcon, CircleIcon, SettingsIcon } from "../utils/utilities";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sections } from "./data";
import { useParams } from "next/navigation";

const Sidebar = () => {
  const { section: selectedSection } = useParams();
  return (
    <aside className="w-64 px-4 py-8 bg-white border-r">
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
                    href={`/instructor/courses/2323/manage/${link.link}`}
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
      <Button className="w-full mt-6 bg-purple-600 text-white">
        Submit for Review
      </Button>
    </aside>
  );
};

export default Sidebar;
