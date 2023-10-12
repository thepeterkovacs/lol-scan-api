/** @type {import('next').NextConfig} */
const nextConfig = {
	assetPrefix: process.env.NODE_ENV === "production" ? "/lol-scan-api" : undefined,
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Credentials",
						value: "true",
					},
					{
						key: "Access-Control-Allow-Origin",
						value: "*",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "*",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "*",
					},
				],
			},
		]
	},
}

module.exports = nextConfig
