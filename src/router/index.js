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
        component: Login
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
