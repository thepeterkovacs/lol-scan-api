import { router } from "@/server/trpc"

import { getAllData, getDuration, getMode } from "./endpoints"

export const liveGameRouter = router({
	getMode,
	getDuration,
	getAllData,
})
