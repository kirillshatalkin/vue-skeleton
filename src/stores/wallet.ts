import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { addWalletItem, getWalletList, removeWalletItem } from '@/services/wallet';
import type { IWalletAddItemForm, IWalletItem } from '@/models/wallet-item';
import { watchDebounced } from '@vueuse/core';
import type { TGetListParams } from '@/services/local-storage-api';

export const useWalletStore = defineStore('wallet', () => {
    const items = ref<IWalletItem[]>([]);
    const isLoading = ref(false);
    const filter = reactive<TGetListParams>({
        search: '',
        dates: undefined,
        categoryIds: [],
    });

    watchDebounced(
        () => filter,
        () => fetchList(),
        { debounce: 300, deep: true },
    );
    const totalPrice = computed<number>(() => items.value.reduce((sum, cur) => sum + cur.price, 0));

    const fetchList = async (): Promise<void> => {
        isLoading.value = true;
        items.value = await getWalletList(filter);
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
        filter,
        totalPrice,
    };
});
