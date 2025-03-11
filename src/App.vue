<template>
  <router-view/>
  <FooterInfo/>
</template>

<script>
import FooterInfo from "@/components/FooterInfo.vue";

export default {
  name: 'App',
  components: {FooterInfo}
}
</script>
