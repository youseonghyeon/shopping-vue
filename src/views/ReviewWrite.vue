<template>
  <div class="review-page">
    <HeaderComponent />
    <div class="content">
      <h2>리뷰 작성</h2>
      <div class="review-form-container">
        <div class="review-form">
          <!-- 상품 정보 영역 -->
          <div class="form-group product-info">
            <img :src="product.titleImage" alt="상품 이미지" class="product-image" />
            <span class="product-name">{{ product.name }}</span>
          </div>
          <div class="form-group">
            <label>평점:</label>
            <div class="rating">
              <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{ filled: star <= review.rating }"
                  @click="setRating(star)"
              >
                <font-awesome-icon :icon="['fas', 'star']" />
              </span>
            </div>
          </div>
          <div class="form-group">
            <label for="content">리뷰 내용:</label>
            <textarea id="content" v-model="review.content" placeholder="리뷰 내용을 입력하세요" required></textarea>
          </div>
          <button class="submit-button" @click="submitReview">리뷰 등록</button>
        </div>
      </div>
    </div>
    <BottomNav />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue';
import BottomNav from '@/components/BottomNav.vue';
import { getRequest, postRequest } from '@/api/http.js';

export default {
  name: 'ReviewWrite',
  components: {
    HeaderComponent,
    BottomNav
  },
  data() {
    return {
      productId: null,
      review: {
        rating: 0,
        content: ''
      },
      product: {
        id: 0,
        name: "",
        titleImage: "",
        title: "",
        price: 0,
        discountRate: 0,
        discountedPrice: 0
      }
    }
  },
  created() {
    // 라우트 쿼리에서 productId 추출
    this.productId = this.$route.query.productId;
    this.fetchProduct();
  },
  methods: {
    setRating(star) {
      this.review.rating = star;
    },
    async fetchProduct() {
      try {
        const response = await getRequest('/products/' + this.productId);
        this.product = response.data;
      } catch (error) {
        console.error('상품 정보를 불러오는데 실패:', error);
      }
    },
    async submitReview() {
      try {
        await postRequest('/reviews/create', {
          productId: this.productId,
          rating: this.review.rating,
          content: this.review.content
        });
        alert('리뷰가 성공적으로 등록되었습니다!');
        this.$router.push({ name: 'ProductDetail', params: { id: this.productId } });
      } catch (error) {
        console.error(error);
        alert('리뷰 등록에 실패했습니다.');
      }
    }
  }
};
</script>

<style scoped>
.review-page {
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

.review-form-container {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 20px;
  margin-top: 20px;
}

.review-form .form-group {
  margin-bottom: 15px;
}

.review-form label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

/* 상품 정보 영역 스타일 */
.product-info {
  display: flex;
  align-items: center;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
}

.product-name {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

.rating {
  display: flex;
}

.star {
  cursor: pointer;
  font-size: 1em;
  color: #ccc;
  margin-right: 5px;
}

.star.filled {
  color: #FFD700; /* 노란색 */
}

.review-form textarea {
  width: 100%;
  padding: 8px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
}

.submit-button {
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

.submit-button:hover {
  opacity: 0.9;
}
</style>
