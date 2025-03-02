<template>
  <div class="myroom-page">
    <HeaderComponent/>
    <div class="content">
      <h2>마이룸</h2>
      <p>사용자 정보 및 설정을 확인하세요.</p>
      <!-- 사용자 정보, 주문 내역 등 추가 내용 작성 -->
      <button @click="login">로그인</button>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue'
import {onMounted} from "vue";
import axios from "axios";

export default {
  name: 'MyRoom',
  components: {
    HeaderComponent
  },
  methods: {
    login() {
      this.$router.push('/login')
    }
  },
  setup() {
    onMounted(() => {
      try {
        const response = axios.get('http://192.168.0.17:9000/mypage')
            .then((response) => {
              alert(response.data.results || response.data)
            })
      } catch (err) {
        console.error(err)
        alert(err)
      }
    })
  },
}
</script>

<style scoped>
.myroom-page {
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.content {
  padding: 20px;
}

.content h2 {
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #333;
}

.content p {
  font-size: 1em;
  color: #666;
}
</style>
