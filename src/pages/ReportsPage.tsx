
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TimeTracker from '@/components/reports/TimeTracker';
import ProjectReports from '@/components/reports/ProjectReports';
import TimeTrends from '@/components/reports/TimeTrends';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('time-tracker');

  return (
    <div className="container p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground mt-1">Track time and analyze project metrics</p>
      </div>

      <Tabs defaultValue="time-tracker" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="mb-6">
          <TabsTrigger value="time-tracker">Time Tracker</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="time-tracker" className="p-0 border-none">
          <TimeTracker />
        </TabsContent>
        <TabsContent value="reports" className="p-0 border-none">
          <ProjectReports />
        </TabsContent>
        <TabsContent value="trends" className="p-0 border-none">
          <TimeTrends />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
