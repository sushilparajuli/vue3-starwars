<script lang="ts" setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import { usePeople } from "@/stores/people";
import MaleIcon from "@/components/MaleIcon.vue";
import FemaleIcon from "@/components/FemaleIcon.vue";

// route from vue-router
const route = useRoute();
const title = route.params.title as string;

// pinia store
const peopleStore = usePeople();

// page params for fetching people
const page = ref(1);
const toast = useToast();

//
const item = ref({});

// dialog
const itemDialog = ref(false);
const submitted = ref(false);
const deleteProductDialog = ref(false);

// genderlist for edit dailog
const genderList = ref([
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Unknown", value: "unknown" },
]);

const dt = ref();

// onPage change
const onPage = (event: Event) => {
  let { page } = event;
  peopleStore.fetchPeople(page++);
};

// onSort, client side sort not ideal solution
const onSort = (event: Event) => {
  const { sortField, sortOrder } = event;
  switch (sortField) {
    case "name":
      return peopleStore.people?.sort((a, b) =>
        a.name > b.name ? sortOrder : -sortOrder
      );
    case "height":
      return peopleStore.people?.sort((a, b) =>
        a.height > b.height ? sortOrder : -sortOrder
      );
    case "mass":
      return peopleStore.people?.sort((a, b) =>
        a.mass > b.mass ? sortOrder : -sortOrder
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

// record doesn't have id so created field picked for uniqueness
const findIndexByDate = (created) => {
  let index = -1;
  for (let i = 0; i < peopleStore.people.length; i++) {
    if (peopleStore.people[i].created === created) {
      index = i;
      break;
    }
  }

  return index;
};

// trigger edit dialog
const editProduct = (record) => {
  item.value = { ...record };
  itemDialog.value = true;
};

// trigger delete dialog
const hideDialog = () => {
  itemDialog.value = false;
  submitted.value = false;
};

// Saving the product submitted
const saveProduct = () => {
  submitted.value = true;

  if (item.value.name.trim()) {
    if (item.value.created) {
      item.value.gender = item.value.gender.value
        ? item.value.gender.value
        : item.value.gender;
      peopleStore.people[findIndexByDate(item.value.created)] = item.value;
      toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Updated",
        life: 3000,
      });
    }

    itemDialog.value = false;
    item.value = {};
  }
};

// Confirmation dialog for delete product
const confirmDeleteProduct = (record) => {
  item.value = record;
  deleteProductDialog.value = true;
};
const deleteProduct = () => {
  peopleStore.people = peopleStore.people.filter(
    (val) => val.created !== item.value.created
  );
  deleteProductDialog.value = false;
  item.value = {};
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Deleted",
    life: 3000,
  });
};

const filterKeys: string[] = ["name", "eye_color", "gender", "height", "mass"];

// fetching data
onMounted(async () => {
  await peopleStore.fetchPeople(page.value);
});
</script>
<template>
  <div
    class="relative px-5 flex flex-column h-full container align-items-center"
  >
    <div class="container pt-4">
      <h1 class="text-white uppercase mb-2">{{ title }}s</h1>
      <DataTable
        stripedRows
        :value="peopleStore.people"
        :lazy="true"
        :paginator="true"
        :rows="10"
        ref="dt"
        dataKey="created"
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
          filterField="name"
          filterMatchMode="startsWith"
          ref="name"
          :sortable="true"
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
          class="genderColumn"
        >
          <template #body="slotProps">
            <template v-if="slotProps.data.gender === 'male'">
              <MaleIcon />
            </template>
            <template v-else-if="slotProps.data.gender === 'female'">
              <FemaleIcon />
            </template>
            <template v-else> <span> - </span> </template>
          </template>
        </Column>
        <Column
          field="skin_color"
          header="Skin Color"
          filterField="skin_color"
          ref="skin_color"
        >
        </Column>
        <Column
          field="birth_year"
          header="Birth Year"
          filterField="birth_year"
          ref="birth_year"
        />
        <Column
          field="height"
          header="Height"
          filterField="height"
          ref="height"
          :sortable="true"
        />
        <Column
          field="mass"
          header="Mass"
          filterField="mass"
          ref="mass"
          :sortable="true"
        />
        <Column header="Actions" :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Edit Dialog -->
    <Dialog
      v-model:visible="itemDialog"
      :style="{ width: '450px' }"
      header="Character Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name"
          v-model.trim="item.name"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !item.name }"
        />
        <small class="p-error" v-if="submitted && !item.name"
          >Name is required.</small
        >
      </div>

      <div class="field">
        <label for="gender" class="mb-3">Gender</label>
        <Dropdown
          id="gender"
          inputId="gender"
          v-model="item.gender"
          :options="genderList"
          optionLabel="label"
          placeholder="Select a Gender"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span>{{ slotProps.value.label }}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span>{{ slotProps.value }}</span>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
        </Dropdown>
      </div>

      <div class="field">
        <label class="mb-3">Eye Color</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="eyeColor1"
              name="eye_color"
              value="blue"
              v-model="item.eye_color"
            />
            <label for="category1">Blue</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="eyeColor2"
              name="eye_color"
              value="brown"
              v-model="item.eye_color"
            />
            <label for="category2">Brown</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="eyeColor3"
              name="eye_color"
              value="blonde"
              v-model="item.eye_color"
            />
            <label for="category3">Blonde</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="eyeColor4"
              name="eye_color"
              value="unknown"
              v-model="item.eye_color"
            />
            <label for="category4">Unknown</label>
          </div>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="height">Height</label>
          <InputNumber inputId="height" v-model="item.height" />
        </div>
        <div class="field col">
          <label for="mass">Mass</label>
          <InputNumber inputId="mass" v-model="item.mass" />
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveProduct"
        />
      </template>
    </Dialog>

    <!-- Item delete dialog -->
    <Dialog
      v-model:visible="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="item"
          >Are you sure you want to delete <b>{{ item.name }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteProductDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteProduct"
        />
      </template>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 0.3rem 1rem;
}
.genderColumn {
  svg {
    max-height: 1.5rem;
  }
}
::v-deep(
    .p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even)
  ) {
  background: var(--blue-50);
}
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
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
