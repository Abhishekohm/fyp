import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import structuredClone from "@ungap/structured-clone";
import { useAuthContext } from "@/hooks/authhooks";
import { toast, Bounce } from "react-toastify";

export function NewLectureForm(props: any) {
  const videoInputRef = useRef<any>(null);
  const [title, setTitle] = useState<any>();
  const [video, setVideo] = useState<any>(null);
  const [type, setType] = useState<any>("video");
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const { section_id } = props;
  const { auth } = useAuthContext();

  function uploadFile(event: any) {
    let file = event.target.files[0];
    console.log(file);

    if (file) {
      setVideo(file);
    }
  }

  const UploadLecture = async (e: any) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Video:", video);
    console.log("Type:", type);
    const formData = new FormData();
    formData.append("name", title);
    formData.append("media", video);
    formData.append("type", type);
    console.log(formData);
    setSubmitting(true);
    try {
      const response = await axios.post(
        `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/section/${section_id}/curriculum_item/create/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      const curriculum = response.data.data;
      console.log(curriculum);
      props.setSections((sections: any[]) => {
        const tempSections: any[] = [];
        sections.forEach((section) => {
          if (section.id === section_id) {
            const tempSection = structuredClone(section);
            if (!tempSection.curriculum_item) tempSection.curriculum_item = [];
            tempSection.curriculum_item.push(curriculum);
            tempSections.push(tempSection);
          } else {
            tempSections.push(structuredClone(section));
          }
        });
        return tempSections;
      });
      setSubmitting(false);
      toast.success(`Curriculum created successfully.`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      props.setShowNewLectureForm(false);
    } catch (e: any) {
      console.log("Error creating curriculum", e);
      toast.error(`${e?.response?.data?.message || e.message}`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setSubmitting(false);
    }
    // props.setShowNewLectureForm(false);
  };

  return (
    <form onSubmit={UploadLecture}>
      <div className="max-w-4xl mx-auto p-4 border-2 border-black  rounded-md dark:border-gray-800">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <label className="font-medium w-1/6" htmlFor="new-lecture">
              New Lecture:
            </label>
            <Input
              className="flex-1"
              id="new-lecture"
              placeholder="Enter a Title"
              autoComplete="off"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="flex items-top space-x-2">
            <label className="font-medium w-1/6" htmlFor="lecture-type">
              Type :
            </label>
            <div className="flex-1">
              <select
                id="countries"
                className="border-gray-200 border rounded focus:border-black-10"
                onChange={(e: any) => {
                  setType(e.target.value);
                }}
                value={type}
              >
                <option value="video" selected>
                  Video
                </option>
                <option value="material">Study Material</option>
              </select>
            </div>
          </div>
          <div className="flex items-top space-x-2">
            <label className="font-medium w-1/6" htmlFor="lecture-desciption">
              Upload Video :
            </label>
            <Button
              className="ml-2 border border-gray hover:bg-gray-300"
              onClick={() => {
                console.log(props.showNewLectureForm);
                videoInputRef.current && videoInputRef.current.click();
              }}
              type="button"
            >
              Upload
            </Button>

            {video && <p className="pt-2">{video.name}</p>}
            <input
              type="file"
              accept="video/*,.pdf"
              style={{ display: "none" }}
              ref={videoInputRef}
              onChange={uploadFile}
            ></input>
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              className="ml-2 border-2 border-black hover:bg-gray-300"
              onClick={() => {
                props.setShowNewLectureForm(false);
              }}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="ml-2 border-2 border-black hover:bg-gray-300"
              disabled={submitting}
            >
              {submitting ? "Adding Lecture...." : "Add Lecture"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
