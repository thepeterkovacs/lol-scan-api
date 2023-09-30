import { createOpenApiFetchHandler } from "@/openapi/adapter"
import { appRouter } from "@/server/appRouter"

const handler = (req: Request) => {
	const apiKey = req.headers.get("api-key") ?? ""

	return createOpenApiFetchHandler({
		endpoint: "/api",
		router: appRouter,
		createContext: () => ({ apiKey }),
		req,
	})
}

export { handler as GET }
