
import React from 'react';
import { Task } from '@/types/task';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bug, CheckSquare, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const getStatusClass = () => {
    return `task-status-${task.status.toLowerCase().replace(' ', '-')}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {task.type === 'bug' ? (
              <Badge variant="destructive" className="rounded-full h-8 w-8 p-0 flex items-center justify-center">
                <Bug className="h-4 w-4" />
              </Badge>
            ) : (
              <Badge variant="secondary" className="rounded-full h-8 w-8 p-0 flex items-center justify-center">
                <CheckSquare className="h-4 w-4" />
              </Badge>
            )}
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>
          </div>
          <Badge className={cn("ml-auto", getStatusClass())}>
            {task.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Due {task.dueDate}</span>
          </div>
          <div className="flex items-center gap-2">
            {task.jiraId && (
              <Badge variant="outline" className="font-mono">
                {task.jiraId}
              </Badge>
            )}
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {getInitials(task.assignee)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
