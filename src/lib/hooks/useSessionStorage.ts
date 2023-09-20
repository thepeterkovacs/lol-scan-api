import { Dispatch, useEffect, useState } from "react"

/**
 * Custom hook to manage state in sessionStorage.
 * @param {string} key Key to be used for storing and retrieving the data in sessionStorage.
 * @param {any} defaultValue Default value to be used if the key doesn't exist in sessionStorage.
 * @returns {[any, Dispatch<any>]} A tuple containing the current value stored in sessionStorage and a function to update it.
 * @example
 * const [output, setOutput] = useSessionStorage("output", 0)
 * //output = 0
 * setOutput(2)
 * //output = 2
 */
const useSessionStorage = (key: string, defaultValue: any): [any, Dispatch<any>] => {
	const [sessionItem, setSessionItem] = useState<[any, Dispatch<any>]>()

	useEffect(() => {
		setSessionItem(() => {
			const item = sessionStorage.getItem(key)
			return item ? JSON.parse(item) : defaultValue
		})
	}, [key, defaultValue])

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(sessionItem))
	}, [key, sessionItem])

	return [sessionItem, setSessionItem]
}

export default useSessionStorage
