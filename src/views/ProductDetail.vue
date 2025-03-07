<template>
  <div class="product-detail">
    <HeaderComponent />
    <h1>{{ product.name }}</h1>
    <img :src="product.titleImage" alt="Product Image"/>
    <p>{{ product.description }}</p>
    <p class="price">가격: {{ formatPrice(product.price) }}</p>
    <button @click="addToCart">Add to Cart</button>
    <BottomNav />
  </div>
</template>

<script>
import {getRequest, postRequest} from "@/api/http.js";
import HeaderComponent from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";

export default {
  name: 'ProductDetail',
  components: {BottomNav, HeaderComponent},
  data() {
    return {
      product: {},
    }
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id;
      try {
        const response = await getRequest("/products/" + productId, {});
        this.product = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async addToCart() {
      let axiosResponse = await postRequest("/cart/create", {productId: this.product.id, quantity: 1});
      console.log(axiosResponse)
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
