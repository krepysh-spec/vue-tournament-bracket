import { TBD, TEAM_POSITION } from "../constants/tournament";
// Delegate bracket/match generation to bracketGenerators.js
import {
  createEmptyTeam,
  createEmptyMatch,
  createTournamentState,
  createLowerBracketStructure,
  createSwissTournamentState as createSwissTournamentStateGen,
  createRoundRobinTournamentState as createRoundRobinTournamentStateGen,
} from "./bracketGenerators";
// Delegate pairing logic to pairing.js
import { shuffleSwissPairs } from "./pairing";
// Delegate standings logic to standings.js
import { getSwissStandings } from "./standings";

// Returns the next match index for upper/lower bracket
export const getNextMatchIndex = (currentMatchIndex, isUpperBracket = true) => {
  return Math.floor(currentMatchIndex / 2);
};

// Returns the next round index for upper/lower bracket
export const getNextRoundIndex = (currentRoundIndex, isUpperBracket = true) => {
  return currentRoundIndex + 1;
};

// Returns the lower bracket match index
export const getLowerBracketMatchIndex = (upperRoundIndex, upperMatchIndex) => {
  return Math.floor(upperMatchIndex / 2);
};

// Returns the lower bracket round index
export const getLowerBracketRoundIndex = (upperRoundIndex) => {
  return Math.floor(upperRoundIndex / 2);
};

export { createSwissTournamentStateGen as createSwissTournamentState };
export { createRoundRobinTournamentStateGen as createRoundRobinTournamentState };
