import { z } from "zod"

import { Region } from "./enums"

export const GetIsInGame = z.object({
	region: Region,
	name: z.string(),
})
