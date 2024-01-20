import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { AdminModule } from './admin/admin.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, TaskModule, DatabaseModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
