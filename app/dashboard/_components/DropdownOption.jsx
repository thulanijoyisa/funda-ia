import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { HiOutlineTrash } from "react-icons/hi2";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

export default function DropdownOption({children, deleteCourse}) {

  const [openAlert,setOpenAlert]=useState(false)

  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>setOpenAlert(true)}> 
                  <div className='flex items-center gap-2'>
                  <HiOutlineTrash/>Delete
                  </div>
                  </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>


        <AlertDialog open={openAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your course
                  and remove your  AI course from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={()=> setOpenAlert(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=> {deleteCourse(); setOpenAlert(false)}}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    </div>
  )
}
