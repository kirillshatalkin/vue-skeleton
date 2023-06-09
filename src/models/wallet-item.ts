import type { IAddWalletItemDto, IWalletItemDto } from '@/services/local-storage-api';

export interface IWalletItem {
    id: number;
    categoryId: number;
    title: string;
    price: number;
    date: Date;
}

export interface IWalletItemWithCategory extends IWalletItem {
    category: string;
}

export interface IWalletAddItemForm {
    id?: number;
    categoryId?: number;
    title: string;
    price?: number;
    date: Date;
}

export const mapWalletItemDtoToWalletItem = (dto: IWalletItemDto): IWalletItem => ({
    ...dto,
    date: new Date(dto.date),
});

export const mapWalletFormToWalletItemDto = (item: IWalletAddItemForm): IAddWalletItemDto => ({
    ...item,
    date: item.date.toISOString(),
    price: item.price ?? 0,
    categoryId: item.categoryId ?? 0,
});
