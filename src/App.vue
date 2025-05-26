<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Tournament Bracket</h1>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <label class="text-gray-700 dark:text-gray-300">Size:</label>
            <select v-model="selectedSize" class="border rounded p-1 bg-white dark:bg-gray-800 dark:text-white">
              <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-gray-700 dark:text-gray-300">Default Best of:</label>
            <select v-model="defaultBestOf" class="border rounded p-1 bg-white dark:bg-gray-800 dark:text-white">
              <option v-for="value in bestOfValues" :key="value" :value="value">{{ value }}</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-gray-700 dark:text-gray-300">Theme:</label>
            <button 
              @click="toggleTheme" 
              class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
          </div>
          <div class="flex items-center gap-2">
            <button 
              @click="clearState" 
              class="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              Clear State
            </button>
          </div>
        </div>
      </div>
      <div class="text-gray-700 dark:text-gray-300 mb-4">
        Total Matches: {{ totalMatches }}
      </div>
      <TournamentBracket 
        :initial-state="tournamentState" 
        :available-teams="teams"
        @update:state="updateTournamentState"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TournamentBracket from './components/TournamentBracket.vue';
import { createTournamentState, saveTournamentState, loadTournamentState } from './utils/tournament';

const sizes = [2, 4, 8, 16, 32, 64];
const bestOfValues = [1, 3, 5, 7, 9];
const selectedSize = ref(16);
const defaultBestOf = ref(3);
const isDark = ref(localStorage.getItem('theme') === 'dark');

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

const tournamentState = ref(loadTournamentState() || createTournamentState(selectedSize.value, defaultBestOf.value));

const totalMatches = computed(() => {
  if (!tournamentState.value) return 0;
  return tournamentState.value.reduce((total, round) => total + round.items.length, 0);
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Ініціалізуємо тему при завантаженні
updateTheme();

watch([selectedSize, defaultBestOf], () => {
  tournamentState.value = createTournamentState(selectedSize.value, defaultBestOf.value);
  saveTournamentState(tournamentState.value);
});

const updateTournamentState = (newState) => {
  tournamentState.value = newState;
  saveTournamentState(newState);
};

const clearState = () => {
  localStorage.removeItem('tournamentState');
  tournamentState.value = createTournamentState(selectedSize.value, defaultBestOf.value);
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light dark;
}
</style>