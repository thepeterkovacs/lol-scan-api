import { router } from "../../trpc"
import { getAllData, getIcon, getIsInGame } from "./endpoints"
import { liveGameRouter } from "./liveGame/router"

const playerRouter = router({
	getIsInGame,
	getIcon,
	getAllData,
	liveGame: liveGameRouter,
})

export default playerRouter
