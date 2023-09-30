import test, { expect } from "@playwright/test"

test.describe.parallel("getIsInGame", () => {
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

		const data = JSON.parse(await response.text()).result.data

		expect(response.status()).toBe(200)
		expect(typeof data.isInGame).toBe("boolean")
	})
})

test.describe.parallel("getIcon", () => {
	test("unauthorized_401", async ({ request }) => {
		const url = `${process.env.URL}/api/trpc/player.getIcon`

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
		const url = `${process.env.URL}/api/trpc/player.getIcon`

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
		const url = `${process.env.URL}/api/trpc/player.getIcon`

		const response = await request.get(url, {
			headers: {
				"api-key": process.env.API_KEY,
			},
			params: {
				input: '{"region":"eune","name":"Quicksave"}',
			},
		})

		const data = JSON.parse(await response.text()).result.data

		expect(response.status()).toBe(200)
		expect(typeof data.icon).toBe("string")
	})
})

test.describe.parallel("getAllData", () => {
	test("unauthorized_401", async ({ request }) => {
		const url = `${process.env.URL}/api/trpc/player.getAllData`

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
		const url = `${process.env.URL}/api/trpc/player.getAllData`

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
		const url = `${process.env.URL}/api/trpc/player.getAllData`

		const response = await request.get(url, {
			headers: {
				"api-key": process.env.API_KEY,
			},
			params: {
				input: '{"region":"eune","name":"Quicksave"}',
			},
		})

		const data = JSON.parse(await response.text()).result.data

		expect(response.status()).toBe(200)
		expect(Object.prototype.toString.call(data)).toBe("[object Object]")
	})
})
