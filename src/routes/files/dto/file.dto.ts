import { Exclude } from 'class-transformer';
import { FileType } from '../domain/file';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class FileDto implements FileType {
  @IsString()
  @IsUUID()
  id: UUID;

  path: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;
}
