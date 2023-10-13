"use client"

import "swagger-ui-react/swagger-ui.css"

import dynamic from "next/dynamic"

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false })

export default function Swagger() {
	const url = `${process.env.NODE_ENV == "production" ? "/lol-scan-api" : ""}/api/openapi.json`

	return <SwaggerUI url={url} />
}
