import { router } from "@/server/trpc"

import { getAllData, getDuration, getMode, getPlayers } from "./endpoints"

export const liveGameRouter = router({
	getMode,
	getDuration,
	getPlayers,
	getAllData,
})
