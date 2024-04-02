"use client"
import React, { useEffect, useState } from 'react'
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { useAuthContext } from '@/hooks/authhooks';

function Course({ params }) {

    const [courseInfo, setCourseInfo] = useState();
    const [curriculum, setCurriculum] = useState();
    const [enroll, setEnroll] = useState("Enroll Now");
    const [enrolling, setEnrolling] = useState(false);
    const { auth } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://fypbackend-production-d00d.up.railway.app/api/course/${params.id}/curriculum/`
                );
                console.log(response);
                setCourseInfo(response.data.course);
                setCurriculum(response.data.data);
                console.log(typeof response.data.data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching courses:", error);
                console.dir(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    function formatDate(dateString: string | number | Date) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    }

    async function handleEnroll() {
        try {
            setEnrolling(true);
            const response = await axios.post(
                `https://fypbackend-production-d00d.up.railway.app/api/course/${params.id}/enroll/`,
                {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });
            // console.log(auth.accessToken);
            // console.log(`${localStorage.getItem("accessToken")}`);
            if (response) {
                toast.success(`Enrolled successfully.`, {
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
                setEnrolling(false);
                setEnroll("Start Learning");
                // router.push(`/reviewer/courses`)
            }
        }
        catch (error) {
            console.log("Error in enrolling course", error);
            toast.error(`${error.response.data.message}...Couldn't enroll you.`, {
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
            setEnrolling(false);
        }
    }

    function calcLectures() {
        let lec = 0;
        // console.log("Curriculum: ", curriculum);
        if (curriculum) {
            curriculum.forEach(item => {
                lec += item.curriculum_item.length;
            });
        }
        return lec.toString();
    }

    if ((!courseInfo || !curriculum)) {
        if (!loading) {
            return <div className=' text-xl w-100 bg-red-100 text-red-600'>
                Error: Not found
            </div>
        }
        else {
            return <div className='text-xl flex justify-center items-center h-full w-full'>Loading...</div>
        }
    }

    return (
        <div>
            <header className="bg-gray-800 text-white py-2 px-4" style={{ height: "7vh" }}>
                <h1 className="text-xl font-bold">
                    <Link href="/dash" className="mr-3">
                        OpenAcademy
                    </Link>
                </h1>
            </header>
            <div className='max-w-6xl rounded-md mt-6 mx-auto p-0 bg-white'>
                <div className='p-6 text-white' style={
                    {
                        opacity: "0.9",
                        backgroundImage: "url('https://media.licdn.com/dms/image/C4E16AQFC6DgOL_izRg/profile-displaybackgroundimage-shrink_350_1400/0/1639984843402?e=1717027200&v=beta&t=ZrRtfSkn-xJVBakUnkkPHhDR_A0wf_kpBUBRhk2Tubg')"
                    }}>
                    <h1 className="text-3xl font-bold capitalize">{courseInfo?.name}</h1>
                    <p className="text-sm text-gray-100">Understanding Your Financial Life</p>
                    <div className="flex items-center space-x-2 my-2">
                        <div className="text-yellow-400">⭐ 4.6</div>
                        <div className="text-sm text-gray-100">(8,000 ratings)</div>
                        <div className="text-sm text-gray-100">{courseInfo?.number_of_approvals} approvals</div>
                    </div>
                    <div className="text-sm text-gray-100">
                        👤 Created by{" "}
                        <a className="text-blue-600 capitalize" href="#">
                            Author Name
                        </a>
                    </div>
                    <div className="text-sm text-gray-100 ">🖋️ Last updated {formatDate(courseInfo?.date_of_updation)}</div>
                    <div className="text-sm text-gray-100 capitalize">🌐 {courseInfo?.course_language !== undefined && courseInfo?.course_language || "English"}</div>
                    {/* <div className="text-sm text-gray-600">English [Auto]</div> */}
                </div>
                <div className="grid grid-cols-3 gap-4 mt-0 p-6">
                    <div className=" col-span-2 m-0">
                        <Button variant={'outline'} className="w-1/4 h-12 "><Link href={`/course/${params.id}`}>Preview this course</Link></Button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl rounded-md mt-0 mx-auto p-0 bg-white">

                <div className="grid grid-cols-3 gap-4 mt-4 p-6">
                    <div className="col-span-2">
                        <div className="mt-1">
                            <div className="mb-0">
                                <h2 className="text-xl font-semibold">Description</h2>
                                <hr />
                                <div className="text-sm mt-2">
                                    <p>{courseInfo?.description}</p>
                                    {/* <Button className="text-blue-600">Show more</Button> */}
                                </div>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold">Course content</h2>
                                <hr />
                                <div className="mt-2 mb-5">
                                    <div className="text-sm">
                                        <div className='grid grid-cols-2'>
                                            <div className='grid-col-span-1'>{curriculum.length} sections • {!loading && calcLectures()} lectures</div>
                                            <div className="m-[-9px] grid-col-span-1">
                                                <Button onClick={() => { setExpand(!expand) }} className="text-blue-600">{expand ? "Collapse curriculum" : "Expand curriculum"}</Button>
                                            </div>
                                        </div>
                                        <ul className='mt-6 ml-4 font-semibold text-base '>
                                            {expand && curriculum.map((item, index) => (
                                                <li className='mt-1' key={item.id}> {index + 1}. {item.name}</li>
                                            ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* fthftgb */}
                        </div>
                    </div>
                    <div className="col-span-1 drop-shadow-lg" style={{ position: "relative", top: "-150px" }}>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className='capitalize'>{courseInfo?.name}</CardTitle>
                                <CardDescription>Understanding Your Financial Life</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <div className="text-yellow-400">⭐ 4.6</div>
                                    <div className="text-sm">(8,000 ratings)</div>
                                </div>
                                <div className="text-sm">105,917 students</div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-2">
                                {(enroll === "Enroll Now") ?
                                    <Button onClick={handleEnroll} className="w-full h-12 bg-teal-600 text-white" disabled={enrolling}>
                                        {enrolling ? "Enrolling..." : enroll}
                                    </Button>
                                    :
                                    <Button className="w-full h-12 bg-teal-600 text-white" disabled={enrolling}>
                                        <Link href={`/course/${params.id}`}>Start Learning</Link>
                                    </Button>
                                }
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <div className='max-w-6xl rounded-md mt-1  mx-auto p-6 bg-white'>
                <div className="grid grid-cols-3 gap-4 mt-1 p-0">
                    <div className="col-span-1 p-2">
                        <h2 className="text-xl font-semibold">Course Outcomes</h2>
                        <hr />
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="text-sm">
                                <ul className="list-disc pl-4">
                                    {(courseInfo?.course_outcome === "") ? (courseInfo?.course_outcome.substring(1, courseInfo?.course_outcome.length - 1).split(', ').map((item, index) => (
                                        <li key={index}>{item.substring(9, item.length - 2)}</li>
                                    ))) :
                                        (<div>Details Not Provided</div>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 p-2">
                        <h2 className="text-xl font-semibold">Intended Learners</h2>
                        <hr />
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="text-sm">
                                <ul className="list-disc pl-4">
                                    {(courseInfo?.target_audience === "") ? (courseInfo?.target_audience.substring(1, courseInfo?.target_audience.length - 1).split(', ').map((item, index) => (
                                        <li key={index}>{item.substring(9, item.length - 2)}</li>
                                    ))) :
                                        (<>Details Not Provided</>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 p-2">
                        <h2 className="text-xl font-semibold">Prerequisites</h2>
                        <hr />
                        <ul className="list-disc text-sm pl-4 mt-2">
                            {(courseInfo?.prerequisites === "") ? (courseInfo?.prerequisites.substring(1, courseInfo?.prerequisites.length - 1).split(', ').map((item, index) => (
                                <li key={index}>{item.substring(9, item.length - 2)}</li>
                            ))) :
                                (<>Details Not Provided</>)}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='max-w-6xl rounded-md mt-1 mx-auto p-6 bg-white'>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Instructor</h2>
                    <hr />
                    <div className="text-sm mt-2">
                        <div>Richard Outram</div>
                        <div>University Instructor & Business Leadership</div>
                        <div className="text-yellow-400">⭐ 4.6 Instructor Rating</div>
                        <div className="text-gray-600">46,167 students</div>
                        <div className="text-gray-600">15 courses</div>
                        {/* <Button className="text-blue-600">Show more</Button> */}
                    </div>
                </div>
            </div>
            <div className='max-w-6xl rounded-md mt-1 mb-24 mx-auto p-6 bg-white'>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">4.6 course rating • 2K ratings</h2>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="text-sm">
                            <div>Student Name</div>
                            <div className="text-yellow-400">⭐ 5.0</div>
                            <div className="text-gray-600">Very clear and structure to picture the content.</div>
                        </div>
                        <div className="text-sm">
                            <div>Student Name</div>
                            <div className="text-yellow-400">⭐ 4.0</div>
                            <div className="text-gray-600">Very good and useful information.</div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Button className="text-blue-600">Show all reviews</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course