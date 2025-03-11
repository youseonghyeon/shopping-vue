<template>
  <div class="product-card" @click="goToProductDetail">
    <img :src="product.titleImage" alt="상품 이미지"/>
    <div class="product-info">
      <h2>{{ product.name }}</h2>
      <!-- 가격 표시 영역 -->
      <div class="price-container">
        <!-- 할인된 경우 -->
        <template v-if="hasDiscount">
          <div class="discount-price">
            <span class="final-price">{{ formatPrice(product.discountedPrice) }}</span>
            <span class="discount-badge">{{ discountPercent }}%</span>
          </div>
          <div class="original-price">
            <del>{{ formatPrice(product.price) }}</del>
          </div>
        </template>
        <!-- 할인 없는 경우 -->
        <template v-else>
          <span class="final-price">{{ formatPrice(product.price) }}</span>
        </template>
      </div>
      <!-- 별점 표시 영역 (샘플: 4점) -->
      <div class="rating">
        <font-awesome-icon
            v-for="n in 5"
            :key="n"
            :icon="n <= sampleRating ? 'star' : ['far', 'star']"
        />
        <p style="color: #5a5a5a; font-size: 12px;">(5)</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasDiscount() {
      return this.product.discountRate && this.product.discountRate > 0;
    },
    discountPercent() {
      return this.hasDiscount ? (this.product.discountRate * 100).toFixed(0) : 0;
    },
    // 샘플 별점: 4점 (추후 실제 데이터로 대체 가능)
    sampleRating() {
      return 4;
    }
  },
  methods: {
    goToProductDetail() {
      this.$router.push({name: "ProductDetail", params: {id: this.product.id}});
    },
    formatPrice(value) {
      const number = Number(value);
      return number.toLocaleString() + '원';
    }
  }
}
</script>

<style scoped>
.product-card {
  width: 48%;
  margin-bottom: 15px;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-card img {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;
  border-radius: 6px;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.product-info h2 {
  font-size: 1.1em;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 두 줄까지만 보이도록 자름 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #333333;
}

/* 가격 전체 영역 */
.price-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* 할인된 경우 */
.discount-price {
  display: flex;
  align-items: center;
  gap: 5px;
}

.final-price {
  font-size: 1.2em;
  color: #b27d4d;
  font-weight: bold;
}

/* 할인 배지(퍼센트) */
.discount-badge {
  background-color: #b27d4d;
  color: #fff;
  font-size: 0.75em;
  padding: 2px 4px;
  border-radius: 2px;
  white-space: nowrap;
}

.original-price {
  color: #999;
  font-size: 0.9em;
  margin-top: -2px;
}

.original-price del {
  color: #999;
}

/* 할인 없는 경우 */
.price-container .final-price {
  color: #b27d4d;
  font-weight: bold;
  font-size: 1.2em;
}

/* 별점 영역 */
.rating {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-top: 5px;
}

/* font-awesome 아이콘에 노란색 지정 */
.rating svg {
  color: #FFD700;
  width: 13px;
  height: 13px;
}
</style>
