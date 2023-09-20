import { Dispatch, useEffect, useState } from "react"

/**
 * Custom hook to manage state in localStorage.
 * @param {string} key Key to be used for storing and retrieving the data in localStorage.
 * @param {any} defaultValue Default value to be used if the key doesn't exist in localStorage.
 * @returns {[any, Dispatch<any>]} A tuple containing the current value stored in localStorage and a function to update it.
 * @example
 * const [output, setOutput] = useLocalStorage("output", 0)
 * //output = 0
 * setOutput(2)
 * //output = 2
 */
const useLocalStorage = (key: string, defaultValue: any): [any, Dispatch<any>] => {
	const [localItem, setLocalItem] = useState<[any, Dispatch<any>]>()

	useEffect(() => {
		setLocalItem(() => {
			const item = localStorage.getItem(key)
			return item ? JSON.parse(item) : defaultValue
		})
	}, [key, defaultValue])

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(localItem))
	}, [key, localItem])

	return [localItem, setLocalItem]
}

export default useLocalStorage
