<template>
  <div class="order-list-page">
    <HeaderComponent title="주문 목록"/>
    <!-- (원하는 경우 Banner를 추가할 수 있음) -->
    <div class="content">
      <div v-if="orders.length === 0" class="no-orders">
        <p>주문 내역이 없습니다.</p>
      </div>
      <div v-else>
        <OrderComponent
            v-for="(order, index) in orders"
            :key="order.id"
            :order="order"
        />
      </div>
      <!-- 무한 스크롤 트리거 엘리먼트 -->
      <div ref="infiniteScrollTrigger" class="infinite-scroll-trigger"></div>
    </div>
    <BottomNav/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'
import OrderComponent from '@/components/OrderComponent.vue'
import {getRequest} from '@/api/http.js'

export default {
  name: 'OrderListPage',
  components: {
    HeaderComponent,
    BottomNav,
    OrderComponent
  },
  data() {
    return {
      orders: [],
      page: 0,
      totalPages: 1,
      isLoading: false
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchOrders(0);
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
    async fetchOrders(page = 0) {
      if (this.isLoading) return;
      this.isLoading = true;
      const params = {page, size: 10};

      const response = await getRequest("/order", params);

      this.orders = page === 0 ? response.data.content : this.orders.concat(response.data.content);
      this.page = response.data.page.number;
      this.totalPages = response.data.page.totalPages;
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
            this.fetchOrders(this.page + 1);
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
.order-list-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 60px; /* BottomNav 높이 고려 */
}

.content {
  max-width: 900px;
  margin: 20px auto;
  padding: 0 20px;
}

.no-orders {
  text-align: center;
  color: #888;
  padding: 40px 0;
  font-size: 1.2em;
}

/* 무한 스크롤 트리거 엘리먼트 (화면에 보이지 않게) */
.infinite-scroll-trigger {
  height: 1px;
}
</style>
