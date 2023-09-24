import { TRPCError } from "@trpc/server"

import { getHtmlFromUrl } from "@/lib/utils"

import { GetIsInGameInput, GetLiveGameDataInput } from "../models/inputs"
import { GetIsInGameOutput, GetLiveGameDataOutput } from "../models/outputs"
import { privateProcedure, router } from "../trpc"

const getIsInGame = privateProcedure
	.meta({ description: "Checks whether the player is currently in an active game." })
	.input(GetIsInGameInput)
	.output(GetIsInGameOutput)
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		if (html.toLowerCase().includes("not found")) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Player with the given name and region does not exist",
			})
		}

		const isInGame = !html.includes("not in-game")

		return { isInGame }
	})

const getLiveGameData = privateProcedure
	.meta({
		description:
			"For a player currently in an active game, collects all the available game data.",
	})
	.input(GetLiveGameDataInput)
	.output(GetLiveGameDataOutput)
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		if (html.toLowerCase().includes("not found")) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Player with the given name and region does not exist",
			})
		}

		if (html.includes("not in-game")) {
			throw new TRPCError({
				code: "NOT_IMPLEMENTED",
				message: "Player is not currently in an active game",
			})
		}

		return {
			gameMode: getGameMode(html),
			gameDuration: getGameDuration(html),
			players: getPlayers(html),
		}
	})

const getGameMode = (html: string): string => {
	const prefix = '<h2 class="left relative">'
	const suffix = '<span id="gameDuration"'

	const subString = extractSubstring(html, prefix, suffix)
	const gameMode = subString.replace(/\s/g, "")

	return gameMode
}

const getGameDuration = (html: string): number => {
	const prefix = ">("
	const suffix = ")<"

	const subString = extractSubstring(html, prefix, suffix)

	const [minutes, seconds] = subString.split(":").map(Number)

	const gameDuration = (minutes * 60 + seconds) * 1000

	return gameDuration
}

const getPlayers = (html: string): { name: string }[] => {
	const regex = /data-summonername="(.*)" data-summonerid/g

	let players: { name: string }[] = []
	let match: RegExpExecArray | null

	while ((match = regex.exec(html)) !== null) {
		players.push({ name: match[1] })
	}

	return players
}

const extractSubstring = (str: string, prefix: string, suffix: string): string => {
	const startIndex = str.indexOf(prefix)
	const endIndex = str.indexOf(suffix)

	const subString = str.slice(startIndex + prefix.length, endIndex)

	return subString
}

const playerRouter = router({
	getIsInGame,
	getLiveGameData,
})

export default playerRouter
