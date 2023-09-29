import { z } from "zod"

import { Player } from "./player"

export const LiveGamePlayer = Player.pick({ name: true, rank: true })

export type LiveGamePlayer = z.infer<typeof LiveGamePlayer>

export const LiveGame = z.object({
	mode: z.string(),
	duration: z.number(),
	players: LiveGamePlayer.array(),
})

export type LiveGame = z.infer<typeof LiveGame>
