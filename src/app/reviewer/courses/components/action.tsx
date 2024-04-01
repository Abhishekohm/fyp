import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios';
import React, { useState } from 'react'
import { toast, Bounce } from "react-toastify";
import { useRouter } from 'next/navigation';


function action({ course }: { course: any }) {

    const router = useRouter();
    const [comment, setComment] = useState("");

    function inputComment(e: any) {
        // console.log(e);
        setComment(e.target.value)
    }

    async function handleApprove() {

        try {
            const response = await axios.post(
                `https://fypbackend-production-d00d.up.railway.app/api/course/${course.id}/approve/`,
                {
                    "comment": comment
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });
            console.log(response);
            console.log(`${localStorage.getItem("accessToken")}`);
            if (response) {
                setComment("");
                toast.success(`Course approved. Suggestion sent to course instructor...`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                router.push(`/reviewer/courses`)
            }
        }
        catch (error) {
            console.log("Error in approving course", error);
            toast.error(`${error.response.data.message}...Response not sent.`, {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        }
    }

    async function handleReject() {

        try {
            const response = await axios.post(
                `https://fypbackend-production-d00d.up.railway.app/api/course/${course.id}/reject/`,
                {
                    "comment": comment
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });
            console.log(response);
            console.log(`${localStorage.getItem("accessToken")}`);
            if (response) {
                setComment("");
                toast.success(`Course rejected. Suggestion sent to course instructor...`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                router.push(`/reviewer/courses`)
            }
        }
        catch (error) {
            console.log("Error in rejecting course", error);
            toast.error(`${error.response.data.message}...Response not sent.`, {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    return (
        <div className='grid grid-cols-5 w-full'>
            <div className='col-span-4'>
                <Textarea onChange={inputComment} className='h-full' placeholder='Enter any suggestions or reviews...' />
            </div>
            <div className='my-3 mx-auto col-span-1'>
                <div className=''>
                    <Button className='w-full bg-green-600 text-white' onClick={handleApprove}>Approve Course</Button>
                </div>
                <div className='mt-6'>
                    <Button className='w-full bg-red-600 text-white' onClick={handleReject}>Reject Course</Button>
                </div>
            </div>
        </div>
    )
}

export default action