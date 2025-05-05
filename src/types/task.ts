
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'In Review' | 'Done';
  type: 'task' | 'bug';
  assignee: string;
  dueDate: string;
  jiraId?: string;
  priority: 'low' | 'medium' | 'high';
  projectId: string;
}
