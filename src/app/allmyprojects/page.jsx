import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout'
import React from 'react'
import { IoMdAddCircle } from "react-icons/io";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const AllMyProjects = () => {
    const Link = ({ id, children, title, placement }) => (
        <OverlayTrigger placement={placement}  className='bg-white' overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <a href="#">{children}</a>
        </OverlayTrigger>
      );
  return (
    <DefaultLayout>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-2xl text-[#3c5a99] font-[900]'>Perfect For Agencies & Marketing Teams</h1>
            <h3 className='text-xl text-[#3c5a99] font-[400] '>Create a project for each of your clients to ensure you never duplicate placements</h3>
        </div>
        <hr className='border-gray-300 my-4'/>
        <div>
            <button className='bg-[#2c7be5] hover:bg-primary transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2'> <IoMdAddCircle className='text-2xl'/><span className='font-medium'>Create project</span></button>
        </div>
        <div className='h-full w-full flex flex-wrap' >
<div className='h-[240px] w-[500px] bg-white shadow-1 hover:shadow-xl my-4 rounded-lg transition-all ease-in-out duration-300 flex flex-col'>
    <div className='h-[60px] w-full bg-gradient-to-r from-[#2c7be5] to-primary rounded-t-lg justify-between flex items-center px-5'>
        <h4 className='text-white font-medium '>Project Name</h4>
        <h4 className='text-white font-medium flex gap-2'>
        <Link title="Edit This Project" id="t-1" placement='left'><TbEdit className='text-2xl'/></Link> 
        <Link title="Delete This Project" id="t-1" placement='top'><MdDeleteOutline className='text-2xl'/></Link></h4>
    </div>
    <div className='h-[60px] w-full bg-white to-primary rounded-t-lg justify-between flex items-center px-5'>
        <h4 className='text-black font-medium '>Guest posting</h4>
        <div className='text-black font-medium flex gap-1'>
            <div className='h-6 w-6 rounded-md bg-[#d5e5fa] flex items-center justify-center text-sm'><Link title="Number of tasks" id="t-2" placement='top' >0</Link> </div>
            <div className='h-6 w-6 rounded-md bg-[#e3e6ea] flex items-center justify-center text-sm'><Link title="Number of tasks" id="t-3" placement='top' >0</Link> </div>
            <div className='h-6 w-6 rounded-md bg-[#d4f2ff] flex items-center justify-center text-sm'><Link title="Number of tasks" id="t-4" placement='top' >0</Link> </div>
            <div className='h-6 w-6 rounded-md bg-[#fde6d8] flex items-center justify-center text-sm'><Link title="Number of tasks" id="t-5" placement='top' >0</Link> </div>
            <div className='h-6 w-6 rounded-md bg-[#d5e5fa] flex items-center justify-center text-sm'><Link title="Number of tasks" id="t-6" placement='top' >0</Link> </div>
            <div className='h-6 w-6 rounded-md bg-[#d5e5fa] flex items-center justify-center text-sm'><Link title="Number of tasks" id="t-7" placement='top' >0</Link> </div>
        </div>
    </div>
    <div className='h-[60px] w-full bg-white to-primary rounded-t-lg justify-between flex items-center px-5'>
        <h4 className='text-black font-medium '>Digital PR & SEO</h4>
        <h4 className='text-black font-medium '>Icons</h4>
    </div>
    <div className='h-[60px] w-full bg-white to-primary rounded-b-lg justify-between flex items-center px-5'>
        <h4 className='text-black font-medium '>Content Writing</h4>
        <h4 className='text-black font-medium '>Icons</h4>
    </div>

</div>
        </div>

    </DefaultLayout>
  )
}

export default AllMyProjects