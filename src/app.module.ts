import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { dataSourceOption } from 'db/data-source';

@Module({
  imports: [
    AuthModule,
    TaskModule,
    TypeOrmModule.forRoot({ ...dataSourceOption, autoLoadEntities: true }),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
