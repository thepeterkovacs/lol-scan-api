/**
 * Extracts if the player is currently in an active game from the provided HTML string.
 * @param {string} html HTML string to extract the data from.
 * @returns {boolean} Result of the extraction.
 * @example
 * const output = getIsInGameLogic("...not in-game...")
 * //output = false
 */
export const getIsInGameLogic = (html: string): boolean => {
	return !html.includes("not in-game")
}
