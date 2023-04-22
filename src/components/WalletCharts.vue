<script setup lang="ts">
import type { IWalletItemWithCategory } from '@/models/wallet-item';
import type { ICategory } from '@/models/wallet-category';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from 'chart.js';
import { Doughnut, Line } from 'vue-chartjs';
import { computed } from 'vue';
import { format } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const props = defineProps<{
    items: IWalletItemWithCategory[];
    categories: Map<number, ICategory>;
}>();

const doughnutData = computed(() => {
    const data = props.items.reduce((acc, cur) => {
        const price = acc.get(cur.categoryId);
        if (price) {
            acc.set(cur.categoryId, price + cur.price);
        } else {
            acc.set(cur.categoryId, cur.price);
        }
        return acc;
    }, new Map<number, number>());

    return {
        labels: [...data].map(([key]) => props.categories.get(key)?.title),
        datasets: [
            {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#f87979'],
                data: [...data].map(([_, value]) => value),
            },
        ],
    };
});

const lineData = computed(() => {
    const data = props.items.reduce((acc, cur) => {
        const date = format(cur.date, 'LLLL yyyy');
        const price = acc.get(date);
        if (price) {
            acc.set(date, price + cur.price);
        } else {
            acc.set(date, cur.price);
        }
        return acc;
    }, new Map<string, number>());

    return {
        labels: [...data].map(([key]) => key),
        datasets: [
            {
                label: 'Monthly expenses',
                backgroundColor: ['#f87979'],
                data: [...data].map(([_, value]) => value),
            },
        ],
    };
});
</script>

<template>
    <div class="charts">
        <div>
            <Doughnut :data="doughnutData" />
        </div>
        <div>
            <Line :data="lineData" />
        </div>
    </div>
</template>

<style scoped>
.charts {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);
}
</style>
