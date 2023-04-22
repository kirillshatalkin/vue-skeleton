<script setup lang="ts">
import { computed } from 'vue';
import { formatDate } from '@/utils/date';
import { formatPrice } from '@/utils/price';
import { Delete } from '@element-plus/icons-vue';

const props = defineProps<{
    title: string;
    category: string;
    price: number;
    date: Date;
}>();

defineEmits<{
    (e: 'remove'): void;
}>();

const date = computed<string>(() => formatDate(props.date));
const price = computed<string>(() => formatPrice(props.price));
</script>

<template>
    <el-card class="el-card">
        <div class="card-text">
            <span class="card-title">{{ props.title }}</span>
            <span class="card-category">{{ props.category }}</span>
            <span class="card-price">{{ price }}</span>
            <span class="card-date">{{ date }}</span>

            <el-popover trigger="click" placement="top" :width="220">
                <b>Are you sure to delete this?</b>
                <br />
                <br />
                <el-button type="danger" @click="$emit('remove')">Sure 100%</el-button>
                <template #reference>
                    <el-button type="danger" :icon="Delete" />
                </template>
            </el-popover>
        </div>
    </el-card>
</template>

<style scoped>
.el-card {
    margin-bottom: 5px;
}
.card-text {
    display: grid;
    grid-template-columns: 200px 100px 100px 200px 30px;
    justify-content: space-between;
    align-items: center;
}
</style>
