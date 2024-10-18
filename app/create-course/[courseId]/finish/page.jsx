'use client'
import { useRouter } from 'next/navigation'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo'
import { HiOutlineClipboardCopy } from "react-icons/hi";

export default function FinishScreen({params}) {

    const {user} = useUser();
    const [course, setCourse] = useState([]); 
    const router=useRouter();
  
      useEffect(()=>{
      params && GetCourseId();
    },[params,user]);
  
    const GetCourseId = async () => {
      try {
        const result = await db.select().from(CourseList)
          .where(and(eq(CourseList.courseId, params.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)));
    
        if (result.length) {
          setCourse(result[0]);
        } else {
          setCourse(null); // or handle empty result case
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        // You might want to set an error state here
      }
    };

  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
        <h2 className='text-center font-bold text-2xl my-3 text-primary'>Hooray! 🙌 Your course is ready... </h2>
       
        <CourseBasicInfo course={course} refreshData={()=>console.log}/>

        <h2 className='mt-3'>Course Link:</h2>
        <h2 className='text-center text-gray-400 border p-2 rounded flex gap-5 items-center'>
            {process.env.NEXT_PUBLIC_HOSTNAME}/course/view/{course?.courseId}
            <HiOutlineClipboardCopy className='h-5 w-5 cursor-pointer'  onClick={async()=> await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOSTNAME+'/course/view/'+course?.courseId)}/> </h2>    
    </div>
  )
}
