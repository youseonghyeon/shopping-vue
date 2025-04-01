<template>
  <div class="release-note-page">
    <HeaderComponent title="릴리즈 노트"/>
    <div class="content">
      <h2 class="logo">Release Note</h2>
      <ul class="release-notes">
        <li v-for="(note, index) in reversedNotes" :key="index">
          {{ note }}
        </li>
      </ul>
    </div>
    <BottomNav/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue';
import BottomNav from '@/components/BottomNav.vue';

export default {
  name: 'ReleaseNote',
  components: {
    HeaderComponent,
    BottomNav
  },
  data() {
    return {
      notes: [
        "2025-03-02: Spring Boot 보안 설정 및 Vue 프로젝트 초기화",
        "2025-03-02: 제품 관리 및 제품 상세/목록 라우팅 추가",
        "2025-03-03: 회원가입 및 로그인 요청 개선, API 응답 구조 리팩토링",
        "2025-03-04: 주문 기능 및 마이페이지, 장바구니 페이지 추가",
        "2025-03-07: 장바구니 및 CORS 설정, Vue API 연동 구조 개선",
        "2025-03-08: 체크아웃 페이지 및 포인트/쿠폰 기능 구현",
        "2025-03-09: 할인 가격 표시 및 주문 처리 로직 개선",
        "2025-03-10: 로그인 rememberMe, 제품 카드 개선, 이메일 기반 로그인 적용",
        "2025-03-11: 주문 목록/상세 및 코드 포맷팅 개선",
        "2025-03-12: 장바구니 개수 및 찜 기능 초기 구성",
        "2025-03-13: 릴리즈 노트 및 찜 목록 페이지 추가",
        "2025-03-14: 정렬 옵션 추가 및 정렬 기능 개선",
        "2025-03-15: 최근 본 상품, 리뷰 작성 기능 추가 및 레이아웃 정리",
        "2025-03-16: Redis 캐싱, 리뷰/정렬 UI 개선, 이벤트 처리 로직 추가",
        "2025-03-16: 이벤트 모듈 초기화 및 Kafka, Redis 설정 추가",
        "2025-03-16: Kafka consumer 조건부 활성화 설정 및 예외 처리 개선",
        "2025-03-18: 인증 로직 리팩토링 및 이벤트 컨트롤러 개선",
        "2025-03-18: 이벤트 참여 로직 리팩토링 및 비즈니스 구조 정리",
        "2025-03-19: 이벤트 전용 데이터소스와 메인 데이터소스 분리",
        "2025-03-20: 글로벌 예외 처리기 및 리뷰 등록 UX 개선",
        "2025-03-23: Kafka 처리 로직 및 API 헬스체커 추가",
        "2025-03-23: 이벤트 중복 참여 방지 위한 메모리 캐시 및 부하 테스트 추가",
        "2025-03-23: actuator 설정 및 Dockerfile 개선",
        "2025-03-24: README, 부하 테스트 문서화 및 이벤트 배너 추가",
        "2025-03-24: Redis + Lua 스크립트 기반 이벤트 중복 방지 및 참여 처리 개선",
        "2025-03-25: 이벤트 Gateway 설정 개선 및 선착순 참여 페이지 구현",
        "2025-03-25: 로그인 라우팅 UX 개선 및 Vue 이벤트 페이지 최종 배포",
        "2025-03-29: 부분적으로 이벤트 주도 아키텍처로 변경"
      ]
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  computed: {
    reversedNotes() {
      return [...this.notes].reverse();
    }
  }
}
</script>

<style scoped>
.release-note-page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 60px; /* 하단 네비게이션 고려 */
}

.content {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}

.release-notes {
  list-style: none;
  padding: 0;
  margin: 0;
}

.release-notes li {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 0.95em;
  color: #555;
}

.release-notes li:last-child {
  border-bottom: none;
}
</style>
