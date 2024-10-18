'use client'
import Image from 'next/image'
import React, { useContext } from 'react'
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { GiArmorUpgrade } from "react-icons/gi";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';


export default function SideBar() {
    const {userCourseList, setUserCourseList}= useContext(UserCourseListContext)
    const Menu = [
        {

        id:1, 
        name:'Home',
        icon:<AiOutlineHome />,
        path:'/dashboard'
        }, 
        {
        id:2, 
        name:'Explore',
        icon:<MdOutlineExplore />,
        path:'/dashboard/explore'
        }, 
        {
        id:3, 
        name:'Upgrade',
        icon:<GiArmorUpgrade />,
        path:'/dashboard/upgrade'
        }, 
        {
        id:4, 
        name:'Logout',
        icon:<AiOutlineLogout />,
        path:'/dashboard/logout'
    }, 
]
    const path= usePathname();

  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <Image src={'/fundai.png'} width={160} height={100}/>
        <hr className='my-5'/> 

        <ul>
            {Menu.map((item, index)=>(
               <Link key={item.id} href={item.path}>
                <div key={item.path} className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer
                 hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${item.path==path&&'bg-gray-100 text-black'}`}>
                    <div key={item.icon} className='text-2xl'>{item.icon}</div>
                    <h2 key={item.name} > {item.name}</h2>
                </div>
            </Link>  
            ))}
        </ul>

        <div className='absolute bottom-10 w-[80%]'>
            <Progress value={(userCourseList?.length/5)*100}/>
            <h2 className='text-sm my-2'> {userCourseList?.length} Out of 5 Course Credit</h2>
            <h2 className='text-xs text-gray-500'> Upgrade you plan to generate unlimited courses</h2>
        </div>
    
    </div>
  )
}
