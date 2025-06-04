<template>
  <div class="flex flex-col">
    <div class="text-xl font-bold text-gray-800 dark:text-white mb-4">Upper Bracket</div>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="min-w-max">
          <BracketRoundHeaders 
            :columns="upperColumns" 
            @update:columns="updateUpperColumns"
          />
          <div class="flex flex-1 p-5">
            <BracketColumn 
              v-for="(column, index) in upperColumns" 
              :key="column.id"
              :column="column"
              :column-index="index"
              :available-teams="availableTeams"
              :selected-teams="selectedTeams"
              :highlighted-team="highlightedTeam"
              :permissions="permissions"
              @update:match="updateUpperMatch"
              @highlight-team="highlightTeam"
              @unhighlight-team="unhighlightTeam"
            />
          </div>
        </div>
      </div>
    </div>

    <BracketLower
      v-if="format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION"
      :initial-state="lowerColumns"
      :available-teams="availableTeams"
      :default-best-of="defaultBestOf"
      :permissions="permissions"
      @update:state="updateLowerState"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import BracketColumn from './bracket/BracketColumn.vue';
import BracketRoundHeaders from './bracket/BracketRoundHeaders.vue';
import BracketLower from './bracket/BracketLower.vue';
import { createLowerBracketStructure } from '../utils/tournament';
import { TOURNAMENT_FORMAT, TBD, TEAM_POSITION, PERMISSIONS } from '../constants/tournament';

const emit = defineEmits(['update:state']);

const props = defineProps({
  initialState: {
    type: Object,
    required: true
  },
  availableTeams: {
    type: Array,
    required: true
  },
  defaultBestOf: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  permissions: {
    type: Object,
    required: true,
    default: () => ({
      [PERMISSIONS.CAN_SELECT_TEAM]: true
    })
  }
});

const upperColumns = ref([]);
const lowerColumns = ref([]);
const highlightedTeam = ref(null);

const selectedTeams = computed(() => {
  const teams = new Set();
  upperColumns.value.forEach(round => {
    round.matches.forEach(match => {
      if (match[TEAM_POSITION.ONE].name !== TBD) teams.add(match[TEAM_POSITION.ONE].name);
      if (match[TEAM_POSITION.TWO].name !== TBD) teams.add(match[TEAM_POSITION.TWO].name);
    });
  });
  if (props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION) {
    lowerColumns.value.forEach(round => {
      round.matches.forEach(match => {
        if (match[TEAM_POSITION.ONE].name !== TBD) teams.add(match[TEAM_POSITION.ONE].name);
        if (match[TEAM_POSITION.TWO].name !== TBD) teams.add(match[TEAM_POSITION.TWO].name);
      });
    });
  }
  return Array.from(teams);
});

const highlightTeam = (teamName) => {
  highlightedTeam.value = teamName;
};

const unhighlightTeam = () => {
  highlightedTeam.value = null;
};

const updateUpperMatch = (roundIndex, matchIndex, updatedMatch) => {
  console.log('Updating upper match:', { roundIndex, matchIndex, updatedMatch });
  if (upperColumns.value[roundIndex] && upperColumns.value[roundIndex].matches) {
    upperColumns.value[roundIndex].matches[matchIndex] = updatedMatch;
    
    // If there is a winner, update the next round
    if (updatedMatch.winner && roundIndex < upperColumns.value.length - 1) {
      const nextRoundIndex = roundIndex + 1;
      const nextMatchIndex = Math.floor(matchIndex / 2);
      
      if (upperColumns.value[nextRoundIndex] && upperColumns.value[nextRoundIndex].matches[nextMatchIndex]) {
        const nextMatch = upperColumns.value[nextRoundIndex].matches[nextMatchIndex];
        const teamPosition = matchIndex % 2 === 0 ? TEAM_POSITION.ONE : TEAM_POSITION.TWO;
        const winningTeam = updatedMatch[updatedMatch.winner];
        
        upperColumns.value[nextRoundIndex].matches[nextMatchIndex] = {
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

    // If it's Double Elimination and a team lost, add them to the lower bracket
    if (props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION && updatedMatch.winner) {
      const losingTeam = updatedMatch[updatedMatch.winner === TEAM_POSITION.ONE ? TEAM_POSITION.TWO : TEAM_POSITION.ONE];
      if (losingTeam.name !== TBD) {
        // Find the corresponding match in the lower bracket
        const lowerRoundIndex = Math.floor(roundIndex / 2);
        const lowerMatchIndex = Math.floor(matchIndex / 2);
        
        if (lowerColumns.value[lowerRoundIndex] && lowerColumns.value[lowerRoundIndex].matches[lowerMatchIndex]) {
          const lowerMatch = lowerColumns.value[lowerRoundIndex].matches[lowerMatchIndex];
          const teamPosition = matchIndex % 2 === 0 ? TEAM_POSITION.ONE : TEAM_POSITION.TWO;
          
          lowerColumns.value[lowerRoundIndex].matches[lowerMatchIndex] = {
            ...lowerMatch,
            [teamPosition]: {
              id: losingTeam.id,
              name: losingTeam.name,
              logo: losingTeam.logo,
              score: 0
            }
          };
        }
      }
    }
    
    emitTournamentState();
  }
};

const updateUpperColumns = (updatedColumns) => {
  console.log('Updating upper columns:', updatedColumns);
  upperColumns.value = updatedColumns;
  emitTournamentState();
};

const updateLowerState = (updatedColumns) => {
  console.log('Updating lower state:', updatedColumns);
  lowerColumns.value = updatedColumns;
  emitTournamentState();
};

const emitTournamentState = () => {
  console.log('Emitting tournament state:', {
    upper: upperColumns.value,
    lower: props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION ? lowerColumns.value : null
  });
  emit('update:state', {
    upper: upperColumns.value,
    lower: props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION ? lowerColumns.value : null
  });
};

const initializeTournament = () => {
  console.log('Initializing tournament with state:', props.initialState);
  if (props.initialState) {
    if (Array.isArray(props.initialState)) {
      // Old format (upper bracket only)
      upperColumns.value = JSON.parse(JSON.stringify(props.initialState));
      if (props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION) {
        // Create initial structure for lower bracket
        lowerColumns.value = createLowerBracketStructure(upperColumns.value.length, props.defaultBestOf);
      }
    } else {
      // New format (upper and lower brackets)
      upperColumns.value = JSON.parse(JSON.stringify(props.initialState.upper || []));
      lowerColumns.value = JSON.parse(JSON.stringify(props.initialState.lower || []));
    }
  }
};

watch(() => props.initialState, () => {
  initializeTournament();
}, { deep: true });

watch(() => props.format, (newValue) => {
  if (newValue === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION && (!lowerColumns.value || lowerColumns.value.length === 0)) {
    lowerColumns.value = createLowerBracketStructure(upperColumns.value.length, props.defaultBestOf);
    emitTournamentState();
  }
});

onMounted(() => {
  initializeTournament();
});
</script>

<style scoped>

</style> 