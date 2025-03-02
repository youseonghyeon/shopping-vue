<template>
  <header class="top-header">
    <div class="logo" @click="goMain">MyShoppingmall</div>
    <button class="hamburger-button" @click="goCategory">
      &#9776;
    </button>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'HeaderComponent',
  setup() {
    const router = useRouter()
    const goCategory = () => {
      router.push('/category')
    }
    const goMain = () => {
      router.push('/')
    }
    return { goCategory , goMain}
  }
}
</script>

<style scoped>
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.logo {
  font-size: 1.6em;
  font-weight: bold;
  font-family: "Times New Roman";
  color: #333333;
}

.hamburger-button {
  background: none;
  border: none;
  font-size: 1.8em;
  cursor: pointer;
  color: #8a8a8a;
}

.hamburger-button:hover {
  color: #5a5a5a;
}
</style>
