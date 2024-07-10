import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Popover } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { BiEdit, BiAction, BiSearch } from 'react-icons/bi';
import Highlighter from 'react-highlight-words';

const AntDesignTable = () => {
    const [data, setData] = useState([
        { "id": 1, "URL": "http://example.com", "Website Role": "Admin", "Website Status": "Active", "Performer Status": "Enabled", "Activity Status": "Pending", "Placement": "Top", "Creation & Placement Link Insertion": "Link", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 2, "URL": "http://another-2.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 3, "URL": "http://another-3.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 4, "URL": "http://another-4.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 5, "URL": "http://another-5.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 6, "URL": "http://another-6.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 7, "URL": "http://another-7.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 8, "URL": "http://another-8.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 9, "URL": "http://another-9.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 10, "URL": "http://another-10.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 11, "URL": "http://another-11.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 12, "URL": "http://another-12.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },
        { "id": 13, "URL": "http://another-13.com", "Website Role": "User", "Website Status": "Inactive", "Performer Status": "Disabled", "Activity Status": "Completed", "Placement": "Bottom", "Creation & Placement Link Insertion": "Insert", "Buyer Page": "View", "Edit": "Edit", "Action": "Action" },

    ]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    let searchInput = null;

    const getColumnSearchProps = dataIndex => ({
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
                        style={{ width: 90, background:'blue' }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleResetAndSearch(clearFilters, selectedKeys, confirm, dataIndex)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? 'blue' : 'black'}} />,
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
            key: 'Website Status',
            ...getColumnSearchProps('URL'),
        },
        {
            title: (
                <Popover content="Popover content" title="Website Role">
                    <Button type="text">Website Role</Button>
                </Popover>
            ),
            dataIndex: 'Website Role',
            key: 'Website Role',
            ...getColumnSearchProps('Website Role'),
        },
        {
            title: 'Website Status',
            dataIndex: 'Website Status',
            key: 'Website Status',
            ...getColumnSearchProps('Website Status'),
        },
        {
            title: 'Performer Status',
            dataIndex: 'Performer Status',
            key: 'Performer Status',
            ...getColumnSearchProps('Performer Status'),
        },
        {
            title: 'Activity Status',
            dataIndex: 'Activity Status',
            key: 'Activity Status',
            ...getColumnSearchProps('Activity Status'),
        },
        {
            title: 'Placement',
            dataIndex: 'Placement',
            key: 'Placement',
            ...getColumnSearchProps('Placement'),
        },
        {
            title: 'Creation & Placement Link Insertion',
            dataIndex: 'Creation & Placement Link Insertion',
            key: 'Creation & Placement Link Insertion',
            ...getColumnSearchProps('Creation & Placement Link Insertion'),
        },
        {
            title: 'Buyer Page',
            dataIndex: 'Buyer Page',
            key: 'Buyer Page',
            render: () => <BiSearch style={{ fontSize: '1.5em', color: 'blue' }} />,
        },
        {
            title: 'Edit',
            dataIndex: 'Edit',
            key: 'Edit',
            render: () => <BiEdit style={{ fontSize: '1.5em', color: 'green' }} />,
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            render: () => <BiEdit style={{ fontSize: '1.5em', color: 'green' }} />,

        },
    ];
    return <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }}  />;
};

export default AntDesignTable;