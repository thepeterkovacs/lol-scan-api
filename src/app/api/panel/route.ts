import { appRouter } from "@/server/appRouter"
import { renderTrpcPanel } from "trpc-panel"

export async function GET() {
	return new Response(
		renderTrpcPanel(appRouter, {
			url: `${process.env.API_KEY}/api/trpc`,
		}),
		{
			status: 200,
			headers: { "Content-Type": "text/html" },
		}
	)
}
