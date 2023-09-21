import test, { expect } from "@playwright/test"

test.describe.parallel("getIsInGame", () => {
	test("success_200", async ({ request }) => {
		const url = "http://localhost:3000/lol-scan-api/api/trpc/player.getIsInGame"

		const response = await request.get(url, {
			headers: {
				"api-key": process.env.API_KEY,
			},
			params: {
				input: '{"region":"eune","name":"Quicksave"}',
			},
		})

		expect(response.status()).toBe(200)
	})

	test("response_data", async ({ request }) => {
		const url = "http://localhost:3000/lol-scan-api/api/trpc/player.getIsInGame"

		const response = await request.get(url, {
			headers: {
				"api-key": process.env.API_KEY,
			},
			params: {
				input: '{"region":"eune","name":"Quicksave"}',
			},
		})

		expect(JSON.parse(await response.text())).toMatchObject({
			result: {
				data: {
					isInGame: false,
				},
			},
		})
	})
})
