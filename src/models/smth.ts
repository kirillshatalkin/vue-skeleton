import type { SmthDto } from '@/services/generated/api';

export interface ISmth {
    id: number;
    prop: string;
}

export const mapSmthDtoToSmth = (dto: SmthDto): ISmth => ({
    id: dto.id,
    prop: dto.prop ?? '',
});
