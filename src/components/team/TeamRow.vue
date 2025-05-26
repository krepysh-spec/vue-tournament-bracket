<template>
  <div class="flex">
    <TeamSelect
      :team="team"
      :team-position="teamPosition"
      :available-teams="availableTeams"
      :selected-teams="selectedTeams"
      :can-edit="canEdit"
      :is-winner="isWinner"
      :is-loser="isLoser"
      :should-highlight="shouldHighlight"
      @update:team="$emit('update:team', $event)"
      @highlight-team="$emit('highlight-team', $event)"
      @unhighlight-team="$emit('unhighlight-team')"
    />
    <TeamScoreInput
      :team="team"
      :team-position="teamPosition"
      :can-edit-score="canEditScore"
      :is-first-team="isFirstTeam"
      @update:score="$emit('update:score', $event)"
    />
  </div>
</template>

<script setup>
import TeamSelect from './TeamSelect.vue';
import TeamScoreInput from './TeamScoreInput.vue';

defineProps({
  team: {
    type: Object,
    required: true
  },
  teamPosition: {
    type: String,
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
  canEdit: {
    type: Boolean,
    required: true
  },
  canEditScore: {
    type: Boolean,
    required: true
  },
  isWinner: {
    type: Boolean,
    default: false
  },
  isLoser: {
    type: Boolean,
    default: false
  },
  shouldHighlight: {
    type: Boolean,
    default: false
  },
  isFirstTeam: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:team', 'update:score', 'highlight-team', 'unhighlight-team']);
</script> 