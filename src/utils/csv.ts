import type { IWalletItemWithCategory } from '@/models/wallet-item';

interface IHeader<T> {
    title: string;
    key: keyof T;
}

export const tableToCSV = <T>(headers: IHeader<T>[], items: T[]): string =>
    [
        headers.map(header => header.title).join(','),
        ...items.map(item => headers.map(header => JSON.stringify(item[header.key])).join(',')),
    ].join('\r\n');

export const itemsHeaders: IHeader<IWalletItemWithCategory>[] = [
    {
        title: 'Title',
        key: 'title',
    },
    {
        title: 'Price',
        key: 'price',
    },
    {
        title: 'Date',
        key: 'date',
    },
    {
        title: 'Category',
        key: 'category',
    },
];
