import { GetAllDataInput, GetLiveGameDurationInput, GetModeInput } from "@/server/models/inputs"
import { GetAllDataOutput, GetLiveGameDurationOutput, GetModeOutput } from "@/server/models/outputs"
import { privateProcedure, router } from "@/server/trpc"

import { checkPlayerNotFound, checkPlayerNotInGame } from "@/lib/logic/error"
import { getGameDuration, getGameMode, getPlayers } from "@/lib/logic/player"
import { getHtmlFromUrl } from "@/lib/utils"

const getMode = privateProcedure
	.meta({ description: "For a player currently in an active game, returns the game mode." })
	.input(GetModeInput)
	.output(GetModeOutput)
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)
		checkPlayerNotInGame(html)

		return { gameMode: getGameMode(html) }
	})

const getDuration = privateProcedure
	.meta({
		description:
			"For a player currently in an active game, returns the game duration in milliseconds.",
	})
	.input(GetLiveGameDurationInput)
	.output(GetLiveGameDurationOutput)
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)
		checkPlayerNotInGame(html)

		return { gameDuration: getGameDuration(html) }
	})

const getAllData = privateProcedure
	.meta({
		description:
			"For a player currently in an active game, collects all the available game data.",
	})
	.input(GetAllDataInput)
	.output(GetAllDataOutput)
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

export const liveGameRouter = router({
	getMode,
	getDuration,
	getAllData,
})
