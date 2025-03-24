import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/release-note',
        name: 'ReleaseNote',
        component: () => import('@/views/ReleaseNote.vue')
    },
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
    },
    {
        path: '/order-list',
        name: 'OrderList',
        component: () => import('@/views/OrderList.vue')
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('@/views/Checkout.vue')
    },
    {
        path: '/order-confirmation/:orderId',
        name: 'OrderConfirmation',
        component: () => import('@/views/OrderConfirmation.vue')
    },
    {
        path: '/wishlist',
        name: 'Wishlist',
        component: () => import('@/views/Wishlist.vue')
    },
    {
        path: '/review-write',
        name: 'ReviewWrite',
        component: () => import('@/views/ReviewWrite.vue')
    },
    {
        path: '/recently-viewed-products',
        name: 'RecentlyViewedProducts',
        component: () => import('@/views/RecentlyViewedProducts.vue')
    },
    {
        path: '/event',
        name: 'Event',
        component: () => import('@/views/Event.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
