import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Mail, MoreVertical, Search, UserPlus } from 'lucide-react';
import { Project, User } from '@/types/project';
import { useToast } from '@/hooks/use-toast';

interface ProjectMembersProps {
  project: Project;
  onUpdateProject: (project: Project) => void;
}

const ProjectMembers: React.FC<ProjectMembersProps> = ({ project, onUpdateProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredMembers = project.members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteMember = () => {
    toast({
      title: "Invite Member",
      description: "Member invitation feature will be implemented soon",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Owner': return 'default';
      case 'Manager': return 'secondary';
      case 'Developer': return 'outline';
      case 'Designer': return 'outline';
      default: return 'outline';
    }
  };

  const getTaskCount = (memberId: string) => {
    return project.tasks.filter(task => task.assigneeId === memberId).length;
  };

  const getCompletedTaskCount = (memberId: string) => {
    return project.tasks.filter(task => 
      task.assigneeId === memberId && task.status === 'Done'
    ).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Project Team</h2>
          <p className="text-muted-foreground">
            Manage team members and their roles
          </p>
        </div>
        <Button onClick={handleInviteMember} variant="hero">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{project.members.length}</div>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{project.tasks.length}</div>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              {project.tasks.filter(t => t.status === 'In Progress').length}
            </div>
            <p className="text-sm text-muted-foreground">Active Tasks</p>
          </CardContent>
        </Card>
      </div>

      {/* Members List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredMembers.map((member) => {
          const taskCount = getTaskCount(member.id);
          const completedTasks = getCompletedTaskCount(member.id);
          
          return (
            <Card key={member.id} className="hover:shadow-md transition-smooth">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{member.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getRoleColor(member.role || 'Member') as any}>
                      {member.role || 'Member'}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-foreground">{taskCount}</div>
                    <div className="text-muted-foreground">Assigned Tasks</div>
                  </div>
                  <div>
                    <div className="font-medium text-success">{completedTasks}</div>
                    <div className="text-muted-foreground">Completed</div>
                  </div>
                </div>
                
                {taskCount > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{taskCount > 0 ? Math.round((completedTasks / taskCount) * 100) : 0}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${taskCount > 0 ? (completedTasks / taskCount) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No members found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectMembers;