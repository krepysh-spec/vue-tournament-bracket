export const createEmptyTeam = () => ({
  id: null,
  name: 'TBD',
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

export const saveTournamentState = (state) => {
  try {
    localStorage.setItem('tournamentState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving tournament state:', error);
  }
};

export const loadTournamentState = () => {
  try {
    const savedState = localStorage.getItem('tournamentState');
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Error loading tournament state:', error);
    return null;
  }
}; 