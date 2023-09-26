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
