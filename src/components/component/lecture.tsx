"use client";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import NoClick from "./NoClick";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { useParams } from "next/navigation";

export function Lecture(props: any) {
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams();
  function formatTime(seconds:any) {
    // Calculate hours, minutes, and remaining seconds
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    // Format hours, minutes, and seconds as strings with leading zeros if needed
    var hoursStr = hours < 10 ? "0" + hours : hours;
    var minutesStr = minutes < 10 ? "0" + minutes : minutes;
    var secondsStr =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    // Construct the time string
    var timeString = hoursStr + ":" + minutesStr + ":" + secondsStr;

    return timeString;
  }

  const deleteLecture = async () => {
    console.log("Deleting Lecture");
    setDeleting(true);
    try {
      const response = await axios.delete(
        `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/section/${props.section_id}/curriculum_item/${props.lecture.id}/delete`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      props.setSections(response.data.data);
      toast.success(`Lecture deleted successdully.`, {
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
      setDeleting(false);
    } catch (e: any) {
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
      setDeleting(false);
    }
  }
  return (
    <>
      {deleting && <NoClick />}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg border-2 border-black my-4">
        <div className="flex justify-between items-start border-b pb-2">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold capitalize">
              Lecture {props.index + 1}: {props.lecture.name}
            </h2>
            <Button type="button" onClick={deleteLecture}>
              <Trash />
            </Button>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <img
              alt="Video thumbnail"
              className="h-15 w-20 bg-gray-200"
              height="60"
              src="https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              style={{
                aspectRatio: "80/60",
                objectFit: "cover",
              }}
              width="80"
            />
            <div>
              <p className="font-medium capitalize">
                Name : {props.lecture.fileName}
              </p>
              <p className="text-sm text-gray-500 capitalize">
                Type : {props.lecture.type}
              </p>
              {props.lecture.type === "video" && (
                <p className="text-sm text-gray-500">
                  Duration : {formatTime(props.lecture.duration)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
