import { LRUCache } from "lru-cache"

type Options = {
	uniqueTokenPerInterval?: number
	intervalInMs?: number
}

export default function rateLimit(options?: Options): {
	check: (limit: number, token: string) => Promise<void>
} {
	const tokenCache = new LRUCache({
		max: options?.uniqueTokenPerInterval || 500,
		ttl: options?.intervalInMs || 60000,
	})

	return {
		check: (limit: number, token: string): Promise<void> =>
			new Promise<void>((resolve, reject) => {
				const tokenCount = (tokenCache.get(token) as number[]) || [0]

				if (tokenCount[0] === 0) {
					tokenCache.set(token, tokenCount)
				}

				tokenCount[0] += 1

				const currentUsage = tokenCount[0]
				const isRateLimited = currentUsage > limit

				return isRateLimited ? reject() : resolve()
			}),
	}
}
