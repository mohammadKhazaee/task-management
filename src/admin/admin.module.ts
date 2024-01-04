import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [AuthModule, TaskModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
