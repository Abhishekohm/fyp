"use client";
import React from "react";
import { useParams } from "next/navigation";
import Curriculum from "./components/curriculum";
import Goals from "./components/goals";
import CourseStructure from "./components/course-structure";
import Setup from "./components/setup";
import Film from "./components/film";
import Captions from "./components/captions";
import Messages from "./components/messages";
import Basics from "./components/basics";

const SectionForm = () => {
  const { section } = useParams();
  return (
    <div>
      {section === "goals" && <Goals />}
      {section === "course-structure" && <CourseStructure />}
      {section === "setup" && <Setup />}
      {section === "film" && <Film />}
      {section === "curriculum" && <Curriculum />}
      {section === "captions" && <Captions />}
      {section === "messages" && <Messages />}
      {section === "basics" && <Basics />}
    </div>
  );
};

export default SectionForm;
