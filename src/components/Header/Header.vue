<script lang="ts" setup>
import BrandImage from "@/components/Logos/BrandImage.vue";
</script>
<template>
  <header class="flex-grow-none bg-blue-100 p-3">
    <div class="container">
      <div class="flex align-items-center justify-content-center">
        <div class="brand-holder h-4rem">
          <RouterLink to="/">
            <BrandImage />
          </RouterLink>
        </div>
    </div>
    </div>
  </header>
</template>
<style lang="scss" scoped>
header {
  background: linear-gradient(
    109.6deg,
    rgba(0, 0, 0, 0.93) 11.2%,
    rgba(0, 0, 0, 0.93) 13.2%
  );
}
</style>
