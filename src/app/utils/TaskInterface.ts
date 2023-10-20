export interface Task {
  id: number;
  name: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  category?: string;
  progress?: string;
}
