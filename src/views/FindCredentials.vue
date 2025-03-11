<template>
  <div class="find-account-page">
    <div class="find-container">
      <h1>비밀번호 찾기</h1>
      <div class="tabs">
        <button :class="{ active: activeTab === 'findId' }" @click="activeTab = 'findId'">
          아이디 찾기
        </button>
        <button :class="{ active: activeTab === 'findPassword' }" @click="activeTab = 'findPassword'">
          비밀번호 찾기
        </button>
      </div>
      <div class="tab-content">
        <!-- 아이디 찾기 폼 -->
        <form v-if="activeTab === 'findId'" @submit.prevent="handleFindId">
          <div class="form-group">
            <label for="findIdName">이름</label>
            <input
                id="findIdName"
                v-model="findId.name"
                placeholder="이름을 입력하세요"
                required
                type="text"
            />
          </div>
          <div class="form-group">
            <label for="findIdEmail">이메일</label>
            <input
                id="findIdEmail"
                v-model="findId.email"
                placeholder="이메일을 입력하세요"
                required
                type="email"
            />
          </div>
          <button type="submit">아이디 찾기</button>
        </form>
        <!-- 비밀번호 찾기 폼 -->
        <form v-if="activeTab === 'findPassword'" @submit.prevent="handleFindPassword">
          <div class="form-group">
            <label for="findPwUserId">아이디</label>
            <input
                id="findPwUserId"
                v-model="findPassword.userId"
                placeholder="아이디를 입력하세요"
                required
                type="text"
            />
          </div>
          <div class="form-group">
            <label for="findPwEmail">이메일</label>
            <input
                id="findPwEmail"
                v-model="findPassword.email"
                placeholder="이메일을 입력하세요"
                required
                type="email"
            />
          </div>
          <button type="submit">비밀번호 찾기</button>
        </form>
      </div>
      <div class="links">
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">회원가입</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const activeTab = ref('findId') // 기본 탭은 아이디 찾기

const findId = ref({
  name: '',
  email: ''
})

const findPassword = ref({
  userId: '',
  email: ''
})

const handleFindId = () => {
  // 여기에 실제 API 호출 로직을 추가하면 됩니다.
  console.log('아이디 찾기 정보:', findId.value)
  alert('입력하신 이름과 이메일로 아이디 정보를 전송했습니다.')
}

const handleFindPassword = () => {
  // 여기에 실제 API 호출 로직을 추가하면 됩니다.
  console.log('비밀번호 찾기 정보:', findPassword.value)
  alert('입력하신 아이디와 이메일로 비밀번호 재설정 링크를 전송했습니다.')
}
</script>

<style scoped>
.find-account-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.find-container {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
  font-size: 1.8em;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border: 1px solid #b27d4d;
  background-color: transparent;
  color: #b27d4d;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.tabs button.active {
  background-color: #b27d4d;
  color: #ffffff;
}

.tab-content {
  padding: 10px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555555;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #b27d4d;
  outline: none;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #b27d4d;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #9a633d;
}

.links {
  margin-top: 20px;
  text-align: center;
}

.links a {
  margin: 0 5px;
  color: #b27d4d;
  text-decoration: none;
  transition: color 0.3s;
}

.links a:hover {
  text-decoration: underline;
}
</style>
