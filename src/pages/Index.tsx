import React, { useState } from 'react';
import AuthPage from '@/components/auth/AuthPage';
import Dashboard from '@/components/dashboard/Dashboard';
import ProjectDetailView from '@/components/project/ProjectDetailView';
import Header from '@/components/layout/Header';
import { Project } from '@/types/project';

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'project'>('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleAuthenticated = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
    setSelectedProject(null);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedProject(null);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setSelectedProject(updatedProject);
    // In a real app, you would also update the project in your data store
  };

  // Show authentication page if user is not logged in
  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      
      {currentView === 'dashboard' ? (
        <Dashboard 
          user={user}
          onSelectProject={handleSelectProject}
        />
      ) : selectedProject ? (
        <ProjectDetailView
          project={selectedProject}
          onBack={handleBackToDashboard}
          onUpdateProject={handleUpdateProject}
        />
      ) : (
        <Dashboard 
          user={user}
          onSelectProject={handleSelectProject}
        />
      )}
    </div>
  );
};

export default Index;
