
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TaskFilterProps {
  onFilterChange: (filters: string[]) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filters = [
    { id: 'todo', label: 'To Do', color: 'task-status-todo' },
    { id: 'in-progress', label: 'In Progress', color: 'task-status-in-progress' },
    { id: 'review', label: 'In Review', color: 'task-status-review' },
    { id: 'done', label: 'Done', color: 'task-status-done' },
  ];

  const toggleFilter = (filterId: string) => {
    const updatedFilters = activeFilters.includes(filterId) 
      ? activeFilters.filter(id => id !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <Card className="p-4">
      <div>
        <h3 className="font-medium mb-3">Filter by Status</h3>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter.id}
              variant="outline"
              className={cn(
                "cursor-pointer py-1.5 text-sm transition-all", 
                activeFilters.includes(filter.id) 
                  ? filter.color
                  : "hover:bg-secondary"
              )}
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.label}
            </Badge>
          ))}
          {activeFilters.length > 0 && (
            <Badge 
              variant="outline" 
              className="cursor-pointer py-1.5 text-sm hover:bg-secondary transition-all"
              onClick={() => {
                setActiveFilters([]);
                onFilterChange([]);
              }}
            >
              Clear Filters
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskFilter;
