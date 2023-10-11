import { Player } from "@/server/models/player"
import { privateProcedure } from "@/server/trpc"

import { checkPlayerNotFound } from "@/lib/error"
import { getHtmlFromUrl } from "@/lib/utils"

import { getIconLogic, getIsInGameLogic } from "./logic"

export const getIsInGame = privateProcedure
	.meta({
		description: "Checks whether the player is currently in an active game.",
		openapi: {
			enabled: true,
			method: "GET",
			path: "/player/get-is-in-game/{region}/{name}",
			protect: true,
			summary: "Checks whether the player is currently in an active game.",
			tags: ["player"],
		},
	})
	.input(Player.pick({ name: true, region: true }))
	.output(Player.pick({ isInGame: true }))
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)

		return { isInGame: getIsInGameLogic(html) }
	})

export const getIcon = privateProcedure
	.meta({
		description: "Returns the path to the player's icon.",
		openapi: {
			enabled: true,
			method: "GET",
			path: "/player/get-icon/{region}/{name}",
			protect: true,
			summary: "Returns the path to the player's icon.",
			tags: ["player"],
		},
	})
	.input(Player.pick({ name: true, region: true }))
	.output(Player.pick({ icon: true }))
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://www.leagueofgraphs.com/summoner/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)

		return { icon: getIconLogic(html) }
	})

export const getAllData = privateProcedure
	.meta({
		description: "Collects and returns all the data associated with the player.",
		openapi: {
			enabled: true,
			method: "GET",
			path: "/player/get-all-data/{region}/{name}",
			protect: true,
			summary: "Collects and returns all the data associated with the player.",
			tags: ["player"],
		},
	})
	.input(Player.pick({ name: true, region: true }))
	.output(Player.pick({ icon: true, isInGame: true }))
	.query(async ({ input }) => {
		const { region, name } = input

		let icon
		let isInGame

		{
			const url = `https://www.leagueofgraphs.com/summoner/${region}/${name}`
			const html = await getHtmlFromUrl(url)

			checkPlayerNotFound(html)

			icon = getIconLogic(html)
		}

		{
			const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
			const html = await getHtmlFromUrl(url)

			isInGame = getIsInGameLogic(html)
		}

		return {
			icon,
			isInGame,
		}
	})
