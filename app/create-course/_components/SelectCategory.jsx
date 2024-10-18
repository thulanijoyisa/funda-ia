import { UserInputContext } from '@/app/_context/UserInputContext'
import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React, { useContext } from 'react'

export default function SelectCategory() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleCategoryChange=(category)=>{
        setUserCourseInput(prev=>({
            ...prev,
            category:category
        }))
    }
    return (
        <div className='px-10 md:px20'>
            <h2 className='my-5'>Select Course Category</h2>
            <div className='grid grid-cols-3 gap-10 px-10 md:px20'>
                {CategoryList.map((item, index) => (
                    <div key={item.id} className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer
                        ${userCourseInput?.category==item.name&&'border-primary'}`}
                            onClick={()=>handleCategoryChange(item.name)}>
                        <Image key={item.icon} src={item.icon} width={50} height={50} />
                        <h2 key={item.name}>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}
