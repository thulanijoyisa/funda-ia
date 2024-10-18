import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between items-center p-5 shadow-sm'>
        <Image src={'/fundai.jpeg'} width={40} height={40}/>
        <UserButton/>
    </div>
  )
}
