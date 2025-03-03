<template>
  <div class="myroom-page">
    <HeaderComponent />
    <div class="content">
      <h2>마이룸</h2>
      <p>사용자 정보 및 설정을 확인하세요.</p>
      <button @click="handleLogin">로그인</button>
    </div>
    <BottomNav />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeaderComponent from '../components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'
import { getRequest } from '@/api/http.js'

const router = useRouter()

const handleLogin = () => {
  router.push('/login')
}

onMounted(async () => {
  try {
    const response = await getRequest('/mypage')
    console.log("call /mypage response: ", response.data)
  } catch (err) {
    if (err.status === 401) {
      if (confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        await router.push('/login')
      }
    } else {
      console.error("Error fetching mypage:", err)
    }
  }
})
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
