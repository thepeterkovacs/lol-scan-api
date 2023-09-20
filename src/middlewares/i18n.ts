import createMiddleware from "next-intl/middleware"

import { NextRequest, NextResponse } from "next/server"

export default function i18n(): (request: NextRequest) => NextResponse<unknown> {
	return createMiddleware({
		locales: [],
		defaultLocale: "",
	})
}
