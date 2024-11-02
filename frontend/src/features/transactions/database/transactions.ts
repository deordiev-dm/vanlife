import { Transaction } from "@/lib/types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Fetches the transactions for a specific user.
 *
 * @param userId - The ID of the user whose transactions are to be fetched.
 * @returns A promise that resolves to an array of transactions.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function getUserTransactions(userId: string) {
  const res = await fetch(`${BASE_URL}/api/users/${userId}/hostTransactions`);

  if (!res.ok) {
    throw new Error("Failed to fetch host transactions");
  }

  return (await res.json()) as Transaction[];
}
