import test, { expect } from "@playwright/test"

test.describe.parallel("getMode", () => {
	test("unauthorized_401", async ({ request }) => {
		const url = `${process.env.URL}/api/trpc/player.liveGame.getMode`

		const response = await request.get(url, {
			headers: {
				"api-key": "",
			},
			params: {
				input: '{"region":"eune","name":"Quicksave"}',
			},
		})

		expect(response.status()).toBe(401)
	})

	test("notFound_404", async ({ request }) => {
		const url = `${process.env.URL}/api/trpc/player.liveGame.getMode`

		const response = await request.get(url, {
			headers: {
				"api-key": process.env.API_KEY,
			},
			params: {
				input: '{"region":"eune","name":""}',
			},
		})

		expect(response.status()).toBe(404)
	})

	test("success_200", async ({ request }) => {
		const url = `${process.env.URL}/api/trpc/player.liveGame.getMode`

		const response = await request.get(url, {
			headers: {
				"api-key": process.env.API_KEY,
			},
			params: {
				input: '{"region":"eune","name":"Quicksave"}',
			},
		})

		expect(response.status() === 501 || response.status() === 200).toBeTruthy()
	})
})
