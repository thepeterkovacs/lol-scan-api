import { z } from "zod"

const env = z.object({
	URL: z.string(),
	NEXT_PUBLIC_URL: z.string(),
	API_KEY: z.string(),
})

env.parse(process.env)

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof env> {}
	}
}
