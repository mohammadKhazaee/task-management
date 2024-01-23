import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { IsAdminGuard } from './gaurds/isAdmin.gaurd';
import { PermissionGuard } from './gaurds/permission.gaurd';
import { UserRepository } from './repositories/user.repository';
import { RoleRepository } from './repositories/role.repository';
import { PermissionRepository } from './repositories/permission.repository';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'mySecret',
      signOptions: { expiresIn: 7200 },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    JwtStrategy,
    IsAdminGuard,
    PermissionGuard,
    RoleRepository,
    PermissionRepository,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    IsAdminGuard,
    PermissionGuard,
    UserRepository,
    RoleRepository,
    PermissionRepository,
  ],
})
export class AuthModule {}
