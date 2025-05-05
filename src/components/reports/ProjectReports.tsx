
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimeRange } from '@/types/reports';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FileChartPie } from 'lucide-react';

// Mock time data for projects
const projectTimeData = [
  { id: 'proj-1', name: 'Website Redesign', hours: 42 },
  { id: 'proj-2', name: 'Mobile App Development', hours: 28 },
  { id: 'proj-3', name: 'API Integration', hours: 15 },
  { id: 'proj-4', name: 'Analytics Dashboard', hours: 23 },
];

// Colors for the pie chart
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

const ProjectReports: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  // Chart data formatting for recharts
  const chartData = projectTimeData.map((project, index) => ({
    name: project.name,
    value: project.hours,
    color: COLORS[index % COLORS.length]
  }));

  // Calculate total hours
  const totalHours = projectTimeData.reduce((sum, project) => sum + project.hours, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <FileChartPie className="mr-2 h-5 w-5 text-primary" />
              Time Distribution
            </CardTitle>
            <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} hours`, 'Time Spent']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Total Hours</h3>
              <p className="text-3xl font-bold">{totalHours} hours</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Projects Breakdown</h3>
              <div className="space-y-3">
                {projectTimeData.map((project, index) => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{project.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">{project.hours}h</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({((project.hours / totalHours) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectReports;
