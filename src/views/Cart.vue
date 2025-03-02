<template>
  <div class="cart-page">
    <HeaderComponent />
    <div class="content">
      <h2>장바구니</h2>
      <ul class="cart-items">
        <li v-for="(item, index) in cartItems" :key="index">
          <div class="item-info">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">{{ item.price }}</span>
          </div>
        </li>
      </ul>
      <p v-if="cartItems.length === 0">장바구니가 비어 있습니다.</p>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue'

export default {
  name: 'Cart',
  components: {
    HeaderComponent
  },
  data() {
    return {
      cartItems: [
        // 예시 데이터 (필요 시 실제 데이터 바인딩)
        // { name: '상품 1', price: '10,000원' },
        // { name: '상품 2', price: '20,000원' }
      ]
    }
  }
}
</script>

<style scoped>
.cart-page {
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.content {
  padding: 20px;
}

.content h2 {
  font-size: 1.8em;
  margin-bottom: 15px;
  color: #333;
}

.cart-items {
  list-style: none;
  padding: 0;
}

.cart-items li {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  margin-bottom: 10px;
  border-radius: 4px;
}

.item-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.item-name {
  font-size: 1.1em;
  color: #333;
}

.item-price {
  font-size: 1.1em;
  color: #b27d4d;
  font-weight: bold;
}
</style>
