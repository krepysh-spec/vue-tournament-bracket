<template>
  <div
    class="flex flex-col mt-8"
    :class="{
      'border-t-2 border-gray-300 dark:border-gray-600 pt-8': bordered,
    }"
  >
    <div class="text-xl font-bold text-gray-800 dark:text-white mb-4">
      {{ title }}
    </div>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="min-w-max">
          <BracketRoundHeaders
            :columns="columns"
            :permissions="permissions"
            @update:columns="onColumnsUpdate"
          />
          <div class="flex flex-1 p-5">
            <BracketColumn
              v-for="(column, index) in columns"
              :key="column.id"
              :column="column"
              :column-index="index"
              :available-teams="availableTeams"
              :selected-teams="selectedTeams"
              :highlighted-team="highlightedTeam"
              :permissions="permissions"
              @update:match="onMatchUpdate"
              @highlight-team="onHighlight"
              @unhighlight-team="onUnhighlight"
              @click-match="onClickMatch"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BracketColumn from "./BracketColumn.vue";
import BracketRoundHeaders from "./BracketRoundHeaders.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  availableTeams: {
    type: Array,
    required: true,
  },
  selectedTeams: {
    type: Array,
    required: true,
  },
  highlightedTeam: {
    type: String,
    default: null,
  },
  permissions: {
    type: Object,
    required: true,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  onMatchUpdate: {
    type: Function,
    required: true,
  },
  onColumnsUpdate: {
    type: Function,
    required: true,
  },
  onHighlight: {
    type: Function,
    required: true,
  },
  onUnhighlight: {
    type: Function,
    required: true,
  },
  onClickMatch: {
    type: Function,
    required: false,
    default: () => {},
  },
});
</script>
