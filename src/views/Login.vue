<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="logo" @click="goMain()">MyShoppingmall</h1>
      <h1>로그인</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">이메일</label>
          <input id="email" v-model="email" placeholder="이메일 입력" required type="text">
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input id="password" v-model="password" placeholder="비밀번호 입력" required type="password">
        </div>
        <div class="options">
          <div class="find">
            <a href="/find-credentials">비밀번호 찾기</a>
          </div>
          <div class="remember">
            <label>
              <input v-model="rememberMe" type="checkbox">
              로그인 상태 유지
            </label>
          </div>
        </div>
        <button class="login-btn" type="submit">로그인</button>
        <!-- 테스트용 로그인 버튼 -->
        <button class="login-btn" style="margin-top: 20px; background-color: #b8b8b8;" type="button"
                @click="testUserLogin()">테스트 계정 로그인
        </button>
      </form>
      <div class="signup">
        <p>아직 회원이 아니신가요?</p>
        <a class="signup-btn" href="/signup">회원가입</a>
      </div>
    </div>
  </div>
</template>

<script>
import {postRequest} from "@/api/http.js";
import {goMain} from "@/utils/navigation.js";
import {encrypt} from "@/utils/encryptUtils.js";

export default {
  name: "Login",
  created() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    goMain,
    async handleLogin() {
      try {
        const response = await postRequest("/login", {
          email: encrypt(this.email),
          password: encrypt(this.password),
          rememberMe: this.rememberMe
        });
        if (response.data.success) {
          this.$router.push("/");
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        // error.response.data.message가 존재하면 사용, 아니면 기본 메시지
        console.log(error)
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("로그인에 실패했습니다. 다시 시도해 주세요.");
        }
      }
    },
    testUserLogin() {
      this.email = "testUser@mail.com"
      this.password = "3jr5b1j3jbl_!"
      this.handleLogin()
    }
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  color: #333333;
  font-size: 1.8em;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #555555;
  font-size: 0.95em;
}

.form-group input {
  width: 100%;
  padding: 12px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #b27d4d;
  outline: none;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.options .find a {
  font-size: 0.9em;
  color: #b27d4d;
  text-decoration: none;
  transition: color 0.2s;
}

.options .find a:hover {
  text-decoration: underline;
}

.options .remember label {
  font-size: 0.9em;
  color: #555555;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #b27d4d;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-btn:hover {
  background-color: #9a633d;
}

.signup {
  text-align: center;
  margin-top: 25px;
}

.signup p {
  margin-bottom: 10px;
  color: #555555;
  font-size: 0.95em;
}

.signup-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #ffffff;
  border: 1px solid #b27d4d;
  border-radius: 4px;
  color: #b27d4d;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s, color 0.2s;
}

.signup-btn:hover {
  background-color: #b27d4d;
  color: #ffffff;
}

</style>
