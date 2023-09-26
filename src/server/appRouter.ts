import playerRouter from "./routers/player/player"
import { router } from "./trpc"

export const appRouter = router({
	player: playerRouter,
})

export type AppRouter = typeof appRouter
