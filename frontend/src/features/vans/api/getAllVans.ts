import { Van } from "@/lib/types/types";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default async function getAllVans(
  page: number,
  typeFilter: Pick<Van, "type"> | null = null,
) {
  let url = `${VITE_BACKEND_URL}/api/vans?page=${page}`;

  if (typeFilter) {
    url += `&type=${typeFilter}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch vans.");
  }

  return (await res.json()) as { vans: Van[]; pageCount: number };
}
