import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faHome, faSearch, faShoppingCart, faStar as fasStar, faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import '@/assets/styles.css'
import VueCookies from "vue-cookies";
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';

library.add(fasStar, farStar, faSearch, faHome, faUser, faShoppingCart)

createApp(App)
    .use(router)
    .use(VueCookies)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
