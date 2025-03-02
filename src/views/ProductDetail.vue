<template>
  <div class="product-detail">
    <h1>{{ product.name }}</h1>
    <img :src="product.image" alt="Product Image" />
    <p>{{ product.description }}</p>
    <p class="price">Price: {{ product.price }}</p>
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {}
    }
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      const productId = this.$route.params.id;

      this.product = {
        id: productId,
        name: 'Sample Product',
        image: 'https://via.placeholder.com/300',
        description: 'This is a sample product detail description.',
        price: '$99.99'
      };
    },
    addToCart() {
      // 실제 장바구니 로직에 맞게 수정할 수 있습니다.
      alert(`Added ${this.product.name} to cart`);
    }
  }
}
</script>

<style scoped>
.product-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.product-detail img {
  width: 100%;
  height: auto;
}

.price {
  font-weight: bold;
  margin: 10px 0;
}
</style>
