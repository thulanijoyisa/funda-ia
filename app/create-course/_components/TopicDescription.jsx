import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

export default function TopicDescription() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleInputChange=(fieldName, value)=>{
        setUserCourseInput(prev=>({
            ...prev,
            [fieldName]:value
        }))
    }
  return (
    <div className='mx-20 lg:mx-44'>
        {/* Topic */}

        <div className='mt-5'>
            <label>
            💡  Write the topic for which you want to generate a course (e.g Javascript Course, Calculus, etc.):
            </label>
            <Input placeholder={'Topic'} className='h-14 text-xl'
                   defaultValue={userCourseInput?.topic}
                   onChange={(e)=>handleInputChange('topic',e.target.value)}/>
        </div>

        {/* Description */}
        <div className='mt-5'>
            <label>
            📝 Provide a description for your course, that you want to be included(Optional):
            </label>
            <Textarea placeholder={'Write more info about your course...'} className='h-24 text-xl'
                    defaultValue={userCourseInput?.description}
                    onChange={(e)=>handleInputChange('description',e.target.value)}/>
        </div>
    </div>
  )
}
