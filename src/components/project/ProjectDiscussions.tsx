import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, MessageSquare, Search, Send, Clock } from 'lucide-react';
import { Project } from '@/types/project';
import { useToast } from '@/hooks/use-toast';

interface ProjectDiscussionsProps {
  project: Project;
  onUpdateProject: (project: Project) => void;
}

// Mock discussions data for now
const mockDiscussions = [
  {
    id: '1',
    title: 'Design System Implementation',
    content: 'We need to discuss the implementation of our design system. What components should we prioritize first?',
    authorId: '1',
    projectId: '1',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    comments: [
      {
        id: '1',
        content: 'I think we should start with buttons and form components as they are used most frequently.',
        authorId: '2',
        createdAt: '2024-01-10T15:00:00Z',
        updatedAt: '2024-01-10T15:00:00Z'
      },
      {
        id: '2',
        content: 'Agreed! Also, we should make sure to include proper accessibility features from the start.',
        authorId: '3',
        createdAt: '2024-01-10T15:15:00Z',
        updatedAt: '2024-01-10T15:15:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Sprint Planning for Q1',
    content: 'Let\'s plan our upcoming sprint goals and discuss resource allocation for the next quarter.',
    authorId: '4',
    projectId: '1',
    createdAt: '2024-01-09T10:00:00Z',
    updatedAt: '2024-01-09T10:00:00Z',
    comments: []
  }
];

const ProjectDiscussions: React.FC<ProjectDiscussionsProps> = ({ project, onUpdateProject }) => {
  const [discussions, setDiscussions] = useState(mockDiscussions);
  const [searchQuery, setSearchQuery] = useState('');
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionContent, setNewDiscussionContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAuthor = (authorId: string) => {
    return project.members.find(member => member.id === authorId);
  };

  const handleCreateDiscussion = () => {
    if (!newDiscussionTitle.trim() || !newDiscussionContent.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and content",
        variant: "destructive"
      });
      return;
    }

    const newDiscussion = {
      id: Date.now().toString(),
      title: newDiscussionTitle,
      content: newDiscussionContent,
      authorId: '1', // Current user
      projectId: project.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };

    setDiscussions([newDiscussion, ...discussions]);
    setNewDiscussionTitle('');
    setNewDiscussionContent('');
    setIsCreating(false);

    toast({
      title: "Discussion Created",
      description: "Your discussion has been posted successfully",
    });
  };

  const handleAddComment = (discussionId: string) => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now().toString(),
      content: newComment,
      authorId: '1', // Current user
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setDiscussions(discussions.map(discussion => 
      discussion.id === discussionId 
        ? { ...discussion, comments: [...discussion.comments, newCommentObj] }
        : discussion
    ));

    setNewComment('');
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Project Discussions</h2>
          <p className="text-muted-foreground">
            Collaborate and communicate with your team
          </p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)} variant="hero">
          <Plus className="h-4 w-4 mr-2" />
          Start Discussion
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search discussions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Create New Discussion */}
      {isCreating && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Start a New Discussion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Discussion title"
              value={newDiscussionTitle}
              onChange={(e) => setNewDiscussionTitle(e.target.value)}
            />
            <Textarea
              placeholder="What would you like to discuss?"
              value={newDiscussionContent}
              onChange={(e) => setNewDiscussionContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleCreateDiscussion}
                variant="hero"
              >
                Post Discussion
              </Button>
              <Button 
                onClick={() => setIsCreating(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => {
          const author = getAuthor(discussion.authorId);
          const isExpanded = selectedDiscussion === discussion.id;
          
          return (
            <Card key={discussion.id} className="hover:shadow-md transition-smooth">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => setSelectedDiscussion(isExpanded ? null : discussion.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-2">
                      {discussion.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {discussion.content}
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {discussion.comments.length}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3 mt-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={author?.avatar} alt={author?.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {author?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{author?.name}</span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(discussion.createdAt)}
                    </span>
                  </div>
                </div>
              </CardHeader>

              {/* Expanded Discussion */}
              {isExpanded && (
                <CardContent className="border-t">
                  <div className="space-y-4">
                    {/* Full Content */}
                    <div className="prose prose-sm max-w-none">
                      <p>{discussion.content}</p>
                    </div>

                    {/* Comments */}
                    {discussion.comments.length > 0 && (
                      <div className="space-y-3 border-t pt-4">
                        <h4 className="font-medium text-sm">Comments</h4>
                        {discussion.comments.map((comment) => {
                          const commentAuthor = getAuthor(comment.authorId);
                          return (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={commentAuthor?.avatar} alt={commentAuthor?.name} />
                                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                  {commentAuthor?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="bg-muted rounded-lg p-3">
                                  <p className="text-sm">{comment.content}</p>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {commentAuthor?.name} • {formatDate(comment.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Add Comment */}
                    <div className="flex gap-2 pt-2">
                      <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAddComment(discussion.id);
                          }
                        }}
                      />
                      <Button 
                        onClick={() => handleAddComment(discussion.id)}
                        size="sm"
                        variant="outline"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {filteredDiscussions.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No discussions yet</h3>
          <p className="text-muted-foreground mb-4">
            Start the conversation with your team
          </p>
          <Button onClick={() => setIsCreating(true)} variant="hero">
            <Plus className="h-4 w-4 mr-2" />
            Start Discussion
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectDiscussions;