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
        <!-- 총 할인 금액 -->
        <div class="summary-row discount">
          <span>총 할인 금액</span>
          <span>-{{ formatCurrency(discountSum) }}</span>
        </div>

        <!-- 포인트 사용 영역 -->
        <div class="summary-row points">
          <span>포인트 사용</span>
          <div class="points-input">
            <!-- 첫 줄: 입력 & 전액사용 버튼 -->
            <div class="input-row">
              <input
                  type="number"
                  min="0"
                  :max="availablePoints"
                  v-model.number="usedPoints"
              />
              <button type="button" @click="useAllPoints">전액사용</button>
            </div>
            <!-- 둘째 줄: 잔여 포인트 -->
            <div class="remaining-row">
              <span class="remaining-points">
                잔여: {{ formatCurrency(remainingPoints) }}
              </span>
            </div>
          </div>
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

          <!-- 주소 검색 버튼 -->
          <div class="form-group address-search">
            <label>주소 검색</label>
            <button type="button" @click="openAddressSearch">
              우편번호 검색
            </button>
          </div>

          <div class="form-group">
            <input id="address" v-model="shippingInfo.address" required />
          </div>
          <div class="form-group">
            <label for="phone">연락처</label>
            <input id="phone" v-model="shippingInfo.phone" required />
          </div>

          <!-- 배송 요청사항 (Select + 직접 입력) -->
          <div class="form-group">
            <label>배송 요청사항</label>
            <select v-model="selectedDeliveryRequest">
              <option value="문앞에 놓아주세요">문앞에 놓아주세요</option>
              <option value="직접 받을게요">직접 받을게요</option>
              <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
              <option value="기타">직접 입력</option>
            </select>
            <div v-if="selectedDeliveryRequest === '기타'">
              <input
                  type="text"
                  v-model="customDeliveryRequest"
                  placeholder="직접 입력"
              />
            </div>
          </div>

          <!-- 결제 수단 (텍스트 토글 버튼 스타일) -->
          <div class="form-group payment-method">
            <label>결제 수단</label>
            <div class="toggle-group">
              <div
                  class="toggle-option"
                  :class="{ selected: paymentMethod === 'bank' }"
                  @click="paymentMethod = 'bank'"
              >
                계좌이체/무통장 입금
              </div>
              <div
                  class="toggle-option"
                  :class="{ selected: paymentMethod === 'card' }"
                  @click="paymentMethod = 'card'"
              >
                신용/체크카드
              </div>
              <div
                  class="toggle-option"
                  :class="{ selected: paymentMethod === 'mobile' }"
                  @click="paymentMethod = 'mobile'"
              >
                휴대폰 결제
              </div>
            </div>
          </div>

          <!-- (선택) 쿠폰 코드 입력 -->
          <div class="form-group">
            <label for="couponCode">쿠폰 코드 (선택)</label>
            <input id="couponCode" v-model="couponCode" placeholder="쿠폰 코드 입력" />
          </div>

          <!-- 하단 안내 문구 -->
          <div class="order-notice">
            <p>
              회원 본인은 주문 내용을 확인 하였으며,
              구매조건/결제대행 서비스, 개인정보 제3자 제공 및 결제에 동의합니다.
              오픈마켓 상품의 경우, 통신판매중개자로서 상품 등에 대한 책임을 지지 않습니다.
            </p>
            <p>
              해외배송 상품의 경우 고객님의 귀책으로 통관이 지연 또는 불발될 경우
              그 책임을 부담하실 수 있습니다.
            </p>
          </div>

          <!-- 결제하기 버튼 -->
          <button type="submit" class="submit-button">결제하기</button>
        </form>
      </div>
    </div>
    <BottomNav />
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import { getRequest, postRequest } from "@/api/http.js";

export default {
  name: "Checkout",
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
      // 포인트 사용
      availablePoints: 5000, // 예시: 보유 포인트
      usedPoints: 0,
      // 배송 정보
      shippingInfo: {
        recipientName: "",
        address: "",
        phone: ""
      },
      // 배송 요청사항
      selectedDeliveryRequest: "문앞에 놓아주세요",
      customDeliveryRequest: "",
      // 결제 수단
      paymentMethod: "bank", // 기본값
      // (선택) 쿠폰 코드
      couponCode: ""
    };
  },
  computed: {
    // 잔여 포인트
    remainingPoints() {
      const remain = this.availablePoints - this.usedPoints;
      return remain < 0 ? 0 : remain;
    }
  },
  created() {
    this.loadSelectedItems();
  },
  methods: {
    loadSelectedItems() {
      const itemsQuery = this.$route.query.items;
      if (itemsQuery) {
        const selectedItems = itemsQuery.split(",").map((pair) => {
          const [id, quantity] = pair.split("-");
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
        const productIds = this.selectedItems.map((item) => item.productId);
        const response = await getRequest("/products/details", {
          productIds: productIds,
        });
        // 샘플 할인율 (10% 할인)
        this.detailedItems = response.data.map((product) => {
          const selected = this.selectedItems.find(
              (item) => item.productId === product.id
          );
          const price = Number(product.price);
          const discountedPrice = price;
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
        return sum + item.price * item.quantity;
      }, 0);
      // 할인된 가격 총합
      this.totalProductPrice = this.detailedItems.reduce((sum, item) => {
        return sum + item.discountedPrice * item.quantity;
      }, 0);
      // 총 할인 금액 (원래 총합 - 할인 후 총합)
      this.discountSum = this.originalTotalPrice - this.totalProductPrice;
      // 배송비
      this.shippingFee = this.detailedItems.length > 0 ? 3000 : 0;
      // 포인트 사용 로직
      const discountedByPoints = Math.max(this.totalProductPrice - this.usedPoints, 0);
      // 최종 결제 금액 = (할인 후 가격 - 포인트) + 배송비
      this.totalPayment = discountedByPoints + this.shippingFee;
    },
    formatCurrency(value) {
      return Number(value).toLocaleString() + "원";
    },
    useAllPoints() {
      this.usedPoints = this.availablePoints;
      this.calculateTotals();
    },
    openAddressSearch() {
      alert("주소 검색 API를 연동하세요.");
    },
    async submitOrder() {
      try {
        const finalDeliveryRequest =
            this.selectedDeliveryRequest === "기타"
                ? this.customDeliveryRequest
                : this.selectedDeliveryRequest;

        const orderData = {
          shippingInfo: {
            ...this.shippingInfo,
            deliveryRequest: finalDeliveryRequest
          },
          paymentMethod: this.paymentMethod,
          usedPoints: this.usedPoints,
          items: this.detailedItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.discountedPrice || item.price
          })),
          shippingFee: this.shippingFee,
          totalProductPrice: this.totalProductPrice,
          discountSum: this.discountSum,
          totalPayment: this.totalPayment,
          couponCode: this.couponCode
        };

        const response = await postRequest("/order/submit", orderData);
        alert("주문이 완료되었습니다!");
        this.$router.push({
          name: "OrderConfirmation",
          params: { orderId: response.data.orderId }
        });
      } catch (error) {
        console.error("주문 제출 실패:", error);
        alert("주문 제출에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  },
  watch: {
    usedPoints() {
      this.calculateTotals();
    }
  }
};
</script>

<style scoped>
.checkout-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.content {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content h2 {
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #333;
  padding-bottom: 5px;
  border-bottom: 2px solid #b27d4d;
}

.order-items {
  margin-bottom: 20px;
}
.order-item {
  display: flex;
  align-items: center;
  border-bottom: 1px dashed #ddd;
  padding: 15px 0;
}
.order-item:last-child {
  border-bottom: none;
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
  color: #b27d4d;
}
.summary-row.points {
  align-items: flex-start;
}
.points-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.input-row {
  display: flex;
  gap: 6px;
  align-items: center;
}
.input-row input {
  width: 80px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.input-row button {
  padding: 5px 10px;
  border: none;
  background-color: #ccc;
  border-radius: 4px;
  cursor: pointer;
}
.input-row button:hover {
  background-color: #bbb;
}
.remaining-row {
  margin-left: 2px;
  text-align: right;
}
.remaining-points {
  color: #999;
  font-size: 0.85em;
}
.summary-row.total {
  font-weight: bold;
  font-size: 1.05em;
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
}

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
.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.address-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.address-search button {
  padding: 8px 12px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.address-search button:hover {
  background-color: #bbb;
}

/* 결제 수단: 토글 버튼 스타일 */
.payment-method {
  margin-top: 15px;
}
.payment-method .toggle-group {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}
.toggle-option {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 0.95em;
  color: #333;
  text-align: center;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}
.toggle-option.selected {
  border-color: #b27d4d;
  color: #b27d4d;
  font-weight: bold;
  background-color: #fdf8f3;
}
.toggle-option:hover {
  background-color: #f9f9f9;
}

.order-notice {
  background-color: #ffffff;
  padding: 2px;
  margin-top: 15px;
  color: #666;
  font-size: 0.6em;
  line-height: 1.4;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #b27d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 15px;
}
.submit-button:hover {
  background-color: #9a633d;
}
</style>
