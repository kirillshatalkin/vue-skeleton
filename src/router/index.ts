import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/smth',
        },
        {
            path: '/smth',
            name: 'Smth',
            component: () => import('@/views/SmthView.vue'),
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/',
        },
    ],
});

export default router;
