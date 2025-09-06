import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Calendar, User, MoreVertical } from 'lucide-react';
import { Project, Task } from '@/types/project';
import CreateTaskModal from './CreateTaskModal';
import CreateTask from '@/pages/CreateTask';
import { useNavigate } from 'react-router-dom';

interface TaskBoardProps {
  project: Project;
  onUpdateProject: (project: Project) => void;
}


const TaskBoard: React.FC<TaskBoardProps> = ({ project, onUpdateProject }) => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleAddTaskClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate('/create-task'); // Change to your actual route
  };

  const taskColumns = {
    'To-Do': project.tasks.filter(task => task.status === 'To-Do'),
    'In Progress': project.tasks.filter(task => task.status === 'In Progress'),
    'Done': project.tasks.filter(task => task.status === 'Done')
  };

  const getColumnColor = (status: string) => {
    switch (status) {
      case 'To-Do': return 'text-blue-600';
      case 'In Progress': return 'text-yellow-600';
      case 'Done': return 'text-green-600';
      default: return 'text-gray-600';
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

  const getAssignee = (assigneeId?: string) => {
    return project.members.find(member => member.id === assigneeId);
  };

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedProject = {
      ...project,
      tasks: [...project.tasks, newTask]
    };
    
    onUpdateProject(updatedProject);
    setIsCreateTaskModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Board Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Task Board</h2>
          <p className="text-muted-foreground">
            Organize and track your project tasks
          </p>
        </div>
        <Button 
          onClick={handleAddTaskClick}
          variant="hero"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(taskColumns).map(([status, tasks]) => (
          <div key={status} className="space-y-4">
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${
                  status === 'To-Do' ? 'bg-blue-500' :
                  status === 'In Progress' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <h3 className={`font-semibold ${getColumnColor(status)}`}>
                  {status}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {tasks.length}
                </Badge>
              </div>
            </div>

            {/* Task Cards */}
            <div className="space-y-3">
              {tasks.map((task) => {
                const assignee = getAssignee(task.assigneeId);
                return (
                  <Card 
                    key={task.id} 
                    className="hover:shadow-md transition-smooth cursor-pointer group"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium leading-snug">
                          {task.title}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-smooth h-6 w-6 p-0"
                        >
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                      {task.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {task.description}
                        </p>
                      )}
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-3">
                      {/* Priority Badge */}
                      <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                        {task.priority}
                      </Badge>

                      {/* Task Meta */}
                      <div className="flex items-center justify-between">
                        {/* Due Date */}
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(task.dueDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        )}

                        {/* Assignee */}
                        {assignee ? (
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={assignee.avatar} alt={assignee.name} />
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                              {assignee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>Unassigned</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Add Task Button in Column */}
              <Button
                variant="ghost"
                onClick={() => setIsCreateTaskModalOpen(true)}
                className="w-full border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-smooth"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onCreateTask={handleCreateTask}
        projectMembers={project.members}
      />
    </div>
  );
};

export default TaskBoard;