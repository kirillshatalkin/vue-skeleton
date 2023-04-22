import type { ICategoryDto, IAddCategoryDto } from '@/services/local-storage-api';

export interface ICategory {
    id: number;
    title: string;
}

export interface IAddCategoryForm {
    title: string;
}

export const mapCategoryItemDtoToCategoryItem = (dto: ICategoryDto): ICategory => ({
    ...dto,
});

export const mapCategoryFormToCategoryDto = (item: IAddCategoryForm): IAddCategoryDto => ({
    ...item,
});
