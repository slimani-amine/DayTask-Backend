import { BaseEntity } from 'typeorm';
export declare class EntityRelationalHelper extends BaseEntity {
    __entity?: string;
    setEntityName(): void;
    toJSON(): Record<string, any>;
}
