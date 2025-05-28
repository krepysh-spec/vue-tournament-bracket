<template>
  <div class="flex justify-between px-5">
    <div 
      v-for="(column, index) in columns" 
      :key="column.name"
      class="flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
    >
      <div class="flex flex-col items-center gap-2">
        <input 
          v-model="localColumnNames[index]"
          @blur="updateColumnName(index, $event.target.value)"
          class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-center w-32 text-gray-900 dark:text-white"
        />
        <select 
          :value="column.bestOf"
          @change="updateColumnBestOf(index, $event.target.value)"
          class="fi-select-input w-32border-none bg-transparent text-base text-gray-900 transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900"
        >
          <option v-for="value in bestOfValues" :key="value" :value="value">
            Best of {{ value }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:columns']);

const bestOfValues = [1, 3, 5, 7, 9];

const localColumnNames = ref(props.columns.map(col => col.name));

watch(() => props.columns, (newColumns) => {
  localColumnNames.value = newColumns.map(col => col.name);
}, { deep: true });

const updateColumnName = (index, newName) => {
  localColumnNames.value[index] = newName;
  const updatedColumns = [...props.columns];
  updatedColumns[index] = {
    ...updatedColumns[index],
    name: newName
  };
  emit('update:columns', updatedColumns);
};

const updateColumnBestOf = (index, newBestOf) => {
  const updatedColumns = [...props.columns];
  updatedColumns[index] = {
    ...updatedColumns[index],
    bestOf: Number(newBestOf)
  };
  emit('update:columns', updatedColumns);
};
</script> 