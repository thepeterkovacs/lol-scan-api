import { PlayerWithName } from "@/server/models/liveGame"

import { extractSubstring } from "../../../../lib/utils"

/**
 * Extracts the game mode from the provided HTML string.
 * @param {string} html HTML string to extract the game mode from.
 * @returns {string} The extracted game mode.
 * @example
 * const output = getModeLogic('<h2 class="left relative"> ARAM <span id="gameDuration" ...')
 * //output = "ARAM"
 */
export const getModeLogic = (html: string): string => {
	const prefix = '<h2 class="left relative">'
	const suffix = '<span id="gameDuration"'

	const subString = extractSubstring(html, prefix, suffix)
	const gameMode = subString.replace(/\s/g, "")

	return gameMode
}

/**
 * Extracts the game duration in milliseconds from the provided HTML string.
 * @param {string} html HTML string to extract the game duration from.
 * @returns {number} The game duration in milliseconds.
 * @example
 * const output = getDurationLogic(">(9:43)<")
 * //output = 583000
 */
export const getDurationLogic = (html: string): number => {
	const prefix = ">("
	const suffix = ")<"

	const subString = extractSubstring(html, prefix, suffix)

	const [minutes, seconds] = subString.split(":").map(Number)

	const gameDuration = (minutes * 60 + seconds) * 1000

	return gameDuration
}

/**
 * Extracts the players from the provided HTML string.
 * @param {string} html HTML string to extract player names from.
 * @returns {PlayerWithName[]} An array of players with only names.
 * @example
 * const output = getPlayersLogic('data-summonername="Player1" data-summonerid ... data-summonername="Player2" data-summonerid')
 * //output = [{ name: "Player1" }, { name: "Player2" }]
 */
export const getPlayersLogic = (html: string): PlayerWithName[] => {
	const regex = /data-summonername="(.*)" data-summonerid/g

	let players: PlayerWithName[] = []
	let match: RegExpExecArray | null

	while ((match = regex.exec(html)) !== null) {
		players.push({ name: match[1] })
	}

	return players
}