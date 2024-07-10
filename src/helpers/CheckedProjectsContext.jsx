// CheckedProjectsContext.js
import React, { createContext, useState, useContext } from 'react';

const CheckedProjectsContext = createContext();

export const CheckedProjectsProvider = ({ children }) => {
    const [checkedProjects_, setCheckedProjects_] = useState([]);

    return (
        <CheckedProjectsContext.Provider value={{ checkedProjects_, setCheckedProjects_ }}>
            {children}
        </CheckedProjectsContext.Provider>
    );
};

export const useCheckedProjects_ = () => useContext(CheckedProjectsContext);
