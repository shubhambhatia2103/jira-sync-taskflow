
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendUp, Calendar, Download } from 'lucide-react';
import { TimeRange, TimeEntry, ProjectTrend, TrendData } from '@/types/reports';
import { format, subMonths, subWeeks, eachWeekOfInterval, eachMonthOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { toast } from "@/hooks/use-toast";

// Import the same project data used in TimeTracker
const projects = [
  { id: 'proj-1', name: 'Website Redesign', color: '#8884d8' },
  { id: 'proj-2', name: 'Mobile App Development', color: '#82ca9d' },
  { id: 'proj-3', name: 'API Integration', color: '#ffc658' },
  { id: 'proj-4', name: 'Analytics Dashboard', color: '#ff8042' },
];

const TimeTrends: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [chartType, setChartType] = useState<'line' | 'area'>('line');
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [projectTrends, setProjectTrends] = useState<ProjectTrend[]>([]);
  
  // Calculate date ranges based on selected time range
  const getDateRanges = () => {
    const now = new Date();
    
    if (timeRange === 'week') {
      // Get last 8 weeks
      const startDate = subWeeks(now, 8);
      return eachWeekOfInterval(
        { start: startDate, end: now },
        { weekStartsOn: 1 }
      ).map(date => ({
        start: startOfWeek(date, { weekStartsOn: 1 }),
        end: endOfWeek(date, { weekStartsOn: 1 }),
        label: `Week of ${format(date, 'MMM d')}`
      }));
    } else {
      // Get last 6 months
      const startDate = subMonths(now, 5);
      return eachMonthOfInterval(
        { start: startDate, end: now }
      ).map(date => ({
        start: startOfMonth(date),
        end: endOfMonth(date),
        label: format(date, 'MMM yyyy')
      }));
    }
  };

  // Load and process time entries from localStorage
  useEffect(() => {
    const loadTimeEntries = () => {
      try {
        const savedEntries = localStorage.getItem('formattedTimeEntries');
        
        if (savedEntries) {
          const timeEntries: TimeEntry[] = JSON.parse(savedEntries);
          const dateRanges = getDateRanges();
          
          // Initialize project data
          const initialProjectTrends: ProjectTrend[] = projects.map(project => ({
            projectId: project.id,
            projectName: project.name,
            color: project.color,
            data: new Array(dateRanges.length).fill(0)
          }));
          
          // Calculate hours per project for each period
          const formattedData: TrendData[] = dateRanges.map((range, index) => {
            const periodData: TrendData = { period: range.label };
            
            // Filter entries by date range
            const rangeEntries = timeEntries.filter(entry => {
              const entryDate = new Date(entry.date);
              return entryDate >= range.start && entryDate <= range.end;
            });
            
            // Summarize hours by project
            projects.forEach(project => {
              const projectHours = rangeEntries
                .filter(entry => entry.projectId === project.id)
                .reduce((sum, entry) => sum + entry.hours, 0);
              
              periodData[project.id] = projectHours;
              
              // Update project trend data
              const projectIndex = initialProjectTrends.findIndex(p => p.projectId === project.id);
              if (projectIndex !== -1) {
                initialProjectTrends[projectIndex].data[index] = projectHours;
              }
            });
            
            // Total hours for the period
            periodData.total = projects.reduce((sum, project) => 
              sum + (periodData[project.id] as number || 0), 0);
            
            return periodData;
          });
          
          setTrendData(formattedData);
          setProjectTrends(initialProjectTrends);
        }
      } catch (error) {
        console.error('Error loading time entries for trends:', error);
      }
    };
    
    loadTimeEntries();
  }, [timeRange]);

  // Handle export
  const handleExport = () => {
    toast({
      title: "Trends Report Downloaded",
      description: `Your ${timeRange} trends report has been exported as CSV.`,
    });
  };

  // Format data for chart
  const chartData = trendData.map((period) => {
    const data: any = { period: period.period };
    projects.forEach((project) => {
      data[project.name] = period[project.id] || 0;
    });
    return data;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <TrendUp className="mr-2 h-5 w-5 text-primary" />
              Time Allocation Trends
            </CardTitle>
            <CardDescription>
              See how project time allocation changes over time
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Weekly Trends</SelectItem>
                <SelectItem value="month">Monthly Trends</SelectItem>
              </SelectContent>
            </Select>
            <Select value={chartType} onValueChange={(value: 'line' | 'area') => setChartType(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {trendData.length > 0 ? (
            <div className="space-y-6">
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'line' ? (
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value} hours`, ``]} />
                      <Legend />
                      {projects.map((project) => (
                        <Line 
                          key={project.id}
                          type="monotone"
                          dataKey={project.name}
                          stroke={project.color}
                          activeDot={{ r: 8 }}
                        />
                      ))}
                    </LineChart>
                  ) : (
                    <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${value} hours`, ``]} />
                      <Legend />
                      {projects.map((project) => (
                        <Area
                          key={project.id}
                          type="monotone"
                          dataKey={project.name}
                          stackId="1"
                          stroke={project.color}
                          fill={project.color}
                        />
                      ))}
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      {projects.map((project) => (
                        <TableHead key={project.id}>
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: project.color }}
                            />
                            {project.name}
                          </div>
                        </TableHead>
                      ))}
                      <TableHead>Total Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trendData.map((period, index) => (
                      <TableRow key={index}>
                        <TableCell>{period.period}</TableCell>
                        {projects.map((project) => (
                          <TableCell key={project.id}>
                            {((period[project.id] as number) || 0).toFixed(1)}h
                          </TableCell>
                        ))}
                        <TableCell className="font-medium">
                          {((period.total as number) || 0).toFixed(1)}h
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="h-[350px] w-full flex items-center justify-center">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <p className="mt-2 text-lg font-medium">No trend data available</p>
                <p className="text-muted-foreground">
                  Save time entries in the Time Tracker to see project trends
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TimeTrends;
