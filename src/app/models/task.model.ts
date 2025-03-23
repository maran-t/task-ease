export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in-progress' | 'done';
    assignee?: string;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    createdAt: Date;
    updatedAt?: Date;
  }
  