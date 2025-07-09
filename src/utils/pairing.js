// pairing.js
// Pairing logic for Swiss and other tournament formats

/**
 * Forms pairs for Swiss round based on score, avoids repeats, cross-group pairing, supports bye
 * @param {Array} teams
 * @param {Array} previousPairs
 * @returns {Array}
 */
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
