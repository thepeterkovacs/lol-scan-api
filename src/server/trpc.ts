import { initTRPC } from "@trpc/server"
import { OpenApiMeta } from "trpc-openapi"
import { TRPCPanelMeta } from "trpc-panel"

import { checkApiKey, checkRateLimit } from "@/lib/error"
import rateLimit from "@/lib/rateLimit"

type Context = {
	apiKey: string
}

type Meta = TRPCPanelMeta & OpenApiMeta

const t = initTRPC.meta<Meta>().context<Context>().create()

export const router = t.router

const limiter = rateLimit()

export const auth = t.middleware(async ({ ctx, next }) => {
	checkApiKey(ctx.apiKey)

	await checkRateLimit(limiter, 100)

	return next({
		ctx: {
			key: ctx.apiKey,
		},
	})
})

export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(auth)
