import { TBD, TEAM_POSITION } from '../constants/tournament';

export const createEmptyTeam = () => ({
  id: null,
  name: TBD,
  logo: null,
  score: 0
});

export const createEmptyMatch = (number) => ({
  id: `match-${number}`,
  number,
  [TEAM_POSITION.ONE]: createEmptyTeam(),
  [TEAM_POSITION.TWO]: createEmptyTeam(),
  winner: null,
  date: null
});

export const createTournamentState = (teamCount, defaultBestOf = 3) => {
  const columns = [];
  const rounds = Math.log2(teamCount);
  let matchNumber = 1;

  for (let round = 0; round < rounds; round++) {
    const matchesInRound = Math.pow(2, rounds - round - 1);
    const matches = [];
    
    for (let match = 0; match < matchesInRound; match++) {
      matches.push(createEmptyMatch(matchNumber++));
    }
    
    columns.push({
      id: `upper-round-${round + 1}`,
      name: `Round ${round + 1}`,
      matches: matches,
      bestOf: defaultBestOf
    });
  }
  
  return columns;
};

export const createLowerBracketStructure = (upperRounds, defaultBestOf) => {
  const columns = [];
  let matchNumber = 1;

  // For 16 teams: 4 rounds in upper bracket
  // Lower bracket has 3 rounds with the following number of matches:
  // Round 1: 4 matches
  // Round 2: 2 matches
  // Round 3: 1 match

  const lowerRounds = upperRounds - 1;
  
  for (let round = 0; round < lowerRounds; round++) {
    const matchesInRound = Math.pow(2, upperRounds - round - 2);
    const matches = [];
    
    for (let match = 0; match < matchesInRound; match++) {
      matches.push(createEmptyMatch(matchNumber++));
    }
    
    columns.push({
      id: `lower-round-${round + 1}`,
      name: `Lower Round ${round + 1}`,
      matches: matches,
      bestOf: defaultBestOf
    });
  }

  return columns;
};

export const getNextMatchIndex = (currentMatchIndex, isUpperBracket = true) => {
  if (isUpperBracket) {
    return Math.floor(currentMatchIndex / 2);
  }
  return Math.floor(currentMatchIndex / 2);
};

export const getNextRoundIndex = (currentRoundIndex, isUpperBracket = true) => {
  if (isUpperBracket) {
    return currentRoundIndex + 1;
  }
  return currentRoundIndex + 1;
};

export const getLowerBracketMatchIndex = (upperRoundIndex, upperMatchIndex) => {
  return Math.floor(upperMatchIndex / 2);
};

export const getLowerBracketRoundIndex = (upperRoundIndex) => {
  return Math.floor(upperRoundIndex / 2);
}; 