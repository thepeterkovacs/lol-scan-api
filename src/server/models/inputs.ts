import { z } from "zod"

import { Region } from "./enums"

export const GetIsInGame = z.object({
	region: Region.describe("Name of the regional server where the player's account is based."),
	name: z.string().describe("IGN (in game name) of the player."),
})

export const GetLiveGameData = z.object({
	region: Region.describe("Name of the regional server where the player's account is based."),
	name: z.string().describe("IGN (in game name) of the player."),
})
