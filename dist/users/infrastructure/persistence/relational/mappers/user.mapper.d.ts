import { User } from "../../../../domain/user";
import { UserEntity } from "../entities/user.entity";
export declare class UserMapper {
    static toDomain(raw: UserEntity): User;
    static toPersistence(user: User): UserEntity;
}
