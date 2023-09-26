import { GetAllDataInput, GetLiveGameDurationInput, GetModeInput } from "@/server/models/inputs"
import { GetAllDataOutput, GetLiveGameDurationOutput, GetModeOutput } from "@/server/models/outputs"
import { privateProcedure } from "@/server/trpc"

import { checkPlayerNotFound, checkPlayerNotInGame } from "@/lib/error"
import { getHtmlFromUrl } from "@/lib/utils"

import { getGameDuration, getGameMode, getPlayers } from "./logic"

export const getMode = privateProcedure
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

export const getDuration = privateProcedure
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

export const getAllData = privateProcedure
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
