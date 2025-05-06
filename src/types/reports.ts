
export type TimeRange = 'week' | 'month' | 'quarter' | 'year';

export interface TimeEntry {
  projectId: string;
  date: string;
  hours: number;
}

export interface ProjectTime {
  projectId: string;
  projectName: string;
  hours: number;
  percentage?: number;
  color?: string;
}
