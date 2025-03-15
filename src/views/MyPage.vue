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
      <div class="menu-item" @click="goCancelReturnExchange">취소/반품/교환목록 (제작중)</div>
      <div class="menu-item" @click="goReviewManagement">리뷰관리 (제작중)</div>
    </div>
    <!-- 하단 네비게이션 -->
    <BottomNav/>
  </div>
</template>
<script>
import HeaderComponent from '../components/Header.vue';
import BottomNav from '@/components/BottomNav.vue';
import {getRequest, postRequest} from '@/api/http.js';

export default {
  name: 'MyComponent',
  components: {
    HeaderComponent,
    BottomNav
  },
  data() {
    return {
      userName: '',
      userPoint: '',
      isLoggedIn: false
    };
  },
  async mounted() {
    window.scrollTo(0, 0);
    // 마이페이지 API를 통해 로그인 상태, 포인트, 사용자 정보를 가져옴
    let response = await getRequest('/mypage', null, false);
    const {loggedIn, point, role, username} = response.data;
    this.isLoggedIn = loggedIn;
    this.userName = username;
    this.userPoint = point;
  },
  methods: {
    // 페이지 이동 함수들
    goOrderList() {
      this.$router.push('/order-list');
    },
    goWishList() {
      this.$router.push('/wishlist');
    },
    goRecentView() {
      this.$router.push('/recently-viewed-products');
    },
    goCancelReturnExchange() {
      alert('기능이 없습니다.');
    },
    goReviewManagement() {
      alert('기능이 없습니다.');
    },
    goLogin() {
      this.$router.push('/login');
    },
    async handleLogout() {
      try {
        const currentPath = window.location.pathname; // 현재 경로 가져오기
        const res = await postRequest('/logout', {redirectUrl: currentPath});
        const {redirectUrl} = res.data;
        window.location.href = redirectUrl;
      } catch (err) {
        console.error('로그아웃 에러:', err);
      }
    }
  },
};
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
