import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const CourseCard = ({ course, started }: { course: any, started: any }) => {
  const [progress, setProgess] = useState(50);
  const router = useRouter();

  async function handleStartReview() {
    try {
      const response = await axios.post(
        `https://fypbackend-production-d00d.up.railway.app/api/course/${course.id}/review/`,
        {},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        });
        console.log(response);
        console.log(`${localStorage.getItem("accessToken")}`);
        if(response)
        {
          router.push(`/reviewer/courses/${course.id}/review`)
        }
        
    }
    catch(error){
      console.log("Error reviewing course",error);
    }
    
    // router.push(`/reviewer/courses/${course.id}/review`)
  }

  useEffect(() => {
    let donecnt = 0, totalcnt = 0;
    for (const key in course) {
      totalcnt += 1;
      if (course[key])
        donecnt += 1;
    }
    // console.log(course)
    // console.log(donecnt)
    // console.log(totalcnt)
    setProgess(donecnt * 100 / totalcnt);
  }, []);

  return (
    <Card className="w-full my-3">
      <CardContent className="p-3">
        <div className="flex items-center">
          <div className="w-1/12">
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
          </div>
          <div className="flex-1 w-2/6">
            {started === "started" ?
              <Link
                href={`/reviewer/courses/${course.id}/review`}
                className="text-lg font-semibold capitalize"
              >
                {course.name}
              </Link>
              :
              <div className="text-lg font-semibold capitalize">
                {course.name}
              </div>}
            <div className="text-sm text-gray-500 w-2/5">
              {course.under_review && "Under review"}
              {course.approved && "Published"}
              {!course.under_review && !course.approved && "Draft"}
            </div>
            {/* <Progress className="w-full mt-2" value={50} /> */}
          </div>
          <div className="w-3/5">
            <span className="mb-4 block">Progess of your course</span>
            <div className=" bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 w-full">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          {started === "notStarted" &&
            <div className="ml-8">
              <Button variant="outline" onClick={handleStartReview}>Start Reviewing</Button>
            </div>
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
