import { Task } from '../../task/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { UserRole } from '../user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  @Column({ default: null })
  imageUrl: string;

  @CreateDateColumn()
  createdDate: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
