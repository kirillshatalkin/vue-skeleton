<script setup lang="ts">
import { computed } from 'vue';
import { formatDate } from '@/utils/date';

const props = defineProps<{
    title: string;
    date: Date;
}>();

defineEmits<{
    (e: 'remove'): void;
}>();

const date = computed(() => formatDate(props.date));
</script>

<template>
    <el-card class="el-card">
        <template #header>
            <div class="card-header">
                <div class="card-text">
                    <span class="card-title">{{ props.title }}</span>
                    <span class="card-date">{{ date }}</span>
                </div>
            </div>
        </template>

        <el-button type="danger" @click="$emit('remove')">Remove</el-button>
    </el-card>
</template>

<style scoped>
.el-card {
    margin-bottom: 5px;
}
.card-text {
    display: flex;
    justify-content: space-between;
}
</style>
