"use client"
import DefaultLayout from '@/components/PublisherLayouts/DefaultLaout'
import AntDesignTable from '../../components/muitable'
import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import Aos from "aos";
import "aos/dist/aos.css";


const Page = () => {
  useEffect(() => {
    Aos.init({});
}, []);
  const [isRotated, setIsRotated] = useState(false);

  return (
    <>
      <DefaultLayout>
        <div className='h-[150px] bg-[rgba(87,80,241,0.7)] w-[100%] flex flex-col rounded-lg '>
          <div className='h-[30px] w-[100%] flex justify-between px-4 py-1'>
            <p className='text-white'>Your Stats...</p>
            <p className='flex items-center justify-center gap-1  text-white'>5.0 <CiStar className='' /><CiStar className='' /><CiStar className='' /><CiStar className='' /><CiStar className='' />(14)</p>
            <p className='flex items-center justify-center gap-1 bg-white px-2 rounded-md text-black'><IoIosHeartEmpty />0</p>
          </div>
          <div className='h-full w-[100%] border-t-2 border-white flex'>
            <div className='h-full flex flex-1 flex-col items-center justify-center text-white'>
              <h3>Websites Approved</h3>
              <h3 className='font-bold'>198</h3>
            </div>
            <div className='h-full flex flex-1 flex-col items-center justify-center text-white'>
              <h3>Completion Rate</h3>
              <h3 className='font-bold'>92%</h3>
            </div>
            <div className='h-full flex flex-1 flex-col items-center justify-center text-white'>
              <h3>Tasks Completed</h3>
              <h3 className='font-bold'>49</h3>
            </div>
            <div className='h-full flex flex-1 flex-col items-center justify-center text-white'>
              <h3>Tasks Rejected</h3>
              <h3 className='font-bold'>04</h3>
            </div>
            <div className='h-full flex flex-1 flex-col items-center justify-center text-white'>
              <h3>Tasks In Progress</h3>
              <h3 className='font-bold'>00</h3>
            </div>
            <div className='h-full flex flex-1 flex-col items-center justify-center text-white'>
              <h3>Tasks Awaiting</h3>
              <h3 className='font-bold'>02</h3>
            </div>
          </div>
        </div>

        <div onClick={() => setIsRotated(!isRotated)} className={`w-full h-[50px] bg-[rgba(87,80,241,0.7)] mt-4 rounded-lg flex items-center  p-4 gap-4 cursor-pointer transition-all ease-in-out duration-300 hover:bg-gradient-to-r from-primary to-[#2c7be5] mb-4 ${isRotated ? 'bg-gradient-to-r from-primary to-[#2c7be5]' : 'bg-[rgba(87,80,241,0.7)]' }`}>
        <FaChevronRight 
      className={`text-white transform transition-transform duration-300 ${isRotated ? 'rotate-90' : ''}`} 
    />
        <p className='text-white font-bold'>Please click here to read and familiarise yourself with things you can and cannot do.</p>
        </div>
        {isRotated && <div className='h-[50vh] bg-[rgba(0,0,0,0.3)] my-4 transition-all ease-in-out duration-300' data-aos='fade-down'>
          </div>}
          <AntDesignTable />
      </DefaultLayout>  
    </>
  )
}

export default Page
