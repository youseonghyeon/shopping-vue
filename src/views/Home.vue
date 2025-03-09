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
    <div ref="infiniteScrollTrigger" class="infinite-scroll-trigger"></div>
    <BottomNav />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import Banner from '@/components/Banner.vue'
import ProductCard from '@/components/ProductCard.vue'
import BottomNav from '@/components/BottomNav.vue'
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
      sortOrder: 'asc'
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchProducts(0);
    // DOM 업데이트 후 observer 초기화
    this.$nextTick(() => {
      this.initIntersectionObserver();
    });
  },
  beforeDestroy() {
    // Intersection Observer 해제
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    async fetchProducts(page = 0) {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const params = { page, size: 10, sort: `price,${this.sortOrder}` };
        const response = await getRequest("/products", params);

        // 첫 페이지면 초기화, 이후 페이지면 기존 목록에 추가
        this.products = page === 0 ? response.data.content : this.products.concat(response.data.content);
        this.page = response.data.page.number;
        this.totalPages = response.data.page.totalPages;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.isLoading = false;
      }
    },
    changeSort(order) {
      if (this.sortOrder === order) return;
      this.sortOrder = order;
      // 정렬 변경 시 데이터 초기화 후 첫 페이지부터 다시 로딩
      this.page = 0;
      this.totalPages = 1;
      this.products = [];
      this.fetchProducts(0);
    },
    initIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && this.page < this.totalPages - 1 && !this.isLoading) {
            this.fetchProducts(this.page + 1);
          }
        });
      }, options);

      const triggerElement = this.$refs.infiniteScrollTrigger;
      if (triggerElement) {
        this.observer.observe(triggerElement);
      } else {
        console.warn("무한 스크롤 트리거 엘리먼트를 찾을 수 없습니다.");
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

/* 무한 스크롤 트리거 엘리먼트 (화면에 보이지 않게) */
.infinite-scroll-trigger {
  height: 1px;
}
</style>
