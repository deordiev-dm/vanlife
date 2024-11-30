import { Van } from "@/lib/types/types";

const getVanById = async (id: string) => {
  const res = await fetch(`/api/vans/${id}`);

  if (!res.ok) {
    throw new Error("Failed to get a van by an id.");
  }

  return (await res.json()) as Van;
};

export default getVanById;
