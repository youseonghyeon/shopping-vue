<template>
  <div class="container">
    <!-- 상단 헤더 -->
    <HeaderComponent />

    <!-- 검색 입력 영역 -->
    <div class="search-container">
      <input
          type="text"
          v-model="query"
          placeholder="검색어를 입력하세요"
      />
      <button @click="onSearch">검색</button>
    </div>

    <!-- 가격 정렬 버튼 영역 (검색 결과가 있을 때만) -->
    <div class="sort-buttons" v-if="products.length > 0">
      <button
          @click="changeSort('asc')"
          :class="{ active: sortOrder === 'asc' }"
      >
        Price Ascending
      </button>
      <button
          @click="changeSort('desc')"
          :class="{ active: sortOrder === 'desc' }"
      >
        Price Descending
      </button>
    </div>

    <!-- 상품 리스트: 검색 결과가 없으면 빈 화면 표시 -->
    <section class="product-list">
      <template v-if="searched && products.length === 0">
        <div class="no-results">
          <font-awesome-icon icon="frown" class="no-results-icon" />
          <p>검색 결과가 없습니다. 다른 검색어를 시도해 보세요.</p>
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

    <!-- 무한 스크롤 트리거 (화면에 보이지 않는 1px div) -->
    <div ref="infiniteScrollTrigger" class="infinite-scroll-trigger"></div>

    <!-- 하단 네비게이션 -->
    <BottomNav />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'
import OneLineProductCard from "@/components/OneLineProductCard.vue";
import { getRequest } from '@/api/http.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'SearchPage',
  components: {
    HeaderComponent,
    BottomNav,
    OneLIneProductCard: OneLineProductCard,
    FontAwesomeIcon
  },
  data() {
    return {
      query: '',
      products: [],
      page: 0,
      totalPages: 1,
      isLoading: false,
      sortOrder: 'asc',
      searched: false
    }
  },
  mounted() {
    // 페이지 로드시, 무한 스크롤 초기화
    this.initIntersectionObserver();
  },
  beforeDestroy() {
    // 컴포넌트 사라질 때 옵저버 해제
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    // 검색 결과 API 호출
    async fetchProducts(page = 0) {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const params = {
          q: this.query,                // 검색어
          page,
          size: 10,                     // 페이지 사이즈
          sort: `price,${this.sortOrder}` // 정렬 조건
        };
        const response = await getRequest('/search/products', params);

        // 첫 페이지면 배열 초기화, 이후 페이지면 기존 목록에 추가
        if (page === 0) {
          this.products = response.data.content;
        } else {
          this.products = this.products.concat(response.data.content);
        }

        this.page = response.data.page.number;
        this.totalPages = response.data.page.totalPages;
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        this.isLoading = false;
      }
    },
    // 검색 버튼 클릭 시
    onSearch() {
      this.searched = true;
      // 페이지 정보 초기화 후 검색
      this.page = 0;
      this.totalPages = 1;
      this.products = [];
      this.fetchProducts(0);
    },
    // 가격 정렬 변경 시
    changeSort(order) {
      if (this.sortOrder === order) return; // 이미 선택된 정렬이면 무시
      this.sortOrder = order;
      // 정렬 바꾸면 첫 페이지부터 다시 로딩
      this.page = 0;
      this.totalPages = 1;
      this.products = [];
      this.fetchProducts(0);
    },
    // 무한 스크롤 IntersectionObserver 초기화
    initIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (
              entry.isIntersecting &&
              this.page < this.totalPages - 1 &&
              !this.isLoading
          ) {
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
  margin: 0 auto;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 60px; /* 하단 고정 네비게이션 높이 만큼 여백 */
}

.search-container {
  padding: 20px;
  display: flex;
  gap: 10px;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.search-container input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-container button {
  padding: 10px 15px;
  background-color: #b27d4d;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.search-container button:hover {
  background-color: #9a633d;
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

/* 상품 리스트: 한 줄에 하나씩 표시 */
.product-list {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

/* 무한 스크롤 트리거 (보이지 않게 1px) */
.infinite-scroll-trigger {
  height: 1px;
}

/* 검색 결과가 없을 때의 스타일 */
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
