<script setup lang="ts">
import { RouterView } from "vue-router";
import Footer from "@/components/AppFooter.vue";
import Header from "@/components/AppHeader.vue";
</script>

<template>
  <div class="app flex flex-column h-screen">
    <Header />
    <main class="flex-grow-1 relative content-holder">
      <router-view v-slot="{ Component }">
        <transition name="grow-in" mode="out-in">
          <Component :is="Component" />
        </transition>
      </router-view>
    </main>
    <div class="flex-grow-none">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss">
.content-holder::before {
  content: "";
  top: 0;
  left: 0;
  position: absolute;
  background-image: url("@/assets/images/darth-vader.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center 100%;
  opacity: 0.1;
  height: 100%;
  width: 100%;
}
.brand-holder {
  svg {
    height: 100%;
    fill: var(--surface-900);
    stroke: var(--yellow-500);
  }
}

.grow-in-enter-from,
.grow-in-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
.grow-in-enter-active,
.grow-in-leave-active {
  transition: 0.3s ease-out;
}
</style>
