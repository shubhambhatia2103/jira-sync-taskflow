
import { Task } from '@/types/task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement authentication flow',
    description: 'Create login and signup pages with JWT authentication',
    status: 'In Progress',
    type: 'task',
    assignee: 'John Doe',
    dueDate: 'May 15',
    jiraId: 'PROJ-123',
    priority: 'high',
    projectId: '1'
  },
  {
    id: '2',
    title: 'Fix navigation responsiveness',
    description: 'Sidebar navigation breaks on mobile devices',
    status: 'Todo',
    type: 'bug',
    assignee: 'John Doe',
    dueDate: 'May 12',
    jiraId: 'PROJ-124',
    priority: 'medium',
    projectId: '1'
  },
  {
    id: '3',
    title: 'User profile settings page',
    description: 'Create settings page for user profile management',
    status: 'Done',
    type: 'task',
    assignee: 'John Doe',
    dueDate: 'May 8',
    jiraId: 'PROJ-118',
    priority: 'medium',
    projectId: '1'
  },
  {
    id: '4',
    title: 'API integration for dashboard',
    description: 'Connect dashboard to API endpoints',
    status: 'In Review',
    type: 'task',
    assignee: 'Jane Smith',
    dueDate: 'May 14',
    jiraId: 'PROJ-125',
    priority: 'high',
    projectId: '1'
  },
  {
    id: '5',
    title: 'Fix data loading issue',
    description: 'Dashboard fails to load data occasionally',
    status: 'In Progress',
    type: 'bug',
    assignee: 'Alex Johnson',
    dueDate: 'May 11',
    jiraId: 'PROJ-126',
    priority: 'high',
    projectId: '1'
  },
  {
    id: '6',
    title: 'Add dark mode support',
    description: 'Implement dark mode for better user experience',
    status: 'Todo',
    type: 'task',
    assignee: 'Sarah Wilson',
    dueDate: 'May 18',
    jiraId: 'PROJ-127',
    priority: 'low',
    projectId: '1'
  },
  {
    id: '7',
    title: 'Performance optimization',
    description: 'Improve load times and optimize animations',
    status: 'Todo',
    type: 'task',
    assignee: 'John Doe',
    dueDate: 'May 20',
    priority: 'medium',
    projectId: '1'
  }
];

export const mockProjects = [
  {
    id: '1',
    name: 'Frontend Dashboard',
    description: 'Customer-facing dashboard application',
  },
  {
    id: '2',
    name: 'API Gateway',
    description: 'Internal API gateway service',
  }
];
