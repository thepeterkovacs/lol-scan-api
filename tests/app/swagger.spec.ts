import test, { expect } from "@playwright/test"

test("title_swaggerUi", async ({ page }) => {
	await page.goto("http://localhost:3000")

	await expect(page.getByText("lol-scan-api")).toBeVisible()
})
