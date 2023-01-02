<script lang="ts" setup>
defineProps<{
  title: string;
  items: { key: string; value: string }[];
}>();
</script>
<template>
  <div class="bg-blue-900 text-white p-2">
    <h3>{{ title }}</h3>
  </div>
  <div v-for="item of items" :key="item.key">
    {{ item.value }}
  </div>
</template>
