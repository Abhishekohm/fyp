"use section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import { Textarea } from "../ui/textarea";

export function NewSectionForm(_props: any) {
  const [sectionName, setSectioName] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<any>("");
  const { id } = useParams();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (!sectionName || !description) {
        return;
      }
      setLoading(true);
      const response = await axios.post(
        `https://fypbackend-production-d00d.up.railway.app/api/course/${id}/section/create/`,
        {
          name: sectionName,
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      _props.appendNewSection(response.data.data);
      _props.setShowForm(false);
      toast.success(`Section created successfully.`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (e: any) {
      console.log("Error while creating the section:", e);
      toast.error(`${e?.response?.data?.message || e.message}`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 border border-gray-200 rounded-md space-y-6 dark:border-gray-800">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">New Section:</h2>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-y-4">
          <Input
            className="flex-1"
            placeholder="Enter a Title"
            value={sectionName}
            onChange={(e) => {
              setSectioName(e.target.value);
            }}
          />
        </div>
        <div className="flex items-top space-x-2 my-4">
          <Textarea
            className="flex-1"
            id="lecture-desciption"
            placeholder="Enter a Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <Button
            className="ml-2 border-2 border-black hover:bg-gray-300"
            onClick={() => {
              _props.setShowForm(false);
            }}
            disabled={loading}
            type="button"
          >
            Cancel
          </Button>
          <Button
            className="ml-2 border-2 border-black hover:bg-gray-300"
            disabled={loading}
            type="submit"
          >
            {loading ? "Adding Section" : "Add Section"}
          </Button>
        </div>
      </form>
    </div>
  );
}
