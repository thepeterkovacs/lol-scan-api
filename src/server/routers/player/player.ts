import { checkPlayerNotFound } from "@/lib/logic/error"
import { getHtmlFromUrl } from "@/lib/utils"

import { GetIsInGameInput } from "../../models/inputs"
import { GetIsInGameOutput } from "../../models/outputs"
import { privateProcedure, router } from "../../trpc"
import { liveGameRouter } from "./routers/liveGame/liveGame"

const getIsInGame = privateProcedure
	.meta({ description: "Checks whether the player is currently in an active game." })
	.input(GetIsInGameInput)
	.output(GetIsInGameOutput)
	.query(async ({ input }) => {
		const { region, name } = input

		const url = `https://porofessor.gg/partial/live-partial/${region}/${name}`
		const html = await getHtmlFromUrl(url)

		checkPlayerNotFound(html)

		const isInGame = !html.includes("not in-game")

		return { isInGame }
	})

const playerRouter = router({
	getIsInGame,
	liveGame: liveGameRouter,
})

export default playerRouter
