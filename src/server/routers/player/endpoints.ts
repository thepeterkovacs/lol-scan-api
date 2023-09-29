import { Player } from "@/server/models/player"
import { privateProcedure } from "@/server/trpc"

import { checkPlayerNotFound } from "@/lib/error"
import { getHtmlFromUrl } from "@/lib/utils"

import { getIconLogic, getIsInGameLogic } from "./logic"

export const getIsInGame = privateProcedure
	.meta({ description: "Checks whether the player is currently in an active game." })
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
	.meta({ description: "Returns the path to the player's icon." })
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
	.meta({ description: "Collects and returns all the data associated with the player." })
	.input(Player.pick({ name: true, region: true }))
	.output(Player.pick({ isInGame: true }))
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)

		return { isInGame: getIsInGameLogic(html) }
	})
