
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Bug } from 'lucide-react';
import TaskList from '@/components/tasks/TaskList';
import TaskFilter from '@/components/tasks/TaskFilter';
import { mockTasks } from '@/data/mockData';

const BugsPage = () => {
  const [bugs, setBugs] = useState(mockTasks.filter(task => task.type === 'bug'));
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const filteredBugs = activeFilters.length > 0
    ? bugs.filter(bug => activeFilters.includes(bug.status))
    : bugs;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bugs</h1>
          <p className="text-muted-foreground">Track and fix bugs in your project.</p>
        </div>
        <Button className="gap-2" variant="destructive">
          <Bug className="h-4 w-4" />
          Report Bug
        </Button>
      </div>
      
      <TaskFilter onFilterChange={handleFilterChange} />
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">My Reported Bugs</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList tasks={filteredBugs} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BugsPage;
