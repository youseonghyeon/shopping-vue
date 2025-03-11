<template>
  <div class="order-confirmation-page">
    <HeaderComponent title="주문 확인"/>
    <div class="content">
      <div v-if="order" class="order-summary-card">
        <h2>주문이 완료되었습니다!</h2>
        <div class="order-info">
          <div class="order-info-row">
            <span class="label">주문 번호:</span>
            <span class="value">{{ order.orderNumber }}</span>
          </div>
          <div class="order-info-row">
            <span class="label">수령인:</span>
            <span class="value">{{ order.recipientName }}</span>
          </div>
          <div class="order-info-row">
            <span class="label">배송 주소:</span>
            <span class="value">{{ order.address }}</span>
          </div>
          <div class="order-info-row">
            <span class="label">연락처:</span>
            <span class="value">{{ order.phone }}</span>
          </div>
          <div class="order-info-row">
            <span class="label">배송 요청사항:</span>
            <span class="value">{{ order.deliveryRequest }}</span>
          </div>
          <div class="order-info-row">
            <span class="label">결제 수단:</span>
            <span class="value">{{ paymentMethodDisplay }}</span>
          </div>
          <div class="order-info-row">
            <span class="label">사용 포인트:</span>
            <span class="value">{{ order.usedPoints }}원</span>
          </div>
          <div class="order-info-row">
            <span class="label">상품 금액:</span>
            <span class="value">{{ formatCurrency(order.totalProductPrice) }}</span>
          </div>
          <div class="order-info-row">
            <span class="label">배송비:</span>
            <span class="value">{{ formatCurrency(order.shippingFee) }}</span>
          </div>
          <div class="order-info-row">
            <span class="label">할인 금액:</span>
            <span class="value">-{{ formatCurrency(order.discountSum) }}</span>
          </div>
          <div class="order-info-row total-payment">
            <span class="label">총 결제 금액:</span>
            <span class="value">{{ formatCurrency(order.finalPayment) }}</span>
          </div>
          <div class="order-info-row">
            <span class="label">주문 일시:</span>
            <span class="value">{{ formatDate(order.createdAt) }}</span>
          </div>
        </div>
        <button class="home-button" @click="goToHome">홈으로 이동</button>
      </div>
      <div v-else class="loading">주문 정보를 불러오는 중...</div>
    </div>
    <BottomNav/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'
import {getRequest} from '@/api/http.js'

export default {
  name: 'OrderConfirmation',
  components: {
    HeaderComponent,
    BottomNav
  },
  data() {
    return {
      order: null
    }
  },
  computed: {
    paymentMethodDisplay() {
      if (!this.order) return '';
      // 결제 수단 값에 따라 표시 문자열 변환
      switch (this.order.paymentMethod) {
        case 'bank':
          return '계좌이체/무통장 입금';
        case 'card':
          return '신용/체크카드';
        case 'mobile':
          return '휴대폰 결제';
        default:
          return this.order.paymentMethod;
      }
    }
  },
  created() {
    window.scrollTo(0, 0);
    this.fetchOrder();
  },
  methods: {
    goToHome() {
      this.$router.push({name: 'Home'});
    },
    async fetchOrder() {
      try {
        // 주문 상세 정보를 API를 통해 가져옴
        const response = await getRequest('/order/' + this.$route.params.orderId);
        this.order = response.data;
      } catch (error) {
        console.error("주문 정보를 불러오는데 실패:", error);
      }
    },
    formatCurrency(value) {
      return Number(value).toLocaleString() + '원';
    },
    formatDate(dateStr) {
      // 날짜 형식 변환: 예) 2025-03-09T20:35:50.124986 -> 2025-03-09 20:35
      const date = new Date(dateStr);
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}
</script>

<style scoped>
.order-confirmation-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 60px; /* 하단 네비게이션 고려 */
}

.content {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
}

.order-summary-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-summary-card h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.order-info {
  margin-bottom: 20px;
}

.order-info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed #ddd;
  font-size: 0.95em;
}

.order-info-row:last-child {
  border-bottom: none;
}

.order-info-row .label {
  font-weight: bold;
  color: #555;
}

.order-info-row.total-payment {
  font-size: 1.1em;
  font-weight: bold;
  color: #b27d4d;
}

.home-button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #b27d4d;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s;
}

.home-button:hover {
  background-color: #9a633d;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #666;
  margin-top: 50px;
}
</style>
