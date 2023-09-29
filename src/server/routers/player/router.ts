import { router } from "../../trpc"
import { getAllData, getIsInGame } from "./endpoints"
import { liveGameRouter } from "./liveGame/router"

const playerRouter = router({
	getIsInGame,
	getAllData,
	liveGame: liveGameRouter,
})

export default playerRouter
