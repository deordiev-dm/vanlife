export function isWithinLastNDays(timestamp: number, days: number): boolean {
  const now = Date.now();
  const nDaysAgo = now - days * 24 * 60 * 60 * 1000;

  return timestamp >= nDaysAgo && timestamp <= now;
}
