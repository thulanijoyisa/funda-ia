'use client'
import { db } from '@/configs/db'
import { and, eq } from 'drizzle-orm';
import { Chapters, CourseList } from '@/configs/schema'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard';
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';
import ChapterContent from './_components/ChapterContent';

export default function CourseStart({params}) {

  const [course, setCourse]= useState();
  const [selectedChapter, setSelectedChapter]= useState();
  const [chapterContent, setChapterContent]= useState();

  useEffect(()=>{
    GetCourse();
  }, [])

  const GetCourse=async()=>{
    const result= await db.select().from(CourseList)
    .where(eq(CourseList?.courseId, params?.courseId));
    console.log(result);
    setCourse(result[0]);
  }

  const GetSelectedChapter=async(chapterId)=>{
    const result= await db.select().from(Chapters)
                  .where(and(eq(Chapters.chapterId, chapterId),
                   eq(Chapters.courseId, course?.courseId)))
          setChapterContent(result[0])         
        console.log(result)
  }

  return (
    <div>
      {/** Chapter List Sidebar */}
        <div className=' fixed md:w-72 hidden md:block h-screen bg-blue-50  border-r shadow-sm'>
          <h2 className='font-medium text-lg bg-primary p-3 text-white'>{course?.courseOutput?.courseName}</h2>

          <div>
            {course?.courseOutput?.chapters.map((chapter, index) => (
            <div key={index} 
            className={`cursor-pointer hover:bg-purple-200 ${selectedChapter?.name==chapter?.name&&'bg-purple-200'}` }
            onClick={()=> {setSelectedChapter(chapter); GetSelectedChapter(index)}}>
                <ChapterListCard chapter={chapter} index={index} />
                
            </div>
             ))}     
        </div>

        </div>    

      {/** Content */}  
      <div className='md:ml-72'>
          <ChapterContent chapter={selectedChapter} content={chapterContent}/>
      </div>
    </div>
  )
}
