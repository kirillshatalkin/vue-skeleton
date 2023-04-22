<script setup lang="ts">
import WalletList from '@/components/WalletList.vue';
import AddItemForm from '@/components/AddItemForm.vue';
import { useWalletStore } from '@/stores/wallet';
import { useCategoriesStore } from '@/stores/categories';
import { computed, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import type { IWalletAddItemForm } from '@/models/wallet-item';

const categoriesStore = useCategoriesStore();

categoriesStore.fetchList();

const walletStore = useWalletStore();
const addItemFormVisible = ref(false);

walletStore.fetchList();

const showSkeleton = computed(() => (categoriesStore.isLoading || walletStore.isLoading) && !walletStore.items.length);
const showLoader = computed(() => (categoriesStore.isLoading || walletStore.isLoading) && walletStore.items.length > 0);

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
        <el-col>
            <el-button type="primary" :icon="Plus" @click="openAddItemForm">Add item</el-button>
        </el-col>
    </el-row>

    <el-row class="el-row">
        <el-col>
            <el-input v-model="walletStore.search" placeholder="Search" />
        </el-col>
    </el-row>

    <el-row v-loading="showLoader">
        <el-col>
            <el-skeleton v-if="showSkeleton" :rows="3" animated />

            <template v-else>
                <WalletList
                    v-if="walletStore.items.length > 0"
                    :items="walletStore.items"
                    @remove="walletStore.removeItem"
                />

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
</style>
