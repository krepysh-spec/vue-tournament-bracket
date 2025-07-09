// standings.js
// Standings calculation logic for Swiss and other tournament formats

/**
 * Returns Swiss standings table
 * @param {Array} rounds - array of rounds (upperColumns)
 * @returns {Array}
 */
export function getSwissStandings(rounds) {
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
