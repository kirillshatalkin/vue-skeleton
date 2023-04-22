<script setup lang="ts">
import { computed } from 'vue';
import { formatPrice } from '@/utils/price';

const props = defineProps<{
    price: number;
}>();

const price = computed<string>(() => formatPrice(props.price));
</script>

<template>
    <el-card class="el-card">
        <div class="card-text">
            <span class="card-title">Total: </span>
            <span class="card-price">{{ price }}</span>
        </div>
    </el-card>
</template>

<style scoped>
.el-card {
    margin-bottom: 5px;
}
.card-title {
    font-weight: bold;
}
</style>
