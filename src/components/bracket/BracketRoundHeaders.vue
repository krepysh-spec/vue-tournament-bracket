<template>
  <div class="flex justify-between px-5">
    <div 
      v-for="(column, index) in columns" 
      :key="column.name"
      class="flex-1 text-center text-sm text-gray-400 py-2 rounded overflow-hidden"
    >
      <div class="flex flex-col items-center gap-2">
      
        <div class="mt-2">
    <div class="flex items-center rounded-md bg-white dark:bg-gray-900">
    
      <input type="text"
      v-model="localColumnNames[index]"
      @blur="updateColumnName(index, $event.target.value)"
        class="block min-w-0 grow py-1.5 pr-3 text-gray-800 dark:text-white border-none pl-1 text-base text-gray-900 bg-white dark:bg-gray-900  placeholder:text-gray-400 focus:outline-none sm:text-sm/6">
      <div class="grid shrink-0 grid-cols-1 focus-within:relative">
        <select 
          :value="column.bestOf"
          @change="updateColumnBestOf(index, $event.target.value)"
          class="col-start-1 row-start-1 w-full text-gray-800 dark:text-white appearance-none py-1.5 bg-white dark:bg-gray-900  pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        >
          <option v-for="value in bestOfValues" :key="value" :value="value">
            Best of {{ value }}
          </option>
        </select>

        <!-- <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg> -->
      </div>
    </div>
  </div>

        
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