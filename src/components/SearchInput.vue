<script setup lang="ts">
import { watch } from "vue";
import InputText from "primevue/inputtext";
import useDebouncedRef from "@/composables/useDebounced";

// using debouced event to emit for search
const query = useDebouncedRef("", 200, false);
const emit = defineEmits(["searchInput"]);
defineProps<{
  loading?: boolean;
}>();
watch(query, (newQuery) => {
  emit("searchInput", newQuery);
});
</script>
<template>
  <div class="p-input-icon-left p-input-icon-right w-full max-w-30rem">
    <i class="pi pi-search max-w-2rem"> </i>
    <InputText
      class="p-inputtext-lg w-full"
      type="text"
      v-model="query"
      placeholder="Search"
    />
    <i v-if="loading" class="pi pi-spin pi-spinner"></i>
  </div>
</template>
