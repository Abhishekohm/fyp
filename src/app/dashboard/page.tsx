"use client";
import RequireLogin from "@/components/component/RequireLogin";
import { Button } from "@/components/ui/button";

export default function dash() {
  return (
    <RequireLogin>
      <>
        <h2>Dashboard</h2>
        <Button className="ml-5 mt-5">
          <a href="http://localhost:3000/instructor/courses">Instructor</a>
        </Button>
        <Button className="ml-5 mt-5">
          <a href="http://localhost:3000/course/18">
            Ethical Hacking Course Card
          </a>
        </Button>
        {/* <CourseCard/> */}
      </>
    </RequireLogin>
  );
}
