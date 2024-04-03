import { User } from 'src/routes/users/domain/user';
import { GeneralDomain } from 'src/shared/domain/general.domain';

export class Session extends GeneralDomain {
  id: number | string;
  user: User;
  hash: string;
}
