/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{ key: "Access-Control-Allow-Methods", value: "GET" },
					{
						key: "Access-Control-Allow-Headers",
						value: "api-key, Authorization, Content-Type",
					},
				],
			},
		]
	},
}

module.exports = nextConfig
