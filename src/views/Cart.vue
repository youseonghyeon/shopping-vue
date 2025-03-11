<template>
  <div class="cart-page">
    <HeaderComponent/>
    <div class="content">
      <h2>장바구니</h2>

      <!-- 전체 선택 및 선택 삭제 컨트롤 -->
      <div v-if="cartItems.length > 0" class="select-controls">
        <div class="select-all">
          <input
              id="select-all"
              :checked="allChecked"
              class="item-checkbox"
              type="checkbox"
              @change="toggleSelectAll($event)"
          />
          <label for="select-all">전체 선택</label>
        </div>
        <button
            :disabled="checkedItems.length === 0"
            class="delete-selected"
            @click="deleteSelectedItems"
        >
          <font-awesome-icon icon="trash-alt"/>
          선택 삭제
        </button>
      </div>

      <!-- 장바구니 항목 리스트 -->
      <ul class="cart-items">
        <li
            v-for="(item, index) in cartItems"
            :key="index"
            class="cart-item"
        >
          <!-- 개별 체크박스: 왼쪽 상단으로 위치 -->
          <input v-model="item.checked" class="item-checkbox" type="checkbox"/>

          <!-- 상품 이미지 -->
          <div class="item-image">
            <img
                :src="item.productTitleImage"
                alt="상품 이미지"
                @click="goToProductDetail(item.productId)"
            />
          </div>

          <!-- 상품 정보 -->
          <div class="item-details">
            <span class="item-name" @click="goToProductDetail(item.productId)">
              {{ item.productName }}
            </span>

            <!-- 할인 적용 여부에 따른 가격 표시 -->
            <div class="price-info">
              <template v-if="item.discountRate && item.discountRate > 0">
                <span class="item-original-price">
                  {{ formatCurrency(item.originalPrice * item.quantity) }}
                </span>
                <span class="item-discounted-price">
                  {{ formatCurrency(item.discountedPrice * item.quantity) }}
                </span>
              </template>
              <template v-else>
                <span class="item-original-price">
                  {{ formatCurrency(item.originalPrice * item.quantity) }}
                </span>
              </template>
            </div>

            <!-- 수량 조절 영역 -->
            <div class="item-quantity">
              <label>수량:</label>
              <button class="quantity-btn" @click="decrementQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button class="quantity-btn" @click="incrementQuantity(item)">+</button>
            </div>
          </div>

          <!-- 개별 삭제 버튼 -->
          <button class="delete-item" @click="deleteItem(item)">
            <font-awesome-icon icon="trash-alt"/>
          </button>
        </li>
      </ul>

      <!-- 장바구니가 비어있을 경우 -->
      <p v-if="cartItems.length === 0">장바구니가 비어 있습니다.</p>

      <!-- 요약 영역 -->
      <div v-if="cartItems.length > 0" class="cart-summary">
        <div class="summary-row">
          <span>총 상품가격</span>
          <span>{{ formatCurrency(totalProductPrice) }}</span>
        </div>
        <div class="summary-row">
          <span>총 배송비</span>
          <span>{{ formatCurrency(shippingFee) }}</span>
        </div>
        <div class="summary-row total">
          <span>총 결제 예상 금액</span>
          <span>{{ formatCurrency(totalPayment) }}</span>
        </div>
        <button class="purchase-button" @click="purchaseItems">구매하기</button>
      </div>
    </div>
    <BottomNav/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'
import {getRequest, postRequest} from "@/api/http.js"
import eventBus from "@/utils/eventBus.js";

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
  computed: {
    // 선택된 항목들
    checkedItems() {
      return this.cartItems.filter(item => item.checked);
    },
    // 전체 선택 여부
    allChecked() {
      return this.cartItems.length > 0 && this.cartItems.every(item => item.checked);
    },
    // 선택된 항목의 총 상품가격 (할인 적용 시 discountedPrice, 없으면 originalPrice)
    totalProductPrice() {
      return this.checkedItems.reduce((acc, item) => {
        const price = (item.discountRate && item.discountRate > 0)
            ? item.discountedPrice
            : item.originalPrice || 0;
        return acc + price * item.quantity;
      }, 0);
    },
    // 선택된 항목이 있으면 배송비 3,000원, 없으면 0원
    shippingFee() {
      return this.checkedItems.length > 0 ? 3000 : 0;
    },
    totalPayment() {
      return this.totalProductPrice + this.shippingFee;
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.fetchCartItems();
  },
  methods: {
    async fetchCartItems() {
      try {
        let response = await getRequest('/cart');
        // 각 항목의 checked 초기값을 true로 설정해서 자동으로 체크
        this.cartItems = response.data.map(item => ({
          ...item,
          checked: true
        }));
      } catch (e) {
        if (e.status === 403) {
          alert('로그인이 필요합니다.');
          this.$router.push({name: 'Login'});
        } else {
          console.log(e);
        }
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('ko-KR', {maximumFractionDigits: 0}).format(value) + '원';
    },
    goToProductDetail(productId) {
      this.$router.push({name: "ProductDetail", params: {id: productId}});
    },
    toggleSelectAll(event) {
      const checked = event.target.checked;
      this.cartItems.forEach(item => {
        item.checked = checked;
      });
    },
    async deleteSelectedItems() {
      if (this.checkedItems.length === 0) {
        alert("삭제할 항목을 선택해 주세요.");
        return;
      }
      if (confirm("선택한 항목을 삭제하시겠습니까?")) {
        let checkedProductIds = this.cartItems.filter(item => item.checked).map(item => item.productId);
        let response = await postRequest('/cart/delete', {productIds: checkedProductIds});
        eventBus.emit('update-cart-count', 1);
        alert(response.data.message);
        this.cartItems = this.cartItems.filter(item => !item.checked);
      }
    },
    deleteItem(itemToDelete) {
      if (confirm("이 항목을 삭제하시겠습니까?")) {
        this.cartItems = this.cartItems.filter(item => item !== itemToDelete);
      }
    },
    async incrementQuantity(item) {
      const newQuantity = item.quantity + 1;
      try {
        await postRequest('/cart/update', {productId: item.productId, quantity: newQuantity});
        item.quantity = newQuantity;
      } catch (e) {
        console.log(e);
        alert("수량 업데이트에 실패했습니다.");
      }
    },
    async decrementQuantity(item) {
      if (item.quantity <= 1) return;
      const newQuantity = item.quantity - 1;
      try {
        await postRequest('/cart/update', {productId: item.productId, quantity: newQuantity});
        item.quantity = newQuantity;
      } catch (e) {
        console.log(e);
        alert("수량 업데이트에 실패했습니다.");
      }
    },
    purchaseItems() {
      if (this.checkedItems.length === 0) {
        alert("구매할 항목을 선택해 주세요.");
        return;
      }
      alert("선택한 항목으로 구매를 진행합니다.");
      const queryStr = this.checkedItems
          .map(item => `${item.productId}-${item.quantity}`)
          .join(',');
      this.$router.push({name: 'Checkout', query: {items: queryStr}});
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

/* 전체 선택 및 삭제 컨트롤 */
.select-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.select-all {
  display: flex;
  align-items: center;
}

.select-all input[type="checkbox"] {
  /* 체크박스 크기를 키움 */
  width: 24px;
  height: 24px;
  accent-color: #b27d4d;
  margin-right: 8px;
}

.item-checkbox {
  /* 체크박스 크기를 키움 */
  width: 18px;
  height: 18px;
  accent-color: #b27d4d;
  margin-right: 8px;
}

.delete-selected {
  background: none;
  border: none;
  color: #b27d4d;
  font-size: 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.delete-selected:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 장바구니 항목 */
.cart-items {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 15px;
  border: 1px solid #e0e0e0;
  position: relative;
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
  cursor: pointer;
}

.price-info span {
  display: block;
}

.item-original-price {
  color: #999;
  text-decoration: line-through;
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
  display: flex;
  align-items: center;
}

.item-quantity label {
  margin-right: 8px;
}

.quantity-btn {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  color: #333;
  font-size: 1em;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover {
  background-color: #e0e0e0;
}

/* 개별 삭제 버튼 */
.delete-item {
  background: none;
  border: none;
  color: #b27d4d;
  font-size: 1.2em;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

/* 장바구니 요약 영역 */
.cart-summary {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #333;
}

.summary-row.total {
  font-weight: bold;
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
}

.purchase-button {
  display: block;
  width: 100%;
  background-color: #b27d4d;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
}

.purchase-button:hover {
  opacity: 0.9;
}
</style>
