import { ref } from 'vue';
import { defineStore } from 'pinia';
import { addWalletItem, getWalletList, removeWalletItem } from '@/services/wallet';
import type { IWalletAddItemForm, IWalletItem } from '@/models/wallet-item';

export const useWalletStore = defineStore('wallet', () => {
    const items = ref<IWalletItem[]>([]);
    const isLoading = ref(false);
    const search = ref('');

    const fetchList = async (): Promise<void> => {
        isLoading.value = true;
        items.value = await getWalletList({
            search: search.value,
        });
        isLoading.value = false;
    };

    const addItem = async (item: IWalletAddItemForm): Promise<boolean> => {
        isLoading.value = true;
        const result = await addWalletItem(item);
        isLoading.value = false;

        if (result) {
            await fetchList();
        }
        return result;
    };

    const removeItem = async (id: number): Promise<void> => {
        isLoading.value = true;
        const result = await removeWalletItem(id);
        isLoading.value = false;

        if (result) {
            await fetchList();
        }
    };

    return {
        fetchList,
        addItem,
        removeItem,
        isLoading,
        items,
        search,
    };
});
