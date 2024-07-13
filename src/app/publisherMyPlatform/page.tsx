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
import { ImCancelCircle } from "react-icons/im";
import { SiCurl } from "react-icons/si";
import { IoLanguage } from "react-icons/io5";
import { FiLink } from "react-icons/fi";
import { MdDomainVerification } from "react-icons/md";
import { MdOutlineStarRate } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { TbScoreboard } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { AiTwotoneFileWord } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { GrStatusInfo } from "react-icons/gr";
import axios from 'axios';
import { BASE_URL } from '@/utils/api';


const Page = () => {

    const [projectUrl, setProjectUrl] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [maxLinks, setMaxLinks] = useState('');
    const [selectedLinkType, setSelectedLinkType] = useState('');
    const [domainAuthority, setDomainAuthority] = useState('');
    const [domainRating, setDomainRating] = useState('');
    const [traffic, setTraffic] = useState('');
    const [spamScore, setSpamScore] = useState('');
    const [contentPlacementPrice, setContentPlacementPrice] = useState('');
    const [contentCreationPrice, setContentCreationPrice] = useState('');
    const [linkInsertPrice, setLinkInsertPrice] = useState('');
    // const [selectedStatus, setSelectedStatus] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [wordLimit, setWordLimit] = useState('');
    const [gpSite1, setGpSite1] = useState('');
    const [gpSite2, setGpSite2] = useState('');
    const [gpSite3, setGpSite3] = useState('');
    const [selectedCategories, setSelectedCategories] = useState('');
    const [specialRequirements, setSpecialRequirements] = useState('');
    // console.log(selectedCategories);
    



    const [langs, setLangs] = useState([]);
    const [selected_LinkType, setSelected_LinkType] = useState([]);
    const [selected_Category, setSelected_Category] = useState<any>([]);
    const fetchData = async () => {
        const token = localStorage.getItem('login_access_token');
        if (!token) {
            // alert('You need to log in first.');
        }

        try {
            const response = await axios.get(`${BASE_URL}common-website-details/`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            setLangs(response.data.language);
            setSelected_LinkType(response.data.link_type);
            setSelected_Category(response.data.categories)
            // console.log(response.data.language);

        } catch (error) {
            console.log(error);
        }
    }

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const openAddModal = () => {
        setIsAddModalOpen(true);
        fetchData();
    };
    const closeAddModal = () => setIsAddModalOpen(false);
    useEffect(() => {
        Aos.init({});
    }, []);
    const [isRotated, setIsRotated] = useState(false);

    const handleAddWebsite = async (event: any) => {
        event.preventDefault();

        const token = localStorage.getItem('login_access_token');
        if (!token) {
            // alert('You need to log in first.');
            return;
        }

        const formData = {
            url: projectUrl,
            language: selectedLanguage,
            max_links: maxLinks,
            link_type: selectedLinkType,
            da: domainAuthority,
            dr: domainRating,
            traffic: traffic,
            spam_score: spamScore,
            content_placement_price: contentPlacementPrice,
            content_creation_price: contentCreationPrice,
            link_insert_price: linkInsertPrice,
            // website_status: selectedStatus,
            delivery_time: deliveryTime,
            word_limit: wordLimit,
            gp_sites: [gpSite1, gpSite2, gpSite3],
            categories: selectedCategories,
            special_requirements: specialRequirements,
        };

        try {
            const response = await axios.post(`${BASE_URL}website-detail/`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Website added:', response);

        } catch (error: any) {
            console.error('Error adding website:', error.response);
        }

        closeAddModal();
    };


    const [checkedCategories, setCheckedCategories] = useState<any[]>([]);

    const handleCheckboxChange = (id: any) => {
        if (checkedCategories.includes(id)) {
            setCheckedCategories(checkedCategories.filter((categoryId) => categoryId !== id));
        } else {
            if (checkedCategories.length < 3) {
                setCheckedCategories([...checkedCategories, id]);
            }
        }
    };

    const [charRemaining, setCharRemaining] = useState(800);
    const [char_Remaining, setChar_Remaining] = useState<number>();

    useEffect(() => {
        const updateChar = () => {
            const newNum = charRemaining - specialRequirements.length;
            setChar_Remaining(newNum)
        }
        updateChar();
    }, [specialRequirements, charRemaining, char_Remaining])

    const [placeholder, setPlaceholder] = useState<String>()
    useEffect(() => {
        const updatedPlaceholder = () => {
            setPlaceholder(projectUrl)
        }
        updatedPlaceholder();
    }, [projectUrl])




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

                <div onClick={() => setIsRotated(!isRotated)} className={` w-full h-[50px] bg-[rgba(87,80,241,0.7)] mt-4 rounded-lg flex items-center  p-4 gap-4 cursor-pointer transition-all ease-in-out duration-300 hover:bg-gradient-to-r from-primary to-[#2c7be5] mb-4 ${isRotated ? 'bg-gradient-to-r from-primary to-[#2c7be5]' : 'bg-[rgba(87,80,241,0.7)]'}`}>
                    <FaChevronRight
                        className={`text-white transform transition-transform duration-300 ${isRotated ? 'rotate-90' : ''}`}
                    />
                    <p className='text-white font-bold'>Please click here to read and familiarise yourself with things you can and cannot do.</p>
                </div>

                {isRotated && (
                    <div className='h-[80vh] md:h-[50vh] bg-white my-4 transition-all ease-in-out duration-300 flex flex-col gap-2 p-4 text-gray-600 font-medium overflow-auto' data-aos='fade-down'>
                        <p className='text-sm md:text-base'>
                            • Before you start working on a task, make sure you have accepted it.
                        </p>
                        <p className='text-sm md:text-base'>
                            • Reject the task as soon as you think you cannot complete it.
                        </p>
                        <p className='text-sm md:text-base'>
                            • The article must not be on the subdomain.
                        </p>
                        <p className='text-sm md:text-base'>
                            • Don't ask the buyer to approve the task.
                        </p>
                        <p className='text-sm md:text-base'>
                            • If the Buyer doesn't approve the task, it will be automatically marked as approved after 3 days.
                        </p>
                        <p className='text-sm md:text-base'>
                            • If the Buyer requests any changes, make sure you fix it as soon as possible if not the task may be cancelled by the buyer or GuestPostSale.
                        </p>
                        <p className='text-sm md:text-base'>
                            • Before you deliver the task, make sure that all links and target URLs are in place and follow all the instructions.
                        </p>
                        <p className='text-sm md:text-base'>
                            • Don't try to renegotiate the price with the Buyer.
                        </p>
                        <p className='text-sm md:text-base'>
                            • Don't exchange email, phone numbers or links to any sites with the Buyer.
                        </p>
                        <p className='text-sm md:text-base'>
                            • We read all messages and we reserve the right to suspend or ban your account if you fail any of these rules.
                        </p>
                        <p className='text-sm md:text-base'>
                            • As a website Owner: After delivering the task, if the Buyer doesn't approve it, it will be automatically marked as complete after 3 days and the funds will be Available For Withdrawal.
                        </p>
                        <p className='text-sm md:text-base'>
                            • As a contributor on a website: After delivering the task, if the Buyer doesn't approve it, it will be automatically marked as complete after 3 days and the funds will move to your Balance Awaiting and will be Available For Withdrawal After 21 Days.
                        </p>
                        <p className='text-sm md:text-base'>
                            • Payments are made weekly (Every Monday). Please Make sure to request your payment before Sunday Midnight UK Time.
                        </p>
                    </div>
                )}


                <div className="w-full h-[50px] bg-white mt-4 rounded-lg flex items-center justify-between  p-4 gap-4 mb-4">

                    <p className='text-gray-6 font-bold'>You can add up to 500 website to your account!</p>
                    {isAddModalOpen && (
                        <div className="modalbackdrop" onClick={closeAddModal}>
                            <div className="modalcontent" onClick={e => e.stopPropagation()} data-aos='fade'>
                                <div className='w-full bg-gray-200 p-3 text-gray-700 text-center rounded-lg font-bold mb-3 flex justify-between items-center'>
                                    Add New Website Info
                                    <ImCancelCircle onClick={closeAddModal} className='text-xl hover:text-red-500 transition-all ease-in-out duration-150' />
                                </div>
                                <form className="modalform grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleAddWebsite}>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Website URL
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <SiCurl className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="http://www.example.com"
                                            value={projectUrl}
                                            onChange={(e) => setProjectUrl(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary active:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Language
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <IoLanguage className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>

                                        <select

                                            value={selectedLanguage}
                                            onChange={(e) => setSelectedLanguage(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary">
                                            {langs.map((lang: any) => (
                                                <option
                                                    key={lang.id}
                                                    value={lang.id}>{lang.title}</option>
                                            ))}
                                        </select>


                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Max Links
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <FiLink className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Max Links"
                                            value={maxLinks}
                                            onChange={(e) => setMaxLinks(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Link Type
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <FiLink className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <select
                                            value={selectedLinkType}
                                            onChange={(e) => setSelectedLinkType(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary">
                                            {selected_LinkType.map((linkType: any) => (
                                                <option
                                                    key={linkType.id} value={linkType.id}>{linkType.title}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            DA
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <MdDomainVerification className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Domain Authority"
                                            value={domainAuthority}
                                            onChange={(e) => setDomainAuthority(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            DR
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <MdOutlineStarRate className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Domain Rating"
                                            value={domainRating}
                                            onChange={(e) => setDomainRating(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Traffic
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <IoPeopleOutline className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Traffic"
                                            value={traffic}
                                            onChange={(e) => setTraffic(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Spam Score
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <TbScoreboard className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Spam Score"
                                            value={spamScore}
                                            onChange={(e) => setSpamScore(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Content Placement Price
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <MdOutlineAttachMoney className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder=""
                                            value={contentPlacementPrice}
                                            onChange={(e) => setContentPlacementPrice(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Content Creation & Placement Price
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <MdOutlineAttachMoney className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder=""
                                            value={contentCreationPrice}
                                            onChange={(e) => setContentCreationPrice(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Link Insert Price
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <MdOutlineAttachMoney className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder=""
                                            value={linkInsertPrice}
                                            onChange={(e) => setLinkInsertPrice(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    {/* <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Website Status
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <GrStatusInfo className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary">
                                            <option value="">Select Status</option>
                                    
                                        </select>
                                    </div> */}

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Delivery Time
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <IoMdTime className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Delivery Time"
                                            value={deliveryTime}
                                            onChange={(e) => setDeliveryTime(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Word Limit
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <AiTwotoneFileWord className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Word Limit"
                                            max={5000}
                                            min={250}
                                            step={250}
                                            value={wordLimit}
                                            onChange={(e) => setWordLimit(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            GP Site 1
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <FiExternalLink className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={`${placeholder}/example-1`}
                                            value={gpSite1}
                                            onChange={(e) => setGpSite1(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            GP Site 2
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <FiExternalLink className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={`${placeholder}/example-2`}
                                            value={gpSite2}
                                            onChange={(e) => setGpSite2(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            GP Site 3
                                        </label>
                                        <div className="absolute left-3 top-1/2 transform -translate-y-[3px]">
                                            <FiExternalLink className='text-3xl border rounded-[7px] text-[#3c5a99] p-1' />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={`${placeholder}/example-3`}
                                            value={gpSite3}
                                            onChange={(e) => setGpSite3(e.target.value)}
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <div className="col-span-2 relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Category (Select Any Three)
                                        </label>
                                        <div className="flex flex-col gap-2 max-h-32 md:max-h-[200px] overflow-y-auto items-start border px-4 py-1 flex-wrap ">
                                            {selected_Category.map((selectedcategory: any) => (
                                                <div key={selectedcategory.id} className="flex items-center justify-center mr-2">
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2 h-4 w-4"
                                                        checked={checkedCategories.includes(selectedcategory.id)}
                                                        value={selectedCategories}
                                                        onChange={(e) => {
                                                            handleCheckboxChange(selectedcategory.id);
                                                            setSelectedCategories(selectedcategory.id);
                                                        }}
                                                        disabled={
                                                            !checkedCategories.includes(selectedcategory.id) &&
                                                            checkedCategories.length >= 3
                                                        }
                                                    />
                                                    <p>{selectedcategory.title}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-span-2 relative mb-3">
                                        <label className="block text-body-lg font-semibold text-[#3c5a99] dark:text-white">
                                            Special Requirements
                                        </label>
                                        <p className='text-[12px] text-gray-7 mb-2'>{char_Remaining} Characters Remaining</p>
                                        <textarea
                                            value={specialRequirements}
                                            onChange={(e) => setSpecialRequirements(e.target.value)}
                                            maxLength={800}
                                            placeholder="Enter any special requirements..."
                                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-12 py-3 text-dark outline-none transition focus:border-primary"
                                        />
                                    </div>

                                    <button
                                        type='submit'
                                        className='bg-[#2c7be5] hover:bg-primary transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2 col-span-2'
                                    >
                                        <IoMdAddCircle className='text-2xl' /><span className='font-medium'>Add New Website</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}


                    <button
                        onClick={openAddModal}
                        className='bg-[#2c7be5] hover:bg-primary transition-all ease-in-out duration-300 px-5 text-white py-2 rounded-lg flex items-center justify-center gap-2'
                    > <IoMdAddCircle className='text-2xl' /><span className='font-medium'>Add New Website</span></button>
                </div>
                <AntDesignTable />
            </DefaultLayout>
        </>
    )
}

export default Page
