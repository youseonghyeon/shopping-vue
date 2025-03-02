<template>
  <div class="login-page">
    <div class="login-container">
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
import VueCookies, {set} from "vue-cookies";

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
    async handleLogin() {
      try {
        const response = await http.post("/login", {
          username: this.username,
          password: this.password,
        });

        if (response.data.status === "success") {
          // 로그인 성공 시 쿠키에 사용자 정보 저장
          VueCookies.set("user", response.data.user, this.rememberMe ? "7d" : "1h");
          alert("로그인 성공");
          console.log("로그인 성공", response)
          this.$router.push("/"); // 로그인 후 이동할 페이지
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        alert("로그인에 실패했습니다.");
      }
    },
  },
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.options .find a {
  font-size: 0.9em;
  color: #b27d4d;
  text-decoration: none;
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
  padding: 10px;
  background-color: #b27d4d;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #9a633d;
}

.signup {
  text-align: center;
  margin-top: 20px;
}

.signup p {
  margin-bottom: 10px;
  color: #555555;
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
}

.signup-btn:hover {
  background-color: #b27d4d;
  color: #ffffff;
}
</style>
