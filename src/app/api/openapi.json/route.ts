import { openApiDocument } from "@/openapi/document"

import { NextResponse } from "next/server"

export const GET = () => {
	return NextResponse.json(openApiDocument)
}
