"use client"

import "swagger-ui-react/swagger-ui.css"

import dynamic from "next/dynamic"

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false })

export default function Swagger() {
	return <SwaggerUI url={`${process.env.NEXT_PUBLIC_URL}/api/openapi.json`} />
}
