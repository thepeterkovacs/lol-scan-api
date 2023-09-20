import { z } from "zod"

export const Region = z.enum([
	"br",
	"eune",
	"euw",
	"lan",
	"las",
	"na",
	"oce",
	"ru",
	"tr",
	"jp",
	"kr",
	"ph",
	"sg",
	"tw",
	"th",
	"vn",
])
