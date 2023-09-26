import { z } from "zod"

export const Player = z.object({
	name: z.string(),
})

export type Player = z.infer<typeof Player>

export const GetIsInGameOutput = z.object({
	isInGame: z.boolean(),
})

export const GetModeOutput = z.object({
	gameMode: z.string(),
})

export const GetLiveGameDurationOutput = z.object({
	gameDuration: z.number(),
})

export const GetAllDataOutput = z.object({
	gameMode: z.string(),
	gameDuration: z.number(),
	players: Player.array(),
})
