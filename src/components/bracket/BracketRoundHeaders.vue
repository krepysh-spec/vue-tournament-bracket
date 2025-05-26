<template>
  <div class="flex justify-between px-5">
    <div 
      v-for="(column, index) in columns" 
      :key="column.name"
      class="flex-1 text-center text-sm text-gray-400"
    >
      <div class="flex flex-col items-center gap-2">
        <input 
          :value="column.name"
          @input="updateColumnName(index, $event.target.value)"
          class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-center w-32 text-gray-900 dark:text-white"
        />
        <select 
          :value="column.bestOf"
          @change="updateColumnBestOf(index, $event.target.value)"
          class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-center w-32 text-gray-900 dark:text-white"
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
import { ref } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:columns']);

const bestOfValues = [1, 3, 5, 7, 9];

const updateColumnName = (index, newName) => {
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