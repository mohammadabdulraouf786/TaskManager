export interface Task {
  id: string;
  name: string;
  description: string;
  created: string;
  due?: string;
  started: boolean;
  completed: boolean;
  timeSpent: string;
  subtasks: Subtask[];
}

export interface Subtask {
  id: string;
  name: string;
  completed: boolean;
}

export interface TaskGroup {
  name: string;
  tasks: Task[];
}