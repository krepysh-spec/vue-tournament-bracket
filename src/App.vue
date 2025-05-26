<template>
  <div class="min-h-screen bg-[#27272b] text-white">
    <div class="p-4">
      <div class="flex gap-4 mb-4">
        <select v-model="selectedSize" class="bg-[#444444] p-2 rounded">
          <option v-for="size in availableSizes" :key="size" :value="size">
            {{size}} Teams
          </option>
        </select>
        <select v-model="defaultBestOf" class="bg-[#444444] p-2 rounded">
          <option v-for="value in bestOfValues" :key="value" :value="value">
            Best of {{ value }}
          </option>
        </select>
      </div>
      
      <TournamentBracket 
        :initial-state="tournamentState"
        :available-teams="teams"
        :default-best-of="defaultBestOf"
        @update:tournament-state="updateTournamentState"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import TournamentBracket from './components/TournamentBracket.vue';
import { createTournamentState, saveTournamentState, loadTournamentState } from './utils/tournament';

const availableSizes = [2, 4, 8, 16, 32];
const bestOfValues = [1, 3, 5, 7, 9];
const selectedSize = ref(16);
const defaultBestOf = ref(3);
const tournamentState = ref([]);

const teams = ref([
  {id: 1, name: 'Alpha'},{id: 2, name: 'Beta'},
  {id: 3, name: 'Gamma'},{id: 4, name: 'Delta'},
  {id: 5, name: 'Epsilon'},{id: 6, name: 'Zeta'},
  {id: 7, name: 'Eta'},{id: 8, name: 'Theta'},
  {id: 9, name: 'Iota'},{id: 10, name: 'Kappa'},
  {id: 11, name: 'Lambda'},{id: 12, name: 'Mu'},
  {id: 13, name: 'Nu'},{id: 14, name: 'Xi'},
  {id: 15, name: 'Omicron'},{id: 16, name: 'Pi'},
]);

const updateTournamentState = (state) => {
  tournamentState.value = JSON.parse(JSON.stringify(state));
   saveTournamentState(state);
};

const loadInitialState = () => {
  const savedState = loadTournamentState();
  if (savedState) {
    tournamentState.value = savedState;
  } else {
    tournamentState.value = createTournamentState(selectedSize.value, defaultBestOf.value);
  }
};

watch([selectedSize, defaultBestOf], ([newSize, newBestOf]) => {
  tournamentState.value = createTournamentState(newSize, newBestOf);
  localStorage.removeItem('tournamentState');
});

onMounted(() => {
  loadInitialState();
});

const totalMatches = computed(() => {
  return tournamentState.value.reduce((sum, round) => sum + round.items.length, 0);
});
</script>