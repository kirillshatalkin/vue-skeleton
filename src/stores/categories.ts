import { ref } from 'vue';
import { defineStore } from 'pinia';
import { addCategory, getCategories, removeCategory } from '@/services/wallet';
import type { IAddCategoryForm, ICategory } from '@/models/wallet-category';

export const useCategoriesStore = defineStore('categories', () => {
    const items = ref<ICategory[]>([]);
    const isLoading = ref(false);

    const fetchList = async (): Promise<void> => {
        isLoading.value = true;
        items.value = await getCategories();
        isLoading.value = false;
    };

    const addItem = async (item: IAddCategoryForm): Promise<boolean> => {
        isLoading.value = true;
        const result = await addCategory(item);
        isLoading.value = false;

        if (result) {
            await fetchList();
        }
        return result;
    };

    const removeItem = async (id: number): Promise<void> => {
        isLoading.value = true;
        const result = await removeCategory(id);
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
    };
});
