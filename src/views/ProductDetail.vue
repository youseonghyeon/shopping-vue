<template>
  <div class="product-detail-page">
    <HeaderComponent title="상품 상세"/>
    <div class="detail-content">
      <!-- 제품 정보 카드 -->
      <div class="product-card">
        <div style="color: #959595">== 카테고리 위치 ==</div>
        <div class="image-wrapper">
          <img :src="product.titleImage" alt="상품 메인 이미지" class="title-image"/>
        </div>
        <div class="product-info">
          <h2 class="product-name">{{ product.name }}</h2>
          <!-- 가격/할인 정보 -->
          <div class="pricing">
            <!-- 할인 있는 경우 -->
            <template v-if="hasDiscount">
              <div class="discount-price">
                <span class="final-price">{{ formatPrice(product.discountedPrice) }}</span>
                <span class="original-price">
                  <del>{{ formatPrice(product.price) }}</del>
                </span>
                <span class="discount-badge">{{ discountPercent }}% 할인</span>
              </div>
            </template>
            <!-- 할인 없는 경우 -->
            <template v-else>
              <span class="final-price">{{ formatPrice(product.price) }}</span>
            </template>
          </div>

          <!-- 수량 및 장바구니/찜하기 -->
          <div class="action-section">
            <div class="quantity-selector">
              <button @click="decrementQuantity">-</button>
              <input v-model.number="quantity" min="1" type="number"/>
              <button @click="incrementQuantity">+</button>
            </div>
            <div class="buttons">
              <button class="add-to-cart-btn" @click="addToCart">
                장바구니
              </button>
              <button class="wishlist-btn" @click="toggleWishlist">
                <font-awesome-icon :icon="isWished ? 'heart' : ['far', 'heart']"/>
                {{ isWished ? '찜 취소' : '찜하기' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 상세 설명 섹션 -->
      <div class="product-description">
        <h3>상품정보</h3>
        <!-- 세로로 긴 이미지가 있을 경우 -->
        <img
            v-if="product.detailImage"
            :src="product.detailImage"
            alt="상세 이미지"
            class="detail-image"
        />
        <!-- 텍스트 설명 -->
        <p v-else>{{ product.description }}</p>
      </div>

      <!-- 리뷰 섹션 -->
      <div v-if="reviews.length" class="reviews">
        <h3>리뷰 ({{ reviews.length }})</h3>
        <div
            v-for="(review, index) in reviews"
            :key="index"
            class="review-item"
        >
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
    <BottomNav/>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {getRequest, postRequest} from "@/api/http.js";

export default {
  name: "ProductDetail",
  components: {HeaderComponent, BottomNav, FontAwesomeIcon},
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
      return this.hasDiscount
          ? (this.product.discountRate * 100).toFixed(0)
          : 0;
    }
  },
  created() {
    window.scrollTo(0, 0);
    this.fetchProduct();
    this.fetchReviews(); // 실제 구현 시 리뷰 API 연동
    // 임시로 샘플 리뷰:
    this.reviews = [
      {rating: 5, text: "좋아요!"},
      {rating: 4, text: "만족스러워요."},
      {rating: 3, text: "보통입니다."}
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
    async fetchReviews() {
      const productId = this.$route.params.id;
      try {
        // 실제 리뷰 API가 있다면 여기서 호출
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
        alert("장바구니에 담았습니다!");
      } catch (error) {
        console.error("장바구니 담기에 실패했습니다:", error);
        alert("장바구니 담기에 실패했습니다.");
      }
    },
    toggleWishlist() {
      // 찜하기 로직 (백엔드 연동 필요)
      // 예: POST /wishlist/add or /wishlist/remove
      this.isWished = !this.isWished;
      alert(this.isWished ? "찜 목록에 추가되었습니다." : "찜 목록에서 제거되었습니다.");
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
  padding: 0 0;
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

.add-to-cart-btn {
  background-color: #b27d4d;
  color: #fff;
}

.wishlist-btn {
  background-color: #f5f5f5;
  color: #333;
}

.add-to-cart-btn:hover,
.wishlist-btn:hover {
  background-color: #9a633d;
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
