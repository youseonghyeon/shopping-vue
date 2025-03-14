<template>
  <div class="container">
    <HeaderComponent/>
    <Banner/>

    <!-- 정렬 옵션 영역 -->
    <div class="sort-options">
      <!-- 가격 정렬 그룹 -->
      <div class="sort-group">
        <button
            :class="{ active: sortCriteria === 'priceAsc' }"
            @click="changeSort('priceAsc')"
        >
          가격 오름차순
        </button>
        <button
            :class="{ active: sortCriteria === 'priceDesc' }"
            @click="changeSort('priceDesc')"
        >
          가격 내림차순
        </button>
      </div>
      <!-- 평점/추천 정렬 그룹 -->
      <div class="sort-group">
        <button
            :class="{ active: sortCriteria === 'rating' }"
            @click="changeSort('rating')"
        >
          평점 순
        </button>
        <button
            :class="{ active: sortCriteria === 'recommended' }"
            @click="changeSort('recommended')"
        >
          추천 순
        </button>
      </div>
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
    <BottomNav/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import Banner from '@/components/Banner.vue'
import ProductCard from '@/components/ProductCard.vue'
import BottomNav from '@/components/BottomNav.vue'
import {getRequest} from "@/api/http.js";

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
      // 기본 정렬은 가격 오름차순
      sortCriteria: 'priceAsc'
    }
  },
  computed: {
    // 선택한 정렬 기준에 따른 쿼리 파라미터 생성
    sortParam() {
      switch (this.sortCriteria) {
        case 'priceAsc':
          return 'price,asc';
        case 'priceDesc':
          return 'price,desc';
        case 'rating':
          return 'rating,desc';
        case 'recommended':
          return 'recommended,desc';
        default:
          return 'price,asc';
      }
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
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    async fetchProducts(page = 0) {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const params = {page, size: 10, sort: this.sortParam, sortType: this.sortCriteria};
        const response = await getRequest("/products", params);
        this.products = page === 0 ? response.data.content : this.products.concat(response.data.content);
        this.page = response.data.page.number;
        this.totalPages = response.data.page.totalPages;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.isLoading = false;
      }
    },
    changeSort(criteria) {
      if (this.sortCriteria === criteria) return;
      this.sortCriteria = criteria;
      // 정렬 변경 시 페이지 정보 초기화 후 첫 페이지부터 다시 로딩
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
  padding-bottom: 60px;
}

/* 정렬 옵션 영역 */
.sort-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
}

.sort-group {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.sort-group button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}

.sort-group button.active {
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

.infinite-scroll-trigger {
  height: 1px;
}
</style>
