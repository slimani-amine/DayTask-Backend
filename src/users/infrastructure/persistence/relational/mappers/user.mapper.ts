import { RoleEntity } from "src/roles/infrastructure/persistence/relational/entities/role.entity";
import { User } from "../../../../domain/user";
import { UserEntity } from "../entities/user.entity";
import { FileEntity } from "src/files/infrastructure/persistence/relational/entities/file.entity";
import { StatusEntity } from "src/shared/statuses/infrastructure/persistence/relational/entities/status.entity";
import { FileMapper } from "src/files/infrastructure/persistence/relational/mappers/file.mapper";

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const user = new User();
    delete raw.__entity;
    Object.assign(user, raw);
    if (raw.photo) {
      user.photo = FileMapper.toDomain(raw.photo);
    }
    return user;
  }

  static toPersistence(user: User): UserEntity {
    let role: RoleEntity | undefined = undefined;

    if (user.role) {
      role = new RoleEntity();
      role.id = user.role.id;
    }

    let photo: FileEntity | undefined | null = undefined;

    if (user.photo) {
      photo = new FileEntity();
      photo.id = user.photo.id;
      photo.path = user.photo.path;
    } else if (user.photo === null) {
      photo = null;
    }

    let status: StatusEntity | undefined = undefined;

    if (user.status) {
      status = new StatusEntity();
      status.id = user.status.id;
    }

    const userEntity = new UserEntity();
    Object.assign(userEntity, user);

    if (user.id && typeof user.id === "number") {
      userEntity.id = user.id;
    }
    userEntity.photo = photo;
    userEntity.role = role;
    userEntity.status = status;
    return userEntity;
  }
}
