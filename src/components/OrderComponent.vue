<template>
  <div class="order-component">
    <div class="order-header">
      <h3>주문 번호: {{ order.orderNumber }}</h3>
      <div class="header-info">
        <span class="status">{{ order.orderStatus }}</span>
        <span class="date">{{ formatDate(order.createdAt) }}</span>
      </div>
    </div>
    <div class="order-details">
      <p><strong>수령인:</strong> {{ order.recipientName }}</p>
      <p><strong>배송 주소:</strong> {{ order.address }}</p>
      <p><strong>연락처:</strong> {{ order.phone }}</p>
      <p><strong>결제 수단:</strong> {{ order.paymentMethod }}</p>
      <div class="price-summary">
        <p><strong>총 상품가격:</strong> {{ formatCurrency(order.totalProductPrice) }}</p>
        <p><strong>배송비:</strong> {{ formatCurrency(order.shippingFee) }}</p>
        <p><strong>총 할인 금액:</strong> {{ formatCurrency(order.discountSum) }}</p>
        <p class="final-payment"><strong>최종 결제 금액:</strong> {{ formatCurrency(order.finalPayment) }}</p>
      </div>
    </div>
    <div class="order-items">
      <h4>주문 상품</h4>
      <OrderItemComponent
          v-for="item in order.orderItems"
          :key="item.id"
          :orderItem="item"
      />
    </div>
  </div>
</template>

<script>
import OrderItemComponent from '@/components/OrderItemComponent.vue'

export default {
  name: 'OrderComponent',
  components: {OrderItemComponent},
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatCurrency(value) {
      const number = Number(value);
      return number.toLocaleString() + '원';
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    }
  }
}
</script>

<style scoped>
.order-component {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 25px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.order-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.order-header h3 {
  margin: 0;
  font-size: 1.4em;
  color: #333;
}

.header-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: #666;
  margin-top: 5px;
}

.order-details p {
  margin: 5px 0;
  font-size: 1em;
  color: #444;
}

.price-summary p {
  margin: 3px 0;
}

.final-payment {
  font-size: 1.1em;
  font-weight: bold;
  color: #b27d4d;
  margin-top: 10px;
}

.order-items h4 {
  margin: 0 0 10px 0;
  font-size: 1.1em;
  color: #555;
}
</style>
