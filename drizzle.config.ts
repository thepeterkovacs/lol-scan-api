import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config({
	path: ".env.local",
})

export default {
	schema: "./src/database/schema/*.ts",
	out: "./src/database/out",
	driver: "mysql2",
	dbCredentials: {
		connectionString: process.env.DATABASE_URL,
	},
	tablesFilter: [""],
	verbose: true,
	breakpoints: true,
} satisfies Config
