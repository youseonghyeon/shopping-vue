<template>
  <nav class="bottom-nav">
    <ul>
      <li>
        <router-link to="/">
          <font-awesome-icon icon="home" class="icon" />
          <span class="label">홈</span>
        </router-link>
      </li>
      <li>
        <router-link to="/search">
          <font-awesome-icon icon="search" class="icon" />
          <span class="label">검색</span>
        </router-link>
      </li>
      <li>
        <router-link to="/myroom">
          <font-awesome-icon icon="user" class="icon" />
          <span class="label">마이룸</span>
        </router-link>
      </li>
      <li>
        <router-link to="/cart">
          <font-awesome-icon icon="shopping-cart" class="icon" />
          <span class="label">장바구니</span>
        </router-link>
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

.icon {
  color: #000;
  font-size: 24px;
}
</style>
