import { TBD, TEAM_POSITION } from "../constants/tournament";

// Returns an empty team object
export const createEmptyTeam = () => ({
  id: null,
  name: TBD,
  logo: null,
  score: 0,
});

// Returns an empty match object
export const createEmptyMatch = (number) => ({
  id: `match-${number}`,
  number,
  [TEAM_POSITION.ONE]: createEmptyTeam(),
  [TEAM_POSITION.TWO]: createEmptyTeam(),
  winner: null,
  date: null,
});

// Generates single elimination bracket
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
      bestOf: defaultBestOf,
    });
  }
  return columns;
};

// Generates lower bracket for double elimination
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
      bestOf: defaultBestOf,
    });
  }
  return columns;
};

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

// Swiss bracket generator (see above for details)
export const createSwissTournamentState = (
  teamCount,
  roundsCount,
  defaultBestOf = 3,
  availableTeams = null,
) => {
  // If roundsCount is not set — use log2(teamCount)
  if (!roundsCount) {
    roundsCount = Math.ceil(Math.log2(teamCount));
  }
  // Use availableTeams if provided, otherwise generate
  let teams;
  if (Array.isArray(availableTeams) && availableTeams.length >= teamCount) {
    teams = [...availableTeams]
      .slice(0, teamCount)
      .map((t) => ({ ...t, score: 0 }));
    teams = teams.sort(() => Math.random() - 0.5);
  } else {
    teams = Array.from({ length: teamCount }, (_, i) => ({
      id: i + 1,
      name: `Team ${i + 1}`,
      logo: null,
      score: 0,
    }));
  }

  const columns = [];

  // First round — all matches are TBD
  const firstRoundMatches = [];
  for (let i = 0; i < teamCount; i += 2) {
    firstRoundMatches.push({
      id: `swiss-match-1-${i / 2 + 1}`,
      number: i / 2 + 1,
      teamOne: { name: TBD },
      teamTwo: { name: TBD },
      winner: null,
      date: null,
    });
  }
  columns.push({
    id: `swiss-round-1`,
    name: `Round 1`,
    matches: firstRoundMatches,
    bestOf: defaultBestOf,
  });

  // Next rounds — all matches are TBD
  for (let round = 1; round < roundsCount; round++) {
    const matches = [];
    for (let i = 0; i < teamCount; i += 2) {
      matches.push({
        id: `swiss-match-${round + 1}-${i / 2 + 1}`,
        number: i / 2 + 1,
        teamOne: { name: TBD },
        teamTwo: { name: TBD },
        winner: null,
        date: null,
      });
    }
    columns.push({
      id: `swiss-round-${round + 1}`,
      name: `Round ${round + 1}`,
      matches,
      bestOf: defaultBestOf,
    });
  }
  return columns;
};

// Forms pairs for Swiss round based on score, avoids repeats, cross-group pairing, supports bye
export function shuffleSwissPairs(teams, previousPairs = []) {
  // Group by score
  const groups = {};
  teams.forEach((t) => {
    if (!groups[t.score]) groups[t.score] = [];
    groups[t.score].push(t);
  });
  const scores = Object.keys(groups)
    .map(Number)
    .sort((a, b) => b - a);
  const pairs = [];
  const used = new Set();
  const allIds = teams.map((t) => t.id);
  // Collect all previous pairs as a set for fast lookup
  const prevSet = new Set(previousPairs.map(([a, b]) => `${a}-${b}`));

  // Helper for pairing within a group
  function pairGroup(arr) {
    const localPairs = [];
    const localUsed = new Set();
    for (let i = 0; i < arr.length; i++) {
      if (localUsed.has(arr[i].id)) continue;
      let found = false;
      for (let j = i + 1; j < arr.length; j++) {
        if (localUsed.has(arr[j].id)) continue;
        if (
          !prevSet.has(`${arr[i].id}-${arr[j].id}`) &&
          !prevSet.has(`${arr[j].id}-${arr[i].id}`)
        ) {
          localPairs.push([arr[i], arr[j]]);
          localUsed.add(arr[i].id);
          localUsed.add(arr[j].id);
          used.add(arr[i].id);
          used.add(arr[j].id);
          found = true;
          break;
        }
      }
      if (!found) {
        // If not found, try pairing with next group
        for (let s2 of scores) {
          if (s2 === arr[i].score) continue;
          for (let t2 of groups[s2] || []) {
            if (used.has(t2.id)) continue;
            if (
              !prevSet.has(`${arr[i].id}-${t2.id}`) &&
              !prevSet.has(`${t2.id}-${arr[i].id}`)
            ) {
              localPairs.push([arr[i], t2]);
              localUsed.add(arr[i].id);
              localUsed.add(t2.id);
              used.add(arr[i].id);
              used.add(t2.id);
              return localPairs;
            }
          }
        }
      }
    }
    return localPairs;
  }

  // Main pairing by groups
  for (let score of scores) {
    const group = groups[score].filter((t) => !used.has(t.id));
    const groupPairs = pairGroup(group);
    pairs.push(...groupPairs);
    // If one player left in group — pair with next group or bye
    const left = group.filter((t) => !used.has(t.id));
    if (left.length === 1) {
      let paired = false;
      for (let s2 of scores) {
        if (s2 === score) continue;
        for (let t2 of groups[s2] || []) {
          if (
            !used.has(t2.id) &&
            !prevSet.has(`${left[0].id}-${t2.id}`) &&
            !prevSet.has(`${t2.id}-${left[0].id}`)
          ) {
            pairs.push([left[0], t2]);
            used.add(left[0].id);
            used.add(t2.id);
            paired = true;
            break;
          }
        }
        if (paired) break;
      }
      if (!paired) {
        // bye
        pairs.push([left[0], null]);
        used.add(left[0].id);
      }
    }
  }
  // If someone left without a pair (odd number) — bye
  const unused = allIds.filter((id) => !used.has(id));
  for (let id of unused) {
    const t = teams.find((x) => x.id === id);
    pairs.push([t, null]);
  }
  return pairs;
}

// Returns Swiss standings table
export function getSwissStandings(rounds) {
  // rounds — array of rounds (upperColumns)
  const players = {};
  const matchesByPlayer = {};
  rounds.forEach((round) => {
    round.matches.forEach((match) => {
      ["teamOne", "teamTwo"].forEach((pos) => {
        const t = match[pos];
        if (!t) return;
        if (!players[t.id])
          players[t.id] = {
            ...t,
            wins: 0,
            losses: 0,
            ties: 0,
            score: 0,
            ptsDiff: 0,
            buchholz: 0,
          };
        if (!matchesByPlayer[t.id]) matchesByPlayer[t.id] = [];
      });
      if (match.teamOne && match.teamTwo) {
        const t1 = match.teamOne;
        const t2 = match.teamTwo;
        const s1 = t1.score || 0;
        const s2 = t2.score || 0;
        if (match.winner === "teamOne") {
          players[t1.id].wins++;
          players[t1.id].score += 1;
          players[t2.id].losses++;
        } else if (match.winner === "teamTwo") {
          players[t2.id].wins++;
          players[t2.id].score += 1;
          players[t1.id].losses++;
        } else if (match.winner === null && (s1 > 0 || s2 > 0)) {
          // Draw (if supported)
          players[t1.id].ties++;
          players[t2.id].ties++;
          players[t1.id].score += 0.5;
          players[t2.id].score += 0.5;
        }
        players[t1.id].ptsDiff += s1 - s2;
        players[t2.id].ptsDiff += s2 - s1;
        matchesByPlayer[t1.id].push(t2.id);
        matchesByPlayer[t2.id].push(t1.id);
      } else if (match.teamOne && !match.teamTwo) {
        // Bye for teamOne
        players[match.teamOne.id].wins++;
        players[match.teamOne.id].score += 1;
      } else if (!match.teamOne && match.teamTwo) {
        // Bye for teamTwo
        players[match.teamTwo.id].wins++;
        players[match.teamTwo.id].score += 1;
      }
    });
  });
  // Buchholz: sum of opponents' points
  Object.values(players).forEach((p) => {
    p.buchholz = (matchesByPlayer[p.id] || []).reduce(
      (sum, oppId) => sum + (players[oppId]?.score || 0),
      0,
    );
  });
  // TB: number of wins
  // Score: points
  // Pts Diff: point difference
  // Buchholz: sum of opponents' points
  // Sort
  const arr = Object.values(players).sort(
    (a, b) =>
      b.score - a.score ||
      b.wins - a.wins ||
      b.buchholz - a.buchholz ||
      b.ptsDiff - a.ptsDiff,
  );
  // Add place
  arr.forEach((p, i) => {
    p.place = i + 1;
  });
  return arr;
}

// Round Robin bracket generator
export const createRoundRobinTournamentState = (
  teamCount,
  defaultBestOf = 3,
  availableTeams = null,
) => {
  // Use availableTeams if provided, otherwise generate
  let teams;
  if (Array.isArray(availableTeams) && availableTeams.length >= teamCount) {
    teams = [...availableTeams].slice(0, teamCount);
  } else {
    teams = Array.from({ length: teamCount }, (_, i) => ({
      id: i + 1,
      name: `Team ${i + 1}`,
      logo: null,
    }));
  }

  // Round Robin: кожна команда грає з кожною
  const rounds = teamCount - 1 + (teamCount % 2); // Якщо непарна кількість — додаємо "bye"
  const columns = [];
  const matchups = [];

  // Створюємо всі пари (без повторів)
  for (let i = 0; i < teamCount; i++) {
    for (let j = i + 1; j < teamCount; j++) {
      matchups.push([teams[i], teams[j]]);
    }
  }

  // Розподіляємо матчі по раундах (кожна команда грає 1 раз за раунд)
  // Алгоритм "circle method"
  const matchesPerRound = Math.floor(teamCount / 2);
  let pairs = [...matchups];
  for (let round = 0; round < rounds; round++) {
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
    columns.push({
      id: `rr-round-${round + 1}`,
      name: `Round ${round + 1}`,
      matches,
      bestOf: defaultBestOf,
    });
  }
  return columns;
};
