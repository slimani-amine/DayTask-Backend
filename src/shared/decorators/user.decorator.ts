import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as user } from 'src/routes/users/domain/user';
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): user => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
