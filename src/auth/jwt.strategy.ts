import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './repositories/user.repository';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userReposetory: UserRepository) {
    super({
      secretOrKey: 'mySecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username, role } = payload;

    const user = await this.userReposetory.findOne({
      where: { username },
      relations: ['roles'],
    });
    if (role && !user) throw new UnauthorizedException();

    return user;
  }
}
