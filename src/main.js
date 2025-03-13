import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import VueCookies from "vue-cookies";
import '@/assets/styles.css';

// Font Awesome 설정
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faHeart as farHeart,
    faHome,
    faSearch,
    faShoppingCart,
    faStar as fasStar,
    faUser,
    faFrown as faFrown
} from '@fortawesome/free-solid-svg-icons';

import {faHeart as fasHeart, faStar as farStar, faFrown as farFrown} from '@fortawesome/free-regular-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

// 아이콘들을 라이브러리에 추가
library.add(fasStar, farStar, farHeart, fasHeart, faSearch, faHome, faUser, faShoppingCart, faFrown, farFrown);

createApp(App)
    .use(router)
    .use(VueCookies)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
