<template>
  <div class="product-detail-page">
    <HeaderComponent title="상품 상세" />
    <div class="detail-content">
      <!-- 제품 정보 카드 -->
      <div class="product-card">
        <div style="color: #959595">== 카테고리 위치 ==</div>
        <div class="image-wrapper">
          <img :src="product.titleImage" alt="상품 메인 이미지" class="title-image" />
        </div>
        <div class="product-info">
          <h2 class="product-name">{{ product.name }}</h2>
          <!-- 가격/할인 정보 -->
          <div class="pricing">
            <template v-if="hasDiscount">
              <div class="discount-price">
                <span class="final-price">{{ formatPrice(product.discountedPrice) }}</span>
                <span class="original-price">
                  <del>{{ formatPrice(product.price) }}</del>
                </span>
                <span class="discount-badge">{{ discountPercent }}% 할인</span>
              </div>
            </template>
            <template v-else>
              <span class="final-price">{{ formatPrice(product.price) }}</span>
            </template>
          </div>

          <!-- 수량 및 장바구니/찜하기 -->
          <div class="action-section">
            <div class="quantity-selector">
              <button @click="decrementQuantity">-</button>
              <input v-model.number="quantity" min="1" type="number" />
              <button @click="incrementQuantity">+</button>
            </div>
            <div class="buttons">
              <button class="add-to-cart-btn" @click="addToCart">
                장바구니
              </button>
              <!-- 토글 버튼에 동적으로 "selected" 클래스를 적용 -->
              <button :class="['wishlist-btn', { selected: isWished }]" @click="toggleWishlist">
                <font-awesome-icon :icon="isWished ? 'heart' : ['far', 'heart']" />
                {{ isWished ? '찜 취소' : '찜하기' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 상세 설명 섹션 -->
      <div class="product-description">
        <h3>상품정보</h3>
        <img v-if="product.detailImage" :src="product.detailImage" alt="상세 이미지" class="detail-image" />
        <p v-else>{{ product.description }}</p>
      </div>

      <!-- 리뷰 섹션 -->
      <div v-if="reviews.length" class="reviews">
        <h3>리뷰 ({{ reviews.length }})</h3>
        <div v-for="(review, index) in reviews" :key="index" class="review-item">
          <div class="star-rating">
            <font-awesome-icon
                v-for="n in 5"
                :key="n"
                :icon="n <= review.rating ? 'star' : ['far', 'star']"
            />
          </div>
          <p class="review-text">{{ review.text }}</p>
        </div>
      </div>
    </div>
    <BottomNav />
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getRequest, postRequest } from "@/api/http.js";
import eventBus from "@/utils/eventBus.js";

export default {
  name: "ProductDetail",
  components: { HeaderComponent, BottomNav, FontAwesomeIcon },
  data() {
    return {
      product: {},
      quantity: 1,
      reviews: [],
      isWished: false // 찜 여부
    };
  },
  computed: {
    hasDiscount() {
      return this.product.discountRate && this.product.discountRate > 0;
    },
    discountPercent() {
      return this.hasDiscount ? (this.product.discountRate * 100).toFixed(0) : 0;
    }
  },
  created() {
    window.scrollTo(0, 0);
    this.fetchProduct();
    this.fetchWishlistInProduct();
    this.fetchReviews(); // 실제 구현 시 리뷰 API 연동
    // 임시 샘플 리뷰:
    this.reviews = [
      { rating: 5, text: "좋아요!" },
      { rating: 4, text: "만족스러워요." },
      { rating: 3, text: "보통입니다." }
    ];
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id;
      try {
        const response = await getRequest("/products/" + productId);
        this.product = response.data;
        this.product.detailImage = 'https://thumbnail7.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2024/11/08/13/6/063e3f93-7b4d-4b13-9079-24b95eecdfaa.jpg';
      } catch (error) {
        console.error("상품 정보를 불러오지 못했습니다:", error);
      }
    },
    async fetchWishlistInProduct() {
      try {
        let response = await getRequest('/wishlist/exist', {productId: this.$route.params.id});
        this.isWished = response.data.exist;
      } catch (error) {
        console.log('찜 여부 확인에 실패했습니다:', error);
      }

    },
    async fetchReviews() {
      const productId = this.$route.params.id;
      try {
        // 실제 리뷰 API 호출 (주석 처리된 예시)
        // const response = await getRequest(`/products/${productId}/reviews`);
        // this.reviews = response.data;
      } catch (error) {
        console.error("리뷰 정보를 불러오지 못했습니다:", error);
      }
    },
    incrementQuantity() {
      this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    async addToCart() {
      try {
        const response = await postRequest("/cart/create", {
          productId: this.product.id,
          quantity: this.quantity
        });
        eventBus.emit('update-cart-count', 1);
        alert("장바구니에 담았습니다!");
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          alert("로그인이 필요합니다.");
          this.$router.push("/login");
        } else {
          alert("장바구니 담기에 실패했습니다.");
        }
      }
    },
    async toggleWishlist() {
      try {
        let requestUrl = this.isWished ? '/wishlist/delete' : '/wishlist/create';
        let response = await postRequest(requestUrl, { productId: this.product.id });
        if (response.data.success) {
          this.isWished = !this.isWished;
          alert(this.isWished ? "찜 목록에 추가되었습니다." : "찜 목록에서 제거되었습니다.");
        }
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          alert('로그인이 필요합니다.');
          window.location.href = '/login';
        }
      }
    },
    formatPrice(value) {
      const number = Number(value);
      return number.toLocaleString() + "원";
    }
  }
};
</script>

<style scoped>
.product-detail-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 60px; /* 하단 네비게이션 공간 고려 */
}

.detail-content {
  max-width: 800px;
  margin: 20px auto;
  padding: 0;
}

/* 상품 카드 전체 래퍼 */
.product-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

/* 메인 이미지 래퍼 */
.image-wrapper {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.title-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  border-radius: 6px;
  background-color: #fafafa;
}

/* 상품명, 가격 등 */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
}

.product-name {
  font-size: 1.3em;
  color: #333;
  margin: 0;
}

/* 가격/할인 영역 */
.pricing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.discount-price {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.final-price {
  font-size: 1.3em;
  color: #b27d4d;
  font-weight: bold;
}

.original-price {
  font-size: 0.95em;
  color: #999;
}

.discount-badge {
  background-color: #b27d4d;
  color: #fff;
  font-size: 0.75em;
  padding: 2px 4px;
  border-radius: 2px;
}

/* 수량, 장바구니, 찜하기 영역 */
.action-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 5px;
}

.quantity-selector button {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  color: #333;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-selector input {
  width: 40px;
  text-align: center;
  font-size: 1em;
}

.add-to-cart-btn,
.wishlist-btn {
  border: none;
  width: 150px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.9em;
}

/* 장바구니 버튼 디자인 */
.add-to-cart-btn {
  background-color: #b27d4d;
  color: #fff;
}

.add-to-cart-btn:hover {
  background-color: #9a633d;
}

/* 찜하기 버튼 기본 디자인 */
.wishlist-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ccc;
}

/* 찜하기 버튼 선택된 상태 */
.wishlist-btn.selected {
  background-color: #459cff;
  color: #fff;
  border: 1px solid #007AFF;
}

.wishlist-btn:hover {
  background-color: #d0e8ff;
}

.buttons {
  display: flex;
  gap: 8px;
}

/* 상세 설명 */
.product-description {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.product-description h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.detail-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

/* 리뷰 섹션 */
.reviews {
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.reviews h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.review-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}

.review-item:last-child {
  border-bottom: none;
}

.star-rating {
  color: #b27d4d;
  margin-bottom: 5px;
}

.review-text {
  font-size: 0.9em;
  color: #333;
}
</style>
