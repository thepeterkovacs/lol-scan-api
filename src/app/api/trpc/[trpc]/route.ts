import { appRouter } from "@/server/appRouter"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

const handler = (req: Request) => {
	const apiKey = req.headers.get("api-key") ?? ""

	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => ({ apiKey }),
	})
}
export { handler as GET, handler as POST }
