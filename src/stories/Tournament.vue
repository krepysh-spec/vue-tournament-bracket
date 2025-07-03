<script setup>
import { ref } from 'vue';
import "../assets/css/style.css"
import TournamentBracket from "../components/TournamentBracket.vue";
import { createTournamentState } from '../utils/tournament';
import {PERMISSIONS} from "../constants/tournament.js";

const props = defineProps({
  size: {
    type: Number,
    required: 16,
  },
  defaultBestOf: {
    type: Number,
    default: 1,
  },
  format: {
    type: String,
    // validator: function (value) {
    //   return ['small', 'medium', 'large'].indexOf(value) !== -1;
    // },
  },
})

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

const permissions = ref({
  [PERMISSIONS.CAN_SELECT_TEAM] : true,
  [PERMISSIONS.CAN_EDIT_DATE]: true,
  [PERMISSIONS.CAN_EDIT_SCOPE]: true,
  [PERMISSIONS.CAN_EDIT_ROUND_NAME]: true,
  [PERMISSIONS.CAN_EDIT_BEST_OF]: true
});

const tournamentState = ref(createTournamentState(16, 1));

</script>

<template>
  <tournament-bracket
      :format="format"
      :default-best-of="3"
      :available-teams="teams"
      :initial-state="tournamentState"
      :permissions="permissions"/>
</template>

<style scoped>

</style>