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

		if (response.status() === 200) {
			const data = JSON.parse(await response.text()).result.data

			expect(typeof data.mode).toBe("string")
		}
	})
})

test.describe.parallel("getDuration", () => {
	test("unauthorized_401", async ({ request }) => {
		const url = `${process.env.URL}/api/trpc/player.liveGame.getDuration`

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
		const url = `${process.env.URL}/api/trpc/player.liveGame.getDuration`

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
		const url = `${process.env.URL}/api/trpc/player.liveGame.getDuration`

		const response = await request.get(url, {
			headers: {
				"api-key": process.env.API_KEY,
			},
			params: {
				input: '{"region":"eune","name":"Quicksave"}',
			},
		})

		expect(response.status() === 501 || response.status() === 200).toBeTruthy()

		if (response.status() === 200) {
			const data = JSON.parse(await response.text()).result.data

			expect(typeof data.duration).toBe("number")
		}
	})
})

test.describe.parallel("getPlayers", () => {
	test("unauthorized_401", async ({ request }) => {
		const url = `${process.env.URL}/api/trpc/player.liveGame.getPlayers`

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
		const url = `${process.env.URL}/api/trpc/player.liveGame.getPlayers`

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
		const url = `${process.env.URL}/api/trpc/player.liveGame.getPlayers`

		const response = await request.get(url, {
			headers: {
				"api-key": process.env.API_KEY,
			},
			params: {
				input: '{"region":"eune","name":"Quicksave"}',
			},
		})

		expect(response.status() === 501 || response.status() === 200).toBeTruthy()

		if (response.status() === 200) {
			const data = JSON.parse(await response.text()).result.data

			expect(Array.isArray(data.players)).toBeTruthy()
		}
	})
})

test.describe.parallel("getAllData", () => {
	test("unauthorized_401", async ({ request }) => {
		const url = `${process.env.URL}/api/trpc/player.liveGame.getAllData`

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
		const url = `${process.env.URL}/api/trpc/player.liveGame.getAllData`

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
		const url = `${process.env.URL}/api/trpc/player.liveGame.getAllData`

		const response = await request.get(url, {
			headers: {
				"api-key": process.env.API_KEY,
			},
			params: {
				input: '{"region":"eune","name":"Quicksave"}',
			},
		})

		expect(response.status() === 501 || response.status() === 200).toBeTruthy()

		if (response.status() === 200) {
			const data = JSON.parse(await response.text()).result.data

			expect(Object.prototype.toString.call(data)).toBe("[object Object]")
		}
	})
})
