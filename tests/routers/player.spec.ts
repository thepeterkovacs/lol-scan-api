import test, { expect } from "@playwright/test"

test.describe.parallel("getIsInGame", () => {
	test("success_200", async ({ request }) => {
		const url = `${process.env.URL}/api/trpc/player.getIsInGame`

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

	test("unauthorized_401", async ({ request }) => {
		const url = `${process.env.URL}/api/trpc/player.getIsInGame`

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
		const url = `${process.env.URL}/api/trpc/player.getIsInGame`

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

	test("responseData_boolean", async ({ request }) => {
		const url = `${process.env.URL}/api/trpc/player.getIsInGame`

		const response = await request.get(url, {
			headers: {
				"api-key": process.env.API_KEY,
			},
			params: {
				input: '{"region":"eune","name":"Quicksave"}',
			},
		})

		const data = JSON.parse(await response.text()).result.data

		expect(typeof data.isInGame).toBe("boolean")
	})
})
