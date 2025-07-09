<template>
  <div class="flex flex-col">
    <BracketSection
      title="Upper Bracket"
      :columns="upperColumns"
      :available-teams="availableTeams"
      :selected-teams="selectedTeams"
      :highlighted-team="highlightedTeam"
      :permissions="permissions"
      :on-match-update="updateUpperMatch"
      :on-columns-update="updateUpperColumns"
      :on-highlight="highlightTeam"
      :on-unhighlight="unhighlightTeam"
      :on-click-match="onMatchClick"
    />

    <BracketSection
      v-if="format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION"
      title="Lower Bracket"
      :columns="lowerColumns"
      :available-teams="availableTeams"
      :selected-teams="selectedTeams"
      :highlighted-team="highlightedTeam"
      :permissions="permissions"
      bordered
      :on-match-update="updateLowerState"
      :on-columns-update="updateLowerState"
      :on-highlight="highlightTeam"
      :on-unhighlight="unhighlightTeam"
    />

    <StandingsTable
      :standings="standingsData"
      :format="format"
      :tournament-format="TOURNAMENT_FORMAT"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import BracketColumn from "./bracket/BracketColumn.vue";
import BracketRoundHeaders from "./bracket/BracketRoundHeaders.vue";
import BracketSection from "./bracket/BracketSection.vue";
import { createLowerBracketStructure } from "../utils/bracketGenerators";
import {
  TOURNAMENT_FORMAT,
  TBD,
  TEAM_POSITION,
  PERMISSIONS,
} from "../constants/tournament";
import StandingsTable from "./StandingsTable.vue";
import { useStandings } from "../composables/useStandings";
import { useBracket } from "../composables/useBracket";
import LocalStorageTournament from "../storage/LocalStorageTournament";

const emit = defineEmits(["update:state", "click-match"]);

const props = defineProps({
  initialState: {
    type: Object,
    required: true,
  },
  availableTeams: {
    type: Array,
    required: true,
  },
  defaultBestOf: {
    type: Number,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  permissions: {
    type: Object,
    default: () => ({
      [PERMISSIONS.CAN_SELECT_TEAM]: true,
      [PERMISSIONS.CAN_EDIT_ROUND_NAME]: true,
      [PERMISSIONS.CAN_EDIT_BEST_OF]: true,
    }),
  },
});

const upperColumns = ref([]);
const lowerColumns = ref([]);
const highlightedTeam = ref(null);

const selectedTeams = computed(() => {
  const teams = new Set();
  upperColumns.value.forEach((round) => {
    round.matches.forEach((match) => {
      if (match[TEAM_POSITION.ONE].name !== TBD)
        teams.add(match[TEAM_POSITION.ONE].name);
      if (match[TEAM_POSITION.TWO].name !== TBD)
        teams.add(match[TEAM_POSITION.TWO].name);
    });
  });
  if (props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION) {
    lowerColumns.value.forEach((round) => {
      round.matches.forEach((match) => {
        if (match[TEAM_POSITION.ONE].name !== TBD)
          teams.add(match[TEAM_POSITION.ONE].name);
        if (match[TEAM_POSITION.TWO].name !== TBD)
          teams.add(match[TEAM_POSITION.TWO].name);
      });
    });
  }
  return Array.from(teams);
});

const standingsData = computed(() => {
  return useStandings({
    upperColumns: upperColumns.value,
    lowerColumns: lowerColumns.value,
    format: props.format,
    TOURNAMENT_FORMAT,
    TEAM_POSITION,
    TBD,
  });
});

const highlightTeam = (teamName) => {
  highlightedTeam.value = teamName;
};

const unhighlightTeam = () => {
  highlightedTeam.value = null;
};

const onMatchClick = (payload) => {
  emit("click-match", payload);
};

const storage = new LocalStorageTournament();

const {
  updateUpperMatch,
  updateUpperColumns,
  updateLowerState,
  emitTournamentState,
  initializeTournament,
} = useBracket({
  upperColumns,
  lowerColumns,
  props,
  emit,
  TOURNAMENT_FORMAT,
  TEAM_POSITION,
  TBD,
});

watch(
  () => props.initialState,
  () => {
    initializeTournament();
  },
  { deep: true },
);

watch(
  () => props.format,
  (newValue) => {
    if (
      newValue === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION &&
      (!lowerColumns.value || lowerColumns.value.length === 0)
    ) {
      lowerColumns.value = createLowerBracketStructure(
        upperColumns.value.length,
        props.defaultBestOf,
      );
      emitTournamentState();
    }
  },
);

onMounted(() => {
  initializeTournament();
});
</script>

<style scoped></style>
