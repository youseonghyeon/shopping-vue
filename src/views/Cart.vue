<template>
  <div class="cart-page">
    <HeaderComponent/>
    <div class="content">
      <h2>장바구니</h2>
      <!-- 장바구니 항목 리스트 -->
      <ul class="cart-items">
        <li
            v-for="(item, index) in cartItems"
            :key="index"
            class="cart-item"
        >
          <!-- 상품 이미지 -->
          <div class="item-image">
            <!-- 실제로는 item.imageUrl 등을 사용 -->
            <img
                :src="item.productTitleImage"
                alt="상품 이미지"
                @click="goToProductDetail(item.productId)"
            />
          </div>
          <!-- 상품 정보 -->
          <div class="item-details">
            <!-- 상품명 (예시로 productId를 이용해 표시) -->
            <span class="item-name" @click="goToProductDetail(item.productId)">
              {{ item.productName }}
            </span>

            <!-- 원가격 (취소선) -->
            <span class="item-original-price" v-if="item.originalPrice">
              {{ formatCurrency(item.originalPrice) }}
            </span>

            <!-- 할인율 (예: 20% )-->
            <span class="item-discount-rate" v-if="item.discountRate">
              ({{ (item.discountRate * 100).toFixed(1) }}% 할인)
            </span>

            <!-- 할인된 가격 -->
            <span class="item-discounted-price" v-if="item.discountedPrice">
              {{ formatCurrency(item.discountedPrice) }}
            </span>

            <!-- 수량 표시 -->
            <div class="item-quantity">
              <label>수량:</label>
              <span>{{ item.quantity }}</span>
            </div>
          </div>
        </li>
      </ul>

      <!-- 장바구니가 비어있을 경우 메시지 표시 -->
      <p v-if="cartItems.length === 0">장바구니가 비어 있습니다.</p>
    </div>
    <BottomNav/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'
import {getRequest} from "@/api/http.js";

export default {
  name: 'Cart',
  components: {
    HeaderComponent,
    BottomNav
  },
  data() {
    return {
      cartItems: [] // 장바구니 항목 리스트
    }
  },
  mounted() {
    // 페이지가 로드되면 장바구니 데이터 호출
    this.fetchCartItems()
  },
  methods: {
    // 장바구니 데이터 불러오기
    async fetchCartItems() {
      try {
        let response = await getRequest('/cart');
        this.cartItems = response.data;
      } catch (e) {
        if (e.status === 403) {
          alert('로그인이 필요합니다.');
          this.$router.push({name: 'Login'});
        } else {
          console.log(e)
        }
      }
    },
    // 통화 형식으로 포맷 (원화 기준)
    formatCurrency(value) {
      if (!value) return ''
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW'
      }).format(value)
    },
    goToProductDetail(productId) {
      this.$router.push({name: "ProductDetail", params: {id: productId}});
    },
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

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 15px;
  border: 1px solid #e0e0e0;
}

.item-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
}

.item-details {
  flex: 1;
}

.item-name {
  display: block;
  font-size: 1.1em;
  color: #333;
  margin-bottom: 5px;
}

.item-original-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 8px;
}

.item-discount-rate {
  color: #b27d4d;
  font-weight: bold;
  margin-right: 8px;
}

.item-discounted-price {
  font-size: 1.2em;
  color: #b27d4d;
  font-weight: bold;
}

.item-quantity {
  margin-top: 10px;
  color: #666;
}
</style>
