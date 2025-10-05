// Simple in-memory database for development
// In production, this would be replaced with a real database like PostgreSQL

import { User, Task } from '@/types';

// In-memory storage
const users: User[] = [];
const tasks: Task[] = [];

// User ID counter
let userIdCounter = 1;
let taskIdCounter = 1;

export const db = {
  // User operations
  users: {
    create: (user: Omit<User, 'id' | 'createdAt'>): User => {
      const newUser: User = {
        ...user,
        id: `user_${userIdCounter++}`,
        createdAt: new Date(),
      };
      users.push(newUser);
      return newUser;
    },

    findByUsername: (username: string): User | undefined => {
      return users.find(user => user.username === username);
    },

    findById: (id: string): User | undefined => {
      return users.find(user => user.id === id);
    },
  },

  // Task operations
  tasks: {
    create: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'progressPercentage'>): Task => {
      const progressPercentage = task.estimatedHours > 0 
        ? Math.min(100, Math.round((task.actualHours / task.estimatedHours) * 100))
        : 0;

      const newTask: Task = {
        ...task,
        id: `task_${taskIdCounter++}`,
        progressPercentage,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      tasks.push(newTask);
      return newTask;
    },

    findById: (id: string): Task | undefined => {
      return tasks.find(task => task.id === id);
    },

    findByUserId: (userId: string): Task[] => {
      return tasks.filter(task => task.userId === userId);
    },

    update: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'userId'>>): Task | null => {
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex === -1) return null;

      const existingTask = tasks[taskIndex];
      const updatedTask = {
        ...existingTask,
        ...updates,
        updatedAt: new Date(),
      };

      // Recalculate progress percentage if actualHours or estimatedHours changed
      if (updates.actualHours !== undefined || updates.estimatedHours !== undefined) {
        const estimatedHours = updates.estimatedHours ?? existingTask.estimatedHours;
        const actualHours = updates.actualHours ?? existingTask.actualHours;
        updatedTask.progressPercentage = estimatedHours > 0 
          ? Math.min(100, Math.round((actualHours / estimatedHours) * 100))
          : 0;
      }

      tasks[taskIndex] = updatedTask;
      return updatedTask;
    },

    delete: (id: string): boolean => {
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex === -1) return false;
      tasks.splice(taskIndex, 1);
      return true;
    },

    findWithFilters: (
      userId: string,
      filters: {
        status?: string;
        priority?: string;
        isCompleted?: boolean;
        search?: string;
      },
      sort: {
        field: string;
        direction: 'asc' | 'desc';
      },
      pagination: {
        page: number;
        limit: number;
      }
    ) => {
      let filteredTasks = tasks.filter(task => task.userId === userId);

      // Apply filters
      if (filters.status) {
        filteredTasks = filteredTasks.filter(task => task.status === filters.status);
      }
      if (filters.priority) {
        filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
      }
      if (filters.isCompleted !== undefined) {
        filteredTasks = filteredTasks.filter(task => task.isCompleted === filters.isCompleted);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredTasks = filteredTasks.filter(task => 
          task.title.toLowerCase().includes(searchLower) ||
          task.description?.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      filteredTasks.sort((a, b) => {
        const aValue = a[sort.field as keyof Task];
        const bValue = b[sort.field as keyof Task];
        
        if (aValue === undefined || bValue === undefined) return 0;
        if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });

      // Apply pagination
      const total = filteredTasks.length;
      const totalPages = Math.ceil(total / pagination.limit);
      const startIndex = (pagination.page - 1) * pagination.limit;
      const endIndex = startIndex + pagination.limit;
      const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

      return {
        tasks: paginatedTasks,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total,
          totalPages,
        },
      };
    },
  },
};
