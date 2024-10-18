import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
       <Image src={'/fundai.png'} width={160} height={100}/>
       <Link href="/sign-in">
       <Button >Get Started</Button> 
       </Link>
    </div>
  )
}
