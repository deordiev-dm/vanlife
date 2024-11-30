import { Van } from "@/lib/types/types";

export default async function getAllVans() {
  const res = await fetch("/api/vans");

  if (!res.ok) {
    throw new Error("Failed to get all vans.");
  }

  return (await res.json()) as Van[];
}
