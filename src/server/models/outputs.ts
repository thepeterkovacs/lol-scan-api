import { z } from "zod"

export const GetIsInGameOutput = z.object({
	isInGame: z.boolean(),
})

export const GetLiveGameDataOutput = z.object({
	gameMode: z.string(),
})