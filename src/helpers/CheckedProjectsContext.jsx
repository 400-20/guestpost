import React, { createContext, useState } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [checkedProjects, setCheckedProjects] = useState([]);

  return (
    <ProjectContext.Provider value={{ checkedProjects, setCheckedProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;