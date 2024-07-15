"use client"
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout'
import React, { useState, useEffect } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import 'reactjs-popup/dist/index.css';
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Aos from "aos";
import { ImCancelCircle } from "react-icons/im";
import "aos/dist/aos.css";
import { CiSaveUp2 } from "react-icons/ci";
import { MdOutlineBookmarkRemove } from "react-icons/md";
import CheckboxOne from '@/components/FormElements/Checkboxes/CheckboxOne';
import axios from 'axios';
import { IoCheckmarkDone } from "react-icons/io5";
import { useSidebarProjects } from '@/helpers/SidebarProjectContext';
import { BASE_URL } from '@/utils/api';


const AllMyProjects = () => {
    const { projects, fetchProjects } = useSidebarProjects();
    useEffect(() => {
        Aos.init({});
    }, []);

    const Link = ({ id, children, title, placement }) => (
        <OverlayTrigger placement={placement} className='bg-white' overlay={<Tooltip id={id}>{title}</Tooltip>}>
            <a href="#">{children}</a>
        </OverlayTrigger>
    );

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const [projectName, setProjectName] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    // const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => {
        setProjectName("");
        setProjectUrl("");
        setIsAddModalOpen(false);
    }

    const openEditModal = (project) => {
        setCurrentProject(project);
        setProjectName(project.title);
        setProjectUrl(project.url);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setProjectName("");
        setProjectUrl("");
    }

    const openDeleteModal = (project) => {
        setCurrentProject(project);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };


    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('login_access_token');
        if (!token) {
            // alert('You need to log in first.');
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}projects/`, {
                "title": projectName,
                "url": projectUrl,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Project created:', response);
            fetchProjects();
        } catch (error) {
            console.error('Error creating project:', error.response);
        }

        closeAddModal();

    };
    const [addEditText, setAddEditText] = useState(false)


    const handleEditProject = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('login_access_token');
        if (!token) {
            // alert('You need to log in first.');
            return;
        }
        try {
            const response = await axios.put(`${BASE_URL}projects/${currentProject.id}/`, {
                "title": projectName,
                "url": projectUrl,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Project updated:', response);
            fetchProjects();
            setAddEditText(true);
            // localStorage.setItem('successState', 'true');
        } catch (error) {
            console.error('Error updating project:', error.response);
        }

        closeEditModal();

    };

const [addDeleteText, setAddDeleteText] = useState(false)

    const handleDeleteProject = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('login_access_token');
        if (!token) {
            // alert('You need to log in first.');
            return;
        }
        try {
            await axios.delete(`${BASE_URL}projects/${currentProject.id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Project deleted');
            fetchProjects();
        setAddDeleteText(true);
            // localStorage.setItem('successDelState', 'true');
        } catch (error) {
            console.error('Error deleting project:', error.response);
        }

        closeDeleteModal();
        // setTimeout(() => {
        //     window.location.reload();
        // }, 0);
    };

    const handle_Checkbox_Change = async (projectId, currentStatus) => {
        const newStatus = !currentStatus; // Toggle the status
        await update_Project_Status(projectId, newStatus);

        setTimeout(() => {
            window.location.reload();
        }, 0);
    };

    const update_Project_Status = async (projectId, newStatus) => {
        const token = localStorage.getItem('login_access_token');
        if (!token) {
            // alert('You need to log in first.');
            return;
        }

        try {
            await axios.put(`${BASE_URL}projects/${projectId}/`, { status: newStatus }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setProjects(prevProjects => {
                return prevProjects.map(project => {
                    if (project.id === projectId) {
                        return { ...project, status: newStatus };
                    }
                    return project;
                });
            });
        } catch (error) {
            console.error('Error updating project status:', error.response);
        }
    };



    return (
        <DefaultLayout>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-2xl text-[#3c5a99] font-[900]'>Perfect For Agencies & Marketing Teams</h1>
                <h3 className='text-xl text-[#3c5a99] font-[400] '>Create a project for each of your clients to ensure you never duplicate placements</h3>
            </div>
            <hr className='border-gray-300 my-4' />
            {addEditText && (
                <div className="h-[50px] mt-2 rounded-lg flex items-center gap-4 mb-2">
                    <p className="text-gray-6 font-bold flex items-center gap-2">
                        <IoCheckmarkDone className="text-2xl" /> The project has been successfully updated
                    </p>
                </div>
            )}
            {addDeleteText && (
                <div className="h-[50px] mt-2 rounded-lg flex items-center gap-4 mb-2">
                    <p className="text-gray-6 font-bold flex items-center gap-2">
                        <IoCheckmarkDone className="text-2xl" /> The project has been successfully Deleted.
                    </p>
                </div>
            )}

            <div>
                <button
                    onClick={openAddModal}
                    className='bg-[#2c7be5] hover:bg-primary transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2'
                > <IoMdAddCircle className='text-2xl' /><span className='font-medium'>Create project</span></button>
            </div>
            {isAddModalOpen && (
                <div className="modal-backdrop" onClick={closeAddModal} >
                    <div className="modal-content" onClick={e => e.stopPropagation()} data-aos='fade'>
                        <div className='w-full bg-gray-200 p-3 text-gray-700 text-center rounded-lg font-bold mb-3 flex justify-between items-center '>
                            Add Project<ImCancelCircle onClick={closeAddModal} className='text-xl hover:text-red-500 transition-all ease-in-out duration-150' /></div>
                        <form className="modal-form" onSubmit={handleCreateProject}>
                            <div>
                                <label className="mb-3 block text-body-lg font-semibold text-[#3c5a99]  dark:text-white">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                />
                            </div>


                            <div>
                                <label className="mb-3 block text-body-lg font-semibold text-[#3c5a99]  dark:text-white">
                                    Project URL
                                </label>
                                <input
                                    type="text"
                                    placeholder="http://www.example.com"
                                    value={projectUrl}
                                    onChange={(e) => setProjectUrl(e.target.value)}
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <button
                                type='submit'

                                className='bg-[#2c7be5] hover:bg-primary transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2'
                            > <IoMdAddCircle className='text-2xl' /><span className='font-medium'>Create project</span></button>
                        </form>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="modal-backdrop" onClick={closeEditModal} >
                    <div className="modal-content" onClick={e => e.stopPropagation()} data-aos='fade'>
                        <div className='w-full bg-gray-200 p-3 text-gray-700 text-center rounded-lg font-bold mb-3 flex justify-between items-center '>
                            Edit Project<ImCancelCircle onClick={closeEditModal} className='text-xl hover:text-red-500 transition-all ease-in-out duration-150' /></div>
                        <form className="modal-form" onSubmit={handleEditProject}>
                            <div>
                                <label className="mb-3 block text-body-lg font-semibold text-[#3c5a99]  dark:text-white">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                />
                            </div>


                            <div>
                                <label className="mb-3 block text-body-lg font-semibold text-[#3c5a99]  dark:text-white">
                                    Project URL
                                </label>
                                <input
                                    type="text"
                                    placeholder="http://www.example.com"
                                    value={projectUrl}
                                    onChange={(e) => setProjectUrl(e.target.value)}
                                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <button
                                type='submit'
                                className='bg-[#2c7be5] hover:bg-primary transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2'
                            > <CiSaveUp2 className='text-2xl ' /><span className='font-medium'>Save</span></button>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="modal-backdrop" onClick={closeDeleteModal} >
                    <div className="modal-content" onClick={e => e.stopPropagation()} data-aos='fade'>
                        <div className='w-full bg-red-200 p-3 text-gray-700 text-center rounded-lg font-bold mb-3 flex justify-between items-center '>
                            Delete Project<ImCancelCircle onClick={closeDeleteModal} className='text-xl hover:text-red-500 transition-all ease-in-out duration-150' /></div>
                        <form className="modal-form" onSubmit={handleDeleteProject}>
                            <div className='flex gap-2 ' onChange={handleCheckboxChange}>
                                <input type="checkbox" required className='h-4 w-4 mt-1' name="" id="" /><p className='text-sm font-bold '>Check this box if you want to Delete the <span className='text-red'>{currentProject ? currentProject.title : 'this'}</span> project</p>
                            </div>
                            <button
                                type='submit'
                                className={`${isCheckboxChecked ? 'bg-primary' : 'bg-red'} transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2`}
                            > <MdOutlineBookmarkRemove className='text-2xl ' /><span className='font-medium'>Delete</span></button>
                        </form>
                    </div>
                </div>
            )}

            <div className='flex flex-wrap gap-4 w-full'>
                {projects.map(project => (
                    <div key={project.id} className='h-full flex'>
                        <div className='h-[120px] w-[400px] bg-white shadow-1 hover:shadow-xl my-4 rounded-lg transition-all ease-in-out duration-300 flex flex-col'>
                            <div className='h-[60px] w-full bg-gradient-to-r from-[#2c7be5] to-primary rounded-t-lg justify-between flex items-center px-5'>
                                <h4 className='text-white font-medium '>{project.title}</h4>
                                <h4 className='text-white font-medium flex gap-2'>
                                    {/* <input
                                        type="checkbox"
                                        checked={project.status}
                                        onChange={() => handle_Checkbox_Change(project.id, project.status)}
                                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    /> */}

                                    <Link title={`${project.status ? "Remove From The Left Menu" : "Add To The Left Menu"}  `} id="t-1" placement='top' >
                                        <input
                                            type="checkbox"
                                            id={`project-${project.id}`}
                                            checked={project.status}
                                            onChange={() => handle_Checkbox_Change(project.id, project.status)}
                                            className="absolute opacity-0 w-0 h-0"
                                        />
                                        <label
                                            htmlFor={`project-${project.id}`}
                                            className="block overflow-hidden h-5 rounded-full bg-green cursor-pointer"
                                        >
                                            <div className={`h-5 w-5 bg-red rounded-full shadow-md transform transition-transform duration-200 ease-in ${project.status ? 'translate-x-full' : 'translate-x-0'}`}></div>
                                        </label>
                                    </Link  >
                                    <Link title="Edit This Project" id="t-1" placement='top'><TbEdit className='text-2xl' onClick={() => openEditModal(project)} /></Link>
                                    <Link title="Delete This Project" id="t-1" placement='top'><MdDeleteOutline className='text-2xl' onClick={() => openDeleteModal(project)} /></Link>
                                </h4>
                            </div>
                            <div className='h-[60px] w-full bg-white to-primary rounded-t-lg justify-between flex items-center px-5 rounded-b-lg '>
                                <h4 className='text-black font-medium '>Guest Posting</h4>
                                <div className='text-black font-medium flex gap-1'>
                                    <Link title="Number of tasks not started" id="t-2" placement='top'><div className='h-6 w-6 rounded-md bg-[#d5e5fa] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in progress" id="t-3" placement='top'><div className='h-6 w-6 rounded-md bg-[#e3e6ea] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks waiting approval" id="t-4" placement='top'><div className='h-6 w-6 rounded-md bg-[#d4f2ff] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in improvement" id="t-5" placement='top'><div className='h-6 w-6 rounded-md bg-[#fde6d8] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks completed" id="t-6" placement='top'><div className='h-6 w-6 rounded-md bg-[#ccf6e4] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks rejected" id="t-7" placement='top'><div className='h-6 w-6 rounded-md bg-[#fad7dd] flex items-center justify-center text-sm'>0</div></Link>
                                </div>
                            </div>
                            {/* <div className='h-[60px] w-full bg-white to-primary rounded-t-lg justify-between flex items-center px-5'>
                                <h4 className='text-black font-medium '>Digital PR & SEO</h4>
                                <div className='text-black font-medium flex gap-1'>
                                    <Link title="Number of tasks not started" id="t-2" placement='top'><div className='h-6 w-6 rounded-md bg-[#d5e5fa] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in progress" id="t-3" placement='top'><div className='h-6 w-6 rounded-md bg-[#e3e6ea] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks waiting approval" id="t-4" placement='top'><div className='h-6 w-6 rounded-md bg-[#d4f2ff] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in improvement" id="t-5" placement='top'><div className='h-6 w-6 rounded-md bg-[#fde6d8] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks completed" id="t-6" placement='top'><div className='h-6 w-6 rounded-md bg-[#ccf6e4] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks rejected" id="t-7" placement='top'><div className='h-6 w-6 rounded-md bg-[#fad7dd] flex items-center justify-center text-sm'>0</div></Link>
                                </div>
                            </div>
                            <div className='h-[60px] w-full bg-white to-primary rounded-b-lg justify-between flex items-center px-5'>
                                <h4 className='text-black font-medium '>Content Writing</h4>
                                <div className='text-black font-medium flex gap-1'>
                                    <Link title="Number of tasks not started" id="t-2" placement='top'><div className='h-6 w-6 rounded-md bg-[#d5e5fa] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in progress" id="t-3" placement='top'><div className='h-6 w-6 rounded-md bg-[#e3e6ea] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks waiting approval" id="t-4" placement='top'><div className='h-6 w-6 rounded-md bg-[#d4f2ff] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in improvement" id="t-5" placement='top'><div className='h-6 w-6 rounded-md bg-[#fde6d8] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks completed" id="t-6" placement='top'><div className='h-6 w-6 rounded-md bg-[#ccf6e4] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks rejected" id="t-7" placement='top'><div className='h-6 w-6 rounded-md bg-[#fad7dd] flex items-center justify-center text-sm'>0</div></Link>
                                </div>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </DefaultLayout>
    )
}

export default AllMyProjects
