import { ChatRepository } from './infastructure/persistence/chat.repository';
import { CreateChatDto } from './dto/create-chat.dto';
import { FilterChatDto, SortChatDto } from './dto/query-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { User } from '../users/domain/user';
import { ValidateData } from '../../utils/validation/vlalidate-data';
import { Chat } from './domain/chat';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { NullableType } from '../../utils/types/nullable.type';
export declare class ChatService {
    private readonly validateData;
    private readonly chatRepository;
    constructor(validateData: ValidateData, chatRepository: ChatRepository);
    create(createPayload: CreateChatDto, ownerId: User['id']): Promise<Chat>;
    findAll({ filterOptions, sortOptions, paginationOptions, userId, }: {
        filterOptions?: FilterChatDto | null;
        sortOptions?: SortChatDto[] | null;
        paginationOptions: IPaginationOptions;
        userId: User['id'];
    }): Promise<Chat[]>;
    findOne(id: number, userId: User['id']): Promise<NullableType<Chat>>;
    update(id: number, updatePayload: UpdateChatDto): Promise<Chat | null>;
    remove(id: number): Promise<void>;
    validateUserInCaht({ members, userId, }: {
        members: User[];
        userId: User['id'];
    }): boolean;
}
