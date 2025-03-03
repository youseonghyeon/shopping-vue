<template>
  <div class="signup-page">
    <h1>회원가입</h1>
    <form @submit.prevent="handleSubmit">

      <!-- 아이디(이메일) -->
      <div class="form-group">
        <label for="email">아이디(이메일)</label>
        <input
            type="text"
            id="email"
            v-model="form.email"
            placeholder="이메일을 입력하세요."
        />
        <p class="error-msg" v-if="errors.email">{{ errors.email }}</p>
      </div>

      <!-- 비밀번호 -->
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="영문/숫자/특수문자 2가지 이상 조합 (8~20자)"
        />
        <p class="error-msg" v-if="errors.password">{{ errors.password }}</p>
      </div>

      <!-- 비밀번호 확인 -->
      <div class="form-group">
        <label for="passwordConfirm">비밀번호 확인</label>
        <input
            type="password"
            id="passwordConfirm"
            v-model="form.passwordConfirm"
            placeholder="비밀번호를 다시 입력하세요."
        />
        <p class="error-msg" v-if="errors.passwordConfirm">{{ errors.passwordConfirm }}</p>
      </div>

      <!-- 이름 -->
      <div class="form-group">
        <label for="name">이름</label>
        <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="이름을 정확히 입력하세요."
        />
        <p class="error-msg" v-if="errors.name">{{ errors.name }}</p>
      </div>

      <!-- 휴대폰 번호 -->
      <div class="form-group">
        <label for="phone">휴대폰 번호</label>
        <input
            type="text"
            id="phone"
            v-model="form.phone"
            placeholder="휴대폰 번호를 정확하게 입력하세요."
        />
        <p class="error-msg" v-if="errors.phone">{{ errors.phone }}</p>
      </div>

      <!-- 동의 항목 (모두 확인했으며 동의합니다) -->
      <div class="agreements">
        <div class="checkbox-group">
          <input
              type="checkbox"
              id="agreeAll"
              v-model="agreeAll"
              @change="toggleAllAgreements"
          />
          <label for="agreeAll">모두 확인했으며 동의합니다.</label>
        </div>
        <p class="error-msg" v-if="errors.agreeAll">{{ errors.agreeAll }}</p>
      </div>

      <button type="submit">가입하기</button>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {postRequest} from "@/api/http.js";
import router from "@/router/index.js";
// 필요하다면 useRouter()를 import하여 회원가입 후 라우팅 처리
// import { useRouter } from 'vue-router'

/**
 * 사용자가 입력한 값들
 */
const form = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phone: ''
})

/**
 * "모두 확인했으며 동의합니다" 체크 여부
 */
const agreeAll = ref(false)

/**
 * 각 필드별 오류 메시지
 */
const errors = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phone: '',
  agreeAll: ''
})

/**
 * 이메일 검증 함수 (간단 버전)
 */
const validateEmail = (email) => {
  if (!email) return '이메일을 입력하세요.'
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!pattern.test(email)) return '올바른 이메일 형식이 아닙니다.'
  return ''
}

/**
 * 비밀번호 검증 함수 (간단 버전)
 */
const validatePassword = (password) => {
  if (!password) return '비밀번호를 입력하세요.'
  if (password.length < 8 || password.length > 20) {
    return '비밀번호는 8~20자 이내여야 합니다.'
  }
  // 2가지 이상 조합 (영문, 숫자, 특수문자)
  let kindCount = 0
  if (/[A-Za-z]/.test(password)) kindCount++
  if (/[0-9]/.test(password)) kindCount++
  if (/[!@#$%^&*]/.test(password)) kindCount++
  if (kindCount < 2) {
    return '영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.'
  }
  return ''
}

/**
 * 비밀번호 확인 검증 함수
 */
const validatePasswordConfirm = (password, passwordConfirm) => {
  if (!passwordConfirm) return '비밀번호 확인을 입력하세요.'
  if (password !== passwordConfirm) return '비밀번호가 일치하지 않습니다.'
  return ''
}

/**
 * 이름 검증 함수
 */
const validateName = (name) => {
  if (!name) return '이름을 입력하세요.'
  // 필요 시 정규식이나 추가 검증
  return ''
}

/**
 * 휴대폰 번호 검증 함수 (간단 버전)
 */
const validatePhone = (phone) => {
  if (!phone) return '휴대폰 번호를 입력하세요.'
  const pattern = /^01[0-9]{8,9}$/ // 간단 예시: 010, 011 등으로 시작
  if (!pattern.test(phone)) return '휴대폰 번호 형식이 올바르지 않습니다.'
  return ''
}

/**
 * 폼 전체 검증
 */
const validateForm = () => {
  errors.value.email = validateEmail(form.value.email)
  errors.value.password = validatePassword(form.value.password)
  errors.value.passwordConfirm = validatePasswordConfirm(
      form.value.password,
      form.value.passwordConfirm
  )
  errors.value.name = validateName(form.value.name)
  errors.value.phone = validatePhone(form.value.phone)

  // 동의 항목 체크
  if (!agreeAll.value) {
    errors.value.agreeAll = '모든 항목에 동의하셔야 합니다.'
  } else {
    errors.value.agreeAll = ''
  }
}

/**
 * "모두 동의" 체크박스 변경 시 처리
 * (추가 세부 항목이 있다면 함께 제어 가능)
 */
const toggleAllAgreements = () => {
  // 현재 예시는 "모두 동의" 하나만 있으므로 로직 단순화
}

/**
 * 회원가입 버튼 클릭 시 처리
 */
const handleSubmit = async () => {
  // 1. 폼 검증
  validateForm()

  // 2. 오류 여부 확인
  const hasError = Object.values(errors.value).some((err) => err !== '')
  if (hasError) {
    // 에러가 있으면 진행 중단
    return
  }
  try {
    let axiosResponse = await postRequest('/signup', form.value);
    if (axiosResponse.data.status === 'SUCCESS') {
      alert('회원가입 성공');
      await router.push('/login');
    } else {
      alert('회원가입 실패');
    }
  } catch (error) {
    console.error('회원가입 실패:', error);
    alert('회원가입에 실패했습니다.');
  }
}
</script>

<style scoped>
.signup-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.signup-page h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: inline-block;
  margin-bottom: 8px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.error-msg {
  color: red;
  font-size: 0.9rem;
  margin-top: 4px;
}

.agreements {
  margin: 16px 0;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group input {
  margin-right: 8px;
}

button[type="submit"] {
  width: 100%;
  padding: 12px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}
</style>
