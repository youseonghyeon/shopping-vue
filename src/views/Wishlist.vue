<template>
  <div class="container">
    <HeaderComponent title="찜 목록" />
    <section class="wishlist">
      <template v-if="products.length === 0">
        <div class="no-results">
          <font-awesome-icon class="no-results-icon" icon="frown" />
          <p>찜한 상품이 없습니다.</p>
        </div>
      </template>
      <template v-else>
        <!-- 찜한 상품들을 ProductCard 컴포넌트를 이용해 표시 -->
        <OneLineProductCard
            v-for="item in products"
            :key="item.id"
            :product="item"
        />
      </template>
    </section>
    <BottomNav />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue';
import BottomNav from '@/components/BottomNav.vue';
import OneLineProductCard from '@/components/OneLineProductCard.vue';
import { getRequest } from '@/api/http.js';

export default {
  name: 'WishlistPage',
  components: {
    HeaderComponent,
    BottomNav,
    OneLineProductCard
  },
  data() {
    return {
      products: []
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  created() {
    this.fetchWishlist();
  },
  methods: {
    async fetchWishlist() {
      try {
        // 백엔드에서 찜한 상품 목록을 불러오는 API 호출
        const response = await getRequest('/wishlist');
        this.products = response.data.products;
      } catch (error) {
        console.error("찜 목록 불러오기 실패:", error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 60px; /* 하단 네비게이션 공간 고려 */
  background-color: #f5f5f5;
  min-height: 100vh;
}

.wishlist {
  padding: 20px;
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #666;
}

.no-results-icon {
  font-size: 3em;
  color: #ccc;
  margin-bottom: 10px;
}
</style>
