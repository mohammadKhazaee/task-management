import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/auth/entities/user.entity';
import { TaskQueryDto } from './dto/task-query.dto';
import { UserRole } from 'src/auth/user-role.enum';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async fetchTasks(taskQueryDto: TaskQueryDto, user?: User): Promise<Task[]> {
    const { search, sortType, page } = taskQueryDto,
      TASK_PER_PAGE = 4;

    const query = this.createQueryBuilder('task');
    if (user && user.role === UserRole.USER)
      query.where('userId = :user', { user: user.id });

    if (search)
      query.andWhere('name LIKE :search', {
        search: `%${search}%`,
      });

    if (sortType) {
      const sortData: string[] = sortType.toString().split('_');
      query.orderBy(sortData[0], sortData[1] === 'ASC' ? 'ASC' : 'DESC');
    }

    if (page) query.skip((parseInt(page) - 1) * TASK_PER_PAGE);

    return query.take(TASK_PER_PAGE).getMany();
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    files: {
      image?: Express.Multer.File[];
      attachment?: Express.Multer.File[];
    },
    user: User,
  ): Promise<Task> {
    const { name, priority } = createTaskDto;
    const { image, attachment } = files;

    const task = this.create({
      name,
      priority,
      user,
    });
    task.fileUrl = attachment ? attachment[0].originalname : task.fileUrl;
    task.imageUrl = image ? image[0].originalname : task.imageUrl;
    const createdTask = await this.save(task);
    return createdTask;
  }
}
