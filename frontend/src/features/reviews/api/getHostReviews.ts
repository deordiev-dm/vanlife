import { Review } from "@/lib/types/types";

export function getUserReviews() {
  throw new Error("Implement other function");
}

async function getHostReviews(hostId: string) {
  const res = await fetch(`/api/users/${hostId}/hostReviews`);

  if (!res.ok) {
    throw new Error("Failed to get host's reviews.");
  }

  return (await res.json()) as Review[];
}

export default getHostReviews;
