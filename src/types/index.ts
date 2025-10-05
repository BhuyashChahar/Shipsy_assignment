// Task Management System Types

export interface User {
  id: string;
  username: string;
  password: string; // hashed
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string; // Text field
  status: TaskStatus; // Enum field
  priority: TaskPriority; // Enum field
  isCompleted: boolean; // Boolean field
  estimatedHours: number;
  actualHours: number;
  progressPercentage: number; // Calculated field (derived from actualHours/estimatedHours)
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  DONE = 'done'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface CreateTaskRequest {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedHours: number;
  description?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  isCompleted?: boolean;
  estimatedHours?: number;
  actualHours?: number;
  description?: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  isCompleted?: boolean;
  search?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  field: keyof Task;
  direction: 'asc' | 'desc';
}

export interface TaskListResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
