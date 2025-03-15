<template>
  <div class="order-item">
    <div class="item-info">
      <p><strong>상품 ID:</strong> {{ orderItem.productResponse.id }}</p>
      <p><strong>상품명:</strong> {{ orderItem.productResponse.name }}</p>
      <p><strong>수량:</strong> {{ orderItem.quantity }}</p>
    </div>
    <div class="price-info">
      <p><strong>단가:</strong> {{ formatCurrency(orderItem.unitPrice) }}</p>
      <p v-if="orderItem.discountRate && orderItem.discountRate > 0">
        <strong>할인율:</strong> {{ (orderItem.discountRate * 100).toFixed(0) }}%
      </p>
      <p v-if="orderItem.discountRate && orderItem.discountRate > 0">
        <strong>할인가:</strong> {{ formatCurrency(orderItem.discountedPrice) }}
      </p>
      <p><strong>총 가격:</strong> {{ formatCurrency(orderItem.totalPrice) }}</p>
    </div>
    <div class="review-btn">
      <button @click="writeReview">리뷰 작성하기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderItemComponent',
  props: {
    orderItem: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatCurrency(value) {
      const number = Number(value);
      return number.toLocaleString() + '원';
    },
    writeReview() {
      // 제품 ID를 파라미터로 전달하면서 리뷰 작성 페이지로 이동
      this.$router.push({ name: 'ReviewWrite', query: { productId: this.orderItem.productResponse.id } });
    }
  }
}
</script>

<style scoped>
.order-item {
  display: flex;
  justify-content: space-between;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fafafa;
}

.item-info, .price-info {
  flex: 1;
}

.item-info p, .price-info p {
  margin: 4px 0;
  font-size: 0.95em;
  color: #555;
}

.review-btn {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.review-btn button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.review-btn button:hover {
  background-color: #0056b3;
}
</style>
