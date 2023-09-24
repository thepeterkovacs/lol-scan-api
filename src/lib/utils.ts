import { JSDOM } from "jsdom"

export const getHtmlFromUrl = async (url: string): Promise<string> => {
	const res = await fetch(url, { cache: "no-store" })
	const html = await res.text()

	return html
}

export const getDocumentFromUrl = async (url: string): Promise<Document> => {
	const res = await fetch(url, { cache: "no-store" })
	const html = await res.text()

	const dom = new JSDOM(html)

	return dom.window.document
}

export const extractSubstring = (str: string, prefix: string, suffix: string): string => {
	const startIndex = str.indexOf(prefix)
	const endIndex = str.indexOf(suffix)

	const subString = str.slice(startIndex + prefix.length, endIndex)

	return subString
}
