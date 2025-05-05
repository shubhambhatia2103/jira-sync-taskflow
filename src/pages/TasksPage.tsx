
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TaskList from '@/components/tasks/TaskList';
import TaskFilter from '@/components/tasks/TaskFilter';
import { mockTasks } from '@/data/mockData';

const TasksPage = () => {
  const [tasks, setTasks] = useState(mockTasks.filter(task => task.type === 'task'));
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const filteredTasks = activeFilters.length > 0
    ? tasks.filter(task => activeFilters.includes(task.status))
    : tasks;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">All of your assigned tasks in one place.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>
      
      <TaskFilter onFilterChange={handleFilterChange} />
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList tasks={filteredTasks} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksPage;
