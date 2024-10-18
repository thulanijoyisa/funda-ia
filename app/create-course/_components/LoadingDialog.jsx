import React from 'react'
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
import Image from 'next/image'
  

export default function LoadingDialog({loading}) {
  return (
    <AlertDialog open={loading}>
  <AlertDialogContent className="bg-white rounded-lg shadow-lg">
    <AlertDialogHeader>
      <AlertDialogDescription>
        <div className='flex flex-col items-center py-10'>
            <Image src={'/rock.gif'} width={100} height={100} unoptimized/>
            <h2 className='text-primary'>Please wait while Fundi AI generate's your course...</h2>
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>

  )
}
