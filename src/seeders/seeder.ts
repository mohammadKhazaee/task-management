import { Injectable } from '@nestjs/common';
import { PermissionRepository } from 'src/auth/repositories/permission.repository';
import { RoleRepository } from 'src/auth/repositories/role.repository';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { UserRole } from 'src/auth/enums/user-role.enum';
import { In } from 'typeorm';
import { permissionsData } from './data';

@Injectable()
export class Seeder {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}
  async seed() {
    try {
      await this.seedAdminRole();
      await this.seedAdmin();
      await this.seedPermissions();
    } catch (error) {
      console.log(error);
    }
  }

  async seedAdmin(): Promise<void> {
    const { returnAdmin, code } = await this.userRepository.createAdmin();
    if (code === 2) throw new Error('ADMIN seeding failed');
    if (code === 0) return console.log('ADMIN arleady exists');
    if (code === 1) {
      const adminRoles = await this.roleRepository.findBy({
        name: In([UserRole.ADMIN, UserRole.USER]),
      });
      returnAdmin.roles = adminRoles;
      await this.userRepository.save(returnAdmin);
      console.log('ADMIN created');
    }
  }

  seedAdminRole(): Promise<void> {
    return this.roleRepository.createAdmin();
  }

  async seedPermissions(): Promise<void> {
    const permissions = permissionsData;
    // permissions.forEach(
    //   async (p) => await this.permissionRepository.insertPermission(p),
    //   );
    await this.permissionRepository.insertPermission(permissions[0]);
  }
}
