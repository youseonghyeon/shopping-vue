<template>
  <div class="find-account-page">
    <h1>아이디/비밀번호 찾기</h1>
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
          <input type="text" id="findIdName" v-model="findId.name" placeholder="이름을 입력하세요" required />
        </div>
        <div class="form-group">
          <label for="findIdEmail">이메일</label>
          <input type="email" id="findIdEmail" v-model="findId.email" placeholder="이메일을 입력하세요" required />
        </div>
        <button type="submit">아이디 찾기</button>
      </form>

      <!-- 비밀번호 찾기 폼 -->
      <form v-if="activeTab === 'findPassword'" @submit.prevent="handleFindPassword">
        <div class="form-group">
          <label for="findPwUserId">아이디</label>
          <input type="text" id="findPwUserId" v-model="findPassword.userId" placeholder="아이디를 입력하세요" required />
        </div>
        <div class="form-group">
          <label for="findPwEmail">이메일</label>
          <input type="email" id="findPwEmail" v-model="findPassword.email" placeholder="이메일을 입력하세요" required />
        </div>
        <button type="submit">비밀번호 찾기</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tabs button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
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
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
