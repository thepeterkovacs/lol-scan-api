import chainMiddlewares from "./lib/utils/middleware"

export default chainMiddlewares([])

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"],
}
