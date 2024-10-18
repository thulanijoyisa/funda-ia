import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { HiOutlineHashtag } from "react-icons/hi";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { storage } from '@/configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/configs/db';
import Link from 'next/link';

export default function CourseBasicInfo({ course, refreshData, edit=true }) {
    if (!course) {
      return <p>No course data available.</p>;
    }

    useEffect(() => {
        console.log(course); // Log the course data to check its structure
      }, [course]);
    
    const [selectedFile, setSeletectedFile]= useState();

    useEffect(()=>{
      if(course){
        setSeletectedFile(course?.courseBanner)
      }

    },[course])

    const onFileSelected= async (event)=>{
        const file=event.target.files[0];
        setSeletectedFile(URL.createObjectURL(file));

        const fileName= Date.now()+'jpg'
        const storageRef= ref(storage, 'ai-course/'+fileName)
        await uploadBytes(storageRef, file).then((snapshot)=>{
          console.log('Upload File Completed')
        }).then(resp=>{
          getDownloadURL(storageRef).then(async(downloadUrl)=>{
            console.log(downloadUrl);

            await db.update(CourseList).set({
              courseBanner:downloadUrl
            }).where(eq(CourseList.id, course?.id))

          })
        })

    }
  
    return (
      <div className='p-10 border rounded-xl shadow-sm  mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
          <div>
            <h2 className='font-bold text-3xl'>{course?.courseOutput?.courseName} 
              {edit&& <EditCourseBasicInfo course={course} refreshData={()=> refreshData(true)}/>} </h2>
            <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.description}</p>
            <h2 className='font-medium mt-2 flex gap-2  items-center text-primary'><HiOutlineHashtag />{course?.category}</h2>
            {!edit&&<Link href={'/course/'+course?.courseId+'/start'}>
            <Button className='w-full mt-5'>Start</Button>
            </Link>}
          </div>

          <div>
              <label htmlFor='upload-image'>
                <Image src={selectedFile?selectedFile:'/600x400.png'} width={300} height={300} 
                 className='w-full rounded-xl h-[250px] object-cover cursor-pointer'/>
              </label>
                {edit&&<input type='file' id='upload-image' className='opacity-0' onChange={onFileSelected}/>}
          </div>
        </div>
      </div>
    );
  }
  