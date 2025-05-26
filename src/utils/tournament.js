export const createEmptyTeam = () => ({
  id: null,
  name: 'TBD',
  logo: null,
  score: 0
});

export const createEmptyMatch = (number) => ({
  number,
  teamOne: createEmptyTeam(),
  teamTwo: createEmptyTeam(),
  winner: null
});

export const createTournamentState = (size, defaultBestOf = 3) => {
  const rounds = [];
  let currentSize = size;
  let roundNumber = 1;
  let matchNumber = 1;

  while (currentSize > 1) {
    const matches = [];
    for (let i = 0; i < currentSize / 2; i++) {
      matches.push(createEmptyMatch(matchNumber++));
    }

    rounds.push({
      name: `Round ${roundNumber}`,
      items: matches,
      bestOf: defaultBestOf
    });

    currentSize = currentSize / 2;
    roundNumber++;
  }

  return rounds;
};

export const createLowerBracketStructure = (upperRounds, defaultBestOf) => {
  const lowerRounds = Math.ceil(upperRounds / 2);
  const columns = [];
  let matchNumber = 1;

  for (let i = 0; i < lowerRounds; i++) {
    const matchesInRound = Math.pow(2, lowerRounds - i - 1);
    const items = [];

    for (let j = 0; j < matchesInRound; j++) {
      items.push(createEmptyMatch(matchNumber++));
    }

    columns.push({
      name: `Lower Round ${i + 1}`,
      bestOf: defaultBestOf,
      items
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