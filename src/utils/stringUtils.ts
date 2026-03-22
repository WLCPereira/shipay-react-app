/**
 * Removes all non-letter characters and converts to lowercase.
 */
function normalizeForSearch(text: string): string {
  return text.toLowerCase().replace(/[^a-z]/g, '')
}

/**
 * Returns true when `value` contains `term` (case-insensitive),
 * ignoring spacing and special characters. Only letters are matched.
 *
 * @param value - string to search inside
 * @param term - string to find (case-insensitive, ignores spaces and special chars)
 * @returns boolean
 *
 * @example
 * matchesCaseInsensitive('hello-world', 'helloworld') // true
 * matchesCaseInsensitive('Cash In - COB', 'cashin') // true
 */
export function matchesCaseInsensitive(value: string, term: string): boolean {
  if (!value || !term) {
    return false
  }

  const normalizedValue = normalizeForSearch(value)
  const normalizedTerm = normalizeForSearch(term)

  return normalizedValue.includes(normalizedTerm)
}
