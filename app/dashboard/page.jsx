import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

export default function Dashboard() {
  return (
    <div>
      <AddCourse/>
      <UserCourseList/>
    </div>
  )
}
