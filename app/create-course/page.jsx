'use client'
import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react';
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { generateCourseLayout_AI } from '@/configs/AImodel';
import LoadingDialog from './_components/LoadingDialog';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import uuid4 from "uuid4";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function CreateCourse() {
    const StepperOptions = [
        {
            id: 1,
            name: 'Category',
            icon: <BiCategoryAlt />,
        },
        {
            id: 2,
            name: 'Topic',
            icon: <FaRegLightbulb />,
        },
        {
            id: 3,
            name: 'Options',
            icon: <HiOutlineClipboardDocumentCheck />,
        },
    ];

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext); 
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        console.log("Component mounted");
        console.log("Loading state:", loading);
        console.log("User Course Input:", userCourseInput);
    }, [userCourseInput]);

    const checkStatus = () => {
        if (!userCourseInput) return true;
        if (activeIndex === 0 && (!userCourseInput.category)) return true;
        if (activeIndex === 1 && (!userCourseInput.topic)) return true;
        if (activeIndex === 2 && (!userCourseInput.level || !userCourseInput.duration || !userCourseInput.video || !userCourseInput.chapters)) return true;
        return false;
    };

    const generateCourseLayout = async () => {
        setLoading(true);
        const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: ';
        const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, No of Chapters: ${userCourseInput?.chapters}, in JSON format`;
        const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
        console.log("Final Prompt:", FINAL_PROMPT);
        const result = await generateCourseLayout_AI.sendMessage(FINAL_PROMPT);
        console.log("Generated Layout:", result.response?.text());
        setLoading(false);

        SaveCourseLayoutInDb(JSON.parse(result.response?.text()));
    };

    const SaveCourseLayoutInDb = async (courseLayout) => {
        var id = uuid4();
        console.log("Generated Course ID:", id);  
        setLoading(true);
        await db.insert(CourseList).values({
            courseId: id,
            name: userCourseInput?.topic,
            level: userCourseInput?.level,
            category: userCourseInput?.category,
            courseOutput: courseLayout,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userProfileImage: user?.imageUrl,
            includeVideos: userCourseInput?.video,
            courseBanner: '/funda.png',
            publish: false,

            
        });
        console.log("Course layout saved");
        setLoading(false);
        router.replace('/create-course/'+id)
    };
    
    return (
        <div>
            {/* Stepper */}
            <div>
                <div className='flex flex-col justify-center items-center mt-10'> 
                    <h2 className='text-4xl text-primary font-medium'>Create Course</h2>
                    <div className='flex mt-10'>
                        {StepperOptions.map((item, index) => (
                            <div key={item.id} className='flex items-center'>
                                <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                    <div className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex >= index ? 'bg-purple-500' : ''}`}>
                                        {item.icon}
                                    </div>
                                    <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                                </div>
                                {index !== StepperOptions.length - 1 && 
                                    <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex - 1 >= index ? 'bg-purple-500' : ''}`} />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='px-10 md:px-20 lg:px-44 mt-10'>
                {/* Component */}
                {activeIndex === 0 ? <SelectCategory /> : activeIndex === 1 ? <TopicDescription /> : <SelectOption />}

                {/* Next Component Button */}
                <div className='flex justify-between mt-10'> 
                    <Button disabled={activeIndex === 0} variant='outline' onClick={() => setActiveIndex(activeIndex - 1)}>Previous</Button>
                    {activeIndex < 2 && <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>} 
                    {activeIndex === 2 && <Button disabled={checkStatus()} onClick={generateCourseLayout}>Generate Course Layout</Button>}  
                </div>
            </div>
            <LoadingDialog loading={loading} />
        </div>
    );
}
