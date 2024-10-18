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

export default function EditChapters({course, index, refreshData}) {
    const Chapters= course?.courseOutput?.chapters;

    const [chapterName, setchapterName] = useState();
    const [about, setAbout] = useState();

    useEffect(() =>{
        setchapterName(Chapters[index].name),
        setAbout(Chapters[index].about)
    }, [course])

    const onUpdateHandler= async()=>{
        Chapters[index].name = chapterName;
        Chapters[index].about = about;
        
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
        <DialogTitle>Edit Chapter</DialogTitle>
        <DialogDescription>
          <div className='mt-3'>
              <label>Course Title</label>
              <Input defaultValue={Chapters[index].name}
              onChange = {(event) => setchapterName(event?.target.value)}/>
          </div>
          <div>
              <label>Description</label>
              <Textarea className='h-40' defaultValue={Chapters[index].about}
              onChange = {(event) => setAbout(event?.target.value)}/>
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
