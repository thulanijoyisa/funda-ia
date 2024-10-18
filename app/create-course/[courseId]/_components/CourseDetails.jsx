import React from 'react'
import { HiOutlineChartBar, HiOutlineClock, HiOutlineBookOpen, HiOutlineVideoCamera } from "react-icons/hi";


export default function CourseDetails({ course }) {
    return (
        <div className='border p-6 rounded-xl shadow-sm mt-3'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
                <div className='flex gap-2'>
                    <HiOutlineChartBar className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Skill Level</h2>
                        <h2 className='font-medium text-lg'>{course?.level}</h2>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <HiOutlineClock className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Course Duration</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.duration}</h2>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <HiOutlineBookOpen className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>No of Chapters</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.noOfChapters}</h2>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <HiOutlineVideoCamera className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Videos Included?</h2>
                        <h2 className='font-medium text-lg'>{course?.includeVideos}</h2>
                    </div>
                </div>

            </div>
        </div>
    )
}
