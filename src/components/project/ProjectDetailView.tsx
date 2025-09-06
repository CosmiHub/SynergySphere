import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Users, MessageSquare, Settings } from 'lucide-react';
import { Project } from '@/types/project';
import TaskBoard from './TaskBoard';
import ProjectMembers from './ProjectMembers';
import ProjectDiscussions from './ProjectDiscussions';

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
  onUpdateProject: (project: Project) => void;
}

const taskHandler = (event : React.MouseEvent)=>{
  alert("button clicked");
  event.preventDefault()
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
  onUpdateProject,
}) => {
  const [activeTab, setActiveTab] = useState('tasks');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'On Hold': return 'warning';
      case 'Completed': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'warning';
      case 'Low': return 'secondary';
      default: return 'secondary';
    }
  };

  const completionPercentage = project.tasks.length > 0 
    ? (project.tasks.filter(task => task.status === 'Done').length / project.tasks.length) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Header */}
      <div className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex gap-2">
              <Badge variant={getStatusColor(project.status) as any}>
                {project.status}
              </Badge>
              <Badge variant={getPriorityColor(project.priority) as any}>
                {project.priority} Priority
              </Badge>
            </div>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {project.name}
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                {project.description}
              </p>
              <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                <span>
                  Due: {new Date(project.dueDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span>{Math.round(completionPercentage)}% Complete</span>
                <span>{project.tasks.length} Tasks</span>
                <span>{project.members.length} Members</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="hero"
              onClick={taskHandler}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              Tasks
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Discussions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            <TaskBoard project={project} onUpdateProject={onUpdateProject} />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <ProjectMembers project={project} onUpdateProject={onUpdateProject} />
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <ProjectDiscussions project={project} onUpdateProject={onUpdateProject} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDetailView;