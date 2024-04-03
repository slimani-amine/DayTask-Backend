import { User } from 'src/routes/users/domain/user';
import { GeneralDomain } from 'src/shared/domain/general.domain';

export class Notification extends GeneralDomain {
  id: number;
  receivers: User[];
  sender: User | null;
  seen: boolean;
  content: string;
}
