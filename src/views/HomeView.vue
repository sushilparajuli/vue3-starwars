<script lang="ts" setup>
import Search from "@/components/SearchInput.vue";
import { useFilms } from "@/stores/films";
import { usePeople } from "@/stores/people";
import { useVehicles } from "@/stores/vehicles";
import ProgressBar from "primevue/progressbar";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const filmsStore = useFilms();
const peopleStore = usePeople();
const vehicleStore = useVehicles();
const loading = ref<Boolean>();
const searchQuery = ref("");

const searchParams = async (query: string) => {
  searchQuery.value = query;
  loading.value = true;
  try {
    await filmsStore.fetchFilmsByQuery(query);
    await peopleStore.fetchPeopleByQuery(query);
    await vehicleStore.fetchVehicleByQuery(query);
  } catch (err) {
    loading.value = false;
  } finally {
    loading.value = false;
  }
};

// Highlighted text
const highlightText = (text: string) => {
  return text.replaceAll(
    searchQuery.value,
    `<span class="bg-red-600 text-white">${searchQuery.value}</span>`
  );
};
onMounted(() => {
  // clearing cache store data
  peopleStore.people = [];
  vehicleStore.vehicles = [];
  filmsStore.films = [];
});
</script>
<template>
  <div
    class="home relative px-5 flex flex-column h-full container align-items-center"
  >
    <div class="relative mt-8 w-10 md:w-30rem">
      <Search :loading="loading" @searchInput="searchParams" />

      <div v-if="loading">
        <ProgressBar style="height: 0.5em; width: 30rem" mode="indeterminate" />
      </div>
      <div
        class="bg-white w-full max-w-30rem max-h-30rem absolute search-content mb-3"
      >
        <template v-if="peopleStore.topPeople.length > 0">
          <div class="flex flex-column">
            <div class="bg-blue-900 text-white p-2"><h3>Characters</h3></div>
            <div
              class="p-1"
              v-for="people of peopleStore.topPeople"
              :key="people.name"
            >
              <span v-html="highlightText(people.name)" />
            </div>
            <RouterLink
              class="pull-right align-self-end p-2"
              to="resources/character"
              >View All</RouterLink
            >
          </div>
        </template>
        <template v-if="filmsStore.topFilms.length > 0">
          <div class="flex flex-column">
            <div class="bg-blue-900 text-white p-2"><h3>Films</h3></div>
            <div
              class="p-1"
              v-for="film of filmsStore.topFilms"
              :key="film.title"
            >
              <span v-html="highlightText(film.title)" />
            </div>
            <RouterLink
              disabled="disabled"
              class="pull-right align-self-end p-2"
              to="/"
              >View All</RouterLink
            >
          </div>
        </template>
        <template v-if="vehicleStore.topVehicles.length > 0">
          <div class="flex flex-column">
            <div class="bg-blue-900 text-white p-2"><h3>Vehicles</h3></div>
            <div
              class="p-1"
              v-for="vehicle of vehicleStore.topVehicles"
              :key="vehicle.name"
            >
              <span v-html="highlightText(vehicle.name)" />
            </div>
            <RouterLink
              disabled="disabled"
              class="pull-right align-self-end p-2"
              to="/"
              >View All</RouterLink
            >
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pi-search {
  z-index: 9;
}
a[disabled="disabled"] {
  user-select: none;
  cursor: not-allowed;
  opacity: 0.5;
}
.search-content {
  overflow-x: auto;
  z-index: 9;
}
</style>
