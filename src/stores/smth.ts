import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { getSmthFromLS, getSmthFromApi } from '@/services/smth';
import { ElNotification } from 'element-plus';
import type { ISmth } from '@/models/smth';

export const useSmthStore = defineStore('smth', () => {
    const smthApi = ref<ISmth[]>([]);
    const search = ref('');
    const isLoading = ref(false);

    const filteredItems = computed<ISmth[]>(() => {
        if (!search.value) return smthApi.value;

        return smthApi.value.filter(item => item.prop.toLowerCase().includes(search.value.toLowerCase()));
    });

    const fetchSmthApi = async () => {
        isLoading.value = true;
        const result = await getSmthFromApi();
        isLoading.value = false;

        smthApi.value = result ?? [];

        return !!result;
    };

    const fetchSmthLS = async () => {
        isLoading.value = true;
        const result = await getSmthFromLS();
        isLoading.value = false;

        if (result) {
            ElNotification({
                title: 'Hurey!',
                type: 'success',
                message: 'We did it.',
            });
        }
    };

    return {
        filteredItems,
        fetchSmthApi,
        isLoading,
        search,
        fetchSmthLS,
    };
});
