/**
 * Parses a query parameter and ensures it is returned in a consistent string format.
 *
 * This function accepts a query parameter that may be provided as:
 * - A single string,
 * - An array of strings (in which case the first element is used),
 * - `null` or `undefined` (both of which result in `undefined`).
 *
 * @param param - The query parameter to be parsed, which may be a string, an array of strings, null, or undefined.
 * @returns The parsed string value if available; otherwise, undefined.
 */
export function getQueryParam(
  param: string | string[] | null | undefined
): string | undefined {
  if (param === null || param === undefined) {
    return undefined;
  }
  return Array.isArray(param) ? param[0] : param;
}