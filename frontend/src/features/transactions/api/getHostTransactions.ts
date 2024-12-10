import { Transaction } from "@/lib/types/types";

async function getHostTransactions(hostId: string) {
  const res = await fetch(`/api/users/${hostId}/hostTransactions`);

  if (!res.ok) {
    throw new Error("Failed to fetch host's transactions");
  }

  return (await res.json()) as Transaction[];
}

export default getHostTransactions;
