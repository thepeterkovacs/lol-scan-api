import { z } from "zod"

import { Region } from "./enums"

export const GetIsInGameInput = z.object({
	region: Region.describe("Name of the regional server where the player's account is based."),
	name: z.string().describe("IGN (in game name) of the player."),
})

export const GetLiveGameDataInput = z.object({
	region: Region.describe("Name of the regional server where the player's account is based."),
	name: z.string().describe("IGN (in game name) of the player."),
})
