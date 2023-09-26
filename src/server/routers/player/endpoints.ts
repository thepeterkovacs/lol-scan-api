import { GetIsInGameInput } from "@/server/models/inputs"
import { GetIsInGameOutput } from "@/server/models/outputs"
import { privateProcedure } from "@/server/trpc"

import { checkPlayerNotFound } from "@/lib/error"
import { getHtmlFromUrl } from "@/lib/utils"

export const getIsInGame = privateProcedure
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
