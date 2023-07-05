import { TaskStatus } from './dto/task-status.enum';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
