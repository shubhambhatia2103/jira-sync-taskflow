
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  User,
  Flag,
  ChevronDown,
  Paperclip,
  X,
  ArrowLeft,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { mockTasks } from '@/data/mockData';
import { Task } from '@/types/task';

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the task from our mock data
  const task = mockTasks.find(task => task.id === id);
  
  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-2">Task not found</h2>
        <p className="text-muted-foreground mb-4">The task you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const [currentTask, setCurrentTask] = useState<Task>({...task});
  const [newComment, setNewComment] = useState('');
  const [attachmentDialogOpen, setAttachmentDialogOpen] = useState(false);
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'John Doe',
      content: 'I\'ve started working on this. Will update the status soon.',
      timestamp: '2025-05-04T14:30:00',
      authorInitials: 'JD'
    },
    {
      id: '2',
      author: 'Sarah Wilson',
      content: 'Let me know if you need any assistance with this task.',
      timestamp: '2025-05-04T16:15:00',
      authorInitials: 'SW'
    }
  ]);

  const handleStatusChange = (value: string) => {
    const status = value as Task['status'];
    setCurrentTask({...currentTask, status});
    toast({
      title: "Status updated",
      description: `Task status changed to ${status}`
    });
  };

  const handlePriorityChange = (value: string) => {
    const priority = value as Task['priority'];
    setCurrentTask({...currentTask, priority});
    toast({
      title: "Priority updated",
      description: `Task priority changed to ${priority}`
    });
  };

  const handleAssigneeChange = (value: string) => {
    setCurrentTask({...currentTask, assignee: value});
    toast({
      title: "Assignee updated",
      description: `Task assigned to ${value}`
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'MMM dd');
      setCurrentTask({...currentTask, dueDate: formattedDate});
      toast({
        title: "Due date updated",
        description: `Task due date set to ${formattedDate}`
      });
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    
    const comment = {
      id: Date.now().toString(),
      author: 'John Doe',
      content: newComment,
      timestamp: new Date().toISOString(),
      authorInitials: 'JD'
    };
    
    setComments([...comments, comment]);
    setNewComment('');
    
    toast({
      title: "Comment added",
      description: "Your comment has been added to the activity feed"
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-400';
      case 'low':
        return 'bg-blue-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'secondary';
      case 'In Progress':
        return 'default';
      case 'In Review':
        return 'outline';
      case 'Done':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const formatCommentDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, 'MMM dd, yyyy - h:mm a');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{currentTask.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              {currentTask.jiraId || `TF-${currentTask.id}`}
            </Badge>
            <Badge variant={currentTask.type === 'bug' ? 'destructive' : 'secondary'}>
              {currentTask.type === 'bug' ? 'Bug' : 'Task'}
            </Badge>
          </div>
        </div>
        <Button>Save Changes</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main task details */}
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Status</label>
                <Select 
                  value={currentTask.status} 
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="In Review">In Review</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Assignee</label>
                <Select 
                  value={currentTask.assignee} 
                  onValueChange={handleAssigneeChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    <SelectItem value="Alex Johnson">Alex Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Due Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {currentTask.dueDate || "Set due date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={undefined}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Priority</label>
                <Select 
                  value={currentTask.priority} 
                  onValueChange={handlePriorityChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">
                      <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full ${getPriorityColor('high')} mr-2`}></span>
                        High
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full ${getPriorityColor('medium')} mr-2`}></span>
                        Medium
                      </div>
                    </SelectItem>
                    <SelectItem value="low">
                      <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full ${getPriorityColor('low')} mr-2`}></span>
                        Low
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Description</label>
              <Textarea 
                className="min-h-[120px]" 
                placeholder="Add a detailed description..." 
                value={currentTask.description}
                onChange={(e) => setCurrentTask({...currentTask, description: e.target.value})}
              />
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-muted-foreground">Attachments</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setAttachmentDialogOpen(true)}
                  >
                    <Paperclip className="h-4 w-4 mr-1" />
                    Add Files
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 text-center text-muted-foreground text-sm">
                  No attachments yet
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Activity feed */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Activity</h3>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{comment.authorInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatCommentDate(comment.timestamp)}
                      </p>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
              
              {comments.length === 0 && (
                <p className="text-center text-muted-foreground text-sm">
                  No activity yet
                </p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Input 
                placeholder="Add a comment..." 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAddComment();
                  }
                }}
              />
              <Button size="icon" onClick={handleAddComment}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      {/* File attachment dialog */}
      <Dialog open={attachmentDialogOpen} onOpenChange={setAttachmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Attachments</DialogTitle>
            <DialogDescription>
              Upload files to attach to this task.
            </DialogDescription>
          </DialogHeader>
          
          <div className="border-2 border-dashed rounded-md p-8 text-center">
            <Paperclip className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop files here, or click to browse
            </p>
            <Button variant="secondary" size="sm">
              Browse Files
            </Button>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAttachmentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setAttachmentDialogOpen(false);
              toast({
                title: "Files uploaded",
                description: "Your files have been attached to the task"
              });
            }}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskDetail;
