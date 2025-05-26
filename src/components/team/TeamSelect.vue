<template>
  <div 
    class="flex-grow p-2.5 hover:bg-gray-200 dark:hover:bg-gray-700"
    :class="{
      'hover:bg-green-900/30 dark:hover:bg-green-900/30': isWinner,
      'hover:bg-red-900/30 dark:hover:bg-red-900/30': isLoser,
      'bg-green-900/30 dark:bg-green-900/30': shouldHighlight && isWinner,
      'bg-red-900/30 dark:bg-red-900/30': shouldHighlight && isLoser
    }"
    @mouseenter="highlightTeam"
    @mouseleave="unhighlightTeam"
  >
    <select 
      v-if="canEdit"
      v-model="selectedTeam"
      class="w-full cursor-pointer bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      @change="updateTeam"
    >
      <option value="TBD">TBD</option>
      <option 
        v-for="team in availableTeamsForSelection" 
        :key="team.id" 
        :value="team.name"
        :disabled="isTeamSelected(team.name)"
      >
        {{ team.name }}
      </option>
    </select>
    <template v-else>
      <span class="text-gray-900 dark:text-white">{{team.name}}</span>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  team: {
    type: Object,
    required: true
  },
  teamPosition: {
    type: String,
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
  canEdit: {
    type: Boolean,
    required: true
  },
  isWinner: {
    type: Boolean,
    default: false
  },
  isLoser: {
    type: Boolean,
    default: false
  },
  shouldHighlight: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:team', 'highlight-team', 'unhighlight-team']);

const selectedTeam = ref(props.team.name);

const isTeamSelected = (teamName) => {
  if (teamName === 'TBD') return false;
  return (props.selectedTeams.includes(teamName) && 
         teamName !== props.team.name) ||
         (teamName === props.team.name && props.team.name !== 'TBD');
};

const availableTeamsForSelection = computed(() => {
  if (!props.availableTeams) return [];
  return props.availableTeams.filter(team => {
    if (team.name === 'TBD') return true;
    if (team.name === props.team.name) {
      return true;
    }
    return !isTeamSelected(team.name);
  });
});

const highlightTeam = () => {
  if (props.team.name !== 'TBD') {
    emit('highlight-team', props.team.name);
  }
};

const unhighlightTeam = () => {
  emit('unhighlight-team');
};

const updateTeam = () => {
  emit('update:team', {
    position: props.teamPosition,
    team: {
      id: props.availableTeams.find(t => t.name === selectedTeam.value)?.id || null,
      name: selectedTeam.value,
      score: 0
    }
  });
};
</script> 