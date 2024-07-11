"use client"
import DefaultLayout from '@/components/PublisherLayouts/DefaultLaout'
import AntDesignTable from '../../components/muitable'
import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import Aos from "aos";
import "aos/dist/aos.css";
import { IoMdAddCircle } from "react-icons/io";


const Page = () => {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
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
        {isRotated && <div className='h-[80vh] md:h-[50vh] bg-[rgba(255,255,255,1)] my-4 transition-all ease-in-out duration-300 flex flex-col gap-2 p-4  text-gray-6 font-medium' data-aos='fade-down'>
<p>• Before you start working on a task, make sure you have accepted it.</p>
<p>• Reject the task as soon as you think you cannot complete it.</p>
<p>• The article must not be on the subdomain</p>
<p>• Don't ask the buyer to approve the task.</p>
<p>• If the Buyer doesn't approve the task, it will be automatically marked as approved after 3 days.</p>
<p>• If the Buyer request any changes, make sure you fix it as soon as possible if not the task may be cancelled by the buyer or GuestPostSale.</p>
<p>• Before you deliver the task, make sure that all links and target URLs are in place and follow all the instructions.</p>
<p>• Don't try to renegotiate the price with the Buyer.</p>
<p>• Don't exchange email, phone numbers or links to any sites with the Buyer.</p>
<p>• We read all messages and we reserve the right to suspend or ban your account if you fail any of these rules.</p>
<p>• As a website Owner: After delivering the task, if the Buyer doesn't approve it, it will be automatically marked as complete after 3 days and the funds will be Available For Withdrawal.</p>
<p>• As a contributor on a website: After delivering the task, if the Buyer doesn't approve it, it will be automatically marked as complete after 3 days and the funds will move to your Balance Awaiting and will be Available For Withdrawal After 21 Days.</p>
<p>• Payments are made weekly (Every Monday). Please Make sure to request your payment before Sunday Midnight UK Time.</p>
          </div>}

          <div className="w-full h-[50px] bg-white mt-4 rounded-lg flex items-center justify-between  p-4 gap-4 mb-4">

        <p className='text-gray-6 font-bold'>You can add up to 500 website to your account.</p>

        <button
                    onClick={openAddModal}
                    className='bg-[#2c7be5] hover:bg-primary transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2'
                > <IoMdAddCircle className='text-2xl' /><span className='font-medium'>Create project</span></button>
        </div>
          <AntDesignTable />
      </DefaultLayout>  
    </>
  )
}

export default Page
