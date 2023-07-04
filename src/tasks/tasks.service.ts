import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );

      return tasks;
    }

    return tasks;
  }

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
