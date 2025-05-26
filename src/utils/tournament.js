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
  const totalRounds = Math.log2(size);
  let matchNumber = 1;

  // Створюємо раунди від першого до фіналу
  for (let round = 0; round < totalRounds; round++) {
    const matchesInRound = Math.pow(2, totalRounds - round - 1);
    const matches = [];

    for (let i = 0; i < matchesInRound; i++) {
      matches.push(createEmptyMatch(matchNumber++));
    }

    rounds.push({
      name: `Round ${round + 1}`,
      items: matches,
      bestOf: defaultBestOf
    });
  }

  return rounds;
};

export const createLowerBracketStructure = (upperRounds, defaultBestOf) => {
  const columns = [];
  let matchNumber = 1;

  // Для 16 команд: 4 раунди в верхній сітці
  // Нижня сітка має 3 раунди з такою кількістю матчів:
  // Round 1: 4 матчі
  // Round 2: 2 матчі
  // Round 3: 1 матч

  // Створюємо раунди нижньої сітки
  for (let round = 0; round < upperRounds - 1; round++) {
    const matchesInRound = Math.pow(2, upperRounds - round - 2);
    const matches = [];

    for (let i = 0; i < matchesInRound; i++) {
      matches.push(createEmptyMatch(matchNumber++));
    }

    columns.push({
      name: `Lower Round ${round + 1}`,
      bestOf: defaultBestOf,
      items: matches
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