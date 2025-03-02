import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CategoryList from '../views/CategoryList.vue'
import Search from '../views/Search.vue'
import MyRoom from '../views/MyRoom.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/category',
        name: 'CategoryList',
        component: CategoryList
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/myroom',
        name: 'MyRoom',
        component: MyRoom
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue') // 위치에 맞게 경로 조정
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: () => import('@/views/ProductDetail.vue') // 위치에 맞게 경로 조정
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
