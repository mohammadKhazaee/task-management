import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { Express } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQueryDto } from './dto/task-query.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/user.entity';
import { getUser } from 'src/auth/get-user.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'attachment', maxCount: 1 },
    ]),
  )
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      attachment?: Express.Multer.File[];
    },
    @getUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, files, user);
  }

  @Get()
  getTasks(
    @Query() taskQueryDto: TaskQueryDto,
    @getUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(taskQueryDto, user);
  }

  @Get(':id')
  getTask(@Param('id') id: string, @getUser() user: User): Promise<Task> {
    return this.taskService.findTask(id, user);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'attachment', maxCount: 1 },
    ]),
  )
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      attachment?: Express.Multer.File[];
    },
    @getUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto, files, user);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @getUser() user: User): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }
}
