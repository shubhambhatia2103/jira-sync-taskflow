
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, subWeeks, addWeeks } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar, Save } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { TimeEntry } from '@/types/reports';

// Mock projects for the time tracker
const projects = [
  { id: 'proj-1', name: 'Website Redesign', color: '#8884d8' },
  { id: 'proj-2', name: 'Mobile App Development', color: '#82ca9d' },
  { id: 'proj-3', name: 'API Integration', color: '#ffc658' },
  { id: 'proj-4', name: 'Analytics Dashboard', color: '#ff8042' },
];

// Storage key for time entries
const TIME_ENTRIES_STORAGE_KEY = 'timeEntries';

const TimeTracker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeEntries, setTimeEntries] = useState<Record<string, Record<string, string>>>({});

  // Calculate week start and end dates
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start week on Monday
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
  
  // Get array of days in current week
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  // Load saved time entries from localStorage on component mount
  useEffect(() => {
    const savedTimeEntries = localStorage.getItem(TIME_ENTRIES_STORAGE_KEY);
    if (savedTimeEntries) {
      try {
        const parsedEntries = JSON.parse(savedTimeEntries);
        setTimeEntries(parsedEntries);
      } catch (error) {
        console.error('Error parsing saved time entries:', error);
      }
    }
  }, []);

  // Handle week navigation
  const previousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  
  // Handle time entry updates
  const updateTimeEntry = (projectId: string, date: string, hours: string) => {
    setTimeEntries(prev => ({
      ...prev,
      [projectId]: {
        ...(prev[projectId] || {}),
        [date]: hours
      }
    }));
  };

  // Calculate week display string
  const weekRangeDisplay = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;

  // Handle save timesheet
  const handleSaveTimesheet = () => {
    // Save to localStorage
    localStorage.setItem(TIME_ENTRIES_STORAGE_KEY, JSON.stringify(timeEntries));
    
    // Convert and save in a format that can be easily used by the Reports component
    const formattedEntries: TimeEntry[] = [];
    
    Object.entries(timeEntries).forEach(([projectId, dates]) => {
      Object.entries(dates).forEach(([date, hoursStr]) => {
        const hours = parseFloat(hoursStr);
        if (!isNaN(hours) && hours > 0) {
          formattedEntries.push({
            projectId,
            date,
            hours
          });
        }
      });
    });
    
    localStorage.setItem('formattedTimeEntries', JSON.stringify(formattedEntries));
    
    toast({
      title: "Timesheet Saved",
      description: `Your time entries for ${weekRangeDisplay} have been saved.`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Weekly Time Tracker</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={previousWeek} aria-label="Previous week">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center bg-muted px-3 py-1 rounded-md">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">{weekRangeDisplay}</span>
          </div>
          <Button variant="outline" size="icon" onClick={nextWeek} aria-label="Next week">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Project</TableHead>
                {weekDays.map((day) => (
                  <TableHead key={day.toISOString()} className="text-center min-w-[100px]">
                    <div>{format(day, 'EEE')}</div>
                    <div className="text-muted-foreground text-xs">{format(day, 'MMM d')}</div>
                  </TableHead>
                ))}
                <TableHead className="text-center">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => {
                const projectEntries = timeEntries[project.id] || {};
                const dailyTotals = weekDays.map(day => {
                  const dateKey = format(day, 'yyyy-MM-dd');
                  return parseFloat(projectEntries[dateKey] || '0');
                });
                const weeklyTotal = dailyTotals.reduce((sum, hours) => sum + hours, 0);
                
                return (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="font-medium">{project.name}</span>
                      </div>
                    </TableCell>
                    {weekDays.map((day) => {
                      const dateKey = format(day, 'yyyy-MM-dd');
                      return (
                        <TableCell key={dateKey} className="p-2">
                          <Input
                            type="number"
                            min="0"
                            max="24"
                            step="0.5"
                            placeholder="0"
                            className="h-8 text-center"
                            value={projectEntries[dateKey] || ''}
                            onChange={(e) => updateTimeEntry(project.id, dateKey, e.target.value)}
                          />
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-center font-medium">
                      {weeklyTotal.toFixed(1)}h
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="bg-muted/50">
                <TableCell className="font-bold">Daily Total</TableCell>
                {weekDays.map((day) => {
                  const dateKey = format(day, 'yyyy-MM-dd');
                  const dailyTotal = projects.reduce((sum, project) => {
                    const hours = parseFloat((timeEntries[project.id]?.[dateKey]) || '0');
                    return sum + hours;
                  }, 0);
                  
                  return (
                    <TableCell key={dateKey} className="text-center font-medium">
                      {dailyTotal.toFixed(1)}h
                    </TableCell>
                  );
                })}
                <TableCell className="text-center font-bold">
                  {projects.reduce((total, project) => {
                    const projectTotal = weekDays.reduce((sum, day) => {
                      const dateKey = format(day, 'yyyy-MM-dd');
                      return sum + parseFloat((timeEntries[project.id]?.[dateKey]) || '0');
                    }, 0);
                    return total + projectTotal;
                  }, 0).toFixed(1)}h
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveTimesheet}>
          <Save className="h-4 w-4 mr-2" />
          Save Timesheet
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TimeTracker;
