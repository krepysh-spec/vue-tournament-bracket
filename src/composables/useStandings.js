// useStandings.js
// Standings calculation logic for different tournament formats

import { getSwissStandings as getSwissStandingsUtil } from "../utils/standings";

/**
 * Filters out placeholder/empty teams from standings.
 * @param {Array} standings
 * @param {string} TBD
 * @returns {Array}
 */
function filterValidTeams(standings, TBD) {
  return standings.filter((team) => Boolean(team.id) && team.name !== TBD);
}

/**
 * Updates player stats for a match result.
 * @param {Object} players
 * @param {Object} t1
 * @param {Object} t2
 * @param {string|null} winner
 * @param {string} winnerPos1
 * @param {string} winnerPos2
 */
function updateStats(players, t1, t2, winner, winnerPos1, winnerPos2) {
  const s1 = t1.score || 0;
  const s2 = t2.score || 0;
  if (winner === winnerPos1) {
    players[t1.id].wins++;
    players[t1.id].score += 1;
    players[t2.id].losses++;
  } else if (winner === winnerPos2) {
    players[t2.id].wins++;
    players[t2.id].score += 1;
    players[t1.id].losses++;
  } else if (winner === null && (s1 > 0 || s2 > 0)) {
    players[t1.id].ties++;
    players[t2.id].ties++;
    players[t1.id].score += 0.5;
    players[t2.id].score += 0.5;
  }
  players[t1.id].ptsDiff += s1 - s2;
  players[t2.id].ptsDiff += s2 - s1;
}

/**
 * Main standings composable. Returns standings for the given tournament state.
 * @param {Object} params
 * @returns {Array}
 */
export function useStandings({
  upperColumns,
  lowerColumns,
  format,
  TOURNAMENT_FORMAT,
  TEAM_POSITION,
  TBD,
}) {
  switch (format) {
    case TOURNAMENT_FORMAT.SWISS:
      return filterValidTeams(getSwissStandings(upperColumns), TBD);
    case TOURNAMENT_FORMAT.ROUND_ROBIN:
      return filterValidTeams(
        getRoundRobinStandings(upperColumns, TEAM_POSITION),
        TBD,
      );
    case TOURNAMENT_FORMAT.SINGLE_ELIMINATION:
    case TOURNAMENT_FORMAT.DOUBLE_ELIMINATION:
    default:
      return filterValidTeams(
        getEliminationStandings(
          upperColumns,
          lowerColumns,
          format,
          TOURNAMENT_FORMAT,
          TEAM_POSITION,
        ),
        TBD,
      );
  }
}

/**
 * Swiss standings wrapper (delegates to utils)
 * @param {Array} upperColumns
 * @returns {Array}
 */
function getSwissStandings(upperColumns) {
  return getSwissStandingsUtil(upperColumns);
}

/**
 * Calculates standings for Round Robin format.
 * @param {Array} upperColumns
 * @param {Object} TEAM_POSITION
 * @returns {Array}
 */
function getRoundRobinStandings(upperColumns, TEAM_POSITION) {
  const players = {};
  for (const round of upperColumns) {
    for (const match of round.matches) {
      for (const pos of [TEAM_POSITION.ONE, TEAM_POSITION.TWO]) {
        const t = match[pos];
        if (!t || !t.id) continue;
        if (!players[t.id]) {
          players[t.id] = {
            ...t,
            wins: 0,
            losses: 0,
            ties: 0,
            score: 0,
            ptsDiff: 0,
          };
        }
      }
      const t1 = match[TEAM_POSITION.ONE];
      const t2 = match[TEAM_POSITION.TWO];
      if (t1 && t2 && t1.id && t2.id) {
        updateStats(
          players,
          t1,
          t2,
          match.winner,
          TEAM_POSITION.ONE,
          TEAM_POSITION.TWO,
        );
      }
    }
  }
  return sortAndPlace(players, ["score", "wins", "ptsDiff"]);
}

/**
 * Calculates standings for Elimination formats (Single/Double).
 * @param {Array} upperColumns
 * @param {Array} lowerColumns
 * @param {string} format
 * @param {Object} TOURNAMENT_FORMAT
 * @param {Object} TEAM_POSITION
 * @returns {Array}
 */
function getEliminationStandings(
  upperColumns,
  lowerColumns,
  format,
  TOURNAMENT_FORMAT,
  TEAM_POSITION,
) {
  const players = {};
  // Upper bracket
  for (const round of upperColumns) {
    for (const match of round.matches) {
      for (const pos of [TEAM_POSITION.ONE, TEAM_POSITION.TWO]) {
        const t = match[pos];
        if (!t || !t.id) continue;
        if (!players[t.id]) {
          players[t.id] = {
            ...t,
            wins: 0,
            losses: 0,
            ties: 0,
            score: 0,
            ptsDiff: 0,
          };
        }
      }
      const t1 = match[TEAM_POSITION.ONE];
      const t2 = match[TEAM_POSITION.TWO];
      if (t1 && t2 && t1.id && t2.id) {
        updateStats(
          players,
          t1,
          t2,
          match.winner,
          TEAM_POSITION.ONE,
          TEAM_POSITION.TWO,
        );
      }
    }
  }
  // Lower bracket (for double elimination)
  if (format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION && lowerColumns) {
    for (const round of lowerColumns) {
      for (const match of round.matches) {
        for (const pos of [TEAM_POSITION.ONE, TEAM_POSITION.TWO]) {
          const t = match[pos];
          if (!t || !t.id) continue;
          if (!players[t.id]) {
            players[t.id] = {
              ...t,
              wins: 0,
              losses: 0,
              ties: 0,
              score: 0,
              ptsDiff: 0,
            };
          }
        }
        const t1 = match[TEAM_POSITION.ONE];
        const t2 = match[TEAM_POSITION.TWO];
        if (t1 && t2 && t1.id && t2.id) {
          updateStats(
            players,
            t1,
            t2,
            match.winner,
            TEAM_POSITION.ONE,
            TEAM_POSITION.TWO,
          );
        }
      }
    }
  }
  return sortAndPlace(players, ["score", "wins", "ptsDiff"]);
}

/**
 * Sorts players and assigns place.
 * @param {Object} players
 * @param {Array} sortKeys
 * @returns {Array}
 */
function sortAndPlace(players, sortKeys) {
  const arr = Object.values(players).sort((a, b) => {
    for (const key of sortKeys) {
      if (b[key] !== a[key]) return b[key] - a[key];
    }
    return 0;
  });
  arr.forEach((p, i) => {
    p.place = i + 1;
  });
  return arr;
}
