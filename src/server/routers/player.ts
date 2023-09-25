import { checkPlayerNotFound, checkPlayerNotInGame } from "@/lib/logic/error"
import { getGameDuration, getGameMode, getPlayers } from "@/lib/logic/player"
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

		checkPlayerNotFound(html)

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

		checkPlayerNotFound(html)
		checkPlayerNotInGame(html)

		return {
			gameMode: getGameMode(html),
			gameDuration: getGameDuration(html),
			players: getPlayers(html),
		}
	})

const playerRouter = router({
	getIsInGame,
	getLiveGameData,
})

export default playerRouter
