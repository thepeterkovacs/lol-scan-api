import { appRouter } from "@/server/appRouter"
import { renderTrpcPanel } from "trpc-panel"

export async function GET() {
	return new Response(
		renderTrpcPanel(appRouter, {
			url: "http://localhost:3000/lol-scan-api/api/trpc",
		}),
		{
			status: 200,
			headers: { "Content-Type": "text/html" },
		}
	)
}
