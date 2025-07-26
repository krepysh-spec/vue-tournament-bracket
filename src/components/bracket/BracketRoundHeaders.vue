<template>
  <div class="flex justify-between px-5">
    <div
      v-for="(column, index) in columns"
      :key="column.name"
      class="flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
    >
      <div class="flex flex-col items-center gap-2">
        <div class="mt-2">
          <div
            class="flex items-center rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600"
          >
            <div class="join">
              <input
                v-model="localColumnNames[index]"
                :disabled="!permissions[PERMISSIONS.CAN_EDIT_ROUND_NAME]"
                type="text"
                class="input input-bordered join-item"
                @blur="updateColumnName(index, $event.target.value)"
              />
              <select
                :value="column.bestOf"
                :disabled="!permissions[PERMISSIONS.CAN_EDIT_BEST_OF]"
                class="select rounded-md border-transparent focus:border-gray-500 focus:bg-white join-item"
                @change="updateColumnBestOf(index, $event.target.value)"
              >
                <option
                  v-for="value in bestOfValues"
                  :key="value"
                  :value="value"
                >
                  Best of {{ value }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { PERMISSIONS } from "../../constants/tournament";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  permissions: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:columns"]);

const bestOfValues = [1, 3, 5, 7, 9];

const localColumnNames = ref(props.columns.map((col) => col.name));

watch(
  () => props.columns,
  (newColumns) => {
    localColumnNames.value = newColumns.map((col) => col.name);
  },
  { deep: true },
);

const updateColumnName = (index, newName) => {
  localColumnNames.value[index] = newName;
  const updatedColumns = [...props.columns];
  updatedColumns[index] = {
    ...updatedColumns[index],
    name: newName,
  };
  emit("update:columns", updatedColumns);
};

const updateColumnBestOf = (index, newBestOf) => {
  const updatedColumns = [...props.columns];
  updatedColumns[index] = {
    ...updatedColumns[index],
    bestOf: Number(newBestOf),
  };
  emit("update:columns", updatedColumns);
};
</script>
