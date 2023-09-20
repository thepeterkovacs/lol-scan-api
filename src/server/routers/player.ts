import { TRPCError } from "@trpc/server"

import { getDocumentFromUrl } from "@/lib/utils/server"

import { GetIsInGame } from "../models/inputs"
import { publicProcedure, router } from "../trpc"

const getIsInGame = publicProcedure.input(GetIsInGame).query(async ({ input }) => {
	const { region, name } = input

	const url = `https://www.leagueofgraphs.com/summoner/${region}/${name}`
	const document = await getDocumentFromUrl(url)

	if (document.querySelector(".solo-text")) {
		return new TRPCError({
			code: "NOT_FOUND",
			message: "Player with the given name and region does not exist",
		})
	}

	const liveButton = document.querySelector("#live_button")

	return { isInGame: liveButton !== null }
})

const playerRouter = router({
	getIsInGame,
})

export default playerRouter
