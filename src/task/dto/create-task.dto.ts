import { IsEnum, IsString, MinLength } from 'class-validator';
import { TaskPriority } from '../task-priority.enum';

export class CreateTaskDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;
}
