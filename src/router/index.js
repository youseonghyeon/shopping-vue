import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/category',
        name: 'CategoryList',
        component: () => import('@/views/CategoryList.vue')
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/Search.vue')
    },
    {
        path: '/mypage',
        name: 'MyPage',
        component: () => import('@/views/MyPage.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/Cart.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: () => import('@/views/ProductDetail.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/views/Signup.vue')
    },
    {
        path: '/find-credentials',
        name: 'FindCredentials',
        component: () => import('@/views/FindCredentials.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
