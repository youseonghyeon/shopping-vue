<template>
  <div class="search-page">
    <HeaderComponent />
    <div class="search-container">
      <input type="text" v-model="query" placeholder="검색어를 입력하세요" />
      <button @click="axiosSearch">검색</button>
    </div>
    <div class="results">
      <p v-if="results.length === 0">검색 결과가 없습니다.</p>
      <ul v-else>
        <li v-for="(result, index) in results" :key="index">{{ result }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getRequest } from '../api/http'
import HeaderComponent from '../components/Header.vue'

export default {
  name: 'Search',
  components: { HeaderComponent },
  data() {
    return {
      query: '',
      results: []
    }
  },
  methods: {
    async axiosSearch() {
      try {
        const response = await getRequest('/search/product', { q: this.query })
        // 응답 구조에 따라 결과 할당 (필요 시 수정)
        this.results = response.data.results || response.data
      } catch (err) {
        console.error(err)
        alert(err)
      }
    }
  }
}
</script>

<style scoped>
.search-page {
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.search-container {
  padding: 20px;
  display: flex;
  gap: 10px;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.search-container input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-container button {
  padding: 10px 15px;
  background-color: #b27d4d;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.search-container button:hover {
  background-color: #9a633d;
}

.results {
  padding: 20px;
}

.results ul {
  list-style: none;
  padding: 0;
}

.results li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: #333;
}
</style>
