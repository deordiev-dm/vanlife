export function isWithinNMonths(timestamp: number, months: number): boolean {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Calculate the target year and month
  const targetMonth = currentMonth - months + 1;
  const targetYear = currentYear + Math.floor(targetMonth / 12);

  // Normalize the targetMonth to a valid range (0-11)
  const normalizedMonth = (targetMonth + 12) % 12;

  // Set the starting date to the 1st day of the calculated month/year with 00:00:00 time
  const startingDate = new Date(targetYear, normalizedMonth, 1, 0, 0, 0, 0);

  return timestamp >= startingDate.getTime();
}
