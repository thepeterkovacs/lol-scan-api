import { extractSubstring } from "../utils"

export const getGameMode = (html: string): string => {
	const prefix = '<h2 class="left relative">'
	const suffix = '<span id="gameDuration"'

	const subString = extractSubstring(html, prefix, suffix)
	const gameMode = subString.replace(/\s/g, "")

	return gameMode
}

export const getGameDuration = (html: string): number => {
	const prefix = ">("
	const suffix = ")<"

	const subString = extractSubstring(html, prefix, suffix)

	const [minutes, seconds] = subString.split(":").map(Number)

	const gameDuration = (minutes * 60 + seconds) * 1000

	return gameDuration
}

export const getPlayers = (html: string): { name: string }[] => {
	const regex = /data-summonername="(.*)" data-summonerid/g

	let players: { name: string }[] = []
	let match: RegExpExecArray | null

	while ((match = regex.exec(html)) !== null) {
		players.push({ name: match[1] })
	}

	return players
}
