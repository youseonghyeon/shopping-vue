<template>
  <div class="mypage-page">
    <!-- 상단 헤더 -->
    <HeaderComponent/>

    <!-- 프로필/포인트 영역 -->
    <div class="profile-section">
      <div class="user-info">
        <div v-if="isLoggedIn">
          <div class="user-name">{{ userName }}님</div>
          <div class="user-point">포인트: {{ userPoint }}P</div>
          <button class="logout-btn" @click="handleLogout">로그아웃</button>
        </div>


        <!-- 로그아웃 상태 -->
        <div v-else class="login-prompt" @click="goLogin">
          <h3>로그인을 해주세요 ></h3>
        </div>
      </div>
    </div>

    <!-- 메뉴 목록 -->
    <div class="menu-section">
      <div class="menu-item" @click="goOrderList">주문목록</div>
      <div class="menu-item" @click="goWishList">찜한상품</div>
      <div class="menu-item" @click="goRecentView">최근 본 상품</div>
      <div class="menu-item" @click="goCancelReturnExchange">취소/반품/교환목록</div>
      <div class="menu-item" @click="goReviewManagement">리뷰관리</div>
    </div>

    <!-- 로그인 버튼 (로그인되지 않은 경우에만 표시 예시) -->
    <div class="login-section" v-if="!isLoggedIn">
      <button @click="goLogin">로그인</button>
    </div>

    <!-- 하단 네비게이션 -->
    <BottomNav/>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import HeaderComponent from '../components/Header.vue'
import BottomNav from '@/components/BottomNav.vue'
import {getRequest, postRequest} from '@/api/http.js'

const router = useRouter()

// 간단한 사용자 정보
const userName = ref('유성현')
const userPoint = ref('123,456')
const isLoggedIn = ref(false)

// 이동 함수들 (예시)
const goOrderList = () => {
  alert('주문목록 페이지로 이동')
}
const goWishList = () => {
  alert('찜한상품 페이지로 이동')
}
const goRecentView = () => {
  alert('최근 본 상품 페이지로 이동')
}
const goCancelReturnExchange = () => {
  alert('취소/반품/교환목록 페이지로 이동')
}
const goReviewManagement = () => {
  alert('리뷰관리 페이지로 이동')
}

// 로그인 페이지 이동 함수
const goLogin = () => {
  router.push('/login')
}

const handleLogout = async () => {
  try {
    const currentPath = window.location.pathname; // 현재 경로 가져오기
    const res = await postRequest('/logout', {redirectUrl: currentPath});
    const {redirectUrl} = res.data;
    window.location.href = redirectUrl;
  } catch (err) {
    console.error('로그아웃 에러:', err);
  }
};

onMounted(async () => {
  try {
    const response = await getRequest('/mypage')
    // 예시: 로그인 여부나 사용자 정보 받아오기
    isLoggedIn.value = true
    userName.value = response.data.userName ?? '유성현'
    userPoint.value = response.data.userPoint ?? '123,456'
  } catch (err) {
  }
})
</script>

<style scoped>
.mypage-page {
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
  font-family: sans-serif;
}

/* 프로필 영역 */
.profile-section {
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
}

.user-info {
  margin-bottom: 10px;
}

.user-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.user-point {
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
}

.additional-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.additional-info p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.wow-benefit-btn {
  background-color: #0064ff;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

/* 메뉴 목록 */
.menu-section {
  margin: 10px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.menu-item {
  padding: 15px 20px;
  font-size: 1rem;
  color: #333;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background-color: #f2f2f2;
}

/* 로그인 버튼 영역 */
.login-section {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.login-section button {
  padding: 10px 20px;
  background-color: #0064ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
