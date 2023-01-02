<script lang="ts" setup>
import { RouterLink } from "vue-router";
import yoda from "@/assets/images/yoda.png";
</script>
<template>
  <div class="container text-center text-white relative">
    <h1 class="text-8xl">404</h1>
    <div class="text-3xl">This page's gone fishing.</div>
    <img class="image" loading="lazy" :src="yoda" alt="yoda" />
    <p>
      If you feel that it's not right, please go back to
      <RouterLink class="text-yellow-500" to="/">Home</RouterLink>
    </p>
  </div>
</template>
<style scoped>
.image {
  max-width: 30vw;
  max-height: 50vh;
}
</style>
