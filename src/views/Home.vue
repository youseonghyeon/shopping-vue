<template>
  <div class="container">
    <HeaderComponent/>
    <Banner/>
    <section class="product-list">
      <ProductCard
          v-for="(product, index) in products"
          :key="index"
          :product="product"
      />
    </section>
    <BottomNav/>
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue'
import Banner from '../components/Banner.vue'
import ProductCard from '../components/ProductCard.vue'
import BottomNav from '../components/BottomNav.vue'

export default {
  name: 'Home',
  components: {
    HeaderComponent,
    Banner,
    ProductCard,
    BottomNav
  },
  data() {
    return {
      products: [
        {
          name: "Apple 2024 맥북 프로 14 M4",
          price: "2,237,930원",
          image: "https://thumbnail8.coupangcdn.com/thumbnails/remote/320x320ex/image/1025_amir_coupang_oct_80k/eb38/aa9d608f2d516bc2ac5dc44a5d07cadaebe11e58409cfd02eea64e1e3d32.jpg"
        },
        {
          name: "Apple 2024 맥북 프로 14 M4",
          price: "3,482,300원",
          image: "https://thumbnail9.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/2024/11/08/13/4/d01c4dd5-5da1-4fb6-a042-8c2002e8fa6e.jpg"
        },
        {
          name: "Apple 2024 맥북 에어 13 M3",
          price: "1,268,000원",
          image: "https://thumbnail10.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/2024/11/04/16/0/ee63c2ec-17c7-447d-8a9a-9e4dea58ac76.jpeg"
        },
        {
          name: "Apple 맥북 에어 13 M2",
          price: "40,000원",
          image: "https://thumbnail7.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/2024/11/06/13/6/1affc1cc-67bd-42a5-8ea9-f2be0db7c09d.jpeg"
        },
        {
          name: "다루미 맥북에어 그램 스탠드 가방, 블랙, 1개",
          price: "13,500원",
          image: "https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/154081775986418-030eb1bf-4bd3-499f-9201-3608f4418928.jpg"
        },
        {
          name: "UGREEN 유그린 1000Mbps USB C 이더넷 어댑터 10Gbps USB3.2 Gen2 5 in 1 USB C 허브 노트북 맥북 윈도우 XPS 아이패드 프로 이더넷 연결용",
          price: "25,300원",
          image: "https://image6.coupangcdn.com/image/vendor_inventory/e154/b8bd63cdafc623daccde4ae1c0bb686570fec8e2c530bc597857ba5915b3.jpg"
        }

      ]
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  padding-bottom: 60px; /* 하단 고정 네비게이션 높이만큼 여백 추가 */
}

.product-list {

  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  padding: 10px 10px;
}
</style>
