import { Van } from "@/lib/types/types";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getHostVans = async (hostId: string) => {
  const response = await fetch(
    `${VITE_BACKEND_URL}/api/users/${hostId}/hostVans`,
  );

  if (!response.ok) {
    throw new Error("Failed to get host vans");
  }

  return (await response.json()) as Van[];
};

export default getHostVans;
