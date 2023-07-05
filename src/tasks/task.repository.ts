import { Repository } from 'typeorm';
import { Task } from './dto/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './dto/task-status.enum';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

export class TaskRepository extends Repository<Task> {
  async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = CreateTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }

  async updateTaskStatusById(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.findOne({
      where: { id },
    });
    task.status = status;
    await this.save(task);
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
}
