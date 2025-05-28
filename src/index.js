import TournamentBracket from './components/TournamentBracket.vue';
import { createTournamentState, createLowerBracketStructure } from './utils/tournament';

import "./assets/css/style.css"

export { TournamentBracket, createTournamentState, createLowerBracketStructure };

export const install = (app) => {
  app.component('TournamentBracket', TournamentBracket);
}; 