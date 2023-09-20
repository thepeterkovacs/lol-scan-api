import { PropsWithChildren } from "react"

import "@/styles/globals.css"

import * as fonts from "@/lib/assets/fonts"

import Providers from "@/components/providers/Providers"

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html suppressHydrationWarning>
			<body className={fonts.roboto.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
