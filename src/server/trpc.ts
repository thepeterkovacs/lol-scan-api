import { TRPCError, initTRPC } from "@trpc/server"
import { OpenApiMeta } from "trpc-openapi"
import { TRPCPanelMeta } from "trpc-panel"

type Context = {
	apiKey: string
}

type Meta = TRPCPanelMeta & OpenApiMeta

const t = initTRPC.meta<Meta>().context<Context>().create()
export const router = t.router

export const auth = t.middleware(({ ctx, next }) => {
	if (ctx.apiKey !== process.env.API_KEY) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Invalid API key",
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
