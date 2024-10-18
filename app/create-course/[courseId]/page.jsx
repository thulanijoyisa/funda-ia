'use client'
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetails from './_components/CourseDetails'
import ChapterList from './_components/ChapterList'
import { Button } from '@/components/ui/button'
import { GenerateChapterContent_AI } from '@/configs/AImodel'
import LoadingDialog from '../_components/LoadingDialog'
import service from '@/configs/service'
import { useRouter } from 'next/navigation'

export default function CourseIDLayout({params}) {
  const {user} = useUser();
  const [course, setCourse] = useState([]); 
  const [loading, setLoading] = useState(false);
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
  
  const GenerateChapterContent =()=>{
    setLoading(true);
    const chapters=course?.courseOutput?.chapters;
    chapters.forEach(async(chapter, index)=>{
      const PROMPT= 'Explain the concept in Detail on Topic: '+course?.name+ ', Chapter: '+chapter?.name +', in JSON Format with a list of array field as title, explanation on a given chapter in detail, Code Example(Code field in <precode> format) if applicable ';
        console.log(PROMPT)

        //if(index<3){
          try {
            let videoId='';
            //Generate Video URL
            service.getVideos(course?.name+':'+chapter?.name).then(resp=>{
              videoId=resp[0]?.id?.videoId;
              console.log(resp);
            })

            const result= await GenerateChapterContent_AI.sendMessage(PROMPT);
            console.log(result?.response?.text());

            const content=JSON.parse(result?.response?.text());

            //Save Chapter Content + Video URL

            await db.insert(Chapters).values({
              chapterId:index,
              courseId:course?.courseId,
              content: content,
              videoId:videoId,
            })

            setLoading(false);

          } catch (error) {
            setLoading(false);
            console.log(error)
          }
          await db.update(CourseList).set({
            publish:true,
          })
          router.replace('/create-course/'+course?.courseId+'/finish')
       // }
    })
  }

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

      <LoadingDialog  loading={loading}/>

      {/* Basic Info*/}
      <CourseBasicInfo course={course} refreshData={()=> GetCourseId()}/>

      {/*Course Details */}
      <CourseDetails course={course}/>

      {/* List of Lessons*/}
      <ChapterList course={course} refreshData={()=>GetCourseId()}/>

        <Button className='my-10' onClick={GenerateChapterContent}>Generate Course Content</Button>
    </div>
  )
}
