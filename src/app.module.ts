import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { AdminModule } from './admin/admin.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '13771377',
      database: 'task-management',
      synchronize: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    TaskModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
