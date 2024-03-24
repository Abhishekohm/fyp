import { Button } from "@/components/ui/button";
import CourseCard from "../course/[courseId]/components/courseCard";

export default function dash() {
  return (
    <>
      <Button>
        <a href="http://localhost:3000/instructor/courses">Instructor</a>
      </Button>
      <CourseCard/>
    </>
  );
}
