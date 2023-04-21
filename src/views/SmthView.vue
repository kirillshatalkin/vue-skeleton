<script setup lang="ts">
import SmthList from '@/components/SmthList.vue';
import { useSmthStore } from '@/stores/smth';
import { computed } from 'vue';
import { ElNotification } from 'element-plus';

const smthStore = useSmthStore();

smthStore.fetchSmthApi();

const showSkeleton = computed(() => smthStore.isLoading && !smthStore.filteredItems.length);
const showLoader = computed(() => smthStore.isLoading && smthStore.filteredItems.length);

const refreshList = async () => {
    const result = await smthStore.fetchSmthApi();

    if (result) {
        ElNotification({
            title: 'List refreshed',
            type: 'success',
        });
    }
};
</script>

<template>
    <el-row class="el-row" justify="space-between">
        <el-col :span="4">
            <el-button @click="refreshList">Refresh list</el-button>
        </el-col>
    </el-row>

    <el-row class="el-row">
        <el-col>
            <el-input v-model="smthStore.search" placeholder="Search" />
        </el-col>
    </el-row>

    <el-row v-loading="showLoader">
        <el-col>
            <el-skeleton v-if="showSkeleton" :rows="3" animated />

            <template v-else>
                <SmthList
                    v-if="smthStore.filteredItems.length > 0"
                    :items="smthStore.filteredItems"
                    @test="smthStore.fetchSmthLS"
                />

                <el-empty v-else description="No items" />
            </template>
        </el-col>
    </el-row>
</template>

<style scoped>
.el-row {
    margin-bottom: 20px;
}
</style>
