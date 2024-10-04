/**
 * Checks if a given timestamp is within a specified number of months from the current date.
 *
 * @param timestamp - The timestamp to check.
 * @param months - The number of months to check within.
 * @returns `true` if the timestamp is within the specified number of months, otherwise `false`.
 */
export function isWithinNMonths(timestamp: number, months: number): boolean {
  const startingDate = new Date().setMonth(new Date().getMonth() - months);
  return timestamp >= startingDate;
}
