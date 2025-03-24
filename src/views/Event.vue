<template>
  <div class="event-page">
    <HeaderComponent title="이벤트 참여"/>
    <div class="content">
      <h2>선착순 이벤트</h2>
      <p class="event-description">
        선착순 <strong>1000명</strong>에게 <strong>10,000포인트</strong>를 드립니다!
      </p>
      <button class="submit-button" :disabled="disableButton" @click="participate">
        <span v-if="loading" class="spinner"></span>
        <span v-if="loading">처리 중...</span>
        <span v-else>이벤트 참여하기</span>
      </button>
      <!-- 서버에서 전달받은 메시지 표시 -->
      <p v-if="serverMessage" :class="messageClass">{{ serverMessage }}</p>
    </div>
    <BottomNav/>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import BottomNav from "@/components/BottomNav.vue";
import { postRequest } from "@/api/http.js";

export default {
  name: "EventParticipation",
  components: { HeaderComponent, BottomNav },
  data() {
    return {
      participated: false,
      serverStatus: null, // true: 참여 완료, false: 실패(시간/개수 마감 등)
      serverMessage: "",
      eventTimeExpired: false,
      loading: false
    };
  },
  computed: {
    disableButton() {
      // 로딩 중이거나 이미 참여한 상태면 버튼 비활성화
      return this.loading || this.serverStatus === true;
    },
    messageClass() {
      // 서버 상태에 따라 메시지 스타일 적용
      if (this.serverStatus === true) {
        return "success-message";
      } else if (this.serverStatus === false) {
        return "finished-message";
      }
      return "";
    }
  },
  methods: {
    async participate() {
      if (this.disableButton) return;
      this.loading = true;
      try {
        let response = await postRequest('/event/ticket/apply');
        const { success, message } = response.data.data;
        this.serverStatus = success;
        this.serverMessage = message;
      } catch (error) {
        if (error.status === 400) {
          const { success, message } = error.response.data.errorDetails;
          this.serverStatus = success;
          this.serverMessage = message;
        } else {
          this.serverStatus = false;
          this.serverMessage = '이벤트 참여에 실패했습니다. 잠시 후 다시 시도해주세요.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.event-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.content {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content h2 {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #333;
  border-bottom: 2px solid #b27d4d;
  padding-bottom: 10px;
}

.event-description {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 20px;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #b27d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 15px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button:hover {
  background-color: #9a633d;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 로딩 스피너 스타일 */
.spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.6s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.success-message {
  color: #28a745;
  margin-top: 15px;
  font-weight: bold;
  text-align: center;
}

.finished-message {
  color: #dc3545;
  margin-top: 15px;
  font-weight: bold;
  text-align: center;
}
</style>
