<template>
  <div class="banner">
    <img :src="bannerImage" alt="배너 이미지"/>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      bannerImage: 'https://i.pinimg.com/originals/c6/be/13/c6be13b1adee3017530db5dfa1f46ecd.jpg'
    }
  }
}
</script>

<style scoped>
.banner img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin: 15px 0;
}
</style>
