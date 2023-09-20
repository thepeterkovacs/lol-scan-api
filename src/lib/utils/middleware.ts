import { NextMiddlewareWithAuth } from "next-auth/middleware"

import { NextMiddleware, NextResponse } from "next/server"

export type AnyMiddleware = NextMiddleware | NextMiddlewareWithAuth

export type Middleware = (middleware: AnyMiddleware) => AnyMiddleware

/**
 * Chains an array of middleware functions together and returns a composed middleware.
 * @param {Middleware[]} functions Array of middleware functions to be chained.
 * @param {number} i Index of the current middleware being processed.
 * @returns {NextMiddleware} The composed middleware function.
 * @example
 * const output = chainMiddlewares([auth, i18n])
 */
export default function chainMiddlewares(functions: Middleware[], i: number = 0): AnyMiddleware {
	const current = functions[i]

	if (current) {
		return current(chainMiddlewares(functions, i + 1)) as NextMiddleware
	}

	return () => NextResponse.next()
}
