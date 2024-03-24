import { Button } from "@/components/ui/button";
import CourseCard from "../course/[courseId]/components/courseCard";

export default function dash() {
  return (
    <>
    <h2>Dashboard</h2>
      <Button className="ml-5 mt-5">
        <a href="http://localhost:3000/instructor/courses">Instructor</a>
      </Button>
      <Button className="ml-5 mt-5">
        <a href="http://localhost:3000/course/18">Ethical Hacking Course Card</a>
      </Button>
      {/* <CourseCard/> */}
    </>
  );
}
