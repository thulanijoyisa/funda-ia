import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
       <Image src={'/fundai.png'} width={160} height={100}/>
        <Button >Get Started</Button>
    </div>
  )
}
