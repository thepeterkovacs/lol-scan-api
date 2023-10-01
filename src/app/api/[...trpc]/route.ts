import { createOpenApiFetchHandler } from "@/openapi/adapter"
import { appRouter } from "@/server/appRouter"

const handler = (req: Request) => {
	const trpcApiKey = req.headers.get("api-key")
	const openApiAuthorization = req.headers.get("authorization")?.split(" ")[1]

	const apiKey = trpcApiKey ?? openApiAuthorization ?? ""

	return createOpenApiFetchHandler({
		endpoint: "/api",
		router: appRouter,
		createContext: () => ({ apiKey }),
		req,
	})
}

export { handler as GET }
