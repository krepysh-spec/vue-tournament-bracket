<template>
  <div class="flex flex-col">
    <RoundHeaders 
      :columns="columns" 
      @update:columns="updateColumns"
    />
    <div class="flex flex-1 p-5">
      <BracketColumn 
        v-for="(column, index) in columns" 
        :key="column.name"
        :column="column"
        :column-index="index"
        :available-teams="availableTeams"
        :selected-teams="selectedTeams"
        :highlighted-team="highlightedTeam"
        @update:match="updateMatch"
        @highlight-team="highlightTeam"
        @unhighlight-team="unhighlightTeam"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import BracketColumn from './BracketColumn.vue';
import RoundHeaders from './RoundHeaders.vue';

const emit = defineEmits(['update:tournament-state']);

const props = defineProps({
  initialState: {
    type: Array,
    required: true
  },
  availableTeams: {
    type: Array,
    required: true
  },
  defaultBestOf: {
    type: Number,
    default: 3,
    validator: (value) => [1, 3, 5, 7, 9].includes(value)
  }
});

const columns = ref([]);
const highlightedTeam = ref(null);

const selectedTeams = computed(() => {
  const teams = new Set();
  columns.value.forEach(round => {
    round.items.forEach(match => {
      if (match.teamOne.name !== 'TBD') teams.add(match.teamOne.name);
      if (match.teamTwo.name !== 'TBD') teams.add(match.teamTwo.name);
    });
  });
  return Array.from(teams);
});

const highlightTeam = (teamName) => {
  highlightedTeam.value = teamName;
};

const unhighlightTeam = () => {
  highlightedTeam.value = null;
};

const updateMatch = (roundIndex, matchIndex, updatedMatch) => {
  console.log('Updating match:', { roundIndex, matchIndex, updatedMatch });
  if (columns.value[roundIndex] && columns.value[roundIndex].items) {
    columns.value[roundIndex].items[matchIndex] = updatedMatch;
    
    // Якщо є переможець, оновлюємо наступний раунд
    if (updatedMatch.winner && roundIndex < columns.value.length - 1) {
      const nextRoundIndex = roundIndex + 1;
      const nextMatchIndex = Math.floor(matchIndex / 2);
      
      if (columns.value[nextRoundIndex] && columns.value[nextRoundIndex].items[nextMatchIndex]) {
        const nextMatch = columns.value[nextRoundIndex].items[nextMatchIndex];
        const teamPosition = matchIndex % 2 === 0 ? 'teamOne' : 'teamTwo';
        
        columns.value[nextRoundIndex].items[nextMatchIndex] = {
          ...nextMatch,
          [teamPosition]: {
            id: updatedMatch[updatedMatch.winner].id,
            name: updatedMatch[updatedMatch.winner].name,
            score: 0
          }
        };
      }
    }
    
    emitTournamentState();
  }
};

const updateColumns = (updatedColumns) => {
  columns.value = updatedColumns;
  emitTournamentState();
};

const emitTournamentState = () => {
  console.log('Emitting tournament state:', columns.value);
  emit('update:tournament-state', columns.value);
};

const initializeTournament = () => {
  console.log('Initializing tournament with state:', props.initialState);
  if (props.initialState && props.initialState.length > 0) {
    columns.value = JSON.parse(JSON.stringify(props.initialState));
  }
};

watch(() => props.initialState, () => {
  initializeTournament();
}, { deep: true });

onMounted(() => {
  initializeTournament();
});
</script> 