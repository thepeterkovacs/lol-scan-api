import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class values into a single class name string using tailwindcss utilities.
 * @param {...ClassValue[]} inputs Class values to be combined.
 * @returns {string} The combined class name string.
 * @example
 * const output = cn("text-red-500", { "bg-blue-200": false }, { "font-bold": true }, "py-2")
 * //output = "text-red-500 font-bold py-2"
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
