import { Review } from "@/lib/types/types";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function getUserReviews() {
  throw new Error("Implement other function");
}

async function getHostReviews(hostId: string) {
  const res = await fetch(
    `${VITE_BACKEND_URL}/api/users/${hostId}/hostReviews`,
  );

  if (!res.ok) {
    throw new Error("Failed to get host's reviews.");
  }

  return (await res.json()) as Review[];
}

export default getHostReviews;
