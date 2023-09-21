import test, { expect } from "@playwright/test"

test.describe.parallel("getIsInGame", () => {
	test("success_200", async ({ request }) => {
		const url = "http://localhost:3000/api/trpc/player.getIsInGame"

		const response = await request.get(url, {
			params: {
				input: '{"region":"eune","name":"Quicksave"}',
			},
		})

		expect(response.status()).toBe(200)
	})
})
