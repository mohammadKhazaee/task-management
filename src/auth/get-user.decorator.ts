import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './entities/user.entity';

export const getUser = createParamDecorator(
  (_data, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
