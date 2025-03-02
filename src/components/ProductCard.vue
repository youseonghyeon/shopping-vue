<template>
  <div class="product-card">
    <img :src="product.image" alt="상품 이미지" />
    <div class="product-info">
      <h2>{{ product.name }}</h2>
      <p>{{ product.price }}</p>
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
