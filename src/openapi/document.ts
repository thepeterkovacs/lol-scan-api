import { appRouter } from "@/server/appRouter"
import { generateOpenApiDocument } from "trpc-openapi"

import packageJson from "../../package.json"

export const openApiDocument = generateOpenApiDocument(appRouter, {
	title: packageJson.name,
	version: packageJson.version,
	baseUrl: `${process.env.URL}/api`,
})
