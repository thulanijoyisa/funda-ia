'use client'
import React, { useState } from 'react'
import Header from '../dashboard/_components/Header'
import { UserInputContext } from '../_context/UserInputContext'
import { useUser } from '@clerk/nextjs';

export default function CreateCourseLayout({children}) {
   const [ userCourseInput, setUserCourseInput ] =useState([]);
   const {user} = useUser();
  return (
    <div>
        <UserInputContext.Provider  value={{userCourseInput, setUserCourseInput }}>
            <Header/>
             {children}  
    
        </UserInputContext.Provider>
    </div>
  )
}
