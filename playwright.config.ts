import { defineConfig, devices } from "@playwright/test"
import * as dotenv from "dotenv"

dotenv.config({
	path: ".env.local",
})

export default defineConfig({
	forbidOnly: !!process.env.CI,
	fullyParallel: true,
	outputDir: "./tests/out",
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	reporter: [["list"], ["html", { outputFolder: "tests/export", open: "never" }]],
	retries: process.env.CI ? 2 : 0,
	testDir: "./tests",
	use: {
		baseURL: "http://127.0.0.1:3000",
		trace: "on-first-retry",
	},
	webServer: {
		command: "npm run dev",
		url: "http://127.0.0.1:3000",
		reuseExistingServer: !process.env.CI,
	},
	workers: process.env.CI ? 1 : undefined,
})
