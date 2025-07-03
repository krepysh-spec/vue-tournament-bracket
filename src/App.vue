<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
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
            <label class="text-gray-700 dark:text-gray-300">Format:</label>
            <select 
              v-model="tournamentFormat" 
              class="border rounded p-1 bg-white dark:bg-gray-800 dark:text-white"
            >
              <option value="single_elimination">Single Elimination</option>
              <option value="double_elimination">Double Elimination</option>
              <option value="swiss">Swiss</option>
              <option value="round_robin">Round Robin</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-gray-700 dark:text-gray-300">Team Selection:</label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permissions[PERMISSIONS.CAN_SELECT_TEAM]" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">{{ permissions[PERMISSIONS.CAN_SELECT_TEAM] ? 'Enabled' : 'Disabled' }}</span>
            </label>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-gray-700 dark:text-gray-300">Date Editing:</label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permissions[PERMISSIONS.CAN_EDIT_DATE]" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">{{ permissions[PERMISSIONS.CAN_EDIT_DATE] ? 'Enabled' : 'Disabled' }}</span>
            </label>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-gray-700 dark:text-gray-300">Scope Editing:</label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permissions[PERMISSIONS.CAN_EDIT_SCOPE]" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">{{ permissions[PERMISSIONS.CAN_EDIT_SCOPE] ? 'Enabled' : 'Disabled' }}</span>
            </label>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-gray-700 dark:text-gray-300">Round Name Editing:</label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permissions[PERMISSIONS.CAN_EDIT_ROUND_NAME]" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">{{ permissions[PERMISSIONS.CAN_EDIT_ROUND_NAME] ? 'Enabled' : 'Disabled' }}</span>
            </label>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-gray-700 dark:text-gray-300">Best Of Editing:</label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permissions[PERMISSIONS.CAN_EDIT_BEST_OF]" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">{{ permissions[PERMISSIONS.CAN_EDIT_BEST_OF] ? 'Enabled' : 'Disabled' }}</span>
            </label>
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
        :default-best-of="defaultBestOf"
        :format="tournamentFormat"
        :permissions="permissions"
        @update:state="updateTournamentState"
        @click-match="onMatchClick"
      />
  </div>
</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import TournamentBracket from './components/TournamentBracket.vue';
import { createTournamentState, createSwissTournamentState, createRoundRobinTournamentState } from './utils/tournament';
import { PERMISSIONS } from './constants/tournament';

const sizes = [2, 4, 8, 16, 32, 64];
const bestOfValues = [1, 3, 5, 7, 9];
const selectedSize = ref(16);
const defaultBestOf = ref(3);
const isDark = ref(localStorage.getItem('theme') === 'dark');
const tournamentFormat = ref(localStorage.getItem('tournamentFormat') || 'single_elimination');
const permissions = ref({
  [PERMISSIONS.CAN_SELECT_TEAM]: localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions'))[PERMISSIONS.CAN_SELECT_TEAM] !== false : true,
  [PERMISSIONS.CAN_EDIT_DATE]: localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions'))[PERMISSIONS.CAN_EDIT_DATE] !== false : true,
  [PERMISSIONS.CAN_EDIT_SCOPE]: localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions'))[PERMISSIONS.CAN_EDIT_SCOPE] !== false : true,
  [PERMISSIONS.CAN_EDIT_ROUND_NAME]: localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions'))[PERMISSIONS.CAN_EDIT_ROUND_NAME] !== false : true,
  [PERMISSIONS.CAN_EDIT_BEST_OF]: localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions'))[PERMISSIONS.CAN_EDIT_BEST_OF] !== false : true
});

const teams = ref([
  {id: 1, name: 'Alpha', logo: 'https://www.gravatar.com/avatar/1?d=identicon&s=32'},
  {id: 2, name: 'Beta', logo: 'https://www.gravatar.com/avatar/2?d=identicon&s=32'},
  {id: 3, name: 'Gamma', logo: 'https://www.gravatar.com/avatar/3?d=identicon&s=32'},
  {id: 4, name: 'Delta', logo: 'https://www.gravatar.com/avatar/4?d=identicon&s=32'},
  {id: 5, name: 'Epsilon', logo: 'https://www.gravatar.com/avatar/5?d=identicon&s=32'},
  {id: 6, name: 'Zeta', logo: 'https://www.gravatar.com/avatar/6?d=identicon&s=32'},
  {id: 7, name: 'Eta', logo: 'https://www.gravatar.com/avatar/7?d=identicon&s=32'},
  {id: 8, name: 'Theta', logo: 'https://www.gravatar.com/avatar/8?d=identicon&s=32'},
  {id: 9, name: 'Iota', logo: 'https://www.gravatar.com/avatar/9?d=identicon&s=32'},
  {id: 10, name: 'Kappa', logo: 'https://www.gravatar.com/avatar/10?d=identicon&s=32'},
  {id: 11, name: 'Lambda', logo: 'https://www.gravatar.com/avatar/11?d=identicon&s=32'},
  {id: 12, name: 'Mu', logo: 'https://www.gravatar.com/avatar/12?d=identicon&s=32'},
  {id: 13, name: 'Nu', logo: 'https://www.gravatar.com/avatar/13?d=identicon&s=32'},
  {id: 14, name: 'Xi', logo: 'https://www.gravatar.com/avatar/14?d=identicon&s=32'},
  {id: 15, name: 'Omicron', logo: 'https://www.gravatar.com/avatar/15?d=identicon&s=32'},
  {id: 16, name: 'Pi', logo: 'https://www.gravatar.com/avatar/16?d=identicon&s=32'},
]);

const tournamentState = ref(getInitialTournamentState(selectedSize.value, defaultBestOf.value, tournamentFormat.value));

function getInitialTournamentState(size, bestOf, format) {
  if (format === 'swiss') {
    return createSwissTournamentState(size, undefined, bestOf, teams.value);
  }
  if (format === 'round_robin') {
    return createRoundRobinTournamentState(size, bestOf, teams.value);
  }
  return createTournamentState(size, bestOf);
}

const totalMatches = computed(() => {
  if (!tournamentState.value) return 0;
  if (Array.isArray(tournamentState.value)) {
    return tournamentState.value.reduce((total, round) => total + round.matches.length, 0);
  }
  return (tournamentState.value.upper?.reduce((total, round) => total + round.matches.length, 0) || 0) +
         (tournamentState.value.lower?.reduce((total, round) => total + round.matches.length, 0) || 0);
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

watch(tournamentFormat, (newValue) => {
  localStorage.setItem('tournamentFormat', newValue);
  clearState();
});

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Initialize theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  isDark.value = savedTheme === 'dark';
}

watch([selectedSize, defaultBestOf, tournamentFormat], () => {
  clearState();
});

watch(permissions, (newValue) => {
  localStorage.setItem('permissions', JSON.stringify(newValue));
}, { deep: true });

const updateTournamentState = (newState) => {
  console.log('Saving tournament state:', newState);
  tournamentState.value = newState;
  localStorage.setItem('tournamentState', JSON.stringify(tournamentState.value));
};

const clearState = () => {
  console.log('Clearing tournament state');
  localStorage.removeItem('tournamentState');
  tournamentState.value = getInitialTournamentState(selectedSize.value, defaultBestOf.value, tournamentFormat.value);
};

// Load state on initialization
const savedState = localStorage.getItem('tournamentState');
if (savedState) {
  try {
    const parsedState = JSON.parse(savedState);
    if (Array.isArray(parsedState)) {
      // If it's the old format (array), convert to new format
      tournamentState.value = {
        upper: parsedState,
        lower: null
      };
    } else {
      tournamentState.value = parsedState;
    }
  } catch (error) {
    console.error('Error loading tournament state:', error);
  }
}

const onMatchClick = (payload) => {
  // payload: { match, roundIndex, matchIndex, id }
  alert(`Click\nRound: ${payload.roundIndex + 1}, Матч: ${payload.matchIndex + 1}\nКоманди: ${payload.match.teamOne.name} vs ${payload.match.teamTwo.name}\nID: ${payload.id}`);
};
</script>

<style>

</style>