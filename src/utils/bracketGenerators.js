// bracketGenerators.js
// Bracket and match generation utilities for tournaments
import { TBD, TEAM_POSITION } from "../constants/tournament";

/**
 * Returns an empty team object
 */
export const createEmptyTeam = () => ({
  id: null,
  name: TBD,
  logo: null,
  score: 0,
});

/**
 * Returns an empty match object
 * @param {number} number
 */
export const createEmptyMatch = (number) => ({
  id: `match-${number}`,
  number,
  [TEAM_POSITION.ONE]: createEmptyTeam(),
  [TEAM_POSITION.TWO]: createEmptyTeam(),
  winner: null,
  date: null,
});

/**
 * Returns an array of team objects
 * @param {number} teamCount
 * @param {Array|null} availableTeams
 * @param {boolean} withScore
 * @returns {Array}
 */
function getTeamsArray(teamCount, availableTeams = null, withScore = false) {
  if (Array.isArray(availableTeams) && availableTeams.length >= teamCount) {
    let teams = [...availableTeams].slice(0, teamCount);
    if (withScore) teams = teams.map((t) => ({ ...t, score: 0 }));
    return teams;
  }
  return Array.from({ length: teamCount }, (_, i) => ({
    id: i + 1,
    name: `Team ${i + 1}`,
    logo: null,
    ...(withScore ? { score: 0 } : {}),
  }));
}

/**
 * Generates an array of empty matches
 * @param {number} count
 * @param {function(number): object} matchFactory
 * @returns {Array}
 */
function generateEmptyMatches(count, matchFactory) {
  return Array.from({ length: count }, (_, i) => matchFactory(i));
}

/**
 * Generates single elimination bracket columns
 * @param {number} teamCount
 * @param {number} defaultBestOf
 * @returns {Array}
 */
export const createTournamentState = (teamCount, defaultBestOf = 3) => {
  const rounds = Math.log2(teamCount);
  let matchNumber = 1;
  return Array.from({ length: rounds }, (_, round) => {
    const matchesInRound = Math.pow(2, rounds - round - 1);
    const matches = generateEmptyMatches(matchesInRound, () =>
      createEmptyMatch(matchNumber++),
    );
    return {
      id: `upper-round-${round + 1}`,
      name: `Round ${round + 1}`,
      matches,
      bestOf: defaultBestOf,
    };
  });
};

/**
 * Generates lower bracket for double elimination
 * @param {number} upperRounds
 * @param {number} defaultBestOf
 * @returns {Array}
 */
export const createLowerBracketStructure = (upperRounds, defaultBestOf) => {
  const lowerRounds = upperRounds - 1;
  let matchNumber = 1;
  return Array.from({ length: lowerRounds }, (_, round) => {
    const matchesInRound = Math.pow(2, upperRounds - round - 2);
    const matches = generateEmptyMatches(matchesInRound, () =>
      createEmptyMatch(matchNumber++),
    );
    return {
      id: `lower-round-${round + 1}`,
      name: `Lower Round ${round + 1}`,
      matches,
      bestOf: defaultBestOf,
    };
  });
};

/**
 * Generates Swiss bracket columns
 * @param {number} teamCount
 * @param {number} roundsCount
 * @param {number} defaultBestOf
 * @param {Array|null} availableTeams
 * @returns {Array}
 */
export const createSwissTournamentState = (
  teamCount,
  roundsCount,
  defaultBestOf = 3,
  availableTeams = null,
) => {
  if (!roundsCount) {
    roundsCount = Math.ceil(Math.log2(teamCount));
  }
  const teams = getTeamsArray(teamCount, availableTeams, true).sort(
    () => Math.random() - 0.5,
  );
  let matchNumber = 1;
  return Array.from({ length: roundsCount }, (_, round) => ({
    id: `swiss-round-${round + 1}`,
    name: `Round ${round + 1}`,
    matches: generateEmptyMatches(teamCount / 2, () => ({
      id: `swiss-match-${round + 1}-${matchNumber}`,
      number: matchNumber++,
      teamOne: { name: TBD },
      teamTwo: { name: TBD },
      winner: null,
      date: null,
    })),
    bestOf: defaultBestOf,
  }));
};

/**
 * Generates Round Robin bracket columns
 * @param {number} teamCount
 * @param {number} defaultBestOf
 * @param {Array|null} availableTeams
 * @returns {Array}
 */
export const createRoundRobinTournamentState = (
  teamCount,
  defaultBestOf = 3,
  availableTeams = null,
) => {
  const teams = getTeamsArray(teamCount, availableTeams, false);
  const rounds = teamCount - 1 + (teamCount % 2); // If odd number — add "bye"
  const matchups = [];
  for (let i = 0; i < teamCount; i++) {
    for (let j = i + 1; j < teamCount; j++) {
      matchups.push([teams[i], teams[j]]);
    }
  }
  const matchesPerRound = Math.floor(teamCount / 2);
  let pairs = [...matchups];
  let matchNumber = 1;
  return Array.from({ length: rounds }, (_, round) => {
    const used = new Set();
    const matches = [];
    for (let k = 0; k < pairs.length; k++) {
      const [a, b] = pairs[k];
      if (!used.has(a.id) && !used.has(b.id)) {
        matches.push({
          id: `rr-match-${round + 1}-${matches.length + 1}`,
          number: matches.length + 1,
          teamOne: { ...a },
          teamTwo: { ...b },
          winner: null,
          date: null,
        });
        used.add(a.id);
        used.add(b.id);
        pairs.splice(k, 1);
        k = -1; // restart search
        if (matches.length === matchesPerRound) break;
      }
    }
    return {
      id: `rr-round-${round + 1}`,
      name: `Round ${round + 1}`,
      matches,
      bestOf: defaultBestOf,
    };
  });
};
