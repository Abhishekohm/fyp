"use client";
import { useEffect, useState, useRef } from "react";
import placeholder from "../assets/placeholder.jpg";
import { Button } from "@/components/ui/button";
import NoClick from "@/components/component/NoClick";
import axios from "axios";
import { useParams } from "next/navigation";
import structuredClone from "@ungap/structured-clone";
import Spinner from "@/components/component/spinner";
import { useAuthContext } from "@/hooks/authhooks";
import { Bounce, toast } from "react-toastify";

export default function Basics() {
  const [loading, setLoading] = useState<boolean>(true);
  const [course, setCourse] = useState<any>({
    name: "",
    description: "",
    course_language: "",
    category: "",
    course_image: null,
  });
  const { id } = useParams();
  const { auth } = useAuthContext();
  const fileInputRef = useRef<any>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/details`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        setCourse({
          name: response.data.data.name,
          description: response.data.data.description,
          course_language: response.data.data.course_language,
          category: response.data.data.category,
          course_image: response.data.data.course_image,
        });

        setLoading(false);
      } catch (e) {
        console.log("Error Fetching Details:", e);
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(course);
    setUpdating(true);
    const formData = new FormData();
    // formData.append('data',({
    //         name: course.name,
    //         description: course.description,
    //         course_language: course.course_language,
    //         category: course.category,
    //         course_image: course.course_image,
    //       }))

    formData.append("name", course.name);
    formData.append("description", course.description);
    formData.append("course_language", course.course_language);
    formData.append("category", course.category);
    if (
      !(
        typeof course.course_image === "string" ||
        course.course_image instanceof String
      )
    )
      formData.append("course_image", course.course_image);

    try {
      const response = await axios.patch(
        `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/update/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log(response.data);
      toast.success(`Course updated successfully.`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setUpdating(false);
    } catch (e: any) {
      console.log("Error updating the couse:", e);
      toast.error(`${e?.response?.data?.message || e.message}.`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setUpdating(false);
    }
  };
  const updateState = (key: any, value: any) => {
    setCourse((course: any) => {
      const tempCourse = structuredClone(course);
      tempCourse[key] = value;
      return tempCourse;
    });
  };
  return (
    <>
      {updating && <NoClick />}
      {loading ? (
        <div className="h-[400px] flex justify-center items-center">
          <Spinner h={16} w={16} />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="border rounded-md col-span-3 p-6 bg-white shadow">
            <h1 className="text-2xl font-semibold mb-6">Course landing page</h1>
            <p className="mb-4">
              Your course landing page is crucial to your success on Udemy. If
              it's done right, it can also help you gain visibility in search
              engines like Google. As you complete this section, think about
              creating a compelling Course Landing Page that demonstrates why
              someone would want to enroll in your course. Learn more about
              <a className="text-blue-600" href="#">
                creating your course landing page
              </a>{" "}
              and{" "}
              <a className="text-blue-600" href="#">
                course title standards
              </a>
              .{"\n      "}
            </p>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="course-title"
              >
                Course title
              </label>
              <input
                className="w-full border px-2 py-1"
                id="course-title"
                placeholder="Sample"
                type="text"
                value={course.name}
                onChange={(e: any) => {
                  updateState("name", e.target.value);
                }}
              />
              <p className="text-xs mt-1">
                Your title should be a mix of attention-grabbing, informative,
                and optimized for search
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="course-description"
              >
                Course description
              </label>
              <textarea
                className="w-full border px-2 py-1"
                id="course-description"
                placeholder="Insert your course description."
                rows={4}
                value={course.description}
                onChange={(e: any) => {
                  updateState("description", e.target.value);
                }}
              />
              <p className="text-xs mt-1">
                Description should have minimum 200 words.
              </p>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="language"
                >
                  Language
                </label>
                <select
                  className="w-full border px-2 py-1"
                  id="language"
                  onChange={(e) => {
                    updateState("course_language", e.target.value);
                  }}
                  value={course.course_language}
                >
                  <option value="english">English</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="level"
                >
                  Select Category
                </label>
                <select
                  className="w-full border px-2 py-1"
                  id="level"
                  value={course.category}
                  onChange={(e) => {
                    updateState("category", e.target.value);
                  }}
                >
                  <option value="design">Design</option>
                  <option value="web development">Web Development</option>
                  <option value="it & software">IT & Software</option>
                  <option value="test prep">Test Preparation</option>
                  <option value="game development">Game Development</option>
                  <option value="office productivity">
                    Office Productivity
                  </option>
                  <option value="data Science">Data Science</option>
                  <option value="engineering">Engineering</option>
                  <option value="computer science">Computer Science</option>
                  <option value="math & science">Math & Science</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Course image
              </label>
              <div className="flex justify-between items-start p-4 border-dashed border-2 rounded-md mb-2">
                <div className="h-full m-1">
                  <img
                    src={
                      course.course_image
                        ? typeof course.course_image === "string" ||
                          course.course_image instanceof String
                          ? course.course_image
                          : URL.createObjectURL(course.course_image)
                        : "https://s.udemycdn.com/course/750x422/placeholder.jpg"
                    }
                    alt="course image"
                    className="object-cover h-[200px] w-[700px]"
                  />
                </div>
                <div className="m-1">
                  <div className="my-2">
                    <span className="text-md">
                      Upload your course image here. It must meet our{" "}
                      <a className="text-blue-600" href="#">
                        course image quality standards
                      </a>{" "}
                      to be accepted. Important guidelines: 750x422 pixels;
                      .jpg, .jpeg, .gif, or .png; not text on the image.
                    </span>
                  </div>
                  <div className="my-2">
                    <button
                      className="bg-purple-600 text-white px-3 py-1 rounded"
                      type="button"
                      onClick={() => {
                        fileInputRef.current && fileInputRef.current.click();
                      }}
                      disabled={updating}
                    >
                      Upload File
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        e.target &&
                          e.target.files &&
                          updateState("course_image", e.target.files[0]);
                      }}
                      ref={fileInputRef}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                className="bg-purple-600 text-white px-3 py-1 rounded"
                type="submit"
                disabled={updating}
              >
                {updating ? "Updating course.." : "Update Course"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
