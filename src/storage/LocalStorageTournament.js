// LocalStorageTournament.js
// LocalStorage implementation of TournamentStorage
import TournamentStorage from "./TournamentStorage";

const STORAGE_KEY = "tournaments";

class LocalStorageTournament extends TournamentStorage {
  /** @returns {Object} */
  _getAll() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  }

  /** @param {Object} all */
  _setAll(all) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  /** @param {string} id */
  async getTournament(id) {
    const all = this._getAll();
    return all[id] || null;
  }

  /** @param {Tournament} data */
  async saveTournament(data) {
    const all = this._getAll();
    all[data.id] = data;
    this._setAll(all);
  }

  /** @param {string} tournamentId, @param {string} matchId, @param {Match} matchData */
  async updateMatch(tournamentId, matchId, matchData) {
    const all = this._getAll();
    const t = all[tournamentId];
    if (!t) throw new Error("Tournament not found");
    // Find and update match in all rounds
    let updated = false;
    for (const round of t.rounds) {
      for (let i = 0; i < round.matches.length; i++) {
        if (round.matches[i].id === matchId) {
          round.matches[i] = { ...round.matches[i], ...matchData };
          updated = true;
        }
      }
    }
    if (!updated) throw new Error("Match not found");
    all[tournamentId] = t;
    this._setAll(all);
  }

  /** @returns {Promise<TournamentSummary[]>} */
  async listTournaments() {
    const all = this._getAll();
    return Object.values(all).map((t) => ({ id: t.id, name: t.name }));
  }

  /** @param {string} id */
  async deleteTournament(id) {
    const all = this._getAll();
    delete all[id];
    this._setAll(all);
  }
}

export default LocalStorageTournament;
