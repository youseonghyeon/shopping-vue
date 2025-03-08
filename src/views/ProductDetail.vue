<template>
  <div class="product-detail">
    <HeaderComponent />

    <!-- 제품 정보 영역 -->
    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <img :src="product.titleImage" alt="Product Image" class="title-image"/>

      <div class="pricing">
        <p class="price">가격: {{ formatPrice(product.price) }}</p>
        <p class="discount" v-if="product.discountRate">
          할인율: {{ (product.discountRate * 100).toFixed(1) }}%
        </p>
      </div>

      <!-- 수량 선택 및 장바구니 담기 -->
      <div class="add-to-cart">
        <div class="quantity-selector">
          <button @click="decrementQuantity">-</button>
          <input type="number" min="1" v-model.number="quantity"/>
          <button @click="incrementQuantity">+</button>
        </div>
        <button class="add-to-cart-btn" @click="addToCart">
          장바구니에 담기
        </button>
      </div>
    </div>

    <!-- 제품 상세 설명 영역 -->
    <div class="product-description">
      <h2>제품 설명</h2>
      <!-- 세로로 긴 상세 이미지가 있으면 보여주고, 없으면 텍스트 설명 -->
      <img v-if="product.detailImage" :src="product.detailImage" alt="Product Description" class="detail-image"/>
      <p v-else>{{ product.description }}</p>
      <div style="height: 1000px; border: 2px solid #b27d4d;">
        테스트용 박스
      </div>
    </div>

    <!-- 리뷰 영역 -->
    <div class="reviews" v-if="reviews.length">
      <h2>리뷰</h2>
      <div v-for="(review, index) in reviews" :key="index" class="review">
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
    <BottomNav />
  </div>
</template>

<script>
import { getRequest, postRequest } from "@/api/http.js";
import HeaderComponent from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'ProductDetail',
  components: { HeaderComponent, BottomNav, FontAwesomeIcon },
  data() {
    return {
      product: {},
      quantity: 1,
      reviews: []
    }
  },
  created() {
    this.fetchProduct();
    window.scrollTo(0, 0);
    // this.fetchReviews();
    this.reviews = [{
      rating: 5,
      text: "좋아요!"
    }, {
      rating: 4,
      text: "괜찮아요."
    }, {
      rating: 3,
      text: "그저 그래요."
    }, {
      rating: 4,
      text: "괜찮아요."
    }, {
      rating: 3,
      text: "그저 그래요."
    }, {
      rating: 4,
      text: "괜찮아요."
    }, {
      rating: 3,
      text: "그저 그래요."
    }]
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id;
      try {
        const response = await getRequest("/products/" + productId);
        this.product = response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },
    async fetchReviews() {
      const productId = this.$route.params.id;
      try {
        const response = await getRequest("/products/" + productId + "/reviews");
        this.reviews = response.data;
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    },
    async addToCart() {
      try {
        const response = await postRequest("/cart/create", {
          productId: this.product.id,
          quantity: this.quantity
        });
        console.log(response);
      } catch (error) {
        console.error("Error adding to cart:", error);
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
    formatPrice(value) {
      const number = Number(value);
      return number.toLocaleString() + '원';
    }
  }
}
</script>

<style scoped>

.product-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 60px; /* 하단 고정 네비게이션 높이만큼 여백 추가 */
}

.product-info {
  text-align: center;
  margin-bottom: 30px;
}

.title-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.pricing {
  margin-bottom: 20px;
}

.price {
  font-weight: bold;
  font-size: 1.2em;
}

.discount {
  color: #b27d4d;
  font-size: 1em;
}

.add-to-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.quantity-selector {
  display: flex;
  align-items: center;
}

.quantity-selector button {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  color: #333;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.quantity-selector input {
  width: 40px;
  text-align: center;
  margin: 0 5px;
}

.add-to-cart-btn {
  background-color: #b27d4d;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart-btn:hover {
  opacity: 0.9;
}

.product-description {
  margin-bottom: 30px;
}

.detail-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  margin-bottom: 10px;
}

.reviews {
  margin-top: 30px;
}

.review {
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
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
