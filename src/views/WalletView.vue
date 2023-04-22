<script setup lang="ts">
import WalletList from '@/components/WalletList.vue';
import WalletChart from '@/components/WalletCharts.vue';
import AddItemForm from '@/components/AddItemForm.vue';
import TotalItem from '@/components/TotalItem.vue';
import { useWalletStore } from '@/stores/wallet';
import { useCategoriesStore } from '@/stores/categories';
import { computed, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import type { IWalletAddItemForm, IWalletItemWithCategory } from '@/models/wallet-item';
import { shortcuts } from '@/utils/date';

const showCharts = ref(false);

const categoriesStore = useCategoriesStore();

categoriesStore.fetchList();

const walletStore = useWalletStore();
const addItemFormVisible = ref(false);

walletStore.fetchList();

const items = computed<IWalletItemWithCategory[]>(() =>
    walletStore.items.map(item => ({
        ...item,
        category: categoriesStore.itemsMap.get(item.categoryId)?.title ?? '',
    })),
);

const showSkeleton = computed<boolean>(
    () => (categoriesStore.isLoading || walletStore.isLoading) && !walletStore.items.length,
);
const showLoader = computed<boolean>(
    () => (categoriesStore.isLoading || walletStore.isLoading) && walletStore.items.length > 0,
);

const submitAddItemForm = async (item: IWalletAddItemForm) => {
    const result = await walletStore.addItem(item);
    if (result) {
        closeAddItemForm();
    }
};

const closeAddItemForm = () => {
    addItemFormVisible.value = false;
};

const openAddItemForm = () => {
    addItemFormVisible.value = true;
};

const handleAddItemFormClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close form?').then(() => done());
};
</script>

<template>
    <el-row class="el-row" justify="space-between">
        <el-col :span="4">
            <el-button type="primary" :icon="Plus" @click="openAddItemForm">Add item</el-button>
        </el-col>

        <el-col :span="3">
            <el-checkbox v-model="showCharts" label="Show charts" />
        </el-col>
    </el-row>

    <el-row class="el-row" :gutter="20">
        <el-col :span="7">
            <el-input v-model="walletStore.filter.search" placeholder="Search" clearable />
        </el-col>

        <el-col :span="7">
            <el-select
                v-model="walletStore.filter.categoryIds"
                multiple
                placeholder="Select categories"
                class="filter-select"
                clearable
            >
                <el-option v-for="item in categoriesStore.items" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
        </el-col>

        <el-col :span="10">
            <el-date-picker
                v-model="walletStore.filter.dates"
                type="daterange"
                unlink-panels
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                :shortcuts="shortcuts"
            />
        </el-col>
    </el-row>

    <el-row v-loading="showLoader">
        <el-col>
            <el-skeleton v-if="showSkeleton" :rows="3" animated />

            <template v-else>
                <template v-if="walletStore.items.length > 0">
                    <TotalItem :price="walletStore.totalPrice" />

                    <WalletChart v-if="showCharts" :items="items" :categories="categoriesStore.itemsMap" />
                    <WalletList :items="items" @remove="walletStore.removeItem" v-else />
                </template>

                <el-empty v-else description="No items" />
            </template>
        </el-col>
    </el-row>

    <el-dialog
        destroy-on-close
        v-model="addItemFormVisible"
        title="Add item"
        width="30%"
        :before-close="handleAddItemFormClose"
    >
        <AddItemForm @submit="submitAddItemForm" v-loading="showLoader" :categories="categoriesStore.items" />
    </el-dialog>
</template>

<style scoped>
.el-row {
    margin-bottom: 20px;
}
.filter-select {
    width: 100%;
}
</style>
