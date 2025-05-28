<template>
  <div class="relative text-[0.8em] flex items-center" :class="{'group': index % 2 == 0 && totalMatches > 1}">
    <div class="my-1.5 ml-2.5 bg-white dark:bg-gray-800 rounded overflow-hidden w-full min-w-[200px] shadow">
      <TeamRow
        :team="match.teamOne"
        :team-position="TEAM_POSITION.ONE"
        :available-teams="availableTeams"
        :selected-teams="selectedTeams"
        :can-edit="canEdit"
        :can-edit-score="canEditScore"
        :is-winner="isWinner(TEAM_POSITION.ONE)"
        :is-loser="isLoser(TEAM_POSITION.ONE)"
        :should-highlight="shouldHighlight(TEAM_POSITION.ONE)"
        :is-first-team="true"
        @update:team="updateTeam"
        @update:score="updateScore"
        @highlight-team="highlightTeam"
        @unhighlight-team="unhighlightTeam"
      />
      <TeamRow
        :team="match.teamTwo"
        :team-position="TEAM_POSITION.TWO"
        :available-teams="availableTeams"
        :selected-teams="selectedTeams"
        :can-edit="canEdit"
        :can-edit-score="canEditScore"
        :is-winner="isWinner(TEAM_POSITION.TWO)"
        :is-loser="isLoser(TEAM_POSITION.TWO)"
        :should-highlight="shouldHighlight(TEAM_POSITION.TWO)"
        @update:team="updateTeam"
        @update:score="updateScore"
        @highlight-team="highlightTeam"
        @unhighlight-team="unhighlightTeam"
      />
    </div>
    <div 
      v-if="index % 2 == 0 && totalMatches > 1" 
      class="absolute top-1/2 left-full w-2.5 h-[calc(100%+2px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[1px] mx-2 transition-colors duration-200"
    >
      <span class="w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block"></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import TeamRow from '../team/TeamRow.vue';
import { TBD, TEAM_POSITION } from '../../constants/tournament';

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

// Перевіряємо, чи можна редагувати матч (тільки перший раунд)
const canEdit = computed(() => props.roundIndex === 0);

// Перевіряємо, чи можна редагувати рахунок (коли обидві команди вибрані)
const canEditScore = computed(() => {
  return props.match[TEAM_POSITION.ONE].name !== TBD && props.match[TEAM_POSITION.TWO].name !== TBD;
});

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

const highlightTeam = (teamName) => {
  emit('highlight-team', teamName);
};

const unhighlightTeam = () => {
  emit('unhighlight-team');
};

const updateTeam = ({ position, team }) => {
  const updatedMatch = {
    ...props.match,
    [position]: team
  };
  emit('update:match', updatedMatch);
};

const updateScore = ({ position, score }) => {
  const updatedMatch = {
    ...props.match,
    [position]: {
      ...props.match[position],
      score: score
    }
  };

  // Визначаємо переможця на основі рахунку
  if (updatedMatch.teamOne.score > 0 || updatedMatch.teamTwo.score > 0) {
    updatedMatch.winner = updatedMatch.teamOne.score > updatedMatch.teamTwo.score ? TEAM_POSITION.ONE : TEAM_POSITION.TWO;
  } else {
    updatedMatch.winner = null;
  }

  emit('update:match', updatedMatch);
};
</script> 