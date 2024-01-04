import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQueryDto } from './dto/task-query.dto';
import { TaskRepository } from './task.repository';
import { Task } from './entities/task.entity';
import { User } from 'src/auth/entities/user.entity';
import { FileHelper } from 'src/utils/file.helper';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  async createTask(
    createTaskDto: CreateTaskDto,
    files: {
      image?: Express.Multer.File[];
      attachment?: Express.Multer.File[];
    },
    user: User,
  ) {
    const { image, attachment } = files;
    if (image) image[0].originalname = uuid() + '-' + image[0].originalname;
    if (attachment)
      attachment[0].originalname = uuid() + '-' + attachment[0].originalname;

    const task = await this.taskRepository.createTask(
      createTaskDto,
      files,
      user,
    );
    if (image) FileHelper.saveFile(image[0]);
    if (attachment) FileHelper.saveFile(attachment[0]);

    return task;
  }

  getTasks(taskQueryDto: TaskQueryDto, user: User): Promise<Task[]> {
    return this.taskRepository.fetchTasks(taskQueryDto, user);
  }

  async findTask(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository
      .createQueryBuilder()
      .where('id = :id AND userId = :userId', { id, userId: user.id })
      .getOne();
    // .findOneBy({ id, user });

    if (!task) throw new NotFoundException("Couldn't find the task");
    return task;
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    files: {
      image?: Express.Multer.File[];
      attachment?: Express.Multer.File[];
    },
    user: User,
  ): Promise<Task> {
    const { name, priority } = updateTaskDto;
    const { image, attachment } = files;
    if (image) image[0].originalname = uuid() + '-' + image[0].originalname;
    if (attachment)
      attachment[0].originalname = uuid() + '-' + attachment[0].originalname;

    const task = await this.findTask(id, user);

    task.name = name ? name : task.name;
    task.priority = priority[0] ? priority : task.priority;
    task.fileUrl = attachment ? attachment[0].originalname : task.fileUrl;
    task.imageUrl = image ? image[0].originalname : task.imageUrl;
    await this.taskRepository.save(task);
    if (image) FileHelper.saveFile(image[0]);
    if (attachment) FileHelper.saveFile(attachment[0]);

    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected === 0)
      throw new NotFoundException("Couldn't find the task");
    return;
  }
}
