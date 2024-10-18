import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '@/app/_context/UserInputContext';


export default function SelectOption() {
    const { userCourseInput, setUserCourseInput  } = useContext(UserInputContext);
    const handleInputChange=(fieldName, value)=>{
        setUserCourseInput(prev=>({
            ...prev,
            [fieldName]:value
        }))
    }
    return (
        <div className='px-10 md:px-20 lg:px-44'>
            <div className='grid grid-cols-2 gap-10'>
                <div>
                    <label className='text-sm'> 🎓 Learning Level</label>
                    <Select onValueChange={(value)=>handleInputChange('level', value)} defaultValue={userCourseInput?.level}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advance">Advance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>🕒 Course Duration</label>
                    <Select onValueChange={(value)=>handleInputChange('duration', value)} defaultValue={userCourseInput?.duration}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="30 minutes">30 minutes</SelectItem>
                            <SelectItem value="1 hour">1 hour</SelectItem>
                            <SelectItem value="2 hour">2 hours</SelectItem>
                            <SelectItem value="More than 3 hours">More than 3 hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>▶️ Do you want a video on your course?</label>
                    <Select onValueChange={(value)=>handleInputChange('video', value)} defaultValue={userCourseInput?.video}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>📖 No of Chapters</label>
                    <Input type='number' placeholder={'Enter number'} onChange={(e)=>handleInputChange('chapters', e.target.value)} defaultValue={userCourseInput?.chapters}/>
                </div>
            </div>
        </div>
    )
}
