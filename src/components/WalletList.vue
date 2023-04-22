<script setup lang="ts">
import WalletItem from '@/components/WalletItem.vue';
import type { IWalletItemWithCategory } from '@/models/wallet-item';

defineProps<{
    items: IWalletItemWithCategory[];
}>();

defineEmits<{
    (e: 'remove', id: number): void;
}>();
</script>

<template>
    <WalletItem
        v-for="item in items"
        :category="item.category"
        :title="item.title"
        :price="item.price"
        :date="item.date"
        :key="item.id"
        @remove="$emit('remove', item.id)"
    />
</template>
