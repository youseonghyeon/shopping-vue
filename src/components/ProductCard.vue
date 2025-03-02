<template>
  <div class="product-card" @click="goToProductDetail">
    <img :src="product.titleImage" alt="상품 이미지" />
    <div class="product-info">
      <h2>{{ product.name }}</h2>
      <p>{{ formatPrice(product.price) }}</p>
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
  methods: {
    goToProductDetail() {
      this.$router.push({ name: "ProductDetail", params: { id: this.product.id } });
    },
    formatPrice(value) {
      // 숫자로 변환 후 toLocaleString을 사용하여 천단위 콤마 추가, 뒤에 "원" 추가
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

.product-info h2 {
  font-size: 1.1em;
  margin: 0 0 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #333333;
}

.product-info p {
  color: #b27d4d;
  font-weight: bold;
  margin: 0;
}
</style>
