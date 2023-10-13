import test, { expect } from "@playwright/test"

test("title_trpcPanel", async ({ page }) => {
	await page.goto("http://localhost:3000/panel")

	await expect(page).toHaveTitle("tRPC.panel()")
})
