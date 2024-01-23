import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleRepository } from '../repositories/role.repository';
import { Permission } from '../decorators/permission.decorator';
import { Role } from '../entities/role.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleRepository: RoleRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const permissions = this.reflector.get(Permission, context.getHandler());
    const mapedPermissions = permissions.map((p) => `"${p}"`);
    const userRoles: Role[] = req.user.roles;
    const permitedRoles = await this.roleRepository
      .createQueryBuilder('role')
      .innerJoinAndSelect('role.permissions', 'permission')
      .where('permission.name IN (:permissions)', {
        permissions: mapedPermissions,
      })
      .getMany();
    console.log(permitedRoles, userRoles);

    if (
      !permitedRoles.some((role) => {
        let includes = false;
        userRoles.forEach((r) => {
          if (r.id === role.id) includes = true;
        });
        return includes;
      })
    )
      throw new UnauthorizedException('Not autherized to this route!');
    return true;
  }
}
