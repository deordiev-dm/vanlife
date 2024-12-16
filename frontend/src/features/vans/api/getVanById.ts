import { Van } from "@/lib/types/types";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getVanById = async (id: string) => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/vans/${id}`);

  if (!res.ok) {
    throw new Error("Failed to get a van by an id.");
  }

  return (await res.json()) as Van;
};

export default getVanById;
