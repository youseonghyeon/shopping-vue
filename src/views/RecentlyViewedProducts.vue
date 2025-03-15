<template>
  <div class="recently-viewed">
    <!-- 상단 헤더 -->
    <HeaderComponent />
    <!-- 중앙 콘텐츠 영역 -->
    <div class="content">
      <h2>최근 본 상품</h2>
      <section class="product-list">
        <template v-if="products.length === 0">
          <div class="no-results">
            <font-awesome-icon class="no-results-icon" icon="frown" />
            <p>최근 본 상품이 없습니다..</p>
          </div>
        </template>
        <template v-else>
          <!-- OneLIneProductCard를 이용해 한 줄에 하나씩 표시 -->
          <OneLIneProductCard
              v-for="(product, index) in products"
              :key="index"
              :product="product"
          />
        </template>
      </section>
    </div>
    <!-- 하단 네비게이션 -->
    <BottomNav />
  </div>
</template>

<script>
import { getRequest } from "@/api/http.js";
import OneLIneProductCard from "@/components/OneLineProductCard.vue";
import HeaderComponent from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";

export default {
  name: "RecentlyViewed",
  components: { BottomNav, HeaderComponent, OneLIneProductCard },
  data() {
    return {
      recentlyViewed: [],
      products: []
    };
  },
  mounted() {
    this.loadRecentlyViewed();
    this.fetchRecentlyViewedProducts();
  },
  methods: {
    loadRecentlyViewed() {
      const key = "recentlyViewedProducts";
      this.recentlyViewed = JSON.parse(localStorage.getItem(key)) || [];
    },
    async fetchRecentlyViewedProducts() {
      try {
        let response = await getRequest("/products/ids", { productIds: this.recentlyViewed });
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.error("최근 본 상품 불러오기 실패:", error);
      }
    }
  }
};
</script>

<style scoped>
/* 전체 페이지 레이아웃 */
.recently-viewed {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 중앙 콘텐츠 영역: 테두리와 그림자 제거, 넓은 공간 확보 */
.content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  /* 테두리, 그림자, 둥근 모서리 제거 */
}

/* 제목 스타일 */
.content h2 {
  margin-bottom: 15px;
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

/* 상품 리스트 */
.product-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 최근 본 상품이 없을 때 */
.no-results {
  text-align: center;
  padding: 30px 0;
  color: #777;
}

.no-results-icon {
  font-size: 3em;
  margin-bottom: 10px;
  color: #ccc;
}
</style>
