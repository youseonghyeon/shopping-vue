<template>
  <div class="container">
    <HeaderComponent />
    <Banner />

    <!-- 가격 정렬 버튼 영역 -->
    <div class="sort-buttons">
      <button
          @click="changeSort('asc')"
          :class="{ active: sortOrder === 'asc' }">
        Price Ascending
      </button>
      <button
          @click="changeSort('desc')"
          :class="{ active: sortOrder === 'desc' }">
        Price Descending
      </button>
    </div>

    <section class="product-list">
      <ProductCard
          v-for="(product, index) in products"
          :key="index"
          :product="product"
      />
    </section>
    <!-- 무한 스크롤 트리거 엘리먼트 -->
    <div ref="infiniteScrollTrigger"></div>
    <BottomNav />
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue'
import Banner from '../components/Banner.vue'
import ProductCard from '../components/ProductCard.vue'
import BottomNav from '../components/BottomNav.vue'
import { getRequest } from "@/api/http.js";

export default {
  name: 'Home',
  components: {
    HeaderComponent,
    Banner,
    ProductCard,
    BottomNav
  },
  data() {
    return {
      products: [],
      page: 0,
      totalPages: 1,
      isLoading: false,
      sortOrder: 'asc', // 기본 정렬: 오름차순
      scrollThreshold: 300 // 필요에 따라 사용 (Intersection Observer에서는 미사용)
    }
  },
  mounted() {
    this.fetchProducts(0);
    this.initIntersectionObserver();
  },
  beforeDestroy() {
    // Intersection Observer 해제 (Vue 2: beforeDestroy, Vue 3: unmounted)
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    async fetchProducts(page = 0) {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        // API 요청 시 sort 파라미터 추가 (예: sort=price,asc 또는 sort=price,desc)
        const response = await getRequest("/products", { page: page, size: 10, sort: `price,${this.sortOrder}` });
        const data = response.data;
        // 첫 페이지이면 데이터를 초기화, 그렇지 않으면 기존 데이터에 추가
        this.products = page === 0 ? data.content : this.products.concat(data.content);
        this.page = data.number;
        this.totalPages = data.totalPages;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.isLoading = false;
      }
    },
    changeSort(order) {
      if (this.sortOrder === order) return;
      this.sortOrder = order;
      // 정렬 변경 시 기존 데이터 초기화 후 첫 페이지부터 다시 불러옴
      this.page = 0;
      this.totalPages = 1;
      this.products = [];
      this.fetchProducts(0);
    },
    initIntersectionObserver() {
      const options = {
        root: null, // 브라우저 뷰포트를 기준으로
        rootMargin: '0px',
        threshold: 0.1 // 10% 보일 때 trigger
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && this.page < this.totalPages - 1 && !this.isLoading) {
            this.fetchProducts(this.page + 1);
          }
        });
      }, options);

      if (this.$refs.infiniteScrollTrigger) {
        this.observer.observe(this.$refs.infiniteScrollTrigger);
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  padding-bottom: 60px; /* 하단 고정 네비게이션 높이만큼 여백 추가 */
}

.sort-buttons {
  display: flex;
  justify-content: center;
  margin: 10px 0;
  gap: 10px;
}

.sort-buttons button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}

.sort-buttons button.active {
  border-color: #007bff;
  color: #007bff;
  font-weight: bold;
}

.product-list {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  padding: 10px;
}

/* 무한 스크롤 트리거는 보이지 않게 처리 */
[infinite-scroll-trigger] {
  height: 1px;
}
</style>
