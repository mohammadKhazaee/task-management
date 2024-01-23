import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seeder } from './seeder';
import { AuthModule } from '../auth/auth.module';
import { TaskModule } from 'src/task/task.module';

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
  ],
  providers: [Seeder],
})
export class SeederModule {}
