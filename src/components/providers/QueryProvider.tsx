"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"

import React, { ReactNode, useState } from "react"

import { trpcClient } from "@/lib/trpc/client"

export default function QueryProvider({ children }: { children: ReactNode }): JSX.Element {
	const [queryClient] = useState(() => new QueryClient({}))

	const [client] = useState(() =>
		trpcClient.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:3000/api/trpc",
				}),
			],
		})
	)

	return (
		<trpcClient.Provider client={client} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpcClient.Provider>
	)
}
