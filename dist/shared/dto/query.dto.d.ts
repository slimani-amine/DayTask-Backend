import { SortDto } from './sort.dto';
export declare class QueryDto<Domain, FilterDto> {
    page?: number;
    limit?: number;
    sort?: SortDto<Domain>[] | null;
    filters?: FilterDto | null;
}
