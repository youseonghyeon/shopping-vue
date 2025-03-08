<template>
  <div class="checkout-page">
    <HeaderComponent title="주문 확인" />
    <div class="content">
      <h2>주문 상품 목록</h2>
      <!-- 주문 상품 목록 -->
      <div class="order-items">
        <div
            v-for="(item, index) in detailedItems"
            :key="index"
            class="order-item"
        >
          <img :src="item.titleImage" alt="상품 이미지" />
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p>수량: {{ item.quantity }}</p>
            <p>가격: {{ formatCurrency(item.price * item.quantity) }}</p>
          </div>
        </div>
      </div>

      <!-- 주문 요약 -->
      <div class="order-summary">
        <div class="summary-row">
          <span>총 상품가격</span>
          <span>{{ formatCurrency(totalProductPrice) }}</span>
        </div>
        <div class="summary-row">
          <span>총 배송비</span>
          <span>{{ formatCurrency(shippingFee) }}</span>
        </div>
        <!-- 새로 추가: 총 할인 금액 -->
        <div class="summary-row discount">
          <span>총 할인 금액</span>
          <!-- 할인 금액에 - 표시를 붙여 표시 -->
          <span>-{{ formatCurrency(discountSum) }}</span>
        </div>
        <div class="summary-row total">
          <span>총 결제 예상 금액</span>
          <span>{{ formatCurrency(totalPayment) }}</span>
        </div>
      </div>

      <!-- 배송 정보 입력 폼 -->
      <div class="shipping-info">
        <h2>배송 정보 입력</h2>
        <form @submit.prevent="submitOrder">
          <div class="form-group">
            <label for="recipientName">수령인</label>
            <input
                id="recipientName"
                v-model="shippingInfo.recipientName"
                required
            />
          </div>
          <div class="form-group">
            <label for="address">주소</label>
            <input id="address" v-model="shippingInfo.address" required />
          </div>
          <div class="form-group">
            <label for="phone">연락처</label>
            <input id="phone" v-model="shippingInfo.phone" required />
          </div>
          <button type="submit" class="submit-button">주문 완료</button>
        </form>
      </div>
    </div>
    <BottomNav />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'
import { getRequest, postRequest } from '@/api/http.js'

export default {
  name: 'Checkout',
  components: { HeaderComponent, BottomNav },
  data() {
    return {
      // 전달받은 선택된 항목
      selectedItems: [],
      // 상품 상세 정보 + 할인 가격 등
      detailedItems: [],
      // 계산용
      originalTotalPrice: 0, // 할인 전 총합
      totalProductPrice: 0,  // 할인 후 총합
      discountSum: 0,        // 총 할인 금액
      shippingFee: 0,
      totalPayment: 0,
      // 배송 정보
      shippingInfo: {
        recipientName: '',
        address: '',
        phone: ''
      }
    }
  },
  created() {
    this.loadSelectedItems();
  },
  methods: {
    loadSelectedItems() {
      const itemsQuery = this.$route.query.items;
      if (itemsQuery) {
        const selectedItems = itemsQuery.split(',').map(pair => {
          const [id, quantity] = pair.split('-');
          return { productId: Number(id), quantity: Number(quantity) };
        });
        this.selectedItems = selectedItems;
        this.fetchProductDetails();
      } else {
        alert("구매할 항목이 없습니다.");
        this.$router.back();
      }
    },
    async fetchProductDetails() {
      try {
        const productIds = this.selectedItems.map(item => item.productId);
        const response = await getRequest('/products/details', {
          productIds: productIds,
        });
        // 샘플 할인율 (10% 할인)
        const discountRate = 0.9;
        this.detailedItems = response.data.map(product => {
          const selected = this.selectedItems.find(
              item => item.productId === product.id
          );
          const price = Number(product.price);
          const discountedPrice = price * discountRate;
          return {
            ...product,
            quantity: selected ? selected.quantity : 0,
            discountedPrice
          };
        });
        this.calculateTotals();
      } catch (error) {
        console.error("상품 상세 정보 불러오기 실패:", error);
      }
    },
    calculateTotals() {
      // 원래 가격(할인 전) 총합
      this.originalTotalPrice = this.detailedItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);

      // 할인된 가격 총합
      this.totalProductPrice = this.detailedItems.reduce((sum, item) => {
        return sum + (item.discountedPrice * item.quantity);
      }, 0);

      // 총 할인 금액 (원래 총합 - 할인 후 총합)
      this.discountSum = this.originalTotalPrice - this.totalProductPrice;

      // 배송비
      this.shippingFee = this.detailedItems.length > 0 ? 3000 : 0;

      // 총 결제 금액 (이미 할인된 가격 + 배송비)
      this.totalPayment = this.totalProductPrice + this.shippingFee;
    },
    formatCurrency(value) {
      return Number(value).toLocaleString() + '원';
    },
    async submitOrder() {
      try {
        const orderData = {
          shippingInfo: this.shippingInfo,
          items: this.detailedItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.discountedPrice || item.price,
          })),
          totalPayment: this.totalPayment,
        };
        const response = await postRequest('/order/submit', orderData);
        alert('주문이 완료되었습니다!');
        this.$router.push({
          name: 'OrderConfirmation',
          params: { orderId: response.data.orderId },
        });
      } catch (error) {
        console.error('주문 제출 실패:', error);
        alert('주문 제출에 실패했습니다. 다시 시도해 주세요.');
      }
    },
  }
}
</script>

<style scoped>
.checkout-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 60px; /* 하단 네비게이션 높이 고려 */
}

/* 메인 박스(카드) 스타일 */
.content {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px; /* 모서리를 조금 둥글게 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 가벼운 그림자 */
}

/* 섹션 제목 스타일 */
.content h2 {
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #333;
  padding-bottom: 5px;
  border-bottom: 2px solid #b27d4d; /* 포인트 색상으로 구분선 */
}

/* 주문 상품 목록 */
.order-items {
  margin-bottom: 20px;
}
.order-item {
  display: flex;
  align-items: center;
  border-bottom: 1px dashed #ddd; /* 점선으로 구분 */
  padding: 15px 0;
}
.order-item:last-child {
  border-bottom: none; /* 마지막 아이템은 구분선 제거 */
}
.order-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}
.item-info {
  flex: 1;
}
.item-info h3 {
  margin: 0 0 5px 0;
  font-size: 1em;
  color: #333;
  font-weight: bold;
}
.item-info p {
  margin: 3px 0;
  font-size: 0.9em;
  color: #666;
}

/* 주문 요약 */
.order-summary {
  margin: 20px 0;
  background-color: #fafafa;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #eee;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.95em;
  color: #333;
}
.summary-row.discount {
  color: #b27d4d; /* 할인 금액 강조 색상 */
}
.summary-row.total {
  font-weight: bold;
  font-size: 1.05em;
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
}

/* 배송 정보 입력 */
.shipping-info {
  margin: 20px 0;
}
.shipping-info h2 {
  font-size: 1.1em;
  margin-bottom: 10px;
  color: #333;
  border-bottom: 2px solid #b27d4d;
  padding-bottom: 5px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 0.9em;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* 버튼 스타일 */
.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #b27d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}
.submit-button:hover {
  background-color: #9a633d;
}
</style>
