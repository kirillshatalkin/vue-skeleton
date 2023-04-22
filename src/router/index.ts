import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/wallet',
        },
        {
            path: '/wallet',
            name: 'Expenses',
            component: () => import('@/views/WalletView.vue'),
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/',
        },
    ],
});

export default router;
