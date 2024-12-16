import { Transaction } from "@/lib/types/types";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function getHostTransactions(hostId: string) {
  const res = await fetch(
    `${VITE_BACKEND_URL}/api/users/${hostId}/hostTransactions`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch host's transactions");
  }

  return (await res.json()) as Transaction[];
}

export default getHostTransactions;
