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
        "2025-03-13: 릴리즈 노트 추가",
        "2025-03-13: 찜 기능 추가",
      ]
    }
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
