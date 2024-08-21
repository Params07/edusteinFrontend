import React, { useState, useEffect, useContext } from 'react';
import { GlobalStateContext } from "../UseContextComponents/GlobalStateProvider";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const CardDetails = ({ setDisplayCard, details }) => {
    const { openRegisterForm,setBootcampId } = useContext(GlobalStateContext);

    const [time, setTime] = useState('');
   
    useEffect(() => {
        const calculateTimeRemaining = () => {
            const endDate = new Date(details.end_date);
            const now = new Date();
            const timeDiff = endDate - now;

            if (timeDiff <= 0) {
                setTime('Expired');
                return;
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };

        calculateTimeRemaining();
        const timer = setInterval(calculateTimeRemaining, 1000);
        return () => clearInterval(timer);
    }, [details.end_date]);

    return (
        <div className='h-full  px-4 sm:px-8 md:px-16 bg-white rounded-md font-redhat py-8'>
            <div>
                <button
                    title="Back"
                    className="text-line text-3xl"
                    onClick={() => setDisplayCard(true)}
                >
                    <IoArrowBackCircleSharp />
                </button>
            </div>
            <div className='p-0 sm:p-4 flex flex-col items-center justify-center h-full w-full'>
                <div className='max-w-sm h-42'>
                    <img className='object-contain w-full h-full' src={details.image_path} alt="Bootcamp" />
                </div>
                <div className='text-center mt-4'>
                    <p className='text-lg font-bold'>Time Remaining:</p>
                    <p className='text-xl'>{time}</p>
                </div>
                <div className='py-4'>
                    <button
                        onClick={() => {openRegisterForm();setBootcampId(details.id)}}
                        className='py-2 px-12 bg-line text-white hover:bg-white hover:text-line border-2 border-line text-lg rounded-full'
                    >
                        Register
                    </button>
                </div>
                <div className='flex flex-col justify-center w-full md:w-4/5 lg:w-3/5 h-full px-2  sm:px-8'>
                <div className='flex space-x-4 mt-4'>
                    <p className='font-semibold text-lg'>Title:</p>
                    <p className='font-semibold text-lg'>{details.title}</p>
                </div>
                <div className='flex space-x-4 mt-4'>
                    <p className='font-semibold text-lg'>About:</p>
                    <div
                        className='text-left'
                        dangerouslySetInnerHTML={{ __html: details.additional_info }}
                    />
                </div>
            </div>
            </div>
            

        </div>
    );
}

export default CardDetails;
