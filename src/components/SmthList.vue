<script setup lang="ts">
import SmthItem from '@/components/SmthItem.vue';
import type { ISmth } from '@/models/smth';

defineProps<{
    items: ISmth[];
}>();

defineEmits<{
    (e: 'test', id: number): void;
}>();
</script>

<template>
    <SmthItem v-for="item in items" :prop="item.prop" :key="item.id" @test="$emit('test', item.id)" />
</template>
