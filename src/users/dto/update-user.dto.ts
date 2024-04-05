import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { Transform, Type } from "class-transformer";
import { IsEmail, IsOptional, MinLength } from "class-validator";
import { lowerCaseTransformer } from "src/utils/transformers/lower-case.transformer";
import { RoleDto } from "src/roles/dto/role.dto";
import { StatusDto } from "src/shared/statuses/dto/status.dto";
import { FileDto } from "src/files/dto/file.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @IsOptional()
  firstName?: string | null;

  @IsOptional()
  lastName?: string | null;

  @IsOptional()
  photo?: FileDto | null;

  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;

  hash?: string | null;
}
