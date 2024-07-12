import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BASE_URL } from '@/utils/api';
import axios from 'axios';

interface Project {
    id: number;
    name: string;
    status: boolean;
}

interface SidebarProjectContextProps {
    projects: Project[];
    fetchProjects: () => void;
}

const SidebarProjectContext = createContext<SidebarProjectContextProps | undefined>(undefined);

export const SidebarProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    const fetchProjects = async () => {
        const token = localStorage.getItem('login_access_token');
        if (!token) {
            // alert('You need to log in first.');
            return;
        }
        try {
            const response = await axios.get(`${BASE_URL}projects/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = response.data;
            console.log('Fetched projects:', response.data);
            setProjects(data);
        } catch (error: any) {
            console.error('Error fetching projects:', error.response);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <SidebarProjectContext.Provider value={{ projects, fetchProjects }}>
            {children}
        </SidebarProjectContext.Provider>
    );
};

export const useSidebarProjects = () => {
    const context = useContext(SidebarProjectContext);
    if (context === undefined) {
        throw new Error('useSidebarProjects must be used within a SidebarProjectProvider');
    }
    return context;
};
