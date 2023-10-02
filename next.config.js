/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: "/lol-scan-api",
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{ key: "Access-Control-Allow-Methods", value: "GET" },
					{
						key: "Access-Control-Allow-Headers",
						value: "api-key, Authorization",
					},
				],
			},
		]
	},
}

module.exports = nextConfig
