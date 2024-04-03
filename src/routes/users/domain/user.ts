import { Exclude, Expose } from 'class-transformer';
import { FileType } from 'src/routes/files/domain/file';
import { Role } from 'src/routes/roles/domain/role';
import { GeneralDomain } from 'src/shared/domain/general.domain';
import { Status } from 'src/shared/statuses/domain/status';

export class User extends GeneralDomain {
  id: number | string;

  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;
  firstName: string | null;
  lastName: string | null;
  photo?: FileType | null;
  role?: Role | null;
  status?: Status;
}
