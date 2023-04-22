import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/list',
        },
        {
            path: '/list',
            name: 'List',
            component: () => import('@/views/ListView.vue'),
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/',
        },
    ],
});

export default router;
