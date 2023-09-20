import { getServerSession } from "next-auth"

import { PropsWithChildren } from "react"

import DevTools from "../tools/DevTools"
import { Toaster } from "../tools/Toaster"
import QueryProvider from "./QueryProvider"
import SessionProvider from "./SessionProvider"
import ThemeProvider from "./ThemeProvider"

export default async function Providers({ children }: PropsWithChildren): Promise<JSX.Element> {
	const session = await getServerSession()

	return (
		<SessionProvider session={session}>
			<QueryProvider>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
					<Toaster />
					<DevTools />
				</ThemeProvider>
			</QueryProvider>
		</SessionProvider>
	)
}
