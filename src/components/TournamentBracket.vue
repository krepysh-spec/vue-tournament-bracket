<template>
  <div class="flex flex-col">
    <div class="text-xl font-bold text-gray-800 dark:text-white mb-4">Upper Bracket</div>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="min-w-max">
          <BracketRoundHeaders 
            :columns="upperColumns" 
            @update:columns="updateUpperColumns"
            :permissions="permissions"
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
              @click-match="onMatchClick"
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

    <StandingsTable :standings="standingsData" :format="format" :TOURNAMENT_FORMAT="TOURNAMENT_FORMAT" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import BracketColumn from './bracket/BracketColumn.vue';
import BracketRoundHeaders from './bracket/BracketRoundHeaders.vue';
import BracketLower from './bracket/BracketLower.vue';
import { createLowerBracketStructure } from '../utils/tournament';
import { shuffleSwissPairs, getSwissStandings } from '../utils/tournament';
import { TOURNAMENT_FORMAT, TBD, TEAM_POSITION, PERMISSIONS } from '../constants/tournament';
import StandingsTable from './StandingsTable.vue';

const emit = defineEmits(['update:state', 'click-match']);

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
      [PERMISSIONS.CAN_SELECT_TEAM]: true,
      [PERMISSIONS.CAN_EDIT_ROUND_NAME]: true,
      [PERMISSIONS.CAN_EDIT_BEST_OF]: true
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

const swissStandings = computed(() => {
  if (props.format !== TOURNAMENT_FORMAT.SWISS) return [];
  return getSwissStandings(upperColumns.value);
});

const roundRobinStandings = computed(() => {
  if (props.format !== TOURNAMENT_FORMAT.ROUND_ROBIN) return [];
  // Standings для Round Robin: рахуємо перемоги, поразки, різницю очок
  const players = {};
  upperColumns.value.forEach(round => {
    round.matches.forEach(match => {
      [TEAM_POSITION.ONE, TEAM_POSITION.TWO].forEach(pos => {
        const t = match[pos];
        if (!t || !t.id) return;
        if (!players[t.id]) players[t.id] = { ...t, wins: 0, losses: 0, ties: 0, score: 0, ptsDiff: 0 };
      });
      const t1 = match[TEAM_POSITION.ONE];
      const t2 = match[TEAM_POSITION.TWO];
      if (t1 && t2 && t1.id && t2.id) {
        const s1 = t1.score || 0;
        const s2 = t2.score || 0;
        if (match.winner === TEAM_POSITION.ONE) {
          players[t1.id].wins++;
          players[t1.id].score += 1;
          players[t2.id].losses++;
        } else if (match.winner === TEAM_POSITION.TWO) {
          players[t2.id].wins++;
          players[t2.id].score += 1;
          players[t1.id].losses++;
        } else if (match.winner === null && (s1 > 0 || s2 > 0)) {
          players[t1.id].ties++;
          players[t2.id].ties++;
          players[t1.id].score += 0.5;
          players[t2.id].score += 0.5;
        }
        players[t1.id].ptsDiff += s1 - s2;
        players[t2.id].ptsDiff += s2 - s1;
      }
    });
  });
  const arr = Object.values(players).sort((a, b) =>
    b.score - a.score ||
    b.wins - a.wins ||
    b.ptsDiff - a.ptsDiff
  );
  arr.forEach((p, i) => { p.place = i + 1; });
  return arr;
});

const eliminationStandings = computed(() => {
  if (props.format === TOURNAMENT_FORMAT.SWISS || props.format === TOURNAMENT_FORMAT.ROUND_ROBIN) return [];
  // Standings для Single/Double Elimination: рахуємо перемоги, поразки, різницю очок
  const players = {};
  upperColumns.value.forEach(round => {
    round.matches.forEach(match => {
      [TEAM_POSITION.ONE, TEAM_POSITION.TWO].forEach(pos => {
        const t = match[pos];
        if (!t || !t.id) return;
        if (!players[t.id]) players[t.id] = { ...t, wins: 0, losses: 0, ties: 0, score: 0, ptsDiff: 0 };
      });
      const t1 = match[TEAM_POSITION.ONE];
      const t2 = match[TEAM_POSITION.TWO];
      if (t1 && t2 && t1.id && t2.id) {
        const s1 = t1.score || 0;
        const s2 = t2.score || 0;
        if (match.winner === TEAM_POSITION.ONE) {
          players[t1.id].wins++;
          players[t1.id].score += 1;
          players[t2.id].losses++;
        } else if (match.winner === TEAM_POSITION.TWO) {
          players[t2.id].wins++;
          players[t2.id].score += 1;
          players[t1.id].losses++;
        } else if (match.winner === null && (s1 > 0 || s2 > 0)) {
          players[t1.id].ties++;
          players[t2.id].ties++;
          players[t1.id].score += 0.5;
          players[t2.id].score += 0.5;
        }
        players[t1.id].ptsDiff += s1 - s2;
        players[t2.id].ptsDiff += s2 - s1;
      }
    });
  });
  // Якщо double elimination — враховуємо нижню сітку
  if (props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION && lowerColumns.value) {
    lowerColumns.value.forEach(round => {
      round.matches.forEach(match => {
        [TEAM_POSITION.ONE, TEAM_POSITION.TWO].forEach(pos => {
          const t = match[pos];
          if (!t || !t.id) return;
          if (!players[t.id]) players[t.id] = { ...t, wins: 0, losses: 0, ties: 0, score: 0, ptsDiff: 0 };
        });
        const t1 = match[TEAM_POSITION.ONE];
        const t2 = match[TEAM_POSITION.TWO];
        if (t1 && t2 && t1.id && t2.id) {
          const s1 = t1.score || 0;
          const s2 = t2.score || 0;
          if (match.winner === TEAM_POSITION.ONE) {
            players[t1.id].wins++;
            players[t1.id].score += 1;
            players[t2.id].losses++;
          } else if (match.winner === TEAM_POSITION.TWO) {
            players[t2.id].wins++;
            players[t2.id].score += 1;
            players[t1.id].losses++;
          } else if (match.winner === null && (s1 > 0 || s2 > 0)) {
            players[t1.id].ties++;
            players[t2.id].ties++;
            players[t1.id].score += 0.5;
            players[t2.id].score += 0.5;
          }
          players[t1.id].ptsDiff += s1 - s2;
          players[t2.id].ptsDiff += s2 - s1;
        }
      });
    });
  }
  const arr = Object.values(players).sort((a, b) =>
    b.score - a.score ||
    b.wins - a.wins ||
    b.ptsDiff - a.ptsDiff
  );
  arr.forEach((p, i) => { p.place = i + 1; });
  return arr;
});

const standingsData = computed(() => {
  if (props.format === TOURNAMENT_FORMAT.SWISS) return swissStandings.value;
  if (props.format === TOURNAMENT_FORMAT.ROUND_ROBIN) return roundRobinStandings.value;
  return eliminationStandings.value;
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

  // --- SWISS: якщо всі матчі у раунді завершені, формуємо наступний раунд ---
  if (props.format === TOURNAMENT_FORMAT.SWISS) {
    const currentRound = upperColumns.value[roundIndex];
    const allFinished = currentRound.matches.every(m => m.winner);
    if (allFinished && roundIndex < upperColumns.value.length - 1) {
      // 1. Збираємо всі команди та їх очки
      const teams = {};
      for (let r = 0; r <= roundIndex; r++) {
        upperColumns.value[r].matches.forEach(match => {
          ["teamOne", "teamTwo"].forEach(pos => {
            const t = match[pos];
            if (!t) return;
            if (!teams[t.id]) teams[t.id] = { ...t, score: 0 };
          });
          if (match.winner && match.teamOne && match.teamTwo) {
            if (match.winner === "teamOne") teams[match.teamOne.id].score += 1;
            if (match.winner === "teamTwo") teams[match.teamTwo.id].score += 1;
          }
        });
      }
      // 2. Збираємо всі попередні пари
      const previousPairs = [];
      for (let r = 0; r <= roundIndex; r++) {
        upperColumns.value[r].matches.forEach(match => {
          if (match.teamOne && match.teamTwo) previousPairs.push([match.teamOne.id, match.teamTwo.id]);
        });
      }
      // 3. Формуємо нові пари
      const teamArr = Object.values(teams);
      const pairs = shuffleSwissPairs(teamArr, previousPairs);
      // 4. Записуємо у наступний раунд
      const nextRound = upperColumns.value[roundIndex + 1];
      nextRound.matches = pairs.map((pair, i) => ({
        id: `swiss-match-${roundIndex + 2}-${i + 1}`,
        number: i + 1,
        teamOne: pair[0],
        teamTwo: pair[1],
        winner: null,
        date: null
      }));
    }
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
      } else if (props.format === TOURNAMENT_FORMAT.SWISS) {
        // Для Swiss нижня сітка не потрібна
        lowerColumns.value = [];
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

const onMatchClick = (payload) => {
  emit('click-match', payload);
};

onMounted(() => {
  initializeTournament();
});
</script>

<style scoped>

</style> 