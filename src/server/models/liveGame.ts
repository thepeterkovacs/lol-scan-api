import { z } from "zod"

import { Player } from "./player"

export const PlayerWithName = Player.pick({ name: true })

export type PlayerWithName = z.infer<typeof PlayerWithName>

export const LiveGame = z.object({
	mode: z.string(),
	duration: z.number(),
	players: PlayerWithName.array(),
})

export type LiveGame = z.infer<typeof LiveGame>
