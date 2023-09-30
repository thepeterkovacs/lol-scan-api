import { appRouter } from "@/server/appRouter"
import { generateOpenApiDocument } from "trpc-openapi"

export const openApiDocument = generateOpenApiDocument(appRouter, {
	title: "LoL Scan API",
	version: "1.0.6",
	baseUrl: "http://localhost:3000/api",
})
