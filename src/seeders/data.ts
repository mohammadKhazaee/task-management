import { IPermission } from 'src/auth/interfaces/permission.interface';
import { UserRole } from 'src/auth/enums/user-role.enum';
import { permissionType } from 'src/auth/enums/permission-type.enum';

export const permissionsData: IPermission[] = [
  { name: permissionType.EDIT_USER, roles: [UserRole.ADMIN] },
  { name: permissionType.ACCESS_TASKS, roles: [UserRole.ADMIN] },
  { name: permissionType.CREATE_TASK, roles: [UserRole.USER] },
  { name: permissionType.READ_TASK, roles: [UserRole.USER] },
  { name: permissionType.DELETE_TASK, roles: [UserRole.USER] },
];
