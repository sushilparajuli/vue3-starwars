<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePeople } from "@/stores/people";
const route = useRoute();
const title = route.params.title as string;
const peopleStore = usePeople();
const page = ref<string>("1");

const dt = ref();

const onPage = (event: Event) => {
  let { page } = event;
  peopleStore.fetchPeople(page++);
};
const onSort = (event: Event) => {
  const { sortField, sortOrder } = event;
  switch (sortField) {
    case "skin_color":
      return peopleStore.people?.sort((a, b) =>
        a.skin_color > b.skin_color ? sortOrder : -sortOrder
      );
    case "gender":
      return peopleStore.people?.sort((a, b) =>
        a.gender > b.gender ? sortOrder : -sortOrder
      );

    case "eye_color":
      return peopleStore.people?.sort((a, b) =>
        a.gender > b.gender ? sortOrder : -sortOrder
      );
    default:
      return peopleStore.people;
  }
};

const filterKeys: string[] = ["name", "eye_color", "gender", "skin_color"];

onMounted(async () => {
  await peopleStore.fetchPeople(page.value);
});
</script>
<template>
  <div class="container pt-4">
    <h1 class="text-white uppercase mb-2">{{ title }}s</h1>
    <DataTable
      :value="peopleStore.people"
      :lazy="true"
      :paginator="true"
      :rows="10"
      ref="dt"
      dataKey="id"
      :totalRecords="peopleStore.totalRecord"
      :loading="peopleStore.loading"
      @page="onPage($event)"
      @sort="onSort($event)"
      :globalFilterFields="filterKeys"
      responsiveLayout="scroll"
    >
      <Column
        field="name"
        header="Name"
        filterMatchMode="startsWith"
        ref="name"
      >
      </Column>
      <Column
        field="eye_color"
        header="Eye Color"
        filterField="eye_color"
        filterMatchMode="contains"
        ref="eye_color"
        :sortable="true"
      >
      </Column>
      <Column
        field="gender"
        header="Gender"
        filterMatchMode="contains"
        ref="gender"
        :sortable="true"
      >
      </Column>
      <Column
        field="skin_color"
        header="Skin Color"
        filterField="skin_color"
        ref="skin_color"
        :sortable="true"
      >
      </Column>
    </DataTable>
  </div>
</template>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
