import { z } from "zod"

import { Region } from "./enums"

export const Player = z.object({
	name: z.string().describe("IGN (in game name) of the player."),
	region: Region.describe("Name of the regional server where the player's account is based."),
	icon: z.string().describe("Path to the player's icon."),
	rank: z.string().describe("Current rank of the player."),
	isInGame: z.boolean().describe("Whether the player is currently in an active game."),
})

export type Player = z.infer<typeof Player>
