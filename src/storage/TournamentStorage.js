// TournamentStorage.js
// Interface (JSDoc) for tournament storage logic

/**
 * @typedef {Object} Tournament
 * @property {string} id
 * @property {string} name
 * @property {Array} rounds
 * @property {string} format
 * @property {Array} teams
 * ... (add more fields as needed)
 */

/**
 * @typedef {Object} Match
 * @property {string} id
 * @property {string} winner
 * ... (add more fields as needed)
 */

/**
 * @typedef {Object} TournamentSummary
 * @property {string} id
 * @property {string} name
 */

/**
 * @interface TournamentStorage
 */
class TournamentStorage {
  /**
   * @param {string} id
   * @returns {Promise<Tournament>}
   */
  async getTournament(id) {
    throw new Error("Not implemented");
  }

  /**
   * @param {Tournament} data
   * @returns {Promise<void>}
   */
  async saveTournament(data) {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} tournamentId
   * @param {string} matchId
   * @param {Match} matchData
   * @returns {Promise<void>}
   */
  async updateMatch(tournamentId, matchId, matchData) {
    throw new Error("Not implemented");
  }

  /**
   * @returns {Promise<TournamentSummary[]>}
   */
  async listTournaments() {
    throw new Error("Not implemented");
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteTournament(id) {
    throw new Error("Not implemented");
  }
}

export default TournamentStorage;
