import Image from 'next/image'
import React from 'react'
import { HiOutlineBookOpen, HiMiniEllipsisVertical } from "react-icons/hi2";
import DropdownOption from './DropdownOption';
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
  

export default function CourseCard({course, refreshData, displayUser=false}) {
    const handleOnDelete=async()=>{
        const resp= await db.delete(CourseList).where(
            eq(CourseList?.id, course?.id) && eq(Chapters?.courseId, course?.id)).returning({id:CourseList?.id})

            if(resp){
                refreshData()
            }
        
    }
  return (
    
    <div className='shadow-sm rounded-lg border p-2 hover:scale-105 transition-all cursor-pointer mt-4'>
        <Link href={'/course/'+course?.courseId}>
        <Image src={course?.courseBanner} width={300} height={200} className='w-full h-[200px] object-cover rounded-lg'/>
        
        <div className='p-2'>
            <h2 className='font-medium text-lg flex justify-between items-center'>{course?.courseOutput?.courseName}
              {!displayUser&&  <DropdownOption deleteCourse={()=>handleOnDelete()}><HiMiniEllipsisVertical/></DropdownOption>}
                 
            </h2>

            <p className='text-sm text-gray-400 my-2'>{course?.category}</p>
            <div className='flex items-center justify-between'>
                <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm'><HiOutlineBookOpen/>{course?.courseOutput?.noOfChapters} Chapters</h2>
                <h2 className='text-sm bg-purple-50 text-primary p-1 rounded-sm'>{course?.level}</h2>
            </div>

          {displayUser&& <div className='flex gap-2 items-center mt-2'>
                <Image src={course?.userProfileImage } width={30} height={30} className='rounded-full'/>
                <h2 className='text-sm'>{course?.userName}</h2>
            </div>}

        </div>
        </Link>

    </div>
   
  )
}
