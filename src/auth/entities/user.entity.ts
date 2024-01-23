import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // @Column()
  // role: UserRole;

  @Column({ default: null })
  imageUrl: string;

  @CreateDateColumn()
  createdDate: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(() => Role, (role) => role.user, {
    cascade: true,
  })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
