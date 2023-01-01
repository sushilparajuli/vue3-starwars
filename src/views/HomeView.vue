<script lang="ts" setup>
import InputText from "primevue/inputtext";
import { ref } from "vue";
const search = ref("");
</script>
<template>
  <div
    class="home px-5 flex flex-column h-full container justify-content-center align-items-center"
  >
    <div class="p-input-icon-left w-full max-w-30rem">
      <i class="pi pi-search" />
      <InputText
        class="p-inputtext-lg w-full"
        type="text"
        v-model="search"
        placeholder="Search"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pi-search {
  z-index: 9;
}
</style>
