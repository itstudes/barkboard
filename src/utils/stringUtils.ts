/*
 * Convert a string to proper case (first letter uppercase, rest lowercase)
 * @param str - The string to convert.
 * @return The string in proper case.
 */
export function toProperCase(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
