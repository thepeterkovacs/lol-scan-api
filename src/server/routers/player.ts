import { TRPCError } from "@trpc/server"

import { getHtmlFromUrl } from "@/lib/utils"

import { GetIsInGame } from "../models/inputs"
import { privateProcedure, router } from "../trpc"

const getIsInGame = privateProcedure
	.meta({ description: "Checks whether the player is currently in an active game." })
	.input(GetIsInGame)
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

const playerRouter = router({
	getIsInGame,
})

export default playerRouter
