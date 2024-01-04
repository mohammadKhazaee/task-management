import {
  Controller,
  Param,
  Delete,
  Body,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { User } from 'src/auth/entities/user.entity';
import { getUser } from 'src/auth/get-user.decorator';
import { TaskQueryDto } from 'src/task/dto/task-query.dto';
import { Task } from 'src/task/entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserQueryDto } from './dto/user-query.dto';
import { CreateAccountDto } from 'src/auth/dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { IsAdminGuard } from 'src/auth/isAdmin.gaurd';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(IsAdminGuard)
@UseGuards(AuthGuard())
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/tasks')
  getTasks(@Query() taskQueryDto: TaskQueryDto): Promise<Task[]> {
    return this.adminService.getTasks(taskQueryDto);
  }

  @Get('/users')
  getUsers(
    @Query() userQueryDto: UserQueryDto,
    @getUser() admin: User,
  ): Promise<User[]> {
    return this.adminService.getUsers(userQueryDto, admin);
  }

  @Post('/user')
  @UseInterceptors(FileInterceptor('image'))
  createUser(
    @Body() createUserDto: CreateAccountDto,
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<void> {
    return this.adminService.createUser(createUserDto, image);
  }

  @Patch('/user/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateAccountDto,
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<void> {
    return this.adminService.updateUser(id, updateUserDto, image);
  }

  @Delete('/user/:id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.adminService.deleteUser(id);
  }
}
