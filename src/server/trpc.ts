import { TRPCError, initTRPC } from "@trpc/server"
import { OpenApiMeta } from "trpc-openapi"
import { TRPCPanelMeta } from "trpc-panel"

import { checkApiKey } from "@/lib/error"
import rateLimit from "@/lib/rateLimit"

type Context = {
	apiKey: string
}

type Meta = TRPCPanelMeta & OpenApiMeta

const t = initTRPC.meta<Meta>().context<Context>().create()

export const router = t.router

const limit = rateLimit({
	intervalInMs: 60 * 1000,
	uniqueTokenPerInterval: 10,
})

export const auth = t.middleware(async ({ ctx, next }) => {
	checkApiKey(ctx.apiKey)

	try {
		await limit.check(100, "RATE_LIMIT_CACHE_TOKEN")
	} catch {
		throw new TRPCError({
			code: "TOO_MANY_REQUESTS",
			message: "Rate limit exceeded 100 requests per minute",
		})
	}

	return next({
		ctx: {
			key: ctx.apiKey,
		},
	})
})

export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(auth)
