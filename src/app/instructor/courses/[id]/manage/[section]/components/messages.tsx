"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/hooks/authhooks";
import Spinner from "@/components/component/spinner";
import { Bounce, toast } from "react-toastify";
import { useParams } from "next/navigation";
import NoClick from "@/components/component/NoClick";

export default function Messages() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [congMessage, setCongMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { auth } = useAuthContext();
  const { id } = useParams();

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
        if (response.data.data.cong_message)
          setCongMessage(response.data.data.cong_message);
        if (response.data.data.welcome_message)
          setWelcomeMessage(response.data.data.welcome_message);
        
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
    console.log(congMessage);
    console.log(welcomeMessage);
    setUpdating(true);
    try {
      const response = await axios.patch(
        `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/update/`,
        {
          cong_message: congMessage,
          welcome_message: welcomeMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
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

  return (
    <>
      {updating && <NoClick />}
      {loading ? (
        <div className="h-[400px] flex justify-center items-center">
          <Spinner h={16} w={16} />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <main className="flex-1">
              <div className="bg-white p-6 rounded-md shadow">
                <h2 className="text-xl font-semibold mb-4">Course messages</h2>
                <p className="text-sm mb-6">
                  Write messages to your students (optional) that will be sent
                  automatically when they join or complete your course to
                  encourage students to engage with course content. If you do
                  not wish to send a welcome or congratulations message, leave
                  the text box blank.
                </p>
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Welcome Message
                    </h3>
                    <Textarea
                      placeholder="Type your welcome message here."
                      value={welcomeMessage}
                      onChange={(e) => {
                        setWelcomeMessage(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Congratulations Message
                    </h3>
                    <Textarea
                      placeholder="Type your congratulations message here."
                      value={congMessage}
                      onChange={(e) => {
                        setCongMessage(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button className="bg-purple-600 text-white" type="submit">
                    {updating ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </form>
      )}
    </>
  );
}
