import { TRPCError } from "@trpc/server"

/**
 * Checks if the provided API key matches the expected API key from the environment variables.
 * @param {string} apiKey API key to be checked.
 * @throws {TRPCError} Throws a TRPCError with code "UNAUTHORIZED" if the API key is invalid.
 * @example
 * checkApiKey("IbmnER9Mn25KvfY4EKkt+rPyfjMypQYCkbDGm2WSLLE=")
 */
export const checkApiKey = (apiKey: string): void => {
	if (apiKey !== process.env.API_KEY) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Invalid API key",
		})
	}
}

/**
 * Checks if the API request rate limit is exceeded the given amount per minute.
 * @param {{check: (limit: number, token: string) => Promise<void>}} limiter Limiter object with the check method.
 * @param {number} limit Maximum number of requests allowed each minute.
 * @throws {TRPCError} Throws a TRPCError with code "TOO_MANY_REQUESTS" if the rate limit is exceeded.
 * @example
 * await checkRateLimit(limiter, 100)
 */
export const checkRateLimit = async (
	limiter: {
		check: (limit: number, token: string) => Promise<void>
	},
	limit: number
): Promise<void> => {
	try {
		await limiter.check(limit, "RATE_LIMIT_CACHE_TOKEN")
	} catch {
		throw new TRPCError({
			code: "TOO_MANY_REQUESTS",
			message: `Rate limit exceeded ${limit} requests per minute`,
		})
	}
}

/**
 * Checks if the provided HTML content indicates that a player was not found.
 * @param {string} html HTML content to be checked.
 * @throws {TRPCError} Throws a TRPCError with code "NOT_FOUND" if the player is not found.
 * @example
 * checkPlayerNotFound("...not found...")
 */
export const checkPlayerNotFound = (html: string): void => {
	if (html.toLowerCase().includes("not found")) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Player with the given name and region does not exist",
		})
	}
}

/**
 * Checks if the provided HTML content indicates that a player is not in an active game.
 * @param {string} html HTML content to be checked.
 * @throws {TRPCError} Throws a TRPCError with code "NOT_IMPLEMENTED" if the player is not in an active game.
 * @example
 * checkPlayerNotInGame("...not in-game...")
 */
export const checkPlayerNotInGame = (html: string): void => {
	if (html.includes("not in-game")) {
		throw new TRPCError({
			code: "NOT_IMPLEMENTED",
			message: "Player is not currently in an active game",
		})
	}
}
