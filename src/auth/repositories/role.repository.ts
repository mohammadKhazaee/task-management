import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async createAdmin(): Promise<void> {
    const existingRole = await this.existsBy({
      name: UserRole.ADMIN,
    });

    let message = 'ADMIN role exists';
    if (!existingRole) {
      const adminRole = new Role();
      adminRole.name = UserRole.ADMIN;
      const role = await this.save(adminRole);
      if (!role) throw new Error('ADMIN role creation failed');
      else message = 'ADMIN role created';
    }
    console.log(message);
  }
}
