import { Session } from 'src/routes/session/domain/session';
import { User } from 'src/routes/users/domain/user';

export type JwtPayloadType = Pick<User, 'id' | 'role'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
