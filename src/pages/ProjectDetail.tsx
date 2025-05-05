
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskList from '@/components/tasks/TaskList';
import TaskFilter from '@/components/tasks/TaskFilter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types/task';

// Mock data - in a real app this would come from an API based on the project ID
const mockProjects = {
  'proj-1': { name: 'Website Redesign', description: 'Complete overhaul of the company website' },
  'proj-2': { name: 'Mobile App Development', description: 'Native mobile application for iOS and Android' },
  'proj-3': { name: 'API Integration', description: 'Integration with third-party services and APIs' },
  'proj-4': { name: 'Analytics Dashboard', description: 'Real-time analytics dashboard for the marketing team' },
};

const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Update Homepage Design",
    description: "Redesign the homepage with the new branding",
    status: "In Progress",
    type: "task",
    assignee: "John Doe",
    dueDate: "2025-05-15",
    priority: "high",
    projectId: "proj-1"
  },
  {
    id: "task-2",
    title: "Fix Navigation Menu",
    description: "Fix the dropdown menu on mobile devices",
    status: "Todo",
    type: "bug",
    assignee: "Jane Smith",
    dueDate: "2025-05-12",
    priority: "medium",
    projectId: "proj-1"
  },
  {
    id: "task-3",
    title: "Implement User Authentication",
    description: "Add login and registration functionality",
    status: "In Review",
    type: "task",
    assignee: "John Doe",
    dueDate: "2025-05-20",
    priority: "high",
    projectId: "proj-1"
  },
  {
    id: "task-4",
    title: "Database Connection Error",
    description: "Fix the error when connecting to the database",
    status: "Todo",
    type: "bug",
    assignee: "Mike Johnson",
    dueDate: "2025-05-10",
    priority: "high",
    projectId: "proj-2"
  },
  {
    id: "task-5",
    title: "Optimize API Calls",
    description: "Improve performance of API calls",
    status: "Done",
    type: "task",
    assignee: "Jane Smith",
    dueDate: "2025-05-05",
    priority: "medium",
    projectId: "proj-3"
  }
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('tasks');
  
  const project = mockProjects[id as keyof typeof mockProjects] || { name: 'Unknown Project', description: '' };
  
  // Filter tasks by project ID and task type based on the active tab
  const filteredTasks = mockTasks.filter(task => {
    const matchesProject = task.projectId === id;
    const matchesType = activeTab === 'tasks' ? task.type === 'task' : task.type === 'bug';
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(task.status.toLowerCase().replace(' ', '-'));
    
    return matchesProject && matchesType && matchesFilter;
  });

  return (
    <div className="container p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
        <p className="text-muted-foreground mt-1">{project.description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4 space-y-6">
          <Tabs defaultValue="tasks" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="bugs">Bugs</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks" className="mt-6">
              <TaskList tasks={filteredTasks} />
            </TabsContent>
            <TabsContent value="bugs" className="mt-6">
              <TaskList tasks={filteredTasks} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:w-1/4 space-y-6">
          <TaskFilter onFilterChange={setActiveFilters} />
          
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tasks:</span>
                  <span className="font-medium">{mockTasks.filter(t => t.projectId === id && t.type === 'task').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bugs:</span>
                  <span className="font-medium">{mockTasks.filter(t => t.projectId === id && t.type === 'bug').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">In Progress:</span>
                  <span className="font-medium">{mockTasks.filter(t => t.projectId === id && t.status === 'In Progress').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed:</span>
                  <span className="font-medium">{mockTasks.filter(t => t.projectId === id && t.status === 'Done').length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
