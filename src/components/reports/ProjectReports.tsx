
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimeRange, ProjectTime } from '@/types/reports';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FileChartPie, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from "@/hooks/use-toast";

// Mock time data for projects
const projectTimeData = [
  { id: 'proj-1', name: 'Website Redesign', hours: 42, color: '#8884d8' },
  { id: 'proj-2', name: 'Mobile App Development', hours: 28, color: '#82ca9d' },
  { id: 'proj-3', name: 'API Integration', hours: 15, color: '#ffc658' },
  { id: 'proj-4', name: 'Analytics Dashboard', hours: 23, color: '#ff8042' },
];

const ProjectReports: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [exportType, setExportType] = useState<'pdf' | 'doc'>('pdf');

  // Calculate total hours
  const totalHours = projectTimeData.reduce((sum, project) => sum + project.hours, 0);

  // Chart data formatting for recharts with percentages
  const chartData = projectTimeData.map(project => {
    const percentage = (project.hours / totalHours) * 100;
    return {
      name: project.name,
      value: project.hours,
      percentage: percentage.toFixed(1),
      color: project.color
    };
  });

  // Handle export report
  const handleExport = (type: 'pdf' | 'doc') => {
    setExportType(type);
    toast({
      title: `Report ${type.toUpperCase()} Downloaded`,
      description: `Your ${timeRange} report has been exported as ${type.toUpperCase()}.`,
    });
  };

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
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} hours (${chartData.find(item => item.name === name)?.percentage}%)`, 'Time Spent']} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <p className="text-lg font-medium">Total Logged Hours: <span className="font-bold">{totalHours}</span></p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <FileText className="h-4 w-4 mr-2" />
            Export as PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('doc')}>
            <Download className="h-4 w-4 mr-2" />
            Export as DOC
          </Button>
        </CardFooter>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Hours</TableHead>
                    <TableHead className="text-right">%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chartData.map((project, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: project.color }} 
                          />
                          <span>{project.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{project.value}h</TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {project.percentage}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectReports;
