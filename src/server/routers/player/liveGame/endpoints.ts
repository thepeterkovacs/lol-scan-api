import { LiveGame } from "@/server/models/liveGame"
import { Player } from "@/server/models/player"
import { privateProcedure } from "@/server/trpc"

import { checkPlayerNotFound, checkPlayerNotInGame } from "@/lib/error"
import { getHtmlFromUrl } from "@/lib/utils"

import { getDurationLogic, getModeLogic, getPlayersLogic } from "./logic"

export const getMode = privateProcedure
	.meta({
		description: "For a player currently in an active game, returns the game mode.",
		openapi: {
			enabled: true,
			method: "GET",
			path: "/player/live-game/get-mode/{region}/{name}",
			protect: true,
			summary: "For a player currently in an active game, returns the game mode.",
			tags: ["player/live-game"],
		},
	})
	.input(Player.pick({ name: true, region: true }))
	.output(LiveGame.pick({ mode: true }))
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)
		checkPlayerNotInGame(html)

		return { mode: getModeLogic(html) }
	})

export const getDuration = privateProcedure
	.meta({
		description:
			"For a player currently in an active game, returns the game duration in milliseconds.",
		openapi: {
			enabled: true,
			method: "GET",
			path: "/player/live-game/get-duration/{region}/{name}",
			protect: true,
			summary:
				"For a player currently in an active game, returns the game duration in milliseconds.",
			tags: ["player/live-game"],
		},
	})
	.input(Player.pick({ name: true, region: true }))
	.output(LiveGame.pick({ duration: true }))
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)
		checkPlayerNotInGame(html)

		return { duration: getDurationLogic(html) }
	})

export const getPlayers = privateProcedure
	.meta({
		description:
			"For a player currently in an active game, returns all players from that game.",
		openapi: {
			enabled: true,
			method: "GET",
			path: "/player/live-game/get-players/{region}/{name}",
			protect: true,
			summary:
				"For a player currently in an active game, returns all players from that game.",
			tags: ["player/live-game"],
		},
	})
	.input(Player.pick({ name: true, region: true }))
	.output(LiveGame.pick({ players: true }))
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)
		checkPlayerNotInGame(html)

		return { players: getPlayersLogic(html) }
	})

export const getAllData = privateProcedure
	.meta({
		description:
			"For a player currently in an active game, collects all the available game data.",
		openapi: {
			enabled: true,
			method: "GET",
			path: "/player/live-game/get-all-data/{region}/{name}",
			protect: true,
			summary:
				"For a player currently in an active game, collects all the available game data.",
			tags: ["player/live-game"],
		},
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
			mode: getModeLogic(html),
			duration: getDurationLogic(html),
			players: getPlayersLogic(html),
		}
	})
