<template>
  <div class="flex flex-col">
    <div class="text-xl font-bold text-gray-800 dark:text-white mb-4 px-5">Upper Bracket</div>
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
              :key="column.name"
              :column="column"
              :column-index="index"
              :available-teams="availableTeams"
              :selected-teams="selectedTeams"
              :highlighted-team="highlightedTeam"
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
import { TOURNAMENT_FORMAT, TBD, TEAM_POSITION } from '../constants/tournament';

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
  format: {
    type: String,
    default: TOURNAMENT_FORMAT.SINGLE_ELIMINATION,
    validator: (value) => Object.values(TOURNAMENT_FORMAT).includes(value)
  }
});

const upperColumns = ref([]);
const lowerColumns = ref([]);
const highlightedTeam = ref(null);

const selectedTeams = computed(() => {
  const teams = new Set();
  upperColumns.value.forEach(round => {
    round.items.forEach(match => {
      if (match[TEAM_POSITION.ONE].name !== TBD) teams.add(match[TEAM_POSITION.ONE].name);
      if (match[TEAM_POSITION.TWO].name !== TBD) teams.add(match[TEAM_POSITION.TWO].name);
    });
  });
  if (props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION) {
    lowerColumns.value.forEach(round => {
      round.items.forEach(match => {
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
  if (upperColumns.value[roundIndex] && upperColumns.value[roundIndex].items) {
    upperColumns.value[roundIndex].items[matchIndex] = updatedMatch;
    
    // Якщо є переможець, оновлюємо наступний раунд
    if (updatedMatch.winner && roundIndex < upperColumns.value.length - 1) {
      const nextRoundIndex = roundIndex + 1;
      const nextMatchIndex = Math.floor(matchIndex / 2);
      
      if (upperColumns.value[nextRoundIndex] && upperColumns.value[nextRoundIndex].items[nextMatchIndex]) {
        const nextMatch = upperColumns.value[nextRoundIndex].items[nextMatchIndex];
        const teamPosition = matchIndex % 2 === 0 ? TEAM_POSITION.ONE : TEAM_POSITION.TWO;
        const winningTeam = updatedMatch[updatedMatch.winner];
        
        upperColumns.value[nextRoundIndex].items[nextMatchIndex] = {
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

    // Якщо це Double Elimination і команда програла, додаємо її в нижню сітку
    if (props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION && updatedMatch.winner) {
      const losingTeam = updatedMatch[updatedMatch.winner === TEAM_POSITION.ONE ? TEAM_POSITION.TWO : TEAM_POSITION.ONE];
      if (losingTeam.name !== TBD) {
        // Знаходимо відповідний матч в нижній сітці
        const lowerRoundIndex = Math.floor(roundIndex / 2);
        const lowerMatchIndex = Math.floor(matchIndex / 2);
        
        if (lowerColumns.value[lowerRoundIndex] && lowerColumns.value[lowerRoundIndex].items[lowerMatchIndex]) {
          const lowerMatch = lowerColumns.value[lowerRoundIndex].items[lowerMatchIndex];
          const teamPosition = matchIndex % 2 === 0 ? TEAM_POSITION.ONE : TEAM_POSITION.TWO;
          
          lowerColumns.value[lowerRoundIndex].items[lowerMatchIndex] = {
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
      // Старий формат (тільки верхня сітка)
      upperColumns.value = JSON.parse(JSON.stringify(props.initialState));
      if (props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION) {
        // Створюємо початкову структуру для нижньої сітки
        lowerColumns.value = createLowerBracketStructure(upperColumns.value.length, props.defaultBestOf);
      }
    } else {
      // Новий формат (верхня і нижня сітки)
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