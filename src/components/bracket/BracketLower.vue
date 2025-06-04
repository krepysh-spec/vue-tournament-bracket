<template>
  <div class="flex flex-col mt-8 border-t-2 border-gray-300 dark:border-gray-600 pt-8">
    <div class="text-xl font-bold text-gray-800 dark:text-white mb-4">Lower Bracket</div>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="min-w-max">
          <BracketRoundHeaders 
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
              :permissions="permissions"
              @update:match="updateMatch"
              @highlight-team="highlightTeam"
              @unhighlight-team="unhighlightTeam"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import BracketColumn from './BracketColumn.vue';
import BracketRoundHeaders from './BracketRoundHeaders.vue';
import { TBD, TEAM_POSITION, PERMISSIONS } from '../../constants/tournament';

const emit = defineEmits(['update:state']);

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
  },
  permissions: {
    type: Object,
    required: true,
    default: () => ({
      [PERMISSIONS.CAN_SELECT_TEAM]: true,
      [PERMISSIONS.CAN_EDIT_DATE]: true
    })
  }
});

const columns = ref([]);
const highlightedTeam = ref(null);

const selectedTeams = computed(() => {
  const teams = new Set();
  columns.value.forEach(round => {
    round.items.forEach(match => {
      if (match[TEAM_POSITION.ONE].name !== TBD) teams.add(match[TEAM_POSITION.ONE].name);
      if (match[TEAM_POSITION.TWO].name !== TBD) teams.add(match[TEAM_POSITION.TWO].name);
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
  console.log('Updating lower match:', { roundIndex, matchIndex, updatedMatch });
  if (columns.value[roundIndex] && columns.value[roundIndex].items) {
    columns.value[roundIndex].items[matchIndex] = updatedMatch;
    
    // Якщо є переможець, оновлюємо наступний раунд
    if (updatedMatch.winner && roundIndex < columns.value.length - 1) {
      const nextRoundIndex = roundIndex + 1;
      const nextMatchIndex = Math.floor(matchIndex / 2);
      
      if (columns.value[nextRoundIndex] && columns.value[nextRoundIndex].items[nextMatchIndex]) {
        const nextMatch = columns.value[nextRoundIndex].items[nextMatchIndex];
        const teamPosition = matchIndex % 2 === 0 ? TEAM_POSITION.ONE : TEAM_POSITION.TWO;
        const winningTeam = updatedMatch[updatedMatch.winner];
        
        columns.value[nextRoundIndex].items[nextMatchIndex] = {
          ...nextMatch,
          [teamPosition]: {
            id: winningTeam.id,
            name: winningTeam.name,
            logo: winningTeam.logo,
            score: 0
          }
        };
      }
    }
    
    emitTournamentState();
  }
};

const updateColumns = (updatedColumns) => {
  console.log('Updating lower columns:', updatedColumns);
  columns.value = updatedColumns;
  emitTournamentState();
};

const emitTournamentState = () => {
  console.log('Emitting lower tournament state:', columns.value);
  emit('update:state', columns.value);
};

const initializeTournament = () => {
  console.log('Initializing lower tournament with state:', props.initialState);
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

<style scoped>

</style> 