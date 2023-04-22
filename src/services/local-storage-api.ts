import { isAfter, isBefore } from 'date-fns';

const APP_WALLET_LIST_KEY = 'APP_WALLET_LIST_KEY';
const APP_WALLET_CATEGORIES_KEY = 'APP_WALLET_CATEGORIES_KEY';

// tmp default categories
window.localStorage.setItem(
    APP_WALLET_CATEGORIES_KEY,
    JSON.stringify([
        {
            id: 1,
            title: 'Food',
        },
        {
            id: 2,
            title: 'Shopping',
        },
    ]),
);

export interface IWalletItemDto {
    id: number;
    categoryId: number;
    title: string;
    price: number;
    date: string;
}

export interface IAddWalletItemDto {
    categoryId: number;
    title: string;
    price: number;
    date: string;
}

export type TGetListParams = {
    search?: string;
    dates?: [Date, Date];
    categoryIds?: number[];
};

export interface ICategoryDto {
    id: number;
    title: string;
}

export interface IAddCategoryDto {
    title: string;
}

const parseJSON = <K>(text: string | null, defaultValue: K): K => {
    let result;
    try {
        result = text && JSON.parse(text);
    } catch {
        return defaultValue;
    }
    return result ?? defaultValue;
};

const getWalletList = async (params?: TGetListParams): Promise<IWalletItemDto[]> => {
    const data = window.localStorage.getItem(APP_WALLET_LIST_KEY);
    const defaultValue: IWalletItemDto[] = [];
    const list = parseJSON(data, defaultValue);
    const result = list.filter(item => {
        const date = new Date(item.date);
        return (
            (!params?.search || item.title.toLowerCase().includes(params.search.toLowerCase())) &&
            (!params?.dates?.length || (isAfter(date, params?.dates[0]) && isBefore(date, params?.dates[1]))) &&
            (!params?.categoryIds?.length || params?.categoryIds.includes(item.categoryId))
        );
    });
    return new Promise(resolve => setTimeout(() => resolve(result), 500));
};

const addWalletItem = async (item: IAddWalletItemDto): Promise<void> => {
    const list = await getWalletList();
    const id = list.length ? Math.max(...list.map(item => item.id)) + 1 : 1;
    list.push({
        ...item,
        id,
    });
    window.localStorage.setItem(APP_WALLET_LIST_KEY, JSON.stringify(list));
};

const editWalletItem = async (id: number, editableItem: IAddWalletItemDto): Promise<void> => {
    const list = await getWalletList();
    const newList = list.map(item => {
        if (item.id === id) {
            return editableItem;
        }
        return item;
    });
    window.localStorage.setItem(APP_WALLET_LIST_KEY, JSON.stringify(newList));
};

const removeWalletItem = async (id: number) => {
    const list = await getWalletList();
    const newList = list.filter(item => item.id !== id);
    window.localStorage.setItem(APP_WALLET_LIST_KEY, JSON.stringify(newList));
};

const getCategories = async (): Promise<ICategoryDto[]> => {
    const data = window.localStorage.getItem(APP_WALLET_CATEGORIES_KEY);
    const defaultValue: IWalletItemDto[] = [];
    return parseJSON(data, defaultValue);
};

const addCategory = async (item: IAddCategoryDto): Promise<void> => {
    const list = await getCategories();
    const id = list.length ? Math.max(...list.map(item => item.id)) + 1 : 1;
    list.push({
        ...item,
        id,
    });
    window.localStorage.setItem(APP_WALLET_CATEGORIES_KEY, JSON.stringify(list));
};

const removeCategory = async (id: number) => {
    const list = await getCategories();
    const newList = list.filter(item => item.id !== id);
    window.localStorage.setItem(APP_WALLET_CATEGORIES_KEY, JSON.stringify(newList));
};

export const localStorageApi = {
    wallet: {
        getWalletList,
        addWalletItem,
        editWalletItem,
        removeWalletItem,
        getCategories,
        addCategory,
        removeCategory,
    },
};
