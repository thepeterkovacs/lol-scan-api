import { extractSubstring } from "@/lib/utils"

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

/**
 * Extracts the path to the player's icon from the provided HTML string.
 * @param {string} html HTML string to extract the path from.
 * @returns {string} Path to the player's icon.
 * @example
 * const output = getIconLogic('<link rel="apple-touch-icon" href="//lolg-cdn.porofessor.gg/img/d/summonerIcons/13.19/64/1387.png" />        <meta')
 * //output = "//lolg-cdn.porofessor.gg/img/d/summonerIcons/13.19/64/1387.png"
 */
export const getIconLogic = (html: string): string => {
	const prefix = '"apple-touch-icon" href="'
	const suffix = '" /> '

	return extractSubstring(html, prefix, suffix)
}
