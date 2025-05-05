
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskList from '@/components/tasks/TaskList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TaskFilter from '@/components/tasks/TaskFilter';
import { mockTasks } from '@/data/mockData';

const Dashboard = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const personalTasks = tasks.filter(task => task.assignee === 'John Doe');
  const projectTasks = tasks.filter(task => task.assignee !== 'John Doe');

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const filteredPersonalTasks = activeFilters.length > 0 
    ? personalTasks.filter(task => activeFilters.includes(task.status))
    : personalTasks;

  const filteredProjectTasks = activeFilters.length > 0
    ? projectTasks.filter(task => activeFilters.includes(task.status))
    : projectTasks;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track and manage your tasks and bugs in one place.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>
      
      <TaskFilter onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">My Tasks & Bugs</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="bugs">Bugs</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <TaskList tasks={filteredPersonalTasks} />
              </TabsContent>
              <TabsContent value="tasks" className="mt-0">
                <TaskList tasks={filteredPersonalTasks.filter(task => task.type === 'task')} />
              </TabsContent>
              <TabsContent value="bugs" className="mt-0">
                <TaskList tasks={filteredPersonalTasks.filter(task => task.type === 'bug')} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Project-Wide Tasks & Bugs</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="bugs">Bugs</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <TaskList tasks={filteredProjectTasks} />
              </TabsContent>
              <TabsContent value="tasks" className="mt-0">
                <TaskList tasks={filteredProjectTasks.filter(task => task.type === 'task')} />
              </TabsContent>
              <TabsContent value="bugs" className="mt-0">
                <TaskList tasks={filteredProjectTasks.filter(task => task.type === 'bug')} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
