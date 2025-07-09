// useBracket.js
// Logic for working with upper/lower brackets, updating matches, generating next rounds, Swiss pairing

import { createLowerBracketStructure } from "../utils/bracketGenerators";
import { shuffleSwissPairs } from "../utils/pairing";

export function useBracket({
  upperColumns,
  lowerColumns,
  props,
  emit,
  TOURNAMENT_FORMAT,
  TEAM_POSITION,
  TBD,
}) {
  // --- Update match in the upper bracket ---
  function updateUpperMatch(roundIndex, matchIndex, updatedMatch) {
    if (
      upperColumns.value[roundIndex] &&
      upperColumns.value[roundIndex].matches
    ) {
      upperColumns.value[roundIndex].matches[matchIndex] = updatedMatch;

      // If there is a winner, update the next round
      if (updatedMatch.winner && roundIndex < upperColumns.value.length - 1) {
        const nextRoundIndex = roundIndex + 1;
        const nextMatchIndex = Math.floor(matchIndex / 2);

        if (
          upperColumns.value[nextRoundIndex] &&
          upperColumns.value[nextRoundIndex].matches[nextMatchIndex]
        ) {
          const nextMatch =
            upperColumns.value[nextRoundIndex].matches[nextMatchIndex];
          const teamPosition =
            matchIndex % 2 === 0 ? TEAM_POSITION.ONE : TEAM_POSITION.TWO;
          const winningTeam = updatedMatch[updatedMatch.winner];

          upperColumns.value[nextRoundIndex].matches[nextMatchIndex] = {
            ...nextMatch,
            [teamPosition]: {
              id: winningTeam.id,
              name: winningTeam.name,
              logo: winningTeam.logo,
              score: 0,
            },
          };
        }
      }

      // Double Elimination: loser goes to the lower bracket
      if (
        props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION &&
        updatedMatch.winner
      ) {
        const losingTeam =
          updatedMatch[
            updatedMatch.winner === TEAM_POSITION.ONE
              ? TEAM_POSITION.TWO
              : TEAM_POSITION.ONE
          ];
        if (losingTeam.name !== TBD) {
          const lowerRoundIndex = Math.floor(roundIndex / 2);
          const lowerMatchIndex = Math.floor(matchIndex / 2);

          if (
            lowerColumns.value[lowerRoundIndex] &&
            lowerColumns.value[lowerRoundIndex].matches[lowerMatchIndex]
          ) {
            const lowerMatch =
              lowerColumns.value[lowerRoundIndex].matches[lowerMatchIndex];
            const teamPosition =
              matchIndex % 2 === 0 ? TEAM_POSITION.ONE : TEAM_POSITION.TWO;

            lowerColumns.value[lowerRoundIndex].matches[lowerMatchIndex] = {
              ...lowerMatch,
              [teamPosition]: {
                id: losingTeam.id,
                name: losingTeam.name,
                logo: losingTeam.logo,
                score: 0,
              },
            };
          }
        }
      }

      emitTournamentState();
    }

    // --- SWISS: if all matches in the round are finished, generate the next round ---
    if (props.format === TOURNAMENT_FORMAT.SWISS) {
      const currentRound = upperColumns.value[roundIndex];
      const allFinished = currentRound.matches.every((m) => m.winner);
      if (allFinished && roundIndex < upperColumns.value.length - 1) {
        // 1. Collect all teams and their points
        const teams = {};
        for (let r = 0; r <= roundIndex; r++) {
          upperColumns.value[r].matches.forEach((match) => {
            ["teamOne", "teamTwo"].forEach((pos) => {
              const t = match[pos];
              if (!t) return;
              if (!teams[t.id]) teams[t.id] = { ...t, score: 0 };
            });
            if (match.winner && match.teamOne && match.teamTwo) {
              if (match.winner === "teamOne")
                teams[match.teamOne.id].score += 1;
              if (match.winner === "teamTwo")
                teams[match.teamTwo.id].score += 1;
            }
          });
        }
        // 2. Collect all previous pairs
        const previousPairs = [];
        for (let r = 0; r <= roundIndex; r++) {
          upperColumns.value[r].matches.forEach((match) => {
            if (match.teamOne && match.teamTwo)
              previousPairs.push([match.teamOne.id, match.teamTwo.id]);
          });
        }
        // 3. Generate new pairs
        const teamArr = Object.values(teams);
        const pairs = shuffleSwissPairs(teamArr, previousPairs);
        // 4. Write to the next round
        const nextRound = upperColumns.value[roundIndex + 1];
        nextRound.matches = pairs.map((pair, i) => ({
          id: `swiss-match-${roundIndex + 2}-${i + 1}`,
          number: i + 1,
          teamOne: pair[0],
          teamTwo: pair[1],
          winner: null,
          date: null,
        }));
      }
    }
  }

  function updateUpperColumns(updatedColumns) {
    upperColumns.value = updatedColumns;
    emitTournamentState();
  }

  function updateLowerState(updatedColumns) {
    lowerColumns.value = updatedColumns;
    emitTournamentState();
  }

  function emitTournamentState() {
    emit("update:state", {
      upper: upperColumns.value,
      lower:
        props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION
          ? lowerColumns.value
          : null,
    });
  }

  function initializeTournament() {
    if (!props.initialState) return;

    if (Array.isArray(props.initialState)) {
      upperColumns.value = JSON.parse(JSON.stringify(props.initialState));
      if (props.format === TOURNAMENT_FORMAT.DOUBLE_ELIMINATION) {
        lowerColumns.value = createLowerBracketStructure(
          upperColumns.value.length,
          props.defaultBestOf,
        );
        return;
      }
      if (props.format === TOURNAMENT_FORMAT.SWISS) {
        lowerColumns.value = [];
        return;
      }
      return;
    }

    upperColumns.value = JSON.parse(
      JSON.stringify(props.initialState.upper || []),
    );
    lowerColumns.value = JSON.parse(
      JSON.stringify(props.initialState.lower || []),
    );
  }

  return {
    updateUpperMatch,
    updateUpperColumns,
    updateLowerState,
    emitTournamentState,
    initializeTournament,
  };
}
