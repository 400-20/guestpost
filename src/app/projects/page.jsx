"use client"
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout'
import React, { useState, useRef, useEffect } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import 'reactjs-popup/dist/index.css';
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import SwitcherOne from '@/components/FormElements/Switchers/SwitcherOne';
import Aos from "aos";
import { ImCancelCircle } from "react-icons/im";
import "aos/dist/aos.css";
import { CiSaveUp2 } from "react-icons/ci";
import { MdOutlineBookmarkRemove } from "react-icons/md";
import CheckboxOne from '@/components/FormElements/Checkboxes/CheckboxOne';
import axios from 'axios';
import { useRouter} from 'next/navigation'

const AllMyProjects = () => {
    const router = useRouter();
    useEffect(() => {
        Aos.init({});
    }, []);
    const Link = ({ id, children, title, placement }) => (
        <OverlayTrigger placement={placement} className='bg-white' overlay={<Tooltip id={id}>{title}</Tooltip>}>
            <a href="#">{children}</a>
        </OverlayTrigger>
    );
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };

    const [projectName, setProjectName] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    const [status, setStatus] = useState(true);
    const toggleStatus = (projectId) => {
        // Find the project by id
        const updatedProjects = projects.map(project => {
            if (project.id === projectId) {
                // Toggle the status of the project
                return { ...project, status: !project.status };
            }
            return project;
        });

        // Update the projects state with the updated array
        setProjects(updatedProjects);
        // You can also update the project status in your API here
    };

    const handleCreateProject = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('login_access_token');
        if (!token) {
            alert('You need to log in first.');
            return;
        }
        try {
            console.log(projectName)
            const response = await axios.post('http://172.16.16.22:8000/dashboard/projects/', {
                "title": projectName,
                "url": projectUrl,
                // "Status": status,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Project created:', response);
            const data = response.data;
            console.log(data);
            router.push(`/projects/${data.id}`)
        } catch (error) {
            console.error('Error creating project:', error.response);
        }

        closeAddModal();
    };

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('login_access_token');
            if (!token) {
                alert('You need to log in first.');
                return;
            }
            try {
                const response = await axios.get('http://172.16.16.22:8000/dashboard/projects/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = response.data;
                setProjects(data);

                console.log('Available projects:', response.data);

            } catch (error) {
                console.error('Error fetching projects:', error.response);
            }
        };
        fetchProjects();
    }, []);


    // Function to update project status
    const update_Project_Status = async (projectId, newStatus) => {
        // Assuming you have an API endpoint to update project status
        const token = localStorage.getItem('login_access_token');
        if (!token) {
            alert('You need to log in first.');
            return;
        }

        try {
            await axios.put(`http://172.16.16.22:8000/dashboard/projects/${projectId}/`, { status: newStatus }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // Update the state to reflect the change
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
    const [checkedProjects, setCheckedProjects] = useState([]);
    // Function to handle checkbox change
    const handle_Checkbox_Change = async (projectId, currentStatus) => {
        const newStatus = !currentStatus; // Toggle the status
        await update_Project_Status(projectId, newStatus);

        setCheckedProjects(prevCheckedProjects => {
            if (newStatus) {
                return [...prevCheckedProjects, projectId];
            } else {
                return prevCheckedProjects.filter(id => id !== projectId);
            }
        });

        setTimeout(() => {
            window.location.reload();
        }, 0);
    };


    
    
    return (
        <DefaultLayout>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-2xl text-[#3c5a99] font-[900]'>Perfect For Agencies & Marketing Teams</h1>
                <h3 className='text-xl text-[#3c5a99] font-[400] '>Create a project for each of your clients to ensure you never duplicate placements</h3>
            </div>
            <hr className='border-gray-300 my-4' />
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
                                    required
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
                                    required
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
            <div className='flex flex-wrap gap-4 w-full'>

                {projects.map(project => (
                    <div key={project.id}
                        className='h-full flex' >
                        <div className='h-[240px] w-[400px] bg-white shadow-1 hover:shadow-xl my-4 rounded-lg transition-all ease-in-out duration-300 flex flex-col'>
                            <div className='h-[60px] w-full bg-gradient-to-r from-[#2c7be5] to-primary rounded-t-lg justify-between flex items-center px-5'>
                                <h4 className='text-white font-medium '>{project.title}</h4>
                                <h4 className='text-white font-medium flex gap-2'>
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
    </Link>

                                    <Link title="Edit This Project" id="t-1" placement='top' ><TbEdit className='text-2xl' onClick={openEditModal} /></Link>
                                    {isEditModalOpen && (
                                        <div className="modal-backdrop" onClick={closeEditModal} >
                                            <div className="modal-content" onClick={e => e.stopPropagation()} data-aos='fade'>
                                                <div className='w-full bg-gray-200 p-3 text-gray-700 text-center rounded-lg font-bold mb-3 flex justify-between items-center '>
                                                    Edit Project<ImCancelCircle onClick={closeEditModal} className='text-xl hover:text-red-500 transition-all ease-in-out duration-150' /></div>
                                                <form className="modal-form" onSubmit={handleEditFormSubmit}>
                                                    <div>
                                                        <label className="mb-3 block text-body-lg font-semibold text-[#3c5a99]  dark:text-white">
                                                            Project Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Name"
                                                            name='title'
                                                            
                                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>


                                                    <div>
                                                        <label className="mb-3 block text-body-lg font-semibold text-[#3c5a99]  dark:text-white">
                                                            Project URL
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name='url'
                                                            placeholder="http://www.example.com"

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
                                    <Link title="Delete This Project" id="t-1" placement='top'><MdDeleteOutline className='text-2xl' onClick={openDeleteModal} /></Link></h4>
                                {isDeleteModalOpen && (
                                    <div className="modal-backdrop" onClick={closeDeleteModal} >
                                        <div className="modal-content" onClick={e => e.stopPropagation()} data-aos='fade'>
                                            <div className='w-full bg-red-200 p-3 text-gray-700 text-center rounded-lg font-bold mb-3 flex justify-between items-center '>
                                                Delete Project<ImCancelCircle onClick={closeDeleteModal} className='text-xl hover:text-red-500 transition-all ease-in-out duration-150' /></div>
                                            <form className="modal-form">
                                                <div className='flex' onChange={handleCheckboxChange}>
                                                    <CheckboxOne /><p className='text-sm font-bold '>Check this box if you want to Delete the <span className='text-red'>Abc</span> project</p>
                                                </div>


                                                <button
                                                    className={`${isCheckboxChecked ? 'bg-primary' : 'bg-red'} transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2`}
                                                > <MdOutlineBookmarkRemove className='text-2xl ' /><span className='font-medium'>Delete</span></button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='h-[60px] w-full bg-white to-primary rounded-t-lg justify-between flex items-center px-5'>
                                <h4 className='text-black font-medium '>Guest posting</h4>
                                <div className='text-black font-medium flex gap-1'>
                                    <Link title="Number of tasks not started" id="t-2" placement='top' ><div className='h-6 w-6 rounded-md bg-[#d5e5fa] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in progress" id="t-3" placement='top' ><div className='h-6 w-6 rounded-md bg-[#e3e6ea] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks waiting approval" id="t-4" placement='top' ><div className='h-6 w-6 rounded-md bg-[#d4f2ff] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in improvement" id="t-5" placement='top' ><div className='h-6 w-6 rounded-md bg-[#fde6d8] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks completed" id="t-6" placement='top' ><div className='h-6 w-6 rounded-md bg-[#ccf6e4] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks rejected" id="t-7" placement='top' ><div className='h-6 w-6 rounded-md bg-[#fad7dd] flex items-center justify-center text-sm'>0</div></Link>
                                </div>
                            </div>
                            <div className='h-[60px] w-full bg-white to-primary rounded-t-lg justify-between flex items-center px-5'>
                                <h4 className='text-black font-medium '>Digital PR & SEO</h4>
                                <div className='text-black font-medium flex gap-1'>
                                    <Link title="Number of tasks not started" id="t-2" placement='top' ><div className='h-6 w-6 rounded-md bg-[#d5e5fa] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in progress" id="t-3" placement='top' ><div className='h-6 w-6 rounded-md bg-[#e3e6ea] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks waiting approval" id="t-4" placement='top' ><div className='h-6 w-6 rounded-md bg-[#d4f2ff] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in improvement" id="t-5" placement='top' ><div className='h-6 w-6 rounded-md bg-[#fde6d8] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks completed" id="t-6" placement='top' ><div className='h-6 w-6 rounded-md bg-[#ccf6e4] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks rejected" id="t-7" placement='top' ><div className='h-6 w-6 rounded-md bg-[#fad7dd] flex items-center justify-center text-sm'>0</div></Link>
                                </div>
                            </div>
                            <div className='h-[60px] w-full bg-white to-primary rounded-b-lg justify-between flex items-center px-5'>
                                <h4 className='text-black font-medium '>Content Writing</h4>
                                <div className='text-black font-medium flex gap-1'>
                                    <Link title="Number of tasks not started" id="t-2" placement='top' ><div className='h-6 w-6 rounded-md bg-[#d5e5fa] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in progress" id="t-3" placement='top' ><div className='h-6 w-6 rounded-md bg-[#e3e6ea] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks waiting approval" id="t-4" placement='top' ><div className='h-6 w-6 rounded-md bg-[#d4f2ff] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks in improvement" id="t-5" placement='top' ><div className='h-6 w-6 rounded-md bg-[#fde6d8] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks completed" id="t-6" placement='top' ><div className='h-6 w-6 rounded-md bg-[#ccf6e4] flex items-center justify-center text-sm'>0</div></Link>
                                    <Link title="Number of tasks rejected" id="t-7" placement='top' ><div className='h-6 w-6 rounded-md bg-[#fad7dd] flex items-center justify-center text-sm'>0</div></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </DefaultLayout>
    )
}

export default AllMyProjects