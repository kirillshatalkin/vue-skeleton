import { smthApi } from '@/services/smth-api';
import { handleError } from '@/services/handle-error';
import { localStorageApi } from '@/services/local-storage-api';
import { mapSmthDtoToSmth } from '@/models/smth';

export const getSmthFromLS = handleError(() => {
    return localStorageApi.smth.getList();
}, []);

export const getSmthFromApi = handleError(async () => {
    const { data } = await smthApi.smth.listList();

    return data.items.map(mapSmthDtoToSmth);
}, undefined);
