import { router } from "../../trpc"
import { getIsInGame } from "./endpoints"
import { liveGameRouter } from "./liveGame/router"

const playerRouter = router({
	getIsInGame,
	liveGame: liveGameRouter,
})

export default playerRouter
