import { createRouter, createWebHistory } from 'vue-router'

//注册路由
const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue'),
    },
    {
        path: '/introduce',
        name: 'introduce',
        component: () => import('../views/introduce.vue'),
    },
    {
        path: '/mine',
        name: 'mine',
        component: () => import('../views/mine.vue'),
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('../views/list.vue'),
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('../views/detail.vue'),
    }
];
const router = createRouter({
    // createWebHashHistory()是使用hash模式路由
    // createWebHistory()是使用history模式路由
    history: createWebHistory(),
    routes
});

export default router;
