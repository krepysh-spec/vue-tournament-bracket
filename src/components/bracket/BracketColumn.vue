<template>
  <div class="flex-1 px-5 pb-2.5 grid grid-cols-[min-content_auto]">
    <template v-for="(item, index) in column.items" :key="item.number">
      <div class="text-[0.7em] text-gray-900 dark:text-white flex justify-end items-center opacity-50 mt-[23px]">{{item.number}}</div>
      <BracketMatch 
        :match="item"
        :index="index"
        :total-matches="column.items.length"
        :round-index="columnIndex"
        :available-teams="availableTeams"
        :selected-teams="selectedTeams"
        :highlighted-team="highlightedTeam"
        :permissions="permissions"
        @update:match="updateMatch(index, $event)"
        @highlight-team="$emit('highlight-team', $event)"
        @unhighlight-team="$emit('unhighlight-team')"
      />
    </template>
  </div>
</template>

<script setup>
import BracketMatch from './BracketMatch.vue';
import { PERMISSIONS } from '../../constants/tournament';

const props = defineProps({
  column: {
    type: Object,
    required: true
  },
  columnIndex: {
    type: Number,
    required: true
  },
  availableTeams: {
    type: Array,
    required: true
  },
  selectedTeams: {
    type: Array,
    required: true
  },
  highlightedTeam: {
    type: String,
    default: null
  },
  permissions: {
    type: Object,
    required: true,
    default: () => ({
      [PERMISSIONS.CAN_SELECT_TEAM]: true
    })
  }
});

const emit = defineEmits(['update:match', 'highlight-team', 'unhighlight-team']);

const updateMatch = (matchIndex, updatedMatch) => {
  emit('update:match', props.columnIndex, matchIndex, updatedMatch);
};
</script> 