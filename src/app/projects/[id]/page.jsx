"use client";

import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout';

const ProjectDetails = ({ project }) => {
  return (
    <DefaultLayout>
      <h1>{project.title}</h1>
      <p>{project.url}</p>

    </DefaultLayout>
  );
};

const Project = () => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem('login_access_token');
      if (!token) {
        alert('You need to log in first.');
        return;
      }
      const projectId = window.location.pathname.split("/").pop();
      console.log(projectId);

      if (projectId) {
        try {
          const response = await axios.get(`http://172.16.16.22:8000/dashboard/projects/${projectId}/`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",

            },
          });
          setProject(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching project data:', error.response);
          setError('Failed to load project data. Please try again later.');
          setLoading(false);
        }
      }
    };

    fetchProject();
  }, []);

  if (loading) {
    return <DefaultLayout>Loading...</DefaultLayout>;
  }

  if (error) {
    return <DefaultLayout>{error}</DefaultLayout>;
  }

  if (!project) {
    return <DefaultLayout>No project found.</DefaultLayout>;
  }

  return <ProjectDetails project={project} />;
};

const ProjectWithSuspense = () => (
  <Suspense fallback={<div>Loading project...</div>}>
    <Project />
  </Suspense>
);

export default ProjectWithSuspense;
