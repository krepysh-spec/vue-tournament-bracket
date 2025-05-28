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
      class="w-12 border-none bg-orange-500 dark:bg-orange-600 text-center text-white text-base transition duration-75 focus:ring-0 disabled:text-gray-500 disabled:[-webkit-text-fill-color:theme(colors.gray.500)] dark:text-white dark:disabled:text-gray-400 dark:disabled:[-webkit-text-fill-color:theme(colors.gray.400)] sm:text-sm sm:leading-6 [&_optgroup]:bg-white [&_optgroup]:dark:bg-gray-900 [&_option]:bg-white [&_option]:dark:bg-gray-900"
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