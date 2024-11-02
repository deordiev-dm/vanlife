import { Review } from "@/lib/types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getUserReviews(userId: string): Promise<Review[]> {
  const res = await fetch(`${BASE_URL}/api/users/${userId}/hostReviews`);

  if (!res.ok) {
    throw new Error("Failed to fetch host transactions");
  }

  return (await res.json()) as Review[];
}
