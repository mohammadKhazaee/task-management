import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import { IPermission } from '../interfaces/permission.interface';
import { Role } from '../entities/role.entity';

@Injectable()
export class PermissionRepository extends Repository<Permission> {
  constructor(private dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  async insertPermission(p: IPermission): Promise<void> {
    const { name, roles } = p;

    let permission = await this.createQueryBuilder('permission')
      .innerJoinAndSelect('permission.roles', 'role')
      .where('name = :name', { name })
      .getOne();
    if (!permission) {
      permission = new Permission();
      permission.name = name;
    }

    roles.forEach((r) => {
      if (permission.roles.find((pr) => pr.name !== r)) {
        const newRole = new Role();
        newRole.name = r;
        permission.roles.push(newRole);
      }
    });
    await this.save(permission);
  }
}
