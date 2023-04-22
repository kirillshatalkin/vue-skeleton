<script setup lang="ts">
import WalletItem from '@/components/WalletItem.vue';
import type { IWalletItem } from '@/models/wallet-item';

defineProps<{
    items: IWalletItem[];
}>();

defineEmits<{
    (e: 'remove', id: number): void;
}>();
</script>

<template>
    <WalletItem
        v-for="item in items"
        :title="item.title"
        :date="item.date"
        :key="item.id"
        @remove="$emit('remove', item.id)"
    />
</template>
