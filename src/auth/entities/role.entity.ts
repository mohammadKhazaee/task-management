import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { User } from './user.entity';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: UserRole;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((_type) => User, (user) => user.roles, { eager: true })
  user: User[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(() => Permission, (permission) => permission.roles, {
    cascade: true,
  })
  @JoinTable()
  permissions: Permissions[];
}
