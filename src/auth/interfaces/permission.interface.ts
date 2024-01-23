import { UserRole } from '../enums/user-role.enum';

export interface IPermission {
  name: string;
  roles: UserRole[];
}
