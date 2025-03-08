<template>
  <div class="product-card" @click="goToDetail">
    <img
        :src="product.titleImage"
        alt="상품 이미지"
        class="product-image"
    />
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ formatPrice(product.price) }}</p>
    </div>
  </div>
</template>

<script>
import {goToProductDetail} from "@/utils/routeUtils.js";

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(value) {
      const number = Number(value);
      return number.toLocaleString() + '원';
    },
    goToDetail() {
      goToProductDetail(this.$router, this.product.id);
    }
  }
}
</script>

<style scoped>
.product-card {
  display: flex;           /* 가로 배치 */
  align-items: center;     /* 수직 가운데 정렬 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  margin: 5px 0;
}

.product-image {
  width: 120px;       /* 가로 길이를 늘리고 */
  height: 120px;       /* 세로 길이를 줄인 느낌 */
  object-fit: cover;  /* 비율 유지, 넘치는 부분은 잘림 */
  border-radius: 4px;
}

.product-info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.product-name {
  font-size: 1em;
  margin-bottom: 5px;
  color: #333;
}

.product-price {
  font-weight: bold;
  color: #b27d4d;
}
</style>
