import { TRPCError } from "@trpc/server"

import { getDocumentFromUrl } from "@/lib/utils/server"

import { GetIsInGame } from "../models/inputs"
import { privateProcedure, router } from "../trpc"

const getIsInGame = privateProcedure.input(GetIsInGame).query(async ({ input }) => {
	const { region, name } = input

	const url = `https://www.leagueofgraphs.com/summoner/${region}/${name}`
	const document = await getDocumentFromUrl(url)

	if (document.querySelector(".solo-text")) {
		throw new TRPCError({
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
