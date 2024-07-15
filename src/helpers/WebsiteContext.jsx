import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/api';

const WebsiteContext = createContext();

export const WebsiteProvider = ({ children }) => {
    const [websites, setWebsites] = useState([]);

    // Fetch all websites at the start or when needed
    useEffect(() => {
        fetchWebsites();
    }, []);

    const fetchWebsites = async () => {
        const token = localStorage.getItem('login_access_token');
        try {
            const response = await axios.get(`${BASE_URL}website-detail/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            
            setWebsites(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Failed to fetch websites:', error);
        }
    };

    const addWebsite = async (websiteData) => {
        const token = localStorage.getItem('login_access_token');
        try {
            const response = await axios.post(`${BASE_URL}website-detail/`, websiteData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setWebsites(prevWebsites => [...prevWebsites, response.data]);
        } catch (error) {
            console.error('Error adding website:', error.response || error);
        }
    };

    const updateWebsite = async (websiteId, updatedData) => {
        const token = localStorage.getItem('login_access_token');
        try {
            const response = await axios.put(`${BASE_URL}website-detail/${websiteId}/`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Update response:', response.data);
            setWebsites(prevWebsites =>
                prevWebsites.map(website =>
                    website.id === websiteId ? { ...website, ...updatedData } : website
                )
            );
        } catch (error) {
            console.error('Error updating website:', error.response || error);
        }
    };
    

    const deleteWebsite = async (websiteId) => {
        const token = localStorage.getItem('login_access_token');
        try {
            await axios.delete(`${BASE_URL}website-detail/${websiteId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setWebsites(prevWebsites => prevWebsites.filter(website => website.id !== websiteId));
        } catch (error) {
            console.error('Error deleting website:', error.response || error);
        }
    };

    return (
        <WebsiteContext.Provider value={{ websites, addWebsite, updateWebsite, deleteWebsite, fetchWebsites }}>
            {children}
        </WebsiteContext.Provider>
    );
};

// Custom hook to use the website context
export const useWebsites = () => useContext(WebsiteContext);
