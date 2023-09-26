import { LiveGame } from "@/server/models/liveGame"
import { Player } from "@/server/models/player"
import { privateProcedure } from "@/server/trpc"

import { checkPlayerNotFound, checkPlayerNotInGame } from "@/lib/error"
import { getHtmlFromUrl } from "@/lib/utils"

import { getGameDuration, getGameMode, getPlayers } from "./logic"

export const getMode = privateProcedure
	.meta({ description: "For a player currently in an active game, returns the game mode." })
	.input(Player.pick({ name: true, region: true }))
	.output(LiveGame.pick({ mode: true }))
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)
		checkPlayerNotInGame(html)

		return { mode: getGameMode(html) }
	})

export const getDuration = privateProcedure
	.meta({
		description:
			"For a player currently in an active game, returns the game duration in milliseconds.",
	})
	.input(Player.pick({ name: true, region: true }))
	.output(LiveGame.pick({ duration: true }))
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)
		checkPlayerNotInGame(html)

		return { duration: getGameDuration(html) }
	})

export const getAllData = privateProcedure
	.meta({
		description:
			"For a player currently in an active game, collects all the available game data.",
	})
	.input(Player.pick({ name: true, region: true }))
	.output(LiveGame)
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)
		checkPlayerNotInGame(html)

		return {
			mode: getGameMode(html),
			duration: getGameDuration(html),
			players: getPlayers(html),
		}
	})
