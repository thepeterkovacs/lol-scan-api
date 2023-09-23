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
		}
	})

const getGameMode = (html: string): string => {
	const prefix = '<h2 class="left relative">'
	const suffix = '<span id="gameDuration"'

	const startIndex = html.indexOf(prefix)
	const endIndex = html.indexOf(suffix)

	const subString = html.slice(startIndex + prefix.length, endIndex)
	const gameMode = subString.replace(/\s/g, "")

	return gameMode
}

const playerRouter = router({
	getIsInGame,
	getLiveGameData,
})

export default playerRouter
