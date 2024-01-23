import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
