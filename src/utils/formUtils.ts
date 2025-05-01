/**
 * Generates a safe field name (e.g., camelCase) from a display label.
 * @param label The input label string.
 * @returns A camelCased string suitable for use as a form field name.
 */
export const generateFieldName = (label: string): string => {
  return label
    .replace(/[^a-zA-Z0-9 ]/g, '') // Remove non-alphanumeric except space
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, '') // Remove spaces
}
