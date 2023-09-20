import withAuth from "next-auth/middleware"

import { AnyMiddleware } from "@/lib/utils/middleware"

export default function auth(middleware: AnyMiddleware) {
	return withAuth(middleware)
}
