<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    prop: string;
}>();

defineEmits<{
    (e: 'test'): void;
}>();

const buttonType = computed(() => (!props.prop ? 'warning' : 'primary'));
</script>

<template>
    <el-card class="el-card">
        <template #header>
            <div class="card-header">
                <div class="card-text">
                    <span class="card-title">{{ props.prop }}</span>
                </div>
            </div>
        </template>

        <el-button :type="buttonType" @click="$emit('test')">Test</el-button>
    </el-card>
</template>

<style scoped>
.el-card {
    margin-bottom: 5px;
}
</style>
