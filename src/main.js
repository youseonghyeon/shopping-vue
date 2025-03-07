import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faHome, faSearch, faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import '@/assets/styles.css'
import VueCookies  from "vue-cookies";

library.add(faSearch, faHome, faUser, faShoppingCart)

createApp(App)
    .use(router)
    .use(VueCookies)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
