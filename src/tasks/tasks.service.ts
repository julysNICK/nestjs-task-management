import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;
    const task: Task = {
      id: Date.now(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public getTaskById(id: number): Task {
    return this.tasks.find((task) => task.id === id);
  }

  public deleteTaskById(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  public updateTaskStatusById(id: number, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);

    task.status = status;

    return task;
  }
}
