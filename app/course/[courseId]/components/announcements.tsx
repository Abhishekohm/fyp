import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import React from 'react'

function announcements() {
    return (
        <div className="bg-gray-100 p-4">
            <Link className="text-blue-600 hover:underline" href="#">
                Back to all announcements
            </Link>
            <div className="mt-4">
                <Avatar>
                    <AvatarImage alt="OCSALY" src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>O</AvatarFallback>
                </Avatar>
                <div className="inline-block align-middle ml-2">
                    <p>OCSALY</p>
                    <p className="text-sm text-gray-600">posted an announcement · 24 days ago</p>
                </div>
            </div>
        </div>
    )
}

export default announcements