<template>
  <div class="relative text-[0.8em] flex items-center" :class="{'group': index % 2 == 0 && totalMatches > 1}">
    <div class="my-1.5 ml-2.5 bg-[#444444] rounded overflow-hidden w-full min-w-[200px]">
      <div class="flex">
        <div 
          class="flex-grow p-2.5 hover:bg-[#5a5a5a] border-b border-white/10 cursor-pointer transition-colors duration-200"
          :class="{
            'hover:bg-green-900/30': isWinner('teamOne'),
            'hover:bg-red-900/30': isLoser('teamOne'),
            'bg-green-900/30': shouldHighlight('teamOne') && isWinner('teamOne'),
            'bg-red-900/30': shouldHighlight('teamOne') && isLoser('teamOne')
          }"
          @click="canEdit && selectTeam('teamOne')"
          @mouseenter="highlightTeam('teamOne')"
          @mouseleave="unhighlightTeam"
        >
          <select 
            v-if="isEditing === 'teamOne' && canEdit"
            v-model="selectedTeamOne"
            class="bg-[#444444] w-full"
            @change="updateTeam('teamOne', selectedTeamOne)"
            @blur="isEditing = null"
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
            {{match.teamOne.name}}
            <div 
              v-if="selectedTeam === 'teamOne'"
              class="inline-block w-2 h-2 bg-blue-500 rounded-full ml-2"
            ></div>
          </template>
        </div>
        <div 
          class="p-2.5 bg-[#d66f00] border-b border-[#c35824] cursor-pointer"
          @click="canEditScore && selectScore('teamOne')"
        >
          <input 
            v-if="isEditingScore === 'teamOne' && canEditScore"
            type="number"
            v-model="scoreOne"
            class="w-12 bg-[#d66f00] text-center"
            min="0"
            @change="updateScore('teamOne', scoreOne)"
            @blur="isEditingScore = null"
          />
          <template v-else>
            {{match.teamOne.score}}
          </template>
        </div>
      </div>
      <div class="flex">
        <div 
          class="flex-grow p-2.5 hover:bg-[#5a5a5a] cursor-pointer transition-colors duration-200"
          :class="{
            'hover:bg-green-900/30': isWinner('teamTwo'),
            'hover:bg-red-900/30': isLoser('teamTwo'),
            'bg-green-900/30': shouldHighlight('teamTwo') && isWinner('teamTwo'),
            'bg-red-900/30': shouldHighlight('teamTwo') && isLoser('teamTwo')
          }"
          @click="canEdit && selectTeam('teamTwo')"
          @mouseenter="highlightTeam('teamTwo')"
          @mouseleave="unhighlightTeam"
        >
          <select 
            v-if="isEditing === 'teamTwo' && canEdit"
            v-model="selectedTeamTwo"
            class="bg-[#444444] w-full"
            @change="updateTeam('teamTwo', selectedTeamTwo)"
            @blur="isEditing = null"
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
            {{match.teamTwo.name}}
            <div 
              v-if="selectedTeam === 'teamTwo'"
              class="inline-block w-2 h-2 bg-blue-500 rounded-full ml-2"
            ></div>
          </template>
        </div>
        <div 
          class="p-2.5 bg-[#d66f00] cursor-pointer"
          @click="canEditScore && selectScore('teamTwo')"
        >
          <input 
            v-if="isEditingScore === 'teamTwo' && canEditScore"
            type="number"
            v-model="scoreTwo"
            class="w-12 bg-[#d66f00] text-center"
            min="0"
            @change="updateScore('teamTwo', scoreTwo)"
            @blur="isEditingScore = null"
          />
          <template v-else>
            {{match.teamTwo.score}}
          </template>
        </div>
      </div>
    </div>
    <div 
      v-if="index % 2 == 0 && totalMatches > 1" 
      class="absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-white border-l-0 rounded-r flex items-center z-10 -mt-[1px] mx-2 transition-colors duration-200"
    >
      <span class="w-2.5 h-0.5 bg-white translate-x-full block"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  match: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  totalMatches: {
    type: Number,
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
  roundIndex: {
    type: Number,
    required: true
  },
  highlightedTeam: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['update:match', 'highlight-team', 'unhighlight-team']);

const selectedTeam = ref(null);
const isEditing = ref(null);
const isEditingScore = ref(null);
const selectedTeamOne = ref(props.match.teamOne.name);
const selectedTeamTwo = ref(props.match.teamTwo.name);
const scoreOne = ref(props.match.teamOne.score ?? 0);
const scoreTwo = ref(props.match.teamTwo.score ?? 0);

// Перевіряємо, чи можна редагувати матч (тільки перший раунд)
const canEdit = computed(() => props.roundIndex === 0);

// Перевіряємо, чи можна редагувати рахунок (коли обидві команди вибрані)
const canEditScore = computed(() => {
  return props.match.teamOne.name !== 'TBD' && props.match.teamTwo.name !== 'TBD';
});

const isTeamSelected = (teamName) => {
  if (teamName === 'TBD') return false;
  return (props.selectedTeams.includes(teamName) && 
         teamName !== props.match.teamOne.name && 
         teamName !== props.match.teamTwo.name) ||
         (teamName === props.match.teamOne.name && props.match.teamOne.name !== 'TBD') ||
         (teamName === props.match.teamTwo.name && props.match.teamTwo.name !== 'TBD');
};

const isWinner = (teamPosition) => {
  return props.match.winner === teamPosition;
};

const isLoser = (teamPosition) => {
  return props.match.winner && props.match.winner !== teamPosition;
};

const shouldHighlight = (teamPosition) => {
  const teamName = props.match[teamPosition].name;
  return props.highlightedTeam === teamName;
};

const highlightTeam = (teamPosition) => {
  const teamName = props.match[teamPosition].name;
  if (teamName !== 'TBD') {
    emit('highlight-team', teamName);
  }
};

const unhighlightTeam = () => {
  emit('unhighlight-team');
};

const availableTeamsForSelection = computed(() => {
  return props.availableTeams.filter(team => {
    if (team.name === 'TBD') return true;
    if (team.name === props.match.teamOne.name || team.name === props.match.teamTwo.name) {
      return true;
    }
    return !isTeamSelected(team.name);
  });
});

const selectTeam = (team) => {
  if (!canEdit.value) return;
  selectedTeam.value = team;
  isEditing.value = team;
};

const selectScore = (team) => {
  if (!canEditScore.value) return;
  isEditingScore.value = team;
};

const updateTeam = (teamPosition, teamName) => {
  const updatedMatch = {
    ...props.match,
    [teamPosition]: {
      id: props.availableTeams.find(t => t.name === teamName)?.id || null,
      name: teamName,
      score: 0
    }
  };
  emit('update:match', updatedMatch);
};

const updateScore = (teamPosition, score) => {
  const updatedMatch = {
    ...props.match,
    [teamPosition]: {
      ...props.match[teamPosition],
      score: parseInt(score) || 0
    }
  };
  
  // Оновлюємо локальні значення рахунку
  if (teamPosition === 'teamOne') {
    scoreOne.value = parseInt(score) || 0;
  } else {
    scoreTwo.value = parseInt(score) || 0;
  }
  
  emit('update:match', updatedMatch);
};

// Відстежуємо зміни в match для оновлення рахунку
watch(() => props.match, (newMatch) => {
  scoreOne.value = newMatch.teamOne.score ?? 0;
  scoreTwo.value = newMatch.teamTwo.score ?? 0;
}, { deep: true });

// Відстежуємо зміни в рахунку
watch([scoreOne, scoreTwo], ([newScoreOne, newScoreTwo]) => {
  if (newScoreOne > 0 || newScoreTwo > 0) {
    const winner = newScoreOne > newScoreTwo ? 'teamOne' : 'teamTwo';
    const updatedMatch = {
      ...props.match,
      teamOne: {
        ...props.match.teamOne,
        score: newScoreOne
      },
      teamTwo: {
        ...props.match.teamTwo,
        score: newScoreTwo
      },
      winner: winner
    };
    emit('update:match', updatedMatch);
  }
});
</script> 