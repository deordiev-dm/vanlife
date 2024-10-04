/**
 * Generates a new set of URL search parameters based on the provided key-value pair.
 * If the value is `null`, the key is removed from the search parameters.
 * Otherwise, the key is set to the provided value.
 *
 * @param oldSearchParams - The existing URL search parameters.
 * @param key - The key to be added or removed from the search parameters.
 * @param value - The value to be set for the key. If `null`, the key is removed.
 * @returns A new instance of `URLSearchParams` with the updated key-value pair.
 */
export default function generateNewSearchParams(
  oldSearchParams: URLSearchParams,
  key: string,
  value: string | null,
): URLSearchParams {
  const newSearchParams = new URLSearchParams(oldSearchParams);
  if (value === null) {
    newSearchParams.delete(key);
  } else {
    newSearchParams.set(key, value);
  }

  return newSearchParams;
}
