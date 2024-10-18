import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { HiOutlinePencilAlt } from "react-icons/hi";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
  

export default function EditCourseBasicInfo({course, refreshData}) {
    const [courseName, setcourseName] = useState();
    const [description, setDescription] = useState();

    useEffect(() =>{
        setcourseName(course?.courseOutput?.courseName),
        setDescription(course?.courseOutput?.description)
    }, [course])

    const onUpdateHandler= async()=>{
        course.courseOutput.courseName = courseName;
        course.courseOutput.description = description;
        
        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput,

        }).where(eq(CourseList.id,course?.id))
        .returning({id: CourseList.id})
        console.log(result)
        refreshData(true)

    }

  return (
    <Dialog>
  <DialogTrigger><HiOutlinePencilAlt/></DialogTrigger>
  <DialogContent className="bg-white rounded-lg shadow-lg">
    <DialogHeader>
      <DialogTitle>Edit Course Title & Description</DialogTitle>
      <DialogDescription>
        <div className='mt-3'>
            <label>Course Title</label>
            <Input defaultValue={course?.courseOutput?.courseName}
            onChange = {(event) => setcourseName(event?.target.value)}/>
        </div>
        <div>
            <label>Description</label>
            <Textarea className='h-40' defaultValue={course?.courseOutput?.description}
            onChange = {(event) => setDescription(event?.target.value)}/>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
        </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}
