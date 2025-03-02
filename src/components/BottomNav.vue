<template>
  <nav class="bottom-nav">
    <ul>
      <li>
        <a href="/search">
          <span class="icon">🔍</span>
          <span class="label">검색</span>
        </a>
      </li>
      <li>
        <a href="/">
          <span class="icon">🏠</span>
          <span class="label">홈</span>
        </a>
      </li>
      <li>
        <a href="/myroom">
          <span class="icon">👤</span>
          <span class="label">마이룸</span>
        </a>
      </li>
      <li>
        <a href="/cart">
          <span class="icon">🛒</span>
          <span class="label">장바구니</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'BottomNav'
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  border-top: 1px solid #e0e0e0;
  z-index: 1000;
}

.bottom-nav ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  margin: 0;
  list-style: none;
}

.bottom-nav li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333333;
  font-size: 0.9em;
}

.bottom-nav .icon {
  font-size: 1.4em;
  color: #8a8a8a;
}

.bottom-nav li a:hover .icon {
  color: #5a5a5a;
}

.bottom-nav .label {
  margin-top: 3px;
}
</style>
