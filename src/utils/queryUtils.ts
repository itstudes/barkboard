// This file contains utility functions for handling query parameters in URLs.
// It includes functions for parsing, validating, and converting query parameters to specific types.

/**
 * Ensures that the provided query parameter is parsed correctly.
 * If the parameter is an array, it returns the first element.
 * @param param - The query parameter to be parsed.
 * @returns 
 */
export function getQueryParam(
  param: string | string[] | undefined
): string | undefined {
  return Array.isArray(param) ? param[0] : param;
}