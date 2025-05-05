
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [jiraConnected, setJiraConnected] = useState(false);

  const handleConnectJira = () => {
    // In a real app, this would connect to Jira API
    setJiraConnected(true);
    toast({
      title: "Jira account connected",
      description: "Your Jira account has been successfully connected.",
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile saved",
      description: "Your profile information has been updated.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="jira">Jira Integration</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john.doe@example.com" type="email" disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" defaultValue="Software Engineer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Input id="team" defaultValue="Frontend Development" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="jira" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Jira Integration</CardTitle>
              <CardDescription>
                Connect your Jira account to sync tasks and bugs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!jiraConnected ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="jira-domain">Jira Domain</Label>
                    <Input id="jira-domain" placeholder="your-company.atlassian.net" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jira-email">Jira Email</Label>
                    <Input id="jira-email" type="email" placeholder="your-email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jira-token">API Token</Label>
                    <Input id="jira-token" type="password" placeholder="Your Jira API token" />
                    <p className="text-sm text-muted-foreground">
                      You can generate an API token in your Atlassian account settings.
                    </p>
                  </div>
                </>
              ) : (
                <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Connected to Jira</h4>
                      <p className="text-sm text-muted-foreground">your-company.atlassian.net</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {!jiraConnected ? (
                <Button onClick={handleConnectJira}>Connect Jira Account</Button>
              ) : (
                <Button variant="outline" onClick={() => setJiraConnected(false)}>Disconnect</Button>
              )}
            </CardFooter>
          </Card>
          
          {jiraConnected && (
            <Card>
              <CardHeader>
                <CardTitle>Sync Settings</CardTitle>
                <CardDescription>
                  Configure how tasks and bugs are synced with Jira.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-sync tasks</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync new tasks from Jira
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sync status updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Reflect status changes in Jira when updated here
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sync comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Sync comments between JiraSyncFlow and Jira
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Sync Settings</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task assignments</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when tasks are assigned to you
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Status changes</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when task statuses change
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Comments</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when someone comments on your tasks
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
