<template>
  <div 
    class="p-2.5 bg-[#d66f00] cursor-pointer min-w-10 text-center"
    :class="{'border-b border-[#c35824]': isFirstTeam}"
    @click="selectScore"
  >
    <input 
      v-if="isEditing"
      type="number"
      v-model="score"
      class="w-12 bg-[#d66f00] text-center"
      min="0"
      @change="updateScore"
      @blur="isEditing = false"
    />
    <template v-else>
      {{team.score}}
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