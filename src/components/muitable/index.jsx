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
//     // const [data, setData] = useState([]);

//     const handleDelete = (id) => {
//         Popconfirm({
//             title: 'Are you sure delete this task?',
//             onConfirm: () => {
//                 deleteWebsite(id);
//                 message.success('Website deleted successfully');
//             },
//             onCancel() {},
//             okText: 'Yes',
//             cancelText: 'No',
//         });
//     };

//     const [data, setData] = useState([
//         {
//             "id": "",
//             "URL": "",
//             "Website Role": "",
//             "Website Status": "",
//             "Performer Status": "",
//             "Activity Status": "",
//             "Placement": "",
//             "Creation & Placement": "",
//             "Link Insertion": "",
//             "Buyer Page": "",
//             "Edit": "",
//             "Action": ""
//         },]);

//     const [searchText, setSearchText] = useState('');
//     const [searchedColumn, setSearchedColumn] = useState('');
//     let searchInput = null;

//     useEffect(() => {
//         const fetchData = async () => {
//             const token = localStorage.getItem('login_access_token');
//             if (!token) {
//                 alert('You need to log in first.');
//                 return;
//             }
//             try {
//                 const response = await axios.get(`${BASE_URL}website-detail/`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 // Transforming the response data to match the initial state
//                 const transformedData = response.data.map(item => ({
//                     id: item.id,
//                     URL: item.url,
//                     "Website Role": item.user_role ? "User" : "Admin", 
//                     "Website Status": item.website_status === '1' ? "Active" : "Inactive",
//                     "Performer Status": item.activity_status ? "Active" : "Inactive",
//                     "Activity Status": item.activity_status ? "Active" : "Inactive",
//                     Placement: item.gp_site1 || '',
//                     "Creation & Placement": item.created_at,
//                     "Link Insertion": item.link_insert_price || 0,
//                     "Buyer Page": item.url,
//                     Edit: "Edit",
//                     Action: "Action"
//                 }));

//                 setData(transformedData);
//                 console.log(transformedData);

//             } catch (error) {
//                 console.error('Error fetching website details:', error.response);
//             }
//         };

//         fetchData();
//     }, []);



//     const getColumnSearchProps = (dataIndex) => ({
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
//         filterIcon: filtered => <SearchOutlined style={{ color: filtered ? 'blue' : 'black', fontSize: filtered && '22px', transition: "all ease 0.3s" }} />,
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
//             key: 'URL',
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
//                     />
//                     <MdOutlineDelete style={{ fontSize: '1.5em', color: 'white', backgroundColor: "rgba(255,50,50,1)", padding: '3px', cursor: 'pointer', height: "27px", width: "40px", borderRadius: "5px", transition: 'all 0.3s ease', }}
//                         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'red')}
//                         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,50,50,1)')} />
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
import { Table, Input, Button, Space, Popover, Modal, Form, Select } from 'antd';
import { FaEye } from "react-icons/fa";
import { SearchOutlined } from '@ant-design/icons';
import { TbEdit } from "react-icons/tb";
import { FaRegCirclePause } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { RiInformationLine } from "react-icons/ri";
import Highlighter from 'react-highlight-words';
import { useWebsites } from '@/helpers/WebsiteContext';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';

const { Option } = Select;

const AntDesignTable = () => {
    const { websites, updateWebsite, deleteWebsite } = useWebsites();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [editingWebsite, setEditingWebsite] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formKey, setFormKey] = useState(Date.now());
    let searchInput = null;


    const [langs, setLangs] = useState([]);
    const [selected_LinkType, setSelected_LinkType] = useState([]);
    const [selected_Category, setSelected_Category] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(["","",""]);
    const [checkedCategories, setCheckedCategories] = useState  ([]);

    const handleCheckboxChange = (id) => {
        if (checkedCategories.includes(id)) {
            setCheckedCategories(checkedCategories.filter((categoryId) => categoryId !== id));
        } else {
            if (checkedCategories.length < 3) {
                setCheckedCategories([...checkedCategories, id]);
            }
        }
    };


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

        } catch (error) {
            console.log(error);
        }
    }


    const handleEdit = (record) => {
        setEditingWebsite(record);
        fetchData();
        setFormKey(Date.now());
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        deleteWebsite(id);
    };

    const handleModalOk = async (values) => {
        await updateWebsite(editingWebsite.id, values);
        setIsModalOpen(false);
        setEditingWebsite(null);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setEditingWebsite(null);
    };

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
        onFilterDropdownOpenChange: visible => {
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
            dataIndex: 'url',
            key: 'url',
            ...getColumnSearchProps('url'),
        },
        {
            title: (
                <Popover content="Popover content" title="Website Role">
                    <Button type="text" className='font-semibold'>Website Role <RiInformationLine className='text-lg' /></Button>
                </Popover>
            ),
            dataIndex: 'user_role',
            key: 'user_role',
            render: (text) => text ? 'Owner' : 'Contributor', 
        },
        {
            title: 'Website Status',
            dataIndex: 'website_status',
            key: 'website_status',
        },
        {
            title: 'Performer Status',
            dataIndex: 'performer_status',
            key: 'performer_status',
        },
        {
            title: 'Activity Status',
            dataIndex: 'activity_status',
            key: 'activity_status',
            render: (text) => (
                <span className={text ? 'bg-green-200 text-green-900   px-4 pt-1 pb-2 rounded-md font-semibold' : ' font-semibold bg-red-200 text-red-900 px-4 pt-1 pb-2 rounded-md '}>
                    {text ? 'Active' : 'Deactivated'}
                </span>
            ),
        },
        {
            title: 'Placement',
            dataIndex: 'gp_site1',
            key: 'gp_site1',
        },
        {
            title: 'Creation & Placement',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: (
                <Popover content="Popover content" title="Link Insertion">
                    <Button type="text" className='font-semibold'>Link Insertion <RiInformationLine className='text-lg' /></Button>
                </Popover>
            ),
            dataIndex: 'link_insert_price',
            key: 'link_insert_price',
        },
        {
            title: 'Buyer Page',
            dataIndex: 'url',
            key: 'buyer_page',
            render: () => <FaEye style={{ fontSize: '1.5em', color: 'rgba(44,123 ,229,1)', backgroundColor: "white", border: '1px solid rgba(44,123 ,229,1)', padding: '4px', cursor: 'pointer', height: "27px", width: "40px", marginLeft: "18px", borderRadius: "5px" }} />,
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            render: (_, record) => (
                <div className='flex gap-1'>
                    <TbEdit style={{ fontSize: '1.5em', color: 'white', backgroundColor: "rgba(44,123 ,229,1)", border: '1px solid rgba(44,123 ,229,1)', padding: '3px', cursor: 'pointer', height: "27px", width: "40px", borderRadius: "5px", transition: 'all 0.3s ease', }}
                        onClick={() => handleEdit(record)}
                    />
                    <MdOutlineDelete style={{ fontSize: '1.5em', color: 'white', backgroundColor: "rgba(255,50,50,1)", padding: '3px', cursor: 'pointer', height: "27px", width: "40px", borderRadius: "5px", transition: 'all 0.3s ease', }}
                        onClick={() => handleDelete(record.id)}
                    />
                </div>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: () => <FaRegCirclePause style={{ fontSize: '1.5em', color: 'white', backgroundColor: "#00d27a", border: '1px solid #00d27a', padding: '3px', cursor: 'pointer', height: "27px", width: "40px", borderRadius: "5px" }} />,
        },
    ];




    return (
        <>
            <Table columns={columns} dataSource={websites} rowKey="id" pagination={{ pageSize: 10 }} />
<div className=' w-full'>
<Modal
                title="Edit Website"
                open={isModalOpen}
                onCancel={handleModalCancel}
                footer={null}
                key={formKey} 
                className='w-[140vw]'
            >
                <Form
                    initialValues={editingWebsite}
                    onFinish={handleModalOk}
                    key={formKey}
                    className='w-full'
                >
                    <Form.Item label="URL" name="url">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Language" name="language">
                        <Select initialvalues={websites?.language}>
                            {langs.map((lang) => (
                                <Option
                                    key={lang.id}
                                    value={lang.id}>{lang.title}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Max Links" name="max_links">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Link Type" name="link_type">
                        <Select initialvalues={websites?.link_type}>
                            {selected_LinkType.map((linkType) => (
                                <Option
                                    key={linkType.id} value={linkType.id}>{linkType.title}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Domain Authority" name="da">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Domain Rating" name="dr">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Traffic" name="traffic">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Spam Score" name="spam_score">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Content Placement Price" name="content_placement_price">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Content Creation Price" name="content_creation_price">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Link Insert Price" name="link_insert_price">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Delivery Time" name="delivery_time">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Word Limit" name="word_limit">
                        <Input />
                    </Form.Item>
                    <Form.Item label="GP Site 1" name="gp_site1">
                        <Input />
                    </Form.Item>
                    <Form.Item label="GP Site 2" name="gp_site2">
                        <Input />
                    </Form.Item>
                    <Form.Item label="GP Site 3" name="gp_site3">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Categories" name="categories">
                    <div className="flex flex-col gap-2 max-h-32 md:max-h-[200px] overflow-y-auto items-start border px-4 py-1 flex-wrap ">
                            {selected_Category.map((selectedcategory) => (
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
                    </Form.Item>
                    <Form.Item label="Special Requirements" name="special_requirements">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='bg-blue px-4 w-full'>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
</div>

        </>
    );
};

export default AntDesignTable;

