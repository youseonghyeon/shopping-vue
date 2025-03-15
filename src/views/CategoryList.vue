<template>
  <div class="category-list-page">
    <HeaderComponent/>
    <h2>카테고리 선택</h2>
    <ul class="category-list">
      <li>
        <a href="/release-note" class="logo" style="font-size: 20px;">Release Note</a>
      </li>
<!--      <li v-for="(category, index) in categories" :key="index">-->
<!--        <a href="#">{{ category }}</a>-->
<!--      </li>-->
    </ul>
    <BottomNav/>
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue'
import BottomNav from '../components/BottomNav.vue'

export default {
  name: 'CategoryList',
  components: {
    BottomNav,
    HeaderComponent
  },
  data() {
    return {
      categories: [
        '의류',
        '전자제품',
        '가구',
        '도서',
        '스포츠 용품',
        '화장품'
      ]
    }
  }
}
</script>

<style scoped>
.category-list-page {
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.category-list-page h2 {
  margin: 20px;
  font-size: 1.5em;
  color: #333;
}

.category-list {
  list-style: none;
  padding: 0 20px;
  margin: 0;
}

.category-list li {
  width: 100%;
  margin: 10px 0;
  font-size: 1.1em;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.category-list li a {
  text-decoration: none;
  color: #3a3a3a;
}
</style>
