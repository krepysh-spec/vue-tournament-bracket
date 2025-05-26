<template>
  <div 
    class="p-2.5 bg-orange-500 dark:bg-orange-600 cursor-pointer min-w-10 text-center"
    :class="{'border-b border-orange-600 dark:border-orange-700': isFirstTeam}"
    @click="selectScore"
  >
    <input 
      v-if="isEditing"
      type="number"
      v-model="score"
      class="w-12 bg-orange-500 dark:bg-orange-600 text-center text-white"
      min="0"
      @change="updateScore"
      @blur="isEditing = false"
    />
    <template v-else>
      <span class="text-white">{{team.score}}</span>
    </template>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  team: {
    type: Object,
    required: true
  },
  teamPosition: {
    type: String,
    required: true
  },
  canEditScore: {
    type: Boolean,
    required: true
  },
  isFirstTeam: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:score']);

const isEditing = ref(false);
const score = ref(props.team.score ?? 0);

const selectScore = () => {
  if (!props.canEditScore) return;
  isEditing.value = true;
};

const updateScore = () => {
  const newScore = parseInt(score.value) || 0;
  emit('update:score', {
    position: props.teamPosition,
    score: newScore
  });
};

watch(() => props.team, (newTeam) => {
  score.value = newTeam.score ?? 0;
}, { deep: true });
</script> 