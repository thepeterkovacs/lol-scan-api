import { Player } from "@/server/models/player"
import { privateProcedure } from "@/server/trpc"

import { checkPlayerNotFound } from "@/lib/error"
import { getHtmlFromUrl } from "@/lib/utils"

import { getIsInGameLogic } from "./logic"

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
