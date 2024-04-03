export declare class SortDto<T> {
    orderBy: keyof T;
    order: 'asc' | 'desc';
}
