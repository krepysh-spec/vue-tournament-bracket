<template>
  <div class="relative text-[0.8em] flex items-center" :class="{'group': index % 2 == 0 && totalMatches > 1}">
    <div class="flex flex-col w-full">
      <div class="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
        <input
          type="datetime-local" 
          :value="formatDateTimeForInput(match.date)" 
          @input="updateDate"
          class="input input-ghost input-sm"
          :disabled="!permissions[PERMISSIONS.CAN_EDIT_DATE]"
        />
      </div>
      <div class="my-1.5 ml-2.5 bg-white dark:bg-gray-900 rounded overflow-hidden w-full min-w-[200px] shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10" @click="onMatchClick">
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
          :can-select-team="canSelectTeam"
          :highlighted-team="highlightedTeam"
          :permissions="permissions"
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
          :can-select-team="canSelectTeam"
          :highlighted-team="highlightedTeam"
          :permissions="permissions"
          @update:team="updateTeam"
          @update:score="updateScore"
          @highlight-team="highlightTeam"
          @unhighlight-team="unhighlightTeam"
        />
      </div>
    </div>
    <div 
      v-if="index % 2 == 0 && totalMatches > 1" 
      class="absolute top-1/2 left-full w-2.5 h-[calc(100%+10px)] border-2 border-gray-300 dark:border-gray-600 border-l-0 rounded-r flex items-center z-10 -mt-[-10px] ml-[15px] mx-2 transition-colors duration-200"
    >
      <span class="w-2.5 h-0.5 bg-gray-300 dark:bg-gray-600 translate-x-full block"></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import TeamRow from '../team/TeamRow.vue';
import { TBD, TEAM_POSITION, PERMISSIONS } from '../../constants/tournament';

const props = defineProps({
  match: {
    type: Object,
    required: true,
    default: () => ({
      teamOne: { name: TBD, score: 0 },
      teamTwo: { name: TBD, score: 0 },
      winner: null,
      date: new Date().toISOString().split('T')[0] // Default to today's date
    })
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
  },
  permissions: {
    type: Object,
    required: true,
    default: () => ({
      [PERMISSIONS.CAN_SELECT_TEAM]: true,
      [PERMISSIONS.CAN_EDIT_DATE]: true,
      [PERMISSIONS.CAN_EDIT_SCOPE]: true
    })
  }
});

const emit = defineEmits(['update:match', 'highlight-team', 'unhighlight-team', 'click-match']);

// Check if we can edit the match (first round only)
const canEdit = computed(() => {
  return props.roundIndex === 0 && props.permissions[PERMISSIONS.CAN_SELECT_TEAM];
});

// Check if we can edit the score (when both teams are selected)
const canEditScore = computed(() => {
  return props.match[TEAM_POSITION.ONE].name !== TBD && 
         props.match[TEAM_POSITION.TWO].name !== TBD &&
         props.permissions[PERMISSIONS.CAN_EDIT_SCOPE];
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
  
  // Determine the winner based on the score
  if (updatedMatch[TEAM_POSITION.ONE].score > updatedMatch[TEAM_POSITION.TWO].score) {
    updatedMatch.winner = TEAM_POSITION.ONE;
  } else if (updatedMatch[TEAM_POSITION.TWO].score > updatedMatch[TEAM_POSITION.ONE].score) {
    updatedMatch.winner = TEAM_POSITION.TWO;
  } else {
    updatedMatch.winner = null;
  }
  
  emit('update:match', updatedMatch);
};

const formatDateTimeForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
};

const updateDate = (event) => {
  const updatedMatch = {
    ...props.match,
    date: event.target.value
  };
  emit('update:match', updatedMatch);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const onMatchClick = (event) => {
  const tag = event.target.tagName.toLowerCase();
  if (tag === 'input' || tag === 'select' || tag === 'option' || tag === 'button' || event.target.closest('input,select,option,button')) return;

  const allPermissionsOff =
    !props.permissions[PERMISSIONS.CAN_SELECT_TEAM] &&
    !props.permissions[PERMISSIONS.CAN_EDIT_DATE] &&
    !props.permissions[PERMISSIONS.CAN_EDIT_SCOPE];
  if (!allPermissionsOff) return;

  emit('click-match', {
    match: props.match,
    roundIndex: props.roundIndex,
    matchIndex: props.index,
    id: props.match.id ?? null
  });
};
</script> 