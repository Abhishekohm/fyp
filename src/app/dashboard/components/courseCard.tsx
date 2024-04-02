import React, { useState } from 'react';
import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function CourseCard({ course , learning }) {
    const [progress, setProgess] = useState(30);

    console.log(course);

    return (
        <div className="w-full grid gap-2">
            <Card className='flex flex-col h-full'>
                <div className="flex-none">
                    <img
                        alt="Course thumbnail"
                        className="aspect-video rounded-lg p-1 rounded-b-3xl  object-cover object-center"
                        height="200"
                        src="/courseImg.png"
                        width="400"
                    />
                </div>
                <CardContent className="grid grid-cols-6 rounded-xl pt-2 pb-1 flex-1">
                    <div className='col-span-5'>
                        <CardTitle className="text-xl font-semibold">{course.name}</CardTitle>
                        <CardDescription className="text-sm my-1">Prof. {course.educator.firstname} {course.educator.lastname}</CardDescription>
                    </div>
                    <div className='self-right col-span-1'>
                        <Link href={`/course/${course.id}`}>
                            <Button className='bg-teal-600 text-white justify-center'>
                                <p className='mb-2 text-3xl'>→</p>
                            </Button>
                        </Link>
                    </div>
                </CardContent>
                <div className='tags text-gray-500 px-2 overflow-hidden' style={{ maxHeight: '6rem' }}>
                    <p className='bg-gray-100 inline-block px-2 m-1 rounded-sm capitalize'>{course.category}</p>
                    <p className='bg-gray-100 inline-block px-2 m-1 rounded-sm'>Computer Science</p>
                    <p className='bg-gray-100 inline-block px-2 m-1 rounded-sm'>Security Systems</p>
                    <p className='bg-gray-100 inline-block px-2 m-1 rounded-sm'>A.I</p>
                    <p className='bg-gray-100 inline-block px-2 m-1 rounded-sm'>Debugging</p>
                </div>
                <div className='p-2 flex gap-2'>
                    <CardDescription className="border flex justify-center align-center my-1 mt-3 gap-2 max-w-fit text-xs">
                        <img className='h-5 w-5 p-0 m-0 ml-1' src='/approve.png' />
                        <div className='text-sm mr-1'>{course.number_of_approvals}</div>
                    </CardDescription>
                    <CardDescription className="flex justify-center my-1 mt-3 gap-2 max-w-fit text-xs">
                        <div className='text-sm mr-1 capitalize'>🌐 {course.course_language}</div>
                    </CardDescription>
                </div>
                <div className=" bg-gray-300 rounded-b-3xl h-2.5 dark:bg-gray-700 w-full">
                    <div
                        className="bg-teal-600 h-2.5 rounded-bl-3xl mt-3"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </Card>
        </div>
    );
}

export default CourseCard;
