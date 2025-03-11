<template>
  <div class="product-card" @click="goToDetail">
    <img :src="product.titleImage" alt="상품 이미지" class="product-image"/>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">
        <template v-if="hasDiscount">
          <span class="final-price">{{ formatPrice(product.discountedPrice) }}</span>
          <span class="original-price"><del>{{ formatPrice(product.price) }}</del></span>
          <span class="discount-percent">{{ discountPercent }}% 할인</span>
        </template>
        <template v-else>
          {{ formatPrice(product.price) }}
        </template>
      </p>
    </div>
  </div>
</template>

<script>
import {goToProductDetail} from "@/utils/routeUtils.js";

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
    }
  },
  methods: {
    goToDetail() {
      goToProductDetail(this.$router, this.product.id);
    },
    formatPrice(value) {
      const number = Number(value);
      return number.toLocaleString() + "원";
    }
  }
}
</script>

<style scoped>
.product-card {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  margin: 5px 0;
}

.product-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
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
  display: flex;
  align-items: center;
  gap: 5px;
}

.final-price {
  font-size: 1em;
}

.original-price {
  font-size: 0.8em;
  color: #999;
}

.discount-percent {
  background-color: #b27d4d;
  color: #fff;
  font-size: 0.7em;
  padding: 2px 4px;
  border-radius: 3px;
}
</style>
