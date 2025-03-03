<template>
  <div class="signup-page">
    <h1 class="logo" @click="goMain()">MyShoppingmall</h1>
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

      <!-- 약관 동의 영역 -->
      <div class="agreements">
        <!-- "모두 동의" 체크박스 -->
        <div class="main-agree">
          <div class="checkbox-group">
            <input
                type="checkbox"
                id="agreeAll"
                v-model="agreeAll"
                @change="toggleAllAgreements"
            />
            <label for="agreeAll">모두 확인했으며 동의합니다.</label>
          </div>
          <p class="agree-desc">
            전체 동의하면 필수 및 선택 정보에 대한 동의가 포함되어 있으며, 개별적으로 동의를 선택하실 수도 있습니다. 선택 항목에 대한 동의를 거부하셔도 서비스 이용이 가능합니다.
          </p>
        </div>

        <!-- 개별 약관 체크박스들 -->
        <div class="sub-agree-list">
          <div class="checkbox-group">
            <input type="checkbox" id="ageConsent" v-model="ageConsent" />
            <label for="ageConsent">[필수] 만 14세 이상입니다.</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="termFinance" v-model="termFinance" />
            <label for="termFinance">[필수] 전자금융거래 이용약관 동의</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="termPrivacy" v-model="termPrivacy" />
            <label for="termPrivacy">[필수] 개인정보수집 및 이용 동의</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="termOptional" v-model="termOptional" />
            <label for="termOptional">[선택] 이벤트, 쿠폰 수신 동의</label>
          </div>
        </div>

        <!-- 필수 항목 미체크 시 에러 메시지 표시 -->
        <p class="error-msg" v-if="errors.agreeAll">{{ errors.agreeAll }}</p>
      </div>

      <button type="submit" class="submit-btn">가입하기</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { postRequest } from "@/api/http.js"
import router from "@/router/index.js"
import {goMain} from "@/utils/navigation.js";

/** 가입 폼 데이터 */
const form = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phone: ''
})

/** 체크박스 항목 */
// "모두 동의"
const agreeAll = ref(false)
// 필수
const ageConsent = ref(false)
const termFinance = ref(false)
const termPrivacy = ref(false)
// 선택
const termOptional = ref(false)

/** 에러 메시지 */
const errors = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phone: '',
  agreeAll: ''
})

/** 이메일 검증 */
const validateEmail = (email) => {
  if (!email) return '이메일을 입력하세요.'
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!pattern.test(email)) return '올바른 이메일 형식이 아닙니다.'
  return ''
}

/** 비밀번호 검증 */
const validatePassword = (password) => {
  if (!password) return '비밀번호를 입력하세요.'
  if (password.length < 8 || password.length > 20) {
    return '비밀번호는 8~20자 이내여야 합니다.'
  }
  let kindCount = 0
  if (/[A-Za-z]/.test(password)) kindCount++
  if (/[0-9]/.test(password)) kindCount++
  if (/[!@#$%^&*]/.test(password)) kindCount++
  if (kindCount < 2) {
    return '영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.'
  }
  return ''
}

/** 비밀번호 확인 검증 */
const validatePasswordConfirm = (password, passwordConfirm) => {
  if (!passwordConfirm) return '비밀번호 확인을 입력하세요.'
  if (password !== passwordConfirm) return '비밀번호가 일치하지 않습니다.'
  return ''
}

/** 이름 검증 */
const validateName = (name) => {
  if (!name) return '이름을 입력하세요.'
  return ''
}

/** 휴대폰 번호 검증 */
const validatePhone = (phone) => {
  if (!phone) return '휴대폰 번호를 입력하세요.'
  const pattern = /^01[0-9]{8,9}$/
  if (!pattern.test(phone)) return '휴대폰 번호 형식이 올바르지 않습니다.'
  return ''
}

/** 폼 전체 검증 */
const validateForm = () => {
  // 1) 일반 필드 검증
  errors.value.email = validateEmail(form.value.email)
  errors.value.password = validatePassword(form.value.password)
  errors.value.passwordConfirm = validatePasswordConfirm(form.value.password, form.value.passwordConfirm)
  errors.value.name = validateName(form.value.name)
  errors.value.phone = validatePhone(form.value.phone)

  // 2) 필수 항목 모두 체크 여부
  if (!ageConsent.value || !termFinance.value || !termPrivacy.value) {
    errors.value.agreeAll = '필수 항목에 모두 동의해주세요.'
  } else {
    errors.value.agreeAll = ''
  }
}

/** "모두 동의" 체크 시 전체 항목 처리 */
const toggleAllAgreements = () => {
  if (agreeAll.value) {
    ageConsent.value = true
    termFinance.value = true
    termPrivacy.value = true
    termOptional.value = true
  } else {
    ageConsent.value = false
    termFinance.value = false
    termPrivacy.value = false
    termOptional.value = false
  }
}

/**
 * 개별 체크박스가 모두 체크되면 "모두 동의"가 자동으로 체크,
 * 하나라도 해제되면 "모두 동의" 해제
 */
watch([ageConsent, termFinance, termPrivacy, termOptional], ([ac, tf, tp, to]) => {
  if (ac && tf && tp && to) {
    agreeAll.value = true
  } else {
    agreeAll.value = false
  }
})

/** 회원가입 버튼 */
const handleSubmit = async () => {
  validateForm()
  // 에러가 하나라도 있으면 중단
  const hasError = Object.values(errors.value).some(err => err !== '')
  if (hasError) return

  try {
    const axiosResponse = await postRequest('/signup', form.value)
    if (axiosResponse.data.status === 'SUCCESS') {
      alert('회원가입 성공')
      await router.push('/login')
    } else {
      alert('회원가입 실패')
    }
  } catch (error) {
    console.error('회원가입 실패:', error)
    alert('회원가입에 실패했습니다.')
  }
}
</script>

<style scoped>
.signup-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}

.signup-page h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
  font-size: 1.8em;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555555;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #b27d4d;
  outline: none;
}

.error-msg {
  color: red;
  font-size: 0.9rem;
  margin-top: 4px;
}

/* 약관 영역 */
.agreements {
  margin: 20px 0;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 4px;
  background-color: #fafafa;
}

.main-agree .checkbox-group {
  margin-bottom: 8px;
}

.agree-desc {
  font-size: 0.875rem;
  color: #666;
  line-height: 1.4;
  margin-bottom: 12px;
}

.sub-agree-list {
  padding-left: 8px;
  border-top: 1px solid #eee;
  margin-top: 12px;
}

/* 체크박스 스타일 */
.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  position: relative;
}

.checkbox-group input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #b27d4d;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  vertical-align: middle;
  position: relative;
}

.checkbox-group input[type="checkbox"]:checked {
  background-color: #b27d4d;
  border-color: #b27d4d;
}

.checkbox-group input[type="checkbox"]:checked::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-group label {
  line-height: 1.2;
  color: #555555;
  font-size: 0.95rem;
}

/* 가입 버튼 */
button.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #b27d4d;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

button.submit-btn:hover {
  background-color: #9a633d;
}
</style>
