import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { CreateAccountDto } from 'src/auth/dto/create-account.dto';
import { User } from 'src/auth/entities/user.entity';
import { TaskQueryDto } from 'src/task/dto/task-query.dto';
import { Task } from 'src/task/entities/task.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { TaskRepository } from 'src/task/task.repository';
import { UserRepository } from 'src/auth/user.repository';
import { UserRole } from 'src/auth/user-role.enum';
import { FileHelper } from 'src/utils/file.helper';

@Injectable()
export class AdminService {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository,
  ) {}

  getTasks(taskQueryDto: TaskQueryDto): Promise<Task[]> {
    return this.taskRepository.fetchTasks(taskQueryDto);
  }

  getUsers(userQueryDto: UserQueryDto, admin: User): Promise<User[]> {
    return this.userRepository.getUsers(userQueryDto, admin);
  }

  async createUser(
    createUserDto: CreateAccountDto,
    image: Express.Multer.File,
  ): Promise<void> {
    if (image) image.originalname = uuid() + '-' + image.originalname;
    await this.userRepository.createUser(createUserDto, image);
    if (image) FileHelper.saveFile(image);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateAccountDto,
    image: Express.Multer.File,
  ): Promise<void> {
    const { username, password, isAdmin } = updateUserDto;
    if (image) image.originalname = uuid() + '-' + image.originalname;
    const user = await this.userRepository.getUser(id);
    if (username) {
      const newUsername = await this.userRepository.findAndCountBy({
        username,
      });
      user.username = newUsername[1] > 0 ? username : user.username;
    }
    if (password) {
      const hashedPass = await bcrypt.hash(password, 12);
      user.password = hashedPass;
    }
    user.role = isAdmin ? UserRole.ADMIN : user.role;
    user.imageUrl = image ? image.originalname : user.imageUrl;

    await this.userRepository.save(user);
    if (image) FileHelper.saveFile(image);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
