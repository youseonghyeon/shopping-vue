<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="logo" @click="goMain()">MyShoppingmall</h1>
      <h1>로그인</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">아이디</label>
          <input type="text" id="username" v-model="username" placeholder="아이디 입력" required>
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password" placeholder="비밀번호 입력" required>
        </div>
        <div class="options">
          <div class="find">
            <a href="/find-credentials">아이디/비밀번호 찾기</a>
          </div>
          <div class="remember">
            <label>
              <input type="checkbox" v-model="rememberMe">
              로그인 상태 유지
            </label>
          </div>
        </div>
        <button type="submit" class="login-btn">로그인</button>
      </form>
      <div class="signup">
        <p>아직 회원이 아니신가요?</p>
        <a href="/signup" class="signup-btn">회원가입</a>
      </div>
    </div>
  </div>
</template>

<script>
import http, {postRequest} from "@/api/http.js";
import VueCookies from "vue-cookies";
import {goMain} from "@/utils/navigation.js";


export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    goMain,
    async handleLogin() {
      try {
        const response = await postRequest("/login", {
          username: this.username,
          password: this.password,
        });
        if (response.data.status === "success") {
          this.$router.push("/");
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        alert("로그인에 실패했습니다.");
      }
    },
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
