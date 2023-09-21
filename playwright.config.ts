import { defineConfig, devices } from "@playwright/test"
import * as dotenv from "dotenv"

dotenv.config({
	path: ".env.local",
})

export default defineConfig({
	testDir: "./tests",
	outputDir: "./tests/out",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [["list"], ["html", { outputFolder: "tests/export", open: "never" }]],
	use: {
		baseURL: "http://127.0.0.1:3000",
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
})
