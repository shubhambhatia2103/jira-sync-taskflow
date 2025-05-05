
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock project data - in a real app this would come from an API
const mockProjects = [
  { id: 'proj-1', name: 'Website Redesign', tasksCount: 12, bugsCount: 3 },
  { id: 'proj-2', name: 'Mobile App Development', tasksCount: 8, bugsCount: 5 },
  { id: 'proj-3', name: 'API Integration', tasksCount: 5, bugsCount: 2 },
  { id: 'proj-4', name: 'Analytics Dashboard', tasksCount: 7, bugsCount: 1 },
];

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="container p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground mt-1">Manage and monitor all your projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <Card 
            key={project.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              hoveredProject === project.id ? "border-primary" : ""
            )}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => handleProjectClick(project.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">{project.name}</CardTitle>
              <Folder className={cn(
                "h-8 w-8 transition-colors duration-200",
                hoveredProject === project.id ? "text-primary" : "text-muted-foreground"
              )} />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Tasks</p>
                  <p className="text-2xl font-medium">{project.tasksCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Bugs</p>
                  <p className="text-2xl font-medium">{project.bugsCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="text-2xl font-medium">{project.tasksCount + project.bugsCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
