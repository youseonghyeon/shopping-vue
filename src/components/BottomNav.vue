<template>
  <nav class="bottom-nav">
    <ul>
      <li>
        <router-link to="/">
          <font-awesome-icon class="icon" icon="home" />
          <span class="label">홈</span>
        </router-link>
      </li>
      <li>
        <router-link to="/search">
          <font-awesome-icon class="icon" icon="search" />
          <span class="label">검색</span>
        </router-link>
      </li>
      <li>
        <router-link to="/mypage">
          <font-awesome-icon class="icon" icon="user" />
          <span class="label">마이룸</span>
        </router-link>
      </li>
      <li class="cart">
        <router-link to="/cart">
          <font-awesome-icon class="icon" icon="shopping-cart" />
          <span class="label">장바구니</span>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { getRequest } from '@/api/http.js';
import eventBus from '@/utils/eventBus.js';

export default {
  name: 'BottomNav',
  setup() {
    const cartCount = ref(0);

    const fetchCartCount = async (newCount) => {
      try {
        const response = await getRequest("/cart/count"); // 백엔드 API에서 장바구니 개수 가져오기
        cartCount.value = response.data || 0;
      } catch (error) {
        console.error("장바구니 개수 불러오기 실패:", error);
        cartCount.value = 0;
      }
    };

    onMounted(async () => {
      await fetchCartCount();
      eventBus.on('update-cart-count', fetchCartCount);
    });

    onUnmounted(() => {
      eventBus.off('update-cart-count', fetchCartCount);
    });

    return { cartCount };
  }
};
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  border-top: 1px solid #e0e0e0;
  z-index: 1000;
}

.bottom-nav ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  margin: 0;
  list-style: none;
}

.bottom-nav li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333333;
  font-size: 0.9em;
  position: relative;
}

.bottom-nav .icon {
  font-size: 1.4em;
  color: #8a8a8a;
}

.bottom-nav li a:hover .icon {
  color: #5a5a5a;
}

.bottom-nav .label {
  margin-top: 3px;
}

/* 장바구니 숫자 표시 */
.cart-badge {
  position: absolute;
  top: -3px;
  right: -7px;
  background-color: #007AFF; /* 부드러운 파란색 */
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 10px;
  padding: 2px 6px;
  min-width: 18px;
  text-align: center;
}
</style>
