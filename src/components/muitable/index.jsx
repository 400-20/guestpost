// import React, { useState, useEffect } from 'react';
// import { Table, Input, Button, Space, Popover } from 'antd';
// import { FaEye } from "react-icons/fa";
// import { SearchOutlined } from '@ant-design/icons';
// import { BiEdit, BiAction, BiSearch } from 'react-icons/bi';
// import Highlighter from 'react-highlight-words';
// import { TbEdit } from "react-icons/tb";
// import { FaRegCirclePause } from "react-icons/fa6";
// import { MdOutlineDelete } from "react-icons/md";
// import { RiInformationLine } from "react-icons/ri";
// import axios from 'axios';
// import { BASE_URL } from '@/utils/api';

// const AntDesignTable = () => {
//     const [data, setData] = useState([
//         { "id": 1, "URL": "http://example.com", "Website Role": "Admin", "Website Status": "Active", "Performer Status": "Enabled", "Activity Status": "Pending", "Placement": "Top", "Creation & Placement Link Insertion": "Link", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },

//     ]);
//     const [searchText, setSearchText] = useState('');
//     const [searchedColumn, setSearchedColumn] = useState('');
//     let searchInput = null;

//     const getColumnSearchProps = dataIndex => ({
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//             <div style={{ padding: 8 }}>
//                 <Input
//                     ref={node => {
//                         searchInput = node;
//                     }}
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{ width: 188, marginBottom: 8, display: 'block' }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{ width: 90, background: 'blue' }}
//                     >
//                         Search
//                     </Button>
//                     <Button onClick={() => handleResetAndSearch(clearFilters, selectedKeys, confirm, dataIndex)} size="small" style={{ width: 90 }}>
//                         Reset
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: filtered => <SearchOutlined style={{ color: filtered ? 'blue' : 'black',fontSize: filtered && '22px', transition:"all ease 0.3s" }} />,
//         onFilter: (value, record) =>
//             record[dataIndex]
//                 ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
//                 : '',
//         onFilterDropdownVisibleChange: visible => {
//             if (visible) {
//                 setTimeout(() => searchInput.select(), 100);
//             }
//         },
//         render: text =>
//             searchedColumn === dataIndex ? (
//                 <Highlighter
//                     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//                     searchWords={[searchText]}
//                     autoEscape
//                     textToHighlight={text ? text.toString() : ''}
//                 />
//             ) : (
//                 text
//             ),
//     });

//     const handleSearch = (selectedKeys, confirm, dataIndex) => {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     };

//     const handleReset = clearFilters => {
//         clearFilters();
//         setSearchText('');
//     };

//     const handleResetAndSearch = (clearFilters, selectedKeys, confirm, dataIndex) => {
//         handleReset(clearFilters);
//         handleSearch(selectedKeys, confirm, dataIndex);
//     };


//     const columns = [
//         {
//             title: 'URL',
//             dataIndex: 'URL',
//             key: 'Website Status',
//             ...getColumnSearchProps('URL'),
//         },
//         {
//             title: (
//                 <Popover content="Popover content" title="Website Role ">
//                     <Button type="text" className='font-semibold'>Website Role <RiInformationLine className='text-lg' /></Button>
//                 </Popover>
//             ),
//             dataIndex: 'Website Role',
//             key: 'Website Role',
//         },
//         {
//             title: 'Website Status',
//             dataIndex: 'Website Status',
//             key: 'Website Status',
//         },
//         {
//             title: 'Performer Status',
//             dataIndex: 'Performer Status',
//             key: 'Performer Status',
//         },
//         {
//             title: 'Activity Status',
//             dataIndex: 'Activity Status',
//             key: 'Activity Status',
//         },
//         {
//             title: 'Placement',
//             dataIndex: 'Placement',
//             key: 'Placement',
//         },
//         {
//             title: 'Creation & Placement',
//             dataIndex: 'Creation & Placement',
//             key: 'Creation & Placement',
//         },
//         {
//             title: (
//                 <Popover content="Popover content" title="Link Insertion ">
//                     <Button type="text" className='font-semibold'>Link Insertion <RiInformationLine className='text-lg' /></Button>
//                 </Popover>
//             ),
//             dataIndex: 'Link Insertion',
//             key: 'Link Insertion',
//         },
//         {
//             title: 'Buyer Page',
//             dataIndex: 'Buyer Page',
//             key: 'Buyer Page',
//             render: () => <FaEye style={{ fontSize: '1.5em', color: 'rgba(44,123 ,229,1)', backgroundColor: "white", border: '1px solid rgba(44,123 ,229,1)', padding: '4px', cursor: 'pointer', height: "27px", width: "40px", marginLeft: "18px", borderRadius: "5px" }} />,
//         },
//         {
//             title: 'Edit',
//             dataIndex: 'Edit',
//             key: 'Edit',
//             render: () => (
//                 <div className='flex gap-1'>
//                     <TbEdit style={{ fontSize: '1.5em', color: 'white', backgroundColor: "rgba(44,123 ,229,1)", border: '1px solid rgba(44,123 ,229,1)', padding: '3px', cursor: 'pointer', height: "27px", width: "40px", borderRadius: "5px", transition: 'all 0.3s ease', }}
//                         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'blue', e.currentTarget.style.borderColor = 'blue')}
//                         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(44,123 ,229,1)', e.currentTarget.style.borderColor = 'rgba(44,123 ,229,1)')}
//                     />,

//                     <MdOutlineDelete style={{ fontSize: '1.5em', color: 'white', backgroundColor: "rgba(255,50,50,1)", padding: '3px', cursor: 'pointer', height: "27px", width: "40px", borderRadius: "5px", transition: 'all 0.3s ease', }}
//                         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'red')}
//                         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,50,50,1)')} />,
//                 </div>
//             )

//         },
//         {
//             title: 'Action',
//             dataIndex: 'Action',
//             key: 'Action',
//             render: () => <FaRegCirclePause style={{ fontSize: '1.5em', color: 'white', backgroundColor: "#00d27a", border: '1px solid #00d27a', padding: '3px', cursor: 'pointer', height: "27px", width: "40px", borderRadius: "5px" }} />,

//         },
//     ];
//     return <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />;
// };

// export default AntDesignTable;

import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Popover } from 'antd';
import { FaEye } from "react-icons/fa";
import { SearchOutlined } from '@ant-design/icons';
import { BiEdit, BiAction, BiSearch } from 'react-icons/bi';
import Highlighter from 'react-highlight-words';
import { TbEdit } from "react-icons/tb";
import { FaRegCirclePause } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { RiInformationLine } from "react-icons/ri";
import axios from 'axios';
import { BASE_URL } from '@/utils/api';

const AntDesignTable = () => {
    // const [data, setData] = useState([]);

    const [data, setData] = useState([
        {
            "id": "",
            "URL": "",
            "Website Role": "",
            "Website Status": "",
            "Performer Status": "",
            "Activity Status": "",
            "Placement": "",
            "Creation & Placement": "",
            "Link Insertion": "",
            "Buyer Page": "",
            "Edit": "",
            "Action": ""
        },]);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    let searchInput = null;

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('login_access_token');
            if (!token) {
                alert('You need to log in first.');
                return;
            }
            try {
                const response = await axios.get(`${BASE_URL}website-detail/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                // Transforming the response data to match the initial state
                const transformedData = response.data.map(item => ({
                    id: item.id,
                    URL: item.url,
                    "Website Role": item.user_role ? "User" : "Admin", 
                    "Website Status": item.website_status === '1' ? "Active" : "Inactive",
                    "Performer Status": item.activity_status ? "Active" : "Inactive",
                    "Activity Status": item.activity_status ? "Active" : "Inactive",
                    Placement: item.gp_site1 || '',
                    "Creation & Placement": item.created_at,
                    "Link Insertion": item.link_insert_price || 0,
                    "Buyer Page": item.url,
                    Edit: "Edit",
                    Action: "Action"
                }));
    
                setData(transformedData);
                console.log(transformedData);
                
            } catch (error) {
                console.error('Error fetching website details:', error.response);
            }
        };
    
        fetchData();
    }, []);
    


    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, background: 'blue' }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleResetAndSearch(clearFilters, selectedKeys, confirm, dataIndex)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? 'blue' : 'black', fontSize: filtered && '22px', transition: "all ease 0.3s" }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const handleResetAndSearch = (clearFilters, selectedKeys, confirm, dataIndex) => {
        handleReset(clearFilters);
        handleSearch(selectedKeys, confirm, dataIndex);
    };

    const columns = [
        {
            title: 'URL',
            dataIndex: 'URL',
            key: 'URL',
            ...getColumnSearchProps('URL'),
        },
        {
            title: (
                <Popover content="Popover content" title="Website Role ">
                    <Button type="text" className='font-semibold'>Website Role <RiInformationLine className='text-lg' /></Button>
                </Popover>
            ),
            dataIndex: 'Website Role',
            key: 'Website Role',
        },
        {
            title: 'Website Status',
            dataIndex: 'Website Status',
            key: 'Website Status',
        },
        {
            title: 'Performer Status',
            dataIndex: 'Performer Status',
            key: 'Performer Status',
        },
        {
            title: 'Activity Status',
            dataIndex: 'Activity Status',
            key: 'Activity Status',
        },
        {
            title: 'Placement',
            dataIndex: 'Placement',
            key: 'Placement',
        },
        {
            title: 'Creation & Placement',
            dataIndex: 'Creation & Placement',
            key: 'Creation & Placement',
        },
        {
            title: (
                <Popover content="Popover content" title="Link Insertion ">
                    <Button type="text" className='font-semibold'>Link Insertion <RiInformationLine className='text-lg' /></Button>
                </Popover>
            ),
            dataIndex: 'Link Insertion',
            key: 'Link Insertion',
        },
        {
            title: 'Buyer Page',
            dataIndex: 'Buyer Page',
            key: 'Buyer Page',
            render: () => <FaEye style={{ fontSize: '1.5em', color: 'rgba(44,123 ,229,1)', backgroundColor: "white", border: '1px solid rgba(44,123 ,229,1)', padding: '4px', cursor: 'pointer', height: "27px", width: "40px", marginLeft: "18px", borderRadius: "5px" }} />,
        },
        {
            title: 'Edit',
            dataIndex: 'Edit',
            key: 'Edit',
            render: () => (
                <div className='flex gap-1'>
                    <TbEdit style={{ fontSize: '1.5em', color: 'white', backgroundColor: "rgba(44,123 ,229,1)", border: '1px solid rgba(44,123 ,229,1)', padding: '3px', cursor: 'pointer', height: "27px", width: "40px", borderRadius: "5px", transition: 'all 0.3s ease', }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'blue', e.currentTarget.style.borderColor = 'blue')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(44,123 ,229,1)', e.currentTarget.style.borderColor = 'rgba(44,123 ,229,1)')}
                    />
                    <MdOutlineDelete style={{ fontSize: '1.5em', color: 'white', backgroundColor: "rgba(255,50,50,1)", padding: '3px', cursor: 'pointer', height: "27px", width: "40px", borderRadius: "5px", transition: 'all 0.3s ease', }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'red')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,50,50,1)')} />
                </div>
            )
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            render: () => <FaRegCirclePause style={{ fontSize: '1.5em', color: 'white', backgroundColor: "#00d27a", border: '1px solid #00d27a', padding: '3px', cursor: 'pointer', height: "27px", width: "40px", borderRadius: "5px" }} />,
        },
    ];

    return <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />;
};

export default AntDesignTable;
