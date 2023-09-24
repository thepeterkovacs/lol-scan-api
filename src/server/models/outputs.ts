import { z } from "zod"

export const Player = z.object({
	name: z.string(),
})

export const GetIsInGameOutput = z.object({
	isInGame: z.boolean(),
})

export const GetLiveGameDataOutput = z.object({
	gameMode: z.string(),
	gameDuration: z.number(),
	players: Player.array(),
})
