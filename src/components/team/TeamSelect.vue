<template>
  <div
    class="flex-grow p-2.5 hover:bg-gray-200/30 dark:hover:bg-gray-950/20"
    :class="{
      'hover:bg-green-500/20 dark:hover:bg-green-500/20': isWinner,
      'hover:bg-red-500/20 dark:hover:bg-red-500/20': isLoser,
      'bg-green-500/20 dark:bg-green-500/20': shouldHighlight && isWinner,
      'bg-red-500/20 dark:bg-red-500/20': shouldHighlight && isLoser,
    }"
    @mouseenter="highlightTeam"
    @mouseleave="unhighlightTeam"
  >
    <div
      v-if="canEdit && permissions[PERMISSIONS.CAN_SELECT_TEAM]"
      class="flex items-center gap-2"
    >
      <img
        v-if="selectedTeamLogo"
        :src="selectedTeamLogo"
        :alt="selectedTeam"
        class="w-6 h-6 rounded-full"
      />
      <select
        v-model="selectedTeam"
        class="form-input max-w-sm block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        @change="updateTeam"
      >
        <option value="TBD">TBD</option>
        <option
          v-for="teamOption in availableTeamsForSelection"
          :key="teamOption.id"
          :value="teamOption.name"
          :disabled="isTeamSelected(teamOption.name)"
        >
          {{ teamOption.name }}
        </option>
      </select>
    </div>
    <template v-else>
      <div class="flex items-center gap-2">
        <img
          v-if="team.logo"
          :src="team.logo"
          :alt="team.name"
          class="w-6 h-6 rounded-full"
        />
        <span class="text-gray-900 dark:text-white">{{ team.name }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { TBD, PERMISSIONS } from "../../constants/tournament";

const props = defineProps({
  team: {
    type: Object,
    required: true,
  },
  teamPosition: {
    type: String,
    required: true,
  },
  availableTeams: {
    type: Array,
    required: true,
  },
  selectedTeams: {
    type: Array,
    required: true,
  },
  canEdit: {
    type: Boolean,
    required: true,
  },
  highlightedTeam: {
    type: Number,
    default: null,
  },
  permissions: {
    type: Object,
    default: () => ({
      [PERMISSIONS.CAN_SELECT_TEAM]: true,
    }),
  },
  isWinner: {
    type: Boolean,
    default: false,
  },
  isLoser: {
    type: Boolean,
    default: false,
  },
  shouldHighlight: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:team", "highlight-team", "unhighlight-team"]);

const selectedTeam = ref(props.team.name);
const selectedTeamLogo = computed(() => {
  if (selectedTeam.value === TBD) return null;
  return (
    props.availableTeams.find((t) => t.name === selectedTeam.value)?.logo ||
    null
  );
});

watch(
  () => props.team,
  (newTeam) => {
    selectedTeam.value = newTeam.name;
  },
  { immediate: true },
);

onMounted(() => {
  console.log("TeamSelect mounted:", {
    team: props.team,
    availableTeams: props.availableTeams,
  });
});

const isTeamSelected = (teamName) => {
  if (teamName === TBD) return false;
  return (
    (props.selectedTeams.includes(teamName) && teamName !== props.team.name) ||
    (teamName === props.team.name && props.team.name !== TBD)
  );
};

const availableTeamsForSelection = computed(() => {
  if (!props.availableTeams) return [];
  return props.availableTeams.filter((team) => {
    if (team.name === TBD) return true;
    if (team.name === props.team.name) {
      return true;
    }
    return !isTeamSelected(team.name);
  });
});

const highlightTeam = () => {
  if (props.team.name !== TBD) {
    emit("highlight-team", props.team.name);
  }
};

const unhighlightTeam = () => {
  emit("unhighlight-team");
};

const updateTeam = () => {
  const selectedTeamData = props.availableTeams.find(
    (t) => t.name === selectedTeam.value,
  );
  console.log("Updating team:", {
    selectedTeam: selectedTeam.value,
    selectedTeamData,
  });
  emit("update:team", {
    position: props.teamPosition,
    team: {
      id: selectedTeamData?.id || null,
      name: selectedTeam.value,
      logo: selectedTeamData?.logo || null,
      score: 0,
    },
  });
};
</script>
