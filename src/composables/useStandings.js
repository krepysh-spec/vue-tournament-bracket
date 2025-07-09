// useStandings.js
// Standings calculation logic for different tournament formats

import { getSwissStandings as getSwissStandingsUtil } from "../utils/tournament";

/**
 * @param {Array} upperColumns - rounds of upper bracket
 * @param {Array} lowerColumns - rounds of lower bracket (or empty array)
 * @param {String} format - tournament format
 * @param {Object} TOURNAMENT_FORMAT - format constants
 * @param {Object} TEAM_POSITION - team position constants
 * @param {String} TBD - constant for "to be determined" team
 * @returns {Array} standings
 */
export function useStandings({
  upperColumns,
  lowerColumns,
  format,
  TOURNAMENT_FORMAT,
  TEAM_POSITION,
  TBD,
}) {
  if (format === TOURNAMENT_FORMAT.SWISS) {
    return getSwissStandings(upperColumns);
  }
  if (format === TOURNAMENT_FORMAT.ROUND_ROBIN) {
    return getRoundRobinStandings(upperColumns, TEAM_POSITION, TBD);
  }
  return getEliminationStandings(
    upperColumns,
    lowerColumns,
    format,
    TOURNAMENT_FORMAT,
    TEAM_POSITION,
    TBD,
  );
}

// --- Swiss Standings ---
function getSwissStandings(upperColumns) {
  return getSwissStandingsUtil(upperColumns);
}

// --- Round Robin Standings ---
function getRoundRobinStandings(upperColumns, TEAM_POSITION, TBD) {
  const players = {};
  upperColumns.forEach((round) => {
    round.matches.forEach((match) => {
      [TEAM_POSITION.ONE, TEAM_POSITION.TWO].forEach((pos) => {
        const t = match[pos];
        if (!t || !t.id) return;
        if (!players[t.id])
          players[t.id] = {
            ...t,
            wins: 0,
            losses: 0,
            ties: 0,
            score: 0,
            ptsDiff: 0,
          };
      });
      const t1 = match[TEAM_POSITION.ONE];
      const t2 = match[TEAM_POSITION.TWO];
      if (t1 && t2 && t1.id && t2.id) {
        const s1 = t1.score || 0;
        const s2 = t2.score || 0;
        if (match.winner === TEAM_POSITION.ONE) {
          players[t1.id].wins++;
          players[t1.id].score += 1;
          players[t2.id].losses++;
        } else if (match.winner === TEAM_POSITION.TWO) {
          players[t2.id].wins++;
          players[t2.id].score += 1;
          players[t1.id].losses++;
        } else if (match.winner === null && (s1 > 0 || s2 > 0)) {
          players[t1.id].ties++;
          players[t2.id].ties++;
          players[t1.id].score += 0.5;
          players[t2.id].score += 0.5;
        }
        players[t1.id].ptsDiff += s1 - s2;
        players[t2.id].ptsDiff += s2 - s1;
      }
    });
  });
  const arr = Object.values(players).sort(
    (a, b) => b.score - a.score || b.wins - a.wins || b.ptsDiff - a.ptsDiff,
  );
  arr.forEach((p, i) => {
    p.place = i + 1;
  });
  return arr;
}

// --- Elimination Standings (Single/Double) ---
function getEliminationStandings(
  upperColumns,
  lowerColumns,
  format,
  TOURNAMENT_FORMAT,
  TEAM_POSITION,
  TBD,
) {
  const players = {};
  upperColumns.forEach((round) => {
    round.matches.forEach((match) => {
      [TEAM_POSITION.ONE, TEAM_POSITION.TWO].forEach((pos) => {
        const t = match[pos];
        if (!t || !t.id) return;
        if (!players[t.id])
          players[t.id] = {
            ...t,
            wins: 0,
            losses: 0,
            ties: 0,
            score: 0,
            ptsDiff: 0,
          };
      });
      const t1 = match[TEAM_POSITION.ONE];
      const t2 = match[TEAM_POSITION.TWO];
      if (t1 && t2 && t1.id && t2.id) {
        const s1 = t1.score || 0;
        const s2 = t2.score || 0;
        if (match.winner === TEAM_POSITION.ONE) {
          players[t1.id].wins++;
          players[t1.id].score += 1;
          players[t2.id].losses++;
        } else if (match.winner === TEAM_POSITION.TWO) {
          players[t2.id].wins++;
          players[t2.id].score += 1;
          players[t1.id].losses++;
        } else if (match.winner === null && (s1 > 0 || s2 > 0)) {
          players[t1.id].ties++;
          players[t2.id].ties++;
          players[t1.id].score += 0.5;
          players[t2.id].score += 0.5;
        }
        players[t1.id].ptsDiff += s1 - s2;
        players[t2.id].ptsDiff += s2 - s1;
      }
    });
  });
  // If double elimination — also count lower bracket
  if (format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION && lowerColumns) {
    lowerColumns.forEach((round) => {
      round.matches.forEach((match) => {
        [TEAM_POSITION.ONE, TEAM_POSITION.TWO].forEach((pos) => {
          const t = match[pos];
          if (!t || !t.id) return;
          if (!players[t.id])
            players[t.id] = {
              ...t,
              wins: 0,
              losses: 0,
              ties: 0,
              score: 0,
              ptsDiff: 0,
            };
        });
        const t1 = match[TEAM_POSITION.ONE];
        const t2 = match[TEAM_POSITION.TWO];
        if (t1 && t2 && t1.id && t2.id) {
          const s1 = t1.score || 0;
          const s2 = t2.score || 0;
          if (match.winner === TEAM_POSITION.ONE) {
            players[t1.id].wins++;
            players[t1.id].score += 1;
            players[t2.id].losses++;
          } else if (match.winner === TEAM_POSITION.TWO) {
            players[t2.id].wins++;
            players[t2.id].score += 1;
            players[t1.id].losses++;
          } else if (match.winner === null && (s1 > 0 || s2 > 0)) {
            players[t1.id].ties++;
            players[t2.id].ties++;
            players[t1.id].score += 0.5;
            players[t2.id].score += 0.5;
          }
          players[t1.id].ptsDiff += s1 - s2;
          players[t2.id].ptsDiff += s2 - s1;
        }
      });
    });
  }
  const arr = Object.values(players).sort(
    (a, b) => b.score - a.score || b.wins - a.wins || b.ptsDiff - a.ptsDiff,
  );
  arr.forEach((p, i) => {
    p.place = i + 1;
  });
  return arr;
}
