import { handleError } from '@/services/handle-error';
import { localStorageApi } from '@/services/local-storage-api';
import type { TGetListParams } from '@/services/local-storage-api';
import type { IWalletAddItemForm } from '@/models/wallet-item';
import { mapWalletItemDtoToWalletItem, mapWalletFormToWalletItemDto } from '@/models/wallet-item';
import { mapCategoryFormToCategoryDto, mapCategoryItemDtoToCategoryItem } from '@/models/wallet-category';
import type { IAddCategoryForm } from '@/models/wallet-category';

export const getWalletList = handleError(async (params: TGetListParams) => {
    const items = await localStorageApi.wallet.getWalletList(params);
    return items.map(mapWalletItemDtoToWalletItem);
}, []);

export const addWalletItem = handleError(async (item: IWalletAddItemForm) => {
    const dto = mapWalletFormToWalletItemDto(item);
    await localStorageApi.wallet.addWalletItem(dto);
    return true;
}, false);

export const removeWalletItem = handleError(async (id: number) => {
    await localStorageApi.wallet.removeWalletItem(id);
    return true;
}, false);

export const getCategories = handleError(async () => {
    const items = await localStorageApi.wallet.getCategories();
    return items.map(mapCategoryItemDtoToCategoryItem);
}, []);

export const addCategory = handleError(async (item: IAddCategoryForm) => {
    const dto = mapCategoryFormToCategoryDto(item);
    await localStorageApi.wallet.addCategory(dto);
    return true;
}, false);

export const removeCategory = handleError(async (id: number) => {
    await localStorageApi.wallet.removeCategory(id);
    return true;
}, false);
